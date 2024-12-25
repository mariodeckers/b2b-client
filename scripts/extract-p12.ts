import { parseArgs } from "jsr:@std/cli/parse-args";
import { join } from "jsr:@std/path/join";
import { ensureDir } from "jsr:@std/fs";
import forge from "npm:node-forge@1.3.1";

const DEFAULT_CERT_PATH = "./cert/";

interface CliOptions {
  input?: string;
  output?: string;
  password?: string;
  help?: boolean;
}

interface CertificateInfo {
  subjectCommonName: string;
  issuerCommonName: string;
  notBefore: Date;
  notAfter: Date;
}

function displayHelp() {
  console.log(`
Certificate Extraction Tool

Usage:
  deno run --allow-read --allow-write extract_p12.ts [options]

Options:
  -i, --input     Input folder path (default: ${DEFAULT_CERT_PATH})
  -o, --output    Output folder path (default: same as input)
  -p, --password  Certificate password (will prompt if not provided)
  -h, --help      Show this help message
`);
}

async function promptPassword(): Promise<string> {
  const decoder = new TextDecoder();

  console.log("Enter certificate password:");
  const buffer = new Uint8Array(1024);
  const n = await Deno.stdin.read(buffer);
  if (n === null) {
    throw new Error("Failed to read password from stdin");
  }
  return decoder.decode(buffer.subarray(0, n)).trim();
}

async function findP12File(inputPath: string): Promise<string> {
  await ensureDir(inputPath);
  console.log(`Searching for .p12 files in: ${inputPath}`);
  const files = [];
  for await (const entry of Deno.readDir(inputPath)) {
    if (entry.isFile && entry.name.endsWith(".p12")) {
      files.push(entry.name);
    }
  }

  if (files.length === 0) {
    throw new Error(`No .p12 files found in ${inputPath}`);
  }
  if (files.length > 1) {
    throw new Error(
      `Multiple .p12 files found in ${inputPath}. Please ensure only one file is present.`,
    );
  }

  const filePath = join(inputPath, files[0]);
  console.log(`Found .p12 file: ${filePath}`);
  return filePath;
}

function extractCertificateInfo(cert: forge.pki.Certificate): CertificateInfo {
  const subjectCommonName = cert.subject.getField("CN")?.value ?? "Unknown";
  const issuerCommonName = cert.issuer.getField("CN")?.value ?? "Unknown";

  return {
    subjectCommonName,
    issuerCommonName,
    notBefore: cert.validity.notBefore,
    notAfter: cert.validity.notAfter,
  };
}

async function extractPemFromP12(
  p12FilePath: string,
  password: string,
): Promise<{
  privateKeyPem: string | null;
  certPem: string[];
  certInfo: CertificateInfo[];
}> {
  try {
    // Read the .p12 file
    const p12Buffer = await Deno.readFile(p12FilePath);

    // Convert buffer to node-forge's buffer type
    const p12Der = forge.util.createBuffer(p12Buffer);

    // Parse the PKCS#12 file
    const p12Asn1 = forge.asn1.fromDer(p12Der);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

    // Debugging: Log safe contents
    // console.log("P12 safe contents:", p12.safeContents);

    // Initialize variables
    let certIndex = 1;
    let privateKeyPem: string | null = null;
    const certPem: string[] = [];
    const certInfo: CertificateInfo[] = [];

    // Iterate through safeContents to find certificates and private keys
    for (const safeContents of p12.safeContents) {
      for (const safeBag of safeContents.safeBags) {
        // Extract private key if present
        if (
          safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag ||
          safeBag.type === forge.pki.oids.keyBag
        ) {
          if (safeBag.key) {
            privateKeyPem = forge.pki.privateKeyToPem(safeBag.key);
            console.log("Extracted private key");
          }
        }

        // Extract certificate if present
        if (safeBag.type === forge.pki.oids.certBag) {
          if (safeBag.cert) {
            certPem.push(forge.pki.certificateToPem(safeBag.cert));
            const info = extractCertificateInfo(safeBag.cert);
            certInfo.push(info);
            // const certPEM = forge.pki.certificateToPem(safeBag.cert);
            // console.log(`Certificate ${certIndex} (PEM):\n`, certPEM);
            console.log(
              `Extracted certificate ${certIndex}: ${info.subjectCommonName} expires on: ${info.notAfter}`,
            );
            certIndex++;
          }
        }
      }
    }

    // Return certificate information
    return { privateKeyPem, certPem, certInfo };
  } catch (error) {
    console.error("Error extracting PEM:", error);
    Deno.exit(1);
  }
}

function checkCertificateDates(certInfo: CertificateInfo[]) {
  const now = new Date();
  const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const twoMonthsFromNow = new Date(
    now.getTime() + 2 * 30 * 24 * 60 * 60 * 1000,
  );

  for (const cert of certInfo) {
    if (cert.notAfter < now) {
      console.error(`Certificate ${cert.subjectCommonName} has expired!`);
    } else if (cert.notAfter < oneMonthFromNow) {
      console.warn(
        `Warning: Certificate ${cert.subjectCommonName} expires in less than 1 month!`,
      );
    } else if (cert.notAfter < twoMonthsFromNow) {
      console.warn(
        `Notice: Certificate ${cert.subjectCommonName} expires in less than 2 months.`,
      );
    }
  }
}

async function writeOutputFiles(
  outputPath: string,
  certPems: string[],
  privateKeyPem: string | null,
) {
  console.log(`Writing output files to: ${outputPath}`);
  await ensureDir(outputPath);

  // Write certificates
  for (let i = 0; i < certPems.length; i++) {
    const filename = `cert_${i + 1}.pem`;
    await Deno.writeTextFile(join(outputPath, filename), certPems[i]);
    console.log(`Written certificate ${i + 1} to: ${filename}`);
  }

  // Write private key if present
  if (privateKeyPem) {
    const keyPath = join(outputPath, "private.key");
    await Deno.writeTextFile(keyPath, privateKeyPem);
    console.log(`Written private key to: private.key`);
  }
}

// console.log("Script started");

if (import.meta.main) {
  // console.log("Parsing command line arguments...");
  const args = parseArgs(Deno.args, {
    string: ["input", "output", "password"],
    boolean: ["help"],
    alias: {
      i: "input",
      o: "output",
      p: "password",
      h: "help",
    },
    default: {
      help: false,
    },
  }) as CliOptions;

  // console.log("Parsed arguments:", args);

  if (args.help) {
    displayHelp();
    Deno.exit(0);
  }

  const inputPath = args.input || DEFAULT_CERT_PATH;
  const outputPath = args.output || inputPath;
  console.log(`Using input path: ${inputPath}`);
  console.log(`Using output path: ${outputPath}`);

  try {
    const password = args.password || (await promptPassword());
    const p12FilePath = await findP12File(inputPath);

    console.log("Extracting PEM from P12...");
    const { privateKeyPem, certPem, certInfo } = await extractPemFromP12(
      p12FilePath,
      password,
    );

    await writeOutputFiles(outputPath, certPem, privateKeyPem);
    checkCertificateDates(certInfo);
    console.log("Extraction completed successfully");
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    Deno.exit(1);
  }
}

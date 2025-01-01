import type { xml_document } from "@libs/xml";
import type { PemCertificate } from "./types.ts";
import { parseFromXML, stringifyToXml, unwrapXmlResponse } from "./utils.ts";
import { load } from "@std/dotenv";

await load({ export: true }); // Import environment variables
const DEBUG_ENV_VAR = "B2B_CLIENT_DEBUG";
const isDebugEnabled = Deno.env.get(DEBUG_ENV_VAR)?.toLowerCase() === "true" ||
  Deno.env.get(DEBUG_ENV_VAR)?.toLowerCase() === "on";

function debug(message: string, ...args: any[]): void {
  if (isDebugEnabled) {
    console.debug(
      `[${new Date().toISOString()}] [b2b-client]`,
      message,
      ...args,
      "\n",
    ); // Add module name or prefix
  }
}

const isDeno = typeof Deno !== "undefined";

interface ApiClient {
  sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest,
  ): Promise<TResponse>;
}

// Deno-specific implementation
class DenoClient implements ApiClient {
  private readonly apiUrl: string;
  private readonly client: Deno.HttpClient;

  constructor(apiUrl: string, certificate: PemCertificate) {
    this.apiUrl = apiUrl;
    this.client = Deno.createHttpClient(certificate);
  }

  /**
   * Sends an XML request to the API endpoint
   * @template TRequest - Type of the request body
   * @template TResponse - Type of the expected response
   * @param {TRequest & xml_document} requestBody - The XML request body
   * @returns {Promise<TResponse>} The parsed response
   */
  async sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest,
  ): Promise<TResponse> {
    try {
      debug("Request Body:", requestBody);

      const xmlRequest = stringifyToXml(requestBody);
      debug("XML Request:", xmlRequest);

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: xmlRequest,
        client: this.client,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlResponse = await response.text();
      debug("XML Response:", xmlResponse);

      const jsonResponse = await parseFromXML<TResponse>(xmlResponse);
      debug("JSON Response:", jsonResponse);

      const [prefix, name] = Object.keys(requestBody)[0].split(":");
      const replyName = `${name.replace("Request", "Reply")}`;

      const unwrappedResponse = unwrapXmlResponse<TResponse>(
        jsonResponse,
        prefix,
        replyName,
      );
      debug("Unwrapped Response:", unwrappedResponse);

      return unwrappedResponse;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }
}

// Node-specific implementation
class NodeClient implements ApiClient {
  private readonly apiUrl: string;
  private readonly certificate: PemCertificate;
  private axios: any;
  private https: any;

  constructor(apiUrl: string, certificate: PemCertificate) {
    this.apiUrl = apiUrl;
    this.certificate = certificate;
  }

  private async initialize() {
    if (!this.axios || !this.https) {
      // Use dynamic imports with proper error handling
      try {
        const [{ default: axiosModule }, httpsModule] = await Promise.all([
          import("npm:axios@1.7.9"),
          import("node:https"),
        ]);
        this.axios = axiosModule;
        this.https = httpsModule;
      } catch (error) {
        throw new Error("Failed to load Node.js dependencies: " + error);
      }
    }
  }

  /**
   * Sends an XML request to the API endpoint
   * @template TRequest - Type of the request body
   * @template TResponse - Type of the expected response
   * @param {TRequest & xml_document} requestBody - The XML request body
   * @returns {Promise<TResponse>} The parsed response
   */
  async sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest,
  ): Promise<TResponse> {
    try {
      // Initialize dependencies before first use
      await this.initialize();

      debug("Request Body:", requestBody);

      const xmlRequest = stringifyToXml(requestBody);
      debug("XML Request:", xmlRequest);

      const httpsAgent = new this.https.Agent({
        cert: this.certificate.cert,
        key: this.certificate.key,
      });

      const response = await this.axios.post(this.apiUrl, xmlRequest, {
        headers: {
          "Content-Type": "application/xml",
        },
        httpsAgent,
      });

      const xmlResponse = response.data;
      debug("XML Response:", xmlResponse);

      const jsonResponse = await parseFromXML<TResponse>(xmlResponse);
      debug("JSON Response:", jsonResponse);

      const [prefix, name] = Object.keys(requestBody)[0].split(":");
      const replyName = `${name.replace("Request", "Reply")}`;

      const unwrappedResponse = unwrapXmlResponse<TResponse>(
        jsonResponse,
        prefix,
        replyName,
      );
      debug("Unwrapped Response:", unwrappedResponse);

      return unwrappedResponse;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }
}

// Factory function
export function createApiClient(
  apiUrl: string,
  certificate: PemCertificate,
): ApiClient {
  if (isDeno) {
    debug("Creating Deno client");
    return new DenoClient(apiUrl, certificate);
  } else {
    debug("Creating Node client");
    return new NodeClient(apiUrl, certificate);
  }
}

/**
 * Base client class for handling HTTPS requests with certificate-based authentication
 */
export class BaseClient {
  private client: ApiClient;

  /**
   * Creates an instance of BaseClient
   * @param {string} apiUrl - The base URL for the API endpoint
   * @param {PemCertificate} certificate - PEM certificate for authentication
   */
  constructor(apiUrl: string, certificate: PemCertificate) {
    this.client = createApiClient(apiUrl, certificate);
  }

  sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest,
  ): Promise<TResponse> {
    return this.client.sendRequest(requestBody);
  }
}

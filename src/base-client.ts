import type { xml_document } from "@libs/xml";
import type { PemCertificate } from "./types.ts";
import { parseFromXML, stringifyToXml, unwrapXmlResponse } from "./utils.ts";

const isDeno = typeof Deno !== 'undefined';

interface ApiClient {
  sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest
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

  async sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest
  ): Promise<TResponse> {
    try {
      console.log("Request body:", requestBody);
      
      const xmlRequest = stringifyToXml(requestBody);
      console.log("XML Request:", xmlRequest);

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
      console.log("XML Response:", xmlResponse);

      const jsonResponse = await parseFromXML<TResponse>(xmlResponse);
      console.log("JSON Response:", jsonResponse);

      const [prefix, name] = Object.keys(requestBody)[0].split(":");
      const replyName = `${name.replace("Request", "Reply")}`;

      const unwrappedResponse = unwrapXmlResponse<TResponse>(
        jsonResponse,
        prefix,
        replyName
      );
      console.log("Unwrapped Response:", unwrappedResponse);

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
          import('npm:axios'),
          import('node:https')
        ]);
        this.axios = axiosModule;
        this.https = httpsModule;
      } catch (error) {
        throw new Error('Failed to load Node.js dependencies: ' + error);
      }
    }
  }

  async sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest
  ): Promise<TResponse> {
    try {
      // Initialize dependencies before first use
      await this.initialize();
      
      console.log("Request body:", requestBody);
      
      const xmlRequest = stringifyToXml(requestBody);
      console.log("XML Request:", xmlRequest);

      const httpsAgent = new this.https.Agent({
        cert: this.certificate.cert,
        key: this.certificate.key,
      });

      const response = await this.axios.post(this.apiUrl, xmlRequest, {
        headers: {
          'Content-Type': 'application/xml',
        },
        httpsAgent,
      });

      const xmlResponse = response.data;
      console.log("XML Response:", xmlResponse);

      const jsonResponse = await parseFromXML<TResponse>(xmlResponse);
      console.log("JSON Response:", jsonResponse);

      const [prefix, name] = Object.keys(requestBody)[0].split(":");
      const replyName = `${name.replace("Request", "Reply")}`;

      const unwrappedResponse = unwrapXmlResponse<TResponse>(
        jsonResponse,
        prefix,
        replyName
      );
      console.log("Unwrapped Response:", unwrappedResponse);

      return unwrappedResponse;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }
}

// Factory function
export function createApiClient(apiUrl: string, certificate: PemCertificate): ApiClient {
  if (isDeno) {
    return new DenoClient(apiUrl, certificate);
  } else {
    return new NodeClient(apiUrl, certificate);
  }
}

// Export BaseClient for backward compatibility
export class BaseClient {
  private client: ApiClient;

  constructor(apiUrl: string, certificate: PemCertificate) {
    this.client = createApiClient(apiUrl, certificate);
  }

  sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest
  ): Promise<TResponse> {
    return this.client.sendRequest(requestBody);
  }
}

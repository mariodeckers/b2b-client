import type { xml_document } from "@libs/xml";
import type { PemCertificate } from "./types.ts";
import { parseFromXML, stringifyToXml, unwrapXmlResponse } from "./utils.ts";

export class BaseClient {
  private readonly apiUrl: string;
  private readonly client: Deno.HttpClient;

  constructor(apiUrl: string, certificate: PemCertificate) {
    this.apiUrl = apiUrl;
    this.client = Deno.createHttpClient(certificate);
  }

  async sendRequest<TRequest, TResponse>(
    requestBody: xml_document & TRequest,
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

      // Extract the service prefix and name from the request
      const [prefix, name] = Object.keys(requestBody)[0].split(":");
      const replyName = `${name.replace("Request", "Reply")}`;

      const unwrappedResponse = unwrapXmlResponse<TResponse>(
        jsonResponse,
        prefix,
        replyName,
      );
      console.log("Unwrapped Response:", unwrappedResponse);

      return unwrappedResponse;
      // return jsonResponse;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }
}

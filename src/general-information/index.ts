import type { BaseClient } from "../base-client.ts";
import type {
  NMReleaseInformationReply,
  NMReleaseInformationRequest,
} from "./types.ts";
import { createXmlRequest } from "../utils.ts";

export class GeneralInformationService {
  private readonly client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

  NMReleaseInformationRequest(
    request: NMReleaseInformationRequest,
  ): Promise<NMReleaseInformationReply> {
    console.log("Request:", request);
    const requestBody = createXmlRequest(
      "gi",
      "NMReleaseInformationRequest",
      "eurocontrol/cfmu/b2b/GeneralinformationServices",
      request,
    );

    return this.client.sendRequest<
      typeof requestBody,
      NMReleaseInformationReply
    >(requestBody);
  }
}

import type { BaseClient } from "../base-client.ts";
import type {
  NMReleaseInformationReply,
  NMReleaseInformationRequest,
} from "./types.ts";
import { createXmlRequest } from "../utils.ts";

/**
 * Handles general information related B2B service operations
 * @class GeneralInformationService
 */
export class GeneralInformationService {
  private readonly client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Retrieves NM Release Information
   * @param {NMReleaseInformationRequest} request - The request parameters
   * @returns {Promise<NMReleaseInformationReply>} The response
   */
  NMReleaseInformationRequest(
    request: NMReleaseInformationRequest,
  ): Promise<NMReleaseInformationReply> {
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

import type { BaseClient } from "../base-client.ts";
import type {
  SubscriptionListReply,
  SubscriptionListRequest,
  SubscriptionResumeReply,
  SubscriptionResumeRequest,
} from "./types.ts";
import { createXmlRequest } from "../utils.ts";
import { SubscriptionPauseRequest } from "./types.ts";
import { SubscriptionPauseReply } from "./types.ts";
import { SubscriptionDeletionRequest } from "./types.ts";
import { SubscriptionDeletionReply } from "./types.ts";

/**
 * Handles common subscription-related B2B service operations
 * @class CommonService
 */
export class CommonService {
  private readonly client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Lists all P/S subscriptions
   * @param {SubscriptionListRequest} request - The subscription list request parameters
   * @returns {Promise<SubscriptionListReply>} The subscription list response
   */
  SubscriptionListRequest(
    request: SubscriptionListRequest,
  ): Promise<SubscriptionListReply> {
    const requestBody = createXmlRequest(
      "cm",
      "SubscriptionListRequest",
      "eurocontrol/cfmu/b2b/CommonServices",
      request,
    );

    return this.client.sendRequest<
      typeof requestBody,
      SubscriptionListReply
    >(requestBody);
  }

  /**
   * Pauses a subscription
   * @param {SubscriptionPauseRequest} request - The subscription pause request parameters
   * @returns {Promise<SubscriptionPauseReply>} The subscription pause response
   */
  SubscriptionPauseRequest(
    request: SubscriptionPauseRequest,
  ): Promise<SubscriptionPauseReply> {
    const requestBody = createXmlRequest(
      "cm",
      "SubscriptionPauseRequest",
      "eurocontrol/cfmu/b2b/CommonServices",
      request,
    );

    return this.client.sendRequest<
      typeof requestBody,
      SubscriptionPauseReply
    >(requestBody);
  }

  /**
   * Resumes a previously paused subscription
   * @param {SubscriptionResumeRequest} request - The subscription resume request parameters
   * @returns {Promise<SubscriptionResumeReply>} The subscription resume response
   */
  SubscriptionResumeRequest(
    request: SubscriptionResumeRequest,
  ): Promise<SubscriptionResumeReply> {
    const requestBody = createXmlRequest(
      "cm",
      "SubscriptionResumeRequest",
      "eurocontrol/cfmu/b2b/CommonServices",
      request,
    );

    return this.client.sendRequest<
      typeof requestBody,
      SubscriptionResumeReply
    >(requestBody);
  }

  /**
   * Deletes an existing subscription
   * @param {SubscriptionDeletionRequest} request - The subscription deletion request parameters
   * @returns {Promise<SubscriptionDeletionReply>} The subscription deletion response
   */
  SubscriptionDeletionRequest(
    request: SubscriptionDeletionRequest,
  ): Promise<SubscriptionDeletionReply> {
    const requestBody = createXmlRequest(
      "cm",
      "SubscriptionDeletionRequest",
      "eurocontrol/cfmu/b2b/CommonServices",
      request,
    );

    return this.client.sendRequest<
      typeof requestBody,
      SubscriptionDeletionReply
    >(requestBody);
  }
}

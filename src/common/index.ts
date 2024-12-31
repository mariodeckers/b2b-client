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

export class CommonService {
  private readonly client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

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

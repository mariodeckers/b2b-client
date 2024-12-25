import type { BaseClient } from "../base-client.ts";
import type {
  SubscriptionListReply,
  SubscriptionListRequest,
} from "./types.ts";
import { createXmlRequest } from "../utils.ts";

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
}

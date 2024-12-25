import type { BaseClient } from "../base-client.ts";
import type {
  FlightListByAerodromeReply,
  FlightListByAerodromeRequest,
  FlightListByAircraftOperatorReply,
  FlightListByAircraftOperatorRequest,
} from "./types.ts";
import { createXmlRequest } from "../utils.ts";

export class FlightService {
  private readonly client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

  FlightListByAerodromeRequest(
    request: FlightListByAerodromeRequest,
  ): Promise<FlightListByAerodromeReply> {
    const requestBody = createXmlRequest(
      "fl",
      "FlightListByAerodromeRequest",
      "eurocontrol/cfmu/b2b/FlightServices",
      request,
    );

    return this.client.sendRequest<
      typeof requestBody,
      FlightListByAerodromeReply
    >(requestBody);
  }

  FlightListByAircraftOperatorRequest(
    request: FlightListByAircraftOperatorRequest,
  ): Promise<FlightListByAircraftOperatorReply> {
    const requestBody = createXmlRequest(
      "fl",
      "FlightListByAircraftOperatorRequest",
      "eurocontrol/cfmu/b2b/FlightServices",
      request,
    );

    return this.client.sendRequest<
      typeof requestBody,
      FlightListByAircraftOperatorReply
    >(requestBody);
  }
}

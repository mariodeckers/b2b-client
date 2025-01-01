import type { BaseClient } from "../base-client.ts";
import type {
  FlightDataSubscriptionCreationReply,
  FlightDataSubscriptionCreationRequest,
  FlightListByAerodromeReply,
  FlightListByAerodromeRequest,
  FlightListByAircraftOperatorReply,
  FlightListByAircraftOperatorRequest,
} from "./types.ts";
import { createXmlRequest } from "../utils.ts";

/**
 * Handles flight-related B2B service operations
 * @class FlightService
 */
export class FlightService {
  private readonly client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Creates a flight-data subscription
   * @param {FlightDataSubscriptionCreationRequest} request - The subscription creation request parameters
   * @returns {Promise<FlightDataSubscriptionCreationReply>} The subscription creation response
   */
  FlightDataSubscriptionCreationRequest(
    request: FlightDataSubscriptionCreationRequest,
  ): Promise<FlightDataSubscriptionCreationReply> {
    const requestBody = createXmlRequest(
      "fl",
      "FlightDataSubscriptionCreationRequest",
      "eurocontrol/cfmu/b2b/FlightServices",
      request,
    );

    return this.client.sendRequest<
      typeof requestBody,
      FlightDataSubscriptionCreationReply
    >(requestBody);
  }

  /**
   * Retrieves flight data for the specified aerodromes
   * @param {FlightListByAerodromeRequest} request - The flight retrieval parameters
   * @returns {Promise<FlightListByAerodromeReply>} The flight data response
   */
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

  /**
   * Retrieves flight data for the specified aircraft operators
   * @param {FlightListByAircraftOperatorRequest} request - The flight retrieval parameters
   * @returns {Promise<FlightListByAircraftOperatorReply>} The flight data response
   */
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

/**
 * Represents a request to delete a subscription.
 */
export interface SubscriptionDeletionRequest extends Request {
  uuid: UUID;
}

/**
 * The request structure for a SubscriptionList operation
 */
export interface SubscriptionListRequest extends Request {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  states?: {
    item?: SubscriptionState[];
  };
}
/**
 * Represents a request to pause a subscription.
 */
export interface SubscriptionPauseRequest extends Request {
  uuid: UUID;
  heartbeatEnabled?: boolean; // xs:boolean
}

/**
 * Represents a request to resume a subscription.
 */
export interface SubscriptionResumeRequest extends Request {
  uuid: UUID;
}

/**
 * Represents a reply to a request to delete a subscription.
 */
export interface SubscriptionDeletionReply extends Reply {
  data?: Record<string | number | symbol, never>;
}

/**
 * The reply structure for a SubscriptionList operation
 */
export interface SubscriptionListReply extends Reply {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  data?: SubscriptionListReplyData;
}

/**
 * Data part of the reply for a subscription list operation
 */
export interface SubscriptionListReplyData {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  subscriptions?: {
    item?: SubscriptionSummary[];
  };
}

/**
 * Represents a reply to a request to pause a subscription.
 */
export interface SubscriptionPauseReply extends Reply {
  data?: Record<string | number | symbol, never>;
}

/**
 * Represents a reply to a request to resume a subscription.
 */
export interface SubscriptionResumeReply extends Reply {
  data?: Record<string | number | symbol, never>;
}

/**
 * Represents an identifier for an Air Navigation Unit.
 *
 * XSD String Constraint: `(([A-Z]|[0-9])|[_ \-\+/\\\|\*=<>,.;:?!'\`"~@#$%^&\(\)\[\]\{\}]){1,12}`
 */
export type AirNavigationUnitId = string;

/**
 * Represents a date and time with second precision.
 *
 * XSD String Constraint: `(((((((((([0-9]{4}(\-))[0-9]{2})(\-))[0-9]{2})( ))[0-9]{2})(:))[0-9]{2})(:))[0-9]{2})`
 */
export type DateTimeSecond = string;

/**
 * Represents the NM Release version.
 *
 * XSD String Constraint: `(((([0-9]{2}(\.))[0-9])(\.))[0-9])`
 */
export type NMRelease = string;

/**
 * Represents the NM B2B provider version.
 */
export type NMB2BProviderVersion = string;

/**
 * Represents the NM B2B version.
 *
 * XSD String Constraint: `(((([0-9]{2}(\.))[0-9])(\.))[0-9])`
 */
export type NMB2BVersion = string;

/**
 * Represents the execution environment.
 */
export type ExecutionEnvironment = "OPS" | "OPT" | "PRE_RELEASE" | "DEV";

/**
 * Represents common request fields.
 */
export interface Request {
  /**
   * The identifier of the end user.
   *
   * XSD String Constraint: `(([a-zA-Z]|[0-9])|(_)){0,30}`
   */
  endUserId?: string;
  /**
   * The Air Navigation Unit on behalf of which the request is made.
   */
  onBehalfOfUnit?: AirNavigationUnitId;
  /**
   * The time when the request was sent.
   */
  sendTime: DateTimeSecond;
}

/**
 * Represents the platform on which the service is running.
 */
export interface NMPlatform {
  /**
   * The execution environment.
   */
  executionEnvironment: ExecutionEnvironment;
  /**
   * The application instance.
   *
   * XSD String Constraint:  `((([A-Z]{3}(_))[A-Z]{2})([A-Z]|[0-9]))`
   */
  applicationInstance: string;
}

/**
 * Represents a generic error
 */
export interface Error {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  attributes?: {
    item?: string[];
  };
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  group: ServiceGroup;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   *  xs:string with pattern "([a-zA-Z]|(_)){1,100}"
   */
  category: string;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   *  xs:string with pattern "(([a-zA-Z]|[0-9])|(_)){1,100}"
   */
  type: string;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  parameters?: {
    item?: {
      key: string;
      value: string;
    }[];
  };
  /**
   * @minOccurs 0
   * @maxOccurs 1
   * xs:string with maxLength="2000"
   */
  message?: string;
}

/**
 * The reply structure for a service operation
 */
export interface Reply {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  requestReceptionTime?: DateTimeSecond;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  requestId?: string; //xs:string
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  sendTime?: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  status: ReplyStatus;
  /**
   * @minOccurs 0
   * @maxOccurs 100
   */
  inputValidationErrors?: Error[];
  /**
   * @minOccurs 0
   * @maxOccurs 100
   */
  outputValidationErrors?: Error[];
  /**
   * @minOccurs 0
   * @maxOccurs 100
   */
  warnings?: Error[];
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  slaError?: Error;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  reason?: string; //xs:string
}

/**
 *  Summary of a subscription
 */
export interface SubscriptionSummary {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  uuid: UUID;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  version: VersionNumber;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  release: NMRelease;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  anuId: AirNavigationUnitId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  queueName: QueueName;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  topic: SubscriptionTopic;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  state: SubscriptionState;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   * xs:string with pattern ".{1,500}"
   */
  description?: string;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  creationDate: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   * xs:string with pattern ".{1,100}"
   */
  lastUpdatedBy: string;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  lastUpdatedOn: Timestamp;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  lastUpdateReason: SubscriptionUpdateReason;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   * xs:string with maxLength="256"
   */
  lastUpdateComment?: string;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  heartbeatEnabled: boolean;
}

/**
 *  Possible values for subscription state
 *  xs:string with enumeration values: "ACTIVE", "PAUSED", "SUSPENDED_ACTIVE", "SUSPENDED_PAUSED", "DELETED"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type SubscriptionState =
  | "ACTIVE"
  | "PAUSED"
  | "SUSPENDED_ACTIVE"
  | "SUSPENDED_PAUSED"
  | "DELETED"
  | string;

/**
 * Possible values for service operation reply status
 * xs:string with enumeration values: "OK", "INVALID_INPUT", "INVALID_OUTPUT", "INTERNAL_ERROR",
 * "SERVICE_UNAVAILABLE", "RESOURCE_OVERLOAD", "REQUEST_COUNT_QUOTA_EXCEEDED",
 *  "PARALLEL_REQUEST_COUNT_QUOTA_EXCEEDED", "REQUEST_OVERBOOKING_REJECTED", "BANDWIDTH_QUOTAS_EXCEEDED",
 * "NOT_AUTHORISED", "OBJECT_NOT_FOUND", "TOO_MANY_RESULTS", "OBJECT_EXISTS", "OBJECT_OUTDATED", "CONFLICTING_UPDATE", "INVALID_DATASET"
 */
export type ReplyStatus =
  | "OK"
  | "INVALID_INPUT"
  | "INVALID_OUTPUT"
  | "INTERNAL_ERROR"
  | "SERVICE_UNAVAILABLE"
  | "RESOURCE_OVERLOAD"
  | "REQUEST_COUNT_QUOTA_EXCEEDED"
  | "PARALLEL_REQUEST_COUNT_QUOTA_EXCEEDED"
  | "REQUEST_OVERBOOKING_REJECTED"
  | "BANDWIDTH_QUOTAS_EXCEEDED"
  | "NOT_AUTHORISED"
  | "OBJECT_NOT_FOUND"
  | "TOO_MANY_RESULTS"
  | "OBJECT_EXISTS"
  | "OBJECT_OUTDATED"
  | "CONFLICTING_UPDATE"
  | "INVALID_DATASET";

/**
 * A universally unique identifier
 * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!'`"~@#$%^&\(\)\[\]\{\}]{36}"
 */
export type UUID = string;

/**
 * Represents an application version
 * xs:int with minInclusive="0"
 */
export type VersionNumber = number;

/**
 *  A queue name
 * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!'`"~@#$%^&\(\)\[\]\{\}]{1,200}"
 */
export type QueueName = string;

/**
 * Possible values for subscription topic
 * xs:string with enumeration values: "ATM_INFORMATION", "AIRSPACE_DATA", "GNSS_INTERFERENCE", "REGULATIONS", "REROUTINGS", "EAUP", "FLIGHT_PLANS", "FLIGHT_DATA", "FLIGHT_FILING_RESULT", "FFICE_PUBLICATION", "FFICE_FLIGHT_FILING", "MCDM"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type SubscriptionTopic =
  | "ATM_INFORMATION"
  | "AIRSPACE_DATA"
  | "GNSS_INTERFERENCE"
  | "REGULATIONS"
  | "REROUTINGS"
  | "EAUP"
  | "FLIGHT_PLANS"
  | "FLIGHT_DATA"
  | "FLIGHT_FILING_RESULT"
  | "FFICE_PUBLICATION"
  | "FFICE_FLIGHT_FILING"
  | "MCDM"
  | string;

/**
 * A timestamp
 *  xs:string with pattern "(((((((((((([0-9]{4}(\-))[0-9]{2})(\-))[0-9]{2})( ))[0-9]{2})(:))[0-9]{2})(:))[0-9]{2})( ))[0-9]{3})"
 */
export type Timestamp = string;

/**
 * Possible values for subscription update reason
 * xs:string with enumeration values: "USER_REQUEST", "MSG_EXPIRED", "MAINTENANCE", "NM_UPDATE", "QUEUE_OVERFLOW"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type SubscriptionUpdateReason =
  | "USER_REQUEST"
  | "MSG_EXPIRED"
  | "MAINTENANCE"
  | "NM_UPDATE"
  | "QUEUE_OVERFLOW"
  | string;

/**
 * Possible values for service groups
 * xs:string with enumeration values: "COMMON", "GENERAL_INFORMATION", "AIRSPACE", "FLOW", "FLIGHT", "FFICE"
 */
export type ServiceGroup =
  | "COMMON"
  | "GENERAL_INFORMATION"
  | "AIRSPACE"
  | "FLOW"
  | "FLIGHT"
  | "FFICE";

/**
 * Type for dataset
 * xs:string with enumeration values: "FORECAST", "OPERATIONAL", "SIMULATION"
 */
export type DatasetType = "FORECAST" | "OPERATIONAL" | "SIMULATION";

/**
 *  Represents a period defined by a start and end time with minute precision
 */
export interface DateTimeMinutePeriod {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  wef: DateTimeMinute;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  unt: DateTimeMinute;
}

/**
 * Represents a date and time with minute precision.
 * xs:string with pattern "(((((((([0-9]{4}(\-))[0-9]{2})(\-))[0-9]{2})( ))[0-9]{2})(:))[0-9]{2})"
 */
export type DateTimeMinute = string;

/**
 * Represents a shift in time with hour and minute precision
 */
export interface ShiftHourMinute {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  sign: Sign;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  value: DurationHourMinute;
}

/**
 * Represents a duration with hour and minute precision.
 * xs:string with pattern "[0-9]{4}"
 */
export type DurationHourMinute = string;

/**
 *  Specifies whether something was received or sent
 *  xs:string with enumeration values: "RECEIVED", "SENT", "UNKNOWN"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type ReceivedOrSent = "RECEIVED" | "SENT" | "UNKNOWN" | string;

/**
 * Represents a distance in meters.
 * xs:int with minInclusive="0"
 */
export type DistanceM = number;

/**
 * Represents a distance in nautical miles.
 * xs:int with minInclusive="0"
 */
export type DistanceNM = number;

/**
 * Represents a duration in milliseconds.
 * xs:long with minInclusive="0"
 */
export type Duration = number;

/**
 * Represents a duration in minutes.
 * xs:long with minInclusive="0"
 */
export type DurationMinute = number;

/**
 * A cost value.
 * xs:int
 */
export type Cost = number;

/**
 * Represents a bearing in degrees.
 * xs:int with minInclusive="0" and maxInclusive="360"
 */
export type Bearing = number;

/**
 * A colour value
 * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!'`"~@#$%^&\(\)\[\]\{\}]{1,51}"
 */
export type Colours = string;

/**
 * A generic sign
 */
export type Sign = "+" | "-";
/**
 * A duration with hour, minute and second precision
 */
export type DurationHourMinuteSecond = string;

/**
 * @description Represents an identifier for a simulation.
 * @example
 * - "SIM-123": An example simulation identifier.
 * @restriction  The value is a string of max length 32
 */
export type SimulationIdentifier = string; // xs:string max length 32

/**
 * @description  Represents the state of a simulation.
 * @example
 * - "INITIALIZED": The simulation is initialized.
 * - "RUNNING": The simulation is currently running.
 * - "PAUSED": The simulation is paused.
 * - "STOPPED": The simulation is stopped.
 * - "FINISHED": The simulation has finished.
 * - "ERROR": The simulation has encountered an error.
 * - "OTHER:some_other_state": The simulation with another user defined state
 */
export type SimulationState =
  | "INITIALIZED"
  | "RUNNING"
  | "PAUSED"
  | "STOPPED"
  | "FINISHED"
  | "ERROR"
  | `OTHER:${string}`;

/**
 * @description Represents a dataset with a type, simulation identifier and simulation state.
 */
export interface Dataset {
  type: DatasetType;
  simulationIdentifier?: SimulationIdentifier;
  simulationState?: SimulationState;
}

/**
 * Represents a time period with hour and minute precision
 */
export type TimeHourMinutePeriod = string; //Will be extended in next request

/**
 * A position
 */
export type Position = string; //Will be extended in next request

/**
 * Represents a weight in kilograms
 */
export type WeightKg = number;
/**
 * Represents a signed weight in kilograms
 */
export type SignedWeightKg = number;
/**
 * Represents a signed distance in nautical miles
 */
export type SignedDistanceNM = number;

/**
 * Represents a signed duration with hour and minute precision.
 * xs:string with pattern "(((\+)|(\-))[0-9]{4})"
 */
export type SignedDurationHourMinute = string;

/**
 * Represents a signed duration with hour and minute precision.
 * xs:string with pattern "(((\+)|(\-))[0-9]{6})"
 */
export type SignedDurationHourMinuteSecond = string;

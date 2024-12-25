// flight-types.ts
import type {
  AirNavigationUnitId,
  Cost,
  Dataset,
  DateTimeMinute,
  DateTimeMinutePeriod,
  DateTimeSecond,
  DistanceM,
  DistanceNM,
  DurationHourMinute,
  DurationHourMinuteSecond,
  DurationMinute,
  ReceivedOrSent,
  Reply,
  Request,
  ShiftHourMinute,
  SignedDistanceNM,
  SignedDurationHourMinute,
  SignedDurationHourMinuteSecond,
  SignedWeightKg,
  TimeHourMinutePeriod,
  WeightKg,
} from "../common/types.ts";
import type {
  CountsCalculationType,
  CountsInterval,
  FlightAtfcmMcdmOnlyLocation,
  FlightAtfcmRegulationLocation,
  FlightAtfcmReroutingLocation,
  FlightHotspotLocation,
  FlightMCDMInfo,
  FlightRegulationLocation,
  Flow,
  GroupReroutingSummary,
  OtmvStatus,
  RegulationCause,
  RegulationId,
  ReroutingId,
  ReroutingPurpose,
  TrafficVolumeScenarios,
} from "../flow/types.ts";
import type {
  AerodromeICAOId,
  AerodromeOrPublishedPointId,
  AirspaceId,
  AirspaceType,
  AirSpeed,
  FlightLevel,
  ICAOPoint,
  NetworkAddress,
  PublishedPointId,
  RouteOrTerminalProcedure,
  RunwayId,
  TerminalProcedure,
} from "../airspace/types.ts";

/**
 * Represents a request to retrieve a list of flights for a specific aerodrome.
 */
export interface FlightListByAerodromeRequest
  extends FlightListByLocationRequest {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  aerodrome: AerodromeICAOId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  aerodromeRole: AerodromeRole;
}

/**
 * Represents the reply to a FlightListByAerodromeRequest.
 */
export interface FlightListByAerodromeReply extends Reply {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  data?: FlightListByAerodromeReplyData;
}

/**
 * Represents a request to retrieve a list of flights for a specific aircraft operator.
 */
export interface FlightListByAircraftOperatorRequest
  extends FlightListByLocationRequest {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  calculationType?: CountsCalculationType;
}

/**
 * Represents the reply to a FlightListByAircraftOperatorRequest.
 */
export interface FlightListByAircraftOperatorReply extends Reply {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  data?: FlightListByAircraftOperatorReplyData;
}

/**
 * Abstract base type for flight list requests based on location.
 */
export interface FlightListByLocationRequest extends FlightListRequest {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  countsInterval?: CountsInterval;
  /**
   * @minOccurs 0
   * @maxOccurs 64
   */
  aircraftOperators?: AircraftOperatorICAOId[];
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  includeInvisibleFlights?: boolean;
}

/**
 * Abstract base type for flight list requests.
 */
export interface FlightListRequest extends Request {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  dataset: Dataset;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  includeProposalFlights: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  includeForecastFlights: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  trafficType: TrafficType;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  trafficWindow?: DateTimeMinutePeriod;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  worstLoadStateAtReferenceLocationType?: CountsCalculationType;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  compareWithOtherTrafficType?: TrafficType;
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  requestedFlightFields?: FlightField[];
}

/**
 * Possible roles an aerodrome can have in a flight.
 * xs:string with enumeration values: "DEPARTURE", "ARRIVAL", "GLOBAL", "ALTERNATE"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type AerodromeRole =
  | "DEPARTURE"
  | "ARRIVAL"
  | "GLOBAL"
  | "ALTERNATE"
  | string;

/**
 * Data type for FlightListByAerodrome reply.
 */
export interface FlightListByAerodromeReplyData
  extends FlightListByLocationReplyData {
}

/**
 * Data type for FlightListByAircraftOperator reply.
 */
export interface FlightListByAircraftOperatorReplyData
  extends FlightListByLocationReplyData {
}

/**
 * Abstract base type for flight list replies based on location.
 */
export interface FlightListByLocationReplyData extends FlightListReplyData {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  effectiveTrafficWindow: DateTimeMinutePeriod;
}

/**
 * Abstract base type for flight list reply data.
 */
export interface FlightListReplyData {
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  flights?: FlightOrFlightPlan[];
}

/**
 * Represents either a flight or a flight plan.
 */
export interface FlightOrFlightPlan {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  flight?: Flight;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  flightPlan?: FlightPlanOrInvalidFiling;
}

/**
 * Represents either a flight plan summary or an invalid filing.
 */
export interface FlightPlanOrInvalidFiling {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  lastValidFlightPlan?: FlightPlanSummary;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  currentInvalid?: InvalidFiling;
}

/**
 * Summary information about a flight plan.
 */
export interface FlightPlanSummary {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  id: FlightIdentificationOutput;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  status: FlightPlanStatus;
}

/**
 * Output information for flight identification.
 */
export interface FlightIdentificationOutput {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  id?: IFPLId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  keys?: FlightKeys;
}

/**
 * Identifier for a filed flight plan.
 * xs:string with pattern "([A-Z]{2}[0-9]{8})"
 */
export type IFPLId = string;

/**
 * Key details for identifying a flight.
 */
export interface FlightKeys {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  aircraftId: ExtendedAircraftICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aerodromeOfDeparture?: AerodromeICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  nonICAOAerodromeOfDeparture?: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  airFiled: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aerodromeOfDestination?: AerodromeICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  nonICAOAerodromeOfDestination?: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  estimatedOffBlockTime: DateTimeMinute;
}

/**
 * Extended ICAO identifier for an aircraft.
 * xs:string with pattern "((([a-zA-Z]|[0-9])|($))|(#)){2,7}"
 */
export type ExtendedAircraftICAOId = string;

/**
 * Possible statuses for a flight plan.
 * xs:string with enumeration values: "FILED", "AIRBORNE", "SUSPENDED", "CLOSED", "BACKUP", "TACT_DELETED", "TERMINATED", "OFFBLOCKS"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FlightPlanStatus =
  | "FILED"
  | "AIRBORNE"
  | "SUSPENDED"
  | "CLOSED"
  | "BACKUP"
  | "TACT_DELETED"
  | "TERMINATED"
  | "OFFBLOCKS"
  | string;

/**
 * ICAO identifier for an aircraft type.
 * xs:string with pattern "([a-zA-Z]([a-zA-Z]|[0-9]){1,3})"
 */
export type AircraftTypeICAOId = string;

/**
 * Specifies revision times for a flight.
 */
export interface RevisionTimes {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  timeToInsertInSequence?: DurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  timeToRemoveFromSequence?: DurationHourMinute;
}

/**
 * Details about taxi time and terminal procedure.
 */
export interface TaxiTimeAndProcedure {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  taxiTime: DurationHourMinute;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  taxiTimeSource: TaxiTimeSource;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  terminalProcedure?: TerminalProcedure;
}

/**
 * Source of the taxi time information.
 * xs:string with enumeration values: "ENV", "FPL", "RWY", "REA", "CDM"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type TaxiTimeSource = "ENV" | "FPL" | "RWY" | "REA" | "CDM" | string;

/**
 * Status of flight suspension.
 * xs:string with enumeration values: "NOT_SUSPENDED", "SLOT_MISSED", "REGULATION_CONFIRMATION", "DELAY_CONFIRMATION", "TRAFFIC_VOLUMES_CONDITION", "NOT_REPORTED_AS_AIRBORNE", "FLIGHT_PLAN_REVALIDATION", "MANUAL_SUSPENSION", "AIRPORT_SUSPENSION", "V_MANUAL_SUSPENSION"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type SuspensionStatus =
  | "NOT_SUSPENDED"
  | "SLOT_MISSED"
  | "REGULATION_CONFIRMATION"
  | "DELAY_CONFIRMATION"
  | "TRAFFIC_VOLUMES_CONDITION"
  | "NOT_REPORTED_AS_AIRBORNE"
  | "FLIGHT_PLAN_REVALIDATION"
  | "MANUAL_SUSPENSION"
  | "AIRPORT_SUSPENSION"
  | "V_MANUAL_SUSPENSION"
  | string;

/**
 * Status related to Flow and Airspace Management (FAM).
 * xs:string with enumeration values: "AIRBORNE_WHEN_SUSPENDED_BY_FAM", "AIRBORNE_WHEN_SHIFTED_BY_FAM", "SUBJECT_TO_FAM", "WAS_SUBJECT_TO_FAM", "NOT_UNDER_FAM", "SHIFTED_BY_FAM", "WAS_SHIFTED_BY_FAM", "SUSPENDED_BY_FAM", "WAS_SUSPENDED_BY_FAM"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FAMStatus =
  | "AIRBORNE_WHEN_SUSPENDED_BY_FAM"
  | "AIRBORNE_WHEN_SHIFTED_BY_FAM"
  | "SUBJECT_TO_FAM"
  | "WAS_SUBJECT_TO_FAM"
  | "NOT_UNDER_FAM"
  | "SHIFTED_BY_FAM"
  | "WAS_SHIFTED_BY_FAM"
  | "SUSPENDED_BY_FAM"
  | "WAS_SUSPENDED_BY_FAM"
  | string;

/**
 * Status indicating readiness for operations.
 */
export interface ReadyStatus {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  readyForImprovement?: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  readyToDepart: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  revisedTaxiTime?: DurationHourMinute;
}

/**
 * Indicator for flight rerouting.
 */
export interface ReroutingIndicator {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  rerouted: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  reason?: ReroutingReason;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  state?: ReroutingState;
}

/**
 * Reason for flight rerouting.
 * xs:string with enumeration values: "ATFM_EXECUTED", "AO", "ATFCM_PURPOSE_PROPOSAL", "ATC_PURPOSE_PROPOSAL", "FLIGHT_EFFICIENCY_PURPOSE_PROPOSAL", "STAM_PURPOSE_PROPOSAL", "CDR_OPPORTUNITY_PROPOSAL"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type ReroutingReason =
  | "ATFM_EXECUTED"
  | "AO"
  | "ATFCM_PURPOSE_PROPOSAL"
  | "ATC_PURPOSE_PROPOSAL"
  | "FLIGHT_EFFICIENCY_PURPOSE_PROPOSAL"
  | "STAM_PURPOSE_PROPOSAL"
  | "CDR_OPPORTUNITY_PROPOSAL"
  | string;

/**
 * State of flight rerouting.
 * xs:string with enumeration values: "PRODUCED", "EXECUTED", "TIMED_OUT", "REJECTED", "REVOKED", "NO_MATCH"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type ReroutingState =
  | "PRODUCED"
  | "EXECUTED"
  | "TIMED_OUT"
  | "REJECTED"
  | "REVOKED"
  | "NO_MATCH"
  | string;

/**
 * Status indicating if a flight can be rerouted.
 * xs:string with enumeration values: "CANNOT_BE_REROUTED", "TRY_ALLOWED", "TRY_AND_APPLY_ALLOWED"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type ReroutableStatus =
  | "CANNOT_BE_REROUTED"
  | "TRY_ALLOWED"
  | "TRY_AND_APPLY_ALLOWED"
  | string;

/**
 * Represents a time associated with a traffic model.
 */
export interface TimeAndModel {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  model: TrafficType;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  dateTime: DateTimeSecond;
}

/**
 * Possible types of traffic.
 * xs:string with enumeration values: "DEMAND", "REGULATED_DEMAND", "LOAD"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type TrafficType = "DEMAND" | "REGULATED_DEMAND" | "LOAD" | string;

/**
 * Trend of a flight at a specific point.
 * xs:string with enumeration values: "CRUISE", "CLIMB", "DESCENT", "NONE"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FlightTrend = "CRUISE" | "CLIMB" | "DESCENT" | "NONE" | string;

/**
 * Characteristics of a delay.
 * xs:string with enumeration values: "EXCEEDS_DELAY_CONFIRMATION", "ADJUSTED_TO_CLOCK"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type DelayCharacteristics =
  | "EXCEEDS_DELAY_CONFIRMATION"
  | "ADJUSTED_TO_CLOCK"
  | string;

/**
 * Information about exclusion from regulations.
 */
export interface ExclusionFromRegulations {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  onTrafficVolume?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  count?: number;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  all?: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  hasBeenExcluded: boolean;
}

/**
 * Rule for flight filing.
 * xs:string with enumeration values: "NOT_AUTHORISED", "OPERATOR_MUST_REFILE", "FILING_ALLOWED_BY_AO_CFMU"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FilingRule =
  | "NOT_AUTHORISED"
  | "OPERATOR_MUST_REFILE"
  | "FILING_ALLOWED_BY_AO_CFMU"
  | string;

/**
 * Originator of a message.
 */
export interface MessageOriginator {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  airNavigationUnitId?: AirNavigationUnitId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  address?: NetworkAddress;
}

/**
 * Represents a flight with various attributes.
 */
export interface Flight {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  flightId: FlightIdentificationOutput;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  divertedAerodromeOfDestination?: AerodromeICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aircraftType?: AircraftTypeICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  readyEstimatedOffBlockTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  cdmEstimatedOffBlockTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  calculatedOffBlockTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  actualOffBlockTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  revisionTimes?: RevisionTimes;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  estimatedTakeOffTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  calculatedTakeOffTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  actualTakeOffTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  ctotShiftAlreadyAppliedByTower?: ShiftHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  requestedFlightLevel?: FlightLevel;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  taxiTime?: DurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  currentDepartureTaxiTimeAndProcedure?: TaxiTimeAndProcedure;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  estimatedTimeOfArrival?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  calculatedTimeOfArrival?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  actualTimeOfArrival?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  lateFiler?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  lateUpdater?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  suspensionStatus?: SuspensionStatus;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  suspensionInfo?: string;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  famStatus?: FAMStatus;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  readyStatus?: ReadyStatus;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aircraftOperator?: AircraftOperatorICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  operatingAircraftOperator?: AircraftOperatorICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  reroutingIndicator?: ReroutingIndicator;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  newRouteMinShiftDelayImprovement?: DurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  reroutable?: ReroutableStatus;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  cdm?: CDM;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  slotIssued?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  proposalInformation?: ProposalInformation;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  bestReroutingIndicator?: GroupReroutingSummary;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  timeAtReferenceLocationEntry?: TimeAndModel;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  timeAtReferenceLocationExit?: TimeAndModel;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  flightLevelAtReferenceLocationEntry?: FlightLevel;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  flightLevelAtReferenceLocationExit?: FlightLevel;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  trendAtReferenceLocationEntry?: FlightTrend;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  trendAtReferenceLocationExit?: FlightTrend;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  trendAtReferenceLocationMiddle?: FlightTrend;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  exemptedFromRegulations?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  delay?: DurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  delayCharacteristics?: DelayCharacteristics;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  mostPenalisingRegulation?: RegulationId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  hasOtherRegulations?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  regulationLocations?: FlightRegulationLocation[];
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  atfcmMeasureLocations?: {
    item?: {
      FlightAtfcmMcdmOnlyLocation?: FlightAtfcmMcdmOnlyLocation;
      FlightAtfcmRegulationLocation?: FlightAtfcmRegulationLocation;
      FlightAtfcmReroutingLocation?: FlightAtfcmReroutingLocation;
    }[];
  };
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  lastATFMMessageType?: ATFMMessageType;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  lastATFMMessageReceivedOrSent?: ReceivedOrSent;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  runwayVisualRange?: DistanceM;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  minimumRequestedRVR?: DistanceM;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  confirmedCTFM?: DistanceNM;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  exclusionFromRegulations?: ExclusionFromRegulations;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  requestedInitialFlightLevel?: FlightLevel;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  requestedInitialSpeed?: AirSpeed;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  estimatedElapsedTime?: DurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  filingRule?: FilingRule;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  initialFPLMessageOriginator?: MessageOriginator;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  lastFPLMessageOriginator?: MessageOriginator;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!`"~@#$%^&\(\)\[\]\{\}\r\n]{0,10000}"
   */
  icaoRoute?: string;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  routeLength?: DistanceNM;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  defaultReroutingRequestedFlightLevel?: FlightLevel;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  defaultReroutingRequestedSpeed?: AirSpeed;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  departureTolerance?: DepartureTolerance;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  mostPenalisingRegulationCause?: RegulationCause;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  lastATFMMessageOriginator?: MessageOriginator;
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ftfmPointProfile?: FlightPoint[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  rtfmPointProfile?: FlightPoint[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ctfmPointProfile?: FlightPoint[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ftfmAirspaceProfile?: FlightAirspace[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  rtfmAirspaceProfile?: FlightAirspace[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ctfmAirspaceProfile?: FlightAirspace[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ftfmTrafficVolumeProfile?: FlightTrafficVolume[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  rtfmTrafficVolumeProfile?: FlightTrafficVolume[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ctfmTrafficVolumeProfile?: FlightTrafficVolume[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ftfmRequestedFlightLevels?: RequestedFlightLevel[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  rtfmRequestedFlightLevels?: RequestedFlightLevel[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ctfmRequestedFlightLevels?: RequestedFlightLevel[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  flightHistory?: FlightEvent[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  operationalLog?: FlightOperationalLogEntry[];
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  reroutingOpportunities?: {
    item?: ReroutingOpportunities[];
  };
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  equipmentCapabilityAndStatus?: EquipmentCapabilityAndStatus;
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ftfmRestrictionProfile?: FlightRestriction[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  rtfmRestrictionProfile?: FlightRestriction[];
  /**
   * @minOccurs 0
   * @maxOccurs unbounded
   */
  ctfmRestrictionProfile?: FlightRestriction[];
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  cfmuFlightType?: CfmuFlightType;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  ccamsSSRCode?: SSRCode;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  filedRegistrationMark?: AircraftRegistrationMark;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  isProposalFlight?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  hasBeenForced?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   * xs:int with minInclusive="0"
   */
  caughtInHotspots?: number;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  hotspots?: {
    item?: FlightHotspotLocation[];
  };
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  mcdmInfo?: FlightMCDMInfo;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  worstLoadStateAtReferenceLocation?: LoadStateAtReferenceLocation;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  compareWithOtherTrafficType?: DeltaEntry;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  ctotLimitReason?: CTOTLimitReason;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  profileValidity?: ProfileValidity;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  targetTimeOverFix?: TargetTime;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  flightState?: FlightState;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  lastKnownPosition?: FourDPosition;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  slotSwapCounter?: SlotSwapCounter;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  slotSwapCandidateList?: {
    item?: SlotSwapCandidate[];
  };
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aircraftAddress?: ICAOAircraftAddress;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  arrivalInformation?: ArrivalInformation;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  slotZone?: SlotZone;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  flightDataVersionNr?: FlightDataVersionNumber;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  applicableScenarios?: {
    item?: TrafficVolumeScenarios[];
  };
}

/**
 *  Represents an Aircraft Operator ICAO identifier.
 * xs:string with pattern "[a-zA-Z]{3}"
 */
export type AircraftOperatorICAOId = string;
/**
 * Possible values for flight fields
 * xs:string with enumeration values:
 * "divertedAerodromeOfDestination", "readyEstimatedOffBlockTime", "cdmEstimatedOffBlockTime", "calculatedOffBlockTime",
 * "actualOffBlockTime", "aircraftType", "estimatedTakeOffTime", "calculatedTakeOffTime", "actualTakeOffTime",
 * "ctotShiftAlreadyAppliedByTower", "taxiTime", "currentDepartureTaxiTimeAndProcedure", "revisionTimes",
 * "estimatedTimeOfArrival", "calculatedTimeOfArrival", "actualTimeOfArrival", "requestedFlightLevel",
 * "timeAtReferenceLocationEntry", "timeAtReferenceLocationExit", "flightLevelAtReferenceLocationEntry",
 * "flightLevelAtReferenceLocationExit", "trendAtReferenceLocationEntry", "trendAtReferenceLocationExit",
 * "trendAtReferenceLocationMiddle", "lateFiler", "lateUpdater", "suspensionStatus", "suspensionInfo",
 *  "exclusionFromRegulations", "famStatus", "readyStatus", "aircraftOperator", "operatingAircraftOperator",
 * "reroutingIndicator", "newRouteMinShiftDelayImprovement", "reroutable", "cdm", "slotIssued",
 * "proposalInformation", "bestReroutingIndicator", "exemptedFromRegulations", "delay", "delayCharacteristics",
 * "mostPenalisingRegulation", "hasOtherRegulations", "regulationLocations", "atfcmMeasureLocations",
 * "lastATFMMessageType", "lastATFMMessageReceivedOrSent", "runwayVisualRange", "confirmedCTFM",
 * "requestedInitialFlightLevel", "requestedInitialSpeed", "estimatedElapsedTime", "filingRule",
 * "initialFPLMessageOriginator", "lastFPLMessageOriginator", "icaoRoute", "routeLength",
 * "defaultReroutingRequestedFlightLevel", "defaultReroutingRequestedSpeed", "departureTolerance",
 * "mostPenalisingRegulationCause", "lastATFMMessageOriginator", "ftfmPointProfile", "rtfmPointProfile",
 * "ctfmPointProfile", "ftfmAirspaceProfile", "rtfmAirspaceProfile", "ctfmAirspaceProfile",
 * "ftfmRequestedFlightLevels", "rtfmRequestedFlightLevels", "ctfmRequestedFlightLevels", "flightHistory",
 * "operationalLog", "reroutingOpportunities", "reroutingOpportunitiesWithReferenceRoute",
 * "equipmentCapabilityAndStatus", "ftfmRestrictionProfile", "rtfmRestrictionProfile",
 * "ctfmRestrictionProfile", "cfmuFlightType", "ccamsSSRCode", "filedRegistrationMark", "isProposalFlight",
 * "hasBeenForced", "caughtInHotspots", "hotspots", "mcdmInfo", "worstLoadStateAtReferenceLocation",
 * "compareWithOtherTrafficType", "ctotLimitReason", "profileValidity", "targetTimeOverFix",
 * "flightState", "lastKnownPosition", "highestModelPointProfile", "highestModelAirspaceProfile",
 * "highestModelRestrictionProfile", "slotSwapCounter", "slotSwapCandidateList", "aircraftAddress",
 * "arrivalInformation", "slotZone", "flightDataVersionNr", "applicableScenarios", "apiSubmissionRules",
 * "avoidedRegulations", "routeChargeIndicator", "fuelConsumptionIndicator", "excludedRegulations",
 * "yoyoFlightForLocation", "turnFlightForLocation", "minimumRequestedRVR", "wakeTurbulenceCategory",
 * "alternateAerodromes", "flightCriticality", "oceanicReroute", "visibility", "iataFlightDesignator",
 *  "activeACDMAlerts", "aoReroutingFeedbacks", "atcCoordinatedRoute"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FlightField =
  | "divertedAerodromeOfDestination"
  | "readyEstimatedOffBlockTime"
  | "cdmEstimatedOffBlockTime"
  | "calculatedOffBlockTime"
  | "actualOffBlockTime"
  | "aircraftType"
  | "estimatedTakeOffTime"
  | "calculatedTakeOffTime"
  | "actualTakeOffTime"
  | "ctotShiftAlreadyAppliedByTower"
  | "taxiTime"
  | "currentDepartureTaxiTimeAndProcedure"
  | "revisionTimes"
  | "estimatedTimeOfArrival"
  | "calculatedTimeOfArrival"
  | "actualTimeOfArrival"
  | "requestedFlightLevel"
  | "timeAtReferenceLocationEntry"
  | "timeAtReferenceLocationExit"
  | "flightLevelAtReferenceLocationEntry"
  | "flightLevelAtReferenceLocationExit"
  | "trendAtReferenceLocationEntry"
  | "trendAtReferenceLocationExit"
  | "trendAtReferenceLocationMiddle"
  | "lateFiler"
  | "lateUpdater"
  | "suspensionStatus"
  | "suspensionInfo"
  | "exclusionFromRegulations"
  | "famStatus"
  | "readyStatus"
  | "aircraftOperator"
  | "operatingAircraftOperator"
  | "reroutingIndicator"
  | "newRouteMinShiftDelayImprovement"
  | "reroutable"
  | "cdm"
  | "slotIssued"
  | "proposalInformation"
  | "bestReroutingIndicator"
  | "exemptedFromRegulations"
  | "delay"
  | "delayCharacteristics"
  | "mostPenalisingRegulation"
  | "hasOtherRegulations"
  | "regulationLocations"
  | "atfcmMeasureLocations"
  | "lastATFMMessageType"
  | "lastATFMMessageReceivedOrSent"
  | "runwayVisualRange"
  | "confirmedCTFM"
  | "requestedInitialFlightLevel"
  | "requestedInitialSpeed"
  | "estimatedElapsedTime"
  | "filingRule"
  | "initialFPLMessageOriginator"
  | "lastFPLMessageOriginator"
  | "icaoRoute"
  | "routeLength"
  | "defaultReroutingRequestedFlightLevel"
  | "defaultReroutingRequestedSpeed"
  | "departureTolerance"
  | "mostPenalisingRegulationCause"
  | "lastATFMMessageOriginator"
  | "ftfmPointProfile"
  | "rtfmPointProfile"
  | "ctfmPointProfile"
  | "ftfmAirspaceProfile"
  | "rtfmAirspaceProfile"
  | "ctfmAirspaceProfile"
  | "ftfmRequestedFlightLevels"
  | "rtfmRequestedFlightLevels"
  | "ctfmRequestedFlightLevels"
  | "flightHistory"
  | "operationalLog"
  | "reroutingOpportunities"
  | "reroutingOpportunitiesWithReferenceRoute"
  | "equipmentCapabilityAndStatus"
  | "ftfmRestrictionProfile"
  | "rtfmRestrictionProfile"
  | "ctfmRestrictionProfile"
  | "cfmuFlightType"
  | "ccamsSSRCode"
  | "filedRegistrationMark"
  | "isProposalFlight"
  | "hasBeenForced"
  | "caughtInHotspots"
  | "hotspots"
  | "mcdmInfo"
  | "worstLoadStateAtReferenceLocation"
  | "compareWithOtherTrafficType"
  | "ctotLimitReason"
  | "profileValidity"
  | "targetTimeOverFix"
  | "flightState"
  | "lastKnownPosition"
  | "highestModelPointProfile"
  | "highestModelAirspaceProfile"
  | "highestModelRestrictionProfile"
  | "slotSwapCounter"
  | "slotSwapCandidateList"
  | "aircraftAddress"
  | "arrivalInformation"
  | "slotZone"
  | "flightDataVersionNr"
  | "applicableScenarios"
  | "apiSubmissionRules"
  | "avoidedRegulations"
  | "routeChargeIndicator"
  | "fuelConsumptionIndicator"
  | "excludedRegulations"
  | "yoyoFlightForLocation"
  | "turnFlightForLocation"
  | "minimumRequestedRVR"
  | "wakeTurbulenceCategory"
  | "alternateAerodromes"
  | "flightCriticality"
  | "oceanicReroute"
  | "visibility"
  | "iataFlightDesignator"
  | "activeACDMAlerts"
  | "aoReroutingFeedbacks"
  | "atcCoordinatedRoute"
  | string;

/**
 * Represents an invalid filing for a flight plan
 */
export interface InvalidFiling {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  filingTime: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  invalidMessageType: FlightPlanMessageType;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  invalidMessageStatus: FlightPlanMessageStatus;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  keys?: FlightKeys;
}
/**
 * Possible values for a Flight Plan message type
 * xs:string with enumeration values: "FPL", "CHG", "CNL", "DLA", "DEP", "ARR", "RQP", "RQS", "FNM", "MFS", "APL", "ACH", "AFP"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FlightPlanMessageType =
  | "FPL"
  | "CHG"
  | "CNL"
  | "DLA"
  | "DEP"
  | "ARR"
  | "RQP"
  | "RQS"
  | "FNM"
  | "MFS"
  | "APL"
  | "ACH"
  | "AFP"
  | string;

/**
 * Possible values for a Flight Plan message status
 * xs:string with enumeration values: "INVALID", "REJECTED", "REFERRED", "DELETED", "DISCARD", "MULTIPLE"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FlightPlanMessageStatus =
  | "INVALID"
  | "REJECTED"
  | "REFERRED"
  | "DELETED"
  | "DISCARD"
  | "MULTIPLE"
  | string;

/**
 * Key details for identifying a flight.
 */
export interface FlightKeys {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  aircraftId: string; //ExtendedAircraftICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aerodromeOfDeparture?: string; //AerodromeICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  nonICAOAerodromeOfDeparture?: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  airFiled: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aerodromeOfDestination?: string; //AerodromeICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  nonICAOAerodromeOfDestination?: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  estimatedOffBlockTime: DateTimeMinute;
}

/**
 * Collaborative Decision Making (CDM) information for a flight
 */
export interface CDM {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  status: CDMStatus;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  airportType: DepartureAirportType;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  info?: CDMInfo;
}

/**
 *  Possible CDM statuses for a flight
 * xs:string with enumeration values: "DEPARTING_FROM_STANDARD_AIRPORT", "DEPARTING_FROM_CDM_AIRPORT", "ESTIMATED", "TARGETED", "PRE_SEQUENCED", "ACTUAL_OFFBLOCK", "PREDICTED"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type CDMStatus =
  | "DEPARTING_FROM_STANDARD_AIRPORT"
  | "DEPARTING_FROM_CDM_AIRPORT"
  | "ESTIMATED"
  | "TARGETED"
  | "PRE_SEQUENCED"
  | "ACTUAL_OFFBLOCK"
  | "PREDICTED"
  | string;
/**
 *  Possible Departure Airport Types
 *  xs:string with enumeration values: "STANDARD", "ADVANCED_ATC_TWR", "CDM"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type DepartureAirportType =
  | "STANDARD"
  | "ADVANCED_ATC_TWR"
  | "CDM"
  | string;

/**
 * Represents CDM information for a flight
 */
export interface CDMInfo {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  turnaroundTargetTakeOffTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  earliestTargetTakeOffTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  consolidatedTargetTakeOffTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  atcTargetTakeOffTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  taxiTime?: DurationHourMinuteSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  offBlockTimeDiscrepancy: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  flightStatusOutbound?: ATVFlightStatusOutbound;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  departureProc?: string; //airspace:TerminalProcedure
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  departureRunway?: string; //airspace:RunwayId
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  departureTerminal?: TerminalOrApronStandName;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  departureApronStand?: TerminalOrApronStandName;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aircraftTypeDiscrepancy?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aircraftType?: string; //AircraftType
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aircraftTypeIATA?: string; //AircraftTypeIATAId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  registrationMark?: AircraftRegistrationMark;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  registrationMarkDiscrepancy?: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  departureStatus: DepartureStatus;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  targetOffBlockTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  targetStartupApprovalTime?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aircraftIdInbound?: string; //AircraftICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  ifplIdInbound?: string; //IFPLId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  registrationMarkInbound?: AircraftRegistrationMark;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  cancelReason?: ReasonForDPICancellation;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  iataFlightDesignator?: string; //AircraftIATAId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  iataFlightDesignatorDiscrepancy?: boolean;
}
/**
 * The status of an outbound flight as determined by the ATV
 */
export type ATVFlightStatusOutbound = string; //Will be extended in next request
/**
 * Name of a terminal or apron stand
 */
export type TerminalOrApronStandName = string; //Will be extended in next request
/**
 * Aircraft type
 */
export type AircraftType = string; //Will be extended in next request
/**
 * Aircraft Type IATA identifier
 */
export type AircraftTypeIATAId = string; //Will be extended in next request
/**
 * Aircraft ICAO identifier
 */
export type AircraftICAOId = string; //Will be extended in next request
/**
 * Aircraft Registration mark
 */
export type AircraftRegistrationMark = string;
/**
 *  The departure status
 */
export type DepartureStatus = string; //Will be extended in next request
/**
 * Possible reasons for a DPI Cancellation
 */
export type ReasonForDPICancellation = string; //Will be extended in next request
/**
 * Aircraft IATA identifier
 */
export type AircraftIATAId = string; //Will be extended in next request

/**
 *  Information about a proposal
 */
export interface ProposalInformation {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  proposalKind: ProposalKind;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  responseBy: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  proposedCTOT?: DateTimeMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  routeId?: ReroutingRouteId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaCost?: Cost;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaDelay?: SignedDurationHourMinuteSecond;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  reroutingId?: ReroutingId;
}
/**
 * A route id used for rerouting
 */
export type ReroutingRouteId = string;
/**
 * Possible values for a proposal kind
 * xs:string with enumeration values: "SIP", "RVR", "RRP", "STAM_SLOT", "DELAY_CONF"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type ProposalKind =
  | "SIP"
  | "RVR"
  | "RRP"
  | "STAM_SLOT"
  | "DELAY_CONF"
  | string;

/**
 * Possible values for an ATFM message type
 * xs:string with enumeration values: "DES", "ERR", "FCM", "FUM", "FLS", "REA", "RFI", "RJT", "RRN", "RRP", "SAM", "SIP", "SLC", "SMM", "SPA", "SRJ", "SRM", "SWM", "UNK"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type ATFMMessageType =
  | "DES"
  | "ERR"
  | "FCM"
  | "FUM"
  | "FLS"
  | "REA"
  | "RFI"
  | "RJT"
  | "RRN"
  | "RRP"
  | "SAM"
  | "SIP"
  | "SLC"
  | "SMM"
  | "SPA"
  | "SRJ"
  | "SRM"
  | "SWM"
  | "UNK"
  | string;

/**
 * Represents the departure tolerance for a flight
 */
export interface DepartureTolerance {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  toleranceWindow: TimeHourMinutePeriod;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  extended: boolean;
}

/**
 * Represents a point associated with a flight
 */
export interface FlightPoint {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  timeOver: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  flightLevel: FlightLevel;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  entryTrend: FlightTrend;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  exitTrend: FlightTrend;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  associatedRouteOrTerminalProcedure?: RouteOrTerminalProcedure;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  coveredDistance: number; //common:DistanceNM
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  isVisible: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aerodrome?: string; //airspace:AerodromeICAOId
  /**
      * @minOccurs 0
      * @maxOccursICAOPoint
    /**
     * @minOccurs 0
     * @maxOccurs 1
     */
  flightPlanPoint?: boolean;
}

/**
 * Represents an airspace profile for a flight
 */
export interface FlightAirspace {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  airspaceId: AirspaceId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  airspaceType: AirspaceType;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  firstEntryTime: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  firstEntryFlightLevel: FlightLevel;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  lastExitFlightLevel: FlightLevel;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  firstEntryTrend: FlightTrend;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  middleTrend: FlightTrend;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  firstEntryDistance: number; //common:DistanceNM
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  lastExitTime: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  lastExitTrend: FlightTrend;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  lastExitDistance: number; //common:DistanceNM;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  occupancyDuration: string; //common:DurationHourMinuteSecond
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  occupancyDistance: number; //common:DistanceNM
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  activated: boolean;
}

/**
 * Represents a traffic volume profile for a flight
 */
export interface FlightTrafficVolume {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  trafficVolumeId: string; //airspace:TrafficVolumeId
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  entryTime: DateTimeSecond;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  entryFlightLevel?: FlightLevel;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  entryTrend: FlightTrend;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  middleTrend: FlightTrend;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  exitTime: DateTimeSecond;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  exitFlightLevel?: FlightLevel;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  exitTrend: FlightTrend;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  activated: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  exempted: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  flows?: {
    item?: Flow[];
  };
}

/**
 * Represents a requested flight level
 */
export interface RequestedFlightLevel {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  flightLevel: FlightLevel;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   * xs:int with minInclusive="0" and maxInclusive="9999"
   */
  segmentSequenceNumber: number;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   * xs:int with minInclusive="0" and maxInclusive="100"
   */
  relativeDistance: number;
}
/**
 * Possible values for a Flight Event Type
 * xs:string with enumeration values: "ACH", "ADI", "ADT", "AFI", "APL", "APR", "ATT", "AXT", "CAL", "CDI", "CEO", "CMC", "CMN", "CNC", "CPR", "CPT", "CRL", "CRQ", "CSC", "CSU", "DAU", "EDI", "EMR", "FCM", "FDI", "FLS", "FSA", "FUM", "GAI", "IAR", "ICA", "ICH", "IDE", "IDL", "IFP", "MET", "MSG", "NEV", "OAI", "OAR", "OCA", "OCM", "ODA", "OEX", "OIC", "ORX", "PDI", "PFI", "PTX", "REA", "RFR", "RJT", "RPU", "RRF", "RRM", "RSF", "RSI", "RSU", "SCA", "SCM", "SIP", "SIT", "SMM", "SPA", "SRJ", "SSC", "SSM", "SSP", "SSR", "SUS", "TAC", "TAI", "TAM", "TDE", "TDI", "TPF", "TRC", "TRE", "TRM", "TSA", "TSC", "TTE", "UAA", "UCD", "UFA", "UFC", "UXC", "XCR"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FlightEventType =
  | "ACH"
  | "ADI"
  | "ADT"
  | "AFI"
  | "APL"
  | "APR"
  | "ATT"
  | "AXT"
  | "CAL"
  | "CDI"
  | "CEO"
  | "CMC"
  | "CMN"
  | "CNC"
  | "CPR"
  | "CPT"
  | "CRL"
  | "CRQ"
  | "CSC"
  | "CSU"
  | "DAU"
  | "EDI"
  | "EMR"
  | "FCM"
  | "FDI"
  | "FLS"
  | "FSA"
  | "FUM"
  | "GAI"
  | "IAR"
  | "ICA"
  | "ICH"
  | "IDE"
  | "IDL"
  | "IFP"
  | "MET"
  | "MSG"
  | "NEV"
  | "OAI"
  | "OAR"
  | "OCA"
  | "OCM"
  | "ODA"
  | "OEX"
  | "OIC"
  | "ORX"
  | "PDI"
  | "PFI"
  | "PTX"
  | "REA"
  | "RFR"
  | "RJT"
  | "RPU"
  | "RRF"
  | "RRM"
  | "RSF"
  | "RSI"
  | "RSU"
  | "SCA"
  | "SCM"
  | "SIP"
  | "SIT"
  | "SMM"
  | "SPA"
  | "SRJ"
  | "SSC"
  | "SSM"
  | "SSP"
  | "SSR"
  | "SUS"
  | "TAC"
  | "TAI"
  | "TAM"
  | "TDE"
  | "TDI"
  | "TPF"
  | "TRC"
  | "TRE"
  | "TRM"
  | "TSA"
  | "TSC"
  | "TTE"
  | "UAA"
  | "UCD"
  | "UFA"
  | "UFC"
  | "UXC"
  | "XCR"
  | string;

/**
 * Represents an event in the history of a flight
 */
export interface FlightEvent {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  timestamp: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  type: FlightEventType;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  resultingState: FlightState;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  resultingOffBlockTime: DateTimeMinute;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  efdSent: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  fumSent: boolean;
}
/**
 * Possible values for a flight state
 * xs:string with enumeration values: "PLANNED", "PLANNED_SLOT_ALLOCATED", "PLANNED_REROUTED", "PLANNED_SLOT_ALLOCATED_REROUTED", "FILED", "FILED_SLOT_ALLOCATED", "FILED_SLOT_ISSUED", "TACT_ACTIVATED", "ATC_ACTIVATED", "CANCELLED", "TERMINATED"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FlightState =
  | "PLANNED"
  | "PLANNED_SLOT_ALLOCATED"
  | "PLANNED_REROUTED"
  | "PLANNED_SLOT_ALLOCATED_REROUTED"
  | "FILED"
  | "FILED_SLOT_ALLOCATED"
  | "FILED_SLOT_ISSUED"
  | "TACT_ACTIVATED"
  | "ATC_ACTIVATED"
  | "CANCELLED"
  | "TERMINATED"
  | string;

/**
 * Represents rerouting opportunities for a flight
 */
export interface ReroutingOpportunities {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  oplogTimestamp: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  reroutingId: ReroutingId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  offBlockTimeValidity?: DateTimeMinutePeriod;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!`"~@#$%^&\(\)\[\]\{\}\r\n]{0,99999}"
   */
  reroutingNote: string;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  reroutingPurpose: ReroutingPurpose;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!`"~@#$%^&\(\)\[\]\{\}\r\n]{0,10000}"
   */
  referenceRoute?: string;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  opportunities?: {
    item?: AlternativeRouteInfo[];
  };
}
/**
 * Represents an alternative route
 */
export interface AlternativeRouteInfo {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  routeId: string; //ReroutingRouteId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!`"~@#$%^&\(\)\[\]\{\}\r\n]{0,10000}"
   */
  icaoRoute: string;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  duration?: DurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaDuration?: SignedDurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  length?: number; //common:DistanceNM
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaLength?: SignedDistanceNM;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  delay?: SignedDurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaDelay?: SignedDurationHourMinute;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  routeChargeIndicator?: Cost;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaRouteChargeIndicator?: Cost;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  consumedFuelIndicator?: WeightKg;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaConsumedFuelIndicator?: SignedWeightKg;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  totalCost: Cost;
}

/**
 * Represents a flight restriction
 */
export interface FlightRestriction {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  timeOver: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  coveredDistance: number; //common:DistanceNM
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  flightPlanProcessing: string; //airspace:FlightPlanProcessing
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  restrictionId: string; //airspace:RestrictionId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  event: EntryExit;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  position: string; //common:Position;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  flightLevel: FlightLevel;
}
/**
 *  Possible values for entry/exit
 *  xs:string with enumeration values: "ENTRY", "EXIT"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type EntryExit = "ENTRY" | "EXIT" | string;
/**
 *  Possible values for a CFMU Flight Type
 *  xs:string with enumeration values: "MFD", "IFPL", "ACT", "TACT_ACTIVATED", "TERMINATED", "PREDICTED_FLIGHT"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type CfmuFlightType =
  | "MFD"
  | "IFPL"
  | "ACT"
  | "TACT_ACTIVATED"
  | "TERMINATED"
  | "PREDICTED_FLIGHT"
  | string;
/**
 * Represents a SSR code
 * xs:string with pattern "[0-9]{4}"
 */
export type SSRCode = string;

/**
 * Load State at reference location
 */
export type LoadStateAtReferenceLocation = {
  ENTRY?: string; //airspace:LoadState,
  OCCUPANCY?: OtmvStatus;
};

/**
 * Represents a delta for a flight entry
 */
export interface DeltaEntry {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  intruderKind: IntruderKind;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  originOfIntruder?: string; //airspace:AirspaceId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   *  xs:int with minInclusive="-999" and maxInclusive="999"
   */
  deltaMinutes: number;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   *  xs:int with minInclusive="-999" and maxInclusive="999"
   */
  deltaFlightLevel: number;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  deltaPosition: number; //common:DistanceNM
}

/**
 * Possible values for a intruder kind
 * xs:string with enumeration values: "FLIGHT", "FLOW", "REGULATION"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type IntruderKind = "FLIGHT" | "FLOW" | "REGULATION" | string;

/**
 * Represents a target time for a flight
 */
export interface TargetTime {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  regulationId: RegulationId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  targetTime: DateTimeSecond;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  targetLevel: FlightLevel;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  aerodromeICAOId?: AerodromeICAOId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  point?: ICAOPoint;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  flightPlanPoint?: boolean;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  coveredDistance: number; //common:DistanceNM
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  actualTimeAtTarget?: ActualTimeAtTarget;
}

/**
 * Represents an actual time at target
 */
export interface ActualTimeAtTarget {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  estimatedActualTimeAtTarget: DateTimeMinute;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  targetTimeCompliance: IntervalPosition;
}
/**
 * Interval position for target time compliance
 */
export type IntervalPosition = "EARLY" | "ON_TIME" | "LATE" | string;

/**
 *  @description Defines the status of a piece of equipment.
 *  @example
 *  - "EQUIPPED": The equipment is installed and functioning.
 *  - "NOT_EQUIPPED": The equipment is not installed or not functioning.
 *  - "OTHER:some_other_status": The equipment status with a user defined status.
 */
export type EquipmentStatus = "EQUIPPED" | "NOT_EQUIPPED" | `OTHER:${string}`;

/**
 * @description Represents the type of a log entry related to flight operations.
 *
 * @example
 * - "UNDEFINED": An undefined log entry.
 * - "INCOMING_MESSAGE": Log entry for an incoming message.
 * - "ERRONEOUS_INCOMING_MESSAGE": Log entry for an erroneous incoming message.
 * - "OUTGOING_MESSAGE": Log entry for an outgoing message.
 * - "VIOLATION": Log entry for a violation.
 * - "HISTORY": Log entry for historical information.
 * - "WARNING": Log entry for a warning.
 * - "PROCESS_ERROR": Log entry for a process error.
 * - "ERROR_MESSAGE": Log entry for an error message.
 * - "ENVIRONMENT_MESSSAGE": Log entry for an environment message.
 * - "USER_COMMAND": Log entry for a user command.
 * - "TEXT_MESSAGE": Log entry for a text message.
 * - "OTHER:some_other_type": Log entry of another type with user defined type.
 */
export type FlightOperationalLogEntryType =
  | "UNDEFINED"
  | "INCOMING_MESSAGE"
  | "ERRONEOUS_INCOMING_MESSAGE"
  | "OUTGOING_MESSAGE"
  | "VIOLATION"
  | "HISTORY"
  | "WARNING"
  | "PROCESS_ERROR"
  | "ERROR_MESSAGE"
  | "ENVIRONMENT_MESSSAGE"
  | "USER_COMMAND"
  | "TEXT_MESSAGE"
  | `OTHER:${string}`;

/**
 * @description Describes the capabilities and status of various equipment on an aircraft.
 */
export interface EquipmentCapabilityAndStatus {
  gbas?: EquipmentStatus;
  lpv?: EquipmentStatus;
  loranC?: EquipmentStatus;
  dme?: EquipmentStatus;
  fmcWprAcars?: EquipmentStatus;
  dFisAcars?: EquipmentStatus;
  pdcAcars?: EquipmentStatus;
  adf?: EquipmentStatus;
  gnss?: EquipmentStatus;
  hfRtf?: EquipmentStatus;
  inertialNavigation?: EquipmentStatus;
  cpdlcAtnVdlMode2?: EquipmentStatus;
  cpdlcFans1AHFDL?: EquipmentStatus;
  cpdlcFans1AVdlModeA?: EquipmentStatus;
  cpdlcFans1AVdlMode2?: EquipmentStatus;
  cpdlcFans1ASatcomInmarsat?: EquipmentStatus;
  cpdlcFans1ASatcomMtsat?: EquipmentStatus;
  cpdlcFans1ASatcomIridium?: EquipmentStatus;
  mls?: EquipmentStatus;
  ils?: EquipmentStatus;
  atcRtfSatcomInmarsat?: EquipmentStatus;
  atcRtfSatcomMtsat?: EquipmentStatus;
  atcRtfSatcomIridium?: EquipmentStatus;
  vor?: EquipmentStatus;
  rcp1?: EquipmentStatus;
  rcp2?: EquipmentStatus;
  rcp3?: EquipmentStatus;
  rcp4?: EquipmentStatus;
  rcp5?: EquipmentStatus;
  rcp6?: EquipmentStatus;
  rcp7?: EquipmentStatus;
  rcp8?: EquipmentStatus;
  rcp9?: EquipmentStatus;
  pbnApproved?: EquipmentStatus;
  standard?: EquipmentStatus;
  tacan?: EquipmentStatus;
  uhfRtf?: EquipmentStatus;
  vhfRtf?: EquipmentStatus;
  rvsm?: EquipmentStatus;
  mnps?: EquipmentStatus;
  khz833?: EquipmentStatus;
  other?: EquipmentStatus;
}

/**
 * @description Describes the capabilities and status of various equipment on an aircraft.
 */
export interface EquipmentCapabilityAndStatus {
  gbas?: EquipmentStatus;
  lpv?: EquipmentStatus;
  loranC?: EquipmentStatus;
  dme?: EquipmentStatus;
  fmcWprAcars?: EquipmentStatus;
  dFisAcars?: EquipmentStatus;
  pdcAcars?: EquipmentStatus;
  adf?: EquipmentStatus;
  gnss?: EquipmentStatus;
  hfRtf?: EquipmentStatus;
  inertialNavigation?: EquipmentStatus;
  cpdlcAtnVdlMode2?: EquipmentStatus;
  cpdlcFans1AHFDL?: EquipmentStatus;
  cpdlcFans1AVdlModeA?: EquipmentStatus;
  cpdlcFans1AVdlMode2?: EquipmentStatus;
  cpdlcFans1ASatcomInmarsat?: EquipmentStatus;
  cpdlcFans1ASatcomMtsat?: EquipmentStatus;
  cpdlcFans1ASatcomIridium?: EquipmentStatus;
  mls?: EquipmentStatus;
  ils?: EquipmentStatus;
  atcRtfSatcomInmarsat?: EquipmentStatus;
  atcRtfSatcomMtsat?: EquipmentStatus;
  atcRtfSatcomIridium?: EquipmentStatus;
  vor?: EquipmentStatus;
  rcp1?: EquipmentStatus;
  rcp2?: EquipmentStatus;
  rcp3?: EquipmentStatus;
  rcp4?: EquipmentStatus;
  rcp5?: EquipmentStatus;
  rcp6?: EquipmentStatus;
  rcp7?: EquipmentStatus;
  rcp8?: EquipmentStatus;
  rcp9?: EquipmentStatus;
  pbnApproved?: EquipmentStatus;
  standard?: EquipmentStatus;
  tacan?: EquipmentStatus;
  uhfRtf?: EquipmentStatus;
  vhfRtf?: EquipmentStatus;
  rvsm?: EquipmentStatus;
  mnps?: EquipmentStatus;
  khz833?: EquipmentStatus;
  other?: EquipmentStatus;
}

/**
 * @description Represents the status of an inbound flight in the arrival context.
 * @example
 * - "ARRIVING": The flight is currently arriving.
 * - "DIVERTED": The flight has been diverted from its original destination.
 * - "EXPECTED": The flight is expected to arrive.
 * - "LANDED": The flight has successfully landed.
 * - "OTHER:some_other_status": Another user-defined status.
 */
export type ATVFlightStatusInbound =
  | "ARRIVING"
  | "DIVERTED"
  | "EXPECTED"
  | "LANDED"
  | `OTHER:${string}`;

/**
 * @description Represents the severity indicator for an impact.
 * @example
 * - "NO_IMPACT": There is no impact.
 * - "LOW": The impact is low.
 * - "MEDIUM": The impact is medium.
 * - "HIGH": The impact is high.
 * - "OTHER:some_other_severity": The impact with a user defined severity.
 */
export type ImpactSeverityIndicator =
  | "NO_IMPACT"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | `OTHER:${string}`;

/**
 * @description Represents information about the arrival of a flight.
 */
export interface ArrivalInformation {
  flightStatusInbound?: ATVFlightStatusInbound;
  registrationMark?: AircraftRegistrationMark;
  aircraftType?: AircraftTypeICAOId;
  aircraftIATAId?: AircraftIATAId;
  arrivalTaxiTime?: DurationHourMinute;
  apiArrivalProcedure?: TerminalProcedure;
  nmArrivalProcedure?: TerminalProcedure;
  initialApproachFix?: PublishedPointId;
  arrivalRunway?: RunwayId;
  arrivalTerminal?: TerminalOrApronStandName;
  arrivalApronStand?: TerminalOrApronStandName;
  minimumTurnaroundTime?: DurationHourMinute;
  landingTime?: DateTimeMinute;
  scheduledInBlockTime?: DateTimeMinute;
  inBlockTime?: DateTimeMinute;
  airportSlotArrival?: DateTimeMinute;
  impactSeverityIndicator?: ImpactSeverityIndicator;
  coordinationFix?: AerodromeOrPublishedPointId;
  targetTimeOver?: DateTimeMinute;
  earliestTargetTimeOver?: DateTimeMinute;
  consolidatedTargetTimeOver?: DateTimeMinute;
  calculatedTimeOver?: DateTimeMinute;
  regulationId?: RegulationId;
  minCalculatedTimeOver?: DateTimeMinute;
  maxCalculatedTimeOver?: DateTimeMinute;
  estimatedOrActualTimeOver?: DateTimeMinute;
}

/**
 * @description Represents the reason for a Calculated Take Off Time (CTOT) limit.
 *
 * @example
 * - "SLOT_TIME_NOT_LIMITED": The slot time is not limited.
 * - "FORCED_BY_TOWER": The CTOT is forced by the tower.
 * - "FORCED_BY_NMOC": The CTOT is forced by the NMOC.
 * - "WAS_FORCED_BY_NMOC": The CTOT was forced by the NMOC.
 * - "FORCED_BY_CHAMAN": The CTOT is forced by CHAMAN.
 * - "FORCED_BY_STAM_MEASURE": The CTOT is forced by a STAM measure.
 * - "LIMITED_BY_VIOLATION": The CTOT is limited by a violation.
 * - "LIMITED_BY_VIOLATION_THEN_ZERO_RATE_OR_RVR": The CTOT is limited by a violation, then a zero rate or RVR.
 * - "SLOT_EXTENSION": The CTOT is due to slot extension.
 *  - "OTHER:some_other_reason": The CTOT is limited by another user defined reason.
 */
export type CTOTLimitReason =
  | "SLOT_TIME_NOT_LIMITED"
  | "FORCED_BY_TOWER"
  | "FORCED_BY_NMOC"
  | "WAS_FORCED_BY_NMOC"
  | "FORCED_BY_CHAMAN"
  | "FORCED_BY_STAM_MEASURE"
  | "LIMITED_BY_VIOLATION"
  | "LIMITED_BY_VIOLATION_THEN_ZERO_RATE_OR_RVR"
  | "SLOT_EXTENSION"
  | `OTHER:${string}`;

/**
 * @description Represents a 4D position including time, latitude, longitude, and optionally a level.
 */
export interface FourDPosition {
  timeOver: DateTimeSecond;
  position: Position;
  level?: FlightLevel;
}

/**
 * @description Represents a geographical position with latitude and longitude.
 */
export interface Position {
  latitude: Latitude;
  longitude: Longitude;
}

/**
 * @description Represents a latitude value.
 * @restriction base="xs:double"
 */
export type Latitude = number; //xs:double

/**
 * @description Represents a longitude value.
 * @restriction base="xs:double"
 */
export type Longitude = number; //xs:double

/**
 * @description Represents an ICAO aircraft address.
 * @example
 *  - "A1B2C3": An example of an ICAO aircraft address.
 * @restriction  The value is a string that matches the pattern "[A-F0-9]{6}"
 */
export type ICAOAircraftAddress = string; //xs:string pattern="[A-F0-9]{6}"

/**
 * @description Represents a time zone around the Calculated Take Off Time (CTO).
 */
export interface SlotZone {
  beforeCTO: DurationMinute;
  afterCTO: DurationMinute;
}

/**
 * Represents a flight operational log entry.
 */
export interface FlightOperationalLogEntry {
  /**
   * The timestamp of the log entry.
   */
  timestamp?: DateTimeSecond;

  /**
   * The type of the log entry.
   */
  type?: FlightOperationalLogEntryType;

  /**
   * The ETFMS ID (European Terminal Flight Management System ID).
   */
  etfmsId?: number;

  /**
   * The IFPL ID of the flight.
   */
  ifplId?: IFPLId;

  /**
   * The issuer of the log entry.
   */
  issuer?: string;

  /**
   * The message associated with the log entry.
   */
  message?: string;

  /**
   * Summary fields associated with the log entry.
   */
  summaryFields?: string[];
}

/**
 * Represents a flight data version number.
 *
 * **XSD String Constraints:**
 * - Minimum inclusive value: 0
 * - Maximum inclusive value: 99999
 */
export type FlightDataVersionNumber = number;

/**
 * Represents a candidate for a slot swap.
 */
export interface SlotSwapCandidate {
  /**
   * The IFPL ID of the candidate flight.
   *
   * **XSD String Constraints:**
   * - Matches the pattern: ([A-Z]{2}[0-9]{8})
   */
  ifplId: IFPLId;

  /**
   * The delta delay in minutes for the subject flight.
   */
  subjectDeltaDelayMinutes: number;

  /**
   * The delta delay in minutes for the candidate flight.
   */
  candidateDeltaDelayMinutes: number;

  /**
   * The time by which a decision on the swap must be made.
   */
  swapDecideByTime: DateTimeMinute;
}

/**
 * Represents a counter for slot swaps.
 */
export interface SlotSwapCounter {
  /**
   * The current value of the counter.
   *
   * **XSD String Constraints:**
   * - Minimum inclusive value: 0
   */
  currentCounter: number;

  /**
   * The maximum limit for the counter.
   *
   * **XSD String Constraints:**
   * - Minimum inclusive value: 0
   */
  maxLimit: number;
}

/**
 * Represents a candidate for a slot swap.
 */
export interface SlotSwapCandidate {
  /**
   * The IFPL ID of the candidate flight.
   *
   * **XSD String Constraints:**
   * - Matches the pattern: ([A-Z]{2}[0-9]{8})
   */
  ifplId: string;

  /**
   * The delta delay in minutes for the subject flight.
   */
  subjectDeltaDelayMinutes: number;

  /**
   * The delta delay in minutes for the candidate flight.
   */
  candidateDeltaDelayMinutes: number;

  /**
   * The time by which a decision on the swap must be made.
   */
  swapDecideByTime: DateTimeMinute;
}

/**
 * @enum {string}
 * Represents the validity kind of a profile.
 *
 * **XSD String Constraints:**
 * - `VIOLATIONS`
 * - `NO_VIOLATIONS`
 * - `UNKNOWN`
 * - `OTHER:[a-zA-Z_][a-zA-Z0-9_]*`
 */
export type ProfileValidityKind =
  | "VIOLATIONS"
  | "NO_VIOLATIONS"
  | "UNKNOWN"
  | `OTHER:${string}`;

/**
 * Represents the validity of a profile.
 */
export interface ProfileValidity {
  /**
   * The kind of profile validity.
   */
  profileValidityKind: ProfileValidityKind;

  /**
   * The last valid End Of Block Time (EOBT).
   */
  lastValidEOBT?: DateTimeMinute;
}

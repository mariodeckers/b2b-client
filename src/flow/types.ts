import type {
  AirNavigationUnitId,
  Cost,
  DurationHourMinute,
  SignedDurationHourMinuteSecond,
} from "../common/types.ts";
import type {
  ReferenceLocationAerodrome,
  ReferenceLocationAerodromeSet,
  ReferenceLocationAirspace,
  ReferenceLocationDBEPoint,
  ReferenceLocationPublishedPoint,
  TrafficVolumeLocationInfo,
} from "../airspace/types.ts";

/**
 * Type for Counts calculation
 * xs:string with enumeration values: "ENTRY", "OCCUPANCY"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type CountsCalculationType = "ENTRY" | "OCCUPANCY" | string;

/**
 *  Represents an interval for counts
 */
export interface CountsInterval {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  duration: DurationHourMinute;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  step: DurationHourMinute;
}

/**
 * Represents an Id for a regulation
 * xs:string with maxLength="8" and pattern "((([A-Z]([A-Z]|[0-9]){0,5})[0-9]{2})[A-Z]{0,1})"
 */
export type RegulationId = string;

/**
 * Location of a regulation
 */
export interface FlightRegulationLocation {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  regulationId: RegulationId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationPublishedPoint"?:
    ReferenceLocationPublishedPoint;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationDBEPoint"?: ReferenceLocationDBEPoint;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationAirspace"?: ReferenceLocationAirspace;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationAerodrome"?: ReferenceLocationAerodrome;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationAerodromeSet"?:
    ReferenceLocationAerodromeSet;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  toConfirm: boolean;
}

/**
 * Cause of a regulation
 */
export interface RegulationCause {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  reason: RegulationReason;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  locationCategory: RegulationLocationCategory;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   * xs:int with minInclusive="0"
   */
  iataDelayCode: number;
}

/**
 *  Reason for a regulation
 *  xs:string with enumeration values: "ACCIDENT_INCIDENT", "ATC_CAPACITY", "AERODROME_SERVICES", "AERODROME_CAPACITY", "ATC_INDUSTRIAL_ACTION", "NON_ATC_INDUSTRIAL_ACTION", "WEATHER", "AIRSPACE_MANAGEMENT", "SPECIAL_EVENT", "ATC_ROUTINGS", "ATC_STAFFING", "ATC_EQUIPMENT", "ENVIRONMENTAL_ISSUES", "OTHERS"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type RegulationReason =
  | "ACCIDENT_INCIDENT"
  | "ATC_CAPACITY"
  | "AERODROME_SERVICES"
  | "AERODROME_CAPACITY"
  | "ATC_INDUSTRIAL_ACTION"
  | "NON_ATC_INDUSTRIAL_ACTION"
  | "WEATHER"
  | "AIRSPACE_MANAGEMENT"
  | "SPECIAL_EVENT"
  | "ATC_ROUTINGS"
  | "ATC_STAFFING"
  | "ATC_EQUIPMENT"
  | "ENVIRONMENTAL_ISSUES"
  | "OTHERS"
  | string;

/**
 * Category of a regulation location
 *  xs:string with enumeration values: "ARRIVAL", "DEPARTURE", "ENROUTE"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type RegulationLocationCategory =
  | "ARRIVAL"
  | "DEPARTURE"
  | "ENROUTE"
  | string;

/**
 * Represents a summary of group rerouting
 */
export interface GroupReroutingSummary {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  groupReroutingIndicator: GroupReroutingIndicator;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  reroutingId: ReroutingId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  deltaCost: Cost;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaDelay?: SignedDurationHourMinuteSecond;
}

/**
 * Rerouting Id
 */
export type ReroutingId = string;
/**
 * The purpose of a rerouting
 */
export type ReroutingPurpose = string;
/**
 *  Possible values for a OTMV status
 *  xs:string with enumeration values: "OVERLOAD", "UNDERLOAD", "NORMAL", "UNKNOWN"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type OtmvStatus =
  | "OVERLOAD"
  | "UNDERLOAD"
  | "NORMAL"
  | "UNKNOWN"
  | string;
/**
 * Represents a flow
 */
export type Flow = string;

/**
 * Possible values for a Group Rerouting indicator
 *  xs:string with enumeration values: "POSSIBLE", "EXECUTED", "NO_MATCH"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type GroupReroutingIndicator =
  | "POSSIBLE"
  | "EXECUTED"
  | "NO_MATCH"
  | string;
/**
 * Represents a measure identifier
 */
export type MeasureId = string;

/**
 * Represents a summary of group rerouting
 */
export interface GroupReroutingSummary {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  groupReroutingIndicator: GroupReroutingIndicator;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  reroutingId: ReroutingId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  deltaCost: number; //common:Cost;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  deltaDelay?: string; //common:SignedDurationHourMinuteSecond;
}

/**
 * Possible values for a rerouting apply kind
 * xs:string with enumeration values: "TRY", "APPLY"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type ReroutingApplyKind = "TRY" | "APPLY" | string;
/**
 * Represents a flight ATFM MCDM only location
 */
export interface FlightAtfcmMcdmOnlyLocation
  extends FlightAtfcmMeasureLocation {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  mcdmOnlyMeasureId: string; //RegulationId
}
/**
 * Represents a flight ATFM regulation location
 */
export interface FlightAtfcmRegulationLocation
  extends FlightAtfcmMeasureLocation {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  regulationId: string; //RegulationId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  toConfirm: boolean;
}
/**
 * Represents a flight ATFM rerouting location
 */
export interface FlightAtfcmReroutingLocation
  extends FlightAtfcmMeasureLocation {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  reroutingId: ReroutingId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  reroutingApplyKind: ReroutingApplyKind;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  groupReroutingIndicator: GroupReroutingIndicator;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  reroutingPurpose: ReroutingPurpose;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!`"~@#$%^&\(\)\[\]\{\}\r\n]{0,1000}"
   */
  requestText?: string;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  aoAcknowledgedRRP: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  originator?: AirNavigationUnitId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  originatorLatestReroutingProposalFlight: boolean;
}

/**
 * Abstract base type for flight ATFCM measure locations
 */
export interface FlightAtfcmMeasureLocation {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  trafficVolumeLocationInfo?: TrafficVolumeLocationInfo;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  measureSubType: MeasureSubType;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  hotspotId?: HotspotId;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  mcdmState?: MCDMState;
}
/**
 * Possible values for a measure sub type
 *  xs:string with enumeration values: "REGULATION", "REROUTING"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type MeasureSubType = "REGULATION" | "REROUTING" | string;
/**
 * Represents a hotspot identifier
 */
export type HotspotId = string;
/**
 * Possible values for a MCDM State
 *  xs:string with enumeration values: "NONE", "VALID", "EXPIRED", "CANCELLED", "REPLACED"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type MCDMState =
  | "NONE"
  | "VALID"
  | "EXPIRED"
  | "CANCELLED"
  | "REPLACED"
  | string;
/**
 * Represents a hotspot location for a flight
 */
export interface FlightHotspotLocation {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  hotspot: Hotspot;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationPublishedPoint"?:
    ReferenceLocationPublishedPoint;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationDBEPoint"?: ReferenceLocationDBEPoint;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationAirspace"?: ReferenceLocationAirspace;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationAerodrome"?: ReferenceLocationAerodrome;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "referenceLocation-ReferenceLocationAerodromeSet"?:
    ReferenceLocationAerodromeSet;
}

/**
 *  Possible values for a Hotspot Kind
 *  xs:string with enumeration values: "LOCATION_OF_INTEREST", "PROBLEM"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type HotspotKind = "LOCATION_OF_INTEREST" | "PROBLEM" | string;
/**
 * Represents a hotspot
 */
export type Hotspot = string; //Will be extended in next request
/**
 * Represents a MCDM info for a flight
 */
export interface FlightMCDMInfo {
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  leastAdvancedMCDMMeasure?: MeasureId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   * xs:int with minInclusive="0"
   */
  nrAssociatedMCDMRegulations: number;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   * xs:int with minInclusive="0"
   */
  nrAssociatedMCDMReroutings: number;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  leastAdvancedMCDMState: MCDMState;
}

/**
 * Represents a collection of traffic volume scenarios.
 */
export interface TrafficVolumeScenarios {
  /**
   * The ID of the solution traffic volume.
   */
  solutionTrafficVolumeId: string; // Assuming airspace:TrafficVolumeId is a string

  /**
   * The kind of matching between the traffic volume and the scenarios.
   */
  trafficVolumeMatchingKind: ScenarioTrafficVolumeMatchingKind;

  /**
   * A list of scenario IDs.
   */
  scenarios?: ScenarioId[];
}

/**
 * @enum {string}
 * Represents the kind of matching between a traffic volume and a scenario.
 *
 * **XSD String Constraints:**
 * - `SAME_TRAFFIC_VOLUME`
 * - `SAME_REFERENCE_LOCATION`
 * - `OVERLAPPING_REFERENCE_LOCATION`
 * - `INDIRECT_OFFLOAD`
 * - `OTHER:[a-zA-Z_][a-zA-Z0-9_]*`
 */
export type ScenarioTrafficVolumeMatchingKind =
  | "SAME_TRAFFIC_VOLUME"
  | "SAME_REFERENCE_LOCATION"
  | "OVERLAPPING_REFERENCE_LOCATION"
  | "INDIRECT_OFFLOAD"
  | `OTHER:${string}`;

/**
 * Represents the ID of a scenario.
 *
 * **XSD String Constraints:**
 * - Matches the pattern: [a-zA-Z0-9_ \-\+/\\\|\*=&lt;&gt;,.;:?!'`&quot;~@#$%^&amp;\(\)\[\]\{\}]{1,255}
 */
export type ScenarioId = string;

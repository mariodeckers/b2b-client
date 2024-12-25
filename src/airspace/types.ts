// Placeholder for airspace types, will be extended in further requests
export type ReferenceLocationPublishedPoint = string;
export type ReferenceLocationDBEPoint = string;
export type ReferenceLocationAirspace = string;
export type ReferenceLocationAerodrome = string;
export type ReferenceLocationAerodromeSet = string;

/**
 * Represents the reference location information for a traffic volume.
 */
export type ReferenceLocation =
  | ReferenceLocationPublishedPoint
  | ReferenceLocationAirspace
  | ReferenceLocationAerodrome
  | ReferenceLocationDBEPoint
  | ReferenceLocationAerodromeSet;

/**
 * Represents the information about the location of a traffic volume.
 */
export interface TrafficVolumeLocationInfo {
  /**
   * The ID of the traffic volume.
   */
  trafficVolumeId: TrafficVolumeId;

  /**
   * The reference location for the traffic volume.
   */
  referenceLocation: ReferenceLocation;
}

/**
 * Represents an ICAO identifier for an aerodrome.
 * xs:string with pattern "[A-Z]{4}"
 */
export type AerodromeICAOId = string;

/**
 * Represents a flight level
 */
export interface FlightLevel {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  unit: FlightLevelUnit;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  level?: FlightLevel_DataType;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  ground?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  ceiling?: boolean;
}

/**
 *  Unit of measure for a FlightLevel
 *  xs:string with enumeration values: "FL", "M", "FT"
 *  xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type FlightLevelUnit = "FL" | "M" | "FT" | string;

/**
 *  Value of a flight level
 */
export type FlightLevel_DataType = number;

/**
 * Represents a terminal procedure.
 */
export interface TerminalProcedure {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  id?: RouteId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  DCT?: {};
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  pointId?: PublishedPointId;
}

/**
 * Identifier for a route.
 * xs:string with pattern "([A-Z]|[0-9]){1,7}"
 */
export type RouteId = string;

/**
 * Identifier for a published point.
 * xs:string with pattern "(([A-Z]|[0-9])|[_ \-\+/\\\|\*=<>,.;:?!'`"~@#$%^&\(\)\[\]\{\}]){1,5}"
 */
export type PublishedPointId = string;

/**
 * Represents an airspeed
 */
export interface AirSpeed {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  speed: AirSpeed_DataType;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  unit: SpeedUnit;
}

/**
 * Value for an AirSpeed
 */
export type AirSpeed_DataType = number;

/**
 * Unit for a speed
 * xs:string with enumeration values: "UNDEFINED", "KNOTS", "KILOMETERS_PER_HOUR", "MACH_NUMBER", "FEET_PER_MINUTE"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type SpeedUnit =
  | "UNDEFINED"
  | "KNOTS"
  | "KILOMETERS_PER_HOUR"
  | "MACH_NUMBER"
  | "FEET_PER_MINUTE"
  | string;

/**
 * xs:string with pattern "[a-zA-Z0-9_ \-\+/\\\|\*=<>,.;:?!'`"~@#$%^&\(\)\[\]\{\}]{1,8}"
 */
export type NetworkAddress = string;
/**
 * Possible values for an airspace type.
 * xs:string with enumeration values: "REG", "FIR", "AUA", "ES", "CS", "ERSA", "CRSA", "CDA", "AUAG", "AREA", "NAS", "IFPZ", "AOI", "AOP", "CLUS", "CRAS", "ERAS"
 * xs:string with pattern "OTHER:[a-zA-Z_][a-zA-Z0-9_]*"
 */
export type AirspaceType =
  | "REG"
  | "FIR"
  | "AUA"
  | "ES"
  | "CS"
  | "ERSA"
  | "CRSA"
  | "CDA"
  | "AUAG"
  | "AREA"
  | "NAS"
  | "IFPZ"
  | "AOI"
  | "AOP"
  | "CLUS"
  | "CRAS"
  | "ERAS"
  | string;

/**
 * Id of an airspace
 */
export type AirspaceId = string;

/**
 * Represents a route or terminal procedure
 */
export type RouteOrTerminalProcedure = string;

/**
 * Represents an ICAO point
 */
export interface ICAOPoint {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  pointId?: PublishedPointId;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "nonPublishedPoint-DBEPoint"?: DBEPoint;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "nonPublishedPoint-ReferencePoint"?: ReferencePoint;
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  "nonPublishedPoint-GeoPoint"?: GeoPoint;
}

/**
 * Represents a flight level
 */
export interface FlightLevel {
  /**
   * @minOccurs 1
   * @maxOccurs 1
   */
  unit: FlightLevelUnit;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  level?: FlightLevel_DataType;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  ground?: boolean;
  /**
   * @minOccurs 0
   * @maxOccurs 1
   */
  ceiling?: boolean;
}

/**
 * Represents a Flight Plan Processing type
 */
export type FlightPlanProcessing = string; //Will be extended in next request
/**
 * Represents a restriction identifier
 */
export type RestrictionId = string; //Will be extended in next request

// airspace-types.ts

/**
 * Represents the ID of a traffic volume.
 *
 * **XSD String Constraints:**
 * - Matches the pattern: ((([A-Z]|[0-9])|[_ \-\+/\\\|\*=&lt;&gt;,.;:?!'`&quot;~@#$%^&amp;\(\)\[\]\{\}]){1,8})
 */
export type TrafficVolumeId = string;

/**
 * Represents the ID of an aerodrome or a published point.
 */
export type AerodromeOrPublishedPointId = {
  aerodrome?: string; // Assuming airspace:AerodromeICAOId is a string
  point?: PublishedPointId;
};

/**
 * Represents the ID of a runway.
 *
 * **XSD String Constraints:**
 * - Matches the pattern: ([0-9]{2}([A-Z]|( )){0,1})
 */
export type RunwayId = string;

// airspace-types.ts

/**
 * Represents the ID of a DBE point.
 *
 * **XSD String Constraints:**
 * - Matches the pattern: ((([A-Z]|[0-9])|(\*)){1,5})
 */
export type DBEPointId = string;

/**
 * Represents a common interface for non-published points.
 */

/**
 * Represents a reference point.
 */
export interface ReferencePoint {
  /**
   * The ID of the published point used as reference.
   */
  reference: PublishedPointId;

  /**
   * The bearing from the reference point.
   */
  bearing: number; // Assuming common:Bearing is a number

  /**
   * The distance from the reference point in nautical miles.
   */
  distance: number; // Assuming common:DistanceNM is a number
}

/**
 * Represents a geographical point.
 */
export interface GeoPoint {
  /**
   * The geographical position of the point.
   */
  position: string; // Assuming common:Position is a complex type
}

// airspace-types.ts

// ... (previous definitions for DBEPointId, NonPublishedPoint, etc.)

/**
 * Represents a DBE (Data Block Entry) point.
 */
export interface DBEPoint {
  /**
   * The ID of the DBE point.
   */
  dbePointId: DBEPointId;
}

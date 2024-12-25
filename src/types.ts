import type { xml_document } from "@libs/xml";

export interface PemCertificate {
  cert: string;
  key: string;
}

export type XmlNamespace = {
  "@xmlns:as"?: "eurocontrol/cfmu/b2b/AirspaceServices";
  "@xmlns:cm"?: "eurocontrol/cfmu/b2b/CommonServices";
  "@xmlns:fl"?: "eurocontrol/cfmu/b2b/FlightServices";
  "@xmlns:fw"?: "eurocontrol/cfmu/b2b/FlowServices";
  "@xmlns:gi"?: "eurocontrol/cfmu/b2b/GeneralinformationServices";
};

export type XmlRequest<T, P extends string> =
  & {
    [K in `${P}:${string}`]: XmlNamespace & T;
  }
  & xml_document;

// export type XmlResponse<T, P extends string> = {
//     "@version": string;
//     "@encoding": string;
//     [K in `${P}:${string}`]: T & XmlNamespace;
//   };

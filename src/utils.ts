import { parse, stringify, type xml_document } from "@libs/xml";
import type { XmlRequest } from "./types.ts";

export function parseFromXML<T>(xml: string): T {
  return parse(xml) as T;
}

export function stringifyToXml<T>(data: T & xml_document): string {
  return stringify(data);
}

export function createXmlRequest<T, P extends string>(
  prefix: P,
  name: string,
  namespace: string,
  data: T,
): XmlRequest<T, P> {
  const elementName = `${prefix}:${name}`;
  const nsKey = `@xmlns:${prefix}`;

  return {
    [elementName]: {
      [nsKey]: namespace,
      ...data,
    },
  } as XmlRequest<T, P>;
}

// export function unwrapXmlResponse<T, P extends string>(
export function unwrapXmlResponse<T>(
  response: any, // Changed from Record<string, any> to handle XML response structure
  // response: Record<string, any>,
  prefix: string,
  name: string,
): T {
  // Get the root element with namespace prefix
  const rootKey = `${prefix}:${name}`;
  const root = response[rootKey];

  if (!root) {
    throw new Error(`Missing root element: ${rootKey}`);
  }

  // If there's a data property, return that, otherwise return the root
  return root as T;
}

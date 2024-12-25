import type {
  NMB2BProviderVersion,
  NMB2BVersion,
  NMPlatform,
  NMRelease,
  Reply,
  Request,
} from "../common/types.ts";

/**
 * Represents a request for NM release information.
 */
export interface NMReleaseInformationRequest extends Request {
}

/**
 * Represents the data part of a reply for NM release information.
 */
export interface NMReleaseInformationReplyData {
  /**
   * The NM Release version
   */
  release: NMRelease;
  /**
   * The baseline B2B provider version
   */
  baseline: NMB2BProviderVersion;
  /**
   * List of supported B2B versions
   */
  supportedB2BVersions?: NMB2BVersion[];
  /**
   * The platform on which the service is running
   */
  platform: NMPlatform;
}
/**
 * Represents a reply for NM release information.
 */
export interface NMReleaseInformationReply extends Reply {
  data: NMReleaseInformationReplyData;
}

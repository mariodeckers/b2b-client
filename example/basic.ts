import {
  BaseClient,
  CommonService,
  FlightService,
  GeneralInformationService,
} from "jsr:@mariodeckers/b2b-client"; // "../mod.ts"

console.log("Debug:", Deno.env.get("B2B_CLIENT_DEBUG"));

// deno with jsr specifier: import * as b_b_client from "jsr:@mariodeckers/b2b-client";
// npm, yarn, pnpm, bun: import * as b_b_client from "@mariodeckers/b2b-client";

const url =
  "https://www.b2b.preops.nm.eurocontrol.int/B2B_PREOPS/gateway/spec/27.0.0";

const pemCertificate = {
  cert: await Deno.readTextFile("./cert/cert.pem"), // cert: "----BEGIN CERTIFICATE----..."
  key: await Deno.readTextFile("./cert/private.key"), // key: "----BEGIN PRIVATE KEY----..."
};

const client = new BaseClient(url, pemCertificate);

const commonService = new CommonService(client);
const flightService = new FlightService(client);
const generalInformationService = new GeneralInformationService(client);

const currentTime = new Date();
const formattedTime = currentTime.toISOString().replace("T", " ").slice(0, 19);

// Order of arguments is important!

// Example 1:
const nmReleaseInformation = await generalInformationService
  .NMReleaseInformationRequest({
    endUserId: "c01234567",
    sendTime: formattedTime, // "2024-12-28 12:34:56",
  });
console.log("NM Release Information:", nmReleaseInformation.data);

// // Example 2:
// const subscriptionList = await commonService.SubscriptionListRequest({
//   sendTime: formattedTime, // "2024-12-28 12:34:56",
//   // states: {
//   //   item: [
//   //     "ACTIVE",
//   //     "PAUSED",
//   //     "SUSPENDED_ACTIVE",
//   //     "SUSPENDED_PAUSED",
//   //     "DELETED",
//   //   ],
//   // },
// });
// // console.log(subscriptionList);
// console.log(subscriptionList.data);

const someTimeAgo = new Date(currentTime.getTime() - 30 * 60 * 1000);
const wef = someTimeAgo.toISOString().replace("T", " ").slice(0, 16);
const unt = currentTime.toISOString().replace("T", " ").slice(0, 16);

// // Example 3:
// const flightListByAerodrome = await flightService.FlightListByAerodromeRequest({
//   sendTime: formattedTime, // "2024-12-28 12:34:56",
//   dataset: { type: "OPERATIONAL" },
//   includeProposalFlights: true,
//   includeForecastFlights: false,
//   trafficType: "LOAD",
//   trafficWindow: {
//     wef: wef, // "2024-12-28 12:04",
//     unt: unt, // "2024-12-28 12:34",
//   },
//   requestedFlightFields: ["aircraftOperator", "flightState"],
//   aerodrome: "EBBR",
//   aerodromeRole: "GLOBAL",
// });
// // console.log(flightListByAerodrome);
// console.log(flightListByAerodrome.data?.flights?.length);

// // Example 4:
// const flightListByAircraftOperator = await flightService
//   .FlightListByAircraftOperatorRequest({
//     sendTime: formattedTime, // "2024-12-28 12:34:56",
//     dataset: { type: "OPERATIONAL" },
//     includeProposalFlights: false,
//     includeForecastFlights: false,
//     trafficType: "LOAD",
//     trafficWindow: {
//       wef: wef, // "2024-12-28 12:04",
//       unt: unt, // "2024-12-28 12:34",
//     },
//     requestedFlightFields: ["aircraftOperator", "flightState"],
//     aircraftOperators: ["BEL"],
//   });
// // console.log(flightListByAircraftOperator);
// console.log(flightListByAircraftOperator.data?.flights?.length);
// flightListByAircraftOperator.data?.flights?.map((flight) => {
//   console.log(
//     flight.flight?.flightId.keys?.aircraftId,
//     flight.flight?.flightId.keys?.aerodromeOfDeparture,
//     flight.flight?.flightId.keys?.aerodromeOfDestination,
//   );
// });

// // Example 5: RESUME
// const subscriptionResume = await commonService.SubscriptionResumeRequest({
//   sendTime: formattedTime, // "2024-12-28 12:34:56",
//   uuid: "0cb80bb6-337d-48b4-980c-c542190b3b52",
// });
// console.log(subscriptionResume);

// // Example 6: PAUSE
// const subscriptionPause = await commonService.SubscriptionPauseRequest({
//   sendTime: formattedTime, // "2024-12-28 12:34:56",
//   uuid: "10ede124-4df0-470b-80d6-9c47d95a492a",
// });
// console.log(subscriptionPause);

// // Example 7: CREATE
// const flightDataSubscriptionCreation = await flightService.FlightDataSubscriptionCreationRequest({
//   sendTime: formattedTime, // "2024-12-28 12:34:56",
//   description: "TEST - FLIGHT_DATA - aerodrome EBBR",
//   messageFilter: {
//     includeProposalFlights: false,
//     flightSet: {
//       item: [
//         { aerodromesOfDeparture: { item: ["EBBR"] } },
//         { aerodromesOfArrival: { item: ["EBBR"] } }
//       ]
//           }
//   },
//   payloadConfiguration: {
//     flightFields: {
//       item: ["aircraftOperator", "aircraftType", "flightState", "lastKnownPosition", "actualTakeOffTime", "actualTimeOfArrival"]
//     },
//     concernedUnits: false,
//   }
// });
// // console.log(flightDataSubscriptionCreation);
// console.log(flightDataSubscriptionCreation.data);

// // Example 8: DELETE
// const subscriptionDeletion = await commonService.SubscriptionDeletionRequest({
//   sendTime: formattedTime, // "2024-12-28 12:34:56",
//   uuid: "0cb80bb6-337d-48b4-980c-c542190b3b52",
// });
// console.log(subscriptionDeletion);

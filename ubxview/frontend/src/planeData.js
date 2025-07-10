/**
 * @file planeData.js
 * @description This module defines the static data for the image planes to be displayed on the map.
 * Each object in the array represents a single map tile.
 */


import imageUrl5 from "./maps/4km-comp.png";

export const planeDefinitions = [
  {
    coords: {
      topLeft: { lat: 39.21416730751236, lon: -77.28195190429688 },
      bottomRight: { lat: 39.17691709496078, lon: -77.23388671875 },
    },
    imageUrl: imageUrl5,
  }
];




// Export an array of plane definitions.
// Each definition includes the GPS coordinates for the corners and the associated image.
// export const planeDefinitions = [
//   {
//     coords: {
//       topLeft: { lat: 39.19765, lon: -77.26297 },
//       bottomRight: { lat: 39.19313, lon: -77.25269 },
//     },
//     imageUrl: imageUrl1,
//   },
//   {
//     coords: {
//       topLeft: { lat: 39.19825189762832, lon: -77.27116912290145 },
//       bottomRight: { lat: 39.1949975309911, lon: -77.26156991187386 },
//     },
//     imageUrl: imageUrl2,
//   },
//   {
//     coords: {
//       topLeft: { lat: 39.20061851042063, lon: -77.26379585174547 },
//       bottomRight: { lat: 39.197566501086925, lon: -77.25418979124188 },
//     },
//     imageUrl: imageUrl3,
//   },
// ];

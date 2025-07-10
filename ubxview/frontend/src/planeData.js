/**
 * @file planeData.js
 * @description This module defines the static data for the image planes to be displayed on the map.
 * Each object in the array represents a single map tile.
 */

// Import the image assets for the map tiles.
// The paths are relative to this file's location.
import imageUrl1 from "./maps/SenecaMeadows1.png";
import imageUrl2 from "./maps/SenecaMeadows2.png";
import imageUrl3 from "./maps/SenecaMeadows3.png";

// Export an array of plane definitions.
// Each definition includes the GPS coordinates for the corners and the associated image.
export const planeDefinitions = [
  {
    coords: {
      topLeft: { lat: 39.19765, lon: -77.26297 },
      bottomRight: { lat: 39.19313, lon: -77.25269 },
    },
    imageUrl: imageUrl1,
  },
  {
    coords: {
      topLeft: { lat: 39.19825189762832, lon: -77.27116912290145 },
      bottomRight: { lat: 39.1949975309911, lon: -77.26156991187386 },
    },
    imageUrl: imageUrl2,
  },
  {
    coords: {
      topLeft: { lat: 39.20061851042063, lon: -77.26379585174547 },
      bottomRight: { lat: 39.197566501086925, lon: -77.25418979124188 },
    },
    imageUrl: imageUrl3,
  },
];

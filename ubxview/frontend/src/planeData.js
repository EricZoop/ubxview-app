/**
 * @file planeData.js
 * @description This module defines the static data for the image planes to be displayed on the map.
 * Each object in the array represents a single map tile.
 */

import imageUrl1 from "./maps/SenecaMeadows1.png";
import imageUrl2 from "./maps/SenecaMeadows2.png";
import imageUrl3 from "./maps/SenecaMeadows3.png";
import imageUrl4 from "./maps/SenecaMeadows4.png";

export const planeDefinitions = [

  // SENECA MEADOWS
  {
    coords: {
      topLeft: { lat: 39.218423, lon: -77.287445 },
      bottomRight: { lat: 39.196077, lon: -77.258606 },
    },
    imageUrl: imageUrl1,
  },
    {
    coords: {
      topLeft: { lat: 39.218423, lon: -77.258606 },
      bottomRight: { lat: 39.196077, lon: -77.228394 },
    },
    imageUrl: imageUrl2,
  },
    {
    coords: {
      topLeft: { lat: 39.196077, lon: -77.287445 },
      bottomRight: { lat: 39.172659, lon: -77.258606 },
    },
    imageUrl: imageUrl3,
  },
    {
    coords: {
      topLeft: { lat: 39.196077, lon: -77.258606 },
      bottomRight: { lat: 39.172659, lon: -77.228394 },
    },
    imageUrl: imageUrl4,
  }

];



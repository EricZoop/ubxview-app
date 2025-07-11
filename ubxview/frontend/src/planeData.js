/**
 * @file planeData.js
 * @description This module defines the static data for the image planes to be displayed on the map.
 * Each object in the array represents a single map tile.
 */

import imageUrl0 from "./maps/GermantownMD_10x10km.png";
import imageUrl1 from "./maps/RADA_2x2km.png";
import imageUrl2 from "./maps/BUTLERS_2x2km.png";
import imageUrl3 from "./maps/PEACH_2x2km.png";

export const planeDefinitions = [
  {
    coords: {
      topLeft: { lat: 39.24927084622339, lon: -77.32177734375 },
      bottomRight: { lat: 39.14710270770075, lon: -77.18994140625 },
    },
    imageUrl: imageUrl0,
  },
  {
    coords: {
      topLeft: { lat: 39.20459056764484, lon: -77.27096557617188 },
      bottomRight: { lat: 39.186497607181074, lon: -77.24624633789062 },
    },
    imageUrl: imageUrl1,
  },
  {
    coords: {
      topLeft: { lat: 39.23118939811205, lon: -77.23526000976562 },
      bottomRight: { lat: 39.212039255957414, lon: -77.21054077148438 },
    },
    imageUrl: imageUrl2,
  },
  {
    coords: {
      topLeft: { lat: 39.28223089949211, lon: -77.3382568359375 },
      bottomRight: { lat: 39.263094691154286, lon: -77.31353759765625 },
    },
    imageUrl: imageUrl3,
  },
];

/**
 * @file planeData.js
 * @description This module defines the static data for the image planes to be displayed on the map.
 * Each object in the array represents a single map tile.
 */


import imageUrl1 from "./maps/Rada_satellite_grid_row-0_5_col-0_5.png";
import imageUrl2 from "./maps/Rada_satellite_grid_row-0_5_col+0_5.png";
import imageUrl3 from "./maps/Rada_satellite_grid_row+0_5_col-0_5.png";
import imageUrl4 from "./maps/Rada_satellite_grid_row+0_5_col+0_5.png";
import imageUrl5 from "./maps/buttler_satellite_grid_row-0_5_col-0_5.png";
import imageUrl6 from "./maps/buttler_satellite_grid_row-0_5_col+0_5.png";
import imageUrl7 from "./maps/buttler_satellite_grid_row+0_5_col-0_5.png";
import imageUrl8 from "./maps/buttler_satellite_grid_row+0_5_col+0_5.png";

export const planeDefinitions = [
  {
    coords: {
      topLeft: { lat: 39.19607681367168, lon: -77.26959228515625 },
      bottomRight: { lat: 39.186497607181074, lon: -77.25723266601562 },
    },
    imageUrl: imageUrl1,
  },
  {
    coords: {
      topLeft: { lat: 39.19607681367168, lon: -77.25860595703125 },
      bottomRight: { lat: 39.186497607181074, lon: -77.244873046875 },
    },
    imageUrl: imageUrl2,
  },
  {
    coords: {
      topLeft: { lat: 39.20459056764484, lon: -77.26959228515625 },
      bottomRight: { lat: 39.19501252187822, lon: -77.25723266601562 },
    },
    imageUrl: imageUrl3,
  },
  {
    coords: {
      topLeft: { lat: 39.20459056764484, lon: -77.25860595703125 },
      bottomRight: { lat: 39.19501252187822, lon: -77.244873046875 },
    },
    imageUrl: imageUrl4,
  },
  {
    coords: {
      topLeft: { lat: 39.221614980063755, lon: -77.23526000976562 },
      bottomRight: { lat: 39.212039255957414, lon: -77.222900390625 },
    },
    imageUrl: imageUrl5,
  },
  {
    coords: {
      topLeft: { lat: 39.221614980063755, lon: -77.22427368164062 },
      bottomRight: { lat: 39.212039255957414, lon: -77.21054077148438 },
    },
    imageUrl: imageUrl6,
  },
  {
    coords: {
      topLeft: { lat: 39.23118939811205, lon: -77.23526000976562 },
      bottomRight: { lat: 39.22055107521368, lon: -77.222900390625 },
    },
    imageUrl: imageUrl7,
  },
  {
    coords: {
      topLeft: { lat: 39.23118939811205, lon: -77.22427368164062 },
      bottomRight: { lat: 39.22055107521368, lon: -77.21054077148438 },
    },
    imageUrl: imageUrl8,
  },
]
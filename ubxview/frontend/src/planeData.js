/**
 * @file planeData.js
 * @description This module defines the static data for the image planes to be displayed on the map.
 * Each object in the array represents a single map tile.
 */

// 20km x 20km (Seneca Meadows as center)
import imageUrl1 from "./maps/satellite_cell_0x0.png";
import imageUrl2 from "./maps/satellite_cell_0x1.png";
import imageUrl3 from "./maps/satellite_cell_0x2.png";
import imageUrl4 from "./maps/satellite_cell_0x3.png";
import imageUrl5 from "./maps/satellite_cell_0x4.png";
import imageUrl6 from "./maps/satellite_cell_1x0.png";
import imageUrl7 from "./maps/satellite_cell_1x1.png";
import imageUrl8 from "./maps/satellite_cell_1x2.png";
import imageUrl9 from "./maps/satellite_cell_1x3.png";
import imageUrl10 from "./maps/satellite_cell_1x4.png";
import imageUrl11 from "./maps/satellite_cell_2x0.png";
import imageUrl12 from "./maps/satellite_cell_2x1.png";
import imageUrl13 from "./maps/satellite_cell_2x2.png";
import imageUrl14 from "./maps/satellite_cell_2x3.png";
import imageUrl15 from "./maps/satellite_cell_2x4.png";
import imageUrl16 from "./maps/satellite_cell_3x0.png";
import imageUrl17 from "./maps/satellite_cell_3x1.png";
import imageUrl18 from "./maps/satellite_cell_3x2.png";
import imageUrl19 from "./maps/satellite_cell_3x3.png";
import imageUrl20 from "./maps/satellite_cell_3x4.png";
import imageUrl21 from "./maps/satellite_cell_4x0.png";
import imageUrl22 from "./maps/satellite_cell_4x1.png";
import imageUrl23 from "./maps/satellite_cell_4x2.png";
import imageUrl24 from "./maps/satellite_cell_4x3.png";
import imageUrl25 from "./maps/satellite_cell_4x4.png";

export const planeDefinitions = [
  {
    coords: {
      topLeft: { lat: 39.287545585410435, lon: -77.376708984375 },
      bottomRight: { lat: 39.250934230216444, lon: -77.3294677734375 },
    },
    imageUrl: imageUrl1,
  },
  {
    coords: {
      topLeft: { lat: 39.287545585410435, lon: -77.3294677734375 },
      bottomRight: { lat: 39.250934230216444, lon: -77.2822265625 },
    },
    imageUrl: imageUrl2,
  },
  {
    coords: {
      topLeft: { lat: 39.287545585410435, lon: -77.2822265625 },
      bottomRight: { lat: 39.250934230216444, lon: -77.2349853515625 },
    },
    imageUrl: imageUrl3,
  },
  {
    coords: {
      topLeft: { lat: 39.287545585410435, lon: -77.2349853515625 },
      bottomRight: { lat: 39.250934230216444, lon: -77.187744140625 },
    },
    imageUrl: imageUrl4,
  },
  {
    coords: {
      topLeft: { lat: 39.287545585410435, lon: -77.187744140625 },
      bottomRight: { lat: 39.250934230216444, lon: -77.1405029296875 },
    },
    imageUrl: imageUrl5,
  },
  {
    coords: {
      topLeft: { lat: 39.250934230216444, lon: -77.376708984375 },
      bottomRight: { lat: 39.214322875022454, lon: -77.3294677734375 },
    },
    imageUrl: imageUrl6,
  },
  {
    coords: {
      topLeft: { lat: 39.250934230216444, lon: -77.3294677734375 },
      bottomRight: { lat: 39.214322875022454, lon: -77.2822265625 },
    },
    imageUrl: imageUrl7,
  },
  {
    coords: {
      topLeft: { lat: 39.250934230216444, lon: -77.2822265625 },
      bottomRight: { lat: 39.214322875022454, lon: -77.2349853515625 },
    },
    imageUrl: imageUrl8,
  },
  {
    coords: {
      topLeft: { lat: 39.250934230216444, lon: -77.2349853515625 },
      bottomRight: { lat: 39.214322875022454, lon: -77.187744140625 },
    },
    imageUrl: imageUrl9,
  },
  {
    coords: {
      topLeft: { lat: 39.250934230216444, lon: -77.187744140625 },
      bottomRight: { lat: 39.214322875022454, lon: -77.1405029296875 },
    },
    imageUrl: imageUrl10,
  },
  {
    coords: {
      topLeft: { lat: 39.214322875022454, lon: -77.376708984375 },
      bottomRight: { lat: 39.17771151982846, lon: -77.3294677734375 },
    },
    imageUrl: imageUrl11,
  },
  {
    coords: {
      topLeft: { lat: 39.214322875022454, lon: -77.3294677734375 },
      bottomRight: { lat: 39.17771151982846, lon: -77.2822265625 },
    },
    imageUrl: imageUrl12,
  },
  {
    coords: {
      topLeft: { lat: 39.214322875022454, lon: -77.2822265625 },
      bottomRight: { lat: 39.17771151982846, lon: -77.2349853515625 },
    },
    imageUrl: imageUrl13,
  },
  {
    coords: {
      topLeft: { lat: 39.214322875022454, lon: -77.2349853515625 },
      bottomRight: { lat: 39.17771151982846, lon: -77.187744140625 },
    },
    imageUrl: imageUrl14,
  },
  {
    coords: {
      topLeft: { lat: 39.214322875022454, lon: -77.187744140625 },
      bottomRight: { lat: 39.17771151982846, lon: -77.1405029296875 },
    },
    imageUrl: imageUrl15,
  },
  {
    coords: {
      topLeft: { lat: 39.17771151982846, lon: -77.376708984375 },
      bottomRight: { lat: 39.14110016463447, lon: -77.3294677734375 },
    },
    imageUrl: imageUrl16,
  },
  {
    coords: {
      topLeft: { lat: 39.17771151982846, lon: -77.3294677734375 },
      bottomRight: { lat: 39.14110016463447, lon: -77.2822265625 },
    },
    imageUrl: imageUrl17,
  },
  {
    coords: {
      topLeft: { lat: 39.17771151982846, lon: -77.2822265625 },
      bottomRight: { lat: 39.14110016463447, lon: -77.2349853515625 },
    },
    imageUrl: imageUrl18,
  },
  {
    coords: {
      topLeft: { lat: 39.17771151982846, lon: -77.2349853515625 },
      bottomRight: { lat: 39.14110016463447, lon: -77.187744140625 },
    },
    imageUrl: imageUrl19,
  },
  {
    coords: {
      topLeft: { lat: 39.17771151982846, lon: -77.187744140625 },
      bottomRight: { lat: 39.14110016463447, lon: -77.1405029296875 },
    },
    imageUrl: imageUrl20,
  },
  {
    coords: {
      topLeft: { lat: 39.14110016463447, lon: -77.376708984375 },
      bottomRight: { lat: 39.10448880944048, lon: -77.3294677734375 },
    },
    imageUrl: imageUrl21,
  },
  {
    coords: {
      topLeft: { lat: 39.14110016463447, lon: -77.3294677734375 },
      bottomRight: { lat: 39.10448880944048, lon: -77.2822265625 },
    },
    imageUrl: imageUrl22,
  },
  {
    coords: {
      topLeft: { lat: 39.14110016463447, lon: -77.2822265625 },
      bottomRight: { lat: 39.10448880944048, lon: -77.2349853515625 },
    },
    imageUrl: imageUrl23,
  },
  {
    coords: {
      topLeft: { lat: 39.14110016463447, lon: -77.2349853515625 },
      bottomRight: { lat: 39.10448880944048, lon: -77.187744140625 },
    },
    imageUrl: imageUrl24,
  },
  {
    coords: {
      topLeft: { lat: 39.14110016463447, lon: -77.187744140625 },
      bottomRight: { lat: 39.10448880944048, lon: -77.1405029296875 },
    },
    imageUrl: imageUrl25,
  },
]
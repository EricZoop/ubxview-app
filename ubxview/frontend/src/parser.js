// parser.js

import * as THREE from 'three';
// Import the necessary functions from trailControls.js
import { getTrackVariantColor, isElevationModeActive } from './trailControls.js';

/**
 * Parses text content to find and convert GNGGA/GPGGA sentences into structured points.
 * This function ONLY parses text. It does not touch the DOM.
 * @param {string} text The raw text content from the file.
 * @returns {Array<{lat: number, lon: number, alt: number, time: number, satellites: number, undulation: number, talkerId: string}>} An array of GPS points.
 */
export function extractGpsPointsFromText(text) {
    const points = [];

    const cleanedText = text
        .replace(/[^\x20-\x7E\r\n$]/g, '') // Remove non-printable characters
        .replace(/\r\n|\r/g, '\n')
        .replace(/\n{2,}/g, '\n')
        .trim();

    const lines = cleanedText.split('\n');
    if (lines.length === 0) return points;

    const ggaRegex = /\$(?:GP|GN|GA|GB|GL)GGA,[^\r\n]*?\*[0-9A-Fa-f]{2}/g;
    const matches = cleanedText.match(ggaRegex);
    if (!matches) return points;

    let lastValidPoints = {}; // Store last valid point PER talker ID
    const MAX_REASONABLE_SPEED_MS = 250; // Max speed in m/s (~900 km/h or 560 mph)
    const MAX_DEGREE_JUMP = 0.5; // Max allowed lat/lon change between points

    for (const sentence of matches) {
        // The NMEA 0183 standard specifies a maximum sentence length of 82 characters.
        if (sentence.length > 82 && sentence.length < 86) {
            continue;
        }

        const parts = sentence.split(',');
        if (parts.length < 15) continue;

        try {
            const talkerId = sentence.substring(1, 3);

            const UTCstr = parts[1];
            const latStr = parts[2];
            const latDir = parts[3];
            const lonStr = parts[4];
            const lonDir = parts[5];
            const fixQuality = parseInt(parts[6]);
            const numSatellites = parseInt(parts[7]);
            const hdopStr = parts[8];
            const altStr = parts[9];
            const altUnits = parts[10];
            const undulationStr = parts[11];

            if (
                !latStr || !lonStr || !latDir || !lonDir || !altStr ||
                latStr.length < 4 || lonStr.length < 5 ||
                altUnits !== 'M' ||
                isNaN(fixQuality) || fixQuality === 0 ||
                isNaN(numSatellites) || numSatellites < 3
            ) continue;

            const hdop = parseFloat(hdopStr);
            if (isNaN(hdop) || hdop > 5.0) {
                continue;
            }

            const latDeg = parseFloat(latStr.substring(0, 2));
            const latMin = parseFloat(latStr.substring(2));
            if (isNaN(latDeg) || isNaN(latMin)) continue;
            let lat = latDeg + latMin / 60;
            if (latDir === 'S') lat = -lat;

            const lonDeg = parseFloat(lonStr.substring(0, 3));
            const lonMin = parseFloat(lonStr.substring(3));
            if (isNaN(lonDeg) || isNaN(lonMin)) continue;
            let lon = lonDeg + lonMin / 60;
            if (lonDir === 'W') lon = -lon;

            // Check for values outside -360 to 360
            if (Math.abs(lat) > 360 || Math.abs(lon) > 360) {
                continue;
            }

            const alt = parseFloat(altStr);
            const undulation = parseFloat(undulationStr) || 0;

            const h = parseInt(UTCstr.slice(0, 2)) || 0;
            const m = parseInt(UTCstr.slice(2, 4)) || 0;
            const s = parseFloat(UTCstr.slice(4)) || 0;
            const time = h * 3600 + m * 60 + s;

            const currentPoint = { lat, lon, alt, time, satellites: numSatellites, undulation, talkerId };

            const lastValidPoint = lastValidPoints[talkerId];
            if (lastValidPoint) {
                // ===== START: ADDED DEGREE JUMP CHECK =====
                const latJump = Math.abs(currentPoint.lat - lastValidPoint.lat);
                const lonJump = Math.abs(currentPoint.lon - lastValidPoint.lon);

                if (latJump > MAX_DEGREE_JUMP || lonJump > MAX_DEGREE_JUMP) {
                    continue; // Skip point if it's too far from the previous one
                }
                // ===== END: ADDED DEGREE JUMP CHECK =====


                // Speed-based outlier check (per talker)
                const timeDelta = currentPoint.time - lastValidPoint.time;
                if (timeDelta > 0) {
                    const distance = haversine(lastValidPoint.lat, lastValidPoint.lon, currentPoint.lat, currentPoint.lon);
                    const speed = distance / timeDelta;
                    if (speed > MAX_REASONABLE_SPEED_MS) {
                        continue;
                    }
                }
            }

            points.push(currentPoint);
            lastValidPoints[talkerId] = currentPoint; // Update the last known good point for this specific talker

        } catch {
            continue;
        }
    }

    return points;
}


function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth radius in meters
    const toRad = deg => deg * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}


function createTalkerStatsHTML(talkerId, headerColor) {
    return `
        <div class="stats-group">
            <h3 style="color: ${headerColor};">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${headerColor}">
                    <path d="M259-80q-75 0-127-53T80-261q0-75 52-127t127-52q22 0 42.5 5t38.5 14q14-29 15-60t-11-60q-19 10-40 15t-44 5q-75 0-127.5-52.5T80-701q0-75 52.5-127T260-880q75 0 127.5 52T440-701q0 23-5.5 44T419-617q29 12 60 11.5t60-14.5q-9-18-14-38.5t-5-42.5q0-75 52-127t127-52q75 0 128 52t53 127q0 75-53 128t-128 53q-24 0-45.5-6T612-543q-13 30-12 61.5t15 62.5q19-10 40-15.5t44-5.5q75 0 128 52t53 127q0 75-53 128T699-80q-75 0-127-53t-52-128q0-23 5.5-44t15.5-40q-31-14-62.5-15.5T417-349q11 20 17 42t6 46q0 75-53 128T259-80Zm440-520q42 0 71.5-29.5T800-701q0-42-29.5-70.5T699-800q-42 0-70.5 28.5T600-701q0 8 1.5 16.5T605-668l60-60q12-12 28-12t28 12q12 12 12 28t-12 28l-62 63q9 5 19 7t21 2Zm-439-1q10 0 19-2t17-5l-64-64q-12-12-12-28t12-28q12-12 28-12t28 12l65 64q3-8 5-17.5t2-19.5q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm439 441q42 0 71.5-29.5T800-261q0-42-29.5-70.5T699-360q-10 0-19 1.5t-17 4.5l66 66q12 12 12 28t-12 28q-13 12-29 12t-28-12l-65-65q-3 8-5 17t-2 19q0 42 28.5 71.5T699-160Zm-440 0q42 0 71.5-29.5T360-261q0-11-2-21.5t-7-19.5l-70 70q-12 12-28.5 12T224-232q-12-12-12-28t12-28l67-67q-8-2-16-3.5t-16-1.5q-42 0-70.5 28.5T160-261q0 42 28.5 71.5T259-160Zm221-280q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Z"/>
                </svg>
                Rover${talkerId}
            </h3>
            <table>
                <tbody>
                    <tr><td>Points:</td><td><span id="${talkerId}-points-stat">0</span></td></tr>
                    <tr><td>Latitude:</td><td><span id="${talkerId}-lat-stat">0.0</span>&deg;</td></tr>
                    <tr><td>Longitude:</td><td><span id="${talkerId}-long-stat">0.0</span>&deg;</td></tr>
                    <tr><td>Alt (MSL):</td><td><span id="${talkerId}-altitude-stat">0.0</span> m</td></tr>
                    <tr><td>Alt (WGS84):</td><td><span id="${talkerId}-altwsg84-stat">0.0</span> m</td></tr>
                    <tr><td>Speed:</td><td><span id="${talkerId}-speed-stat">0.0</span> m/s</td></tr>
                    <tr><td>2D Distance:</td><td><span id="${talkerId}-twod-stat">0.0</span> m</td></tr>
                    <tr><td>3D Distance:</td><td><span id="${talkerId}-threed-stat">0.0</span> m</td></tr>
                    <tr><td>Satellites:</td><td><span id="${talkerId}-satellites-stat">0</span></td></tr>
                    <tr><td>Start Time:</td><td><span id="${talkerId}-start-stat">--</span></td></tr>
                    <tr><td>End Time:</td><td><span id="${talkerId}-end-stat">--</span></td></tr>
                    <tr><td>Duration:</td><td><span id="${talkerId}-duration-stat">0.0</span> s</td></tr>
                </tbody>
            </table>
        </div>
    `;
}




export function updateStats(points) {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    statsContainer.innerHTML = '';

    if (!points || points.length === 0) {
        statsContainer.innerHTML = '<p>No GPS data found :(</p>';
        return;
    }

    const pointsByTalker = points.reduce((acc, point) => {
        const { talkerId } = point;
        if (!acc[talkerId]) {
            acc[talkerId] = [];
        }
        acc[talkerId].push(point);
        return acc;
    }, {});

    const tailColorPicker = document.getElementById('trail-tail-color');
    const baseColor = new THREE.Color(tailColorPicker ? tailColorPicker.value : '#00ffaa');

    Object.keys(pointsByTalker).forEach((talkerId, index) => {
        const talkerPoints = pointsByTalker[talkerId];
        
        // --- MODIFIED LOGIC ---
        // A. Generate a color for this rover's header
        let headerColorHex;
        if (isElevationModeActive()) {
            // If in elevation mode, use a neutral white color for all headers
            headerColorHex = '#ffffff'; 
        } else {
            // Otherwise, generate the unique color based on the track index
            const trackColor = getTrackVariantColor(baseColor, index);
            headerColorHex = `#${trackColor.getHexString()}`;
        }

        // B. Create and append the HTML for this talker's stats panel
        statsContainer.insertAdjacentHTML('beforeend', createTalkerStatsHTML(talkerId, headerColorHex));

        // C. Calculate stats for this specific talker
        const lastPoint = talkerPoints[talkerPoints.length - 1];
        const firstPoint = talkerPoints[0];

        const totalPoints = talkerPoints.length;
        const totalDuration = lastPoint.time - firstPoint.time;
        const currentAltitude = lastPoint.alt;
        const currentAltWsg84 = lastPoint.alt + (lastPoint.undulation || 0);
        const currentLat = lastPoint.lat;
        const currentLon = lastPoint.lon;
        const currentSatellites = lastPoint.satellites || 0;

        const formatTime = (timeInSeconds) => {
            const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
            const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        };

        const startTimeFormatted = formatTime(firstPoint.time);
        const endTimeFormatted = formatTime(lastPoint.time);

        let latestSpeed = 0;
        if (talkerPoints.length >= 2) {
            const p1 = talkerPoints[talkerPoints.length - 2];
            const p2 = lastPoint;
            const distance2D = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
            const timeDelta = p2.time - p1.time;
            if (timeDelta > 0) {
                latestSpeed = distance2D / timeDelta;
            }
        }

        let total2DDistance = 0;
        let total3DDistance = 0;
        for (let i = 1; i < talkerPoints.length; i++) {
            const p1 = talkerPoints[i - 1];
            const p2 = talkerPoints[i];
            const segment2DDistance = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
            total2DDistance += segment2DDistance;
            const altitudeChange = p2.alt - p1.alt;
            const segment3DDistance = Math.sqrt(Math.pow(segment2DDistance, 2) + Math.pow(altitudeChange, 2));
            total3DDistance += segment3DDistance;
        }

        // D. Update the DOM elements using the unique IDs we created
        document.getElementById(`${talkerId}-points-stat`).textContent = totalPoints;
        document.getElementById(`${talkerId}-duration-stat`).textContent = totalDuration.toFixed(1);
        document.getElementById(`${talkerId}-twod-stat`).textContent = total2DDistance.toFixed(1);
        document.getElementById(`${talkerId}-threed-stat`).textContent = total3DDistance.toFixed(1);
        document.getElementById(`${talkerId}-speed-stat`).textContent = latestSpeed.toFixed(2);
        document.getElementById(`${talkerId}-altitude-stat`).textContent = currentAltitude.toFixed(2);
        document.getElementById(`${talkerId}-altwsg84-stat`).textContent = currentAltWsg84.toFixed(2);
        document.getElementById(`${talkerId}-lat-stat`).textContent = currentLat.toFixed(7);
        document.getElementById(`${talkerId}-long-stat`).textContent = currentLon.toFixed(7);
        document.getElementById(`${talkerId}-satellites-stat`).textContent = currentSatellites;
        document.getElementById(`${talkerId}-start-stat`).textContent = startTimeFormatted;
        document.getElementById(`${talkerId}-end-stat`).textContent = endTimeFormatted;
    });
}
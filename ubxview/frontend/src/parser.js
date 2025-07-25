/**
 * Parses text content to find and convert GNGGA/GPGGA or custom $HPPOSLLH sentences into structured points.
 * This function ONLY parses text. It does not touch the DOM.
 * @param {string} text The raw text content from the file.
 * @returns {Array<{lat: number, lon: number, alt: number, time: number, satellites: number, undulation: number}>} An array of GPS points.
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

    // --- The CSV parsing block has been removed. ---

    // Check for custom $HPPOSLLH format
    if (lines[0].startsWith('$HPPOSLLH')) {
        for (const line of lines) {
            if (!line.startsWith('$HPPOSLLH')) continue;

            const parts = line.split(',');
            // Expected format: $HPPOSLLH,lat,lon,iTOW,height_ellipsoid,height_msl,...
            if (parts.length < 6) continue;

            try {
                const lat = parseFloat(parts[1]);
                const lon = parseFloat(parts[2]);
                const iTOW_ms = parseInt(parts[3]);
                const alt = parseFloat(parts[4]); // Use ellipsoid height for 'alt'
                const msl = parseFloat(parts[5]); // MSL height

                // Convert iTOW from milliseconds to seconds to be compatible with duration logic
                const time = iTOW_ms / 1000;
                const satellites = 0; // Not available in this format
                // Calculate undulation (Geoid separation) = MSL - Ellipsoid Height
                const undulation = msl - alt;

                if (!isNaN(lat) && !isNaN(lon) && !isNaN(alt) && !isNaN(time)) {
                    points.push({ lat, lon, alt, time, satellites, undulation });
                }
            } catch {
                continue;
            }
        }
        return points;
    }


    // --- FALLBACK: original NMEA parser ---
    const ggaRegex = /\$(?:GPGGA|GNGGA),[^\r\n]*?\*[0-9A-Fa-f]{2}/g;
    const matches = cleanedText.match(ggaRegex);
    if (!matches) return points;

    for (const sentence of matches) {
        const parts = sentence.split(',');
        if (parts.length < 15) continue;

        try {
            const UTCstr = parts[1];
            const latStr = parts[2];
            const latDir = parts[3];
            const lonStr = parts[4];
            const lonDir = parts[5];
            const fixQuality = parseInt(parts[6]);
            const numSatellites = parseInt(parts[7]);
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

            const alt = parseFloat(altStr);
            const undulation = parseFloat(undulationStr) || 0;

            const h = parseInt(UTCstr.slice(0, 2)) || 0;
            const m = parseInt(UTCstr.slice(2, 4)) || 0;
            const s = parseFloat(UTCstr.slice(4)) || 0;
            const time = h * 3600 + m * 60 + s;

            points.push({ lat, lon, alt, time, satellites: numSatellites, undulation });
        } catch {
            continue;
        }
    }

    return points;
}



/**
 * Calculates distance between two lat/lon points using Haversine formula.
 * @returns {number} Distance in meters.
 */
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

function parseTimeToSeconds(timestampStr) {
    // Example input: '2025-07-25 14:01:36.908'
    const timePart = timestampStr.split(' ')[1]; // '14:01:36.908'
    if (!timePart) return NaN;

    const [h, m, s] = timePart.split(':');
    const sec = parseFloat(s);
    return parseInt(h) * 3600 + parseInt(m) * 60 + sec;
}


/**
 * Calculates statistics from the full list of points and updates the DOM.
 * @param {Array<{lat: number, lon: number, alt: number, time: number, satellites: number, undulation: number}>} points The complete array of GPS points.
 */
export function updateStats(points) {
    // Get all DOM elements by their ID
    const pointsEl = document.getElementById('points-stat');
    const durationEl = document.getElementById('duration-stat');
    const twoDEl = document.getElementById('twod-stat');
    const threeDEl = document.getElementById('threed-stat');
    const speedEl = document.getElementById('speed-stat');
    const altitudeEl = document.getElementById('altitude-stat');
    const altWsg84El = document.getElementById('altwsg84-stat');
    const latEl = document.getElementById('lat-stat');
    const longEl = document.getElementById('long-stat');
    const satellitesEl = document.getElementById('satellites-stat');
    const startEl = document.getElementById('start-stat');
    // Get the end time element
    const endEl = document.getElementById('end-stat');

    // Handle the case where there are no points by resetting the stats
    if (!points || points.length === 0) {
        if (pointsEl) pointsEl.textContent = '0';
        if (durationEl) durationEl.textContent = '0.0';
        if (twoDEl) twoDEl.textContent = '0.0';
        if (threeDEl) threeDEl.textContent = '0.0';
        if (speedEl) speedEl.textContent = '0.00';
        if (altitudeEl) altitudeEl.textContent = '0.00';
        if (altWsg84El) altWsg84El.textContent = '0.00';
        if (latEl) latEl.textContent = '0.000000';
        if (longEl) longEl.textContent = '0.000000';
        if (satellitesEl) satellitesEl.textContent = '0';
        if (startEl) startEl.textContent = 'HH:mm:ss';
        // Reset the end time stat
        if (endEl) endEl.textContent = 'HH:mm:ss';
        return;
    }

    // --- STATISTIC CALCULATIONS ---

    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];

    // Basic stats from the last point or array length
    const totalPoints = points.length;
    const totalDuration = lastPoint.time - firstPoint.time;
    const currentAltitude = lastPoint.alt;
    const currentAltWsg84 = lastPoint.alt + (lastPoint.undulation || 0);
    const currentLat = lastPoint.lat;
    const currentLon = lastPoint.lon;
    const currentSatellites = lastPoint.satellites || 0;

    // Format start time as HH:mm:ss
    const startTime = firstPoint.time;
    const startHours = Math.floor(startTime / 3600);
    const startMinutes = Math.floor((startTime % 3600) / 60);
    const startSeconds = Math.floor(startTime % 60);
    const startTimeFormatted = `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}:${startSeconds.toString().padStart(2, '0')}`;
    
    // Format end time as HH:mm:ss
    const endTime = lastPoint.time;
    const endHours = Math.floor(endTime / 3600);
    const endMinutes = Math.floor((endTime % 3600) / 60);
    const endSeconds = Math.floor(endTime % 60);
    const endTimeFormatted = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}:${endSeconds.toString().padStart(2, '0')}`;


    // Speed (based on last 2 points' 2D distance)
    let latestSpeed = 0;
    if (points.length >= 2) {
        const p1 = points[points.length - 2];
        const p2 = lastPoint;
        const distance2D = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
        const timeDelta = p2.time - p1.time;
        if (timeDelta > 0) {
            latestSpeed = distance2D / timeDelta;
        }
    }

    // Initialize total distance accumulators
    let total2DDistance = 0;
    let total3DDistance = 0;

    // Loop through all points to calculate cumulative 2D and 3D distances
    for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];

        // Calculate 2D distance for this segment
        const segment2DDistance = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
        total2DDistance += segment2DDistance;

        // Calculate altitude change for this segment
        const altitudeChange = p2.alt - p1.alt;

        // Calculate 3D distance for this segment using Pythagorean theorem
        const segment3DDistance = Math.sqrt(Math.pow(segment2DDistance, 2) + Math.pow(altitudeChange, 2));
        total3DDistance += segment3DDistance;
    }

    // --- DOM UPDATES ---

    if (pointsEl) pointsEl.textContent = totalPoints;
    if (durationEl) durationEl.textContent = totalDuration.toFixed(1);
    if (twoDEl) twoDEl.textContent = total2DDistance.toFixed(1);
    if (threeDEl) threeDEl.textContent = total3DDistance.toFixed(1);
    if (speedEl) speedEl.textContent = latestSpeed.toFixed(2);
    if (altitudeEl) altitudeEl.textContent = currentAltitude.toFixed(2);
    if (altWsg84El) altWsg84El.textContent = currentAltWsg84.toFixed(2);
    if (latEl) latEl.textContent = currentLat.toFixed(7); // More precision for lat/lon
    if (longEl) longEl.textContent = currentLon.toFixed(7);
    if (satellitesEl) satellitesEl.textContent = currentSatellites;
    if (startEl) startEl.textContent = startTimeFormatted;
    // Update the end time stat
    if (endEl) endEl.textContent = endTimeFormatted;
}
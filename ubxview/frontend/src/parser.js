/**
 * Main parsing function that detects the data format and calls the appropriate parser.
 * @param {string} text The raw text content from the file.
 * @returns {Array<{lat: number, lon: number, alt: number, time: number, satellites: number, undulation: number}>} An array of GPS points.
 */
export function parseGpsData(text) {
    const cleanedText = text
        .replace(/[^\x20-\x7E\r\n$,.\-0-9A-Za-z]/g, '') // Clean non-printable chars, allow more for CSV
        .replace(/\r\n|\r/g, '\n')
        .replace(/\n{2,}/g, '\n');

    // Detect format and delegate to the correct parser
    if (cleanedText.includes('$GPGGA') || cleanedText.includes('$GNGGA')) {
        return extractGpsPointsFromNmea(cleanedText);
    } else if (cleanedText.includes('Longitude_deg,Latitude_deg')) {
        return extractGpsPointsFromCsv(cleanedText);
    }

    return []; // Return empty if format is unknown
}

/**
 * Parses NMEA GNGGA/GPGGA sentences from text into structured points.
 * This is an internal function. Use parseGpsData as the entry point.
 * @param {string} text The raw text content from the file.
 * @returns {Array} An array of GPS points.
 */
function extractGpsPointsFromNmea(text) {
    const points = [];
    const ggaRegex = /\$(?:GPGGA|GNGGA),[^\r\n]*?\*[0-9A-Fa-f]{2}/g;
    const matches = text.match(ggaRegex);

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

            if (!latStr || !lonStr || !latDir || !lonDir || !altStr || altUnits !== 'M' || isNaN(fixQuality) || fixQuality === 0 || isNaN(numSatellites) || numSatellites < 3) continue;

            const latDeg = parseFloat(latStr.substring(0, 2));
            const latMin = parseFloat(latStr.substring(2));
            let lat = latDeg + latMin / 60;
            if (latDir === 'S') lat = -lat;

            const lonDeg = parseFloat(lonStr.substring(0, 3));
            const lonMin = parseFloat(lonStr.substring(3));
            let lon = lonDeg + lonMin / 60;
            if (lonDir === 'W') lon = -lon;

            const alt = parseFloat(altStr);
            const undulation = parseFloat(undulationStr) || 0;
            const h = parseInt(UTCstr.slice(0, 2)) || 0;
            const m = parseInt(UTCstr.slice(2, 4)) || 0;
            const s = parseFloat(UTCstr.slice(4)) || 0;
            const time = h * 3600 + m * 60 + s;

            if (!isNaN(lat) && !isNaN(lon) && !isNaN(time) && !isNaN(alt)) {
                points.push({ lat, lon, alt, time, satellites: numSatellites, undulation });
            }
        } catch {
            continue;
        }
    }
    return points;
}

/**
 * Parses custom CSV data into structured points.
 * This is an internal function. Use parseGpsData as the entry point.
 * @param {string} text The raw text content from the file.
 * @returns {Array} An array of GPS points.
 */
function extractGpsPointsFromCsv(text) {
    const points = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');

    // Skip header if it exists
    if (lines.length > 0 && lines[0].includes('Timestamp,iTOW_ms')) {
        lines.shift();
    }

    for (const line of lines) {
        const parts = line.split(',');
        if (parts.length < 8) continue;

        try {
            const timestampStr = parts[0];
            const lon = parseFloat(parts[2]);
            const lat = parseFloat(parts[3]);
            const heightEllipsoid = parseFloat(parts[4]);
            const alt = parseFloat(parts[5]); // Height MSL

            if (isNaN(lon) || isNaN(lat) || isNaN(heightEllipsoid) || isNaN(alt)) continue;

            // Calculate undulation: Undulation = Ellipsoid Height - MSL Height
            const undulation = heightEllipsoid - alt;

            // Parse time from timestamp (e.g., "2025-07-25 14:01:36.908")
            const date = new Date(timestampStr.replace(' ', 'T') + 'Z'); // Treat as UTC
            const h = date.getUTCHours();
            const m = date.getUTCMinutes();
            const s = date.getUTCSeconds() + date.getUTCMilliseconds() / 1000;
            const time = h * 3600 + m * 60 + s;

            points.push({
                lat,
                lon,
                alt,
                time,
                satellites: 0, // CSV format does not provide satellite count
                undulation
            });
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
        if (endEl) endEl.textContent = 'HH:mm:ss';
        return;
    }

    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];

    const totalPoints = points.length;
    const totalDuration = lastPoint.time - firstPoint.time;
    const currentAltitude = lastPoint.alt;
    const currentAltWsg84 = lastPoint.alt + (lastPoint.undulation || 0);
    const currentLat = lastPoint.lat;
    const currentLon = lastPoint.lon;
    const currentSatellites = lastPoint.satellites || 0;

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const startTimeFormatted = formatTime(firstPoint.time);
    const endTimeFormatted = formatTime(lastPoint.time);

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

    let total2DDistance = 0;
    let total3DDistance = 0;

    for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];
        const segment2DDistance = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
        total2DDistance += segment2DDistance;
        const altitudeChange = p2.alt - p1.alt;
        const segment3DDistance = Math.sqrt(Math.pow(segment2DDistance, 2) + Math.pow(altitudeChange, 2));
        total3DDistance += segment3DDistance;
    }

    if (pointsEl) pointsEl.textContent = totalPoints;
    if (durationEl) durationEl.textContent = totalDuration.toFixed(1);
    if (twoDEl) twoDEl.textContent = total2DDistance.toFixed(1);
    if (threeDEl) threeDEl.textContent = total3DDistance.toFixed(1);
    if (speedEl) speedEl.textContent = latestSpeed.toFixed(2);
    if (altitudeEl) altitudeEl.textContent = currentAltitude.toFixed(2);
    if (altWsg84El) altWsg84El.textContent = currentAltWsg84.toFixed(2);
    if (latEl) latEl.textContent = currentLat.toFixed(6);
    if (longEl) longEl.textContent = currentLon.toFixed(6);
    if (satellitesEl) satellitesEl.textContent = currentSatellites;
    if (startEl) startEl.textContent = startTimeFormatted;
    if (endEl) endEl.textContent = endTimeFormatted;
}
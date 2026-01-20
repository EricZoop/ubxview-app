// parser.js
// Pure parsing logic - no DOM manipulation

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

    // Updated regex to match any 2-character talker ID (letters or numbers)
    const ggaRegex = /\$[A-Z0-9]{2}GGA,[^\r\n]*?\*[0-9A-Fa-f]{2}/g;
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
            // Extract the 2-character talker ID (any letters/numbers)
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
                // Degree jump check
                const latJump = Math.abs(currentPoint.lat - lastValidPoint.lat);
                const lonJump = Math.abs(currentPoint.lon - lastValidPoint.lon);

                if (latJump > MAX_DEGREE_JUMP || lonJump > MAX_DEGREE_JUMP) {
                    continue; // Skip point if it's too far from the previous one
                }

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

/**
 * Calculates the distance between two GPS coordinates using the Haversine formula.
 * @param {number} lat1 Latitude of first point
 * @param {number} lon1 Longitude of first point
 * @param {number} lat2 Latitude of second point
 * @param {number} lon2 Longitude of second point
 * @returns {number} Distance in meters
 */
export function haversine(lat1, lon1, lat2, lon2) {
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
 * Groups GPS points by their talker ID.
 * @param {Array} points Array of GPS points
 * @returns {Object} Object with talker IDs as keys and arrays of points as values
 */
export function groupPointsByTalker(points) {
    return points.reduce((acc, point) => {
        const { talkerId } = point;
        if (!acc[talkerId]) {
            acc[talkerId] = [];
        }
        acc[talkerId].push(point);
        return acc;
    }, {});
}

/**
 * Calculates statistics for a set of GPS points from a single talker.
 * @param {Array} talkerPoints Array of GPS points for one talker
 * @returns {Object} Statistics object
 */
export function calculateTalkerStats(talkerPoints) {
    if (!talkerPoints || talkerPoints.length === 0) {
        return null;
    }

    const lastPoint = talkerPoints[talkerPoints.length - 1];
    const firstPoint = talkerPoints[0];

    const totalPoints = talkerPoints.length;
    const totalDuration = lastPoint.time - firstPoint.time;
    const currentAltitude = lastPoint.alt;
    const currentAltWsg84 = lastPoint.alt + (lastPoint.undulation || 0);
    const currentLat = lastPoint.lat;
    const currentLon = lastPoint.lon;
    const currentSatellites = lastPoint.satellites || 0;

    // Calculate latest speed
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

    // Calculate total distances
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

    return {
        totalPoints,
        totalDuration,
        currentAltitude,
        currentAltWsg84,
        currentLat,
        currentLon,
        currentSatellites,
        latestSpeed,
        total2DDistance,
        total3DDistance,
        startTime: firstPoint.time,
        endTime: lastPoint.time
    };
}
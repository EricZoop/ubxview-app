// aircraftParser.js
// Parse PingStation NDJSON aircraft traffic data into GPS-compatible point format.
// Points are shaped to flow through the existing plotManager pipeline alongside rover data.

/**
 * Detects whether file content is PingStation NDJSON format.
 * Checks if the first non-empty line parses as JSON with a data.aircraft field.
 * @param {string} text - File content to check
 * @returns {boolean}
 */
export function isNDJSON(text) {
    const firstLine = text.trim().split('\n')[0];
    if (!firstLine) return false;
    try {
        const obj = JSON.parse(firstLine);
        return obj?.data?.aircraft !== undefined;
    } catch {
        return false;
    }
}

/**
 * Parse a single NDJSON line into an array of aircraft point objects.
 * Each aircraft in the line's data.aircraft array becomes one point.
 *
 * @param {string} line - A single JSON line from PingStation output
 * @returns {Array<Object>} Array of GPS-compatible aircraft points
 */
export function parseAircraftLine(line) {
    const points = [];
    try {
        const json = JSON.parse(line.trim());
        const aircraft = json?.data?.aircraft;
        if (!Array.isArray(aircraft) || aircraft.length === 0) return points;

        for (const ac of aircraft) {
            // Require essential position fields
            if (!ac.icaoAddress || ac.latDD == null || ac.lonDD == null || ac.altitudeMM == null) {
                continue;
            }
            // Skip null-island (0,0) positions — likely invalid
            if (ac.latDD === 0 && ac.lonDD === 0) continue;

            // --- Unit conversions ---
            const alt = ac.altitudeMM / 1000;              // millimeters → meters
            const horVelocity = (ac.horVelocityCMS || 0) / 100; // cm/s → m/s
            const verVelocity = (ac.verVelocityCMS || 0) / 100; // cm/s → m/s
            const heading = (ac.headingDE2 || 0) / 100;         // deci-degrees×10 → degrees

            // Parse UTC timestamp into seconds-of-day (matches NMEA time format)
            let time = 0;
            if (ac.timeStamp) {
                const d = new Date(ac.timeStamp);
                if (!isNaN(d.getTime())) {
                    time = d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
                }
            }

            // Barometric altitude difference (mm → m), useful for pressure alt
            const baroAltDiff = (ac.detail?.baroaltDiffMM || 0) / 1000;

            points.push({
                // --- Core fields (compatible with rover point shape) ---
                lat: ac.latDD,
                lon: ac.lonDD,
                alt,
                time,
                satellites: 0,       // N/A for ADS-B
                undulation: 0,       // N/A for ADS-B
                talkerId: ac.icaoAddress,

                // --- Aircraft-specific fields ---
                isAircraft: true,
                heading,
                horVelocity,
                verVelocity,
                emitterType: ac.emitterType ?? 0,
                altitudeType: ac.altitudeType ?? 0,
                baroAltDiff,
                trafficSource: ac.trafficSource ?? 0,
            });
        }
    } catch {
        // Skip malformed JSON lines silently
    }
    return points;
}

/**
 * Parse complete NDJSON file content into a flat array of aircraft points.
 * Applies basic validation and deduplication per ICAO address per timestamp.
 *
 * @param {string} text - Complete NDJSON file content
 * @returns {Array<Object>} All aircraft points extracted
 */
export function extractAircraftPointsFromText(text) {
    const lines = text.split('\n').filter(l => {
        const trimmed = l.trim();
        return trimmed.startsWith('{') && trimmed.endsWith('}');
    });

    const points = [];
    const seen = new Set(); // Dedupe: "ICAO:time" key

    for (const line of lines) {
        const linePoints = parseAircraftLine(line);
        for (const p of linePoints) {
            const key = `${p.talkerId}:${p.time}`;
            if (!seen.has(key)) {
                seen.add(key);
                points.push(p);
            }
        }
    }

    return points;
}

/**
 * Group aircraft points by ICAO address.
 * @param {Array} points - Array of aircraft points
 * @returns {Object} Object keyed by ICAO address
 */
export function groupAircraftByIcao(points) {
    return points.reduce((acc, p) => {
        if (!acc[p.talkerId]) acc[p.talkerId] = [];
        acc[p.talkerId].push(p);
        return acc;
    }, {});
}

/**
 * Calculate statistics for a set of aircraft points sharing one ICAO address.
 * Returns an object shaped for the stats UI, with aircraft-specific fields.
 *
 * @param {Array} acPoints - Points for a single ICAO address
 * @returns {Object|null} Stats object or null if empty
 */
export function calculateAircraftStats(acPoints) {
    if (!acPoints || acPoints.length === 0) return null;

    const last = acPoints[acPoints.length - 1];
    const first = acPoints[0];

    // Total 2D ground distance
    let total2DDistance = 0;
    for (let i = 1; i < acPoints.length; i++) {
        total2DDistance += haversineSimple(
            acPoints[i - 1].lat, acPoints[i - 1].lon,
            acPoints[i].lat, acPoints[i].lon
        );
    }

    // 3D distance (include altitude changes)
    let total3DDistance = 0;
    for (let i = 1; i < acPoints.length; i++) {
        const d2d = haversineSimple(
            acPoints[i - 1].lat, acPoints[i - 1].lon,
            acPoints[i].lat, acPoints[i].lon
        );
        const dAlt = acPoints[i].alt - acPoints[i - 1].alt;
        total3DDistance += Math.sqrt(d2d * d2d + dAlt * dAlt);
    }

    // Return-to-home distance
    const rth2D = haversineSimple(first.lat, first.lon, last.lat, last.lon);
    const rthAlt = last.alt - first.alt;
    const rthDistance3D = Math.sqrt(rth2D * rth2D + rthAlt * rthAlt);

    return {
        totalPoints: acPoints.length,
        totalDuration: last.time - first.time,
        currentAltitude: last.alt,
        currentLat: last.lat,
        currentLon: last.lon,
        heading: last.heading ?? 0,
        horVelocity: last.horVelocity ?? 0,
        verVelocity: last.verVelocity ?? 0,
        emitterType: last.emitterType ?? 0,
        altitudeType: last.altitudeType ?? 0,
        total2DDistance,
        total3DDistance,
        rthDistance3D,
        startTime: first.time,
        endTime: last.time,
        isAircraft: true,
    };
}

/**
 * Map emitter type code to human-readable string.
 * Based on DO-260B Table 2-75.
 * @param {number} code
 * @returns {string}
 */
export function emitterTypeLabel(code) {
    const labels = {
        0: 'Unknown',
        1: 'Light',
        2: 'Small',
        3: 'Large',
        4: 'High Vortex',
        5: 'Heavy',
        6: 'Maneuverable',
        7: 'Rotorcraft',
        9: 'Glider',
        10: 'Lighter-than-Air',
        11: 'Skydiver',
        12: 'Paraglider',
        14: 'UAV',
        15: 'Space Vehicle',
    };
    return labels[code] || `Type ${code}`;
}

// --- Internal helpers ---

function haversineSimple(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = d => d * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
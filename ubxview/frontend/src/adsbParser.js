// adsbParser.js
// Parses Newline Delimited JSON from ping station ADS-B receivers

/**
 * Detects whether text content is NDJSON (ADS-B) or NMEA format.
 * @param {string} text
 * @returns {'adsb' | 'nmea' | 'unknown'}
 */
export function detectDataFormat(text) {
    const firstLine = text.trim().split('\n')[0]?.trim();
    if (!firstLine) return 'unknown';

    if (firstLine.startsWith('{')) {
        try {
            const parsed = JSON.parse(firstLine);
            if (parsed.data?.aircraft !== undefined || parsed.receivedAt) return 'adsb';
        } catch (_) { /* fall through */ }
    }

    if (/^\$[A-Z0-9]{2}[A-Z]{3},/.test(firstLine)) return 'nmea';
    return 'unknown';
}

/**
 * Parses NDJSON text into GPS-compatible point arrays.
 * Points are shaped to work with plotManager / trailControls:
 * { lat, lon, alt, time, satellites, undulation, talkerId, dataType, ...extras }
 *
 * @param {string} text - Raw NDJSON content
 * @returns {Array<Object>}
 */
export function extractAdsbPointsFromText(text) {
    const points = [];
    const lines = text.split('\n').filter(l => l.trim());

    for (const line of lines) {
        let packet;
        try {
            packet = JSON.parse(line);
        } catch (_) {
            continue;
        }

        const receivedAt = packet.receivedAt || null;
        const aircraft = packet.data?.aircraft;
        if (!Array.isArray(aircraft) || aircraft.length === 0) continue;

        for (const ac of aircraft) {
            if (!ac.icaoAddress || ac.latDD == null || ac.lonDD == null || ac.altitudeMM == null) continue;
            if (Math.abs(ac.latDD) > 90 || Math.abs(ac.lonDD) > 180) continue;

            const rawAltM = ac.altitudeMM / 1000;
            const diffM = (ac.detail && ac.detail.baroaltDiffMM != null) 
                          ? ac.detail.baroaltDiffMM / 1000 
                          : null;

            let baroAlt = null;
            let geoAlt  = null;

            // altitudeType 0 = Barometric, 1 = Geometric (GNSS)
            if (ac.altitudeType === 0) {
                baroAlt = rawAltM;
                // If we have the difference, calculate Geometric: Geo = Baro + Diff
                if (diffM !== null) {
                    geoAlt = baroAlt + diffM;
                }
            } else if (ac.altitudeType === 1) {
                geoAlt = rawAltM;
                // If we have the difference, calculate Barometric: Baro = Geo - Diff
                if (diffM !== null) {
                    baroAlt = geoAlt - diffM;
                }
            }

            const horVelMs   = (ac.horVelocityCMS || 0) / 100;
            const verVelMs   = (ac.verVelocityCMS || 0) / 100;
            const headingDeg = (ac.headingDE2 || 0) / 100;

            const ts   = ac.timeStamp || receivedAt;
            const date = ts ? new Date(ts) : new Date();
            // Convert to seconds of day (UTC)
            const time = date.getUTCHours() * 3600
                       + date.getUTCMinutes() * 60
                       + date.getUTCSeconds()
                       + date.getUTCMilliseconds() / 1000;

            points.push({
                lat:        ac.latDD,
                lon:        ac.lonDD,
                alt:        geoAlt !== null ? geoAlt : baroAlt, // Prefer Geo for 3D plotting if available
                baroAlt,
                geoAlt,
                time,
                satellites: 0,
                undulation: 0,
                talkerId:   ac.icaoAddress,
                dataType:   'adsb',

                icaoAddress:   ac.icaoAddress,
                heading:       headingDeg,
                horVelocity:   horVelMs,
                verVelocity:   verVelMs,
                altitudeType:  ac.altitudeType ?? null,
                emitterType:   ac.emitterType  ?? null,
                receivedAt,
                rawAltitudeMM: ac.altitudeMM,
            });
        }
    }

    return points;
}

/**
 * Groups ADS-B points by icaoAddress.
 * @param {Array} points
 * @returns {Object}
 */
export function groupAdsbByAircraft(points) {
    return points.reduce((acc, p) => {
        const key = p.icaoAddress || p.talkerId;
        (acc[key] ??= []).push(p);
        return acc;
    }, {});
}

/**
 * Calculate stats for one aircraft track.
 * @param {Array} pts
 * @returns {Object|null}
 */
export function calculateAdsbAircraftStats(pts) {
    if (!pts || pts.length === 0) return null;

    const first = pts[0];
    const last  = pts[pts.length - 1];

    let totalGroundDist = 0;
    for (let i = 1; i < pts.length; i++) {
        totalGroundDist += _haversine(pts[i - 1].lat, pts[i - 1].lon, pts[i].lat, pts[i].lon);
    }

    return {
        icaoAddress:   last.icaoAddress,
        totalPoints:   pts.length,
        currentLat:    last.lat,
        currentLon:    last.lon,
        // UI expects these keys:
        currentAltM:     last.alt,
        currentBaroAltM: last.baroAlt,
        currentGeoAltM:  last.geoAlt,
        heading:       last.heading,
        horVelocityMs: last.horVelocity,
        verVelocityMs: last.verVelocity,
        emitterType:   last.emitterType,
        altitudeType:  last.altitudeType,
        startTime:     first.time,
        endTime:       last.time,
        duration:      last.time - first.time,
        lastSeen:      last.receivedAt,
        totalGroundDist,
    };
}

/**
 * Emitter type code to label.
 * @param {number} code
 * @returns {string}
 */
export function emitterTypeLabel(code) {
    const map = {
        0: 'Unknown', 1: 'Light', 2: 'Small', 3: 'Large',
        4: 'High Vortex', 5: 'Heavy', 6: 'Maneuverable',
        7: 'Rotorcraft', 9: 'Glider', 10: 'Balloon',
        11: 'Parachutist', 12: 'Ultralight', 14: 'UAV', 15: 'Space',
    };
    return map[code] ?? `Type ${code}`;
}

function _haversine(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = d => d * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2
            + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
            * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
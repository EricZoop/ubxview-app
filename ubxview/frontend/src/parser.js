/**
 * Parses text content to find and convert GNGGA/GPGGA sentences into structured points.
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

    // NMEA GGA parser only
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
            const fixQuality = parseInt(parts[6], 10);
            const numSatellites = parseInt(parts[7], 10);
            const altStr = parts[9];
            const altUnits = parts[10];
            const undulationStr = parts[11];

            // Strict validation
            if (
                !latStr || !lonStr || !latDir || !lonDir || !altStr || !UTCstr ||
                latStr.length < 4 || lonStr.length < 5 ||
                altUnits !== 'M' ||
                isNaN(fixQuality) || fixQuality === 0 ||
                isNaN(numSatellites) || numSatellites < 3 ||
                UTCstr.length < 6
            ) continue;

            // Parse coordinates with proper precision handling
            const latDegStr = latStr.substring(0, 2);
            const latMinStr = latStr.substring(2);
            const latDeg = parseInt(latDegStr, 10);
            const latMin = parseFloat(latMinStr);
            
            if (isNaN(latDeg) || isNaN(latMin) || latDeg < 0 || latDeg > 90 || latMin < 0 || latMin >= 60) continue;
            
            let lat = latDeg + latMin / 60;
            if (latDir === 'S') lat = -lat;

            const lonDegStr = lonStr.substring(0, 3);
            const lonMinStr = lonStr.substring(3);
            const lonDeg = parseInt(lonDegStr, 10);
            const lonMin = parseFloat(lonMinStr);
            
            if (isNaN(lonDeg) || isNaN(lonMin) || lonDeg < 0 || lonDeg > 180 || lonMin < 0 || lonMin >= 60) continue;
            
            let lon = lonDeg + lonMin / 60;
            if (lonDir === 'W') lon = -lon;

            // Validate coordinate bounds
            if (Math.abs(lat) > 90 || Math.abs(lon) > 180) continue;

            const alt = parseFloat(altStr);
            if (isNaN(alt)) continue;

            const undulation = parseFloat(undulationStr) || 0;

            // Parse time with consistent precision
            const timeStr = UTCstr.padEnd(9, '0'); // Ensure minimum length for parsing
            const h = parseInt(timeStr.slice(0, 2), 10);
            const m = parseInt(timeStr.slice(2, 4), 10);
            const s = parseFloat(timeStr.slice(4));

            if (isNaN(h) || isNaN(m) || isNaN(s) || h > 23 || m > 59 || s >= 60) continue;

            const time = h * 3600 + m * 60 + s;

            // Round coordinates to appropriate precision (7 decimal places â‰ˆ 1cm accuracy)
            const precision = 1e7;
            const roundedLat = Math.round(lat * precision) / precision;
            const roundedLon = Math.round(lon * precision) / precision;
            const roundedAlt = Math.round(alt * 100) / 100; // 2 decimal places for altitude

            points.push({ 
                lat: roundedLat, 
                lon: roundedLon, 
                alt: roundedAlt, 
                time: Math.round(time * 1000) / 1000, // 3 decimal places for time
                satellites: numSatellites, 
                undulation: Math.round(undulation * 100) / 100 
            });
        } catch {
            continue;
        }
    }

    return points;
}

// --- UBX HPPOSLLH Parsing Functions ---

/**
 * Time conversion helper - gets start of GPS week
 */
function getStartOfGpsWeek() {
    const today = new Date();
    // GPS week starts on Sunday. weekday() is Monday=0, Sunday=6
    const daysSinceSunday = (today.getDay()) % 7; // Sunday is 0 in JS
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - daysSinceSunday);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
}

/**
 * Converts iTOW (GPS time of week in milliseconds) to seconds since start of day
 * @param {number} itowMs iTOW in milliseconds
 * @returns {number} Time in seconds since start of day
 */
function itowToTimeOfDay(itowMs) {
    const startOfWeek = getStartOfGpsWeek();
    const timestamp = new Date(startOfWeek.getTime() + itowMs);
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();
    const milliseconds = timestamp.getMilliseconds();
    
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}

/**
 * Parses a single UBX NAV-HPPOSLLH message
 * @param {Uint8Array} data The payload data
 * @returns {Object|null} Parsed GPS point or null if invalid
 */
function parseUbxNavHpposllh(data) {
    if (data.length < 36) return null;

    try {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        const flags = view.getUint8(3);
        const iTOW = view.getUint32(4, true);
        const lon = view.getInt32(8, true);
        const lat = view.getInt32(12, true);
        const hMSL = view.getInt32(20, true);
        const lonHp = view.getInt8(24);
        const latHp = view.getInt8(25);
        const hMSLHp = view.getInt8(27);

        const lonHp_final = (lon * 1e-7) + (lonHp * 1e-9);
        const latHp_final = (lat * 1e-7) + (latHp * 1e-9);
        const hMSLHp_final = (hMSL * 1e-3) + (hMSLHp * 1e-4);

        const isValid = (flags & 0x01) === 0;
        if (!isValid) return null;

        // Validate coordinate bounds
        if (Math.abs(latHp_final) > 90 || Math.abs(lonHp_final) > 180) return null;

        const timeOfDay = itowToTimeOfDay(iTOW);

        // Round coordinates to appropriate precision (9 decimal places for high precision)
        const precision = 1e9;
        const roundedLat = Math.round(latHp_final * precision) / precision;
        const roundedLon = Math.round(lonHp_final * precision) / precision;
        const roundedAlt = Math.round(hMSLHp_final * 10000) / 10000; // 4 decimal places for high precision altitude

        return { 
            lat: roundedLat, 
            lon: roundedLon, 
            alt: roundedAlt, 
            time: Math.round(timeOfDay * 1000) / 1000, // 3 decimal places for time
            satellites: 'N/A', // Not available in HPPOSLLH messages
            undulation: 0 // HPPOSLLH provides MSL height directly
        };
    } catch (error) {
        return null;
    }
}

/**
 * Finds and extracts UBX messages from binary data
 * @param {Uint8Array} data Binary data
 * @returns {Array} Array of [msgClass, msgId, payload] tuples
 */
function findUbxMessages(data) {
    const messages = [];
    let i = 0;
    while (i < data.length - 8) {
        if (data[i] === 0xB5 && data[i + 1] === 0x62) {
            try {
                if (i + 6 > data.length) { i++; continue; }
                const msgClass = data[i + 2];
                const msgId = data[i + 3];
                const length = data[i + 4] | (data[i + 5] << 8);
                if (i + 8 + length > data.length) { i++; continue; }

                const payload = data.slice(i + 6, i + 6 + length);
                const ckARcvd = data[i + 6 + length];
                const ckBRcvd = data[i + 7 + length];
                let calcCkA = 0, calcCkB = 0;
                for (let j = i + 2; j < i + 6 + length; j++) {
                    calcCkA = (calcCkA + data[j]) & 0xFF;
                    calcCkB = (calcCkB + calcCkA) & 0xFF;
                }

                if (ckARcvd === calcCkA && ckBRcvd === calcCkB) {
                    messages.push([msgClass, msgId, payload]);
                    i += 8 + length;
                } else { i++; }
            } catch (error) { i++; }
        } else { i++; }
    }
    return messages;
}

/**
 * Extracts GPS points from UBX binary data containing HPPOSLLH messages
 * @param {Uint8Array} binaryData The binary UBX data
 * @returns {Array<{lat: number, lon: number, alt: number, time: number, satellites: string, undulation: number}>} Array of GPS points
 */
export function extractGpsPointsFromUbxData(binaryData) {
    const points = [];
    
    try {
        const allMessages = findUbxMessages(binaryData);
        const navHpposllhPayloads = allMessages
            .filter(([msgClass, msgId]) => msgClass === 0x01 && msgId === 0x14)
            .map(([, , payload]) => payload);

        if (navHpposllhPayloads.length === 0) {
            return points; // Return empty array if no valid messages found
        }

        for (const payload of navHpposllhPayloads) {
            const parsedPoint = parseUbxNavHpposllh(payload);
            if (parsedPoint) {
                points.push(parsedPoint);
            }
        }
    } catch (error) {
        console.error('Error parsing UBX data:', error);
    }

    return points;
}

/**
 * Determines if data is likely UBX binary format
 * @param {Uint8Array} data The data to check
 * @returns {boolean} True if data appears to be UBX format
 */
export function isUbxData(data) {
    // Look for UBX sync characters (0xB5 0x62) in the first few bytes
    for (let i = 0; i < Math.min(data.length - 1, 100); i++) {
        if (data[i] === 0xB5 && data[i + 1] === 0x62) {
            return true;
        }
    }
    return false;
}

/**
 * Main function to extract GPS points from either text (NMEA) or binary (UBX) data
 * @param {string|Uint8Array} data The data to parse
 * @returns {Array<{lat: number, lon: number, alt: number, time: number, satellites: number|string, undulation: number}>} Array of GPS points
 */
export function extractGpsPoints(data) {
    if (data instanceof Uint8Array) {
        // Binary data - check if it's UBX format
        if (isUbxData(data)) {
            return extractGpsPointsFromUbxData(data);
        } else {
            // Try to convert to text and parse as NMEA
            try {
                const textData = new TextDecoder('utf-8').decode(data);
                return extractGpsPointsFromText(textData);
            } catch (error) {
                console.error('Error decoding binary data as text:', error);
                return [];
            }
        }
    } else if (typeof data === 'string') {
        // Text data - parse as NMEA
        return extractGpsPointsFromText(data);
    } else {
        console.error('Unsupported data type for GPS parsing');
        return [];
    }
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
 * @param {Array<{lat: number, lon: number, alt: number, time: number, satellites: number|string, undulation: number}>} points The complete array of GPS points.
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
        if (latEl) latEl.textContent = '0';
        if (longEl) longEl.textContent = '0';
        if (satellitesEl) satellitesEl.textContent = '0';
        if (startEl) startEl.textContent = 'HH:mm:ss';
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
    const currentSatellites = lastPoint.satellites;

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

    // Improved speed calculation with better error handling
    // Improved speed calculation with 3D distance
    let latestSpeed = 0;
    if (points.length >= 2) {
        let p1 = null;
        let p2 = lastPoint;
        
        for (let i = points.length - 2; i >= 0; i--) {
            const candidate = points[i];
            const timeDelta = p2.time - candidate.time;
            
            if (timeDelta > 0.1) { // Avoid division by tiny time deltas
                p1 = candidate;
                break;
            }
        }
        
        if (p1) {
            const distance2D = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
            const altitudeChange = p2.alt - p1.alt;

            // Compute 3D distance
            const distance3D = Math.sqrt(
                Math.pow(distance2D, 2) + Math.pow(altitudeChange, 2)
            );

            const timeDelta = p2.time - p1.time;
            latestSpeed = distance3D / timeDelta;

            // Cap unrealistic speeds (over 100 m/s = 360 km/h)
            if (latestSpeed > 100) {
                latestSpeed = 0;
            }
        }
    }

    // Initialize total distance accumulators
    let total2DDistance = 0;
    let total3DDistance = 0;

    // Loop through all points to calculate cumulative 2D and 3D distances
    for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];

        // Skip if points are identical or very close in time
        const timeDelta = p2.time - p1.time;
        if (timeDelta <= 0) continue;

        // Calculate 2D distance for this segment
        const segment2DDistance = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
        
        // Skip segments with unrealistic distances (over 1km between consecutive points)
        if (segment2DDistance > 1000) continue;
        
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
    if (latEl) latEl.textContent = currentLat.toFixed(7); // 7 decimal places for GPS precision
    if (longEl) longEl.textContent = currentLon.toFixed(7);
    if (satellitesEl) satellitesEl.textContent = currentSatellites === 'N/A' ? 'N/A' : currentSatellites;
    if (startEl) startEl.textContent = startTimeFormatted;
    if (endEl) endEl.textContent = endTimeFormatted;
}
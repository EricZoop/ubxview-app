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

            // Round coordinates to appropriate precision (7 decimal places ≈ 1cm accuracy)
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

    // Improved speed calculation with better error handling
    let latestSpeed = 0;
    if (points.length >= 2) {
        // Look back further to find a meaningful time difference
        let p1 = null;
        let p2 = lastPoint;
        
        for (let i = points.length - 2; i >= 0; i--) {
            const candidate = points[i];
            const timeDelta = p2.time - candidate.time;
            
            // Use a minimum time threshold to avoid division by very small numbers
            if (timeDelta > 0.1) { // At least 0.1 second difference
                p1 = candidate;
                break;
            }
        }
        
        if (p1) {
            const distance2D = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
            const timeDelta = p2.time - p1.time;
            latestSpeed = distance2D / timeDelta;
            
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
    if (satellitesEl) satellitesEl.textContent = currentSatellites;
    if (startEl) startEl.textContent = startTimeFormatted;
    if (endEl) endEl.textContent = endTimeFormatted;
}
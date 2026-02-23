// radarParser.js
// Parses radar track CSV files into point objects compatible with the plot/playback pipeline.
// Required columns: ID, DateTime, RCS, Lat, Lon, Alt, ExtID, VelAbs

/**
 * Detect whether text content is a radar track CSV.
 * Checks the first line for the expected header columns.
 */
export function isRadarCsv(text) {
    if (!text) return false;
    const firstLine = (text.split('\n')[0] || '').replace(/\r/, '');
    const required = ['ID', 'DateTime', 'Lat', 'Lon', 'Alt'];
    return required.every(col => firstLine.split(',').map(h => h.trim()).includes(col));
}

/**
 * Parse the time portion of a radar DateTime string into seconds-of-day.
 *
 * Accepts both separator styles:
 *   "2025-11-20 20:48:52.154"   (dot before ms  — actual CSV format)
 *   "2025-11-20 20:48:52:154"   (colon before ms — legacy format)
 *
 * Returns seconds-of-day (0–86 400) so the value is on the same scale as
 * NMEA and ADS-B timestamps and sorts correctly in the shared playback timeline.
 */
function parseDateTimeToSeconds(dtStr) {
    if (!dtStr) return 0;
    try {
        // Isolate the time portion: everything after the space
        const timePart = dtStr.trim().split(' ')[1] || '';

        // Normalise: replace a trailing dot-or-colon-separated ms group
        // "20:48:52.154" → ["20","48","52.154"]
        // "20:48:52:154" → ["20","48","52","154"]
        const p = timePart.split(':');

        const h  = parseInt(p[0])   || 0;
        const m  = parseInt(p[1])   || 0;
        // p[2] may be "52.154" (dot ms) or "52" (colon ms in p[3])
        const s  = parseFloat(p[2]) || 0;
        const ms = p[3] ? (parseInt(p[3]) / 1000) : 0; // colon-separated ms

        return h * 3600 + m * 60 + s + ms;
    } catch (_) {}
    return 0;
}

/**
 * Parse radar CSV text into an array of point objects.
 * Each point carries { dataType:'radar', talkerId, id, lat, lon, alt, time, rcs, velAbs, extId, dateTime }.
 * talkerId follows the convention "radar_<ID>" so it is unique across NMEA/ADS-B namespaces.
 * Filters out tracks that have 20 or fewer points.
 */
export function extractRadarPointsFromText(text) {
    if (!text || !text.trim()) return [];

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];

    // Build column index map from header
    const headers = lines[0].split(',').map(h => h.trim());
    const col = name => headers.indexOf(name);

    const iID       = col('ID');
    const iDateTime = col('DateTime');
    const iRCS      = col('RCS');
    const iLat      = col('Lat');
    const iLon      = col('Lon');
    const iAlt      = col('Alt');
    const iExtID    = col('ExtID');
    const iVelAbs   = col('VelAbs');

    if (iID < 0 || iLat < 0 || iLon < 0) {
        console.warn('radarParser: missing required columns (ID, Lat, Lon)');
        return [];
    }

    const points = [];
    const trackCounts = {};

    for (let i = 1; i < lines.length; i++) {
        const c = lines[i].split(',');
        try {
            const id       = c[iID]?.trim();
            const dateTime = iDateTime >= 0 ? (c[iDateTime]?.trim() || '') : '';
            const lat      = parseFloat(c[iLat]);
            const lon      = parseFloat(c[iLon]);
            const alt      = iAlt >= 0    ? parseFloat(c[iAlt])    : 0;
            const rcs      = iRCS >= 0    ? parseFloat(c[iRCS])    : NaN;
            const velAbs   = iVelAbs >= 0 ? parseFloat(c[iVelAbs]) : NaN;
            const extId    = iExtID >= 0  ? (c[iExtID]?.trim() || '') : '';

            if (!id || isNaN(lat) || isNaN(lon)) continue;
            if (Math.abs(lat) > 90 || Math.abs(lon) > 180) continue;

            points.push({
                dataType : 'radar',
                id,
                talkerId : `radar_${id}`,
                lat,
                lon,
                alt      : isNaN(alt)    ? 0    : alt,
                time     : parseDateTimeToSeconds(dateTime), // seconds-of-day
                rcs      : isNaN(rcs)    ? null : rcs,
                velAbs   : isNaN(velAbs) ? null : velAbs,
                extId,
                dateTime,
            });

            trackCounts[id] = (trackCounts[id] || 0) + 1;
        } catch (_) {
            continue;
        }
    }

    return points.filter(p => trackCounts[p.id] > 20);
}

/**
 * Group radar points by their numeric track ID (not the full talkerId).
 */
export function groupRadarByTrack(points) {
    return points.reduce((acc, p) => {
        if (!acc[p.id]) acc[p.id] = [];
        acc[p.id].push(p);
        return acc;
    }, {});
}

/**
 * Calculate display statistics for a single radar track.
 */
export function calculateRadarTrackStats(trackPoints) {
    if (!trackPoints || trackPoints.length === 0) return null;

    const sorted = [...trackPoints].sort((a, b) => a.time - b.time);
    const first  = sorted[0];
    const last   = sorted[sorted.length - 1];

    return {
        totalPoints  : sorted.length,
        duration     : last.time - first.time,
        currentLat   : last.lat,
        currentLon   : last.lon,
        currentAlt   : last.alt,
        currentVel   : last.velAbs,
        currentRcs   : last.rcs,
        currentExtId : last.extId,
        startTime    : first.time,
        endTime      : last.time,
    };
}
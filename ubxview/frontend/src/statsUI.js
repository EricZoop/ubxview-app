// statsUI.js
// DOM manipulation and UI updates for statistics panel

import * as THREE from 'three';
import { getTrackVariantColor, isElevationModeActive, getElevationColorForTrack, isClassifyModeActive, getClassifyColorForTrack } from './trailControls.js';
import { groupPointsByTalker, calculateTalkerStats } from './parser.js';
import { groupAdsbByAircraft, calculateAdsbAircraftStats, emitterTypeLabel } from './adsbParser.js';
import { groupRadarByTrack, calculateRadarTrackStats } from './radarParser.js';
import {
    injectSearchBar,
    updateSearchBarVisibility,
    filterStatsPanels,
    getCurrentSearchQuery,
    fetchAircraftInfo,
    applyAircraftInfoToDOM,
    lookupAircraftModel,
} from './search.js';

export { lookupAircraftModel };

let currentlyTrackedId = null;
let statsContainerInitialized = false;

// ─── Type Detection ───────────────────────────────────────────────────────────
/**
 * Classify a single point's data type using its own `dataType` field first,
 * then fall back to heuristics. Never infers from sibling points.
 */
function pointDataType(p) {
    if (!p) return 'nmea';
    if (p.dataType === 'radar') return 'radar';
    if (p.dataType === 'adsb') return 'adsb';
    if (p.dataType === 'nmea') return 'nmea';
    // Heuristics
    if (typeof p.satellites === 'number' && p.icaoAddress === undefined) return 'nmea';
    if (p.icaoAddress !== undefined || p.heading !== undefined || p.horizontalVelocity !== undefined) return 'adsb';
    if (p.talkerId && /^[A-Z]{2}$/.test(p.talkerId)) return 'nmea';
    return 'nmea'; // safe default
}

/**
 * Split a flat point array into { nmea: [...], adsb: [...], radar: [...] }.
 */
function partitionByDataType(points) {
    const nmea = [], adsb = [], radar = [];
    for (const p of points) {
        const t = pointDataType(p);
        if (t === 'adsb')        adsb.push(p);
        else if (t === 'radar')  radar.push(p);
        else                     nmea.push(p);
    }
    return { nmea, adsb, radar };
}

// ─── Header Visuals ───────────────────────────────────────────────────────────
function updateHeaderVisuals() {
    document.querySelectorAll('.talker-header').forEach(h => {
        h.classList.toggle('active-track', h.dataset.talkerId === currentlyTrackedId);
    });
}

// ─── Shared Helpers ───────────────────────────────────────────────────────────
function formatTime(timeInSeconds) {
    const h = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

/**
 * Remove panels whose panel-id is not in the provided set for a given data-type.
 * Panels of a *different* data-type are left untouched.
 */
function removeStalePanels(statsContainer, currentIds, dataType) {
    statsContainer.querySelectorAll(`.stats-group[data-data-type="${dataType}"]`).forEach(panel => {
        const id = panel.dataset.panelId;
        if (!id || !currentIds.includes(id)) panel.remove();
    });
}

// ─── Header Colors ────────────────────────────────────────────────────────────
export function updateStatsHeaderColors() {
    const tailPicker = document.getElementById('trail-tail-color');
    const base = new THREE.Color(tailPicker ? tailPicker.value : '#00ffaa');
    const isElevation = isElevationModeActive();
    const isClassify  = isClassifyModeActive();

    document.querySelectorAll('.talker-header').forEach(header => {
        const talkerId = header.dataset.talkerId;
        const color = isElevation
            ? getElevationColorForTrack(talkerId)
            : isClassify
                ? getClassifyColorForTrack(talkerId)
                : getTrackVariantColor(base, talkerId);
        header.style.color = `#${color.getHexString()}`;
    });
}

// ─── Main Update ──────────────────────────────────────────────────────────────
export function updateStats(points, _dataTypeHint) {
    // _dataTypeHint is intentionally ignored — we classify per-point instead.
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    // On first real data load, strip any static placeholder HTML from index.html,
    // keeping only the search wrapper if it was already injected.
    if (!statsContainerInitialized) {
        Array.from(statsContainer.children).forEach(child => {
            if (child.id !== 'stats-search-wrapper') child.remove();
        });
        statsContainerInitialized = true;
    }

    injectSearchBar(statsContainer);

    if (!points || points.length === 0) return;

    const { nmea: nmeaPoints, adsb: adsbPoints, radar: radarPoints } = partitionByDataType(points);

    const tailPicker = document.getElementById('trail-tail-color');
    const baseColor = new THREE.Color(tailPicker ? tailPicker.value : '#00ffaa');
    const isElevation = isElevationModeActive();
    const isClassify  = isClassifyModeActive();

    // Each renderer manages only its own panel type — no cross-contamination.
    updateNmeaStats(statsContainer, nmeaPoints, baseColor, isElevation, isClassify);
    updateAdsbStats(statsContainer, adsbPoints, baseColor, isElevation, isClassify);
    updateRadarStats(statsContainer, radarPoints, baseColor, isElevation, isClassify);

    // Total panel count drives search bar visibility
    const totalPanels = statsContainer.querySelectorAll('.stats-group').length;
    updateSearchBarVisibility(totalPanels);

    updateHeaderVisuals();

    filterStatsPanels(getCurrentSearchQuery());
}

// ─── NMEA Panel ───────────────────────────────────────────────────────────────
function createNmeaStatsHTML(talkerId, headerColor) {
    return `
        <div class="stats-group" data-data-type="nmea" data-panel-id="${talkerId}">
            <h3 style="color: ${headerColor};" class="talker-header" data-talker-id="${talkerId}" tabindex="0" role="button" title="Click to follow">
                <span>Rover ${talkerId}</span>
            </h3>
            <table><tbody>
                <tr><td>Points:</td><td><span id="${talkerId}-points-stat">0</span></td></tr>
                <tr><td>Telemetry:</td><td><span id="${talkerId}-hz-stat">0.0</span> Hz</td></tr>
                <tr><td>Latitude:</td><td><span id="${talkerId}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${talkerId}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt (MSL):</td><td><span id="${talkerId}-altitude-stat">0.0</span> m</td></tr>
                <tr><td>Alt (WGS84):</td><td><span id="${talkerId}-altwsg84-stat">0.0</span> m</td></tr>
                <tr><td>Speed:</td><td><span id="${talkerId}-speed-stat">0.0</span> m/s</td></tr>
                <tr><td>2D Distance:</td><td><span id="${talkerId}-twod-stat">0.0</span> m</td></tr>
                <tr><td>3D Distance:</td><td><span id="${talkerId}-threed-stat">0.0</span> m</td></tr>
                <tr><td>RTH Distance:</td><td><span id="${talkerId}-rth-stat">0.0</span> m</td></tr>
                <tr><td>Satellites:</td><td><span id="${talkerId}-satellites-stat">0</span></td></tr>
                <tr><td>Start Time:</td><td><span id="${talkerId}-start-stat">--</span></td></tr>
                <tr><td>End Time:</td><td><span id="${talkerId}-end-stat">--</span></td></tr>
                <tr><td>Duration:</td><td><span id="${talkerId}-duration-stat">0.0</span> s</td></tr>
            </tbody></table>
        </div>`;
}

function updateNmeaStatsDOM(talkerId, stats) {
    const s = (id) => document.getElementById(`${talkerId}-${id}`);
    if (!s('points-stat')) return;
    s('points-stat').textContent = stats.totalPoints;
    s('hz-stat').textContent = stats.updateRate.toFixed(2);
    s('duration-stat').textContent = stats.totalDuration.toFixed(1);
    s('twod-stat').textContent = stats.total2DDistance.toFixed(1);
    s('threed-stat').textContent = stats.total3DDistance.toFixed(1);
    s('rth-stat').textContent = stats.rthDistance3D.toFixed(1);
    s('speed-stat').textContent = stats.latestSpeed.toFixed(2);
    s('altitude-stat').textContent = stats.currentAltitude.toFixed(2);
    s('altwsg84-stat').textContent = stats.currentAltWsg84.toFixed(2);
    s('lat-stat').textContent = stats.currentLat.toFixed(7);
    s('long-stat').textContent = stats.currentLon.toFixed(7);
    s('satellites-stat').textContent = stats.currentSatellites;
    s('start-stat').textContent = formatTime(stats.startTime);
    s('end-stat').textContent = formatTime(stats.endTime);
}

function updateNmeaStats(container, points, baseColor, isElevation, isClassify) {
    if (points.length === 0) {
        container.querySelectorAll('.stats-group[data-data-type="nmea"]').forEach(p => p.remove());
        return;
    }

    const byTalker = groupPointsByTalker(points);
    const ids = Object.keys(byTalker).sort();

    removeStalePanels(container, ids, 'nmea');

    ids.forEach((talkerId) => {
        if (!document.getElementById(`${talkerId}-points-stat`)) {
            const colorHex = isElevation
                ? `#${getElevationColorForTrack(talkerId).getHexString()}`
                : isClassify
                    ? `#${getClassifyColorForTrack(talkerId).getHexString()}`
                    : `#${getTrackVariantColor(baseColor, talkerId).getHexString()}`;
            container.insertAdjacentHTML('beforeend', createNmeaStatsHTML(talkerId, colorHex));
        }
        const stats = calculateTalkerStats(byTalker[talkerId]);
        if (stats) updateNmeaStatsDOM(talkerId, stats);
    });
}

// ─── ADS-B Panel ──────────────────────────────────────────────────────────────
function createAdsbStatsHTML(icao, headerColor) {
    return `
        <div class="stats-group" data-data-type="adsb" data-panel-id="${icao}">
            <h3 style="color: ${headerColor};" class="talker-header" data-talker-id="${icao}" tabindex="0" role="button" title="Click to follow">
                <span id="${icao}-header-model">Loading...</span>
            </h3>
            <img id="${icao}-aircraft-img"
                 alt="Aircraft photo"
                 style="display:none; width:100%; max-height:120px; object-fit:cover; border-radius:3px; margin:0px 0 6px 0; opacity:1;"
                 onerror="this.style.display='none'"
                 onload="this.style.display='block'" />
            <table><tbody>
                <tr><td>Points:</td><td><span id="${icao}-points-stat">0</span></td></tr>
                <tr><td>Hex ID:</td><td><a href="https://globe.adsbexchange.com/?icao=${icao}" target="_blank">${icao}</a></td></tr>
                <tr><td>Registration:</td><td><span id="${icao}-reg-stat">?</span></td></tr>
                <tr><td>Operator:</td><td><span id="${icao}-operator-stat">?</span></td></tr>
                <tr><td>Type:</td><td><span id="${icao}-type-stat">?</span></td></tr>
                <tr><td>Latitude:</td><td><span id="${icao}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${icao}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt (MSL):</td><td><span id="${icao}-baroalt-stat">0.0</span> m</td></tr>
                <tr><td>Alt (WGS84):</td><td><span id="${icao}-geoalt-stat">0.0</span> m</td></tr>
                <tr><td>Heading:</td><td><span id="${icao}-hdg-stat">0.0</span>&deg;</td></tr>
                <tr><td>Hor Vel:</td><td><span id="${icao}-hvel-stat">0.0</span> m/s</td></tr>
                <tr><td>Ver Vel:</td><td><span id="${icao}-vvel-stat">0.0</span> m/s</td></tr>
                <tr><td>2D Distance:</td><td><span id="${icao}-gdist-stat">0.0</span> m</td></tr>
                <tr><td>Last Seen:</td><td><span id="${icao}-lastseen-stat">HH:mm:ss</span></td></tr>
                <tr><td>Duration:</td><td><span id="${icao}-duration-stat">0.0</span> s</td></tr>
            </tbody></table>
        </div>`;
}

function updateAdsbStatsDOM(icao, stats) {
    const s = (id) => document.getElementById(`${icao}-${id}`);
    if (!s('points-stat')) return;

    fetchAircraftInfo(icao);
    applyAircraftInfoToDOM(icao);

    s('points-stat').textContent = stats.totalPoints;
    s('lat-stat').textContent = stats.currentLat.toFixed(6);
    s('long-stat').textContent = stats.currentLon.toFixed(6);
    s('baroalt-stat').textContent = stats.currentBaroAltM != null ? stats.currentBaroAltM.toFixed(1) : '--';
    s('geoalt-stat').textContent = stats.currentGeoAltM  != null ? stats.currentGeoAltM.toFixed(1)  : '--';
    s('hdg-stat').textContent  = stats.heading.toFixed(1);
    s('hvel-stat').textContent = stats.horVelocityMs.toFixed(1);
    s('vvel-stat').textContent = stats.verVelocityMs.toFixed(1);
    s('gdist-stat').textContent = stats.totalGroundDist.toFixed(1);
    s('type-stat').textContent = emitterTypeLabel(stats.emitterType);
    s('duration-stat').textContent = stats.duration.toFixed(1);
    if (stats.lastSeen) {
        try { s('lastseen-stat').textContent = new Date(stats.lastSeen).toISOString().substring(11, 19); }
        catch (_) { s('lastseen-stat').textContent = '--'; }
    }
}

function updateAdsbStats(container, points, baseColor, isElevation, isClassify) {
    if (points.length === 0) {
        container.querySelectorAll('.stats-group[data-data-type="adsb"]').forEach(p => p.remove());
        return;
    }

    const byAircraft = groupAdsbByAircraft(points);
    const icaos = Object.keys(byAircraft).sort();

    removeStalePanels(container, icaos, 'adsb');

    icaos.forEach((icao) => {
        if (!document.getElementById(`${icao}-points-stat`)) {
            const colorHex = isElevation
                ? `#${getElevationColorForTrack(icao).getHexString()}`
                : isClassify
                    ? `#${getClassifyColorForTrack(icao).getHexString()}`
                    : `#${getTrackVariantColor(baseColor, icao).getHexString()}`;
            container.insertAdjacentHTML('beforeend', createAdsbStatsHTML(icao, colorHex));
            fetchAircraftInfo(icao);
        }
        const stats = calculateAdsbAircraftStats(byAircraft[icao]);
        if (stats) updateAdsbStatsDOM(icao, stats);
    });
}

// ─── Radar Panel ──────────────────────────────────────────────────────────────
function createRadarStatsHTML(trackId, headerColor) {
    const rid = `radar_${trackId}`;
    return `
        <div class="stats-group" data-data-type="radar" data-panel-id="${rid}">
            <h3 style="color: ${headerColor};" class="talker-header" data-talker-id="${rid}" tabindex="0" role="button" title="Click to follow">
                <span>Track ${trackId}</span>
            </h3>
            <table><tbody>
                <tr><td>Points:</td><td><span id="${rid}-points-stat">0</span></td></tr>
                <tr><td>Ext ID:</td><td><span id="${rid}-extid-stat">--</span></td></tr>
                <tr><td>RCS:</td><td><span id="${rid}-rcs-stat">--</span> m&sup2;</td></tr>
                <tr><td>Latitude:</td><td><span id="${rid}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${rid}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt:</td><td><span id="${rid}-alt-stat">0.0</span> m</td></tr>
                <tr><td>Vel:</td><td><span id="${rid}-vel-stat">0.0</span> m/s</td></tr>
                <tr><td>Duration:</td><td><span id="${rid}-duration-stat">0.0</span> s</td></tr>
            </tbody></table>
        </div>`;
}

function updateRadarStatsDOM(trackId, stats) {
    const rid = `radar_${trackId}`;
    const s = id => document.getElementById(`${rid}-${id}`);
    if (!s('points-stat')) return;
    s('points-stat').textContent = stats.totalPoints;
    s('extid-stat').textContent  = stats.currentExtId || '--';
    s('rcs-stat').textContent    = stats.currentRcs != null ? stats.currentRcs.toFixed(4) : '--';
    s('lat-stat').textContent    = stats.currentLat.toFixed(7);
    s('long-stat').textContent   = stats.currentLon.toFixed(7);
    s('alt-stat').textContent    = stats.currentAlt.toFixed(1);
    s('vel-stat').textContent    = stats.currentVel != null ? stats.currentVel.toFixed(2) : '--';
    s('duration-stat').textContent = stats.duration.toFixed(1);
}

function updateRadarStats(container, points, baseColor, isElevation, isClassify) {
    if (points.length === 0) {
        container.querySelectorAll('.stats-group[data-data-type="radar"]').forEach(p => p.remove());
        return;
    }
    const byTrack = groupRadarByTrack(points);
    const ids     = Object.keys(byTrack).sort((a, b) => Number(a) - Number(b));
    removeStalePanels(container, ids.map(id => `radar_${id}`), 'radar');
    ids.forEach(trackId => {
        const rid = `radar_${trackId}`;
        if (!document.getElementById(`${rid}-points-stat`)) {
            const colorHex = isElevation
                ? `#${getElevationColorForTrack(rid).getHexString()}`
                : isClassify
                    ? `#${getClassifyColorForTrack(rid).getHexString()}`
                    : `#${getTrackVariantColor(baseColor, rid).getHexString()}`;
            container.insertAdjacentHTML('beforeend', createRadarStatsHTML(trackId, colorHex));
        }
        const stats = calculateRadarTrackStats(byTrack[trackId]);
        if (stats) updateRadarStatsDOM(trackId, stats);
    });
}

// ─── Listeners ────────────────────────────────────────────────────────────────
export function initializeStatsEventListeners() {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    injectSearchBar(statsContainer);

    window.addEventListener('cinematicTargetChanged', (e) => {
        currentlyTrackedId = e.detail.talkerId;
        updateHeaderVisuals();
    });

    statsContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.talker-header');
        if (!header) return;
        const talkerId = header.dataset.talkerId;
        if (talkerId) {
            window.dispatchEvent(new CustomEvent('activateCinematicForTalker', { detail: { talkerId } }));
        }
    });
}

initializeStatsEventListeners();
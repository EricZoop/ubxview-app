// statsUI.js
// DOM manipulation and UI updates for statistics panel
// Supports both NMEA rover and ADS-B aircraft data

import * as THREE from 'three';
import { getTrackVariantColor, isElevationModeActive } from './trailControls.js';
import { groupPointsByTalker, calculateTalkerStats } from './parser.js';
import { groupAdsbByAircraft, calculateAdsbAircraftStats, emitterTypeLabel } from './adsbParser.js';

let currentDataType = 'nmea';
let aircraftDatabase = new Map(); 
let databaseLoaded = false;
let currentlyTrackedId = null; // Track who we are following

// ─── Aircraft Database Loading ─────────────────────────────────
async function loadAircraftDatabase() {
    if (databaseLoaded) return;
    try {
        const response = await fetch('/aircraftDatabase.csv');
        if (!response.ok) {
            console.warn('Aircraft database CSV not found.');
            return;
        }
        const csvText = await response.text();
        parseAircraftCSV(csvText);
        databaseLoaded = true;
        console.log(`Loaded ${aircraftDatabase.size} aircraft records`);
    } catch (error) {
        console.warn('Failed to load aircraft database:', error);
    }
}

function parseAircraftCSV(csvText) {
    const lines = csvText.split('\n');
    if (lines.length < 2) return;
    const header = lines[0].split(',').map(h => h.trim());
    const icaoIdx = header.indexOf('icao24');
    const modelIdx = header.indexOf('model');
    const manufacturerIdx = header.indexOf('manufacturerName');
    const operatorIdx = header.indexOf('operator');
    const registrationIdx = header.indexOf('registration');
    
    if (icaoIdx === -1) return;
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const cols = line.split(',');
        const icao = cols[icaoIdx]?.trim().toLowerCase();
        
        if (icao) {
            aircraftDatabase.set(icao, {
                model: (modelIdx >= 0 ? cols[modelIdx]?.trim() : '') || 'Unknown Model',
                manufacturer: (manufacturerIdx >= 0 ? cols[manufacturerIdx]?.trim() : '') || '',
                operator: (operatorIdx >= 0 ? cols[operatorIdx]?.trim() : '') || '',
                registration: (registrationIdx >= 0 ? cols[registrationIdx]?.trim() : '') || ''
            });
        }
    }
}

function lookupAircraftModel(icaoAddress) {
    if (!icaoAddress) return 'Unknown';
    const normalized = icaoAddress.toLowerCase();
    const record = aircraftDatabase.get(normalized);
    return record?.model || 'Unknown';
}

loadAircraftDatabase();

// ─── Header Visuals Helper ──────────────────────────────────────
function updateHeaderVisuals() {
    document.querySelectorAll('.talker-header').forEach(h => {
         // Toggle the class that triggers the CSS ::after width
         if (h.dataset.talkerId === currentlyTrackedId) {
             h.classList.add('active-track');
         } else {
             h.classList.remove('active-track');
         }
    });
}

// ─── NMEA Panel ─────────────────────────────────────────────────
function createNmeaStatsHTML(talkerId, headerColor) {
    return `
        <div class="stats-group" data-data-type="nmea">
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

// ─── ADS-B Panel ────────────────────────────────────────────────
function createAdsbStatsHTML(icao, headerColor) {
    return `
        <div class="stats-group" data-data-type="adsb">
            <h3 style="color: ${headerColor};" class="talker-header" data-talker-id="${icao}" tabindex="0" role="button" title="Click to follow">
                <span id="${icao}-header-model">Loading...</span> 
            </h3>
            <table><tbody>
                <tr><td>Points:</td><td><span id="${icao}-points-stat">0</span></td></tr>
                <tr><td>ICAO:</td><td><span>${icao}</span></td></tr>
                <tr><td>Latitude:</td><td><span id="${icao}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${icao}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt (MSL):</td><td><span id="${icao}-baroalt-stat">--</span> m</td></tr>
                <tr><td>Alt (WGS84):</td><td><span id="${icao}-geoalt-stat">--</span> m</td></tr>
                <tr><td>Heading:</td><td><span id="${icao}-hdg-stat">0.0</span>&deg;</td></tr>
                <tr><td>Hor Vel:</td><td><span id="${icao}-hvel-stat">0.0</span> m/s</td></tr>
                <tr><td>Ver Vel:</td><td><span id="${icao}-vvel-stat">0.0</span> m/s</td></tr>
                <tr><td>2D Distance:</td><td><span id="${icao}-gdist-stat">0.0</span> m</td></tr>
                <tr><td>Type:</td><td><span id="${icao}-type-stat">--</span></td></tr>
                <tr><td>Duration:</td><td><span id="${icao}-duration-stat">0.0</span> s</td></tr>
                <tr><td>Last Seen:</td><td><span id="${icao}-lastseen-stat">--</span></td></tr>
            </tbody></table>
        </div>`;
}

function updateAdsbStatsDOM(icao, stats) {
    const s = (id) => document.getElementById(`${icao}-${id}`);
    if (!s('points-stat')) return;
    
    const modelName = lookupAircraftModel(stats.icaoAddress || icao);
    const headerEl = document.getElementById(`${icao}-header-model`);
    if (headerEl) {
        if (modelName === 'Unknown' || modelName === 'Unknown Model') {
            headerEl.textContent = `Aircraft ${icao}`;
        } else {
            headerEl.textContent = modelName;
        }
    }
    
    s('points-stat').textContent = stats.totalPoints;
    s('lat-stat').textContent = stats.currentLat.toFixed(6);
    s('long-stat').textContent = stats.currentLon.toFixed(6);
    if (stats.currentBaroAltM != null) {
        s('baroalt-stat').textContent = stats.currentBaroAltM.toFixed(1);
    } else {
        s('baroalt-stat').textContent = '--';
    }

    if (stats.currentGeoAltM != null) {
        s('geoalt-stat').textContent = stats.currentGeoAltM.toFixed(1);
    } else {
        s('geoalt-stat').textContent = '--';
    }
    s('hdg-stat').textContent = stats.heading.toFixed(1);
    s('hvel-stat').textContent = stats.horVelocityMs.toFixed(1);
    s('vvel-stat').textContent = stats.verVelocityMs.toFixed(1);
    s('gdist-stat').textContent = stats.totalGroundDist.toFixed(1);
    s('type-stat').textContent = emitterTypeLabel(stats.emitterType);
    s('duration-stat').textContent = stats.duration.toFixed(1);
    if (stats.lastSeen) {
        try {
            s('lastseen-stat').textContent = new Date(stats.lastSeen).toISOString().substring(11, 19);
        } catch (_) {
            s('lastseen-stat').textContent = '--';
        }
    }
}

// ─── Shared Helpers ─────────────────────────────────────────────
function formatTime(timeInSeconds) {
    const h = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function removeStalePanels(statsContainer, currentTalkerIds) {
    statsContainer.querySelectorAll('.stats-group').forEach(panel => {
        const header = panel.querySelector('.talker-header');
        if (header) {
            if (!currentTalkerIds.includes(header.dataset.talkerId)) panel.remove();
        } else {
            panel.remove();
        }
    });
}

// ─── Header Colors ──────────────────────────────────────────────
export function updateStatsHeaderColors(plotObjects) {
    if (isElevationModeActive()) {
        document.querySelectorAll('.talker-header').forEach(h => { h.style.color = '#ffffff'; });
        return;
    }
    if (!plotObjects || plotObjects.size === 0) return;

    const tailPicker = document.getElementById('trail-tail-color');
    const base = new THREE.Color(tailPicker ? tailPicker.value : '#00ffaa');

    plotObjects.forEach((_, talkerId) => {
        const header = document.querySelector(`.talker-header[data-talker-id="${talkerId}"]`);
        if (header) {
            header.style.color = `#${getTrackVariantColor(base, talkerId).getHexString()}`;
        }
    });
}

// ─── Main Update ────────────────────────────────────────────────
export function updateStats(points, dataType) {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer || !points || points.length === 0) return;

    const effectiveType = dataType || (points[0]?.dataType === 'adsb' ? 'adsb' : 'nmea');

    if (effectiveType !== currentDataType) {
        statsContainer.querySelectorAll('.stats-group').forEach(p => p.remove());
        currentDataType = effectiveType;
    }

    const tailPicker = document.getElementById('trail-tail-color');
    const baseColor = new THREE.Color(tailPicker ? tailPicker.value : '#00ffaa');

    if (effectiveType === 'adsb') {
        updateAdsbStats(statsContainer, points, baseColor);
    } else {
        updateNmeaStats(statsContainer, points, baseColor);
    }
    
    // Ensure the underline persists if DOM was rebuilt
    updateHeaderVisuals();
}

function updateNmeaStats(container, points, baseColor) {
    const byTalker = groupPointsByTalker(points);
    const ids = Object.keys(byTalker).sort();
    removeStalePanels(container, ids);

    ids.forEach((talkerId) => {
        if (!document.getElementById(`${talkerId}-points-stat`)) {
            const color = isElevationModeActive() ? '#ffffff'
                : `#${getTrackVariantColor(baseColor, talkerId).getHexString()}`;
            container.insertAdjacentHTML('beforeend', createNmeaStatsHTML(talkerId, color));
        }
        const stats = calculateTalkerStats(byTalker[talkerId]);
        if (stats) updateNmeaStatsDOM(talkerId, stats);
    });
}

function updateAdsbStats(container, points, baseColor) {
    const byAircraft = groupAdsbByAircraft(points);
    const icaos = Object.keys(byAircraft).sort();
    removeStalePanels(container, icaos);

    icaos.forEach((icao) => {
        if (!document.getElementById(`${icao}-points-stat`)) {
            const color = isElevationModeActive() ? '#ffffff'
                : `#${getTrackVariantColor(baseColor, icao).getHexString()}`;
            container.insertAdjacentHTML('beforeend', createAdsbStatsHTML(icao, color));
        }
        const stats = calculateAdsbAircraftStats(byAircraft[icao]);
        if (stats) updateAdsbStatsDOM(icao, stats);
    });
}

// ─── Listeners ──────────────────────────────────────────────────
export function initializeStatsEventListeners() {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    // Listen for state changes from cameraControls.js
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
// statsUI.js
// DOM manipulation and UI updates for statistics panel

import * as THREE from 'three';
// CHANGED: Import getElevationColorForTrack
import { getTrackVariantColor, isElevationModeActive, getElevationColorForTrack } from './trailControls.js';
import { groupPointsByTalker, calculateTalkerStats } from './parser.js';
import { groupAdsbByAircraft, calculateAdsbAircraftStats, emitterTypeLabel } from './adsbParser.js';

let currentDataType = 'nmea';
let currentlyTrackedId = null;

// ——— hexdb.io Aircraft Lookup Cache ———————————————————————
const aircraftCache = new Map(); // hex -> { model, manufacturer, registration, operator, type, fetched, imageResolved, imageUrl }
const pendingFetches = new Set(); // avoid duplicate in-flight requests

/**
 * Resolve the actual aircraft image URL from hexdb.io.
 * The hex-image endpoint returns a text URL, not an image directly.
 * @param {string} hex - ICAO hex address (uppercase)
 * @returns {Promise<string|null>} resolved image URL or null
 */
async function resolveAircraftImage(hex) {
    const normalized = hex.toUpperCase();
    try {
        const resp = await fetch(`https://hexdb.io/hex-image?hex=${normalized}`);
        if (!resp.ok) return null;
        const url = (await resp.text()).trim();
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) return url;
    } catch (_) {}
    return null;
}

/**
 * Fetch aircraft info from hexdb.io and cache it.
 * Updates the DOM header + image once the response arrives.
 */
async function fetchAircraftInfo(hex) {
    const normalized = hex.toUpperCase();
    if (aircraftCache.has(normalized) || pendingFetches.has(normalized)) return;

    pendingFetches.add(normalized);
    try {
        const resp = await fetch(`https://hexdb.io/api/v1/aircraft/${normalized}`);
        if (!resp.ok) {
            aircraftCache.set(normalized, { model: 'Unknown', manufacturer: '', registration: '', operator: '', type: '', fetched: true, imageResolved: false, imageUrl: null });
            return;
        }
        const data = await resp.json();
        if (data.error) {
            aircraftCache.set(normalized, { model: 'Unknown', manufacturer: '', registration: '', operator: '', type: '', fetched: true, imageResolved: false, imageUrl: null });
            return;
        }
        aircraftCache.set(normalized, {
            model: data.Type || data.ICAOTypeCode || 'Unknown',
            manufacturer: data.Manufacturer || '',
            registration: data.Registration || '',
            operator: data.RegisteredOwners || '',
            type: data.ICAOTypeCode || '',
            fetched: true,
            imageResolved: false,
            imageUrl: null
        });

        // Update DOM immediately after fetch
        applyAircraftInfoToDOM(hex);
    } catch (err) {
        console.warn(`hexdb.io lookup failed for ${hex}:`, err);
        aircraftCache.set(normalized, { model: 'Unknown', manufacturer: '', registration: '', operator: '', type: '', fetched: true, imageResolved: false, imageUrl: null });
    } finally {
        pendingFetches.delete(normalized);
    }
}

/**
 * Apply cached aircraft info to the DOM elements for a given hex.
 * Resolves the aircraft image URL asynchronously on first call.
 */
function applyAircraftInfoToDOM(hex) {
    const normalized = hex.toUpperCase();
    const info = aircraftCache.get(normalized);
    if (!info) return;

    const icao = hex.toLowerCase ? hex : hex;

    // Update header model name
    const headerEl = document.getElementById(`${icao}-header-model`);
    if (headerEl) {
        if (info.model && info.model !== 'Unknown') {
            headerEl.textContent = info.model;
        } else {
            headerEl.textContent = icao;
        }
    }

    // Update registration
    const regEl = document.getElementById(`${icao}-reg-stat`);
    if (regEl) regEl.textContent = info.registration || '--';

    // Update operator
    const opEl = document.getElementById(`${icao}-operator-stat`);
    if (opEl) opEl.textContent = info.operator || '--';

    // Resolve image URL asynchronously (only once per aircraft)
    const imgEl = document.getElementById(`${icao}-aircraft-img`);
    if (imgEl && !info.imageResolved && info.model !== 'Unknown') {
        info.imageResolved = true; // prevent duplicate fetches
        resolveAircraftImage(normalized).then(url => {
            if (url) {
                info.imageUrl = url;
                imgEl.src = url;
                // onload/onerror handlers on the <img> will show/hide it
            }
        });
    } else if (imgEl && info.imageUrl) {
        // Already resolved — reapply if img element was recreated
        if (!imgEl.src || imgEl.src !== info.imageUrl) {
            imgEl.src = info.imageUrl;
        }
    }
}

/**
 * Synchronous lookup that returns cached model name.
 * Triggers an async fetch if not yet cached.
 */
export function lookupAircraftModel(icaoAddress) {
    if (!icaoAddress) return 'Unknown';
    const normalized = icaoAddress.toUpperCase();
    const cached = aircraftCache.get(normalized);
    if (cached) return cached.model || 'Unknown';

    // Trigger background fetch
    fetchAircraftInfo(icaoAddress);
    return 'Loading...';
}

// ——— Header Visuals Helper ——————————————————————————————————
function updateHeaderVisuals() {
    document.querySelectorAll('.talker-header').forEach(h => {
         if (h.dataset.talkerId === currentlyTrackedId) {
             h.classList.add('active-track');
         } else {
             h.classList.remove('active-track');
         }
    });
}

// ——— NMEA Panel —————————————————————————————————————————————
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

// ——— ADS-B Panel ————————————————————————————————————————————
function createAdsbStatsHTML(icao, headerColor) {
    return `
        <div class="stats-group" data-data-type="adsb">
            <h3 style="color: ${headerColor};" class="talker-header" data-talker-id="${icao}" tabindex="0" role="button" title="Click to follow">
                <span id="${icao}-header-model">Loading...</span> 
            </h3>
            <img id="${icao}-aircraft-img"
                 alt="Aircraft photo"
                 style="display:none; width:100%; max-height:120px; object-fit:cover; border-radius:4px; margin:4px 0 6px 0; opacity:0.9;"
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

    // Trigger hexdb.io fetch (no-op if already cached/pending)
    fetchAircraftInfo(icao);

    // Apply any cached info we already have
    applyAircraftInfoToDOM(icao);

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

// ——— Shared Helpers —————————————————————————————————————————
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

// ——— Header Colors ——————————————————————————————————————————
export function updateStatsHeaderColors(plotObjects) {
    const tailPicker = document.getElementById('trail-tail-color');
    const base = new THREE.Color(tailPicker ? tailPicker.value : '#00ffaa');
    const isElevation = isElevationModeActive();

    document.querySelectorAll('.talker-header').forEach(header => {
        const talkerId = header.dataset.talkerId;
        if (isElevation) {
            const color = getElevationColorForTrack(talkerId);
            header.style.color = `#${color.getHexString()}`;
        } else {
            const color = getTrackVariantColor(base, talkerId);
            header.style.color = `#${color.getHexString()}`;
        }
    });
}

// ——— Main Update ————————————————————————————————————————————
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
    const isElevation = isElevationModeActive();

    if (effectiveType === 'adsb') {
        updateAdsbStats(statsContainer, points, baseColor, isElevation);
    } else {
        updateNmeaStats(statsContainer, points, baseColor, isElevation);
    }
    
    updateHeaderVisuals();
}

function updateNmeaStats(container, points, baseColor, isElevation) {
    const byTalker = groupPointsByTalker(points);
    const ids = Object.keys(byTalker).sort();
    removeStalePanels(container, ids);

    ids.forEach((talkerId) => {
        if (!document.getElementById(`${talkerId}-points-stat`)) {
            let colorHex;
            if (isElevation) {
                colorHex = `#${getElevationColorForTrack(talkerId).getHexString()}`;
            } else {
                colorHex = `#${getTrackVariantColor(baseColor, talkerId).getHexString()}`;
            }
            container.insertAdjacentHTML('beforeend', createNmeaStatsHTML(talkerId, colorHex));
        }
        const stats = calculateTalkerStats(byTalker[talkerId]);
        if (stats) updateNmeaStatsDOM(talkerId, stats);
    });
}

function updateAdsbStats(container, points, baseColor, isElevation) {
    const byAircraft = groupAdsbByAircraft(points);
    const icaos = Object.keys(byAircraft).sort();
    removeStalePanels(container, icaos);

    icaos.forEach((icao) => {
        if (!document.getElementById(`${icao}-points-stat`)) {
            let colorHex;
            if (isElevation) {
                colorHex = `#${getElevationColorForTrack(icao).getHexString()}`;
            } else {
                colorHex = `#${getTrackVariantColor(baseColor, icao).getHexString()}`;
            }
            container.insertAdjacentHTML('beforeend', createAdsbStatsHTML(icao, colorHex));
            // Kick off the hexdb.io lookup as soon as the panel is created
            fetchAircraftInfo(icao);
        }
        const stats = calculateAdsbAircraftStats(byAircraft[icao]);
        if (stats) updateAdsbStatsDOM(icao, stats);
    });
}

// ——— Listeners ——————————————————————————————————————————————
export function initializeStatsEventListeners() {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

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
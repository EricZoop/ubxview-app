// statsUI.js
// DOM manipulation and UI updates for statistics panel

import * as THREE from 'three';
import { getTrackVariantColor, isElevationModeActive, getElevationColorForTrack } from './trailControls.js';
import { groupPointsByTalker, calculateTalkerStats } from './parser.js';
import { groupAdsbByAircraft, calculateAdsbAircraftStats, emitterTypeLabel } from './adsbParser.js';

let currentlyTrackedId = null;
let statsContainerInitialized = false;

// ─── Type Detection ───────────────────────────────────────────────────────────
/**
 * Classify a single point's data type using its own `dataType` field first,
 * then fall back to heuristics. Never infers from sibling points.
 */
function pointDataType(p) {
    if (!p) return 'nmea';
    if (p.dataType === 'adsb') return 'adsb';
    if (p.dataType === 'nmea') return 'nmea';
    // Heuristics
    if (typeof p.satellites === 'number' && p.icaoAddress === undefined) return 'nmea';
    if (p.icaoAddress !== undefined || p.heading !== undefined || p.horizontalVelocity !== undefined) return 'adsb';
    if (p.talkerId && /^[A-Z]{2}$/.test(p.talkerId)) return 'nmea';
    return 'nmea'; // safe default
}

/**
 * Split a flat point array into { nmea: [...], adsb: [...] }.
 */
function partitionByDataType(points) {
    const nmea = [], adsb = [];
    for (const p of points) {
        if (pointDataType(p) === 'adsb') adsb.push(p);
        else nmea.push(p);
    }
    return { nmea, adsb };
}

// ─── Aircraft Lookup Cache ────────────────────────────────────────────────────
const aircraftCache = new Map();
const pendingFetches = new Set();

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

        applyAircraftInfoToDOM(hex);

        window.dispatchEvent(new CustomEvent('aircraftInfoLoaded', {
            detail: { talkerId: hex, model: data.Type || data.ICAOTypeCode || 'Unknown' }
        }));

    } catch (err) {
        console.warn(`hexdb.io lookup failed for ${hex}:`, err);
        aircraftCache.set(normalized, { model: 'Unknown', manufacturer: '', registration: '', operator: '', type: '', fetched: true, imageResolved: false, imageUrl: null });
    } finally {
        pendingFetches.delete(normalized);
    }
}

function applyAircraftInfoToDOM(hex) {
    const normalized = hex.toUpperCase();
    const info = aircraftCache.get(normalized);
    if (!info) return;

    const icao = hex.toLowerCase ? hex : hex;

    const headerEl = document.getElementById(`${icao}-header-model`);
    if (headerEl) {
        headerEl.textContent = (info.model && info.model !== 'Unknown') ? info.model : icao;
    }

    const regEl = document.getElementById(`${icao}-reg-stat`);
    if (regEl) regEl.textContent = info.registration || '--';

    const opEl = document.getElementById(`${icao}-operator-stat`);
    if (opEl) opEl.textContent = info.operator || '--';

    const imgEl = document.getElementById(`${icao}-aircraft-img`);
    if (imgEl && !info.imageResolved && info.model !== 'Unknown') {
        info.imageResolved = true;
        resolveAircraftImage(normalized).then(url => {
            if (url) {
                info.imageUrl = url;
                imgEl.src = url;
            }
        });
    } else if (imgEl && info.imageUrl) {
        if (!imgEl.src || imgEl.src !== info.imageUrl) imgEl.src = info.imageUrl;
    }
}

export function lookupAircraftModel(icaoAddress) {
    if (!icaoAddress) return 'Unknown';
    const normalized = icaoAddress.toUpperCase();
    const cached = aircraftCache.get(normalized);
    if (cached) return cached.model || 'Unknown';
    fetchAircraftInfo(icaoAddress);
    return 'Loading...';
}

// ─── Header Visuals ───────────────────────────────────────────────────────────
function updateHeaderVisuals() {
    document.querySelectorAll('.talker-header').forEach(h => {
        h.classList.toggle('active-track', h.dataset.talkerId === currentlyTrackedId);
    });
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
const SEARCH_BAR_ID = 'stats-search-bar';
const SEARCH_WRAPPER_ID = 'stats-search-wrapper';

function injectSearchBar(statsContainer) {
    if (document.getElementById(SEARCH_WRAPPER_ID)) return;

    const wrapper = document.createElement('div');
    wrapper.id = SEARCH_WRAPPER_ID;
    wrapper.className = 'stats-search-wrapper';

    const input = document.createElement('input');
    input.id = SEARCH_BAR_ID;
    input.type = 'text';
    input.placeholder = 'Search';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.className = 'stats-search-input';
    input.addEventListener('input', () => filterStatsPanels(input.value.trim().toLowerCase()));

    const stopProp = (e) => e.stopPropagation();
    input.addEventListener('keydown', stopProp);
    input.addEventListener('keyup', stopProp);
    input.addEventListener('keypress', stopProp);

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.classList.add("stats-search-icon");
    icon.setAttribute("viewBox", "0 0 512 512");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z");
    icon.appendChild(path);
    wrapper.appendChild(input);
    wrapper.appendChild(icon);

    statsContainer.insertBefore(wrapper, statsContainer.firstChild);
}

function updateSearchBarVisibility(count) {
    const wrapper = document.getElementById(SEARCH_WRAPPER_ID);
    if (!wrapper) return;
    if (count > 3) {
        wrapper.style.display = 'block';
    } else {
        wrapper.style.display = 'none';
        const input = document.getElementById(SEARCH_BAR_ID);
        if (input && input.value !== '') {
            input.value = '';
            filterStatsPanels('');
        }
    }
}

function filterStatsPanels(query) {
    const panels = document.querySelectorAll('#stats .stats-group');
    let lastVisible = null;
    panels.forEach(panel => {
        panel.classList.remove('last-visible');
        if (!query) { panel.style.display = ''; lastVisible = panel; return; }
        const header = panel.querySelector('.talker-header');
        const text = (header ? header.textContent : '').toLowerCase();
        const tid = (header?.dataset.talkerId || '').toLowerCase();
        const isMatch = text.includes(query) || tid.includes(query);
        panel.style.display = isMatch ? '' : 'none';
        if (isMatch) lastVisible = panel;
    });
    if (lastVisible) lastVisible.classList.add('last-visible');
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

    document.querySelectorAll('.talker-header').forEach(header => {
        const talkerId = header.dataset.talkerId;
        const color = isElevation
            ? getElevationColorForTrack(talkerId)
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
            if (child.id !== SEARCH_WRAPPER_ID) child.remove();
        });
        statsContainerInitialized = true;
    }

    injectSearchBar(statsContainer);

    if (!points || points.length === 0) return;

    const { nmea: nmeaPoints, adsb: adsbPoints } = partitionByDataType(points);

    const tailPicker = document.getElementById('trail-tail-color');
    const baseColor = new THREE.Color(tailPicker ? tailPicker.value : '#00ffaa');
    const isElevation = isElevationModeActive();

    // Each renderer manages only its own panel type — no cross-contamination.
    updateNmeaStats(statsContainer, nmeaPoints, baseColor, isElevation);
    updateAdsbStats(statsContainer, adsbPoints, baseColor, isElevation);

    // Total panel count drives search bar visibility
    const totalPanels = statsContainer.querySelectorAll('.stats-group').length;
    updateSearchBarVisibility(totalPanels);

    updateHeaderVisuals();

    const searchEl = document.getElementById(SEARCH_BAR_ID);
    filterStatsPanels(searchEl ? searchEl.value.trim().toLowerCase() : '');
}

function updateNmeaStats(container, points, baseColor, isElevation) {
    if (points.length === 0) {
        // Remove any stale NMEA panels if no NMEA data present
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
                : `#${getTrackVariantColor(baseColor, talkerId).getHexString()}`;
            container.insertAdjacentHTML('beforeend', createNmeaStatsHTML(talkerId, colorHex));
        }
        const stats = calculateTalkerStats(byTalker[talkerId]);
        if (stats) updateNmeaStatsDOM(talkerId, stats);
    });
}

function updateAdsbStats(container, points, baseColor, isElevation) {
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
                : `#${getTrackVariantColor(baseColor, icao).getHexString()}`;
            container.insertAdjacentHTML('beforeend', createAdsbStatsHTML(icao, colorHex));
            fetchAircraftInfo(icao);
        }
        const stats = calculateAdsbAircraftStats(byAircraft[icao]);
        if (stats) updateAdsbStatsDOM(icao, stats);
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
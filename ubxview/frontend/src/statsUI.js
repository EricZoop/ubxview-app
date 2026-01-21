// statsUI.js
// DOM manipulation and UI updates for statistics panel

import * as THREE from 'three';
import { getTrackVariantColor, isElevationModeActive } from './trailControls.js';
import { groupPointsByTalker, calculateTalkerStats } from './parser.js';

/**
 * Creates the HTML structure for a talker's statistics panel.
 * @param {string} talkerId The talker ID (e.g., "GP", "GN", "ZZ", "01", "A1")
 * @param {string} headerColor The color to use for the header
 * @returns {string} HTML string
 */
function createTalkerStatsHTML(talkerId, headerColor) {
    return `
        <div class="stats-group">
            <h3 style="color: ${headerColor};" class="talker-header" data-talker-id="${talkerId}" tabindex="0" role="button" title="Click to follow">
                <span>Rover ${talkerId}</span>
            </h3>
            <table>
                <tbody>
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
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Formats time in seconds to HH:MM:SS format.
 * @param {number} timeInSeconds Time in seconds
 * @returns {string} Formatted time string
 */
function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Updates the DOM with statistics for a specific talker.
 * @param {string} talkerId The talker ID
 * @param {Object} stats Statistics object from calculateTalkerStats
 */
function updateTalkerStatsDOM(talkerId, stats) {
    const startTimeFormatted = formatTime(stats.startTime);
    const endTimeFormatted = formatTime(stats.endTime);

    document.getElementById(`${talkerId}-points-stat`).textContent = stats.totalPoints;
    document.getElementById(`${talkerId}-hz-stat`).textContent = stats.updateRate.toFixed(2); // Added
    document.getElementById(`${talkerId}-duration-stat`).textContent = stats.totalDuration.toFixed(1);
    document.getElementById(`${talkerId}-twod-stat`).textContent = stats.total2DDistance.toFixed(1);
    document.getElementById(`${talkerId}-threed-stat`).textContent = stats.total3DDistance.toFixed(1);
    document.getElementById(`${talkerId}-rth-stat`).textContent = stats.rthDistance3D.toFixed(1); // Added
    document.getElementById(`${talkerId}-speed-stat`).textContent = stats.latestSpeed.toFixed(2);
    document.getElementById(`${talkerId}-altitude-stat`).textContent = stats.currentAltitude.toFixed(2);
    document.getElementById(`${talkerId}-altwsg84-stat`).textContent = stats.currentAltWsg84.toFixed(2);
    document.getElementById(`${talkerId}-lat-stat`).textContent = stats.currentLat.toFixed(7);
    document.getElementById(`${talkerId}-long-stat`).textContent = stats.currentLon.toFixed(7);
    document.getElementById(`${talkerId}-satellites-stat`).textContent = stats.currentSatellites;
    document.getElementById(`${talkerId}-start-stat`).textContent = startTimeFormatted;
    document.getElementById(`${talkerId}-end-stat`).textContent = endTimeFormatted;
}

/**
 * Removes stale talker panels from the DOM.
 * @param {HTMLElement} statsContainer The stats container element
 * @param {Array<string>} currentTalkerIds Array of current talker IDs
 */
function removeStalePanels(statsContainer, currentTalkerIds) {
    const existingPanels = statsContainer.querySelectorAll('.stats-group');
    existingPanels.forEach(panel => {
        const header = panel.querySelector('.talker-header');
        if (header) {
            const panelTalkerId = header.dataset.talkerId;
            if (!currentTalkerIds.includes(panelTalkerId)) {
                panel.remove();
            }
        } else {
            // If a panel is malformed (no header), remove it
            panel.remove();
        }
    });
}

/**
 * Update the color of the H3 talker headers in the stats panel.
 * @param {Map<string, {points: THREE.Points, line: THREE.Line, gpsPoints: Array}>} plotObjects The map of all plotted objects.
 */
export function updateStatsHeaderColors(plotObjects) {
    // When elevation mode is active, all headers should be a neutral white.
    if (isElevationModeActive()) {
        document.querySelectorAll('.talker-header').forEach(header => {
            header.style.color = '#ffffff';
        });
        return;
    }

    // Check if plotObjects is valid
    if (!plotObjects || plotObjects.size === 0) return;

    // Otherwise, calculate colors based on the current trail tail color.
    const tailColorPicker = document.getElementById('trail-tail-color');
    const baseColor = new THREE.Color(tailColorPicker ? tailColorPicker.value : '#00ffaa');

    // Get talker IDs and sort them alphabetically to ensure a consistent color order.
    const sortedTalkerIds = Array.from(plotObjects.keys()).sort();

    // Iterate over the sorted array, using its index for color generation.
    sortedTalkerIds.forEach((talkerId, index) => {
        const header = document.querySelector(`.talker-header[data-talker-id="${talkerId}"]`);
        if (header) {
            // Generate the unique color variant for this track's index
            const trackColor = getTrackVariantColor(baseColor, index);
            const headerColorHex = `#${trackColor.getHexString()}`;

            // Apply the new color directly to the element's style attribute
            header.style.color = headerColorHex;
        }
    });
}

/**
 * Main function to update all statistics in the UI.
 * @param {Array} points Array of all GPS points
 */
export function updateStats(points) {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    if (!points || points.length === 0) {
        return;
    }

    // Group points by talker ID
    const pointsByTalker = groupPointsByTalker(points);
    const currentTalkerIds = Object.keys(pointsByTalker).sort();

    // Remove stale talker panels
    removeStalePanels(statsContainer, currentTalkerIds);

    // Get base color for headers
    const tailColorPicker = document.getElementById('trail-tail-color');
    const baseColor = new THREE.Color(tailColorPicker ? tailColorPicker.value : '#00ffaa');

    // Create or update panels for each talker
    currentTalkerIds.forEach((talkerId, index) => {
        const talkerPoints = pointsByTalker[talkerId];

        // 1. CREATE the panel structure if it's not already in the DOM
        if (!document.getElementById(`${talkerId}-points-stat`)) {
            let headerColorHex;
            if (isElevationModeActive()) {
                headerColorHex = '#ffffff';
            } else {
                const trackColor = getTrackVariantColor(baseColor, index);
                headerColorHex = `#${trackColor.getHexString()}`;
            }
            statsContainer.insertAdjacentHTML('beforeend', createTalkerStatsHTML(talkerId, headerColorHex));
        }

        // 2. Calculate stats and UPDATE the DOM
        const stats = calculateTalkerStats(talkerPoints);
        if (stats) {
            updateTalkerStatsDOM(talkerId, stats);
        }
    });
}

/**
 * Initializes event delegation for talker header clicks.
 * This should be called once on page load.
 */
export function initializeStatsEventListeners() {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    statsContainer.addEventListener('click', (e) => {
        // Use .closest() to find the talker-header that was clicked,
        // even if the user clicked on text inside the H3.
        const header = e.target.closest('.talker-header');

        // If a header was not the target of the click, do nothing.
        if (!header) {
            return;
        }

        const talkerId = header.dataset.talkerId;
        if (talkerId) {
            // Dispatch the custom event that cameraControls.js is listening for.
            const event = new CustomEvent('activateCinematicForTalker', {
                detail: { talkerId: talkerId }
            });
            window.dispatchEvent(event);
        }
    });
}

// Auto-initialize event listeners when module loads
initializeStatsEventListeners();
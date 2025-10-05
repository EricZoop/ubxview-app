// trailControls.js

import * as THREE from "three";
import { updateStatsHeaderColors } from './statsUI.js';

// Module state
let plotObjects = new Map(); // Will store {points, line, gpsPoints} for each talkerId
let masterGpsPoints = [];
let bounds = null;
let isElevationMode = false;
let elevationColorData = null;

/**
 * Generates a color variant by shifting its hue.
 * The first track (index 0) gets the original color. Subsequent tracks get shifted colors.
 * @param {THREE.Color} baseColor The original color from the color picker or preset.
 * @param {number} index The index of the track, used to determine the hue shift amount.
 * @returns {THREE.Color} The new, modified color.
 */
export function getTrackVariantColor(baseColor, index) {
    if (index === 0) {
        return baseColor.clone(); // Use the original color for the first track
    }

    const hsl = {};
    baseColor.getHSL(hsl);

    // Shift the hue by a noticeable amount (e.g., 17% around the color wheel) for each track
    const hueShiftAmount = 0.17;
    hsl.h = (hsl.h + hueShiftAmount * index) % 1.0; // Use modulo to wrap around the color wheel

    return new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
}


/**
 * Initialize the trail controls module with references to the plot objects.
 * @param {Map<string, {points: THREE.Points, line: THREE.Line, gpsPoints: Array}>} objects - Map of plot objects.
 * @param {Array} gpsPoints - The complete array of all GPS points.
 * @param {Object} dataBounds - Data bounds object.
 */
export function initializeTrailControls(objects, gpsPoints, dataBounds) {
    plotObjects = objects;
    masterGpsPoints = gpsPoints;
    bounds = dataBounds;
    
    const toggle = document.getElementById('show-lines-toggle');
    const isVisible = toggle ? toggle.checked : false;
    plotObjects.forEach(({ line: lineObject }) => {
        if (lineObject) {
            lineObject.visible = isVisible;
        }
    });
}

/**
 * Calculate elevation-based color data from all master points.
 */
function calculateElevationColorData() {
    if (!masterGpsPoints || masterGpsPoints.length === 0) return null;

    const elevations = masterGpsPoints.map(point => point.alt);
    const minElevation = Math.min(...elevations);
    const maxElevation = Math.max(...elevations);
    const elevationRange = maxElevation - minElevation;

    if (elevationRange === 0) {
        return null;
    }

    return { minElevation, maxElevation, elevationRange };
}

/**
 * Get color for a specific elevation using a smooth gradient.
 */
function getElevationColor(elevation, elevationData) {
    const { minElevation, elevationRange } = elevationData;
    const ratio = Math.max(0, Math.min(1, (elevation - minElevation) / elevationRange));

    // Blue -> Cyan -> Green -> Yellow -> Red gradient
    let r, g, b;
    if (ratio < 0.25) {
        const localRatio = ratio / 0.25;
        r = 0; g = localRatio * 0.8; b = 1;
    } else if (ratio < 0.5) {
        const localRatio = (ratio - 0.25) / 0.25;
        r = 0; g = 0.8 + localRatio * 0.2; b = 1 - localRatio;
    } else if (ratio < 0.75) {
        const localRatio = (ratio - 0.5) / 0.25;
        r = localRatio; g = 1; b = 0;
    } else {
        const localRatio = (ratio - 0.75) / 0.25;
        r = 1; g = 1 - localRatio; b = 0;
    }
    return new THREE.Color(r, g, b);
}

/**
 * Update point colors for all tracks based on elevation data.
 */
function updateElevationPointColors() {
    if (!plotObjects || !elevationColorData || !masterGpsPoints.length) return;

    plotObjects.forEach(({ points: pointsObject, gpsPoints }) => {
        if (!pointsObject) return;
        const geometry = pointsObject.geometry;
        const colors = geometry.attributes.color.array;

        gpsPoints.forEach((point, index) => {
            const color = getElevationColor(point.alt, elevationColorData);
            const colorIndex = index * 3;
            colors[colorIndex] = color.r;
            colors[colorIndex + 1] = color.g;
            colors[colorIndex + 2] = color.b;
        });

        geometry.attributes.color.needsUpdate = true;
    });
}


/**
 * Update point colors live based on current color picker values or elevation mode.
 */
export function updatePointColors() {
    if (!plotObjects || plotObjects.size === 0 || !bounds || !masterGpsPoints.length) return;

    if (isElevationMode && elevationColorData) {
        updateElevationPointColors();
        return;
    }

    const baseTrailHeadColor = new THREE.Color(document.getElementById('trail-head-color').value);
    const baseTrailTailColor = new THREE.Color(document.getElementById('trail-tail-color').value);
    
    // Sort the keys to ensure consistent order for color assignment.
    const sortedTalkerIds = Array.from(plotObjects.keys()).sort();

    // Iterate over the sorted keys.
    sortedTalkerIds.forEach((talkerId, index) => {
        const { points: pointsObject, gpsPoints } = plotObjects.get(talkerId);
        if (!pointsObject || gpsPoints.length === 0) return;
        
        const trailHeadColor = getTrackVariantColor(baseTrailHeadColor, index);
        const trailTailColor = getTrackVariantColor(baseTrailTailColor, index);

        const tailHSL = {};
        const headHSL = {};
        trailTailColor.getHSL(tailHSL);
        trailHeadColor.getHSL(headHSL);

        const geometry = pointsObject.geometry;
        const colors = geometry.attributes.color.array;
        const totalPoints = gpsPoints.length;
        const gradientPoints = 15;
        const gradientStartIndex = Math.max(0, totalPoints - gradientPoints);

        gpsPoints.forEach((point, i) => {
            let color;
            if (i < gradientStartIndex) {
                color = trailTailColor.clone();
            } else {
                const progressInGradient = i - gradientStartIndex;
                const ratio = progressInGradient / (gradientPoints > 1 ? gradientPoints - 1 : 1);
                const h = tailHSL.h + (headHSL.h - tailHSL.h) * ratio;
                const s = tailHSL.s + (headHSL.s - tailHSL.s) * ratio;
                const l = tailHSL.l + (headHSL.l - tailHSL.l) * ratio;
                color = new THREE.Color().setHSL(h, s, l);
            }
            const colorIndex = i * 3;
            colors[colorIndex] = color.r;
            colors[colorIndex + 1] = color.g;
            colors[colorIndex + 2] = color.b;
        });
        geometry.attributes.color.needsUpdate = true;
    });
}


/**
 * Enable elevation-based coloring mode.
 */
export function enableElevationMode() {
    elevationColorData = calculateElevationColorData();
    if (!elevationColorData) {
        return false;
    }
    isElevationMode = true;
    updateElevationPointColors();
    updateStatsHeaderColors(plotObjects);
    return true;
}

/**
 * Disable elevation-based coloring mode.
 */
export function disableElevationMode() {
    isElevationMode = false;
    elevationColorData = null;
    updatePointColors();
    updateStatsHeaderColors(plotObjects);
}

export function isElevationModeActive() {
    return isElevationMode;
}

export function getElevationData() {
    return elevationColorData;
}

/**
 * Update line color live for all tracks, applying a unique shade to each.
 */
export function updateLineColor() {
    if (!plotObjects) return;
    const baseLineColor = new THREE.Color(document.getElementById('trail-line-color').value);
    
    // Sort the keys to ensure consistent order.
    const sortedTalkerIds = Array.from(plotObjects.keys()).sort();

    // Iterate over sorted keys.
    sortedTalkerIds.forEach((talkerId, index) => {
        const { line: lineObject } = plotObjects.get(talkerId);
        if (lineObject) {
            const trackLineColor = getTrackVariantColor(baseLineColor, index);
            lineObject.material.color.copy(trackLineColor);
            lineObject.material.needsUpdate = true;
        }
    });
}

/**
 * Toggle line visibility for all tracks.
 */
export function toggleLineVisibility() {
    if (!plotObjects) return;
    const showLines = document.getElementById('show-lines-toggle').checked;

    plotObjects.forEach(({ line: lineObject }) => {
        if (lineObject) {
            lineObject.visible = showLines;
        }
    });
}

export function getCurrentTrailColors() {
    return {
        head: new THREE.Color(document.getElementById('trail-head-color').value),
        tail: new THREE.Color(document.getElementById('trail-tail-color').value),
        line: new THREE.Color(document.getElementById('trail-line-color').value)
    };
}

export function getLineVisibility() {
    const toggle = document.getElementById('show-lines-toggle');
    return toggle ? toggle.checked : false;
}

export function setupTrailControlListeners() {
    const headColorInput = document.getElementById("trail-head-color");
    const tailColorInput = document.getElementById("trail-tail-color");
    const lineColorInput = document.getElementById("trail-line-color");
    const lineToggle = document.getElementById("show-lines-toggle");

    const statsPanel = document.getElementById("stats");
    if (statsPanel) {
        statsPanel.addEventListener("wheel", (event) => {
            event.stopPropagation();
        });
    }

    const disableElevationAndResetPreset = () => {
        if (isElevationMode) {
            disableElevationMode();
            const presetSelect = document.getElementById("trail-preset");
            if (presetSelect) presetSelect.value = "";
        }
        updatePointColors();
        updateLineColor();
        updateStatsHeaderColors(plotObjects);
    };

    if (headColorInput) headColorInput.addEventListener("input", disableElevationAndResetPreset);
    if (tailColorInput) tailColorInput.addEventListener("input", disableElevationAndResetPreset);
    if (lineColorInput) lineColorInput.addEventListener("input", disableElevationAndResetPreset);
    if (lineToggle) lineToggle.addEventListener("change", toggleLineVisibility);
}

/**
 * Reset the module state.
 */
export function resetTrailControls() {
    plotObjects = new Map();
    masterGpsPoints = [];
    bounds = null;
    isElevationMode = false;
    elevationColorData = null;
}

export function refreshColorsFromUI() {
    // If we are in elevation mode, changing colors should disable it.
    // disableElevationMode() already handles a full visual refresh.
    if (isElevationModeActive()) {
        disableElevationMode();
    } else {
        // Otherwise, just update everything based on the current picker values.
        updatePointColors();
        updateLineColor();
        updateStatsHeaderColors(plotObjects);
    }
}
// TRAIL COLOR AND VISIBILITY CONTROLS WITH ELEVATION SUPPORT

import * as THREE from "three";

// Module state
let pointsObject = null;
let lineObject = null;
let masterGpsPoints = [];
let bounds = null;
let isElevationMode = false;
let elevationColorData = null;

/**
 * Initialize the trail controls module with references to the objects
 * @param {THREE.Points} points - The points object
 * @param {THREE.Line} line - The line object
 * @param {Array} gpsPoints - Array of GPS points
 * @param {Object} dataBounds - Data bounds object
 */
export function initializeTrailControls(points, line, gpsPoints, dataBounds) {
    pointsObject = points;
    lineObject = line;
    masterGpsPoints = gpsPoints;
    bounds = dataBounds;
    
    // Apply current line visibility setting to the new line object
    if (lineObject) {
        const toggle = document.getElementById('show-lines-toggle');
        lineObject.visible = toggle ? toggle.checked : false;
    }
}

/**
 * Calculate elevation-based color data
 * @returns {Object|null} Elevation data object or null if invalid
 */
function calculateElevationColorData() {
    if (!masterGpsPoints || masterGpsPoints.length === 0) {
        return null;
    }

    const elevations = masterGpsPoints.map(point => point.alt);
    const minElevation = Math.min(...elevations);
    const maxElevation = Math.max(...elevations);
    const elevationRange = maxElevation - minElevation;

    if (elevationRange === 0) {
        console.warn('All points are at the same elevation, cannot create elevation gradient');
        return null;
    }

    return {
        minElevation,
        maxElevation,
        elevationRange
    };
}

/**
 * Get color for a specific elevation using a smooth gradient
 * @param {number} elevation - The elevation value
 * @param {Object} elevationData - Elevation range data
 * @returns {THREE.Color} The computed color
 */
function getElevationColor(elevation, elevationData) {
    const { minElevation, elevationRange } = elevationData;
    const ratio = Math.max(0, Math.min(1, (elevation - minElevation) / elevationRange));

    // Create a smooth gradient from blue (low) through green to red/yellow (high)
    let r, g, b;

    if (ratio < 0.25) {
        // Blue to Cyan (0-0.25)
        const localRatio = ratio / 0.25;
        r = 0;
        g = localRatio * 0.8;
        b = 1;
    } else if (ratio < 0.5) {
        // Cyan to Green (0.25-0.5)
        const localRatio = (ratio - 0.25) / 0.25;
        r = 0;
        g = 0.8 + localRatio * 0.2;
        b = 1 - localRatio;
    } else if (ratio < 0.75) {
        // Green to Yellow (0.5-0.75)
        const localRatio = (ratio - 0.5) / 0.25;
        r = localRatio;
        g = 1;
        b = 0;
    } else {
        // Yellow to Red (0.75-1.0)
        const localRatio = (ratio - 0.75) / 0.25;
        r = 1;
        g = 1 - localRatio;
        b = 0;
    }

    return new THREE.Color(r, g, b);
}

/**
 * Update point colors based on elevation data
 */
function updateElevationPointColors() {
    if (!pointsObject || !elevationColorData || !masterGpsPoints.length) return;

    const geometry = pointsObject.geometry;
    const colors = geometry.attributes.color.array;

    masterGpsPoints.forEach((point, index) => {
        const color = getElevationColor(point.alt, elevationColorData);
        
        const colorIndex = index * 3;
        colors[colorIndex] = color.r;
        colors[colorIndex + 1] = color.g;
        colors[colorIndex + 2] = color.b;
    });

    geometry.attributes.color.needsUpdate = true;
    console.log(`Updated ${masterGpsPoints.length} points with elevation-based colors`);
}

/**
 * Update point colors live based on current color picker values or elevation mode
 */
export function updatePointColors() {
    if (!pointsObject || !bounds || !masterGpsPoints.length) return;

    if (isElevationMode && elevationColorData) {
        updateElevationPointColors();
        return;
    }

    // Standard gradient coloring (existing functionality)
    const trailHeadColor = new THREE.Color(document.getElementById('trail-head-color').value);
    const trailTailColor = new THREE.Color(document.getElementById('trail-tail-color').value);

    const geometry = pointsObject.geometry;
    const colors = geometry.attributes.color.array;

    const totalPoints = masterGpsPoints.length;
    const gradientPoints = 50;
    const gradientStartIndex = Math.max(0, totalPoints - gradientPoints);

    // Get HSL values of start and end colors
    const tailHSL = {};
    const headHSL = {};
    trailTailColor.getHSL(tailHSL);
    trailHeadColor.getHSL(headHSL);

    masterGpsPoints.forEach((point, index) => {
        let color;

        if (index < gradientStartIndex) {
            color = trailTailColor.clone();
        } else {
            const progressInGradient = index - gradientStartIndex;
            const ratio = progressInGradient / (gradientPoints > 1 ? gradientPoints - 1 : 1);

            // Interpolate HSL manually
            const h = tailHSL.h + (headHSL.h - tailHSL.h) * ratio;
            const s = tailHSL.s + (headHSL.s - tailHSL.s) * ratio;
            const l = tailHSL.l + (headHSL.l - tailHSL.l) * ratio;

            color = new THREE.Color().setHSL(h, s, l);
        }

        const colorIndex = index * 3;
        colors[colorIndex] = color.r;
        colors[colorIndex + 1] = color.g;
        colors[colorIndex + 2] = color.b;
    });

    geometry.attributes.color.needsUpdate = true;
}

/**
 * Enable elevation-based coloring mode
 * @returns {boolean} True if elevation mode was successfully enabled
 */
export function enableElevationMode() {
    elevationColorData = calculateElevationColorData();
    
    if (!elevationColorData) {
        console.warn('Cannot enable elevation mode: insufficient elevation data');
        return false;
    }

    isElevationMode = true;
    updateElevationPointColors();
    
    console.log(`Elevation mode enabled. Range: ${elevationColorData.minElevation.toFixed(1)}m - ${elevationColorData.maxElevation.toFixed(1)}m`);
    return true;
}

/**
 * Disable elevation-based coloring mode
 */
export function disableElevationMode() {
    isElevationMode = false;
    elevationColorData = null;
    
    // Revert to standard coloring
    updatePointColors();
    console.log('Elevation mode disabled');
}

/**
 * Check if elevation mode is currently active
 * @returns {boolean} True if elevation mode is active
 */
export function isElevationModeActive() {
    return isElevationMode;
}

/**
 * Get elevation data information
 * @returns {Object|null} Elevation data or null if not available
 */
export function getElevationData() {
    return elevationColorData;
}

/**
 * Update line color live based on current color picker value
 */
export function updateLineColor() {
    if (!lineObject) return;

    const lineColor = new THREE.Color(document.getElementById('trail-line-color').value);
    lineObject.material.color.copy(lineColor);
    lineObject.material.needsUpdate = true;
}

/**
 * Toggle line visibility based on checkbox state
 */
export function toggleLineVisibility() {
    if (!lineObject) return;
    
    const showLines = document.getElementById('show-lines-toggle').checked;
    lineObject.visible = showLines;
    console.log(`Line visibility set to: ${showLines}`);
}

/**
 * Get current trail colors from the UI
 * @returns {Object} Object containing head, tail, and line colors
 */
export function getCurrentTrailColors() {
    return {
        head: new THREE.Color(document.getElementById('trail-head-color').value),
        tail: new THREE.Color(document.getElementById('trail-tail-color').value),
        line: new THREE.Color(document.getElementById('trail-line-color').value)
    };
}

/**
 * Get current line visibility state
 * @returns {boolean} Whether lines should be visible
 */
export function getLineVisibility() {
    const toggle = document.getElementById('show-lines-toggle');
    return toggle ? toggle.checked : false; // Default to false - lines off by default
}

/**
 * Setup event listeners for trail controls
 */
export function setupTrailControlListeners() {
    // Color update listeners
    const headColorInput = document.getElementById("trail-head-color");
    const tailColorInput = document.getElementById("trail-tail-color");
    const lineColorInput = document.getElementById("trail-line-color");
    const lineToggle = document.getElementById("show-lines-toggle");

    if (headColorInput) {
        headColorInput.addEventListener("input", () => {
            // Disable elevation mode when manually changing colors
            if (isElevationMode) {
                disableElevationMode();
                // Reset preset selector
                const presetSelect = document.getElementById("trail-preset");
                if (presetSelect) presetSelect.value = "";
            }
            updatePointColors();
        });
    }

    if (tailColorInput) {
        tailColorInput.addEventListener("input", () => {
            // Disable elevation mode when manually changing colors
            if (isElevationMode) {
                disableElevationMode();
                // Reset preset selector
                const presetSelect = document.getElementById("trail-preset");
                if (presetSelect) presetSelect.value = "";
            }
            updatePointColors();
        });
    }

    if (lineColorInput) {
        lineColorInput.addEventListener("input", updateLineColor);
    }

    if (lineToggle) {
        lineToggle.addEventListener("change", toggleLineVisibility);
    }

    console.log("Trail control listeners setup complete");
}

/**
 * Reset the module state (call when clearing/reloading data)
 */
export function resetTrailControls() {
    pointsObject = null;
    lineObject = null;
    masterGpsPoints = [];
    bounds = null;
    isElevationMode = false;
    elevationColorData = null;
}
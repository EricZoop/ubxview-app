// TRAIL COLOR AND VISIBILITY CONTROLS

import * as THREE from "three";

// Module state
let pointsObject = null;
let lineObject = null;
let masterGpsPoints = [];
let bounds = null;

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
}

/**
 * Update point colors live based on current color picker values
 */
export function updatePointColors() {
    if (!pointsObject || !bounds || !masterGpsPoints.length) return;

    const trailHeadColor = new THREE.Color(document.getElementById('trail-head-color').value);
    const trailTailColor = new THREE.Color(document.getElementById('trail-tail-color').value);

    const geometry = pointsObject.geometry;
    const colors = geometry.attributes.color.array;

    const totalPoints = masterGpsPoints.length;
    const gradientPoints = 20;
    
    // This value is recalculated on every update, correctly finding the new start of the gradient.
    const gradientStartIndex = Math.max(0, totalPoints - gradientPoints);

    // --- KEY FIX FOR LIVE UPDATES ---
    // This loop iterates over ALL points, from index 0 to the very end, on every single call.
    masterGpsPoints.forEach((point, index) => {
        let color;

        // This condition re-evaluates every point. A point that was previously in the gradient
        // (e.g., at index totalPoints - 21) will now meet this condition.
        // This explicitly RESETS its color to the solid tail color, preventing the "stagger" effect.
        if (index < gradientStartIndex) {
            color = trailTailColor.clone();
        } else {
            // Only the newest 20 points will enter this block and get a fresh gradient color.
            const progressInGradient = index - gradientStartIndex;
            const ratio = progressInGradient / (gradientPoints > 1 ? gradientPoints - 1 : 1);
            color = new THREE.Color().lerpColors(trailTailColor, trailHeadColor, ratio);
        }

        // The color for EVERY vertex is updated in the buffer array on each run.
        const colorIndex = index * 3;
        colors[colorIndex] = color.r;
        colors[colorIndex + 1] = color.g;
        colors[colorIndex + 2] = color.b;
    });

    // This flag tells Three.js to re-read the ENTIRE color buffer, applying all our changes.
    geometry.attributes.color.needsUpdate = true;
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
    return toggle ? toggle.checked : true;
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
        headColorInput.addEventListener("input", updatePointColors);
    }

    if (tailColorInput) {
        tailColorInput.addEventListener("input", updatePointColors);
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
}
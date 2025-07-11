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

    // Update colors for all points
    masterGpsPoints.forEach((point, index) => {
        const altRatio = (point.alt - bounds.minAlt) / (bounds.maxAlt - bounds.minAlt) || 0;
        const color = new THREE.Color().lerpColors(trailHeadColor, trailTailColor, altRatio);
        
        const colorIndex = index * 3;
        colors[colorIndex] = color.r;
        colors[colorIndex + 1] = color.g;
        colors[colorIndex + 2] = color.b;
    });

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
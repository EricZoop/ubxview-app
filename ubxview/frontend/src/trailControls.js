// trailControls.js

import * as THREE from "three";
import { updateStatsHeaderColors } from './statsUI.js';
import { updateLabelColors } from './labelManager.js';

// Module state
let plotObjects = new Map();
let masterGpsPoints = [];
let bounds = null;
let isElevationMode = false;
let elevationColorData = null; // { minElevation, maxElevation, elevationRange } across all tracks

// ─── Stable Color Assignment ────────────────────────────────────────────────
const GOLDEN_ANGLE = 0.618033988749895;
const stableColorMap = new Map();
let nextColorIndex = 0;

function getStableAssignment(talkerId) {
    if (!stableColorMap.has(talkerId)) {
        const idx = nextColorIndex++;
        stableColorMap.set(talkerId, {
            index: idx,
            hueOffset: idx === 0 ? 0 : (idx * GOLDEN_ANGLE) % 1.0
        });
    }
    return stableColorMap.get(talkerId);
}

export function getTrackVariantColor(baseColor, talkerId) {
    const assignment = getStableAssignment(talkerId);
    if (assignment.index === 0) return baseColor.clone();
    const hsl = {};
    baseColor.getHSL(hsl);
    hsl.h = (hsl.h + assignment.hueOffset) % 1.0;
    return new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
}

export function resetStableColors() {
    stableColorMap.clear();
    nextColorIndex = 0;
}


// ─── Comet Point Sizing ─────────────────────────────────────────────────────
const COMET_LENGTH = 3;
const MIN_POINT_SIZE = 5.0;
const MAX_POINT_SIZE = 8.0;

export function updatePointSizes() {
    if (!plotObjects || plotObjects.size === 0) return;
    plotObjects.forEach(({ points: pointsObject, gpsPoints }) => {
        if (!pointsObject) return;
        const geo = pointsObject.geometry;
        const sizeAttr = geo.attributes.pointSize;
        if (!sizeAttr) return;
        const sizes = sizeAttr.array;
        const total = gpsPoints.length;
        const cometStart = Math.max(0, total - COMET_LENGTH);
        for (let i = 0; i < total; i++) {
            if (i < cometStart) {
                sizes[i] = MIN_POINT_SIZE;
            } else {
                const progress = (i - cometStart) / (Math.min(COMET_LENGTH, total) - 1 || 1);
                sizes[i] = MIN_POINT_SIZE + (MAX_POINT_SIZE - MIN_POINT_SIZE) * progress;
            }
        }
        sizeAttr.needsUpdate = true;
    });
}


// ─── Initialize ─────────────────────────────────────────────────────────────
export function initializeTrailControls(objects, gpsPoints, dataBounds) {
    plotObjects = objects;
    masterGpsPoints = gpsPoints;
    bounds = dataBounds;

    const toggle = document.getElementById('show-lines-toggle');
    const isVisible = toggle ? toggle.checked : false;
    plotObjects.forEach(({ line: lineObject }) => {
        if (lineObject) lineObject.visible = isVisible;
    });
}


// ─── Elevation Mode ─────────────────────────────────────────────────────────

function calculateElevationColorData() {
    if (!masterGpsPoints || masterGpsPoints.length === 0) return null;
    const elevations = masterGpsPoints.map(p => p.alt);
    const minElevation = Math.min(...elevations);
    const maxElevation = Math.max(...elevations);
    const elevationRange = maxElevation - minElevation;
    if (elevationRange === 0) return null;
    return { minElevation, maxElevation, elevationRange };
}

function getElevationColor(elevation, elevationData) {
    const { minElevation, elevationRange } = elevationData;
    const ratio = Math.max(0, Math.min(1, (elevation - minElevation) / elevationRange));
    let r, g, b;
    if (ratio < 0.25) {
        const t = ratio / 0.25;
        r = 0; g = t * 0.8; b = 1;
    } else if (ratio < 0.5) {
        const t = (ratio - 0.25) / 0.25;
        r = 0; g = 0.8 + t * 0.2; b = 1 - t;
    } else if (ratio < 0.75) {
        const t = (ratio - 0.5) / 0.25;
        r = t; g = 1; b = 0;
    } else {
        const t = (ratio - 0.75) / 0.25;
        r = 1; g = 1 - t; b = 0;
    }
    return new THREE.Color(r, g, b);
}

// NEW EXPORT: Allows statsUI to grab the correct color
export function getElevationColorForTrack(talkerId) {
    const track = plotObjects.get(talkerId);
    if (!track || !track.gpsPoints || !track.gpsPoints.length || !elevationColorData) {
        return new THREE.Color(0xffffff);
    }
    const lastPoint = track.gpsPoints[track.gpsPoints.length - 1];
    return getElevationColor(lastPoint.alt, elevationColorData);
}

function updateElevationPointColors() {
    if (!plotObjects || !elevationColorData || !masterGpsPoints.length) return;

    plotObjects.forEach(({ points: pointsObject, gpsPoints }) => {
        if (!pointsObject) return;
        const colors = pointsObject.geometry.attributes.color.array;
        gpsPoints.forEach((point, i) => {
            const color = getElevationColor(point.alt, elevationColorData);
            const ci = i * 3;
            colors[ci] = color.r;
            colors[ci + 1] = color.g;
            colors[ci + 2] = color.b;
        });
        pointsObject.geometry.attributes.color.needsUpdate = true;
    });
}

export function enableElevationMode() {
    elevationColorData = calculateElevationColorData();
    if (!elevationColorData) return false;
    isElevationMode = true;
    
    updateElevationPointColors();
    updateLineColor();
    
    // Scene labels: use elevation color
    updateLabelColors(getElevationColorForTrack);
    
    // Stats UI: now triggered to update with elevation awareness
    updateStatsHeaderColors(plotObjects);
    
    return true;
}

export function disableElevationMode() {
    isElevationMode = false;
    elevationColorData = null;
    updatePointColors();
    updateLineColor();
    updateStatsHeaderColors(plotObjects);
}

export function isElevationModeActive() { return isElevationMode; }
export function getElevationData() { return elevationColorData; }


// ─── Point Colors ────────────────────────────────────────────────────────
export function updatePointColors() {
    if (!plotObjects || plotObjects.size === 0 || !bounds || !masterGpsPoints.length) return;

    if (isElevationMode && elevationColorData) {
        updateElevationPointColors();
        updatePointSizes();
        updateLabelColors(getElevationColorForTrack);
        return;
    }

    const baseHeadColor = new THREE.Color(document.getElementById('trail-head-color').value);
    const baseTailColor = new THREE.Color(document.getElementById('trail-tail-color').value);

    plotObjects.forEach(({ points: pointsObject, gpsPoints }, talkerId) => {
        if (!pointsObject || gpsPoints.length === 0) return;

        const trailHeadColor = getTrackVariantColor(baseHeadColor, talkerId);
        const trailTailColor = getTrackVariantColor(baseTailColor, talkerId);

        const tailHSL = {};
        const headHSL = {};
        trailTailColor.getHSL(tailHSL);
        trailHeadColor.getHSL(headHSL);

        const colors = pointsObject.geometry.attributes.color.array;
        const totalPoints = gpsPoints.length;
        const gradientPoints = 15;
        const gradientStartIndex = Math.max(0, totalPoints - gradientPoints);

        for (let i = 0; i < totalPoints; i++) {
            let color;
            if (i < gradientStartIndex) {
                color = trailTailColor;
            } else {
                const ratio = (i - gradientStartIndex) / (gradientPoints > 1 ? gradientPoints - 1 : 1);
                const h = tailHSL.h + (headHSL.h - tailHSL.h) * ratio;
                const s = tailHSL.s + (headHSL.s - tailHSL.s) * ratio;
                const l = tailHSL.l + (headHSL.l - tailHSL.l) * ratio;
                color = new THREE.Color().setHSL(h, s, l);
            }
            const ci = i * 3;
            colors[ci] = color.r;
            colors[ci + 1] = color.g;
            colors[ci + 2] = color.b;
        }
        pointsObject.geometry.attributes.color.needsUpdate = true;
    });

    updatePointSizes();

    // Scene labels: use tail color variant
    updateLabelColors((talkerId) => getTrackVariantColor(baseTailColor, talkerId));
}


// ─── Line Colors ────────────────────────────────────────────────────────────
export function updateLineColor() {
    if (!plotObjects) return;
    const baseLineColor = new THREE.Color(document.getElementById('trail-line-color').value);
    const translucent = isElevationMode;

    plotObjects.forEach(({ line: lineObject }, talkerId) => {
        if (!lineObject || !lineObject.material) return;
        const trackLineColor = getTrackVariantColor(baseLineColor, talkerId);
        lineObject.material.color.copy(trackLineColor);
        lineObject.material.transparent = translucent;
        lineObject.material.opacity = translucent ? 0.2 : 1.0;
        lineObject.material.depthWrite = !translucent;
        lineObject.material.needsUpdate = true;
    });
}


// ─── Line Visibility ────────────────────────────────────────────────────────
export function toggleLineVisibility() {
    if (!plotObjects) return;
    const showLines = document.getElementById('show-lines-toggle').checked;
    plotObjects.forEach(({ line: lineObject }) => {
        if (lineObject) lineObject.visible = showLines;
    });
}


// ─── Getters ────────────────────────────────────────────────────────────────
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


// ─── UI Listeners ───────────────────────────────────────────────────────────
export function setupTrailControlListeners() {
    const headColorInput = document.getElementById("trail-head-color");
    const tailColorInput = document.getElementById("trail-tail-color");
    const lineColorInput = document.getElementById("trail-line-color");
    const lineToggle = document.getElementById("show-lines-toggle");

    const statsPanel = document.getElementById("stats");
    if (statsPanel) {
        statsPanel.addEventListener("wheel", (event) => event.stopPropagation());
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


// ─── Reset ──────────────────────────────────────────────────────────────────
export function resetTrailControls() {
    plotObjects = new Map();
    masterGpsPoints = [];
    bounds = null;
    isElevationMode = false;
    elevationColorData = null;
}

export function refreshColorsFromUI() {
    if (isElevationModeActive()) {
        disableElevationMode();
    } else {
        updatePointColors();
        updateLineColor();
        updateStatsHeaderColors(plotObjects);
    }
}
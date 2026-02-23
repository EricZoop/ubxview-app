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
let isClassifyMode = false;

// Classify mode: fixed colors per data type
const CLASSIFY_COLORS = {
    radar: new THREE.Color(0xff2222),   // red
    adsb:  new THREE.Color(0x00ACFF),   // blue
    nmea:  new THREE.Color(0xffdd00),   // yellow (drone)
};

function pointDataTypeClassify(p) {
    if (!p) return 'nmea';
    if (p.dataType === 'radar') return 'radar';
    if (p.dataType === 'adsb')  return 'adsb';
    if (p.dataType === 'nmea')  return 'nmea';
    if (p.icaoAddress !== undefined || p.heading !== undefined || p.horizontalVelocity !== undefined) return 'adsb';
    if (p.talkerId && /^[A-Z]{2}$/.test(p.talkerId)) return 'nmea';
    return 'nmea';
}

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

// ─── Color Picker State ──────────────────────────────────────────────────────
const COLOR_PICKER_IDS = ['trail-head-color', 'trail-tail-color', 'trail-line-color'];

function updateColorPickerState() {
    const disabled = isElevationMode || isClassifyMode;
    COLOR_PICKER_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.disabled = disabled;
        el.style.opacity = disabled ? '0.35' : '1';
        el.style.cursor  = disabled ? 'not-allowed' : 'pointer';
        // Wrap label too if present
        const group = el.closest('.trail-group');
        if (group) group.style.cursor = disabled ? 'not-allowed' : '';
    });
}

// ─── Classify Mode ───────────────────────────────────────────────────────────
export function getClassifyColorForTrack(talkerId) {
    const track = plotObjects.get(talkerId);
    if (!track || !track.gpsPoints || !track.gpsPoints.length) {
        return new THREE.Color(0xffffff);
    }
    // Determine type from first available point
    const p = track.gpsPoints[0];
    const type = pointDataTypeClassify(p);
    return CLASSIFY_COLORS[type] ? CLASSIFY_COLORS[type].clone() : new THREE.Color(0xffffff);
}

function updateClassifyPointColors() {
    if (!plotObjects) return;
    plotObjects.forEach(({ points: pointsObject, gpsPoints }) => {
        if (!pointsObject) return;
        const colors = pointsObject.geometry.attributes.color.array;
        gpsPoints.forEach((point, i) => {
            const type = pointDataTypeClassify(point);
            const color = CLASSIFY_COLORS[type] || new THREE.Color(0xffffff);
            const ci = i * 3;
            colors[ci]     = color.r;
            colors[ci + 1] = color.g;
            colors[ci + 2] = color.b;
        });
        pointsObject.geometry.attributes.color.needsUpdate = true;
    });
}

export function enableClassifyMode() {
    isClassifyMode = true;
    updateClassifyPointColors();
    updateLineColor();
    updateLabelColors(getClassifyColorForTrack);
    updateStatsHeaderColors(plotObjects);
    updateColorPickerState();
}

export function disableClassifyMode() {
    isClassifyMode = false;
    updatePointColors();
    updateLineColor();
    updateStatsHeaderColors(plotObjects);
    updateColorPickerState();
}

export function isClassifyModeActive() { return isClassifyMode; }


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
    
    updateColorPickerState();
    return true;
}

export function disableElevationMode() {
    isElevationMode = false;
    elevationColorData = null;
    updatePointColors();
    updateLineColor();
    updateStatsHeaderColors(plotObjects);
    updateColorPickerState();
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

    if (isClassifyMode) {
        updateClassifyPointColors();
        updatePointSizes();
        updateLabelColors(getClassifyColorForTrack);
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
    const translucent = isElevationMode || isClassifyMode;

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

    // Color pickers are disabled during elevation/classify, so this only fires
    // in normal mode. Still reset preset label to "Custom" to stay consistent.
    const onColorPickerChange = () => {
        const presetSelect = document.getElementById("trail-preset");
        if (presetSelect) presetSelect.value = "";
        updatePointColors();
        updateLineColor();
        updateStatsHeaderColors(plotObjects);
    };

    // Line toggle: just toggle visibility, no mode changes or preset reset.
    const onLineToggleChange = () => {
        toggleLineVisibility();
    };

    if (headColorInput) headColorInput.addEventListener("input", onColorPickerChange);
    if (tailColorInput) tailColorInput.addEventListener("input", onColorPickerChange);
    if (lineColorInput) lineColorInput.addEventListener("input", onColorPickerChange);
    if (lineToggle) lineToggle.addEventListener("change", onLineToggleChange);
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
    // Inline-clear any special modes so updatePointColors reads clean state,
    // then always do a full repaint from the current UI picker values.
    if (isElevationMode) {
        isElevationMode = false;
        elevationColorData = null;
        updateColorPickerState();
    }
    if (isClassifyMode) {
        isClassifyMode = false;
        updateColorPickerState();
    }
    updatePointColors();
    updateLineColor();
    updateStatsHeaderColors(plotObjects);
}
// labelManager.js

import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { lookupAircraftModel } from "./statsUI.js";

const trackLabels = new Map(); // talkerId -> CSS2DObject
let sceneGroup = null;
let labelsVisible = true; // mirrors the checkbox state

// ─── Visibility ───────────────────────────────────────────────────────────────

function setLabelsVisible(visible) {
    labelsVisible = visible;
    trackLabels.forEach(label => { label.visible = visible; });
}

function initializeLabelToggle() {
    const toggle = document.getElementById('show-label-toggle');
    if (!toggle) return;

    // Sync initial state with whatever the checkbox is set to in HTML
    labelsVisible = toggle.checked;

    toggle.addEventListener('change', () => setLabelsVisible(toggle.checked));
}

// ─── Init ─────────────────────────────────────────────────────────────────────

export function initializeLabelManager(group) {
    sceneGroup = group;

    initializeLabelToggle();

    window.addEventListener('aircraftInfoLoaded', (e) => {
        if (e.detail?.talkerId) updateSingleLabelContent(e.detail.talkerId);
    });
}

// ─── Clear ────────────────────────────────────────────────────────────────────

export function clearTrackLabels() {
    trackLabels.forEach((label) => {
        if (label.parent) label.parent.remove(label);
        if (label.element?.parentNode) label.element.parentNode.removeChild(label.element);
    });
    trackLabels.clear();
}

// ─── Single Label Content Update ─────────────────────────────────────────────

function updateSingleLabelContent(talkerId) {
    let label = trackLabels.get(talkerId);

    if (!label) {
        for (const [key, val] of trackLabels.entries()) {
            if (key.toLowerCase() === talkerId.toLowerCase()) { label = val; break; }
        }
    }
    if (!label) return;

    const model = lookupAircraftModel(talkerId);
    const labelText = (model && model !== 'Unknown' && model !== 'Unknown Model' && model !== 'Loading...')
        ? model
        : `Aircraft ${talkerId}`;

    if (label.element.textContent !== labelText) label.element.textContent = labelText;
}

// ─── Create / Update ─────────────────────────────────────────────────────────

export function createOrUpdateLabels(pointsByTalker, gpsToCartesian) {
    if (!sceneGroup || !gpsToCartesian) return;

    // Remove labels for tracks that no longer exist
    trackLabels.forEach((label, id) => {
        if (!(id in pointsByTalker)) {
            if (label.parent) label.parent.remove(label);
            if (label.element?.parentNode) label.element.parentNode.removeChild(label.element);
            trackLabels.delete(id);
        }
    });

    for (const talkerId in pointsByTalker) {
        const pts = pointsByTalker[talkerId];
        if (pts.length === 0) continue;

        const lastPt = pts[pts.length - 1];
        const pos = gpsToCartesian(lastPt.lat, lastPt.lon, lastPt.alt);

        let label = trackLabels.get(talkerId);

        // ── Create new label ──────────────────────────────────────────────────
        if (!label) {
            const div = document.createElement('div');
            div.className = 'track-label';
            div.setAttribute('data-track-label-id', talkerId);
            div.style.cssText = `
                margin-top: -25px;
                color: #ffffff;
                font-size: 12px;
                font-weight: 600;
                font-family: inherit;
                white-space: nowrap;
                pointer-events: none;
                text-shadow:
                    -1px -1px 2px rgba(0,0,0,0.9),
                     1px -1px 2px rgba(0,0,0,0.9),
                    -1px  1px 2px rgba(0,0,0,0.9),
                     1px  1px 2px rgba(0,0,0,0.9),
                     0    0   6px rgba(0,0,0,0.6);
            `;

            label = new CSS2DObject(div);
            // Apply current toggle state to newly created labels
            label.visible = labelsVisible;
            trackLabels.set(talkerId, label);
            sceneGroup.add(label);
        }

        // ── Label text ───────────────────────────────────────────────────────
        let labelText;
        if (lastPt.dataType === 'radar') {
            const trackId = talkerId.startsWith('radar_') ? talkerId.slice(6) : talkerId;
            labelText = `Track ${trackId}`;
        } else if (lastPt.dataType === 'adsb') {
            const model = lookupAircraftModel(talkerId);
            labelText = (model && model !== 'Unknown' && model !== 'Unknown Model')
                ? model
                : `Aircraft ${talkerId}`;
        } else {
            labelText = `Rover ${talkerId}`;
        }

        if (label.element.textContent !== labelText) label.element.textContent = labelText;

        // ── Position ─────────────────────────────────────────────────────────
        label.position.copy(pos);
    }
}

// ─── Position Update (animation loop) ────────────────────────────────────────

export function updateLabelPositions(masterGpsPoints, gpsToCartesian) {
    if (!gpsToCartesian || trackLabels.size === 0) return;

    const lastPoints = new Map();
    for (let i = masterGpsPoints.length - 1; i >= 0; i--) {
        const p = masterGpsPoints[i];
        const t = p.talkerId || 'default';
        if (!lastPoints.has(t)) lastPoints.set(t, p);
    }

    trackLabels.forEach((label, talkerId) => {
        const last = lastPoints.get(talkerId);
        if (last) label.position.copy(gpsToCartesian(last.lat, last.lon, last.alt));
    });
}

// ─── Color Update ─────────────────────────────────────────────────────────────

export function updateLabelColors(colorProvider, forceWhite = false) {
    trackLabels.forEach((label, talkerId) => {
        if (!label.element) return;
        if (forceWhite) {
            label.element.style.color = '#ffffff';
        } else {
            const color = colorProvider(talkerId);
            label.element.style.color = typeof color === 'string' ? color : `#${color.getHexString()}`;
        }
    });
}
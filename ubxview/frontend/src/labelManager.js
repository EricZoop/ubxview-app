// labelManager.js

import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { lookupAircraftModel } from "./statsUI.js";

// REMOVED: const LABEL_Y_OFFSET = 25; 
const trackLabels = new Map(); // talkerId -> CSS2DObject
let sceneGroup = null;

export function initializeLabelManager(group) {
    sceneGroup = group;
}

export function clearTrackLabels() {
    trackLabels.forEach((label) => {
        if (label.parent) label.parent.remove(label);
        if (label.element?.parentNode) label.element.parentNode.removeChild(label.element);
    });
    trackLabels.clear();
}

export function createOrUpdateLabels(pointsByTalker, gpsToCartesian) {
    if (!sceneGroup || !gpsToCartesian) return;

    // Remove labels whose track no longer exists
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
        
        // REMOVED: pos.y += LABEL_Y_OFFSET; 
        // We now rely on CSS to handle the offset visually.

        let label = trackLabels.get(talkerId);
        
        // Create if doesn't exist
        if (!label) {
            const div = document.createElement("div");
            div.className = "track-label";
            div.setAttribute("data-track-label-id", talkerId);
            div.style.cssText = `
                /* FIXED PIXEL OFFSET: Moves label up regardless of zoom level */
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
            trackLabels.set(talkerId, label);
            sceneGroup.add(label);
        }

        // Update Text Content (Model Lookup)
        const isAdsb = lastPt.dataType === "adsb";
        let labelText = `Rover ${talkerId}`;

        if (isAdsb) {
            const model = lookupAircraftModel(talkerId);
            if (model && model !== 'Unknown' && model !== 'Unknown Model') {
                labelText = model;
            } else {
                labelText = `Aircraft ${talkerId}`;
            }
        }
        
        if (label.element.textContent !== labelText) {
            label.element.textContent = labelText;
        }

        // Update Position
        label.position.copy(pos);
    }
}

/**
 * Efficiently update positions without regenerating DOM elements.
 * Called from animation loop.
 */
export function updateLabelPositions(masterGpsPoints, gpsToCartesian) {
    if (!gpsToCartesian || trackLabels.size === 0) return;

    const lastPoints = new Map();
    for (let i = masterGpsPoints.length - 1; i >= 0; i--) {
        const p = masterGpsPoints[i];
        const t = p.talkerId || "default";
        if (!lastPoints.has(t)) {
            lastPoints.set(t, p);
        }
    }

    trackLabels.forEach((label, talkerId) => {
        const last = lastPoints.get(talkerId);
        if (last) {
            const pos = gpsToCartesian(last.lat, last.lon, last.alt);
            // REMOVED: pos.y += LABEL_Y_OFFSET;
            label.position.copy(pos);
        }
    });
}

export function updateLabelColors(colorProvider, forceWhite = false) {
    trackLabels.forEach((label, talkerId) => {
        if (!label.element) return;
        if (forceWhite) {
            label.element.style.color = '#ffffff';
        } else {
            const color = colorProvider(talkerId);
            const hex = typeof color === 'string' ? color : `#${color.getHexString()}`;
            label.element.style.color = hex;
        }
    });
}
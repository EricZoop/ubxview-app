import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

const SVG_TICK_SMALL = `
<svg width="2" height="10" viewBox="0 0 2 10" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="10" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="10" stroke="currentColor" stroke-width="1"/>
</svg>`;

const SVG_TICK_MEDIUM = `
<svg width="2" height="15" viewBox="0 0 2 15" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="15" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="15" stroke="currentColor" stroke-width="1.5"/>
</svg>`;

const SVG_TICK_LARGE = `
<svg width="2" height="20" viewBox="0 0 2 20" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="20" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" stroke-width="2"/>
</svg>`;

let compassLabels = {};
let compassTicks = [];

const createCompassElement = (scene, className, { text, svg }) => {
    const div = document.createElement("div");
    div.className = `compass-label ${className}`;
    let content = '';
    if (svg) content += svg;
    if (text) content += `<span class="compass-text">${text}</span>`;
    div.innerHTML = content;
    const label = new CSS2DObject(div);
    scene.add(label);
    return label;
};

export function createCompassLabels(scene) {
    Object.values(compassLabels).forEach(label => label.parent?.remove(label));
    compassTicks.forEach(tick => tick.label.parent?.remove(tick.label));
    compassLabels = {};
    compassTicks = [];

    compassLabels.n = createCompassElement(scene, "compass-cardinal", { text: "N" });
    compassLabels.s = createCompassElement(scene, "compass-cardinal", { text: "S" });
    compassLabels.e = createCompassElement(scene, "compass-cardinal", { text: "E" });
    compassLabels.w = createCompassElement(scene, "compass-cardinal", { text: "W" });

    const horizonDistance = 100000;
    for (let angle = 0; angle < 360; angle += 5) {
        if (angle % 90 === 0) continue;
        let options, className;
        if (angle % 45 === 0) {
            className = "compass-tick-large";
            options = { svg: SVG_TICK_LARGE };
        } else if (angle % 15 === 0) {
            className = "compass-tick-medium";
            options = { svg: SVG_TICK_MEDIUM };
        } else {
            className = "compass-tick-small";
            options = { svg: SVG_TICK_SMALL };
        }
        const label = createCompassElement(scene, className, options);
        const angleRad = (angle - 90) * (Math.PI / 180);
        const relativePos = new THREE.Vector3(
            horizonDistance * Math.cos(angleRad), 0, horizonDistance * Math.sin(angleRad)
        );
        compassTicks.push({ label, relativePos });
    }
}

/**
 * Remove all compass labels and ticks from the scene.
 */
export function removeCompassLabels() {
    Object.values(compassLabels).forEach(label => {
        if (label.parent) label.parent.remove(label);
        if (label.element?.parentNode) label.element.parentNode.removeChild(label.element);
    });
    compassTicks.forEach(tick => {
        if (tick.label.parent) tick.label.parent.remove(tick.label);
        if (tick.label.element?.parentNode) tick.label.element.parentNode.removeChild(tick.label.element);
    });
    compassLabels = {};
    compassTicks = [];
}

export function updateCompass(camera) {
    if (Object.keys(compassLabels).length === 0) return;
    const horizonDistance = 100000;
    const cameraGroundPos = new THREE.Vector3(camera.position.x, 0, camera.position.z);
    compassLabels.n.position.copy(cameraGroundPos).add(new THREE.Vector3(0, 0, -horizonDistance));
    compassLabels.s.position.copy(cameraGroundPos).add(new THREE.Vector3(0, 0, horizonDistance));
    compassLabels.e.position.copy(cameraGroundPos).add(new THREE.Vector3(horizonDistance, 0, 0));
    compassLabels.w.position.copy(cameraGroundPos).add(new THREE.Vector3(-horizonDistance, 0, 0));
    compassTicks.forEach(tick => {
        tick.label.position.copy(cameraGroundPos).add(tick.relativePos);
    });
}
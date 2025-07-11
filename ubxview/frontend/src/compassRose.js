import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// SVG definitions for compass ticks
const SVG_TICK_SMALL = `<svg width="2" height="10" viewBox="0 0 2 10" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="0" x2="1" y2="10" stroke="currentColor" stroke-width="1"/></svg>`;
const SVG_TICK_MEDIUM = `<svg width="2" height="15" viewBox="0 0 2 15" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="0" x2="1" y2="15" stroke="currentColor" stroke-width="1.5"/></svg>`;
const SVG_TICK_LARGE = `<svg width="2" height="20" viewBox="0 0 2 20" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" stroke-width="2"/></svg>`;

// Module-level variables to store labels and ticks
let compassLabels = {};
let compassTicks = [];

/**
 * Helper function to create a single CSS2D element with optional SVG and text.
 * @param {THREE.Scene} scene - The scene to add the label to.
 * @param {string} className - The CSS class for styling.
 * @param {object} options - The content for the label.
 * @param {string} [options.text] - The text content.
 * @param {string} [options.svg] - The SVG content.
 * @returns {CSS2DObject} The created label.
 */
const createCompassElement = (scene, className, { text, svg }) => {
    const div = document.createElement("div");
    div.className = `compass-label ${className}`;

    let content = '';
    if (svg) {
        content += svg;
    }
    if (text) {
        content += `<span class="compass-text">${text}</span>`;
    }
    div.innerHTML = content;

    const label = new CSS2DObject(div);
    scene.add(label);
    return label;
};

/**
 * Creates N, S, E, W labels and degree ticks, adding them to the scene.
 * This function also handles the removal of any pre-existing elements.
 * @param {THREE.Scene} scene - The scene object to which the elements will be added.
 */
export function createCompassLabels(scene) {
    // Safely remove any existing labels and ticks
    Object.values(compassLabels).forEach(label => label.parent?.remove(label));
    compassTicks.forEach(tick => tick.label.parent?.remove(tick.label));

    compassLabels = {};
    compassTicks = [];

    // Create and store each cardinal compass label.
    compassLabels.n = createCompassElement(scene, "compass-cardinal", { text: "N" });
    compassLabels.s = createCompassElement(scene, "compass-cardinal", { text: "S" });
    compassLabels.e = createCompassElement(scene, "compass-cardinal", { text: "E" });
    compassLabels.w = createCompassElement(scene, "compass-cardinal", { text: "W" });

    // Create degree markings
    const horizonDistance = 100000; // Must match the distance in updateCompass
    for (let angle = 0; angle < 360; angle += 5) {
        if (angle % 90 === 0) continue; // Skip cardinal directions

        let options;
        let className;

        if (angle % 45 === 0) {
            className = "compass-tick-large";
            options = { svg: SVG_TICK_LARGE }; // No text
        } else if (angle % 15 === 0) {
            className = "compass-tick-medium";
            options = { svg: SVG_TICK_MEDIUM };
        } else {
            className = "compass-tick-small";
            options = { svg: SVG_TICK_SMALL };
        }

        const label = createCompassElement(scene, className, options);

        // Calculate position on the compass circle
        const angleRad = (angle - 90) * (Math.PI / 180);
        const relativePos = new THREE.Vector3(
            horizonDistance * Math.cos(angleRad),
            0,
            horizonDistance * Math.sin(angleRad)
        );

        // Store the label and its relative position for the update loop
        compassTicks.push({ label, relativePos });
    }
}

/**
 * Updates the position of the compass labels and ticks to align with the camera's ground position.
 * @param {THREE.Camera} camera - The camera used in the scene.
 */
export function updateCompass(camera) {
    if (Object.keys(compassLabels).length === 0) {
        return;
    }

    const horizonDistance = 100000;
    const cameraGroundPos = new THREE.Vector3(camera.position.x, 0, camera.position.z);

    // Update cardinal label positions
    compassLabels.n.position.copy(cameraGroundPos).add(new THREE.Vector3(0, 0, -horizonDistance));
    compassLabels.s.position.copy(cameraGroundPos).add(new THREE.Vector3(0, 0, horizonDistance));
    compassLabels.e.position.copy(cameraGroundPos).add(new THREE.Vector3(horizonDistance, 0, 0));
    compassLabels.w.position.copy(cameraGroundPos).add(new THREE.Vector3(-horizonDistance, 0, 0));

    // Update tick positions
    compassTicks.forEach(tick => {
        tick.label.position.copy(cameraGroundPos).add(tick.relativePos);
    });
}

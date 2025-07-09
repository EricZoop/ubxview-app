import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// Module-level variable to store the labels for access by both functions.
let compassLabels = {};

/**
 * Creates N, S, E, W labels and adds them to the scene.
 * This function also handles the removal of any pre-existing labels.
 * @param {THREE.Scene} scene - The scene object to which the labels will be added.
 */
export function createCompassLabels(scene) {
    // Safely remove any existing labels before creating new ones.
    Object.values(compassLabels).forEach(label => {
        if (label && label.parent) {
            label.parent.remove(label);
        }
    });

    compassLabels = {}; // Reset the tracking object.

    // Helper function to create a single label.
    const createLabel = (text) => {
        const div = document.createElement("div");
        div.className = "compass-label"; // Ensure this class is styled in your CSS.
        div.textContent = text;
        const label = new CSS2DObject(div);
        scene.add(label);
        return label;
    };

    // Create and store each compass label.
    compassLabels.n = createLabel("N");
    compassLabels.s = createLabel("S");
    compassLabels.e = createLabel("E");
    compassLabels.w = createLabel("W");
}

/**
 * Updates the position of the compass labels to align with the camera's ground position.
 * @param {THREE.Camera} camera - The camera used in the scene.
 */
export function updateCompass(camera) {
    // Exit if labels haven't been created yet to prevent errors.
    if (Object.keys(compassLabels).length === 0) {
        return;
    }

    const horizonDistance = 40000;
    // Use the camera's X and Z position, but keep Y at 0 to stay on the ground plane.
    const cameraGroundPos = new THREE.Vector3(camera.position.x, 0, camera.position.z);

    // Update label positions to be relative to the camera on the horizon.
    compassLabels.n.position.copy(cameraGroundPos).add(new THREE.Vector3(0, 0, -horizonDistance));
    compassLabels.s.position.copy(cameraGroundPos).add(new THREE.Vector3(0, 0, horizonDistance));
    compassLabels.e.position.copy(cameraGroundPos).add(new THREE.Vector3(horizonDistance, 0, 0));
    compassLabels.w.position.copy(cameraGroundPos).add(new THREE.Vector3(-horizonDistance, 0, 0));
}
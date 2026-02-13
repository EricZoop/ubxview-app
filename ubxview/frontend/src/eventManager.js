import { onWindowResize, getSceneObjects } from './sceneManager.js';
import { setupTrailControlListeners } from './trailControls.js';
import { setupFileManagerListeners } from './fileManager.js';
import { fetchAndDisplayTiles, updateMapOpacity } from './tileManager.js';
import { initializeUI } from './uiManager.js';

// Grid mesh reference for opacity-based toggling
let gridMesh = null;

/**
 * Find the grid mesh in the scene by its ShaderMaterial uniform signature.
 */
function findGridInScene(scene) {
    let found = null;
    scene.traverse(child => {
        if (child.material?.uniforms?.uGridColor) found = child;
    });
    return found;
}

/**
 * Toggle grid visibility based on map opacity threshold.
 * Below 0.51: hide grid for a clean 3D truth-space look.
 */
function updateEnvironmentVisibility(opacity) {
    if (gridMesh) {
        gridMesh.visible = opacity >= 0.51;
    }
}

/**
 * Setup all application event listeners.
 */
export function initializeEventListeners() {
    const { scene, controls, dataGroup, axesHelper } = getSceneObjects();

    // Cache grid reference
    gridMesh = findGridInScene(scene);

    // Browser events
    window.addEventListener('resize', onWindowResize);

    // File loaded event
    window.addEventListener('fileLoaded', (event) => {
        const plotMetadata = event.detail;
        if (plotMetadata) {
            if (axesHelper) scene.remove(axesHelper);
            controls.reset(plotMetadata.dataSpan, plotMetadata.firstPointVec);
            fetchAndDisplayTiles();
        }
    });

    // Opacity slider → tile opacity + grid visibility
    const opacitySlider = document.getElementById('opacitySlider');
    if (opacitySlider) {
        opacitySlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            updateMapOpacity(val);
            updateEnvironmentVisibility(val);

            const tooltip = document.getElementById('opacityTooltip');
            if (tooltip) tooltip.textContent = val.toFixed(1);
        });
    }

    // Module listeners
    setupTrailControlListeners();
    setupFileManagerListeners();
    initializeUI();
}
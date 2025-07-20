import { onWindowResize, getSceneObjects } from './sceneManager.js';
import { setupTrailControlListeners } from './trailControls.js';
import { setupFileManagerListeners } from './fileManager.js';
import { createCompassLabels } from './compassRose.js';
import { fetchAndDisplayTiles } from './tileManager.js';
import { initializeUI } from './uiManager.js';

/**
 * Setup all application event listeners.
 */
export function initializeEventListeners() {
    // Get all necessary scene objects at once
    const { scene, controls, dataGroup, axesHelper } = getSceneObjects();

    // Browser and System Events
    window.addEventListener('resize', onWindowResize);
    
    // Custom Application Events
    window.addEventListener('fileLoaded', (event) => {
        const plotMetadata = event.detail;
        if (plotMetadata) {
            // Remove the initial axes helper as it's no longer needed
            if (axesHelper) {
                scene.remove(axesHelper);
            }
            
            // Reset camera and add new compass
            controls.reset(plotMetadata.dataSpan, plotMetadata.firstPointVec);
            createCompassLabels(dataGroup);
            fetchAndDisplayTiles();
        }
    });

    // Initialize listeners from other modules
    setupTrailControlListeners();
    setupFileManagerListeners();
    initializeUI(); // Setup all UI component listeners
}
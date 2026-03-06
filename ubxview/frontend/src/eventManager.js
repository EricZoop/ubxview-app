import { onWindowResize, getSceneObjects, removeStartupHelpers } from './sceneManager.js';
import { setupTrailControlListeners } from './trailControls.js';
import { setupFileManagerListeners } from './fileManager.js';
import { removeCompassLabels } from './compassRose.js';
import { fetchAndDisplayTiles } from './tileManager.js';
import { initializeUI } from './uiManager.js';
import { setupObjectManagerListeners, refreshObjectPositions } from './objectManager.js';

let startupHelpersRemoved = false;

export function initializeEventListeners() {
    const { controls } = getSceneObjects();

    window.addEventListener('resize', onWindowResize);

    window.addEventListener('fileLoaded', (event) => {
        const plotMetadata = event.detail;
        if (plotMetadata) {
            // Remove grid, axes, and compass on first file load
            if (!startupHelpersRemoved) {
                removeStartupHelpers();
                removeCompassLabels();
                startupHelpersRemoved = true;
            }

            controls.reset(plotMetadata.dataSpan, plotMetadata.firstPointVec);
            fetchAndDisplayTiles();
            refreshObjectPositions();
        }
    });

    setupObjectManagerListeners();
    setupTrailControlListeners();
    setupFileManagerListeners();
    initializeUI();
}
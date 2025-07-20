import { initializeScene, getSceneObjects } from './sceneManager.js';
import { initializeEventListeners } from './eventManager.js';
import { initializePlotManager } from './plotManager.js';

/**
 * Initialize the entire application.
 */
function initializeApplication() {
    // 1. Setup the core 3D scene and get references to key objects
    initializeScene();
    const { scene, dataGroup } = getSceneObjects();

    // 2. Initialize managers that require scene objects
    initializePlotManager(dataGroup);

    // 3. Setup all event listeners, which may depend on other modules
    initializeEventListeners();
    
    console.log("Application initialized successfully");
}

// Start the application
initializeApplication();
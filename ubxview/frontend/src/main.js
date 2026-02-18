/**
 * Initialize the entire application.
 */
async function initializeApplication() {

    // Dynamically load modules (code-splitting friendly)
    const sceneModule = await import('./sceneManager.js');
    const eventModule = await import('./eventManager.js');
    const plotModule  = await import('./plotManager.js');

    // 1. Setup the core 3D scene
    sceneModule.initializeScene();
    const { scene, dataGroup } = sceneModule.getSceneObjects();

    // 2. Initialize managers that require scene objects
    plotModule.initializePlotManager(dataGroup);

    // 3. Setup all event listeners
    eventModule.initializeEventListeners();

    console.log("Application initialized successfully");
}

// Start the application
initializeApplication();
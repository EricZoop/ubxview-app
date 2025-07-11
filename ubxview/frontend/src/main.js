import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// Module imports
import { setupTrailControlListeners, resetTrailControls } from "./trailControls.js";
import { initializePlotManager, getGpsToCartesian } from "./plotManager.js";
import { setupFileManagerListeners } from "./fileManager.js";

// Existing imports
import { addImagePlane } from "./imagePlane.js";
import { setupCameraControls } from "./cameraControls.js";
import { createGrid } from "./gridSetup.js";
import { createCompassLabels, updateCompass } from "./compassRose.js";
import { planeDefinitions } from "./planeData.js";

// Global Three.js variables
let scene, camera, renderer, labelRenderer, controls, axesHelper;
const dataGroup = new THREE.Group();

// Image plane management
const imagePlanes = [];
let imagePlaneCount = 0;

/**
 * Initialize the Three.js scene
 */
function initializeScene() {
    // Basic Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.add(dataGroup);

    // Camera
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        100000
    );

    // Renderers
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = true;
    document.body.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(labelRenderer.domElement);

    // Camera Controls
    controls = setupCameraControls(camera);
    controls.updateCameraPosition();

    // Lights
    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 100, 50);
    scene.add(directionalLight);

    // Grid and Axes
    createGrid(scene);
    axesHelper = new THREE.AxesHelper(100);
    axesHelper.rotation.y = Math.PI / 2;
    axesHelper.position.y = 2;
    scene.add(axesHelper);

    // Compass
    createCompassLabels(scene);

    // Initialize modules
    initializePlotManager(dataGroup);

    // Event Listeners
    setupEventListeners();
    
    // Start animation loop
    animate();
    
    console.log("Stage initialized. Waiting for data file.");
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Window resize
    window.addEventListener("resize", onWindowResize);
    
    // File loaded event (custom event from fileManager)
    window.addEventListener("fileLoaded", (event) => {
        const plotMetadata = event.detail;
        if (plotMetadata) {
            // Remove axes helper
            if (axesHelper) {
                scene.remove(axesHelper);
            }

            // Update camera position
            controls.reset(plotMetadata.dataSpan, plotMetadata.firstPointVec);
            
            // Add compass labels to data group
            createCompassLabels(dataGroup);
            
            // Add image planes
            addImagePlanes();
        }
    });

    // Opacity slider
    const opacitySlider = document.getElementById("opacitySlider");
    if (opacitySlider) {
        opacitySlider.addEventListener("input", (e) => {
            const value = parseFloat(e.target.value);
            console.log(`Setting opacity to ${value} for ${imagePlanes.length} planes`);
            
            imagePlanes.forEach((plane) => {
                if (plane && plane.material) {
                    plane.material.opacity = value;
                    plane.material.needsUpdate = true;
                }
            });
        });
    }

    // Setup module listeners
    setupTrailControlListeners();
    setupFileManagerListeners();
}

/**
 * Add image planes to the scene
 */
async function addImagePlanes() {
    const gpsToCartesian = getGpsToCartesian();
    if (!gpsToCartesian) return;

    // Clear existing planes
    clearImagePlanes();

    // Get current opacity value
    const opacitySlider = document.getElementById("opacitySlider");
    const currentOpacity = opacitySlider ? parseFloat(opacitySlider.value) : 1.0;

    // Create image planes
    const planePromises = planeDefinitions.map((def, index) => {
        return addImagePlane(
            def.coords.topLeft,
            def.coords.bottomRight,
            def.imageUrl,
            gpsToCartesian,
            dataGroup,
            index,
            currentOpacity
        );
    });

    try {
        const planes = await Promise.all(planePromises);
        imagePlanes.push(...planes);
        console.log(`Added ${planes.length} image planes with opacity ${currentOpacity}`);
    } catch (error) {
        console.error("Error adding image planes:", error);
    }
}

/**
 * Clear all image planes
 */
function clearImagePlanes() {
    imagePlanes.forEach(plane => {
        if (plane && plane.parent) {
            plane.parent.remove(plane);
            if (plane.geometry) plane.geometry.dispose();
            if (plane.material) {
                if (plane.material.map) plane.material.map.dispose();
                plane.material.dispose();
            }
        }
    });
    imagePlanes.length = 0;
}

/**
 * Animation loop
 */
function animate() {
    requestAnimationFrame(animate);

    // Update controls and compass
    controls.update();
    updateCompass(camera);

    // Render the scene
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

/**
 * Handle window resize
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Initialize the application
 */
function initializeApplication() {
    initializeScene();
    console.log("Application initialized successfully");
}

// Start the application
initializeApplication();
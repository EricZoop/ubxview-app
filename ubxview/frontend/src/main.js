import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// Module imports
import { setupTrailControlListeners, resetTrailControls } from "./trailControls.js";
import { initializePlotManager, getGpsToCartesian, getLatestPoint } from "./plotManager.js";
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

    // Camera with extended render distance
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        500000 // Increased from 100,000 to 1,000,000
    );

    // Renderers with enhanced settings
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance", // Use dedicated GPU if available
        precision: "highp" // Use high precision for better rendering at distance
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = true;
    
    // Enable logarithmic depth buffer for better depth precision at long distances
    renderer.logarithmicDepthBuffer = true;
    
    // Set pixel ratio for better quality on high-DPI displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
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

    // Lights with extended range
    scene.add(new THREE.AmbientLight(0xffccaa, 0.2));

    const sunsetLight = new THREE.DirectionalLight(0xff8844, 1.5);
    sunsetLight.position.set(-50, 30, -50);
    sunsetLight.castShadow = true;
    
    // Extend shadow camera for better shadows at distance
    if (sunsetLight.shadow) {
        sunsetLight.shadow.camera.near = 0.1;
        sunsetLight.shadow.camera.far = 500000;
        sunsetLight.shadow.camera.left = -10000;
        sunsetLight.shadow.camera.right = 10000;
        sunsetLight.shadow.camera.top = 10000;
        sunsetLight.shadow.camera.bottom = -10000;
    }
    
    scene.add(sunsetLight);

    // Grid and Axes
    createGrid(scene);
    axesHelper = new THREE.AxesHelper(100);
    axesHelper.rotation.y = Math.PI / 2;
    axesHelper.position.y = 1;
    scene.add(axesHelper);

    // Compass
    createCompassLabels(scene);

    // Initialize modules
    initializePlotManager(dataGroup);

    // Event Listeners
    setupEventListeners();
    
    // Start animation loop
    animate();
    
    console.log("Stage initialized with extended render distance. Waiting for data file.");
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

            // Update camera position with extended far plane if needed
            const dataSpan = plotMetadata.dataSpan;
            const maxDistance = Math.max(dataSpan.x, dataSpan.y, dataSpan.z) * 10; // 10x buffer
            
            // Dynamically adjust camera far plane based on data size
            if (maxDistance > camera.far * 0.8) {
                camera.far = maxDistance;
                camera.updateProjectionMatrix();
                console.log(`Extended camera far plane to ${camera.far} based on data span`);
            }
            
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
 * Add image planes to the scene with enhanced settings
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
        
        // Enhance plane materials for better distance rendering
        planes.forEach(plane => {
            if (plane && plane.material) {
                // Disable depth test if planes are z-fighting
                // plane.material.depthTest = false;
                
                // Ensure materials are updated
                plane.material.needsUpdate = true;
                
                // Set render order to help with sorting
                plane.renderOrder = 1;
                
                // Enable frustum culling
                plane.frustumCulled = true;
            }
        });
        
        imagePlanes.push(...planes);
        console.log(`Added ${planes.length} image planes with enhanced distance rendering`);
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
 * Animation loop with performance monitoring
 */
function animate() {
    requestAnimationFrame(animate);

    // If cinematic mode is active, update the target
    if (controls.isCinematicActive()) {
        const latestPoint = getLatestPoint(); // Assumes getLatestPoint() returns a THREE.Vector3 or null

        if (latestPoint) {
            controls.setCinematicTarget(latestPoint);
        }
    }

    // Update controls and compass
    controls.update();
    updateCompass(camera);

    // Optional: Log camera distance for debugging
    if (controls.object) {
        const distance = controls.object.position.length();
        if (distance > camera.far * 0.9) {
            console.warn(`Camera approaching far plane limit. Distance: ${distance.toFixed(2)}, Far: ${camera.far}`);
        }
    }

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
    console.log("Application initialized successfully with enhanced render distance");
}

// Start the application
initializeApplication();
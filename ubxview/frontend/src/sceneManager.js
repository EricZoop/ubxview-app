import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { setupCameraControls } from "./cameraControls.js";
import { createGrid } from "./gridSetup.js";
import { getLatestPoint } from "./plotManager.js";

// Module-level variables for scene components
let scene, camera, renderer, labelRenderer, controls, dataGroup, tileGroup, axesHelper;

/**
 * Initialize the Three.js scene, camera, renderers, and controls.
 */
export function initializeScene() {
    // Scene and Groups
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    dataGroup = new THREE.Group();
    tileGroup = new THREE.Group();
    scene.add(dataGroup);
    dataGroup.add(tileGroup);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500000);
    camera.position.set(610, 610, 610);
    
    // Renderers
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(labelRenderer.domElement);

    // Controls and Lights - FIXED: Pass renderer.domElement for event handling
    // MODIFIED: This was the line causing the issue.
    controls = setupCameraControls(camera, renderer.domElement);
    
    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 100, 50);
    scene.add(directionalLight);

    // Helpers
    axesHelper = new THREE.AxesHelper(100);
    axesHelper.position.y = 0.1; // Position slightly above the grid
    scene.add(axesHelper);
    
    // Set camera to look at the center of the axes helper
    camera.lookAt(axesHelper.position);

    createGrid(scene);

    // Start Animation
    animate();
    
    console.log("Scene initialized. Waiting for data file.");
}

/**
 * Provides access to core scene objects for other modules.
 */
export function getSceneObjects() {
    return { scene, camera, renderer, labelRenderer, controls, dataGroup, tileGroup, axesHelper };
}

/**
 * Animation loop
 */
function animate() {
    requestAnimationFrame(animate);

    if (controls.isCinematicActive && controls.isCinematicActive()) {
        const targetTalkerId = controls.getTargetTalkerId();
        const latestPoint = getLatestPoint(targetTalkerId);
        if (latestPoint) {
            controls.setCinematicTarget(latestPoint);
        }
    }

    controls.update();
    
    const currentCamera = controls.getCurrentCamera();
    renderer.render(scene, currentCamera);
    labelRenderer.render(scene, currentCamera);
}

/**
 * Handle window resize
 */
export function onWindowResize() {
    if (camera && renderer) {
        // Update perspective camera
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }
}
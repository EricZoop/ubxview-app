import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { setupCameraControls } from "./cameraControls.js";
import { createGrid } from "./gridSetup.js";
import { createCompassLabels, updateCompass } from "./compassRose.js";
import { getLatestPoint } from "./plotManager.js";

let scene, camera, renderer, labelRenderer, controls, dataGroup, tileGroup, axesHelper;
let gridMesh = null;

export function initializeScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    dataGroup = new THREE.Group();
    tileGroup = new THREE.Group();
    scene.add(dataGroup);
    dataGroup.add(tileGroup);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000000);
    camera.position.set(610, 610, 610);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(labelRenderer.domElement);

    controls = setupCameraControls(camera, renderer.domElement);

    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 100, 50);
    scene.add(directionalLight);

    axesHelper = new THREE.AxesHelper(100);
    axesHelper.position.y = 0.1;
    scene.add(axesHelper);
    camera.lookAt(axesHelper.position);

    // createGrid returns a THREE.Mesh with ShaderMaterial
    gridMesh = createGrid(scene);
    createCompassLabels(scene);

    animate();
    console.log("Scene initialized. Waiting for data file.");
}

export function getSceneObjects() {
    return { scene, camera, renderer, labelRenderer, controls, dataGroup, tileGroup, axesHelper };
}

/**
 * Remove startup helpers (grid, axes) from the scene.
 * Called once when the first data file is loaded.
 */
export function removeStartupHelpers() {
    if (axesHelper) {
        scene.remove(axesHelper);
        if (axesHelper.geometry) axesHelper.geometry.dispose();
        if (axesHelper.material) {
            if (Array.isArray(axesHelper.material)) {
                axesHelper.material.forEach(m => m.dispose());
            } else {
                axesHelper.material.dispose();
            }
        }
        axesHelper = null;
    }

    if (gridMesh) {
        scene.remove(gridMesh);
        if (gridMesh.geometry) gridMesh.geometry.dispose();
        if (gridMesh.material) gridMesh.material.dispose();
        gridMesh = null;
    }
}

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
    updateCompass(currentCamera);
    renderer.render(scene, currentCamera);
    labelRenderer.render(scene, currentCamera);
}

export function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }
}
import * as THREE from "three";
import imageUrl from './SenecaMeadows.png';

import {
    CSS2DRenderer
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { extractGpsPointsFromText } from "./parser.js";
import { addImagePlane } from "./imagePlane.js";
import { setupCameraControls } from "./cameraControls.js";
import { createGrid } from "./gridSetup.js";
import { createCompassLabels, updateCompass } from "./compassRose.js";

let currentFile = null;
let readOffset = 0;
let fileWatcherInterval = null;
const POLLING_RATE_MS = 1; // Check for new data every 1 second

// --- Global Three.js variables ---
let scene, camera, renderer, labelRenderer, controls;
const dataGroup = new THREE.Group(); // Group to hold all data-related objects

let center = null; // To store the center of the dataset
let bounds = null; // To store the data bounds
let gpsToCartesian = null; // To store the coordinate conversion function

/**
 * Initializes the entire Three.js scene, controls, and grid.
 */
function initializeScene() {
    // --- Basic Scene Setup ---
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.add(dataGroup);

    // --- Camera ---
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100000
    );

    // --- Renderers ---
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(labelRenderer.domElement);

    // --- Camera Controls ---
    controls = setupCameraControls(camera);
    controls.updateCameraPosition(); // Set initial camera position

    // --- Lights, Grid, Axes, Compass ---
    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 50);
    scene.add(directionalLight);
    createGrid(scene);
    const axesHelper = new THREE.AxesHelper(100);
    axesHelper.rotation.y = Math.PI / 2;
    scene.add(axesHelper);
    createCompassLabels(scene);

    // --- Event Listeners & Animation ---
    window.addEventListener("resize", onWindowResize);
    animate();
    console.log("Stage initialized. Waiting for data file.");
}

/**
 * Plots GPS points. Can either create a new plot or append to an existing one.
 * @param {Array} points - Array of {lat, lon, alt} objects.
 * @param {boolean} [append=false] - If true, adds points to the existing plot.
 */
function plotData(points, append = false) {
    if (append) {
        // --- APPEND LOGIC ---
        if (!points || points.length === 0) return;
        const pointsObject = dataGroup.children.find(c => c instanceof THREE.Points);
        // If there's no data to append to, run a full plot instead.
        if (!pointsObject || !gpsToCartesian) {
            plotData(points, false);
            return;
        }

        // Update bounds with new data
        points.forEach(p => {
            bounds.minAlt = Math.min(bounds.minAlt, p.alt);
            bounds.maxAlt = Math.max(bounds.maxAlt, p.alt);
        });

        // Convert new points using the *existing* coordinate system
        const newPositions = [];
        const newColors = [];
        points.forEach((p) => {
            const pos = gpsToCartesian(p.lat, p.lon, p.alt);
            newPositions.push(pos.x, pos.y, pos.z);
            const altRatio = (p.alt - bounds.minAlt) / (bounds.maxAlt - bounds.minAlt) || 0;
            const color = new THREE.Color().setHSL(0.7 - altRatio * 0.7, 1.0, 0.8);
            newColors.push(color.r, color.g, color.b);
        });
        
        // Get old geometry data
        const geometry = pointsObject.geometry; // Use a shorter variable name
        const oldPositions = geometry.attributes.position.array;
        const oldColors = geometry.attributes.color.array;

        // Create new, larger buffers and combine the old and new data
        const combinedPositions = new Float32Array(oldPositions.length + newPositions.length);
        combinedPositions.set(oldPositions);
        combinedPositions.set(newPositions, oldPositions.length);

        const combinedColors = new Float32Array(oldColors.length + newColors.length);
        combinedColors.set(oldColors);
        combinedColors.set(newColors, oldColors.length);
        
        // Update the geometry attributes with the new, combined data
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(combinedPositions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(combinedColors, 3));

        // ✨ --- KEY FIX: NOTIFY RENDERER OF CHANGES --- ✨
        // Tell Three.js to re-upload the buffer data to the GPU
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;

        // Also update the bounding volumes for visibility and culling
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();


        console.log(`Appended ${points.length} points.`);

    } else {
        // --- FULL RE-PLOT LOGIC (No changes needed here) ---
        // ... (rest of the function is the same)
        while (dataGroup.children.length > 0) {
            const object = dataGroup.children[0];
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
            dataGroup.remove(object);
        }
        
        if (!points || points.length === 0) return;

        // 2. Calculate Bounds and Center (assigning to global vars)
        bounds = points.reduce(
            (acc, p) => ({
                minLat: Math.min(acc.minLat, p.lat),
                maxLat: Math.max(acc.maxLat, p.lat),
                minLon: Math.min(acc.minLon, p.lon),
                maxLon: Math.max(acc.maxLon, p.lon),
                minAlt: Math.min(acc.minAlt, p.alt),
                maxAlt: Math.max(acc.maxAlt, p.alt),
            }), {
                minLat: Infinity, maxLat: -Infinity,
                minLon: Infinity, maxLon: -Infinity,
                minAlt: Infinity, maxAlt: -Infinity,
            }
        );

        center = {
            lat: (bounds.minLat + bounds.maxLat) / 2,
            lon: (bounds.minLon + bounds.maxLon) / 2,
            alt: (bounds.minAlt + bounds.maxAlt) / 2,
        };

        // 3. Coordinate Conversion (assigning to global var)
        gpsToCartesian = (lat, lon, alt) => {
            const centerLatRad = (center.lat * Math.PI) / 180;
            const scaleFactor = 10.0;
            const x = (lon - center.lon) * Math.cos(centerLatRad) * 111320 * scaleFactor;
            const y = (alt - center.alt) * 5;
            const z = (lat - center.lat) * 111320 * scaleFactor;
            return new THREE.Vector3(x, y, -z);
        };

        // 4. Create and Add New Geometries
        const positions = [];
        const colors = [];
        points.forEach((p) => {
            const pos = gpsToCartesian(p.lat, p.lon, p.alt);
            positions.push(pos.x, pos.y, pos.z);
            const altRatio = (p.alt - bounds.minAlt) / (bounds.maxAlt - bounds.minAlt) || 0;
            const color = new THREE.Color().setHSL(0.7 - altRatio * 0.7, 1.0, 0.8);
            colors.push(color.r, color.g, color.b);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        const pointsObject = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({ size: 4, vertexColors: true, sizeAttenuation: false })
        );
        const lineObject = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ color: 0x00ff88 })
        );
        dataGroup.add(pointsObject, lineObject);

        addImagePlane(
            { lat: 39.19765, lon: -77.26297 },
            { lat: 39.19313, lon: -77.25269 },
            imageUrl,
            gpsToCartesian,
            dataGroup
        );

        // 5. Update Compass and Camera
        const dataSpan = Math.max(
            (bounds.maxLat - bounds.minLat) * 111320,
            (bounds.maxLon - bounds.minLon) * 111320
        );
        const centerVec = gpsToCartesian(center.lat, center.lon, center.alt);

        createCompassLabels(dataGroup);
        
        controls.adjustForNewData(dataSpan, centerVec);

        console.log(`Successfully plotted ${points.length} points.`);
    }
}

// --- Animation Loop ---
function animate() {
    updateCompass(camera);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

// --- Window Resize Handler ---
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

async function watchFileForChanges() {
    if (!fileHandle) return;

    const latestFile = await fileHandle.getFile();
    if (latestFile.size <= readOffset) return;

    const fileSlice = latestFile.slice(readOffset);
    const newText = await fileSlice.text();
    readOffset = latestFile.size;

    if (newText.length > 0) {
        const newPoints = extractGpsPointsFromText(newText);
        if (newPoints && newPoints.length > 0) {
            plotData(newPoints, true);
        }
    }
}

let fileHandle = null;

document.getElementById("fileInputLabel").addEventListener("click", async () => {
    try {
        // Prompt user to select a file
        [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'GPS Logs',
                accept: {
                    'text/plain': ['.txt', '.log'],
                    'application/octet-stream': ['.ubx']
                }
            }],
            multiple: false
        });

        if (!fileHandle) return;

        const file = await fileHandle.getFile();
        currentFile = file;
        readOffset = 0;

        const fileLabel = document.getElementById("fileLabel");
        fileLabel.innerHTML = `${file.name} <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path fill="#ffffff" d="M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-112 174.1 0-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39L128 288l0-224zm0 224l0 48L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24l104 0zM512 128l-128 0L384 0 512 128z"/></svg>`;

        const initialText = await file.text();
        const initialPoints = extractGpsPointsFromText(initialText);
        readOffset = file.size;

        if (!initialPoints || initialPoints.length === 0) {
            alert("No valid GPS points found in the file.");
            plotData([]);
            return;
        }

        plotData(initialPoints, false);

        if (fileWatcherInterval) clearInterval(fileWatcherInterval);
        fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
    } catch (err) {
        console.error("File selection cancelled or failed:", err);
    }
});


// --- Start the application ---
initializeScene();
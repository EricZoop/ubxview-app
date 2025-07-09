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

// --- Global Three.js variables ---
let scene, camera, renderer, labelRenderer, controls;
const dataGroup = new THREE.Group(); // Group to hold all data-related objects for easy clearing

// --- Variables for live updates and shared coordinate system ---
let currentFile = null;
let readOffset = 0;
let fileWatcherInterval = null;
const POLLING_RATE_MS = 1000; // Check for new data every 1 second

let center = null; // To store the center of the dataset
let bounds = null; // To store the data bounds (min/max lat, lon, alt)
let gpsToCartesian = null; // To store the coordinate conversion function

/**
 * Initializes the entire Three.js scene, controls, and grid.
 * This runs once on page load.
 */
function initializeScene() {
    // --- Basic Scene Setup ---
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.add(dataGroup); // Add the data container to the scene

    // --- Camera ---
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100000
    );

    // --- Renderers ---
    renderer = new THREE.WebGLRenderer({ antialias: true });
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

    // --- Lights and Grid ---
    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 50);
    scene.add(directionalLight);

    createGrid(scene); // Create the initial ground grid

    // --- Axis Helper & Initial Compass ---
    const axesHelper = new THREE.AxesHelper(100);
    axesHelper.rotation.y = Math.PI / 2; // Rotate 90 degrees around Y-axis
    scene.add(axesHelper); // Visible before data is loaded

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
        const oldGeometry = pointsObject.geometry;
        const oldPositions = oldGeometry.attributes.position.array;
        const oldColors = oldGeometry.attributes.color.array;

        // Create new, larger buffers and combine the old and new data
        const combinedPositions = new Float32Array(oldPositions.length + newPositions.length);
        combinedPositions.set(oldPositions);
        combinedPositions.set(newPositions, oldPositions.length);

        const combinedColors = new Float32Array(oldColors.length + newColors.length);
        combinedColors.set(oldColors);
        combinedColors.set(newColors, oldColors.length);
        
        // Update the geometry attributes with the new, combined data
        oldGeometry.setAttribute('position', new THREE.Float32BufferAttribute(combinedPositions, 3));
        oldGeometry.setAttribute('color', new THREE.Float32BufferAttribute(combinedColors, 3));
        oldGeometry.attributes.position.needsUpdate = true;
        oldGeometry.attributes.color.needsUpdate = true;
        oldGeometry.computeBoundingSphere(); // Important for visibility

        console.log(`Appended ${points.length} points.`);

    } else {
        // --- FULL RE-PLOT LOGIC ---
        // 1. Clear previous data
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

// --- File Input Setup ---

/**
 * Checks for new content in the file and triggers an append operation.
 */
async function watchFileForChanges() {
    if (!currentFile || currentFile.size <= readOffset) {
        return; // No file or file has not grown
    }

    const fileSlice = currentFile.slice(readOffset);
    const newText = await fileSlice.text();
    readOffset = currentFile.size; // Update offset immediately

    if (newText.length > 0) {
        const newPoints = extractGpsPointsFromText(newText);
        if (newPoints && newPoints.length > 0) {
            plotData(newPoints, true); // Call plotData in append mode
        }
    }
}

document
    .getElementById("fileInput")
    .addEventListener("change", async (event) => {
        // Stop any previous file watcher
        if (fileWatcherInterval) {
            clearInterval(fileWatcherInterval);
        }
        
        const file = event.target.files[0];
        if (!file) {
            currentFile = null;
            return;
        }

        currentFile = file;
        readOffset = 0; // Reset for new file

        const fileLabel = document.getElementById("fileLabel");
        fileLabel.innerHTML = file.name;

        // Perform the initial, full plot
        const initialText = await file.text();
        readOffset = currentFile.size;
        const initialPoints = extractGpsPointsFromText(initialText);
        
        if (!initialPoints || initialPoints.length === 0) {
            alert("No valid GPS points found in the file.");
            plotData([]); // Clear the scene
            return;
        }

        plotData(initialPoints, false); // Run a full plot

        // Start polling for live updates
        fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
    });

// --- Start the application ---
initializeScene();
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// --- MODIFICATION: Import both functions from the parser ---
import { extractGpsPointsFromText, updateStats } from "./parser.js";

import { addImagePlane } from "./imagePlane.js";
import { setupCameraControls } from "./cameraControls.js";
import { createGrid } from "./gridSetup.js";
import { createCompassLabels, updateCompass } from "./compassRose.js";

// --- NEW: Import plane definitions from the new module ---
import { planeDefinitions } from "./planeData.js";

let currentFile = null;
let readOffset = 0;
let fileWatcherInterval = null;
let POLLING_RATE_MS = 2000;

let imagePlaneCount = 0; // Add missing variable

// --- Global Three.js variables ---
let scene, camera, renderer, labelRenderer, controls;
const dataGroup = new THREE.Group(); // Group to hold all data-related objects

// --- MODIFICATION: Add state variables for the complete dataset ---
let masterGpsPoints = []; // This will hold ALL points from the file.
let center = null; // To store the center of the dataset
let bounds = null; // To store the data bounds
let gpsToCartesian = null; // To store the coordinate conversion function
let baselineAltitude = null; // NEW: Store the first point's altitude as baseline

function initializeScene() {
  // --- Basic Scene Setup ---
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);
  scene.add(dataGroup);

  // --- Camera ---
  camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
  );

  // --- Renderers ---
  renderer = new THREE.WebGLRenderer({
    antialias: true,
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
  axesHelper.position.y = 2; // Move it up by 2 units
  scene.add(axesHelper);

  createCompassLabels(scene);

  // --- Event Listeners & Animation ---
  window.addEventListener("resize", onWindowResize);
  animate();
  console.log("Stage initialized. Waiting for data file.");
}

const imagePlanes = [];

// --- REFACTORED: This function now uses the imported planeDefinitions ---
async function addImagePlanes() {
  if (!gpsToCartesian) return;

  // Clear existing planes
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

  // Get current opacity value
  const opacitySlider = document.getElementById("opacitySlider");
  const currentOpacity = opacitySlider ? parseFloat(opacitySlider.value) : 1.0;

  // Create promises by mapping over the imported definitions array
  const planePromises = planeDefinitions.map((def, index) => {
    return addImagePlane(
      def.coords.topLeft,
      def.coords.bottomRight,
      def.imageUrl,
      gpsToCartesian,
      dataGroup,
      index, // Use the map index for the plane ID
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
 * Plots GPS points. Can either create a new plot or append to an existing one.
 * @param {Array} points - Array of {lat, lon, alt} objects.
 * @param {boolean} [append=false] - If true, adds points to the existing plot.
 */
function plotData(points, append = false) {
  if (append) {
    // --- APPEND LOGIC ---
    if (!points || points.length === 0) return;
    const pointsObject = dataGroup.children.find(
      (c) => c instanceof THREE.Points
    );
    // If there's no data to append to, run a full plot instead.
    if (!pointsObject || !gpsToCartesian) {
      plotData(points, false);
      return;
    }

    // Update bounds with new data
    points.forEach((p) => {
      bounds.minAlt = Math.min(bounds.minAlt, p.alt);
      bounds.maxAlt = Math.max(bounds.maxAlt, p.alt);
    });

    // Convert new points using the *existing* coordinate system
    const newPositions = [];
    const newColors = [];
    points.forEach((p) => {
      const pos = gpsToCartesian(p.lat, p.lon, p.alt);
      newPositions.push(pos.x, pos.y, pos.z);
      const altRatio =
        (p.alt - bounds.minAlt) / (bounds.maxAlt - bounds.minAlt) || 0;
      const color = new THREE.Color().setHSL(0.7 - altRatio * 0.7, 1.0, 0.8);
      newColors.push(color.r, color.g, color.b);
    });

    // Get old geometry data
    const geometry = pointsObject.geometry; // Use a shorter variable name
    const oldPositions = geometry.attributes.position.array;
    const oldColors = geometry.attributes.color.array;

    // Create new, larger buffers and combine the old and new data
    const combinedPositions = new Float32Array(
      oldPositions.length + newPositions.length
    );
    combinedPositions.set(oldPositions);
    combinedPositions.set(newPositions, oldPositions.length);

    const combinedColors = new Float32Array(
      oldColors.length + newColors.length
    );
    combinedColors.set(oldColors);
    combinedColors.set(newColors, oldColors.length);

    // Update the geometry attributes with the new, combined data
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(combinedPositions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(combinedColors, 3)
    );

    // ✨ --- KEY FIX: NOTIFY RENDERER OF CHANGES --- ✨
    // Tell Three.js to re-upload the buffer data to the GPU
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;

    // Also update the bounding volumes for visibility and culling
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    console.log(`Appended ${points.length} points.`);
  } else {
    // --- FULL RE-PLOT LOGIC ---
    while (dataGroup.children.length > 0) {
      const object = dataGroup.children[0];
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
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
      }),
      {
        minLat: Infinity,
        maxLat: -Infinity,
        minLon: Infinity,
        maxLon: -Infinity,
        minAlt: Infinity,
        maxAlt: -Infinity,
      }
    );

    center = {
      lat: (bounds.minLat + bounds.maxLat) / 2,
      lon: (bounds.minLon + bounds.maxLon) / 2,
      alt: (bounds.minAlt + bounds.maxAlt) / 2,
    };

    // NEW: Set the baseline altitude to the first point's altitude
    baselineAltitude = points[0].alt;

    // 3. MODIFIED: Coordinate Conversion using first point as Y=0 baseline
    gpsToCartesian = (lat, lon, alt) => {
      const centerLatRad = (center.lat * Math.PI) / 180;
      const scaleFactor = 10.0;
      const x =
        (lon - center.lon) * Math.cos(centerLatRad) * 111320 * scaleFactor;
      // NEW: Use baselineAltitude instead of center.alt to make first point y=0
      const y = (alt - baselineAltitude) * 5;
      const z = (lat - center.lat) * 111320 * scaleFactor;
      return new THREE.Vector3(x, y, -z);
    };

    // 4. Create and Add New Geometries
    const positions = [];
    const colors = [];
    points.forEach((p) => {
      const pos = gpsToCartesian(p.lat, p.lon, p.alt);
      positions.push(pos.x, pos.y, pos.z);
      const altRatio =
        (p.alt - bounds.minAlt) / (bounds.maxAlt - bounds.minAlt) || 0;
      const color = new THREE.Color().setHSL(0.7 - altRatio * 0.7, 1.0, 0.8);
      colors.push(color.r, color.g, color.b);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const pointsObject = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 4,
        vertexColors: true,
        sizeAttenuation: false,
      })
    );
    const lineObject = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: 0x00ff88,
      })
    );
    dataGroup.add(pointsObject, lineObject);

    // Add image planes after coordinate system is established
    addImagePlanes();

    // 5. Update Camera to First Data Point (which is now at y=0)
    const dataSpan = Math.max(
      (bounds.maxLat - bounds.minLat) * 111320,
      (bounds.maxLon - bounds.minLon) * 111320
    );

    // Convert first data point to 3D coordinates (now at y=0)
    const firstPoint = points[0];
    const firstPointVec = gpsToCartesian(firstPoint.lat, firstPoint.lon, firstPoint.alt);

    createCompassLabels(dataGroup);

    // Use reset() instead of adjustForNewData() to completely reset camera state
    controls.reset(dataSpan, firstPointVec);

    console.log(`Successfully plotted ${points.length} points. First data point positioned at y=0. Camera positioned at first data point.`);
  }
}

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);

  // 1. UPDATE STATE
  controls.update();
  updateCompass(camera);

  // 2. RENDER THE SCENE
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  renderer.sortObjects = true; // Enable object sorting

}

// --- Window Resize Handler ---
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

// --- MODIFICATION: The file watcher is now simpler and more robust ---
async function watchFileForChanges() {
  if (!fileHandle) return;

  const latestFile = await fileHandle.getFile();
  if (latestFile.size <= readOffset) return; // No new data

  const fileSlice = latestFile.slice(readOffset);
  const newText = await fileSlice.text();
  readOffset = latestFile.size;

  if (newText.length > 0) {
    // 1. Parse ONLY the new text chunk
    const newPoints = extractGpsPointsFromText(newText);

    if (newPoints && newPoints.length > 0) {
      // 2. Add the new points to our master list
      masterGpsPoints.push(...newPoints);

      // 3. Tell the plot function to append the new points visually
      plotData(newPoints, true);

      // 4. Update the stats display using the COMPLETE master list
      updateStats(masterGpsPoints);
    }
  }
}

document.getElementById("updatePollRateBtn").addEventListener("click", () => {
  const input = document.getElementById("pollRateInput");
  const newRate = parseInt(input.value, 10);

  if (!isNaN(newRate)) {
    POLLING_RATE_MS = newRate;

    // If file watching is active, restart it
    if (fileWatcherInterval) {
      clearInterval(fileWatcherInterval);
      fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
      console.log(
        "Polling rate updated and interval restarted:",
        POLLING_RATE_MS
      );
    }
  }
});

let fileHandle = null;

// --- MODIFICATION: The file-open handler now manages the master list ---
document
  .getElementById("fileInputLabel")
  .addEventListener("click", async () => {
    try {
      [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            accept: {
              "text/plain": [".txt", ".log"],
              "application/octet-stream": [".ubx"],
            },
          },
        ],
        multiple: false,
      });

      if (!fileHandle) return;

      const file = await fileHandle.getFile();
      currentFile = file;
      readOffset = 0;
      masterGpsPoints = []; // Clear previous data
      baselineAltitude = null; // Clear previous baseline

      const fileLabel = document.getElementById("fileLabel");
      fileLabel.innerHTML = `${file.name}`;

      const initialText = await file.text();
      // The parser just returns points, which we store in our master list
      masterGpsPoints = extractGpsPointsFromText(initialText);
      readOffset = file.size;

      if (masterGpsPoints.length === 0) {
        alert("No valid GPS points found in the file.");
        plotData([]); // Clear the plot
        updateStats([]); // Clear the stats
        return;
      }

      // Plot the initial data from the master list
      plotData(masterGpsPoints, false);
      // And update the stats using the full master list
      updateStats(masterGpsPoints);

      // Start watching for live changes
      if (fileWatcherInterval) clearInterval(fileWatcherInterval);
      fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
    } catch (err) {
      // Don't show an error if the user just cancelled the dialog
      if (err.name !== "AbortError") {
        console.error("File selection failed:", err);
      }
    }
  });

// --- Start the application ---
initializeScene();

// --- FIXED: Opacity slider event listener ---
document.getElementById("opacitySlider").addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  console.log(`Setting opacity to ${value} for ${imagePlanes.length} planes`);
  
  imagePlanes.forEach((plane) => {
    if (plane && plane.material) {
      plane.material.opacity = value;
      plane.material.needsUpdate = true; // Force material update
    }
  });
});

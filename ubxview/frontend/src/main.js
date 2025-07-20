import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// Module imports
import { setupTrailControlListeners } from "./trailControls.js";
import { initializePlotManager, getGpsToCartesian, getLatestPoint, getBoundingBox } from "./plotManager.js";
import { setupFileManagerListeners } from "./fileManager.js";

// Existing imports
import { setupCameraControls } from "./cameraControls.js";
import { createGrid } from "./gridSetup.js";
import { createCompassLabels, updateCompass } from "./compassRose.js";

// Global Three.js variables
let scene, camera, renderer, labelRenderer, controls, axesHelper;
const dataGroup = new THREE.Group();
const tileGroup = new THREE.Group(); // Group to hold map tiles

let currentOpacity = 0.2; // default starting value

// Tile service configurations
const TILE_SERVICES = {
    satellite: {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        name: "Satellite"
    },
    streetview: {
        url: "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        name: "Street View"
    }
};

let currentTileService = 'satellite'; // Default tile service

/**
 * Initialize the Three.js scene
 */
function initializeScene() {
    
    // Basic Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.add(dataGroup);
    dataGroup.add(tileGroup);

    // Camera
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        500000
    );

    // Renderers
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

    // Camera Controls
    controls = setupCameraControls(camera, renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 100, 50);
    scene.add(directionalLight);

    // Grid and Axes
    createGrid(scene);
    axesHelper = new THREE.AxesHelper(100);
    axesHelper.rotation.y = Math.PI / 2;
    axesHelper.position.y = 1;
    scene.add(axesHelper);

    // Position the camera and aim it at the axesHelper
    camera.position.set(610, 610, 610); // You can adjust this to your liking
    camera.lookAt(axesHelper.position);

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
            if (axesHelper) {
                scene.remove(axesHelper);
            }
            controls.reset(plotMetadata.dataSpan, plotMetadata.firstPointVec);
            createCompassLabels(dataGroup);
            
            // Fetch and display satellite tiles
            fetchAndDisplayTiles();
        }
    });

    // Setup module listeners
    setupTrailControlListeners();
    setupFileManagerListeners();
    
    // Setup slider functionality
    setupSliders();
    
    // Setup tile service toggle buttons
    setupTileServiceToggle();
}

/**
 * Setup tile service toggle functionality
 */
function setupTileServiceToggle() {
    document.querySelectorAll('.view-option').forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('.view-option').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedView = button.dataset.view;
            
            // Only change if it's a different service
            if (selectedView !== currentTileService && TILE_SERVICES[selectedView]) {
                currentTileService = selectedView;
                console.log('Switched to tile service:', TILE_SERVICES[selectedView].name);
                
                // Refresh tiles with new service if data is loaded
                const boundingBox = getBoundingBox();
                if (boundingBox) {
                    fetchAndDisplayTiles();
                }
            }
        });
    });
}

/**
 * Fetches and displays satellite imagery tiles based on the data's bounding box.
 */
async function fetchAndDisplayTiles() {
    const USER_ZOOM_LEVEL = 17;
    // Get TILE_PADDING from the plus-minus selector
    const TILE_PADDING = window.getCurrentRenderDistance ? window.getCurrentRenderDistance() : 17;

    const boundingBox = getBoundingBox();
    const gpsToCartesian = getGpsToCartesian();

    if (!boundingBox || !gpsToCartesian) {
        console.error("Bounding box or GPS conversion function not available.");
        return;
    }

    // Clear previous tiles
    while (tileGroup.children.length > 0) {
        const tile = tileGroup.children[0];
        tileGroup.remove(tile);
        if (tile.geometry) tile.geometry.dispose();
        if (tile.material) {
            if (tile.material.map) tile.material.map.dispose();
            tile.material.dispose();
        }
    }

    const zoomLevel = USER_ZOOM_LEVEL;
    const { minLon, maxLon, minLat, maxLat } = boundingBox;

    const minTileUnpadded = lonLatToTile(minLon, maxLat, zoomLevel);
    const maxTileUnpadded = lonLatToTile(maxLon, minLat, zoomLevel);

    const minTile = {
        x: minTileUnpadded.x - TILE_PADDING,
        y: minTileUnpadded.y - TILE_PADDING
    };
    const maxTile = {
        x: maxTileUnpadded.x + TILE_PADDING,
        y: maxTileUnpadded.y + TILE_PADDING
    };

    // Center tile (roughly center of data)
    const centerTile = {
        x: Math.floor((minTileUnpadded.x + maxTileUnpadded.x) / 2),
        y: Math.floor((minTileUnpadded.y + maxTileUnpadded.y) / 2)
    };

    // Generate all tile coordinates
    const tileCoords = [];
    for (let x = minTile.x; x <= maxTile.x; x++) {
        for (let y = minTile.y; y <= maxTile.y; y++) {
            tileCoords.push({ x, y });
        }
    }

    // Sort tiles by distance to center
    tileCoords.sort((a, b) => {
        const distA = Math.hypot(a.x - centerTile.x, a.y - centerTile.y);
        const distB = Math.hypot(b.x - centerTile.x, b.y - centerTile.y);
        return distA - distB;
    });

    const textureLoader = new THREE.TextureLoader();
    let tilesLoaded = 0;
    let tilesAttempted = 0;

    console.log(`Loading tiles using ${TILE_SERVICES[currentTileService].name} service...`);

    for (const { x, y } of tileCoords) {
        tilesAttempted++;
        try {
            await loadTile(x, y, zoomLevel, textureLoader, gpsToCartesian);
            tilesLoaded++;
        } catch (error) {
            console.warn(`Failed to load tile (${x}, ${y}):`, error.message);
        }
    }

    console.log(`Successfully loaded ${tilesLoaded}/${tilesAttempted} tiles at zoom level ${zoomLevel} using ${TILE_SERVICES[currentTileService].name}`);
}

/**
 * Loads a single tile
 */
async function loadTile(x, y, zoomLevel, textureLoader, gpsToCartesian) {
    // Get the current tile service URL
    const tileServerUrl = TILE_SERVICES[currentTileService].url;
    
    const tileUrl = tileServerUrl
        .replace('{z}', zoomLevel)
        .replace('{y}', y)
        .replace('{x}', x);
    
    // Get the bounds of this specific tile
    const tileBounds = tileToLonLat(x, y, zoomLevel);
    const nextTileBounds = tileToLonLat(x + 1, y + 1, zoomLevel);

    // Calculate the four corners of the tile
    const topLeft = { lat: tileBounds.lat, lon: tileBounds.lon };
    const topRight = { lat: tileBounds.lat, lon: nextTileBounds.lon };
    const bottomLeft = { lat: nextTileBounds.lat, lon: tileBounds.lon };
    const bottomRight = { lat: nextTileBounds.lat, lon: nextTileBounds.lon };
    
    // Convert to cartesian coordinates
    const pos1 = gpsToCartesian(topLeft);
    const pos2 = gpsToCartesian(topRight);
    const pos3 = gpsToCartesian(bottomLeft);
    const pos4 = gpsToCartesian(bottomRight);

    // Calculate tile dimensions and center
    const width = Math.abs(pos2.x - pos1.x);
    const height = Math.abs(pos3.z - pos1.z);
    const centerX = (pos1.x + pos4.x) / 2;
    const centerZ = (pos1.z + pos4.z) / 2;

    // Load texture with timeout
    const texture = await loadTextureWithTimeout(textureLoader, tileUrl, 5000);
    
    // Configure texture
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Create geometry and material
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: currentOpacity // <-- use the global variable
    });
    
    const plane = new THREE.Mesh(geometry, material);

    // Position the tile
    plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    plane.position.set(centerX, -0.5, centerZ); // Position slightly below the ground plane
    
    // Add metadata for debugging
    plane.userData = {
        tileX: x,
        tileY: y,
        zoom: zoomLevel,
        bounds: { topLeft, bottomRight },
        service: currentTileService
    };

    tileGroup.add(plane);
}

/**
 * Load texture with timeout to prevent hanging requests
 */
function loadTextureWithTimeout(textureLoader, url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout loading texture: ${url}`));
        }, timeout);

        textureLoader.load(
            url,
            (texture) => {
                clearTimeout(timer);
                resolve(texture);
            },
            undefined,
            (error) => {
                clearTimeout(timer);
                reject(error);
            }
        );
    });
}

// --- Helper Functions for Tile Calculations ---

/**
 * Converts longitude and latitude to tile coordinates.
 * @param {number} lon - Longitude
 * @param {number} lat - Latitude
 * @param {number} zoom - Zoom level
 * @returns {{x: number, y: number}}
 */
function lonLatToTile(lon, lat, zoom) {
    const n = Math.pow(2, zoom);
    const x = Math.floor(n * ((lon + 180) / 360));
    const latRad = lat * Math.PI / 180;
    const y = Math.floor(n * (1 - (Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI)) / 2);
    return { x: Math.max(0, Math.min(n - 1, x)), y: Math.max(0, Math.min(n - 1, y)) };
}

/**
 * Converts tile coordinates to longitude and latitude (north-west corner of the tile).
 * @param {number} x - Tile X coordinate
 * @param {number} y - Tile Y coordinate
 * @param {number} zoom - Zoom level
 * @returns {{lon: number, lat: number}}
 */
function tileToLonLat(x, y, zoom) {
    const n = Math.pow(2, zoom);
    const lon = x / n * 360 - 180;
    const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n)));
    const lat = latRad * 180 / Math.PI;
    return { lon, lat };
}

/**
 * Animation loop
 */
function animate() {
    requestAnimationFrame(animate);

    if (controls.isCinematicActive) {
        if (controls.isCinematicActive()) {
            const latestPoint = getLatestPoint();
            if (latestPoint) {
                controls.setCinematicTarget(latestPoint);
            }
        }
    }

    controls.update();
    updateCompass(camera);
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

/**
 * Sets up all slider functionality consistently.
 */
function setupSliders() {
    const opacitySlider = document.getElementById('opacitySlider');
    
    // Handle opacity slider changes
    if (opacitySlider) {
        const updateMapOpacity = (newOpacityValue) => {
            currentOpacity = parseFloat(newOpacityValue);

            tileGroup.children.forEach(tile => {
                if (tile.material) {
                    tile.material.opacity = currentOpacity;
                }
            });
        };

        // Set the initial opacity from the slider's default value
        updateMapOpacity(opacitySlider.value);

        // Add listener to update the opacity live as the user drags the slider
        opacitySlider.addEventListener('input', (event) => {
            updateMapOpacity(event.target.value);
        });
    }

    // Handle render distance plus-minus selector
    setupRenderDistanceSelector();
}

/**
 * Sets up the render distance plus-minus selector
 */
function setupRenderDistanceSelector() {
    const minusButton = document.getElementById('renderMinus');
    const plusButton = document.getElementById('renderPlus');
    const valueDisplay = document.getElementById('renderValue');
    
    let currentRenderDistance = 17; // Initial value
    const minValue = 1;
    const maxValue = 50;
    
    // Update display and trigger tile refresh
    const updateRenderDistance = (newValue) => {
        currentRenderDistance = Math.max(minValue, Math.min(maxValue, newValue));
        
        if (valueDisplay) {
            valueDisplay.textContent = currentRenderDistance;
        }
        
        // Update button states
        if (minusButton) {
            minusButton.disabled = currentRenderDistance <= minValue;
        }
        if (plusButton) {
            plusButton.disabled = currentRenderDistance >= maxValue;
        }
        
        // Refresh tiles with new render distance
        fetchAndDisplayTiles();
    };
    
    // Initialize display
    if (valueDisplay) {
        valueDisplay.textContent = currentRenderDistance;
    }
    
    // Add event listeners
    if (minusButton) {
        minusButton.addEventListener('click', () => {
            updateRenderDistance(currentRenderDistance - 1);
        });
    }
    
    if (plusButton) {
        plusButton.addEventListener('click', () => {
            updateRenderDistance(currentRenderDistance + 1);
        });
    }
    
    // Expose current value for fetchAndDisplayTiles function
    window.getCurrentRenderDistance = () => currentRenderDistance;
}
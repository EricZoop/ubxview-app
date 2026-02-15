import * as THREE from 'three';
import { getBoundingBox, getGpsToCartesian, getFloorY } from './plotManager.js';
import { TILE_SERVICES, DEFAULTS } from './config.js';
import { lonLatToTile, tileToLonLat, loadTextureWithTimeout } from './utils.js';
import { getSceneObjects } from './sceneManager.js';

let currentTileService = DEFAULTS.initialTileService;
let currentOpacity = DEFAULTS.initialOpacity;
let currentZoomLevel = DEFAULTS.zoomLevel;

// ─── Floor Grid State ───────────────────────────────────────────
let floorGrid = null;
const GRID_OPACITY_THRESHOLD = 0.51;
// Track the world-space extent of loaded tiles so the grid matches
let lastTileExtent = null; // { minX, maxX, minZ, maxZ }

/**
 * Set the tile zoom level dynamically.
 * @param {number} zoom
 */
export function setZoomLevel(zoom) {
    currentZoomLevel = zoom;
}

/**
 * Fetches and displays satellite imagery tiles based on the data's bounding box.
 * Tiles and grid are placed at the floor Y (lowest data altitude).
 */
export async function fetchAndDisplayTiles() {
    const { tileGroup } = getSceneObjects();
    const TILE_PADDING = window.getCurrentRenderDistance
        ? window.getCurrentRenderDistance()
        : DEFAULTS.initialRenderDistance;
    const boundingBox = getBoundingBox();
    const gpsToCartesian = getGpsToCartesian();

    if (!boundingBox || !gpsToCartesian) {
        console.error("Bounding box or GPS conversion not available.");
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

    const zoomLevel = currentZoomLevel;
    const { minLon, maxLon, minLat, maxLat } = boundingBox;
    const minTileUnpadded = lonLatToTile(minLon, maxLat, zoomLevel);
    const maxTileUnpadded = lonLatToTile(maxLon, minLat, zoomLevel);

    const minTile = { x: minTileUnpadded.x - TILE_PADDING, y: minTileUnpadded.y - TILE_PADDING };
    const maxTile = { x: maxTileUnpadded.x + TILE_PADDING, y: maxTileUnpadded.y + TILE_PADDING };
    const centerTile = {
        x: Math.floor((minTileUnpadded.x + maxTileUnpadded.x) / 2),
        y: Math.floor((minTileUnpadded.y + maxTileUnpadded.y) / 2)
    };

    if (
        isNaN(minTile.x) || isNaN(minTile.y) ||
        isNaN(maxTile.x) || isNaN(maxTile.y) ||
        maxTile.x < minTile.x || maxTile.y < minTile.y ||
        (maxTile.x - minTile.x) > 1000 || (maxTile.y - minTile.y) > 1000
    ) {
        console.error("Invalid tile coordinate range:", { minTile, maxTile, boundingBox });
        return;
    }

    // ── Compute world-space extent of all tiles ──
    const topLeftGps = tileToLonLat(minTile.x, minTile.y, zoomLevel);
    const bottomRightGps = tileToLonLat(maxTile.x + 1, maxTile.y + 1, zoomLevel);
    const topLeftWorld = gpsToCartesian({ lat: topLeftGps.lat, lon: topLeftGps.lon });
    const bottomRightWorld = gpsToCartesian({ lat: bottomRightGps.lat, lon: bottomRightGps.lon });

    lastTileExtent = {
        minX: Math.min(topLeftWorld.x, bottomRightWorld.x),
        maxX: Math.max(topLeftWorld.x, bottomRightWorld.x),
        minZ: Math.min(topLeftWorld.z, bottomRightWorld.z),
        maxZ: Math.max(topLeftWorld.z, bottomRightWorld.z),
    };

    const tileCoords = [];
    for (let x = minTile.x; x <= maxTile.x; x++) {
        for (let y = minTile.y; y <= maxTile.y; y++) {
            tileCoords.push({ x, y });
        }
    }

    tileCoords.sort((a, b) =>
        Math.hypot(a.x - centerTile.x, a.y - centerTile.y) -
        Math.hypot(b.x - centerTile.x, b.y - centerTile.y)
    );

    const floorY = getFloorY();
    console.log(`Loading ${tileCoords.length} tiles at zoom ${zoomLevel}, floorY=${floorY.toFixed(1)}`);

    const textureLoader = new THREE.TextureLoader();
    const promises = tileCoords.map(({ x, y }) =>
        loadTile(x, y, zoomLevel, textureLoader, gpsToCartesian, floorY).catch(() => null)
    );
    await Promise.all(promises);

    // ── Rebuild floor grid to match tile area ──
    rebuildFloorGrid(floorY);

    console.log(`Finished loading tiles.`);
}

/**
 * Loads a single tile and adds it to the scene at the given floor Y.
 */
async function loadTile(x, y, zoom, textureLoader, gpsToCartesian, floorY) {
    const { tileGroup } = getSceneObjects();
    const tileServerUrl = TILE_SERVICES[currentTileService].url;
    const tileUrl = tileServerUrl.replace('{z}', zoom).replace('{y}', y).replace('{x}', x);

    const tileBounds = tileToLonLat(x, y, zoom);
    const nextTileBounds = tileToLonLat(x + 1, y + 1, zoom);

    const topLeft = gpsToCartesian({ lat: tileBounds.lat, lon: tileBounds.lon });
    const bottomRight = gpsToCartesian({ lat: nextTileBounds.lat, lon: nextTileBounds.lon });

    const width = Math.abs(bottomRight.x - topLeft.x);
    const height = Math.abs(bottomRight.z - topLeft.z);
    const centerX = (topLeft.x + bottomRight.x) / 2;
    const centerZ = (topLeft.z + bottomRight.z) / 2;

    const texture = await loadTextureWithTimeout(textureLoader, tileUrl, 5000);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: currentOpacity
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    // Place at floor level, offset slightly below to prevent z-fighting with grid
    plane.position.set(centerX, floorY - 0.1, centerZ);
    tileGroup.add(plane);
}

// ═══════════════════════════════════════════════════════════════
// Floor Grid Management
// ═══════════════════════════════════════════════════════════════

/**
 * Creates or replaces the floor grid to exactly match the tile coverage area.
 * @param {number} floorY - The Y position for the grid.
 */
function rebuildFloorGrid(floorY) {
    const { scene } = getSceneObjects();

    // Remove existing floor grid
    if (floorGrid) {
        scene.remove(floorGrid);
        if (floorGrid.geometry) floorGrid.geometry.dispose();
        if (floorGrid.material) floorGrid.material.dispose();
        floorGrid = null;
    }

    if (!lastTileExtent) return;

    const extentWidth = lastTileExtent.maxX - lastTileExtent.minX;
    const extentHeight = lastTileExtent.maxZ - lastTileExtent.minZ;
    const centerX = (lastTileExtent.minX + lastTileExtent.maxX) / 2;
    const centerZ = (lastTileExtent.minZ + lastTileExtent.maxZ) / 2;

    // Grid cell size: roughly 1/80th of the largest extent dimension
    // This gives a reasonable density for both rover (~5km) and ADS-B (~200km) scales
    const gridCellSize = Math.max(extentWidth, extentHeight) / 80;

    const gridMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uGridColor: { value: new THREE.Color(0x777777) },
            uGridSize: { value: gridCellSize },
            uLineWidth: { value: 0.5 },
            uOpacity: { value: 0.55 },
        },
        depthWrite: false,
        depthTest: true,
        polygonOffset: true,
        polygonOffsetFactor: -8.0,
        polygonOffsetUnits: -8.0,
        transparent: true,
        alphaTest: 0.01,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide,
        vertexShader: `
            varying vec3 vWorldPos;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPos = worldPosition.xyz;
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 uGridColor;
            uniform float uGridSize;
            uniform float uLineWidth;
            uniform float uOpacity;
            varying vec3 vWorldPos;
            void main() {
                vec2 coord = vWorldPos.xz / uGridSize;
                vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
                float line = min(grid.x, grid.y);
                float alpha = 1.0 - smoothstep(0.0, uLineWidth, line);
                alpha *= uOpacity;
                if (alpha < 0.01) discard;
                gl_FragColor = vec4(uGridColor, alpha);
            }
        `,
    });

    const gridPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(extentWidth, extentHeight),
        gridMaterial
    );

    gridPlane.rotation.x = -Math.PI / 2;
    // Sit just above tiles to prevent z-fighting
    gridPlane.position.set(centerX, floorY, centerZ);
    gridPlane.renderOrder = -1;

    floorGrid = gridPlane;
    scene.add(floorGrid);

    // Apply current visibility rule
    updateFloorGridVisibility();
}

/**
 * Show the floor grid when map opacity is below threshold, hide otherwise.
 */
function updateFloorGridVisibility() {
    if (!floorGrid) return;
    floorGrid.visible = currentOpacity < GRID_OPACITY_THRESHOLD;
}

// ═══════════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════════

/**
 * Updates the opacity of all visible tiles and toggles floor grid.
 * @param {number} newOpacity - The new opacity value (0.0 to 1.0).
 */
export function updateMapOpacity(newOpacity) {
    const { tileGroup } = getSceneObjects();
    currentOpacity = parseFloat(newOpacity);
    tileGroup.children.forEach(tile => {
        if (tile.material) {
            tile.material.opacity = currentOpacity;
        }
    });
    updateFloorGridVisibility();
}

/**
 * Switches the tile service and refreshes the tiles.
 * @param {string} serviceKey
 */
export function switchTileService(serviceKey) {
    if (serviceKey !== currentTileService && TILE_SERVICES[serviceKey]) {
        currentTileService = serviceKey;
        console.log('Switched to tile service:', TILE_SERVICES[serviceKey].name);
        if (getBoundingBox()) fetchAndDisplayTiles();
    }
}
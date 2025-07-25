import * as THREE from 'three';
import { getBoundingBox, getGpsToCartesian } from './plotManager.js';
import { TILE_SERVICES, DEFAULTS } from './config.js';
import { lonLatToTile, tileToLonLat, loadTextureWithTimeout } from './utils.js';
import { getSceneObjects } from './sceneManager.js';

let currentTileService = DEFAULTS.initialTileService;
let currentOpacity = DEFAULTS.initialOpacity;

/**
 * Fetches and displays satellite imagery tiles based on the data's bounding box.
 */
export async function fetchAndDisplayTiles() {
    const { tileGroup } = getSceneObjects();
    const TILE_PADDING = window.getCurrentRenderDistance ? window.getCurrentRenderDistance() : DEFAULTS.initialRenderDistance;
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
        if (tile.material.map) tile.material.map.dispose();
        tile.material.dispose();
    }

    const zoomLevel = DEFAULTS.zoomLevel;
    const { minLon, maxLon, minLat, maxLat } = boundingBox;
    const minTileUnpadded = lonLatToTile(minLon, maxLat, zoomLevel);
    const maxTileUnpadded = lonLatToTile(maxLon, minLat, zoomLevel);

    const minTile = { x: minTileUnpadded.x - TILE_PADDING, y: minTileUnpadded.y - TILE_PADDING };
    const maxTile = { x: maxTileUnpadded.x + TILE_PADDING, y: maxTileUnpadded.y + TILE_PADDING };
    const centerTile = {
        x: Math.floor((minTileUnpadded.x + maxTileUnpadded.x) / 2),
        y: Math.floor((minTileUnpadded.y + maxTileUnpadded.y) / 2)
    };

    // Ensure tile ranges are valid
    if (
        isNaN(minTile.x) || isNaN(minTile.y) ||
        isNaN(maxTile.x) || isNaN(maxTile.y) ||
        maxTile.x < minTile.x || maxTile.y < minTile.y ||
        (maxTile.x - minTile.x) > 1000 || (maxTile.y - minTile.y) > 1000
    ) {
        console.error("Invalid tile coordinate range:", {
            minTile, maxTile, boundingBox
        });
        return;
    }

    const tileCoords = [];
    for (let x = minTile.x; x <= maxTile.x; x++) {
        for (let y = minTile.y; y <= maxTile.y; y++) {
            tileCoords.push({ x, y });
        }
    }

    tileCoords.sort((a, b) => Math.hypot(a.x - centerTile.x, a.y - centerTile.y) - Math.hypot(b.x - centerTile.x, b.y - centerTile.y));

    console.log(`Loading tiles using ${TILE_SERVICES[currentTileService].name} service...`);
    const textureLoader = new THREE.TextureLoader();
    const promises = tileCoords.map(({ x, y }) => loadTile(x, y, zoomLevel, textureLoader, gpsToCartesian).catch(e => null));
    await Promise.all(promises);
    console.log(`Finished loading tiles.`);
}

/**
 * Loads a single tile and adds it to the scene.
 */
async function loadTile(x, y, zoom, textureLoader, gpsToCartesian) {
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
    plane.position.set(centerX, -0.5, centerZ);
    tileGroup.add(plane);
}

/**
 * Updates the opacity of all visible tiles.
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
}

/**
 * Switches the tile service and refreshes the tiles.
 * @param {string} serviceKey - The key of the tile service (e.g., 'satellite').
 */
export function switchTileService(serviceKey) {
    if (serviceKey !== currentTileService && TILE_SERVICES[serviceKey]) {
        currentTileService = serviceKey;
        console.log('Switched to tile service:', TILE_SERVICES[serviceKey].name);
        if (getBoundingBox()) {
            fetchAndDisplayTiles();
        }
    }
}
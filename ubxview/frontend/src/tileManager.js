import * as THREE from 'three';
import { getBoundingBox, getGpsToCartesian } from './plotManager.js';
import { TILE_SERVICES, DEFAULTS } from './config.js';
import { lonLatToTile, tileToLonLat, loadTextureWithTimeout } from './utils.js';
import { getSceneObjects } from './sceneManager.js';

let currentTileService = DEFAULTS.initialTileService;
let currentOpacity = DEFAULTS.initialOpacity;

/**
 * Auto-determine zoom level from the bounding box span in degrees.
 * Larger spans get lower zoom (wider tiles), smaller spans get higher zoom (detail).
 */
function autoZoomLevel(bounds) {
    const latSpan = bounds.maxLat - bounds.minLat;
    const lonSpan = bounds.maxLon - bounds.minLon;
    const maxSpan = Math.max(latSpan, lonSpan);

    if (maxSpan < 0.005) return 17;   // ~500m
    if (maxSpan < 0.01)  return 16;   // ~1km
    if (maxSpan < 0.03)  return 15;   // ~3km
    if (maxSpan < 0.08)  return 14;   // ~8km
    if (maxSpan < 0.2)   return 13;   // ~20km
    if (maxSpan < 0.5)   return 12;   // ~50km
    if (maxSpan < 1.0)   return 11;   // ~100km
    if (maxSpan < 2.0)   return 10;   // ~200km
    return 9;
}

/**
 * Compute padding that stays within a tile budget.
 */
function computePadding(bounds, zoom) {
    const minT = lonLatToTile(bounds.minLon, bounds.maxLat, zoom);
    const maxT = lonLatToTile(bounds.maxLon, bounds.minLat, zoom);
    const dw = maxT.x - minT.x + 1;
    const dh = maxT.y - minT.y + 1;
    const maxDim = Math.max(dw, dh);
    const budget = Math.floor(Math.sqrt(DEFAULTS.maxTotalTiles));
    const pad = Math.max(3, Math.floor((budget - maxDim) / 2));
    return Math.min(pad, 15);
}

function clearTileGroup() {
    const { tileGroup } = getSceneObjects();
    while (tileGroup.children.length > 0) {
        const tile = tileGroup.children[0];
        tileGroup.remove(tile);
        if (tile.geometry) tile.geometry.dispose();
        if (tile.material) {
            if (tile.material.map) tile.material.map.dispose();
            tile.material.dispose();
        }
    }
}

/**
 * Fetches and displays a single tile layer based on the combined bounding box.
 * Auto-selects zoom level and padding — no render distance parameter needed.
 */
export async function fetchAndDisplayTiles() {
    const { tileGroup } = getSceneObjects();
    const boundingBox = getBoundingBox();
    const gpsToCartesian = getGpsToCartesian();

    if (!boundingBox || !gpsToCartesian) {
        console.error("Bounding box or GPS conversion not available.");
        return;
    }

    clearTileGroup();

    const zoom = autoZoomLevel(boundingBox);
    const padding = computePadding(boundingBox, zoom);

    const { minLon, maxLon, minLat, maxLat } = boundingBox;
    const minTileRaw = lonLatToTile(minLon, maxLat, zoom);
    const maxTileRaw = lonLatToTile(maxLon, minLat, zoom);

    const minTile = { x: minTileRaw.x - padding, y: minTileRaw.y - padding };
    const maxTile = { x: maxTileRaw.x + padding, y: maxTileRaw.y + padding };
    const centerTile = {
        x: Math.floor((minTileRaw.x + maxTileRaw.x) / 2),
        y: Math.floor((minTileRaw.y + maxTileRaw.y) / 2),
    };

    if (
        isNaN(minTile.x) || isNaN(minTile.y) ||
        isNaN(maxTile.x) || isNaN(maxTile.y) ||
        maxTile.x < minTile.x || maxTile.y < minTile.y ||
        (maxTile.x - minTile.x) > 300 || (maxTile.y - minTile.y) > 300
    ) {
        console.error("Invalid tile range:", { minTile, maxTile, boundingBox });
        return;
    }

    const tileCoords = [];
    for (let x = minTile.x; x <= maxTile.x; x++) {
        for (let y = minTile.y; y <= maxTile.y; y++) {
            tileCoords.push({ x, y });
        }
    }

    // Load center-out for nice visual pop-in
    tileCoords.sort((a, b) =>
        Math.hypot(a.x - centerTile.x, a.y - centerTile.y) -
        Math.hypot(b.x - centerTile.x, b.y - centerTile.y)
    );

    const totalTiles = tileCoords.length;
    console.log(`Loading ${totalTiles} tiles at zoom ${zoom} (padding ${padding})...`);

    const textureLoader = new THREE.TextureLoader();
    const promises = tileCoords.map(({ x, y }) =>
        loadTile(x, y, zoom, textureLoader, gpsToCartesian, tileGroup).catch(() => null)
    );
    await Promise.all(promises);
    console.log(`Finished loading tiles.`);
}

async function loadTile(x, y, zoom, textureLoader, gpsToCartesian, targetGroup) {
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
        opacity: currentOpacity,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(centerX, -0.5, centerZ);
    targetGroup.add(plane);
}

/**
 * Updates opacity of all visible tiles.
 */
export function updateMapOpacity(newOpacity) {
    const { tileGroup } = getSceneObjects();
    currentOpacity = parseFloat(newOpacity);
    tileGroup.traverse(child => {
        if (child.isMesh && child.material) {
            child.material.opacity = currentOpacity;
        }
    });
}

/**
 * Switches tile service and refreshes.
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
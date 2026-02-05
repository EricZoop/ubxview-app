import * as THREE from 'three';
import { getBoundingBox, getGpsToCartesian } from './plotManager.js';
import { TILE_SERVICES, DEFAULTS } from './config.js';
import { lonLatToTile, tileToLonLat, loadTextureWithTimeout } from './utils.js';
import { getSceneObjects } from './sceneManager.js';

let currentTileService = DEFAULTS.initialTileService;
let currentOpacity = DEFAULTS.initialOpacity;

// Track loaded tiles to avoid duplicates and enable efficient updates
let loadedTiles = new Map(); // key: "zoom-x-y", value: { mesh, bounds, isHighRes }
let lastBoundingBox = null;
let tileUpdateInterval = null;
let isLoadingTiles = false;

// Multi-resolution settings
const HIGH_RES_ZOOM = DEFAULTS.zoomLevel; // 17 - for areas with plot data
const LOW_RES_ZOOM = HIGH_RES_ZOOM - 2;   // 14 - for background context
const HIGH_RES_PADDING = 2;  // Tiles around the plot data
const LOW_RES_RADIUS = 10;   // Larger radius for low-res background

/**
 * Initialize the tile update system that monitors for plot changes
 */
export function initializeTileManager() {
    // Check for bounding box changes every 2 seconds
    tileUpdateInterval = setInterval(() => {
        checkAndUpdateTiles();
    }, 2000);
    
    console.log("Dynamic tile manager initialized");
}

/**
 * Stop the tile update monitoring
 */
export function stopTileManager() {
    if (tileUpdateInterval) {
        clearInterval(tileUpdateInterval);
        tileUpdateInterval = null;
    }
}

/**
 * Check if bounding box has changed and update tiles accordingly
 */
async function checkAndUpdateTiles() {
    if (isLoadingTiles) return; // Prevent overlapping updates
    
    const currentBoundingBox = getBoundingBox();
    
    if (!currentBoundingBox) return;
    
    // Check if bounds have changed significantly
    if (hasSignificantBoundsChange(currentBoundingBox, lastBoundingBox)) {
        console.log("Bounding box changed, updating tiles...");
        await fetchAndDisplayTiles();
    }
}

/**
 * Determine if the bounding box has changed enough to warrant a tile update
 */
function hasSignificantBoundsChange(newBounds, oldBounds) {
    if (!oldBounds) return true;
    
    // Calculate threshold as 10% of the current span
    const latSpan = newBounds.maxLat - newBounds.minLat;
    const lonSpan = newBounds.maxLon - newBounds.minLon;
    const threshold = Math.max(latSpan, lonSpan) * 0.1;
    
    return (
        Math.abs(newBounds.minLat - oldBounds.minLat) > threshold ||
        Math.abs(newBounds.maxLat - oldBounds.maxLat) > threshold ||
        Math.abs(newBounds.minLon - oldBounds.minLon) > threshold ||
        Math.abs(newBounds.maxLon - oldBounds.maxLon) > threshold
    );
}

/**
 * Fetches and displays satellite imagery tiles with multi-resolution support.
 * High-res tiles where there's plot data, low-res tiles for surrounding context.
 */
export async function fetchAndDisplayTiles() {
    if (isLoadingTiles) {
        console.log("Tile loading already in progress, skipping...");
        return;
    }
    
    isLoadingTiles = true;
    const { tileGroup } = getSceneObjects();
    const boundingBox = getBoundingBox();
    const gpsToCartesian = getGpsToCartesian();

    if (!boundingBox || !gpsToCartesian) {
        console.error("Bounding box or GPS conversion not available.");
        isLoadingTiles = false;
        return;
    }

    lastBoundingBox = { ...boundingBox };

    const { minLon, maxLon, minLat, maxLat } = boundingBox;
    
    // Calculate tile ranges for both resolutions
    const highResTiles = calculateTileRange(
        minLon, maxLon, minLat, maxLat, 
        HIGH_RES_ZOOM, 
        HIGH_RES_PADDING
    );
    
    const lowResTiles = calculateTileRange(
        minLon, maxLon, minLat, maxLat,
        LOW_RES_ZOOM,
        LOW_RES_RADIUS
    );

    // Determine which tiles need to be loaded
    const tilesToLoad = [];
    const tilesToKeep = new Set();

    // Process low-res tiles first (background) - NO CULLING
    // We keep ALL low-res tiles to ensure complete coverage
    for (const tile of lowResTiles) {
        const key = `${tile.zoom}-${tile.x}-${tile.y}`;
        tilesToKeep.add(key);
        
        if (!loadedTiles.has(key)) {
            tilesToLoad.push({ ...tile, isHighRes: false });
        }
    }

    // Process high-res tiles (will overlay on top of low-res)
    for (const tile of highResTiles) {
        const key = `${tile.zoom}-${tile.x}-${tile.y}`;
        tilesToKeep.add(key);
        
        if (!loadedTiles.has(key)) {
            tilesToLoad.push({ ...tile, isHighRes: true });
        }
    }

    // Remove tiles that are no longer needed
    const tilesToRemove = [];
    for (const [key, tileData] of loadedTiles.entries()) {
        if (!tilesToKeep.has(key)) {
            tilesToRemove.push(key);
        }
    }

    // Clean up removed tiles
    for (const key of tilesToRemove) {
        const tileData = loadedTiles.get(key);
        if (tileData && tileData.mesh) {
            tileGroup.remove(tileData.mesh);
            if (tileData.mesh.geometry) tileData.mesh.geometry.dispose();
            if (tileData.mesh.material.map) tileData.mesh.material.map.dispose();
            tileData.mesh.material.dispose();
        }
        loadedTiles.delete(key);
    }

    console.log(`Loading ${tilesToLoad.length} new tiles (${tilesToRemove.length} removed)...`);
    console.log(`Using ${TILE_SERVICES[currentTileService].name} service`);

    // Load new tiles in parallel
    const textureLoader = new THREE.TextureLoader();
    const promises = tilesToLoad.map(tile => 
        loadTile(tile.x, tile.y, tile.zoom, tile.isHighRes, textureLoader, gpsToCartesian)
            .catch(e => {
                console.warn(`Failed to load tile ${tile.zoom}/${tile.x}/${tile.y}:`, e);
                return null;
            })
    );
    
    await Promise.all(promises);

    console.log(`Tile loading complete. Total tiles: ${loadedTiles.size}`);
    isLoadingTiles = false;
}

/**
 * Calculate the range of tiles needed for a given bounding box
 */
function calculateTileRange(minLon, maxLon, minLat, maxLat, zoomLevel, padding) {
    const minTileUnpadded = lonLatToTile(minLon, maxLat, zoomLevel);
    const maxTileUnpadded = lonLatToTile(maxLon, minLat, zoomLevel);

    const minTile = { 
        x: minTileUnpadded.x - padding, 
        y: minTileUnpadded.y - padding 
    };
    const maxTile = { 
        x: maxTileUnpadded.x + padding, 
        y: maxTileUnpadded.y + padding 
    };

    // Validate tile range
    if (
        isNaN(minTile.x) || isNaN(minTile.y) ||
        isNaN(maxTile.x) || isNaN(maxTile.y) ||
        maxTile.x < minTile.x || maxTile.y < minTile.y ||
        (maxTile.x - minTile.x) > 500 || (maxTile.y - minTile.y) > 500
    ) {
        console.error("Invalid tile coordinate range:", { minTile, maxTile });
        return [];
    }

    // Calculate center for distance-based sorting
    const centerTile = {
        x: Math.floor((minTileUnpadded.x + maxTileUnpadded.x) / 2),
        y: Math.floor((minTileUnpadded.y + maxTileUnpadded.y) / 2)
    };

    // Generate tile coordinates
    const tiles = [];
    for (let x = minTile.x; x <= maxTile.x; x++) {
        for (let y = minTile.y; y <= maxTile.y; y++) {
            tiles.push({ x, y, zoom: zoomLevel });
        }
    }

    // Sort by distance from center (load center tiles first)
    tiles.sort((a, b) => {
        const distA = Math.hypot(a.x - centerTile.x, a.y - centerTile.y);
        const distB = Math.hypot(b.x - centerTile.x, b.y - centerTile.y);
        return distA - distB;
    });

    return tiles;
}

/**
 * Loads a single tile and adds it to the scene.
 */
async function loadTile(x, y, zoom, isHighRes, textureLoader, gpsToCartesian) {
    const { tileGroup } = getSceneObjects();
    const key = `${zoom}-${x}-${y}`;
    
    // Skip if already loaded
    if (loadedTiles.has(key)) {
        return;
    }

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

    try {
        const texture = await loadTextureWithTimeout(textureLoader, tileUrl, 5000);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = 16;
        texture.generateMipmaps = true;
        texture.colorSpace = THREE.SRGBColorSpace;

        const geometry = new THREE.PlaneGeometry(width, height);
        
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: currentOpacity < 1.0,
            opacity: currentOpacity,
            // Keep the brightness dilution for high-res
            color: isHighRes ? 0xe5e5e5 : 0xffffff, 
            
            // Masking Logic: HighRes writes depth, effectively "punching a hole" 
            // in the LowRes layer which will fail the depth test behind it.
            depthWrite: isHighRes ? true : (currentOpacity >= 0.99),
            depthTest: true,
            blending: THREE.NormalBlending,
            
            // USE POLYGON OFFSET ONLY - NO PHYSICAL SEPARATION
            // This pushes the "depth" calculation without moving the pixels,
            // eliminating the parallax/detethering effect.
            polygonOffset: true,
            // HighRes (-1) pulls closer. LowRes (1) pushes back. Grid is (-10) way back.
            polygonOffsetFactor: isHighRes ? -1 : 1, 
            polygonOffsetUnits: isHighRes ? -1 : 1
        });
        
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        
        // FIX: Snap both to exactly -0.1 to match grid and each other.
        // No physical gap = no parallax.
        plane.position.set(centerX, -0.1, centerZ);
        
        // Render Order: Draw HighRes first (10) to write to depth buffer.
        // Then Draw LowRes (20). It checks depth, sees HighRes is "closer" (via polygon offset),
        // and discards pixels, preventing the double-opacity stacking.
        plane.renderOrder = isHighRes ? 10 : 20;
        
        tileGroup.add(plane);
        
        loadedTiles.set(key, {
            mesh: plane,
            bounds: { minLon: tileBounds.lon, maxLon: nextTileBounds.lon, 
                     minLat: nextTileBounds.lat, maxLat: tileBounds.lat },
            isHighRes: isHighRes,
            zoom: zoom
        });
    } catch (error) {
        console.warn(`Failed to load tile ${key}:`, error.message);
    }
}

/**
 * Updates the opacity of all visible tiles.
 * @param {number} newOpacity - The new opacity value (0.0 to 1.0).
 */
export function updateMapOpacity(newOpacity) {
    currentOpacity = parseFloat(newOpacity);
    loadedTiles.forEach(tileData => {
        if (tileData.mesh && tileData.mesh.material) {
            tileData.mesh.material.opacity = currentOpacity;
            tileData.mesh.material.transparent = currentOpacity < 1.0;
            tileData.mesh.material.depthWrite = tileData.isHighRes ? true : (currentOpacity >= 0.99);
            tileData.mesh.material.needsUpdate = true;
        }
    });
}

/**
 * Switches the tile service and refreshes all tiles.
 * @param {string} serviceKey - The key of the tile service (e.g., 'satellite').
 */
export function switchTileService(serviceKey) {
    if (serviceKey !== currentTileService && TILE_SERVICES[serviceKey]) {
        currentTileService = serviceKey;
        console.log('Switched to tile service:', TILE_SERVICES[serviceKey].name);
        
        // Clear all tiles and reload with new service
        const { tileGroup } = getSceneObjects();
        loadedTiles.forEach(tileData => {
            if (tileData.mesh) {
                tileGroup.remove(tileData.mesh);
                if (tileData.mesh.geometry) tileData.mesh.geometry.dispose();
                if (tileData.mesh.material.map) tileData.mesh.material.map.dispose();
                tileData.mesh.material.dispose();
            }
        });
        loadedTiles.clear();
        lastBoundingBox = null;
        
        if (getBoundingBox()) {
            fetchAndDisplayTiles();
        }
    }
}

/**
 * Get statistics about loaded tiles (for debugging)
 */
export function getTileStats() {
    let highResCount = 0;
    let lowResCount = 0;
    
    loadedTiles.forEach(tileData => {
        if (tileData.isHighRes) {
            highResCount++;
        } else {
            lowResCount++;
        }
    });
    
    return {
        total: loadedTiles.size,
        highRes: highResCount,
        lowRes: lowResCount
    };
}
import * as THREE from 'three';
import { getBoundingBox, getGpsToCartesian, getFloorY } from './plotManager.js';
import { TILE_SERVICES, DEFAULTS } from './config.js';
import { lonLatToTile, tileToLonLat, loadTextureWithTimeout } from './utils.js';
import { getSceneObjects } from './sceneManager.js';

let currentTileService = DEFAULTS.initialTileService;
let currentOpacity     = DEFAULTS.initialOpacity;

// ─── Floor Grid State ───────────────────────────────────────────
let floorGrid = null;
const GRID_OPACITY_THRESHOLD = 0.51;
let lastTileExtent = null; // { minX, maxX, minZ, maxZ }

// ─── Tile budget ────────────────────────────────────────────────
// Hard cap on total tiles per fetch — prevents the page freezing when
// a large overlay inflates the bounding box.
const MAX_TILE_COUNT = 500;

// ─── Zoom override ──────────────────────────────────────────────
// null  → auto-compute from padded bounding box (default)
// number → manual override (set via setZoomLevel)
let manualZoomOverride = null;

export function setZoomLevel(zoom) {
    // Accept null to restore auto mode; ignore legacy type-based values
    manualZoomOverride = (zoom !== null && zoom !== undefined) ? zoom : null;
}

// ═══════════════════════════════════════════════════════════════
// Geographic padding helpers
// ═══════════════════════════════════════════════════════════════

/**
 * Pads a lat/lon bounding box outward by a given number of kilometres.
 * This is what the render-distance slider controls: a consistent geographic
 * margin regardless of zoom level.
 *
 * @param {{ minLat, maxLat, minLon, maxLon }} bbox
 * @param {number} km  padding radius in kilometres
 * @returns {{ minLat, maxLat, minLon, maxLon }}
 */
function padBoundingBoxKm(bbox, km) {
    const latDeg = km / 111.32;
    const centerLat = (bbox.minLat + bbox.maxLat) / 2;
    const lonDeg = km / (111.32 * Math.cos(centerLat * Math.PI / 180));
    return {
        minLat: bbox.minLat - latDeg,
        maxLat: bbox.maxLat + latDeg,
        minLon: bbox.minLon - lonDeg,
        maxLon: bbox.maxLon + lonDeg,
    };
}

/**
 * Selects the highest zoom level at which the tile grid for the given
 * (already-padded) bbox stays within MAX_TILE_COUNT.
 *
 * @param {{ minLat, maxLat, minLon, maxLon }} paddedBbox
 * @returns {number} zoom in [1, 18]
 */
function computeOptimalZoom(paddedBbox) {
    const deltaLon = Math.max(paddedBbox.maxLon - paddedBbox.minLon, 1e-4);
    const deltaLat = Math.max(paddedBbox.maxLat - paddedBbox.minLat, 1e-4);

    for (let z = 18; z >= 1; z--) {
        const n = Math.pow(2, z);
        // +1 accounts for partial tiles at each edge
        const tilesX = Math.ceil(n * deltaLon / 360) + 1;
        const tilesY = Math.ceil(n * deltaLat / 180) + 1;
        if (tilesX * tilesY <= MAX_TILE_COUNT) {
            return z;
        }
    }
    return 1;
}

// ═══════════════════════════════════════════════════════════════
// Main fetch
// ═══════════════════════════════════════════════════════════════

/**
 * Fetches and displays map tiles.
 *
 * Render distance (km) → determines how far the map extends beyond the data.
 * Zoom level           → auto-selected so the padded area fits MAX_TILE_COUNT,
 *                        or overridden manually via setZoomLevel().
 */
export async function fetchAndDisplayTiles() {
    const { tileGroup } = getSceneObjects();

    // Render distance comes from the UI slider in kilometres.
    // Fallback to DEFAULTS.initialRenderDistanceKm if the getter isn't wired yet.
    const renderDistanceKm = window.getCurrentRenderDistance
        ? window.getCurrentRenderDistance()
        : (DEFAULTS.initialRenderDistanceKm ?? 1);

    const rawBbox     = getBoundingBox();
    const gpsToCartesian = getGpsToCartesian();

    if (!rawBbox || !gpsToCartesian) {
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

    // ── Pad the bbox geographically ──
    const bbox = padBoundingBoxKm(rawBbox, renderDistanceKm);

    // ── Resolve zoom ──
    const zoomLevel = (manualZoomOverride !== null)
        ? manualZoomOverride
        : computeOptimalZoom(bbox);

    // ── Tile grid ──
    const minTile = lonLatToTile(bbox.minLon, bbox.maxLat, zoomLevel);
    const maxTile = lonLatToTile(bbox.maxLon, bbox.minLat, zoomLevel);
    const centerTile = {
        x: Math.floor((minTile.x + maxTile.x) / 2),
        y: Math.floor((minTile.y + maxTile.y) / 2),
    };

    const tileCountX = maxTile.x - minTile.x + 1;
    const tileCountY = maxTile.y - minTile.y + 1;
    const totalTiles = tileCountX * tileCountY;

    if (
        isNaN(minTile.x) || isNaN(minTile.y) ||
        isNaN(maxTile.x) || isNaN(maxTile.y) ||
        maxTile.x < minTile.x || maxTile.y < minTile.y ||
        tileCountX > 1000  || tileCountY > 1000
    ) {
        console.error("Invalid tile coordinate range:", { minTile, maxTile, bbox });
        return;
    }

    if (totalTiles > MAX_TILE_COUNT) {
        // Should be rare after computeOptimalZoom, but acts as a hard safety net
        console.warn(
            `Tile count ${totalTiles} still exceeds MAX_TILE_COUNT (${MAX_TILE_COUNT}) ` +
            `after auto-zoom. Aborting tile fetch.`
        );
        return;
    }

    // ── World-space extent for floor grid ──
    const tlGps = tileToLonLat(minTile.x,     minTile.y,     zoomLevel);
    const brGps = tileToLonLat(maxTile.x + 1, maxTile.y + 1, zoomLevel);
    const tlWorld = gpsToCartesian({ lat: tlGps.lat, lon: tlGps.lon });
    const brWorld = gpsToCartesian({ lat: brGps.lat, lon: brGps.lon });

    lastTileExtent = {
        minX: Math.min(tlWorld.x, brWorld.x),
        maxX: Math.max(tlWorld.x, brWorld.x),
        minZ: Math.min(tlWorld.z, brWorld.z),
        maxZ: Math.max(tlWorld.z, brWorld.z),
    };

    // ── Sort tiles centre-outward for fastest perceived load ──
    const tileCoords = [];
    for (let x = minTile.x; x <= maxTile.x; x++)
        for (let y = minTile.y; y <= maxTile.y; y++)
            tileCoords.push({ x, y });

    tileCoords.sort((a, b) =>
        Math.hypot(a.x - centerTile.x, a.y - centerTile.y) -
        Math.hypot(b.x - centerTile.x, b.y - centerTile.y)
    );

    const floorY = getFloorY();
    console.log(
        `Loading ${tileCoords.length} tiles | zoom ${zoomLevel} ` +
        `(${manualZoomOverride !== null ? 'manual' : 'auto'}) | ` +
        `renderDist ${renderDistanceKm} km | floorY ${floorY.toFixed(1)}`
    );

    const textureLoader = new THREE.TextureLoader();
    await Promise.all(
        tileCoords.map(({ x, y }) =>
            loadTile(x, y, zoomLevel, textureLoader, gpsToCartesian, floorY).catch(() => null)
        )
    );

    rebuildFloorGrid(floorY);
    console.log(`Finished loading tiles.`);
}

// ═══════════════════════════════════════════════════════════════
// Single tile loader
// ═══════════════════════════════════════════════════════════════

async function loadTile(x, y, zoom, textureLoader, gpsToCartesian, floorY) {
    const { tileGroup } = getSceneObjects();
    const url = TILE_SERVICES[currentTileService].url
        .replace('{z}', zoom).replace('{y}', y).replace('{x}', x);

    const tl = tileToLonLat(x,     y,     zoom);
    const br = tileToLonLat(x + 1, y + 1, zoom);
    const tlW = gpsToCartesian({ lat: tl.lat, lon: tl.lon });
    const brW = gpsToCartesian({ lat: br.lat, lon: br.lon });

    const w = Math.abs(brW.x - tlW.x);
    const h = Math.abs(brW.z - tlW.z);

    const texture = await loadTextureWithTimeout(textureLoader, url, 5000);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: currentOpacity,
        })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.set((tlW.x + brW.x) / 2, floorY - 0.1, (tlW.z + brW.z) / 2);
    tileGroup.add(plane);
}

// ═══════════════════════════════════════════════════════════════
// Floor Grid
// ═══════════════════════════════════════════════════════════════

function rebuildFloorGrid(floorY) {
    const { scene } = getSceneObjects();
    if (floorGrid) {
        scene.remove(floorGrid);
        floorGrid.geometry.dispose();
        floorGrid.material.dispose();
        floorGrid = null;
    }
    if (!lastTileExtent) return;

    const w  = lastTileExtent.maxX - lastTileExtent.minX;
    const h  = lastTileExtent.maxZ - lastTileExtent.minZ;
    const cx = (lastTileExtent.minX + lastTileExtent.maxX) / 2;
    const cz = (lastTileExtent.minZ + lastTileExtent.maxZ) / 2;
    const cellSize = Math.max(w, h) / 80;

    floorGrid = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.ShaderMaterial({
            uniforms: {
                uGridColor: { value: new THREE.Color(0x777777) },
                uGridSize:  { value: cellSize },
                uLineWidth: { value: 0.5 },
                uOpacity:   { value: 0.55 },
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
                    vec4 wp = modelMatrix * vec4(position, 1.0);
                    vWorldPos = wp.xyz;
                    gl_Position = projectionMatrix * viewMatrix * wp;
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
                    vec2 grid  = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
                    float line = min(grid.x, grid.y);
                    float alpha = (1.0 - smoothstep(0.0, uLineWidth, line)) * uOpacity;
                    if (alpha < 0.01) discard;
                    gl_FragColor = vec4(uGridColor, alpha);
                }
            `,
        })
    );
    floorGrid.rotation.x = -Math.PI / 2;
    floorGrid.position.set(cx, floorY, cz);
    floorGrid.renderOrder = -1;
    scene.add(floorGrid);
    updateFloorGridVisibility();
}

function updateFloorGridVisibility() {
    if (floorGrid) floorGrid.visible = currentOpacity < GRID_OPACITY_THRESHOLD;
}

// ═══════════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════════

export function updateMapOpacity(newOpacity) {
    const { tileGroup } = getSceneObjects();
    currentOpacity = parseFloat(newOpacity);
    tileGroup.children.forEach(t => { if (t.material) t.material.opacity = currentOpacity; });
    updateFloorGridVisibility();
}

export function switchTileService(serviceKey) {
    if (serviceKey !== currentTileService && TILE_SERVICES[serviceKey]) {
        currentTileService = serviceKey;
        console.log('Switched to tile service:', TILE_SERVICES[serviceKey].name);
        if (getBoundingBox()) fetchAndDisplayTiles();
    }
}
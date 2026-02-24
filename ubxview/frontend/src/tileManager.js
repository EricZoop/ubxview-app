import * as THREE from 'three';
import { getBoundingBox, getGpsToCartesian, getFloorY, getBaselineAltitude } from './plotManager.js';
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
const MAX_TILE_COUNT = 500;

// ─── Zoom override ──────────────────────────────────────────────
let manualZoomOverride = null;

export function setZoomLevel(zoom) {
    manualZoomOverride = (zoom !== null && zoom !== undefined) ? zoom : null;
}

// ─── Topography ─────────────────────────────────────────────────
// AWS Terrain Tiles (Terrarium format) — free, no API key, CORS enabled.
// Encoding: elevation (m) = R*256 + G + B/256 − 32768
const TERRAIN_TILE_URL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png';
let TERRAIN_SEGMENTS  = 32;   // subdivisions per tile (32×32 = 1089 verts/tile)
let ELEVATION_SCALE   = 10;    // must match gpsToCartesian: y = (alt - baseline) * 10

let topographyEnabled = false;

/**
 * Enable or disable terrain displacement.
 * Triggers a tile refresh so changes take effect immediately.
 */
export function setElevationScale(val) {
    ELEVATION_SCALE = parseFloat(val);
    if (topographyEnabled && getBoundingBox()) {
        fetchAndDisplayTiles(); 
    }
}

export function setTerrainSegments(val) {
    TERRAIN_SEGMENTS = parseInt(val, 10);
    if (topographyEnabled && getBoundingBox()) {
        fetchAndDisplayTiles();
    }
}
export function setTopographyEnabled(enabled) {
    topographyEnabled = !!enabled;
    if (getBoundingBox()) fetchAndDisplayTiles();
}
export function getTopographyEnabled() { return topographyEnabled; }

// ═══════════════════════════════════════════════════════════════
// Elevation helpers
// ═══════════════════════════════════════════════════════════════

/**
 * Fetches a Terrarium elevation tile and returns its raw ImageData.
 * Returns null on failure so the tile degrades gracefully to flat.
 */
async function fetchElevationImageData(x, y, zoom) {
    const url = TERRAIN_TILE_URL
        .replace('{z}', zoom).replace('{x}', x).replace('{y}', y);
    return new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width  = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
            } catch (e) {
                console.warn(`Elevation canvas read failed for ${x},${y},${zoom}:`, e);
                resolve(null);
            }
        };
        img.onerror = () => {
            console.warn(`Elevation tile load failed: ${url}`);
            resolve(null);
        };
        // Timeout fallback
        setTimeout(() => resolve(null), 6000);
        img.src = url;
    });
}

/**
 * Bilinearly-sampled Terrarium elevation at fractional pixel coordinates.
 * @param {ImageData} imgData
 * @param {number} pr  fractional pixel row  (0 = north edge)
 * @param {number} pc  fractional pixel col  (0 = west  edge)
 * @returns {number} elevation in metres
 */
function sampleElevation(imgData, pr, pc) {
    const { data, width, height } = imgData;
    const decode = (r, c) => {
        const px = Math.max(0, Math.min(width  - 1, Math.round(c)));
        const py = Math.max(0, Math.min(height - 1, Math.round(r)));
        const i  = (py * width + px) * 4;
        return data[i] * 256 + data[i + 1] + data[i + 2] / 256 - 32768;
    };
    return decode(pr, pc);
}

// ═══════════════════════════════════════════════════════════════
// Geographic padding / zoom helpers (unchanged)
// ═══════════════════════════════════════════════════════════════

function padBoundingBoxKm(bbox, km) {
    const latDeg    = km / 111.32;
    const centerLat = (bbox.minLat + bbox.maxLat) / 2;
    const lonDeg    = km / (111.32 * Math.cos(centerLat * Math.PI / 180));
    return {
        minLat: bbox.minLat - latDeg, maxLat: bbox.maxLat + latDeg,
        minLon: bbox.minLon - lonDeg, maxLon: bbox.maxLon + lonDeg,
    };
}

function computeOptimalZoom(paddedBbox) {
    const deltaLon = Math.max(paddedBbox.maxLon - paddedBbox.minLon, 1e-4);
    const deltaLat = Math.max(paddedBbox.maxLat - paddedBbox.minLat, 1e-4);
    for (let z = 18; z >= 1; z--) {
        const n      = Math.pow(2, z);
        const tilesX = Math.ceil(n * deltaLon / 360) + 1;
        const tilesY = Math.ceil(n * deltaLat / 180) + 1;
        if (tilesX * tilesY <= MAX_TILE_COUNT) return z;
    }
    return 1;
}

// ═══════════════════════════════════════════════════════════════
// Main fetch
// ═══════════════════════════════════════════════════════════════

export async function fetchAndDisplayTiles() {
    const { tileGroup } = getSceneObjects();

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

    const bbox      = padBoundingBoxKm(rawBbox, renderDistanceKm);
    const zoomLevel = manualZoomOverride !== null ? manualZoomOverride : computeOptimalZoom(bbox);

    const minTile    = lonLatToTile(bbox.minLon, bbox.maxLat, zoomLevel);
    const maxTile    = lonLatToTile(bbox.maxLon, bbox.minLat, zoomLevel);
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
        console.warn(`Tile count ${totalTiles} exceeds MAX_TILE_COUNT (${MAX_TILE_COUNT}). Aborting.`);
        return;
    }

    // World-space extent for floor grid
    const tlGps  = tileToLonLat(minTile.x,     minTile.y,     zoomLevel);
    const brGps  = tileToLonLat(maxTile.x + 1, maxTile.y + 1, zoomLevel);
    const tlWorld = gpsToCartesian({ lat: tlGps.lat, lon: tlGps.lon });
    const brWorld = gpsToCartesian({ lat: brGps.lat, lon: brGps.lon });

    lastTileExtent = {
        minX: Math.min(tlWorld.x, brWorld.x), maxX: Math.max(tlWorld.x, brWorld.x),
        minZ: Math.min(tlWorld.z, brWorld.z), maxZ: Math.max(tlWorld.z, brWorld.z),
    };

    // Sort centre-outward for fastest perceived load
    const tileCoords = [];
    for (let x = minTile.x; x <= maxTile.x; x++)
        for (let y = minTile.y; y <= maxTile.y; y++)
            tileCoords.push({ x, y });

    tileCoords.sort((a, b) =>
        Math.hypot(a.x - centerTile.x, a.y - centerTile.y) -
        Math.hypot(b.x - centerTile.x, b.y - centerTile.y)
    );

    const floorY   = getFloorY();
    const baseAlt  = getBaselineAltitude(); // needed for elevation→Y conversion
    console.log(
        `Loading ${tileCoords.length} tiles | zoom ${zoomLevel} ` +
        `(${manualZoomOverride !== null ? 'manual' : 'auto'}) | ` +
        `renderDist ${renderDistanceKm} km | floorY ${floorY.toFixed(1)} | ` +
        `topo ${topographyEnabled ? 'ON' : 'OFF'}`
    );

    const textureLoader = new THREE.TextureLoader();
    await Promise.all(
        tileCoords.map(({ x, y }) =>
            loadTile(x, y, zoomLevel, textureLoader, gpsToCartesian, floorY, baseAlt).catch(() => null)
        )
    );

    rebuildFloorGrid(floorY);
    console.log(`Finished loading tiles.`);
}

// ═══════════════════════════════════════════════════════════════
// Single tile loader
// ═══════════════════════════════════════════════════════════════

async function loadTile(x, y, zoom, textureLoader, gpsToCartesian, floorY, baseAlt) {
    const { tileGroup } = getSceneObjects();
    const url = TILE_SERVICES[currentTileService].url
        .replace('{z}', zoom).replace('{y}', y).replace('{x}', x);

    const tl  = tileToLonLat(x,     y,     zoom);
    const br  = tileToLonLat(x + 1, y + 1, zoom);
    const tlW = gpsToCartesian({ lat: tl.lat, lon: tl.lon });
    const brW = gpsToCartesian({ lat: br.lat, lon: br.lon });

    const w = Math.abs(brW.x - tlW.x);
    const h = Math.abs(brW.z - tlW.z);

    // ── Fetch visual texture and (optionally) elevation in parallel ──
    const [texture, elevData] = await Promise.all([
        loadTextureWithTimeout(textureLoader, url, 5000),
        topographyEnabled && baseAlt !== null ? fetchElevationImageData(x, y, zoom) : Promise.resolve(null),
    ]);

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // ── Build geometry ──
    // Use a subdivided plane when topography is on so we have vertices to displace.
    // Fall back to 1×1 (flat) when topo is off to keep vertex count low.
    const segs = (topographyEnabled && elevData) ? TERRAIN_SEGMENTS : 1;
    const geo  = new THREE.PlaneGeometry(w, h, segs, segs);

    if (topographyEnabled && elevData) {
        displaceVertices(geo, elevData, floorY, baseAlt, segs);
    }

    const mat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: currentOpacity,
    });

    const plane = new THREE.Mesh(geo, mat);
    plane.rotation.x = -Math.PI / 2;

    if (topographyEnabled && elevData) {
        // With displaced vertices the mesh already encodes world-Y per vertex.
        // Position the mesh origin at floorY so the displacement offsets apply correctly.
        plane.position.set((tlW.x + brW.x) / 2, floorY, (tlW.z + brW.z) / 2);
    } else {
        plane.position.set((tlW.x + brW.x) / 2, floorY - 0.1, (tlW.z + brW.z) / 2);
    }

    tileGroup.add(plane);
}

// ═══════════════════════════════════════════════════════════════
// Vertex displacement
// ═══════════════════════════════════════════════════════════════

/**
 * Displaces the Z component of each vertex in a PlaneGeometry (which, after
 * rotation.x = -PI/2, maps to world Y) according to sampled terrain elevation.
 *
 * PlaneGeometry vertex layout (segs×segs grid):
 *   row 0 = top edge  (north, y = +h/2 in local space, z = tile minZ in world)
 *   col 0 = left edge (west,  x = -w/2 in local space, x = tile minX in world)
 *
 * After rotation.x = -PI/2:
 *   local Z  → world Y  (the displacement axis)
 *   local Y  → world -Z
 *
 * So to achieve world Y = (elevation - baseAlt) * ELEVATION_SCALE
 * with the mesh anchored at position.y = floorY:
 *   local Z = (elevation - baseAlt) * ELEVATION_SCALE - floorY
 *
 * @param {THREE.BufferGeometry} geo
 * @param {ImageData}            elevData   Terrarium-encoded elevation tile
 * @param {number}               floorY     world-Y of tile mesh origin
 * @param {number}               baseAlt    baseline altitude (metres) from GPS data
 * @param {number}               segs       PlaneGeometry segment count (same for X and Y)
 */
function displaceVertices(geo, elevData, floorY, baseAlt, segs) {
    const posAttr  = geo.attributes.position;
    const rows     = segs + 1;  // vertex count per axis
    const cols     = segs + 1;
    const imgH     = elevData.height;
    const imgW     = elevData.width;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const vIdx = r * cols + c;

            // Map vertex grid position → elevation image pixel
            // Row 0 of geometry = north (top) of tile = row 0 of elevation image
            const pr = r / (rows - 1) * (imgH - 1);
            const pc = c / (cols - 1) * (imgW - 1);

            const elevMetres = sampleElevation(elevData, pr, pc);

            // Compute local-Z displacement (→ world Y after rotation)
            const worldY  = (elevMetres - baseAlt) * ELEVATION_SCALE;
            const localZ  = worldY - floorY;

            posAttr.setZ(vIdx, localZ);
        }
    }

    posAttr.needsUpdate = true;
    geo.computeVertexNormals(); // smooth lighting across terrain
}

// ═══════════════════════════════════════════════════════════════
// Floor Grid (unchanged)
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
// Public API (unchanged)
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
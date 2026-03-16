import { isTauri, createHandleFromPath } from './tauriFiles.js';


// objectManager.js
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { getGpsToCartesian, getMasterGpsPoints } from './plotManager.js';
import { getSceneObjects } from './sceneManager.js';

import TRASH_SVG    from './assets/trash.svg?raw';
import OBJECT_SVG   from './assets/object.svg?raw';

// ─── Registry ─────────────────────────────────────────────────────────────────
// Map<id, { id, name, mesh, lat, lon, alt, roll, pitch, yaw, scale, opacity, color, visible, expanded }>
const objectRegistry = new Map();
let nextObjectId = 1;

const OBJECT_EXTS = new Set(['stl', 'obj']);

// ─── Loader ───────────────────────────────────────────────────────────────────
async function collectFileHandles(entry) {
    if (entry.kind === 'file') return [entry];
    if (entry.kind === 'directory') {
        const handles = [];
        for await (const child of entry.values()) {
            handles.push(...await collectFileHandles(child));
        }
        return handles;
    }
    return [];
}

async function parseMesh(fileHandle) {
    const file   = await fileHandle.getFile();
    const ext    = file.name.split('.').pop().toLowerCase();
    const buffer = await file.arrayBuffer();

    if (ext === 'stl') {
        const geo = new STLLoader().parse(buffer);
        geo.computeVertexNormals();
        const mat = new THREE.MeshStandardMaterial({ color: 0x99aacc, roughness: 1, metalness: 0.3 });
        return new THREE.Mesh(geo, mat);
    }
    if (ext === 'obj') {
        const text = new TextDecoder().decode(buffer);
        return new OBJLoader().parse(text);
    }
    throw new Error(`Unsupported format: .${ext}`);
}

// ─── Transform ────────────────────────────────────────────────────────────────
function applyTransform(entry) {
    if (!entry.mesh) return;
    const conv = getGpsToCartesian();
    const pos  = conv
        ? conv(entry.lat, entry.lon, entry.alt)
        : new THREE.Vector3(0, 0, 0);

    entry.mesh.position.copy(pos);
    entry.mesh.rotation.set(
        (entry.pitch * Math.PI) / 180,
        (entry.yaw   * Math.PI) / 180,
        (entry.roll  * Math.PI) / 180
    );
    entry.mesh.scale.setScalar(entry.scale);
}

function applyColor(entry) {
    const col = new THREE.Color(entry.color);
    entry.mesh.traverse(child => {
        if (!child.isMesh) return;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(m => { if (m.color) m.color.set(col); });
    });
}

function applyOpacity(entry) {
    const opacity = Math.min(1, Math.max(0, entry.opacity / 100));
    entry.mesh.traverse(child => {
        if (!child.isMesh) return;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(m => {
            m.transparent  = opacity < 1;
            m.opacity      = opacity;
            m.needsUpdate  = true;   // required when toggling transparent flag
        });
    });
}

// ─── Remove ───────────────────────────────────────────────────────────────────
function removeObject(id) {
    const entry = objectRegistry.get(id);
    if (!entry) return;
    const { scene } = getSceneObjects();
    scene.remove(entry.mesh);
    entry.mesh.traverse(child => {
        if (!child.isMesh) return;
        child.geometry?.dispose();
        (Array.isArray(child.material) ? child.material : [child.material])
            .forEach(m => m?.dispose());
    });
    objectRegistry.delete(id);
    renderObjectList();
}

// ─── Input helper ─────────────────────────────────────────────────────────────
function makeNumberInput(entry, key, { step, min, max }, onChange) {
    const input = document.createElement('input');
    input.type  = 'number';
    input.value = entry[key];
    input.step  = step;
    input.min   = min;
    input.max   = max;
    input.style.cssText = `
        width: 100%; box-sizing: border-box;
        background: #111; color: #ddd;
        border: 1px solid #333; border-radius: 2px;
        padding: 3px 5px;
        font-family: inherit; font-size: 1em;
        color-scheme: dark;
        -moz-appearance: textfield;
        appearance: textfield;
    `;
    ensureNoSpinStyle();
    input.addEventListener('input', () => {
        const v = parseFloat(input.value);
        if (!isNaN(v)) {
            entry[key] = v;
            onChange ? onChange(v) : applyTransform(entry);
        }
    });
    input.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.stopPropagation();
    });
    return input;
}

function ensureNoSpinStyle() {
    const id = '__obj-input-no-spin';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = 'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }';
    document.head.appendChild(s);
}

function makeField(labelText, inputEl) {
    const lbl = document.createElement('label');
    lbl.style.cssText = 'display:flex; flex-direction:column; gap:3px; font-size:0.8em; color:#aaa;';
    const span = document.createElement('span');
    span.textContent = labelText;
    lbl.appendChild(span);
    lbl.appendChild(inputEl);
    return lbl;
}

function makeRow(cols, ...fields) {
    const row = document.createElement('div');
    row.className = 'form-row';
    row.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    fields.forEach(f => row.appendChild(f));
    return row;
}

// ─── Render List ──────────────────────────────────────────────────────────────
// Renders object entries into the shared fileListContainer,
// identified by [data-obj-id] so file entries are never touched. make it so the style="display: none" initially
function renderObjectList() {
    const container = document.getElementById('fileListContainer');
    if (!container) return;

    // Remove only our entries
    container.querySelectorAll('[data-obj-id]').forEach(el => el.remove());

    if (objectRegistry.size === 0) {
        container.style.display = "none";
        return;
    }

    // Show container when it has items
    container.style.display = "flex";

    Array.from(objectRegistry.entries()).forEach(([id, entry]) => {
        // ── wrapper ──
        const wrap = document.createElement('div');
        wrap.dataset.objId = id;
        wrap.className = 'file-list-item';
        wrap.style.cssText = `
            border: 1px solid #333; border-radius: 2px;
            background: #1a1a1a;
            overflow: hidden; font-family: inherit;
        `; 


        // ── header ──
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex; align-items: center; gap: 0.5em;
            padding: 0.6em 0.8em;
            cursor: pointer; font-size: 0.85em; color: #e0e0e0;
            user-select: none;
        `;
        header.innerHTML = `
            <span style="flex:1; min-width:0; overflow:hidden; white-space:nowrap;
                         text-overflow:ellipsis;" title="${entry.name}">${entry.name}</span>
            <span class="vis-btn"
                  style="flex-shrink:0; line-height:0; opacity:${entry.visible ? 1 : 0.3};
                         transition:opacity 0.15s ease;"
                  title="Toggle visibility">${OBJECT_SVG}</span>
            <span class="trash-btn"
                  style="flex-shrink:0; line-height:0; color:#88888888;
                         transition:color 0.15s ease;"
                  title="Remove">${TRASH_SVG}</span>
        `;

        // ── panel ──
        const panel = document.createElement('div');
        panel.style.cssText = `
            display: ${entry.expanded ? 'block' : 'none'};
            padding: 0.6em 0.8em 0.8em;
            border-top: 1px solid #2a2a2a;
        `;

        // Row 1 — Roll / Pitch / Yaw
        panel.appendChild(makeRow(3,
            makeField('Roll (°)',  makeNumberInput(entry, 'roll',  { step:'1', min:'-360', max:'360' })),
            makeField('Pitch (°)', makeNumberInput(entry, 'pitch', { step:'1', min:'-360', max:'360' })),
            makeField('Yaw (°)',   makeNumberInput(entry, 'yaw',   { step:'1', min:'-360', max:'360' })),
        ));

        // Row 2 — Lat / Lon / Alt
        panel.appendChild(makeRow(3,
            makeField('Lat',     makeNumberInput(entry, 'lat', { step:'0.000001', min:'-90',   max:'90'     })),
            makeField('Lon',     makeNumberInput(entry, 'lon', { step:'0.000001', min:'-180',  max:'180'    })),
            makeField('Alt (m)', makeNumberInput(entry, 'alt', { step:'1',        min:'-1000', max:'100000' })),
        ));

        // Row 3 — Scale / Opacity / Color
        const colorInput = document.createElement('input');
        colorInput.type  = 'color';
        colorInput.value = entry.color;
        colorInput.className = 'color-picker';
        colorInput.style.cssText = 'width:100%; height:24px;';
        colorInput.addEventListener('input', () => {
            entry.color = colorInput.value;
            applyColor(entry);
        });

        panel.appendChild(makeRow(3,
            makeField('Scale',       makeNumberInput(entry, 'scale',   { step:'0.01', min:'0.0001', max:'100000' })),
            makeField('Opacity (%)', makeNumberInput(entry, 'opacity', { step:'1',    min:'0',      max:'100'    },
                v => { entry.opacity = Math.min(100, Math.max(0, v)); applyOpacity(entry); }
            )),
            makeField('Color', colorInput),
        ));

        // ── interactions ──
        header.addEventListener('click', e => {
            if (e.target.closest('.vis-btn') || e.target.closest('.trash-btn')) return;
            entry.expanded = !entry.expanded;
            panel.style.display = entry.expanded ? 'block' : 'none';
        });

        const visBtn = header.querySelector('.vis-btn');
        visBtn.addEventListener('click', e => {
            e.stopPropagation();
            entry.visible      = !entry.visible;
            entry.mesh.visible = entry.visible;
            visBtn.style.opacity = entry.visible ? 1 : 0.3;
        });

        const trashBtn = header.querySelector('.trash-btn');
        trashBtn.addEventListener('mouseenter', () => trashBtn.style.color = '#e03c3c');
        trashBtn.addEventListener('mouseleave', () => trashBtn.style.color = '#88888888');
        trashBtn.addEventListener('click', e => { e.stopPropagation(); removeObject(id); });

        wrap.appendChild(header);
        wrap.appendChild(panel);
        container.appendChild(wrap);
    });
}

// ─── Seed position ────────────────────────────────────────────────────────────
function getSeedPosition() {
    const pts = getMasterGpsPoints();
    return pts?.length > 0
        ? { lat: pts[0].lat, lon: pts[0].lon, alt: pts[0].alt }
        : { lat: 0, lon: 0, alt: 0 };
}

// ─── Load object from handle ──────────────────────────────────────────────────
async function loadObjectFromHandle(handle) {
    const mesh = await parseMesh(handle);
    const file = await handle.getFile();
    const { scene } = getSceneObjects();

    ensureSceneLights(scene);

    const seed  = getSeedPosition();
    const id    = nextObjectId++;
    const entry = {
        id,
        name:     file.name,
        mesh,
        lat:      seed.lat,
        lon:      seed.lon,
        alt:      seed.alt,
        roll:     0,
        pitch:    0,
        yaw:      0,
        scale:    1.0,
        opacity:  50,
        color:    '#ff4d74',
        visible:  true,
        expanded: true,
    };

    objectRegistry.set(id, entry);
    scene.add(mesh);
    applyTransform(entry);
    applyColor(entry);
    applyOpacity(entry);
    renderObjectList();
}

// ─── Combined file picker ─────────────────────────────────────────────────────
// Opens a single picker for all supported types.
// 3D files are handled here; GPS files are dispatched via 'gpsFilesSelected'.
async function handleCombinedLoad() {
    try {
        const handles = await window.showOpenFilePicker({
            types: [{
                description: 'All Supported Files',
                accept: {
                    'model/*':      ['.stl', '.obj'],
                    'text/plain':   ['.ubx', '.txt', '.csv', '.log', '.ndjson', '.crswap'],
                },
            }],
            multiple: true,
        });

        const gpsHandles = [];
        for (const handle of handles) {
            const file = await handle.getFile();
            const ext  = file.name.split('.').pop().toLowerCase();
            if (OBJECT_EXTS.has(ext)) {
                await loadObjectFromHandle(handle);
            } else {
                gpsHandles.push(handle);
            }
        }

        if (gpsHandles.length > 0) {
            window.dispatchEvent(new CustomEvent('gpsFilesSelected', { detail: gpsHandles }));
        }
    } catch (err) {
        if (err.name !== 'AbortError') console.error('File load failed:', err);
    }
}

// ─── Lights guard ─────────────────────────────────────────────────────────────
let lightsAdded = false;
function ensureSceneLights(scene) {
    if (lightsAdded) return;
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(500, 1000, 500);
    scene.add(dir);
    lightsAdded = true;
}

// ─── Re-apply all transforms after coord-system changes ───────────────────────
export function refreshObjectPositions() {
    objectRegistry.forEach(entry => applyTransform(entry));
}

// ─── Listeners ────────────────────────────────────────────────────────────────


export function setupObjectManagerListeners() {
    const btn = document.getElementById('openFileBtn');
    if (btn) btn.addEventListener('click', handleCombinedLoad);

    if (isTauri()) {
        setupTauriDragDrop();
    } else {
        setupWebDragDrop();
    }
}


// ─── Tauri drag-and-drop ──────────────────────────────────────────────────────
async function setupTauriDragDrop() {
    const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
    const { collectFilePathsRecursive, isDirectory, createHandleFromPath: createHandle }
        = await import('./tauriFiles.js');
    const appWindow = getCurrentWebviewWindow();

    appWindow.onDragDropEvent(async event => {
        const { type } = event.payload;

        if (type === 'enter' || type === 'over') {
            document.body.classList.add('drag-active');
            return;
        }
        if (type === 'leave' || type === 'cancelled') {
            document.body.classList.remove('drag-active');
            return;
        }
        if (type === 'drop') {
            document.body.classList.remove('drag-active');

            const paths = event.payload.paths ?? [];
            if (paths.length === 0) return;

            // Flatten any dropped directories into individual file paths
            const flatPaths = [];
            for (const p of paths) {
                if (await isDirectory(p)) {
                    flatPaths.push(...await collectFilePathsRecursive(p));
                } else {
                    flatPaths.push(p);
                }
            }

            const gpsHandles = [];
            for (const filePath of flatPaths) {
                try {
                    const handle = await createHandle(filePath);
                    const ext    = filePath.split('.').pop().toLowerCase();

                    if (OBJECT_EXTS.has(ext)) {
                        await loadObjectFromHandle(handle);
                    } else {
                        gpsHandles.push(handle);
                    }
                } catch (err) {
                    console.error(`Failed to load dropped file: ${filePath}`, err);
                }
            }

            if (gpsHandles.length > 0) {
                window.dispatchEvent(new CustomEvent('gpsFilesSelected', { detail: gpsHandles }));
            }
        }
    });
}

// ─── Web drag-and-drop (browser / dev server only) ───────────────────────────
function setupWebDragDrop() {
    let dragCounter = 0;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
        window.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); });
    });

    window.addEventListener('dragenter', e => {
        if (e.dataTransfer?.types.includes('Files')) {
            dragCounter++;
            document.body.classList.add('drag-active');
        }
    });

    window.addEventListener('dragleave', () => {
        if (--dragCounter === 0) document.body.classList.remove('drag-active');
    });

    window.addEventListener('drop', async e => {
        dragCounter = 0;
        document.body.classList.remove('drag-active');

        const items = e.dataTransfer?.items;
        if (!items) return;

        // Collect all handles first (flattening any directories)
        const allHandles = [];
        for (const item of items) {
            if (item.kind !== 'file') continue;
            const handle = await item.getAsFileSystemHandle().catch(() => null);
            if (!handle) continue;
            allHandles.push(...await collectFileHandles(handle));
        }

        const gpsHandles = [];
        for (const handle of allHandles) {
            const file = await handle.getFile();
            const ext  = file.name.split('.').pop().toLowerCase();

            if (OBJECT_EXTS.has(ext)) {
                await loadObjectFromHandle(handle);
            } else {
                gpsHandles.push(handle);
            }
        }

        if (gpsHandles.length > 0) {
            window.dispatchEvent(new CustomEvent('gpsFilesSelected', { detail: gpsHandles }));
        }
    });
}
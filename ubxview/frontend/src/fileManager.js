// fileManager.js
import { extractGpsPointsFromText } from "./parser.js";
import { extractAdsbPointsFromText, detectDataFormat } from "./adsbParser.js";
import { isRadarCsv, extractRadarPointsFromText } from "./radarParser.js";
import { updateStats } from "./statsUI.js";
import { plotGpsData, initializeCoordinateSystem, resetCoordinateSystem } from "./plotManager.js";
import { setZoomLevel } from "./tileManager.js";
import { DEFAULTS } from "./config.js";
import {
    startPlayback, pausePlayback, rewind, forward,
    enterPlaybackMode, goLive, setPlaybackLines, setOverlayPoints,
    handleTimeSliderChange, handleSpeedSelection,
    getPlaybackState, protectSliderFromOrbitControls, getAllFileLines,
    updateSliderRange
} from "./playback.js";

// ─── File Registry ────────────────────────────────────────────────────────────
// Map<number, { id, handle, name, type:'nmea'|'adsb'|'radar', readOffset, watcherInterval, isWatcherRunning }>
const fileRegistry = new Map();
let activeFileId = null;
let nextFileId = 1;
let POLLING_RATE_MS = 10;

// ─── Overlay State ────────────────────────────────────────────────────────────
// Set of fileIds whose data is currently overlaid on the active scene
const overlayedFileIds = new Set();

// ─── SVGs ─────────────────────────────────────────────────────────────────────
const EYE_OPEN_SVG = `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 576 512"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 92.9-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.8-35.7-46.1-87.7-92.9-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0zm144-64a64 64 0 1 1 0 128a64 64 0 0 1 0-128z"/></svg>`;
const EYE_CLOSED_SVG = `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 640 512"><path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C261 125.3 289.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L223.1 149.5zM135.5 234.9c-1.8 6.7-2.8 13.7-2.8 21.1c0 79.5 64.5 144 144 144c8.7 0 17.2-.8 25.4-2.2L135.5 234.9zm-40.7-48.4C56.5 226.5 32 264.8 32 268.3c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C171.5 467.2 236.2 504 317 504c50.4 0 96-15 135.2-39.2l-49.2-38.6c-26.8 14.8-57.4 23.8-86 23.8c-80.8 0-145.5-36.8-192.6-80.6c-33.3-31-59.3-66.8-74.9-93.1z"/></svg>`;
const TRASH_SVG = `<svg class="trash-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;
const OVERLAY_SVG = `<svg class="overlay-icon" fill="currentColor" width="14" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M28,8H24V4a2.0023,2.0023,0,0,0-2-2H4A2.0023,2.0023,0,0,0,2,4V22a2.0023,2.0023,0,0,0,2,2H8v4a2.0023,2.0023,0,0,0,2,2H28a2.0023,2.0023,0,0,0,2-2V10A2.0023,2.0023,0,0,0,28,8ZM4,22V4H22V8H10a2.0023,2.0023,0,0,0-2,2V22Zm18,0H19.4141L10,12.586V10h2.5859l9.4153,9.4156ZM10,15.4141,16.5859,22H10ZM22.001,16.587,15.4141,10H22ZM10,28V24H22a2.0023,2.0023,0,0,0,2-2V10h4V28Z"/></svg>`;

// ─── Parse Helper ─────────────────────────────────────────────────────────────

/**
 * Dispatch point extraction based on file type.
 */
function parsePointsByType(text, type) {
    if (type === 'adsb')  return extractAdsbPointsFromText(text);
    if (type === 'radar') return extractRadarPointsFromText(text);
    return extractGpsPointsFromText(text);
}

// ─── Overlay Helpers ──────────────────────────────────────────────────────────

/**
 * Parse points from all currently overlayed files.
 */
async function getOverlayPoints() {
    const pts = [];
    for (const fid of overlayedFileIds) {
        const entry = fileRegistry.get(fid);
        if (!entry) continue;
        try {
            const file = await entry.handle.getFile();
            const text = await file.text();
            pts.push(...parsePointsByType(text, entry.type));
        } catch (err) {
            console.error(`Overlay read failed for file ${fid}:`, err);
        }
    }
    return pts;
}

/**
 * Re-plot the active file's data combined with all overlayed files.
 * Stats DOM only reflects the active file.
 */
async function rerenderWithOverlays() {
    if (!activeFileId) return;
    const entry = fileRegistry.get(activeFileId);
    if (!entry) return;

    try {
        const file = await entry.handle.getFile();
        const text = await file.text();
        const activePts = parsePointsByType(text, entry.type);

        const overlayPts = await getOverlayPoints();
        setOverlayPoints(overlayPts);

        const allPts = [...activePts, ...overlayPts];
        if (allPts.length === 0) return;

        plotGpsData(allPts, false);
        updateStats(allPts, entry.type);
    } catch (err) {
        console.error('rerenderWithOverlays failed:', err);
    }
}

// ─── Remove File ──────────────────────────────────────────────────────────────
function removeFile(fileId) {
    const entry = fileRegistry.get(fileId);
    if (!entry) return;

    if (entry.watcherInterval) clearInterval(entry.watcherInterval);
    overlayedFileIds.delete(fileId);
    fileRegistry.delete(fileId);

    if (fileId === activeFileId) {
        const remaining = [...fileRegistry.keys()];
        if (remaining.length > 0) {
            activeFileId = null;
            switchToFile(remaining[remaining.length - 1]);
        } else {
            activeFileId = null;
            setPlaybackLines([]);
            plotGpsData([]);
            updateStats([], 'nmea');
            resetCoordinateSystem();
            renderFileList();
        }
    } else {
        if (overlayedFileIds.size > 0 || fileId !== activeFileId) {
            rerenderWithOverlays();
        }
        renderFileList();
    }
}

// ─── Public Getter ────────────────────────────────────────────────────────────
export function getActiveFileType() {
    if (!activeFileId) return null;
    return fileRegistry.get(activeFileId)?.type || null;
}

// ─── Render File List ─────────────────────────────────────────────────────────
function renderFileList() {
    const container = document.getElementById('fileListContainer');
    if (!container) return;
    container.innerHTML = '';

    if (fileRegistry.size === 0) {
        container.style.display = 'none';
    } else {
        container.style.display = 'flex';
    }

    const entries = Array.from(fileRegistry.entries());

    entries.forEach(([id, entry], index) => {
        const isActive   = id === activeFileId;
        const isOverlaid = overlayedFileIds.has(id);
        const isLast     = index === entries.length - 1;

        const item = document.createElement('div');
        item.className = isActive ? 'active' : '';
        item.dataset.fileId = id;

        item.style.cssText = `
            display: flex; align-items: center; gap: 0.5rem;
            padding: 0.6em 0.8em;
            border: 1px solid ${isActive ? '#f0f0f0' : isOverlaid ? '#5588cc' : '#333'};
            border-radius: 2px;
            cursor: pointer;
            font-size: 0.85em;
            color: ${isActive ? '#e0e0e0' : '#eee'};
            background: #1a1a1a;
            margin-bottom: ${isLast ? '0' : '5px'};
            user-select: none;
            width: 100%;
            box-sizing: border-box;
            min-width: 0;
            font-family: inherit;
            transition: border 0.2s ease;
        `;

        let htmlContent = `
            <span style="flex:1; min-width:0; overflow:hidden; white-space:nowrap;" title="${entry.name}">
                ${entry.name}
            </span>
            ${
                isActive
                    ? `<span style="flex-shrink:0; opacity:1; line-height:0; margin-left:auto;">
                        ${EYE_OPEN_SVG}
                    </span>`
                    : ""
            }
        `;

        if (!isActive) {
            const overlayColor = isOverlaid ? '#4e9bff' : '#8888884c';
            htmlContent += `
                <span class="overlay-btn" data-overlaid="${isOverlaid}"
                      style="flex-shrink:0; line-height:0; color:${overlayColor}; transition:color 0.15s ease;"
                      title="${isOverlaid ? 'Remove overlay' : 'Overlay onto current scene'}">
                    ${OVERLAY_SVG}
                </span>
                <span class="trash-btn" style="flex-shrink:0; line-height:0; color:#8888884c; transition:color 0.15s ease;" title="Remove">
                    ${TRASH_SVG}
                </span>
            `;
        }

        item.innerHTML = htmlContent;

        item.addEventListener('click', (e) => {
            if (e.target.closest('.trash-btn'))   return;
            if (e.target.closest('.overlay-btn')) return;
            switchToFile(id);
        });

        if (!isActive) {
            const trashBtn = item.querySelector('.trash-btn');
            if (trashBtn) {
                trashBtn.addEventListener('mouseenter', () => { trashBtn.style.color = '#e03c3c'; });
                trashBtn.addEventListener('mouseleave', () => { trashBtn.style.color = '#8888884c'; });
                trashBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    removeFile(id);
                });
            }

            const overlayBtn = item.querySelector('.overlay-btn');
            if (overlayBtn) {
                overlayBtn.addEventListener('mouseenter', () => {
                    if (!overlayedFileIds.has(id)) overlayBtn.style.color = '#4e9bff';
                });
                overlayBtn.addEventListener('mouseleave', () => {
                    overlayBtn.style.color = overlayedFileIds.has(id) ? '#4e9bff' : '#8888884c';
                });
                overlayBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (overlayedFileIds.has(id)) {
                        overlayedFileIds.delete(id);
                    } else {
                        overlayedFileIds.add(id);
                    }
                    renderFileList();
                    await rerenderWithOverlays();
                });
            }
        }

        container.appendChild(item);
    });

    const addBtn = document.getElementById('addFileBtn');
    if (addBtn) {
        addBtn.style.display = fileRegistry.size > 0 ? '' : 'none';
    }

    const openBtn = document.getElementById('openFileBtn');
    if (openBtn && fileRegistry.size > 0) {
        openBtn.style.display = 'none';
    } else if (openBtn) {
        openBtn.style.display = '';
    }
}

// ─── Switch Active File ───────────────────────────────────────────────────────
async function switchToFile(fileId) {
    if (fileId === activeFileId) return;
    const entry = fileRegistry.get(fileId);
    if (!entry) return;

    overlayedFileIds.clear();
    setOverlayPoints([]);

    activeFileId = fileId;
    
    // FIX: Added explicit check for 'radar' type so it uses the correct zoom level (11)
    // instead of defaulting to the rover/NMEA zoom level (17).
    setZoomLevel(
        entry.type === 'adsb' ? DEFAULTS.adsbZoomLevel :
        entry.type === 'radar' ? DEFAULTS.radarZoomLevel :
        DEFAULTS.zoomLevel
    );

    const file = await entry.handle.getFile();
    const text = await file.text();

    // Radar: pass full text as a single "line" so the header is always present
    const allFileLines = entry.type === 'radar'
        ? [text]
        : text.split('\n').filter(l => l.trim());
    setPlaybackLines(allFileLines);

    const pts = parsePointsByType(text, entry.type);

    if (pts.length === 0) {
        plotGpsData([]);
        updateStats([], entry.type);
        renderFileList();
        return;
    }

    initializeCoordinateSystem(pts);
    const plotMetadata = plotGpsData(pts, false);
    updateStats(pts, entry.type);
    renderFileList();

    if (plotMetadata) {
        window.dispatchEvent(new CustomEvent('fileLoaded', { detail: plotMetadata }));
    }
}

// ─── File Watcher ─────────────────────────────────────────────────────────────
async function watchFile(fileId) {
    const entry = fileRegistry.get(fileId);
    if (!entry || !entry.handle || entry.isWatcherRunning) return;

    // Radar files are static exports — no tail-watching needed
    if (entry.type === 'radar') return;

    entry.isWatcherRunning = true;

    try {
        const latestFile = await entry.handle.getFile();
        if (latestFile.size > entry.readOffset) {
            const newText = await latestFile.slice(entry.readOffset).text();
            entry.readOffset = latestFile.size;

            if (newText.length > 0 && fileId === activeFileId) {
                const newLines = newText.split('\n').filter(l => l.trim());
                const updatedLines = [...getAllFileLines(), ...newLines];
                setPlaybackLines(updatedLines);

                if (getPlaybackState().isLiveMode) {
                    goLive();
                } else {
                    updateSliderRange();
                }
            }
        }
    } catch (err) {
        console.error(`Error watching file ${fileId}:`, err);
    } finally {
        entry.isWatcherRunning = false;
    }
}

function startFileWatcher(fileId) {
    const entry = fileRegistry.get(fileId);
    if (!entry || entry.type === 'radar') return; // radar files don't need a watcher
    if (entry.watcherInterval) clearInterval(entry.watcherInterval);
    entry.watcherInterval = setInterval(() => watchFile(fileId), POLLING_RATE_MS);
}

// ─── Open File (auto-detect) ──────────────────────────────────────────────────
export async function openFile(onPlotComplete) {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                accept: { "text/plain": [".txt", ".log", ".csv", ".ubx", ".crswap", ".bin", ".json", ".ndjson"] }
            }],
            multiple: false,
        });
        if (!fileHandle) return false;

        const file = await fileHandle.getFile();
        const text = await file.text();

        // Radar detection takes priority, then ADS-B, then NMEA
        let dataType;
        if (isRadarCsv(text)) {
            dataType = 'radar';
        } else {
            dataType = detectDataFormat(text);
            if (dataType === 'unknown') dataType = 'nmea';
        }

        const fileId = nextFileId++;
        fileRegistry.set(fileId, {
            id: fileId,
            handle: fileHandle,
            name: file.name,
            type: dataType,
            readOffset: file.size,
            watcherInterval: null,
            isWatcherRunning: false,
        });

        overlayedFileIds.clear();
        setOverlayPoints([]);
        activeFileId = fileId;

        setZoomLevel(dataType === 'adsb'  ? DEFAULTS.adsbZoomLevel
           : dataType === 'radar' ? DEFAULTS.radarZoomLevel
           : DEFAULTS.zoomLevel);

        // Radar: treat entire file as one unit for the playback timeline
        const allFileLines = dataType === 'radar'
            ? [text]
            : text.split('\n').filter(l => l.trim());
        setPlaybackLines(allFileLines);

        const pts = parsePointsByType(text, dataType);

        if (pts.length === 0) {
            alert("No valid GPS / ADS-B / Radar points found.");
            plotGpsData([]);
            updateStats([], dataType);
            renderFileList();
            return false;
        }

        initializeCoordinateSystem(pts);
        const plotMetadata = plotGpsData(pts, false);
        updateStats(pts, dataType);
        renderFileList();

        if (onPlotComplete && plotMetadata) {
            onPlotComplete(plotMetadata);
        }

        startFileWatcher(fileId);
        return true;

    } catch (err) {
        if (err.name !== "AbortError") console.error("File selection failed:", err);
        return false;
    }
}

// ─── Listeners ────────────────────────────────────────────────────────────────
export function setupFileManagerListeners() {
    const fireLoaded = (plotMetadata) => {
        window.dispatchEvent(new CustomEvent('fileLoaded', { detail: plotMetadata }));
    };

    const openBtn = document.getElementById("openFileBtn");
    if (openBtn) openBtn.addEventListener("click", () => openFile(fireLoaded));

    const addBtn = document.getElementById("addFileBtn");
    if (addBtn) addBtn.addEventListener("click", () => openFile(fireLoaded));

    const rewindBtn = document.getElementById("rewind");
    if (rewindBtn) rewindBtn.addEventListener("click", rewind);

    const playPauseBtn = document.getElementById("playPause");
    if (playPauseBtn) {
        playPauseBtn.addEventListener("click", () => {
            if (getPlaybackState().isLiveMode) enterPlaybackMode();
            if (getPlaybackState().isPlaying) pausePlayback();
            else startPlayback();
        });
    }

    const forwardBtn = document.getElementById("forward");
    if (forwardBtn) forwardBtn.addEventListener("click", forward);

    const goLiveBtn = document.getElementById("goLive");
    if (goLiveBtn) goLiveBtn.addEventListener("click", goLive);

    const timeSlider = document.getElementById("timeSlider");
    if (timeSlider) {
        timeSlider.addEventListener("input", handleTimeSliderChange);
        protectSliderFromOrbitControls();
    }

    const adjustSpeedButton = document.getElementById('adjustSpeed');
    const speedOptions = document.getElementById('speedOptions');
    if (adjustSpeedButton && speedOptions) {
        adjustSpeedButton.addEventListener('click', (e) => {
            e.stopPropagation();
            speedOptions.classList.toggle('show');
        });
        document.querySelectorAll('.speed-option').forEach(btn => {
            btn.addEventListener('click', handleSpeedSelection);
        });
        window.addEventListener('click', () => speedOptions.classList.remove('show'));
    }
}
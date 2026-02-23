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

// ─── SVGs ─────────────────────────────────────────────────────────────────────
import EYE_OPEN_SVG from './assets/eye-open.svg?raw';
import TRASH_SVG from './assets/trash.svg?raw';
import OVERLAY_SVG from './assets/overlay.svg?raw';

// ─── File Registry ────────────────────────────────────────────────────────────
// Map<number, { id, handle, name, type:'nmea'|'adsb'|'radar', readOffset, watcherInterval, isWatcherRunning }>
const fileRegistry = new Map();
let activeFileId = null;
let nextFileId = 1;
let POLLING_RATE_MS = 10;

// ─── Overlay State ────────────────────────────────────────────────────────────
// Set of fileIds whose data is currently overlaid on the active scene
const overlayedFileIds = new Set();


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
            display: flex; align-items: center; gap: 0.5em;
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
            const overlayColor = isOverlaid ? '#4e9bff' : '#88888888';
            htmlContent += `
                <span class="overlay-btn" data-overlaid="${isOverlaid}"
                      style="flex-shrink:0; line-height:0; color:${overlayColor}; transition:color 0.15s ease;"
                      title="${isOverlaid ? 'Remove overlay' : 'Overlay onto current scene'}">
                    ${OVERLAY_SVG}
                </span>
                <span class="trash-btn" style="flex-shrink:0; line-height:0; color:#88888888; transition:color 0.15s ease;" title="Remove">
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
                trashBtn.addEventListener('mouseleave', () => { trashBtn.style.color = '#88888888'; });
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
                    overlayBtn.style.color = overlayedFileIds.has(id) ? '#4e9bff' : '#88888888';
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
    
    setZoomLevel(null); // let tileManager auto-compute from bounding box

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

        setZoomLevel(null);
        
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
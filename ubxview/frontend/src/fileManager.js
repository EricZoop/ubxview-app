// fileManager.js
import { extractGpsPointsFromText } from "./parser.js";
import { extractAdsbPointsFromText, detectDataFormat } from "./adsbParser.js";
import { updateStats } from "./statsUI.js";
import { plotGpsData, initializeCoordinateSystem, resetCoordinateSystem } from "./plotManager.js";
import { setZoomLevel } from "./tileManager.js";
import { DEFAULTS } from "./config.js";
import {
    startPlayback, pausePlayback, rewind, forward,
    enterPlaybackMode, goLive, setPlaybackLines,
    handleTimeSliderChange, handleSpeedSelection,
    getPlaybackState, protectSliderFromOrbitControls, getAllFileLines,
    updateSliderRange
} from "./playback.js";

// ─── File Registry ──────────────────────────────────────────────
// Map<number, { id, handle, name, type:'nmea'|'adsb', readOffset, watcherInterval, isWatcherRunning }>
const fileRegistry = new Map();
let activeFileId = null;
let nextFileId = 1;
let POLLING_RATE_MS = 10;

// ─── SVGs ───────────────────────────────────────────────────────
const EYE_OPEN_SVG = `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 576 512"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 92.9-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.8-35.7-46.1-87.7-92.9-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0zm144-64a64 64 0 1 1 0 128a64 64 0 0 1 0-128z"/></svg>`;

const EYE_CLOSED_SVG = `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 640 512"><path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C261 125.3 289.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L223.1 149.5zM135.5 234.9c-1.8 6.7-2.8 13.7-2.8 21.1c0 79.5 64.5 144 144 144c8.7 0 17.2-.8 25.4-2.2L135.5 234.9zm-40.7-48.4C56.5 226.5 32 264.8 32 268.3c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C171.5 467.2 236.2 504 317 504c50.4 0 96-15 135.2-39.2l-49.2-38.6c-26.8 14.8-57.4 23.8-86 23.8c-80.8 0-145.5-36.8-192.6-80.6c-33.3-31-59.3-66.8-74.9-93.1z"/></svg>`;

// ─── Public Getter ──────────────────────────────────────────────
export function getActiveFileType() {
    if (!activeFileId) return null;
    return fileRegistry.get(activeFileId)?.type || null;
}

// ─── Render File List ───────────────────────────────────────────
function renderFileList() {
    const container = document.getElementById('fileListContainer');
    if (!container) return;
    container.innerHTML = '';
    
    // Collapse container completely when empty so it takes absolute zero space
    if (fileRegistry.size === 0) {
        container.style.display = 'none';
    } else {
        container.style.display = 'flex';
    }

    // Convert map to array to track index for margin logic
    const entries = Array.from(fileRegistry.entries());

    entries.forEach(([id, entry], index) => {
        const isActive = id === activeFileId;
        const isLast = index === entries.length - 1;
        
        const item = document.createElement('div');
        // REMOVED 'file-list-item' class to prevent CSS hover effects from style.css
        item.className = isActive ? 'active' : ''; 
        item.dataset.fileId = id;
        
        item.style.cssText = `
            display: flex; align-items: center; gap: 0.5rem; 
            padding: 0.6em 0.8em;
            border: 1px solid ${isActive ? '#f0f0f0' : '#333'}; 
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

        // Name on the left, Icon on the right
        item.innerHTML = `
            <span style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${entry.name}">
                ${entry.name}
            </span>
            <span style="flex-shrink: 0; opacity:${isActive ? 1 : 0.3}; line-height: 0; margin-left: auto;">
                ${isActive ? EYE_OPEN_SVG : EYE_CLOSED_SVG}
            </span>
        `;

        item.addEventListener('click', () => switchToFile(id));
        container.appendChild(item);
    });

    // Show the "+" button once at least one file is loaded
    const addBtn = document.getElementById('addFileBtn');
    if (addBtn) {
        if (fileRegistry.size > 0) {
            addBtn.style.display = '';
            // Match styles to the new file list items
            addBtn.style.padding = '0.6em 0.8em';
            addBtn.style.fontSize = '0.85em';
            addBtn.style.boxSizing = 'border-box';
        } else {
            addBtn.style.display = 'none';
        }
    }

    // Swap the initial open button to show the active file name with eye icon
    const openBtn = document.getElementById('openFileBtn');
    if (openBtn && fileRegistry.size > 0) {
        openBtn.style.display = 'none';
    }
}

// ─── Switch Active File ─────────────────────────────────────────
async function switchToFile(fileId) {
    if (fileId === activeFileId) return;
    const entry = fileRegistry.get(fileId);
    if (!entry) return;

    activeFileId = fileId;
    setZoomLevel(entry.type === 'adsb' ? DEFAULTS.adsbZoomLevel : DEFAULTS.zoomLevel);

    const file = await entry.handle.getFile();
    const text = await file.text();
    const allFileLines = text.split('\n').filter(l => l.trim());
    setPlaybackLines(allFileLines);

    const pts = entry.type === 'adsb'
        ? extractAdsbPointsFromText(text)
        : extractGpsPointsFromText(text);

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

// ─── File Watcher ───────────────────────────────────────────────
async function watchFile(fileId) {
    const entry = fileRegistry.get(fileId);
    if (!entry || !entry.handle || entry.isWatcherRunning) return;
    entry.isWatcherRunning = true;

    try {
        const latestFile = await entry.handle.getFile();
        if (latestFile.size > entry.readOffset) {
            const newText = (await latestFile.slice(entry.readOffset).text());
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
    if (!entry) return;
    if (entry.watcherInterval) clearInterval(entry.watcherInterval);
    entry.watcherInterval = setInterval(() => watchFile(fileId), POLLING_RATE_MS);
}

// ─── Open File (auto-detect) ────────────────────────────────────
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
        let dataType = detectDataFormat(text);
        if (dataType === 'unknown') dataType = 'nmea';

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
        activeFileId = fileId;

        setZoomLevel(dataType === 'adsb' ? DEFAULTS.adsbZoomLevel : DEFAULTS.zoomLevel);

        const allFileLines = text.split('\n').filter(l => l.trim());
        setPlaybackLines(allFileLines);

        const pts = dataType === 'adsb'
            ? extractAdsbPointsFromText(text)
            : extractGpsPointsFromText(text);

        if (pts.length === 0) {
            alert("No valid GPS/ADS-B points found.");
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

// ─── Listeners ──────────────────────────────────────────────────
export function setupFileManagerListeners() {
    const fireLoaded = (plotMetadata) => {
        window.dispatchEvent(new CustomEvent('fileLoaded', { detail: plotMetadata }));
    };

    // Initial open button
    const openBtn = document.getElementById("openFileBtn");
    if (openBtn) openBtn.addEventListener("click", () => openFile(fireLoaded));

    // "+" button to add more files
    const addBtn = document.getElementById("addFileBtn");
    if (addBtn) addBtn.addEventListener("click", () => openFile(fireLoaded));

    // Playback controls
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
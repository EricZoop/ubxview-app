// fileManager.js
import { extractGpsPointsFromText } from "./parser.js";
import { isNDJSON, extractAircraftPointsFromText } from "./aircraftParser.js";
import { updateStats } from "./statsUI.js";
import {
    plotGpsData, getMasterGpsPoints,
    initializeCoordinateSystem, resetCoordinateSystem
} from "./plotManager.js";
import {
    startPlayback, pausePlayback, rewind, forward,
    enterPlaybackMode, goLive, setPlaybackLines,
    handleTimeSliderChange, handleSpeedSelection,
    getPlaybackState, protectSliderFromOrbitControls, getAllFileLines,
    updateSliderRange
} from "./playback.js";

// --- Capture registry ---
const captures = {
    1: { handle: null, readOffset: 0, watcherInterval: null, type: null, talkerIds: new Set(), visible: true, points: [] },
    2: { handle: null, readOffset: 0, watcherInterval: null, type: null, talkerIds: new Set(), visible: true, points: [] },
};

let isWatcherRunning = { 1: false, 2: false };
let POLLING_RATE_MS = 10;

// --- Auto-detect file type ---
function detectAndParse(text) {
    if (isNDJSON(text)) {
        return { type: 'adsb', points: extractAircraftPointsFromText(text) };
    }
    return { type: 'rover', points: extractGpsPointsFromText(text) };
}

// --- File Watcher per slot ---
async function watchCapture(slot) {
    const cap = captures[slot];
    if (!cap.handle || isWatcherRunning[slot]) return;
    isWatcherRunning[slot] = true;

    try {
        const file = await cap.handle.getFile();
        if (file.size > cap.readOffset) {
            const slice = file.slice(cap.readOffset);
            const newText = await slice.text();
            cap.readOffset = file.size;

            if (newText.length > 0) {
                const { points: newPoints } = detectAndParse(newText);
                if (newPoints.length > 0) {
                    cap.points.push(...newPoints);
                    newPoints.forEach(p => cap.talkerIds.add(p.talkerId));
                    mergeAndReplot();

                    if (slot === 1 && cap.type === 'rover') {
                        const newLines = newText.split('\n').filter(l => l.trim());
                        const currentLines = getAllFileLines();
                        setPlaybackLines([...currentLines, ...newLines]);
                        if (getPlaybackState().isLiveMode) goLive();
                        else updateSliderRange();
                    }
                }
            }
        }
    } catch (err) {
        console.error(`Watcher error (slot ${slot}):`, err);
    } finally {
        isWatcherRunning[slot] = false;
    }
}

function startWatcher(slot) {
    const cap = captures[slot];
    if (cap.watcherInterval) clearInterval(cap.watcherInterval);
    cap.watcherInterval = setInterval(() => watchCapture(slot), POLLING_RATE_MS);
}

function stopWatcher(slot) {
    const cap = captures[slot];
    if (cap.watcherInterval) clearInterval(cap.watcherInterval);
    cap.watcherInterval = null;
}

// --- Merge all visible captures and replot ---
function mergeAndReplot() {
    const allPoints = [];
    for (const slot of [1, 2]) {
        const cap = captures[slot];
        if (cap.visible && cap.points.length > 0) {
            allPoints.push(...cap.points);
        }
    }
    if (allPoints.length > 0) {
        plotGpsData(allPoints, false);
        updateStats(allPoints);
    }
}

// --- Open capture for a given slot ---
export async function openCapture(slot, onPlotComplete) {
    try {
        const [handle] = await window.showOpenFilePicker({
            types: [{
                accept: {
                    "text/plain": [".txt", ".log", ".csv", ".ubx", ".crswap", ".bin"],
                    "application/json": [".json", ".ndjson"],
                }
            }],
            multiple: false,
        });
        if (!handle) return false;

        const cap = captures[slot];
        cap.handle = handle;
        cap.readOffset = 0;
        cap.talkerIds = new Set();
        cap.points = [];

        const file = await handle.getFile();
        const text = await file.text();
        const { type, points } = detectAndParse(text);

        cap.type = type;
        cap.points = points;
        cap.readOffset = file.size;
        cap.visible = true;
        points.forEach(p => cap.talkerIds.add(p.talkerId));

        // Update UI
        updateCaptureUI(slot, file.name);

        if (points.length === 0) {
            alert("No valid data points found in file.");
            return false;
        }

        // Playback: only for slot 1 rover data
        if (slot === 1 && type === 'rover') {
            const allLines = text.split('\n').filter(l => l.trim());
            setPlaybackLines(allLines);
        }

        // Build coordinate system from ALL loaded points
        const allPoints = [];
        for (const s of [1, 2]) {
            if (captures[s].points.length > 0) allPoints.push(...captures[s].points);
        }
        initializeCoordinateSystem(allPoints);

        const plotMetadata = plotGpsData(allPoints, false);
        updateStats(allPoints);

        if (onPlotComplete && plotMetadata) onPlotComplete(plotMetadata);

        startWatcher(slot);
        return true;

    } catch (err) {
        if (err.name !== "AbortError") console.error(`File selection failed (slot ${slot}):`, err);
        return false;
    }
}

// --- UI helpers ---
function updateCaptureUI(slot, filename) {
    const inputLabel = document.getElementById(`capture${slot}InputLabel`);
    const loadedDiv = document.getElementById(`capture${slot}-loaded`);
    const nameSpan = document.getElementById(`capture${slot}-name`);

    if (inputLabel) inputLabel.style.display = 'none';
    if (loadedDiv) loadedDiv.classList.add('visible');
    if (nameSpan) nameSpan.textContent = filename;

    // After slot 1 loads, reveal slot 2
    if (slot === 1) {
        const slot2 = document.getElementById('capture2-slot');
        if (slot2) slot2.style.display = '';
    }
}

function toggleCaptureVisibility(slot) {
    const cap = captures[slot];
    cap.visible = !cap.visible;

    const btn = document.getElementById(`capture${slot}-eye`);
    if (btn) {
        btn.classList.toggle('hidden-state', !cap.visible);
    }

    mergeAndReplot();
}

export function closeCapture(slot) {
    stopWatcher(slot);
    const cap = captures[slot];
    cap.handle = null;
    cap.readOffset = 0;
    cap.type = null;
    cap.talkerIds = new Set();
    cap.points = [];
    cap.visible = true;
    isWatcherRunning[slot] = false;

    if (slot === 1) {
        pausePlayback();
        resetCoordinateSystem();
    }
}

export function getCaptureInfo(slot) {
    return captures[slot];
}

// --- Listeners ---
export function setupFileManagerListeners() {
    document.getElementById("capture1InputLabel")?.addEventListener("click", () => {
        openCapture(1, (meta) => {
            window.dispatchEvent(new CustomEvent('fileLoaded', { detail: meta }));
        });
    });

    document.getElementById("capture2InputLabel")?.addEventListener("click", () => {
        openCapture(2, (meta) => {
            window.dispatchEvent(new CustomEvent('fileLoaded', { detail: meta }));
        });
    });

    // Eye toggles
    document.getElementById("capture1-eye")?.addEventListener("click", () => toggleCaptureVisibility(1));
    document.getElementById("capture2-eye")?.addEventListener("click", () => toggleCaptureVisibility(2));

    // Playback controls
    document.getElementById("rewind")?.addEventListener("click", rewind);

    const playPauseBtn = document.getElementById("playPause");
    if (playPauseBtn) {
        playPauseBtn.addEventListener("click", () => {
            if (getPlaybackState().isLiveMode) enterPlaybackMode();
            if (getPlaybackState().isPlaying) pausePlayback();
            else startPlayback();
        });
    }

    document.getElementById("forward")?.addEventListener("click", forward);
    document.getElementById("goLive")?.addEventListener("click", goLive);

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
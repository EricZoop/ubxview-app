// fileManager.js
import { extractGpsPointsFromText } from "./parser.js";
import { updateStats } from "./statsUI.js"
import { plotGpsData, getMasterGpsPoints, initializeCoordinateSystem, resetCoordinateSystem } from "./plotManager.js";
import {
    startPlayback, pausePlayback, rewind, forward,
    enterPlaybackMode, goLive, setPlaybackLines,
    handleTimeSliderChange, handleSpeedSelection,
    getPlaybackState, protectSliderFromOrbitControls, getAllFileLines
} from "./playback.js";

// File state
let currentFile = null;
let readOffset = 0;
let fileWatcherInterval = null;
let POLLING_RATE_MS = 10;
let fileHandle = null;
let isWatcherRunning = false;

// --- File Watcher ---
async function watchFileForChanges() {
    if (!fileHandle || isWatcherRunning) return;
    
    isWatcherRunning = true;

    try {
        const latestFile = await fileHandle.getFile();
        
        if (latestFile.size > readOffset) {
            const fileSlice = latestFile.slice(readOffset);
            const newText = await fileSlice.text();
            readOffset = latestFile.size;

            if (newText.length > 0) {
                const newLines = newText.split('\n').filter(line => line.trim());
                const masterPoints = extractGpsPointsFromText(newText);

                const currentLines = getAllFileLines();
                setPlaybackLines([...currentLines, ...newLines]);

                if (masterPoints && masterPoints.length > 0) {
                    plotGpsData(masterPoints, true);
                    updateStats(getMasterGpsPoints());
                }
            }
        }
    } catch (err) {
        console.error("Error watching file:", err);
    } finally {
        isWatcherRunning = false;
    }
}

function startFileWatcher() {
    if (fileWatcherInterval) clearInterval(fileWatcherInterval);
    fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
}

function stopFileWatcher() {
    if (fileWatcherInterval) clearInterval(fileWatcherInterval);
    fileWatcherInterval = null;
}

// --- File Operations ---
export async function openFile(onPlotComplete) {
    try {
        [fileHandle] = await window.showOpenFilePicker({
            types: [{ accept: { "text/plain": [".txt", ".log", ".csv", ".ubx"] } }],
            multiple: false,
        });

        if (!fileHandle) return false;
        const file = await fileHandle.getFile();
        currentFile = file;
        readOffset = 0;

        const fileLabel = document.getElementById("fileLabel");
        if (fileLabel) fileLabel.innerHTML = file.name;

        const initialText = await file.text();
        const allFileLines = initialText.split('\n').filter(line => line.trim());
        const masterGpsPoints = extractGpsPointsFromText(initialText);

        setPlaybackLines(allFileLines, masterGpsPoints);
        readOffset = file.size;

        if (masterGpsPoints.length === 0) {
            alert("No valid GPS points found.");
            plotGpsData([]);
            updateStats([]);
            return false;
        }

        initializeCoordinateSystem(masterGpsPoints);
        const plotMetadata = plotGpsData(masterGpsPoints, false);
        updateStats(masterGpsPoints);

        if (onPlotComplete && plotMetadata) {
            onPlotComplete(plotMetadata);
        }

        startFileWatcher();
        return true;

    } catch (err) {
        if (err.name !== "AbortError") console.error("File selection failed:", err);
        return false;
    }
}

export function closeFile() {
    stopFileWatcher();
    pausePlayback();
    resetCoordinateSystem();
    currentFile = null;
    readOffset = 0;
    fileHandle = null;
    isWatcherRunning = false;

    const fileLabel = document.getElementById("fileLabel");
    if (fileLabel) fileLabel.innerHTML = "No file selected";
}

// --- Listeners ---
export function setupFileManagerListeners() {
    const fileInputLabel = document.getElementById("fileInputLabel");
    if (fileInputLabel) {
        fileInputLabel.addEventListener("click", () => {
            openFile((plotMetadata) => {
                window.dispatchEvent(new CustomEvent('fileLoaded', { detail: plotMetadata }));
            });
        });
    }

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
// playback.js
import { extractGpsPointsFromText } from "./parser.js";
import { updateStats } from "./statsUI.js"
import { plotGpsData } from "./plotManager.js";

// Playback state
let allFileLines = [];
let currentLineIndex = 0;
let isPlaying = false;
let isLiveMode = true;
let playbackInterval = null;
let totalGpsPoints = [];
let currentPlaybackSpeed = 1.0;

const BASE_PLAYBACK_SPEED_MS = 100;
const SEEK_LINES = 100;


// ----------------- Getters/Setters -----------------
export function getPlaybackSpeed() {
    return currentPlaybackSpeed;
}

export function setPlaybackSpeed(speed) {
    const oldSpeed = currentPlaybackSpeed;
    currentPlaybackSpeed = speed;

    console.log(`Playback speed changed from ${oldSpeed}x to ${speed}x`);

    if (isPlaying && playbackInterval) {
        clearInterval(playbackInterval);
        startPlaybackInterval();
    }
    updateSpeedDisplay();
}

export function getPlaybackState() {
    return {
        isLiveMode,
        isPlaying,
        currentLineIndex,
        totalLines: allFileLines.length,
        progress: allFileLines.length > 0 ? currentLineIndex / (allFileLines.length - 1) : 0,
        playbackSpeed: currentPlaybackSpeed
    };
}

// ----------------- Core Playback -----------------
function getCurrentPlaybackInterval() {
    return BASE_PLAYBACK_SPEED_MS / currentPlaybackSpeed;
}

function startPlaybackInterval() {
    // FIX: If user is at the very end and hits play, reset to start.
    // Otherwise, start from EXACTLY where the slider is.
    if (currentLineIndex >= allFileLines.length - 1) {
        currentLineIndex = 0;
    }

    playbackInterval = setInterval(() => {
        if (currentLineIndex < allFileLines.length - 1) {
            currentLineIndex++;
            updateTimeSlider();
            updatePlotToCurrentPosition();
        } else {
            pausePlayback();
        }
    }, getCurrentPlaybackInterval());
}

export function startPlayback() {
    if (playbackInterval) clearInterval(playbackInterval);
    isPlaying = true;
    updatePlayPauseButton();
    startPlaybackInterval();
}

export function pausePlayback() {
    if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
    }
    isPlaying = false;
    updatePlayPauseButton();
}

export function rewind() {
    if (isLiveMode) enterPlaybackMode();
    currentLineIndex = Math.max(0, currentLineIndex - SEEK_LINES);
    updateTimeSlider();
    updatePlotToCurrentPosition();
}

export function forward() {
    if (isLiveMode) enterPlaybackMode();
    currentLineIndex = Math.min(allFileLines.length - 1, currentLineIndex + SEEK_LINES);
    updateTimeSlider();
    updatePlotToCurrentPosition();
}

export function enterPlaybackMode() {
    isLiveMode = false;
    updateGoLiveButton();
}

export function goLive() {
    isLiveMode = true;
    pausePlayback();
    currentLineIndex = allFileLines.length - 1;
    updateTimeSlider();
    updateGoLiveButton();
    updatePlotToCurrentPosition();
}

let cachedPointsPerLine = [];

export function setPlaybackLines(lines, totalPoints = []) {
    allFileLines = lines;
    // FIX: Pre-cache points immediately so they are ready for the first slider move
    cachedPointsPerLine = lines.map(line => extractGpsPointsFromText(line) || []);
    
    // Set to the end for "Live" start
    currentLineIndex = Math.max(0, allFileLines.length - 1);
    
    // Ensure the UI slider max value matches the new file length
    updateTimeSlider();
}

export function getAllFileLines() {
    return allFileLines;
}

// NEW: Function to update slider range when file grows
export function updateSliderRange() {
    const slider = document.getElementById("timeSlider");
    if (slider && allFileLines.length > 0) {
        slider.max = allFileLines.length - 1;
        // Only update value if we're in live mode
        if (isLiveMode) {
            slider.value = allFileLines.length - 1;
            currentLineIndex = allFileLines.length - 1;
        }
    }
}

// ----------------- UI Helpers -----------------
function updatePlotToCurrentPosition() {
    const pointsUpToCurrent = [];
    // Only loop if we have lines to process
    for (let i = 0; i <= currentLineIndex; i++) {
        const points = cachedPointsPerLine[i];
        if (points && points.length > 0) {
            pointsUpToCurrent.push(...points);
        }
    }
    
    // Use the non-append version (false) to redraw the path up to this point
    plotGpsData(pointsUpToCurrent, false);
    updateStats(pointsUpToCurrent);
}

function updateTimeSlider() {
    const slider = document.getElementById("timeSlider");
    if (slider && allFileLines.length > 0) {
        slider.max = allFileLines.length - 1;
        slider.value = currentLineIndex;
    }
}

function updatePlayPauseButton() {
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");
    if (isPlaying) {
        if (playIcon) playIcon.style.display = "none";
        if (pauseIcon) pauseIcon.style.display = "inline";
    } else {
        if (playIcon) playIcon.style.display = "inline";
        if (pauseIcon) pauseIcon.style.display = "none";
    }
}

function updateGoLiveButton() {
    const goLiveBtn = document.getElementById("goLive");
    if (goLiveBtn) {
        goLiveBtn.style.opacity = isLiveMode ? "0.5" : "1.0";
        goLiveBtn.disabled = isLiveMode;
    }
}

function updateSpeedDisplay() {
    const speedDisplay = document.getElementById('currentSpeedDisplay');
    if (speedDisplay) speedDisplay.textContent = `${currentPlaybackSpeed}x`;

    document.querySelectorAll('.speed-option').forEach(btn => {
        const btnSpeed = parseFloat(btn.dataset.speed);
        if (btnSpeed === currentPlaybackSpeed) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ----------------- Event Handlers -----------------
export function handleTimeSliderChange(event) {
    // If the user moves the slider, we naturally exit "Live" mode
    if (isLiveMode) {
        enterPlaybackMode();
    }

    currentLineIndex = parseInt(event.target.value);
    
    // Update the visual plot immediately
    updatePlotToCurrentPosition();

    // REMOVED: The forced startPlayback() call. 
    // It will now remain paused if it was already paused.
}

export function handleSpeedSelection(event) {
    const speed = parseFloat(event.target.dataset.speed);
    if (!isNaN(speed) && speed > 0) {
        setPlaybackSpeed(speed);
        console.log(`Speed selected: ${speed}x`);

        const speedOptions = document.getElementById('speedOptions');
        if (speedOptions) speedOptions.classList.remove('show');
    }
}

// --- Attach protection to slider so orbitControls don't move the scene ---
export function protectSliderFromOrbitControls() {
    const timeSlider = document.getElementById("timeSlider");
    if (timeSlider) {
        ['mousedown','mousemove','mouseup','click'].forEach(evt => {
            timeSlider.addEventListener(evt, e => e.stopPropagation());
        });
        timeSlider.addEventListener("input", handleTimeSliderChange);
    }
}
// playback.js
import { extractGpsPointsFromText } from "./parser.js";
import { extractAdsbPointsFromText } from "./adsbParser.js";
import { getActiveFileType } from "./fileManager.js";
import { updateStats } from "./statsUI.js";
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
export function getPlaybackSpeed() { return currentPlaybackSpeed; }

export function setPlaybackSpeed(speed) {
    const old = currentPlaybackSpeed;
    currentPlaybackSpeed = speed;
    console.log(`Playback speed changed from ${old}x to ${speed}x`);
    if (isPlaying && playbackInterval) {
        clearInterval(playbackInterval);
        startPlaybackInterval();
    }
    updateSpeedDisplay();
}

export function getPlaybackState() {
    return {
        isLiveMode, isPlaying, currentLineIndex,
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
    if (currentLineIndex >= allFileLines.length - 1) currentLineIndex = 0;

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
    if (playbackInterval) { clearInterval(playbackInterval); playbackInterval = null; }
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

    // Use the correct parser for the active file type
    const type = getActiveFileType();
    cachedPointsPerLine = lines.map(line => {
        if (type === 'adsb') return extractAdsbPointsFromText(line) || [];
        return extractGpsPointsFromText(line) || [];
    });

    currentLineIndex = Math.max(0, allFileLines.length - 1);
    updateTimeSlider();
}

export function getAllFileLines() { return allFileLines; }

export function updateSliderRange() {
    const slider = document.getElementById("timeSlider");
    if (slider && allFileLines.length > 0) {
        slider.max = allFileLines.length - 1;
        if (isLiveMode) {
            slider.value = allFileLines.length - 1;
            currentLineIndex = allFileLines.length - 1;
        }
    }
}

// ----------------- UI Helpers -----------------
function updatePlotToCurrentPosition() {
    const pointsUpToCurrent = [];
    const type = getActiveFileType();
    for (let i = 0; i <= currentLineIndex; i++) {
        const points = cachedPointsPerLine[i];
        if (points && points.length > 0) pointsUpToCurrent.push(...points);
    }
    plotGpsData(pointsUpToCurrent, false);
    updateStats(pointsUpToCurrent, type);
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
    const btn = document.getElementById("goLive");
    if (btn) { btn.style.opacity = isLiveMode ? "0.5" : "1.0"; btn.disabled = isLiveMode; }
}

function updateSpeedDisplay() {
    const d = document.getElementById('currentSpeedDisplay');
    if (d) d.textContent = `${currentPlaybackSpeed}x`;
    document.querySelectorAll('.speed-option').forEach(btn => {
        btn.classList.toggle('active', parseFloat(btn.dataset.speed) === currentPlaybackSpeed);
    });
}

// ----------------- Event Handlers -----------------
export function handleTimeSliderChange(event) {
    if (isLiveMode) enterPlaybackMode();
    currentLineIndex = parseInt(event.target.value);
    updatePlotToCurrentPosition();
}

export function handleSpeedSelection(event) {
    const speed = parseFloat(event.target.dataset.speed);
    if (!isNaN(speed) && speed > 0) {
        setPlaybackSpeed(speed);
        const opts = document.getElementById('speedOptions');
        if (opts) opts.classList.remove('show');
    }
}

export function protectSliderFromOrbitControls() {
    const s = document.getElementById("timeSlider");
    if (s) {
        ['mousedown','mousemove','mouseup','click'].forEach(evt => {
            s.addEventListener(evt, e => e.stopPropagation());
        });
        s.addEventListener("input", handleTimeSliderChange);
    }
}
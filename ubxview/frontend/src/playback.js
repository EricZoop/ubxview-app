// playback.js
import { extractGpsPointsFromText } from "./parser.js";
import { extractAdsbPointsFromText } from "./adsbParser.js";
import { getActiveFileType } from "./fileManager.js";
import { updateStats } from "./statsUI.js";
import { plotGpsData } from "./plotManager.js";

// ─── State ────────────────────────────────────────────────────────────────────
let allFileLines = [];
let cachedPointsPerLine = [];          // raw per-line parse cache (still used by watcher)
let allActiveSortedPoints = [];        // flat, time-sorted points from the active file
let overlayPoints = [];                // pre-parsed points from overlaid files

let currentPointIndex = 0;
let isPlaying = false;
let isLiveMode = true;
let playbackInterval = null;
let currentPlaybackSpeed = 1.0;

const BASE_PLAYBACK_SPEED_MS = 100;
const SEEK_POINTS = 100;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Rebuild allActiveSortedPoints from the cached per-line arrays. */
function rebuildSortedTimeline() {
    const flat = [];
    for (const pts of cachedPointsPerLine) {
        if (pts && pts.length) flat.push(...pts);
    }
    allActiveSortedPoints = flat.sort((a, b) => a.time - b.time);
}

// ─── Getters / Setters ────────────────────────────────────────────────────────

export function getPlaybackSpeed()         { return currentPlaybackSpeed; }
export function getAllFileLines()           { return allFileLines; }

export function setPlaybackSpeed(speed) {
    const old = currentPlaybackSpeed;
    currentPlaybackSpeed = speed;
    console.log(`Playback speed ${old}x → ${speed}x`);
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
        currentPointIndex,
        totalLines: allFileLines.length,
        totalPoints: allActiveSortedPoints.length,
        progress: allActiveSortedPoints.length > 0
            ? currentPointIndex / (allActiveSortedPoints.length - 1)
            : 0,
        playbackSpeed: currentPlaybackSpeed,
    };
}

/**
 * Provide pre-parsed overlay points so the playback scrubber can time-filter them.
 * Called by fileManager whenever overlays change.
 * @param {Array} pts - Combined points from all currently overlaid files.
 */
export function setOverlayPoints(pts) {
    overlayPoints = pts || [];
}

// ─── Line / Timeline Management ───────────────────────────────────────────────

export function setPlaybackLines(lines) {
    allFileLines = lines;
    const type = getActiveFileType();

    cachedPointsPerLine = lines.map(line => {
        if (type === 'adsb') return extractAdsbPointsFromText(line) || [];
        return extractGpsPointsFromText(line) || [];
    });

    rebuildSortedTimeline();
    currentPointIndex = Math.max(0, allActiveSortedPoints.length - 1);
    updateTimeSlider();
}

export function updateSliderRange() {
    const slider = document.getElementById("timeSlider");
    if (slider && allActiveSortedPoints.length > 0) {
        slider.max = allActiveSortedPoints.length - 1;
        if (isLiveMode) {
            currentPointIndex = allActiveSortedPoints.length - 1;
            slider.value = currentPointIndex;
        }
    }
}

// ─── Core Playback ────────────────────────────────────────────────────────────

function getCurrentPlaybackInterval() {
    return BASE_PLAYBACK_SPEED_MS / currentPlaybackSpeed;
}

function startPlaybackInterval() {
    if (currentPointIndex >= allActiveSortedPoints.length - 1) currentPointIndex = 0;

    playbackInterval = setInterval(() => {
        if (currentPointIndex < allActiveSortedPoints.length - 1) {
            currentPointIndex++;
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
    currentPointIndex = Math.max(0, currentPointIndex - SEEK_POINTS);
    updateTimeSlider();
    updatePlotToCurrentPosition();
}

export function forward() {
    if (isLiveMode) enterPlaybackMode();
    currentPointIndex = Math.min(allActiveSortedPoints.length - 1, currentPointIndex + SEEK_POINTS);
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
    currentPointIndex = Math.max(0, allActiveSortedPoints.length - 1);
    updateTimeSlider();
    updateGoLiveButton();
    updatePlotToCurrentPosition();
}

// ─── Plot / Stats Update ──────────────────────────────────────────────────────

function updatePlotToCurrentPosition() {
    const type = getActiveFileType();
    const activePts = allActiveSortedPoints.slice(0, currentPointIndex + 1);

    let combinedPts = activePts;

    if (overlayPoints.length > 0) {
        // Show overlay points whose timestamp is <= current active time
        const currentTime = allActiveSortedPoints[currentPointIndex]?.time ?? Infinity;
        const visibleOverlay = overlayPoints.filter(p => p.time <= currentTime);
        combinedPts = [...activePts, ...visibleOverlay];
    }

    plotGpsData(combinedPts, false);
    // Pass all visible points to stats so overlay talkers get their own panels
    updateStats(combinedPts, type);
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

function updateTimeSlider() {
    const slider = document.getElementById("timeSlider");
    if (slider && allActiveSortedPoints.length > 0) {
        slider.max = allActiveSortedPoints.length - 1;
        slider.value = currentPointIndex;
    }
}

function updatePlayPauseButton() {
    const playIcon  = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");
    if (isPlaying) {
        if (playIcon)  playIcon.style.display  = "none";
        if (pauseIcon) pauseIcon.style.display = "inline";
    } else {
        if (playIcon)  playIcon.style.display  = "inline";
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

// ─── Event Handlers ───────────────────────────────────────────────────────────

export function handleTimeSliderChange(event) {
    if (isLiveMode) enterPlaybackMode();
    currentPointIndex = parseInt(event.target.value);
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
        ['mousedown', 'mousemove', 'mouseup', 'click'].forEach(evt => {
            s.addEventListener(evt, e => e.stopPropagation());
        });
        s.addEventListener("input", handleTimeSliderChange);
    }
}
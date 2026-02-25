// playback.js
import { extractGpsPointsFromText } from "./parser.js";
import { extractAdsbPointsFromText } from "./adsbParser.js";
import { extractRadarPointsFromText } from "./radarParser.js";
import { getActiveFileType } from "./fileManager.js";
import { updateStats } from "./statsUI.js";
import { plotGpsData } from "./plotManager.js";

// ─── State ────────────────────────────────────────────────────────────────────
let allFileLines = [];
let cachedPointsPerLine = [];
let allActiveSortedPoints = [];
let overlayPoints = [];

let currentPointIndex = 0;
let isPlaying = false;
let isLiveMode = true;
let playbackTimer = null;
let currentPlaybackSpeed = 1.0;

const FALLBACK_INTERVAL_MS = 100;
const SEEK_POINTS = 100;

// ─── Timestamp Normalisation ───────────────────────────────────────────────────
/**
 * Convert a raw `point.time` value to milliseconds (JS Date-compatible).
 *
 * Parsers may store time as:
 *   • Unix milliseconds  (~1.7 × 10¹²)  → use as-is
 *   • Unix seconds       (~1.7 × 10⁹)   → multiply × 1000
 *   • Seconds of day     (0 – 86 400)    → add today's UTC midnight offset
 *
 * Threshold: anything below 1 × 10¹⁰ is treated as seconds.
 */
function normalizeTs(ts) {
    if (ts == null || ts === 0) return null;
    return ts < 1e10 ? ts * 1000 : ts;   // seconds → ms  |  ms → ms
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rebuildSortedTimeline() {
    const flat = [];
    for (const pts of cachedPointsPerLine) {
        if (pts && pts.length) flat.push(...pts);
    }
    // Sort by normalised timestamp so the timeline is always wall-clock order
    allActiveSortedPoints = flat.sort((a, b) => {
        const ta = normalizeTs(a.time) ?? Infinity;
        const tb = normalizeTs(b.time) ?? Infinity;
        return ta - tb;
    });
}

function formatTimestamp(ts) {
    const ms = normalizeTs(ts);
    if (!ms) return "--:--:--";
    const date = new Date(ms);
    return date.toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

/**
 * Wall-clock delay (ms) before the *next* point should appear, scaled by speed.
 * Uses normalised timestamps so the unit mismatch can't affect it.
 */
function delayToNextPoint(idx) {
    const curMs  = normalizeTs(allActiveSortedPoints[idx]?.time);
    const nextMs = normalizeTs(allActiveSortedPoints[idx + 1]?.time);
    if (curMs != null && nextMs != null && nextMs > curMs) {
        return Math.max(0, (nextMs - curMs) / currentPlaybackSpeed);
    }
    return FALLBACK_INTERVAL_MS / currentPlaybackSpeed;
}

// ─── Getters / Setters ────────────────────────────────────────────────────────

export function getPlaybackSpeed() { return currentPlaybackSpeed; }
export function getAllFileLines()   { return allFileLines; }

export function setPlaybackSpeed(speed) {
    currentPlaybackSpeed = speed;
    if (isPlaying) { cancelTimer(); scheduleNextPoint(); }
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

export function setOverlayPoints(pts) { overlayPoints = pts || []; }

// ─── Line / Timeline Management ───────────────────────────────────────────────

export function setPlaybackLines(lines) {
    allFileLines = lines;
    const type = getActiveFileType();

    if (type === 'radar') {
        const fullText = lines.join('\n');
        cachedPointsPerLine = [extractRadarPointsFromText(fullText) || []];
    } else {
        cachedPointsPerLine = lines.map(line => {
            if (type === 'adsb') return extractAdsbPointsFromText(line) || [];
            return extractGpsPointsFromText(line) || [];
        });
    }

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

function cancelTimer() {
    if (playbackTimer !== null) { clearTimeout(playbackTimer); playbackTimer = null; }
}

function scheduleNextPoint() {
    if (!isPlaying) return;
    if (currentPointIndex >= allActiveSortedPoints.length - 1) { pausePlayback(); return; }

    const delay = delayToNextPoint(currentPointIndex);

    playbackTimer = setTimeout(() => {
        if (!isPlaying) return;
        currentPointIndex++;
        updateTimeSlider();
        updatePlotToCurrentPosition();
        scheduleNextPoint();
    }, delay);
}

export function startPlayback() {
    cancelTimer();
    if (currentPointIndex >= allActiveSortedPoints.length - 1) currentPointIndex = 0;
    isPlaying = true;
    updatePlayPauseButton();
    scheduleNextPoint();
}

export function pausePlayback() {
    cancelTimer();
    isPlaying = false;
    updatePlayPauseButton();
}

export function rewind() {
    if (isLiveMode) enterPlaybackMode();
    currentPointIndex = Math.max(0, currentPointIndex - SEEK_POINTS);
    updateTimeSlider();
    updatePlotToCurrentPosition();
    if (isPlaying) { cancelTimer(); scheduleNextPoint(); }
}

export function forward() {
    if (isLiveMode) enterPlaybackMode();
    currentPointIndex = Math.min(allActiveSortedPoints.length - 1, currentPointIndex + SEEK_POINTS);
    updateTimeSlider();
    updatePlotToCurrentPosition();
    if (isPlaying) { cancelTimer(); scheduleNextPoint(); }
}

export function enterPlaybackMode() { isLiveMode = false; updateGoLiveButton(); }

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
        const currentTime = normalizeTs(allActiveSortedPoints[currentPointIndex]?.time) ?? Infinity;
        const visibleOverlay = overlayPoints.filter(p => (normalizeTs(p.time) ?? Infinity) <= currentTime);
        combinedPts = [...activePts, ...visibleOverlay];
    }

    plotGpsData(combinedPts, false);
    updateStats(combinedPts, type);
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

function updateTimeSlider() {
    const slider      = document.getElementById("timeSlider");
    const timeDisplay = document.getElementById("timeDisplay");

    if (allActiveSortedPoints.length > 0) {
        const maxIndex = allActiveSortedPoints.length - 1;
        if (slider) { slider.max = maxIndex; slider.value = currentPointIndex; }
        if (timeDisplay) {
            const curTs = allActiveSortedPoints[currentPointIndex]?.time;
            const endTs = allActiveSortedPoints[maxIndex]?.time;
            timeDisplay.textContent = `${formatTimestamp(curTs)}`;
            //timeDisplay.textContent = `${formatTimestamp(curTs)} / ${formatTimestamp(endTs)}`;
        }
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
    updateTimeSlider();
    updatePlotToCurrentPosition();
    if (isPlaying) { cancelTimer(); scheduleNextPoint(); }
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
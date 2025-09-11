// FILE HANDLING AND WATCHING WITH PLAYBACK CONTROLS

import { extractGpsPointsFromText, extractGpsPoints, isUbxData, updateStats } from "./parser.js";
import { plotGpsData, getMasterGpsPoints, initializeCoordinateSystem, resetCoordinateSystem } from "./plotManager.js";

// Module state
let currentFile = null;
let readOffset = 0;
let fileWatcherInterval = null;
let POLLING_RATE_MS = 10;
let fileHandle = null;
let isUbxFile = false; // Track if current file is UBX format

// Playback state
let allFileLines = [];
let allFileData = null; // For binary UBX files
let currentLineIndex = 0;
let isPlaying = false;
let isLiveMode = true;
let playbackInterval = null;
let totalGpsPoints = [];
let currentPlaybackSpeed = 1.0; // Default speed multiplier
const BASE_PLAYBACK_SPEED_MS = 100; // Base: 0.10 seconds per line
const SEEK_LINES = 100; // Rewind/forward by 100 lines

/**
 * Get the current playback speed multiplier
 * @returns {number} Current speed multiplier
 */
export function getPlaybackSpeed() {
    return currentPlaybackSpeed;
}

/**
 * Set the playback speed multiplier
 * @param {number} speed - Speed multiplier (0.5 = half speed, 2 = double speed)
 */
export function setPlaybackSpeed(speed) {
    const oldSpeed = currentPlaybackSpeed;
    currentPlaybackSpeed = speed;
    
    console.log(`Playback speed changed from ${oldSpeed}x to ${speed}x`);
    
    // If currently playing, restart the interval with new speed
    if (isPlaying && playbackInterval) {
        clearInterval(playbackInterval);
        startPlaybackInterval();
    }
    
    // Update UI to show current speed
    updateSpeedDisplay();
}

/**
 * Calculate current playback interval based on speed
 * @returns {number} Interval in milliseconds
 */
function getCurrentPlaybackInterval() {
    return BASE_PLAYBACK_SPEED_MS / currentPlaybackSpeed;
}

/**
 * Update speed display in UI
 */
function updateSpeedDisplay() {
    const speedDisplay = document.getElementById('currentSpeedDisplay');
    if (speedDisplay) {
        speedDisplay.textContent = `${currentPlaybackSpeed}x`;
    }
    
    // Update active speed option styling
    document.querySelectorAll('.speed-option').forEach(btn => {
        const btnSpeed = parseFloat(btn.dataset.speed);
        if (btnSpeed === currentPlaybackSpeed) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Get the current polling rate
 * @returns {number} Current polling rate in milliseconds
 */
export function getPollingRate() {
    return POLLING_RATE_MS;
}

/**
 * Set the polling rate
 * @param {number} rate - New polling rate in milliseconds
 */
export function setPollingRate(rate) {
    POLLING_RATE_MS = rate;

    // Restart file watcher if active and in live mode
    if (fileWatcherInterval && isLiveMode) {
        clearInterval(fileWatcherInterval);
        fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
        console.log("Polling rate updated and interval restarted:", POLLING_RATE_MS);
    }
}

/**
 * Watch file for changes and update plot (live mode only)
 */
async function watchFileForChanges() {
    if (!fileHandle || !isLiveMode) return;

    try {
        const latestFile = await fileHandle.getFile();
        if (latestFile.size <= readOffset) return; // No new data

        let newPoints = [];

        if (isUbxFile) {
            // For UBX files, read the entire file and parse
            // Note: UBX files are typically complete datasets, live updating is less common
            const arrayBuffer = await latestFile.arrayBuffer();
            const binaryData = new Uint8Array(arrayBuffer);
            const allPoints = extractGpsPoints(binaryData);
            
            // Calculate new points since last read
            if (allPoints.length > totalGpsPoints.length) {
                newPoints = allPoints.slice(totalGpsPoints.length);
                totalGpsPoints = [...allPoints];
            }
            
            readOffset = latestFile.size;
        } else {
            // For text files, read new content
            const fileSlice = latestFile.slice(readOffset);
            const newText = await fileSlice.text();
            readOffset = latestFile.size;

            if (newText.length > 0) {
                // Update our line cache for playback
                const newLines = newText.split('\n').filter(line => line.trim());
                allFileLines.push(...newLines);
                currentLineIndex = allFileLines.length - 1;
                updateTimeSlider();

                // Parse only the new text chunk
                newPoints = extractGpsPointsFromText(newText);

                if (newPoints && newPoints.length > 0) {
                    totalGpsPoints.push(...newPoints);
                }
            }
        }

        if (newPoints && newPoints.length > 0) {
            // Append the new points to the plot
            plotGpsData(newPoints, true);
            // Update stats with complete master list
            updateStats(getMasterGpsPoints());
        }
    } catch (error) {
        console.error("Error watching file for changes:", error);
    }
}

/**
 * Start file watching (live mode)
 */
function startFileWatcher() {
    if (fileWatcherInterval) clearInterval(fileWatcherInterval);
    if (isLiveMode) {
        fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
    }
}

/**
 * Stop file watching
 */
function stopFileWatcher() {
    if (fileWatcherInterval) {
        clearInterval(fileWatcherInterval);
        fileWatcherInterval = null;
    }
}

/**
 * Start the playback interval with current speed
 */
function startPlaybackInterval() {
    playbackInterval = setInterval(() => {
        if (isUbxFile) {
            // For UBX files, playback is based on point index rather than lines
            if (currentLineIndex < totalGpsPoints.length - 1) {
                currentLineIndex++;
                updateTimeSlider();
                
                // Plot points up to current position
                const pointsUpToCurrent = totalGpsPoints.slice(0, currentLineIndex + 1);
                plotGpsData(pointsUpToCurrent, false);
                updateStats(pointsUpToCurrent);
            } else {
                // Reached end of data
                pausePlayback();
                if (!isLiveMode) {
                    goLive(); // Switch back to live mode when playback ends
                }
            }
        } else {
            // For text files, playback is based on lines
            if (currentLineIndex < allFileLines.length - 1) {
                currentLineIndex++;
                updateTimeSlider();
                
                // Process the current line
                const currentLine = allFileLines[currentLineIndex];
                const points = extractGpsPointsFromText(currentLine);
                
                if (points && points.length > 0) {
                    // Plot points up to current position
                    const pointsUpToCurrent = [];
                    for (let i = 0; i <= currentLineIndex; i++) {
                        const linePoints = extractGpsPointsFromText(allFileLines[i]);
                        if (linePoints) pointsUpToCurrent.push(...linePoints);
                    }
                    
                    plotGpsData(pointsUpToCurrent, false);
                    updateStats(pointsUpToCurrent);
                }
            } else {
                // Reached end of file
                pausePlayback();
                if (!isLiveMode) {
                    goLive(); // Switch back to live mode when playback ends
                }
            }
        }
    }, getCurrentPlaybackInterval());
}

/**
 * Start playback from current position
 */
function startPlayback() {
    if (playbackInterval) clearInterval(playbackInterval);
    
    isPlaying = true;
    updatePlayPauseButton();
    
    startPlaybackInterval();
}

/**
 * Pause playback
 */
function pausePlayback() {
    if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
    }
    isPlaying = false;
    updatePlayPauseButton();
}

/**
 * Rewind by specified number of lines/points
 */
function rewind() {
    if (isLiveMode) {
        enterPlaybackMode();
    }
    
    const maxIndex = isUbxFile ? totalGpsPoints.length - 1 : allFileLines.length - 1;
    currentLineIndex = Math.max(0, currentLineIndex - SEEK_LINES);
    updateTimeSlider();
    updatePlotToCurrentPosition();
}

/**
 * Forward by specified number of lines/points
 */
function forward() {
    if (isLiveMode) {
        enterPlaybackMode();
    }
    
    const maxIndex = isUbxFile ? totalGpsPoints.length - 1 : allFileLines.length - 1;
    currentLineIndex = Math.min(maxIndex, currentLineIndex + SEEK_LINES);
    updateTimeSlider();
    updatePlotToCurrentPosition();
}

/**
 * Enter playback mode
 */
function enterPlaybackMode() {
    isLiveMode = false;
    stopFileWatcher();
    updateGoLiveButton();
}

/**
 * Go to live mode
 */
function goLive() {
    isLiveMode = true;
    pausePlayback();
    
    if (isUbxFile) {
        currentLineIndex = totalGpsPoints.length - 1;
    } else {
        currentLineIndex = allFileLines.length - 1;
    }
    
    updateTimeSlider();
    startFileWatcher();
    updateGoLiveButton();
    
    // Update plot to show all current data
    updatePlotToCurrentPosition();
}

/**
 * Update plot to show data up to current position
 */
function updatePlotToCurrentPosition() {
    if (isUbxFile) {
        // For UBX files, use point index
        const pointsUpToCurrent = totalGpsPoints.slice(0, currentLineIndex + 1);
        plotGpsData(pointsUpToCurrent, false);
        updateStats(pointsUpToCurrent);
    } else {
        // For text files, parse lines up to current position
        const pointsUpToCurrent = [];
        for (let i = 0; i <= currentLineIndex; i++) {
            const linePoints = extractGpsPointsFromText(allFileLines[i] || '');
            if (linePoints) pointsUpToCurrent.push(...linePoints);
        }
        
        plotGpsData(pointsUpToCurrent, false);
        updateStats(pointsUpToCurrent);
    }
}

/**
 * Update time slider position
 */
function updateTimeSlider() {
    const slider = document.getElementById("timeSlider");
    if (slider) {
        if (isUbxFile && totalGpsPoints.length > 0) {
            slider.max = totalGpsPoints.length - 1;
            slider.value = currentLineIndex;
        } else if (!isUbxFile && allFileLines.length > 0) {
            slider.max = allFileLines.length - 1;
            slider.value = currentLineIndex;
        }
    }
}

/**
 * Update play/pause button appearance
 */
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

/**
 * Update go live button appearance
 */
function updateGoLiveButton() {
    const goLiveBtn = document.getElementById("goLive");
    if (goLiveBtn) {
        goLiveBtn.style.opacity = isLiveMode ? "0.5" : "1.0";
        goLiveBtn.disabled = isLiveMode;
    }
}

/**
 * Handle time slider changes
 */
function handleTimeSliderChange(event) {
    if (isLiveMode) {
        enterPlaybackMode();
    }
    
    currentLineIndex = parseInt(event.target.value);
    updatePlotToCurrentPosition();
}

/**
 * Handle speed option selection
 */
function handleSpeedSelection(event) {
    const speed = parseFloat(event.target.dataset.speed);
    if (!isNaN(speed) && speed > 0) {
        setPlaybackSpeed(speed);
        console.log(`Speed selected: ${speed}x`);
        
        // Hide the speed options menu
        const speedOptions = document.getElementById('speedOptions');
        if (speedOptions) {
            speedOptions.classList.remove('show');
        }
    }
}

/**
 * Detect file type based on extension and content
 * @param {File} file - The file to check
 * @returns {Promise<boolean>} True if file is UBX format
 */
async function detectFileType(file) {
    // Check file extension first
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.ubx')) {
        return true;
    }
    
    // For files without .ubx extension, check content
    try {
        // Read first few bytes to check for UBX sync bytes
        const sampleSize = Math.min(1024, file.size);
        const sampleBuffer = await file.slice(0, sampleSize).arrayBuffer();
        const sampleData = new Uint8Array(sampleBuffer);
        
        return isUbxData(sampleData);
    } catch (error) {
        console.error("Error detecting file type:", error);
        return false;
    }
}

/**
 * Open and process a file
 * @param {Function} onPlotComplete - Callback when plotting is complete
 * @returns {Promise<boolean>} Success status
 */
export async function openFile(onPlotComplete) {
    try {
        [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    accept: {
                        "text/plain": [".txt", ".log", ".csv"],
                        "application/octet-stream": [".ubx"]
                    },
                },
            ],
            multiple: false,
        });

        if (!fileHandle) return false;

        const file = await fileHandle.getFile();
        currentFile = file;
        readOffset = 0;

        // Detect file type
        isUbxFile = await detectFileType(file);
        console.log(`File type detected: ${isUbxFile ? 'UBX' : 'Text'}`);

        // Update file label
        const fileLabel = document.getElementById("fileLabel");
        if (fileLabel) {
            fileLabel.innerHTML = `${file.name}`;
        }

        let masterGpsPoints = [];

        if (isUbxFile) {
            // Process UBX file
            const arrayBuffer = await file.arrayBuffer();
            allFileData = new Uint8Array(arrayBuffer);
            masterGpsPoints = extractGpsPoints(allFileData);
            
            // For UBX files, we use point count for playback control
            currentLineIndex = masterGpsPoints.length - 1;
            allFileLines = []; // Not used for UBX files
        } else {
            // Process text file
            const initialText = await file.text();
            
            // Split into lines for playback control
            allFileLines = initialText.split('\n').filter(line => line.trim());
            currentLineIndex = allFileLines.length - 1;
            
            masterGpsPoints = extractGpsPointsFromText(initialText);
            allFileData = null; // Not used for text files
        }

        totalGpsPoints = [...masterGpsPoints];
        readOffset = file.size;

        if (masterGpsPoints.length === 0) {
            const fileType = isUbxFile ? "UBX" : "text";
            alert(`No valid GPS points found in the ${fileType} file.`);
            plotGpsData([]);
            updateStats([]);
            return false;
        }

        // Initialize the global coordinate system with all GPS points
        // This ensures consistent coordinates during playback
        initializeCoordinateSystem(masterGpsPoints);

        // Plot initial data; this also sets the master points in plotManager
        const plotMetadata = plotGpsData(masterGpsPoints, false);
        updateStats(masterGpsPoints);

        // Initialize UI
        updateTimeSlider();
        updatePlayPauseButton();
        updateGoLiveButton();
        updateSpeedDisplay();

        // Callback with plot metadata for camera positioning
        if (onPlotComplete && plotMetadata) {
            onPlotComplete(plotMetadata);
        }

        // Start in live mode (though for UBX files, live updates are less common)
        isLiveMode = true;
        startFileWatcher();

        const fileType = isUbxFile ? "UBX" : "text";
        const unitCount = isUbxFile ? "points" : "lines";
        const units = isUbxFile ? masterGpsPoints.length : allFileLines.length;
        console.log(`${fileType} file opened successfully: ${file.name} (${masterGpsPoints.length} GPS points, ${units} ${unitCount})`);
        return true;

    } catch (err) {
        // Don't show error if user cancelled
        if (err.name !== "AbortError") {
            console.error("File selection failed:", err);
        }
        return false;
    }
}

/**
 * Close current file and stop watching
 */
export function closeFile() {
    stopFileWatcher();
    pausePlayback();
    resetCoordinateSystem(); // Reset the global coordinate system
    currentFile = null;
    readOffset = 0;
    fileHandle = null;
    allFileLines = [];
    allFileData = null;
    currentLineIndex = 0;
    totalGpsPoints = [];
    isLiveMode = true;
    isUbxFile = false;
    currentPlaybackSpeed = 1.0; // Reset speed
    
    const fileLabel = document.getElementById("fileLabel");
    if (fileLabel) {
        fileLabel.innerHTML = "No file selected";
    }
    
    updateSpeedDisplay();
}

/**
 * Get current file info
 * @returns {Object|null} Current file info or null
 */
export function getCurrentFileInfo() {
    return currentFile ? {
        name: currentFile.name,
        size: currentFile.size,
        lastModified: currentFile.lastModified,
        readOffset: readOffset,
        fileType: isUbxFile ? 'UBX' : 'Text',
        totalLines: isUbxFile ? totalGpsPoints.length : allFileLines.length,
        currentLine: currentLineIndex,
        totalGpsPoints: totalGpsPoints.length,
        isLiveMode: isLiveMode,
        isPlaying: isPlaying,
        playbackSpeed: currentPlaybackSpeed
    } : null;
}

/**
 * Setup file manager event listeners including playback controls
 */
export function setupFileManagerListeners() {
    // File input listener
    const fileInputLabel = document.getElementById("fileInputLabel");
    if (fileInputLabel) {
        fileInputLabel.addEventListener("click", () => {
            openFile((plotMetadata) => {
                // This callback can be used to update camera position
                window.dispatchEvent(new CustomEvent('fileLoaded', { detail: plotMetadata }));
            });
        });
    }

    // Polling rate update listener
    const updatePollRateBtn = document.getElementById("updatePollRateBtn");
    if (updatePollRateBtn) {
        updatePollRateBtn.addEventListener("click", () => {
            const input = document.getElementById("pollRateInput");
            if (input) {
                const newRate = parseInt(input.value, 10);
                if (!isNaN(newRate) && newRate > 0) {
                    setPollingRate(newRate);
                }
            }
        });
    }

    // Playback control listeners
    const rewindBtn = document.getElementById("rewind");
    if (rewindBtn) {
        rewindBtn.addEventListener("click", rewind);
    }

    const playPauseBtn = document.getElementById("playPause");
    if (playPauseBtn) {
        playPauseBtn.addEventListener("click", () => {
            if (isLiveMode) {
                enterPlaybackMode();
            }
            
            if (isPlaying) {
                pausePlayback();
            } else {
                startPlayback();
            }
        });
    }

    const forwardBtn = document.getElementById("forward");
    if (forwardBtn) {
        forwardBtn.addEventListener("click", forward);
    }

    const goLiveBtn = document.getElementById("goLive");
    if (goLiveBtn) {
        goLiveBtn.addEventListener("click", goLive);
    }

    const timeSlider = document.getElementById("timeSlider");
    if (timeSlider) {
        timeSlider.addEventListener("input", handleTimeSliderChange);
    }

    // Speed control listeners
    const adjustSpeedButton = document.getElementById('adjustSpeed');
    const speedOptions = document.getElementById('speedOptions');

    if (adjustSpeedButton && speedOptions) {
        // Toggle the speed options menu
        adjustSpeedButton.addEventListener('click', (event) => {
            event.stopPropagation();
            speedOptions.classList.toggle('show');
        });

        // Add event listeners to each speed option button
        document.querySelectorAll('.speed-option').forEach(button => {
            button.addEventListener('click', handleSpeedSelection);
        });

        // Hide the menu if the user clicks anywhere else on the page
        window.addEventListener('click', (event) => {
            if (speedOptions.classList.contains('show')) {
                speedOptions.classList.remove('show');
            }
        });
    }

    console.log("File manager listeners setup complete with UBX support and playback controls");
}

/**
 * Check if a file is currently being watched
 * @returns {boolean} Whether file watching is active
 */
export function isWatchingFile() {
    return fileWatcherInterval !== null;
}

/**
 * Get current playback state
 * @returns {Object} Current playback state
 */
export function getPlaybackState() {
    const totalUnits = isUbxFile ? totalGpsPoints.length : allFileLines.length;
    return {
        isLiveMode,
        isPlaying,
        isUbxFile,
        currentLineIndex,
        totalLines: totalUnits,
        totalGpsPoints: totalGpsPoints.length,
        progress: totalUnits > 0 ? currentLineIndex / (totalUnits - 1) : 0,
        playbackSpeed: currentPlaybackSpeed
    };
}

// Expose functions globally for non-module usage
if (typeof window !== 'undefined') {
    window.setPlaybackSpeed = setPlaybackSpeed;
    window.getPlaybackSpeed = getPlaybackSpeed;
    window.getPlaybackState = getPlaybackState;
}

// Prevent slider and playback controls from moving the scene
const timeSlider = document.getElementById("timeSlider");
if (timeSlider) {
    ['mousedown', 'mousemove', 'mouseup', 'click'].forEach(eventType => {
        timeSlider.addEventListener(eventType, (e) => {
            e.stopPropagation();
        });
    });
    
    timeSlider.addEventListener("input", handleTimeSliderChange);
}

// Prevent playback div interactions from affecting orbit controls
const playbackDiv = document.getElementById("playback");
if (playbackDiv && window.orbitControls) {
    playbackDiv.addEventListener('mouseenter', () => {
        window.orbitControls.enabled = false;
    });
    
    playbackDiv.addEventListener('mouseleave', () => {
        window.orbitControls.enabled = true;
    });
}
// FILE HANDLING AND WATCHING

import { extractGpsPointsFromText, updateStats } from "./parser.js";
import { plotGpsData, setMasterGpsPoints, addToMasterGpsPoints, getMasterGpsPoints } from "./plotManager.js";

// Module state
let currentFile = null;
let readOffset = 0;
let fileWatcherInterval = null;
let POLLING_RATE_MS = 200;
let fileHandle = null;

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
    
    // Restart file watcher if active
    if (fileWatcherInterval) {
        clearInterval(fileWatcherInterval);
        fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
        console.log("Polling rate updated and interval restarted:", POLLING_RATE_MS);
    }
}

/**
 * Watch file for changes and update plot
 */
async function watchFileForChanges() {
    if (!fileHandle) return;

    try {
        const latestFile = await fileHandle.getFile();
        if (latestFile.size <= readOffset) return; // No new data

        const fileSlice = latestFile.slice(readOffset);
        const newText = await fileSlice.text();
        readOffset = latestFile.size;

        if (newText.length > 0) {
            // Parse only the new text chunk
            const newPoints = extractGpsPointsFromText(newText);

            if (newPoints && newPoints.length > 0) {
                // Add new points to master list
                addToMasterGpsPoints(newPoints);

                // Append the new points to the plot
                plotGpsData(newPoints, true);

                // Update stats with complete master list
                updateStats(getMasterGpsPoints());
            }
        }
    } catch (error) {
        console.error("Error watching file for changes:", error);
    }
}

/**
 * Start file watching
 */
function startFileWatcher() {
    if (fileWatcherInterval) clearInterval(fileWatcherInterval);
    fileWatcherInterval = setInterval(watchFileForChanges, POLLING_RATE_MS);
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
                        "text/plain": [".txt", ".log", ".csv", ".ubx"],
                    },
                },
            ],
            multiple: false,
        });

        if (!fileHandle) return false;

        const file = await fileHandle.getFile();
        currentFile = file;
        readOffset = 0;

        // Update file label
        const fileLabel = document.getElementById("fileLabel");
        if (fileLabel) {
            fileLabel.innerHTML = `${file.name}`;
        }

        // Read and parse initial file content
        const initialText = await file.text();
        const masterGpsPoints = extractGpsPointsFromText(initialText);
        readOffset = file.size;

        if (masterGpsPoints.length === 0) {
            alert("No valid GPS points found in the file.");
            setMasterGpsPoints([]);
            plotGpsData([]);
            updateStats([]);
            return false;
        }

        // Set master points and plot initial data
        setMasterGpsPoints(masterGpsPoints);
        const plotMetadata = plotGpsData(masterGpsPoints, false);
        updateStats(masterGpsPoints);

        // Callback with plot metadata for camera positioning
        if (onPlotComplete && plotMetadata) {
            onPlotComplete(plotMetadata);
        }

        // Start watching for live changes
        startFileWatcher();

        console.log(`File opened successfully: ${file.name} (${masterGpsPoints.length} points)`);
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
    currentFile = null;
    readOffset = 0;
    fileHandle = null;
    
    const fileLabel = document.getElementById("fileLabel");
    if (fileLabel) {
        fileLabel.innerHTML = "No file selected";
    }
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
        readOffset: readOffset
    } : null;
}

/**
 * Setup file manager event listeners
 */
export function setupFileManagerListeners() {
    // File input listener
    const fileInputLabel = document.getElementById("fileInputLabel");
    if (fileInputLabel) {
        fileInputLabel.addEventListener("click", () => {
            openFile((plotMetadata) => {
                // This callback can be used to update camera position
                // You can dispatch a custom event or call a callback passed to setupFileManagerListeners
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

    console.log("File manager listeners setup complete");
}

/**
 * Check if a file is currently being watched
 * @returns {boolean} Whether file watching is active
 */
export function isWatchingFile() {
    return fileWatcherInterval !== null;
}

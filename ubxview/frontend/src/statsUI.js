// statsUI.js
// DOM manipulation and UI updates for statistics panel

import * as THREE from 'three';
import { getTrackVariantColor, isElevationModeActive } from './trailControls.js';
import { groupPointsByTalker, calculateTalkerStats } from './parser.js';

/**
 * Creates the HTML structure for a talker's statistics panel.
 * @param {string} talkerId The talker ID (e.g., "GP", "GN")
 * @param {string} headerColor The color to use for the header
 * @returns {string} HTML string
 */
function createTalkerStatsHTML(talkerId, headerColor) {
    return `
        <div class="stats-group">
            <h3 style="color: ${headerColor};"
                class="talker-header"
                data-talker-id="${talkerId}"
                tabindex="0"
                role="button"
                title="Click to follow">
                <span>Rover${talkerId}</span>

<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="100%" viewBox="0 0 986 700" enable-background="new 0 0 986 700" xml:space="preserve">
<path fill="none" opacity="1.000000" stroke="none" 
	d="
M0.999999,591.000000 
	C1.000000,582.974182 1.000000,574.948303 1.468439,566.476562 
	C108.837509,566.030640 215.738144,566.030640 322.673523,566.030640 
	C322.673523,487.111237 322.673523,408.612366 322.673523,330.000000 
	C215.219513,330.000000 108.109756,330.000000 1.000000,330.000000 
	C1.000000,220.333359 1.000000,110.666702 1.000000,1.000044 
	C329.666595,1.000029 658.333191,1.000029 986.999817,1.000015 
	C986.999878,234.333206 986.999878,467.666412 986.999939,700.999817 
	C659.833496,701.000000 332.667023,701.003967 5.500598,700.858765 
	C4.211260,700.858215 0.873054,703.328125 1.441313,698.329224 
	C37.468975,697.658386 73.055328,697.658386 108.186874,697.658386 
	C108.186874,685.043701 108.007675,673.062683 108.227936,661.088989 
	C108.578079,642.054077 121.746857,627.767639 140.793442,626.755737 
	C154.909622,626.005676 169.099976,626.526855 183.254181,626.714844 
	C186.355774,626.756042 189.595062,627.370422 192.513062,628.430603 
	C206.328033,633.449890 215.009628,645.779297 215.155930,660.471558 
	C215.278046,672.734192 215.180969,684.999023 215.180969,697.320801 
	C275.081055,697.320801 334.647980,697.320801 394.453125,697.320801 
	C394.453125,661.792175 394.453125,626.556274 394.453125,590.829407 
	C392.459625,590.829407 390.668915,590.829407 388.878204,590.829407 
	C261.247314,590.829407 133.616455,590.828735 5.985575,590.836426 
	C4.323713,590.836548 2.661857,590.943115 0.999999,591.000000 
M194.001297,155.500000 
	C194.000916,124.009102 194.097168,92.517807 193.967255,61.027443 
	C193.875961,38.897816 177.386932,20.917902 155.360306,19.793301 
	C139.072861,18.961721 122.716873,19.389568 106.391541,19.403997 
	C86.234451,19.421812 66.050591,18.980333 45.927834,19.864603 
	C24.579885,20.802713 8.013638,39.241913 8.007524,60.649437 
	C7.984637,140.792679 7.996786,220.935913 8.009413,301.079163 
	C8.009637,302.504395 8.179475,303.929596 8.273607,305.408844 
	C70.374786,305.408844 132.087265,305.408844 194.001297,305.408844 
	C194.001297,255.457291 194.001297,205.978653 194.001297,155.500000 
M519.676697,473.840240 
	C534.720886,485.315491 549.765076,496.790710 564.986694,508.401306 
	C565.747864,507.531952 566.308594,506.959991 566.792419,506.329041 
	C599.483582,463.698944 632.200439,421.088501 664.836487,378.416260 
	C676.148010,363.626251 688.496521,349.448761 698.256836,333.682495 
	C758.359741,236.595963 817.858337,139.135330 877.555969,41.797932 
	C882.856506,33.155350 888.155151,24.511555 893.430481,15.853622 
	C895.559753,12.359123 896.093628,8.762064 892.397278,6.110662 
	C888.826111,3.549068 885.478760,4.800312 882.676025,7.875944 
	C881.554382,9.106734 880.380432,10.289673 879.235840,11.499725 
	C810.773438,83.880394 742.171997,156.130432 673.935913,228.723907 
	C653.890442,250.049438 632.482361,270.121704 614.794250,293.668518 
	C588.224121,329.039246 561.110779,364.001892 534.229248,399.138641 
	C520.500427,417.083588 506.773346,435.029846 492.869263,453.205841 
	C501.775238,460.045013 510.453369,466.709229 519.676697,473.840240 
M351.535583,415.963104 
	C348.758942,415.963104 345.982330,415.963104 343.192932,415.963104 
	C343.192932,447.057098 343.192932,477.627960 343.192932,508.296631 
	C402.252899,508.296631 461.063934,508.296631 520.826416,508.296631 
	C497.323273,490.272858 474.571411,472.825165 451.617065,455.222229 
	C461.617188,442.159119 471.362457,429.428925 481.670868,415.963104 
	C438.003357,415.963104 395.266235,415.963104 351.535583,415.963104 
z"/>
<path fill="currentColor" opacity="1.000000" stroke="none" 
	d="
M1.000000,330.468658 
	C108.109756,330.000000 215.219513,330.000000 322.673523,330.000000 
	C322.673523,408.612366 322.673523,487.111237 322.673523,566.030640 
	C215.738144,566.030640 108.837509,566.030640 1.468439,566.015320 
	C1.000000,487.645782 1.000000,409.291534 1.000000,330.468658 
z"/>
<path fill="currentColor" opacity="1.000000" stroke="none" 
	d="
M0.999999,591.468628 
	C2.661857,590.943115 4.323713,590.836548 5.985575,590.836426 
	C133.616455,590.828735 261.247314,590.829407 388.878204,590.829407 
	C390.668915,590.829407 392.459625,590.829407 394.453125,590.829407 
	C394.453125,626.556274 394.453125,661.792175 394.453125,697.320801 
	C334.647980,697.320801 275.081055,697.320801 215.180969,697.320801 
	C215.180969,684.999023 215.278046,672.734192 215.155930,660.471558 
	C215.009628,645.779297 206.328033,633.449890 192.513062,628.430603 
	C189.595062,627.370422 186.355774,626.756042 183.254181,626.714844 
	C169.099976,626.526855 154.909622,626.005676 140.793442,626.755737 
	C121.746857,627.767639 108.578079,642.054077 108.227936,661.088989 
	C108.007675,673.062683 108.186874,685.043701 108.186874,697.658386 
	C73.055328,697.658386 37.468975,697.658386 1.441313,697.829224 
	C1.000000,662.645752 1.000000,627.291565 0.999999,591.468628 
z"/>
<path fill="currentColor" opacity="1.000000" stroke="none" 
	d="
M194.001297,156.000000 
	C194.001297,205.978653 194.001297,255.457291 194.001297,305.408844 
	C132.087265,305.408844 70.374786,305.408844 8.273607,305.408844 
	C8.179475,303.929596 8.009637,302.504395 8.009413,301.079163 
	C7.996786,220.935913 7.984637,140.792679 8.007524,60.649437 
	C8.013638,39.241913 24.579885,20.802713 45.927834,19.864603 
	C66.050591,18.980333 86.234451,19.421812 106.391541,19.403997 
	C122.716873,19.389568 139.072861,18.961721 155.360306,19.793301 
	C177.386932,20.917902 193.875961,38.897816 193.967255,61.027443 
	C194.097168,92.517807 194.000916,124.009102 194.001297,156.000000 
z"/>
<path fill="currentColor" opacity="1.000000" stroke="none" 
	d="
M519.404114,473.606842 
	C510.453369,466.709229 501.775238,460.045013 492.869263,453.205841 
	C506.773346,435.029846 520.500427,417.083588 534.229248,399.138641 
	C561.110779,364.001892 588.224121,329.039246 614.794250,293.668518 
	C632.482361,270.121704 653.890442,250.049438 673.935913,228.723907 
	C742.171997,156.130432 810.773438,83.880394 879.235840,11.499725 
	C880.380432,10.289673 881.554382,9.106734 882.676025,7.875944 
	C885.478760,4.800312 888.826111,3.549068 892.397278,6.110662 
	C896.093628,8.762064 895.559753,12.359123 893.430481,15.853622 
	C888.155151,24.511555 882.856506,33.155350 877.555969,41.797932 
	C817.858337,139.135330 758.359741,236.595963 698.256836,333.682495 
	C688.496521,349.448761 676.148010,363.626251 664.836487,378.416260 
	C632.200439,421.088501 599.483582,463.698944 566.792419,506.329041 
	C566.308594,506.959991 565.747864,507.531952 564.986694,508.401306 
	C549.765076,496.790710 534.720886,485.315491 519.404114,473.606842 
z"/>
<path fill="currentColor" opacity="1.000000" stroke="none" 
	d="
M352.032349,415.963104 
	C395.266235,415.963104 438.003357,415.963104 481.670868,415.963104 
	C471.362457,429.428925 461.617188,442.159119 451.617065,455.222229 
	C474.571411,472.825165 497.323273,490.272858 520.826416,508.296631 
	C461.063934,508.296631 402.252899,508.296631 343.192932,508.296631 
	C343.192932,477.627960 343.192932,447.057098 343.192932,415.963104 
	C345.982330,415.963104 348.758942,415.963104 352.032349,415.963104 
z"/>
</svg>
            </h3>
            <table>
                <tbody>
                    <tr><td>Points:</td><td><span id="${talkerId}-points-stat">0</span></td></tr>
                    <tr><td>Latitude:</td><td><span id="${talkerId}-lat-stat">0.0</span>&deg;</td></tr>
                    <tr><td>Longitude:</td><td><span id="${talkerId}-long-stat">0.0</span>&deg;</td></tr>
                    <tr><td>Alt (MSL):</td><td><span id="${talkerId}-altitude-stat">0.0</span> m</td></tr>
                    <tr><td>Alt (WGS84):</td><td><span id="${talkerId}-altwsg84-stat">0.0</span> m</td></tr>
                    <tr><td>Speed:</td><td><span id="${talkerId}-speed-stat">0.0</span> m/s</td></tr>
                    <tr><td>2D Distance:</td><td><span id="${talkerId}-twod-stat">0.0</span> m</td></tr>
                    <tr><td>3D Distance:</td><td><span id="${talkerId}-threed-stat">0.0</span> m</td></tr>
                    <tr><td>Satellites:</td><td><span id="${talkerId}-satellites-stat">0</span></td></tr>
                    <tr><td>Start Time:</td><td><span id="${talkerId}-start-stat">--</span></td></tr>
                    <tr><td>End Time:</td><td><span id="${talkerId}-end-stat">--</span></td></tr>
                    <tr><td>Duration:</td><td><span id="${talkerId}-duration-stat">0.0</span> s</td></tr>
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Formats time in seconds to HH:MM:SS format.
 * @param {number} timeInSeconds Time in seconds
 * @returns {string} Formatted time string
 */
function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Updates the DOM with statistics for a specific talker.
 * @param {string} talkerId The talker ID
 * @param {Object} stats Statistics object from calculateTalkerStats
 */
function updateTalkerStatsDOM(talkerId, stats) {
    const startTimeFormatted = formatTime(stats.startTime);
    const endTimeFormatted = formatTime(stats.endTime);

    document.getElementById(`${talkerId}-points-stat`).textContent = stats.totalPoints;
    document.getElementById(`${talkerId}-duration-stat`).textContent = stats.totalDuration.toFixed(1);
    document.getElementById(`${talkerId}-twod-stat`).textContent = stats.total2DDistance.toFixed(1);
    document.getElementById(`${talkerId}-threed-stat`).textContent = stats.total3DDistance.toFixed(1);
    document.getElementById(`${talkerId}-speed-stat`).textContent = stats.latestSpeed.toFixed(2);
    document.getElementById(`${talkerId}-altitude-stat`).textContent = stats.currentAltitude.toFixed(2);
    document.getElementById(`${talkerId}-altwsg84-stat`).textContent = stats.currentAltWsg84.toFixed(2);
    document.getElementById(`${talkerId}-lat-stat`).textContent = stats.currentLat.toFixed(7);
    document.getElementById(`${talkerId}-long-stat`).textContent = stats.currentLon.toFixed(7);
    document.getElementById(`${talkerId}-satellites-stat`).textContent = stats.currentSatellites;
    document.getElementById(`${talkerId}-start-stat`).textContent = startTimeFormatted;
    document.getElementById(`${talkerId}-end-stat`).textContent = endTimeFormatted;
}

/**
 * Removes stale talker panels from the DOM.
 * @param {HTMLElement} statsContainer The stats container element
 * @param {Array<string>} currentTalkerIds Array of current talker IDs
 */
function removeStalePanels(statsContainer, currentTalkerIds) {
    const existingPanels = statsContainer.querySelectorAll('.stats-group');
    existingPanels.forEach(panel => {
        const header = panel.querySelector('.talker-header');
        if (header) {
            const panelTalkerId = header.dataset.talkerId;
            if (!currentTalkerIds.includes(panelTalkerId)) {
                panel.remove();
            }
        } else {
            // If a panel is malformed (no header), remove it
            panel.remove();
        }
    });
}

/**
 * Update the color of the H3 talker headers in the stats panel.
 * @param {Map<string, {points: THREE.Points, line: THREE.Line, gpsPoints: Array}>} plotObjects The map of all plotted objects.
 */
export function updateStatsHeaderColors(plotObjects) {
    // When elevation mode is active, all headers should be a neutral white.
    if (isElevationModeActive()) {
        document.querySelectorAll('.talker-header').forEach(header => {
            header.style.color = '#ffffff';
        });
        return;
    }
    
    // Check if plotObjects is valid
    if (!plotObjects || plotObjects.size === 0) return;
    
    // Otherwise, calculate colors based on the current trail tail color.
    const tailColorPicker = document.getElementById('trail-tail-color');
    const baseColor = new THREE.Color(tailColorPicker ? tailColorPicker.value : '#00ffaa');

    // Get talker IDs and sort them alphabetically to ensure a consistent color order.
    const sortedTalkerIds = Array.from(plotObjects.keys()).sort();

    // Iterate over the sorted array, using its index for color generation.
    sortedTalkerIds.forEach((talkerId, index) => {
        const header = document.querySelector(`.talker-header[data-talker-id="${talkerId}"]`);
        if (header) {
            // Generate the unique color variant for this track's index
            const trackColor = getTrackVariantColor(baseColor, index);
            const headerColorHex = `#${trackColor.getHexString()}`;
            
            // Apply the new color directly to the element's style attribute
            header.style.color = headerColorHex;
        }
    });
}

/**
 * Main function to update all statistics in the UI.
 * @param {Array} points Array of all GPS points
 */
export function updateStats(points) {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    if (!points || points.length === 0) {
        return;
    }

    // Group points by talker ID
    const pointsByTalker = groupPointsByTalker(points);
    const currentTalkerIds = Object.keys(pointsByTalker).sort();

    // Remove stale talker panels
    removeStalePanels(statsContainer, currentTalkerIds);

    // Get base color for headers
    const tailColorPicker = document.getElementById('trail-tail-color');
    const baseColor = new THREE.Color(tailColorPicker ? tailColorPicker.value : '#00ffaa');

    // Create or update panels for each talker
    currentTalkerIds.forEach((talkerId, index) => {
        const talkerPoints = pointsByTalker[talkerId];

        // 1. CREATE the panel structure if it's not already in the DOM
        if (!document.getElementById(`${talkerId}-points-stat`)) {
            let headerColorHex;
            if (isElevationModeActive()) {
                headerColorHex = '#ffffff'; 
            } else {
                const trackColor = getTrackVariantColor(baseColor, index);
                headerColorHex = `#${trackColor.getHexString()}`;
            }
            statsContainer.insertAdjacentHTML('beforeend', createTalkerStatsHTML(talkerId, headerColorHex));
        }

        // 2. Calculate stats and UPDATE the DOM
        const stats = calculateTalkerStats(talkerPoints);
        if (stats) {
            updateTalkerStatsDOM(talkerId, stats);
        }
    });
}

/**
 * Initializes event delegation for talker header clicks.
 * This should be called once on page load.
 */
export function initializeStatsEventListeners() {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    statsContainer.addEventListener('click', (e) => {
        // Use .closest() to find the talker-header that was clicked,
        // even if the user clicked on text inside the H3.
        const header = e.target.closest('.talker-header');

        // If a header was not the target of the click, do nothing.
        if (!header) {
            return;
        }

        const talkerId = header.dataset.talkerId;
        if (talkerId) {
            // Dispatch the custom event that cameraControls.js is listening for.
            const event = new CustomEvent('activateCinematicForTalker', {
                detail: { talkerId: talkerId }
            });
            window.dispatchEvent(event);
        }
    });
}

// Auto-initialize event listeners when module loads
initializeStatsEventListeners();
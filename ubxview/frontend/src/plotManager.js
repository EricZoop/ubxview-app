// GPS DATA Plotting and Management

import * as THREE from "three";
import { initializeTrailControls, getCurrentTrailColors, getLineVisibility } from "./trailControls.js";

const MAX_RENDER_POINTS = 1000; // The new limit

// Module state
let dataGroup = null;
let gpsToCartesian = null;
let center = null;
let bounds = null;
let baselineAltitude = null;
let pointsObject = null;
let lineObject = null;
let masterGpsPoints = [];
let droneObjects = []; // Array to hold individual drone visualization objects

/**
 * Initialize the plot manager
 * @param {THREE.Group} group - The data group to add objects to
 */
export function initializePlotManager(group) {
    dataGroup = group;
}

/**
 * Get the current coordinate conversion function
 * @returns {Function} The gpsToCartesian conversion function
 */
export function getGpsToCartesian() {
    return gpsToCartesian;
}

/**
 * Get the current data bounds
 * @returns {Object} The bounds object
 */
export function getBounds() {
    return bounds;
}

/**
 * Get the current center point
 * @returns {Object} The center point
 */
export function getCenter() {
    return center;
}

/**
 * Get the current master GPS points array
 * @returns {Array} Array of GPS points
 */
export function getMasterGpsPoints() {
    return masterGpsPoints;
}

/**
 * Set the master GPS points array
 * @param {Array} points - Array of GPS points
 */
export function setMasterGpsPoints(points) {
    masterGpsPoints = points;
}

/**
 * Add points to the master GPS points array
 * @param {Array} points - Array of GPS points to add
 */
export function addToMasterGpsPoints(points) {
    masterGpsPoints.push(...points);
}

/**
 * Clear all plotted data
 */
export function clearPlotData() {
    if (!dataGroup) return;

    // Dispose of all objects in the data group
    while (dataGroup.children.length > 0) {
        const object = dataGroup.children[0];
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
            } else {
                object.material.dispose();
            }
        }
        dataGroup.remove(object);
    }

    // Reset references
    pointsObject = null;
    lineObject = null;
    droneObjects = [];
    masterGpsPoints = [];
    gpsToCartesian = null;
    center = null;
    bounds = null;
    baselineAltitude = null;
}

/**
 * Calculate bounds and center from GPS points
 * @param {Array} points - Array of GPS points
 */
function calculateBoundsAndCenter(points) {
    if (!points || points.length === 0) return;

    bounds = points.reduce(
        (acc, p) => ({
            minLat: Math.min(acc.minLat, p.lat),
            maxLat: Math.max(acc.maxLat, p.lat),
            minLon: Math.min(acc.minLon, p.lon),
            maxLon: Math.max(acc.maxLon, p.lon),
            minAlt: Math.min(acc.minAlt, p.alt),
            maxAlt: Math.max(acc.maxAlt, p.alt),
        }), {
            minLat: Infinity,
            maxLat: -Infinity,
            minLon: Infinity,
            maxLon: -Infinity,
            minAlt: Infinity,
            maxAlt: -Infinity,
        }
    );

    center = {
        lat: (bounds.minLat + bounds.maxLat) / 2,
        lon: (bounds.minLon + bounds.maxLon) / 2,
        alt: (bounds.minAlt + bounds.maxAlt) / 2,
    };

    baselineAltitude = points[0].alt;
}

/**
 * Create the GPS to Cartesian coordinate conversion function
 */
function createCoordinateConverter() {
    gpsToCartesian = (lat, lon, alt) => {
        const centerLatRad = (center.lat * Math.PI) / 180;
        const scaleFactor = 10.0;
        const x = (lon - center.lon) * Math.cos(centerLatRad) * 111320 * scaleFactor;
        const y = (alt - baselineAltitude) * 5;
        const z = (lat - center.lat) * 111320 * scaleFactor;
        return new THREE.Vector3(x, y, -z);
    };
}

/**
 * Create geometry from GPS points
 * @param {Array} points - Array of GPS points
 * @param {string} droneColor - Optional color for this drone's trail
 * @returns {Object} Object containing positions and colors arrays
 */
function createGeometryFromPoints(points, droneColor = null) {
    const colors = getCurrentTrailColors();
    const positions = [];
    const colorArray = [];

    points.forEach((p) => {
        const pos = gpsToCartesian(p.lat, p.lon, p.alt);
        positions.push(pos.x, pos.y, pos.z);
        
        let color;
        if (droneColor) {
            // Use drone-specific color
            color = new THREE.Color(droneColor);
        } else {
            // Use altitude-based gradient
            const altRatio = (p.alt - bounds.minAlt) / (bounds.maxAlt - bounds.minAlt) || 0;
            color = new THREE.Color().lerpColors(colors.head, colors.tail, altRatio);
        }
        colorArray.push(color.r, color.g, color.b);
    });

    return { positions, colors: colorArray };
}

/**
 * Create Three.js objects from geometry data
 * @param {Object} geometryData - Object containing positions and colors
 * @param {string} droneColor - Optional color for drone-specific line
 * @param {number} droneId - Optional drone ID for object naming
 */
function createThreeJsObjects(geometryData, droneColor = null, droneId = null) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(geometryData.positions, 3)
    );
    geometry.setAttribute(
        "color", 
        new THREE.Float32BufferAttribute(geometryData.colors, 3)
    );

    const pointsObj = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,
            sizeAttenuation: false,
        })
    );

    const colors = getCurrentTrailColors();
    const lineColor = droneColor || colors.line;
    const lineObj = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
            color: lineColor,
        })
    );

    // Set line visibility based on current toggle state
    lineObj.visible = getLineVisibility();

    // Add names for identification
    if (droneId !== null) {
        pointsObj.name = `drone_${droneId}_points`;
        lineObj.name = `drone_${droneId}_line`;
    }

    dataGroup.add(pointsObj, lineObj);
    
    return { points: pointsObj, line: lineObj };
}

/**
 * Create drone-specific visualization objects
 * @param {Array} droneStreams - Array of drone stream objects
 */
function createDroneObjects(droneStreams) {
    droneObjects = [];
    
    droneStreams.forEach((stream) => {
        if (stream.points && stream.points.length > 0) {
            const geometryData = createGeometryFromPoints(stream.points, stream.color);
            const objects = createThreeJsObjects(geometryData, stream.color, stream.id);
            
            droneObjects.push({
                id: stream.id,
                color: stream.color,
                points: objects.points,
                line: objects.line,
                pointCount: stream.points.length
            });
        }
    });
    
    console.log(`Created ${droneObjects.length} drone visualization objects`);
}

/**
 * Plot GPS data - can create new plot or append to existing
 * @param {Array|Object} data - Array of GPS points OR parse result object with {allPoints, droneStreams}
 * @param {boolean} append - Whether to append to existing data
 * @returns {Object} Object containing plot metadata
 */
export function plotGpsData(data, append = false) {
    // Handle both old format (array) and new format (object)
    const allPoints = getMasterGpsPoints();
    if (!allPoints || allPoints.length === 0) {
        clearPlotData();
        return null;
    }


    let points, droneStreams;
    
    if (Array.isArray(data)) {
        // Old format - just an array of points
        points = data;
        droneStreams = [];
    } else if (data && typeof data === 'object') {
        // New format - object with allPoints and droneStreams
        points = data.allPoints || [];
        droneStreams = data.droneStreams || [];
    } else {
        points = [];
        droneStreams = [];
    }

    if (!points || points.length === 0) {
        if (!append) clearPlotData();
        return null;
    }

    const colors = getCurrentTrailColors();

    if (append && pointsObject && gpsToCartesian) {
        // --- APPEND LOGIC ---
        // Update bounds with new data
        points.forEach((p) => {
            bounds.minAlt = Math.min(bounds.minAlt, p.alt);
            bounds.maxAlt = Math.max(bounds.maxAlt, p.alt);
        });

        // Convert new points using existing coordinate system
        const newPositions = [];
        const newColors = [];
        points.forEach((p) => {
            const pos = gpsToCartesian(p.lat, p.lon, p.alt);
            newPositions.push(pos.x, pos.y, pos.z);
            const altRatio = (p.alt - bounds.minAlt) / (bounds.maxAlt - bounds.minAlt) || 0;
            const color = new THREE.Color().lerpColors(colors.head, colors.tail, altRatio);
            newColors.push(color.r, color.g, color.b);
        });

        // Get existing geometry data
        const geometry = pointsObject.geometry;
        const oldPositions = geometry.attributes.position.array;
        const oldColors = geometry.attributes.color.array;

        // Combine old and new data
        const combinedPositions = new Float32Array(oldPositions.length + newPositions.length);
        combinedPositions.set(oldPositions);
        combinedPositions.set(newPositions, oldPositions.length);

        const combinedColors = new Float32Array(oldColors.length + newColors.length);
        combinedColors.set(oldColors);
        combinedColors.set(newColors, oldColors.length);

        // Update geometry attributes
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(combinedPositions, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(combinedColors, 3));
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();

        // Update line geometry
        if (lineObject) {
            lineObject.geometry.setAttribute("position", new THREE.Float32BufferAttribute(combinedPositions, 3));
            lineObject.geometry.attributes.position.needsUpdate = true;
            lineObject.geometry.computeBoundingBox();
            lineObject.geometry.computeBoundingSphere();
        }

        console.log(`Appended ${points.length} points.`);
    } else {
        // --- FULL PLOT LOGIC ---
        clearPlotData();
        
        // Store the points
        masterGpsPoints = [...points];
        
        // Calculate bounds and center
        calculateBoundsAndCenter(points);
        
        // Create coordinate converter
        createCoordinateConverter();
        
        if (droneStreams.length > 0) {
            // Multi-drone mode - create separate objects for each drone
            createDroneObjects(droneStreams);
            
            // Also create a combined view for backwards compatibility
            const geometryData = createGeometryFromPoints(points);
            const objects = createThreeJsObjects(geometryData);
            pointsObject = objects.points;
            lineObject = objects.line;
            
            console.log(`Successfully plotted ${points.length} points across ${droneStreams.length} drones.`);
        } else {
            // Single drone mode - create geometry from all points
            const geometryData = createGeometryFromPoints(points);
            const objects = createThreeJsObjects(geometryData);
            pointsObject = objects.points;
            lineObject = objects.line;
            
            console.log(`Successfully plotted ${points.length} points.`);
        }
    }

    // Initialize trail controls with current objects
    initializeTrailControls(pointsObject, lineObject, masterGpsPoints, bounds);

    // Return metadata for camera positioning
    return {
        dataSpan: Math.max(
            (bounds.maxLat - bounds.minLat) * 111320,
            (bounds.maxLon - bounds.minLon) * 111320
        ),
        firstPoint: points[0],
        firstPointVec: gpsToCartesian(points[0].lat, points[0].lon, points[0].alt),
        center,
        bounds,
        droneCount: droneStreams.length
    };
}

/**
 * Get information about current drone objects
 * @returns {Array} Array of drone object information
 */
export function getDroneObjects() {
    return droneObjects.map(drone => ({
        id: drone.id,
        color: drone.color,
        pointCount: drone.pointCount,
        visible: drone.points.visible
    }));
}

/**
 * Toggle visibility of a specific drone
 * @param {number} droneId - ID of the drone to toggle
 * @param {boolean} visible - Visibility state
 */
export function setDroneVisibility(droneId, visible) {
    const drone = droneObjects.find(d => d.id === droneId);
    if (drone) {
        drone.points.visible = visible;
        drone.line.visible = visible && getLineVisibility();
    }
}
// GPS DATA Plotting and Management

import * as THREE from "three";
import { initializeTrailControls, getCurrentTrailColors, getLineVisibility } from "./trailControls.js";

// Module state
let dataGroup = null;
let gpsToCartesian = null;
let center = null;
let bounds = null;
let baselineAltitude = null;
let pointsObject = null;
let lineObject = null;
let masterGpsPoints = [];

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
 * @returns {Object} Object containing positions and colors arrays
 */
function createGeometryFromPoints(points) {
    const colors = getCurrentTrailColors();
    const positions = [];
    const colorArray = [];

    points.forEach((p) => {
        const pos = gpsToCartesian(p.lat, p.lon, p.alt);
        positions.push(pos.x, pos.y, pos.z);
        
        const altRatio = (p.alt - bounds.minAlt) / (bounds.maxAlt - bounds.minAlt) || 0;
        const color = new THREE.Color().lerpColors(colors.head, colors.tail, altRatio);
        colorArray.push(color.r, color.g, color.b);
    });

    return { positions, colors: colorArray };
}

/**
 * Create Three.js objects from geometry data
 * @param {Object} geometryData - Object containing positions and colors
 */
function createThreeJsObjects(geometryData) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(geometryData.positions, 3)
    );
    geometry.setAttribute(
        "color", 
        new THREE.Float32BufferAttribute(geometryData.colors, 3)
    );

    pointsObject = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,
            sizeAttenuation: false,
        })
    );

    const colors = getCurrentTrailColors();
    lineObject = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
            color: colors.line,
        })
    );

    // Set line visibility based on current toggle state
    lineObject.visible = getLineVisibility();

    dataGroup.add(pointsObject, lineObject);
}

/**
 * Plot GPS data - can create new plot or append to existing
 * @param {Array} points - Array of GPS points
 * @param {boolean} append - Whether to append to existing data
 * @returns {Object} Object containing plot metadata
 */
export function plotGpsData(points, append = false) {
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
        
        // Create geometry from points
        const geometryData = createGeometryFromPoints(points);
        
        // Create Three.js objects
        createThreeJsObjects(geometryData);
        
        console.log(`Successfully plotted ${points.length} points.`);
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
        bounds
    };
}
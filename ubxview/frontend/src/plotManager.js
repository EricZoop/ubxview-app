import * as THREE from "three";
import {
    initializeTrailControls,
    getCurrentTrailColors,
    getLineVisibility,
    updatePointColors,
} from "./trailControls.js";

let latestPoint = null;

let dataGroup = null;
let gpsToCartesian = null;
let center = null;
let bounds = null;
let baselineAltitude = null;
let pointsObject = null;
let lineObject = null;
let masterGpsPoints = [];

// Add these variables to maintain stable coordinate system
let globalBounds = null;
let globalCenter = null;
let globalBaselineAltitude = null;
let isCoordinateSystemInitialized = false;

/**
 * Returns the most recently added data point.
 * @returns {THREE.Vector3 | null} The latest point as a Vector3, or null if no points exist.
 */
export function getLatestPoint() {
    if (!masterGpsPoints || masterGpsPoints.length === 0 || !gpsToCartesian) {
        return null;
    }
    
    // Get the last point from the master GPS points array
    const lastGpsPoint = masterGpsPoints[masterGpsPoints.length - 1];
    
    // Convert to cartesian coordinates and return
    return gpsToCartesian(lastGpsPoint.lat, lastGpsPoint.lon, lastGpsPoint.alt);
}

/**
 * Returns the calculated bounding box of the GPS data.
 * @returns {object | null} The bounds object, or null if not calculated.
 */
export function getBoundingBox() {
    return bounds;
}

export function initializePlotManager(group) {
    dataGroup = group;
}

export function getGpsToCartesian() {
    return gpsToCartesian;
}

export function getMasterGpsPoints() {
    return masterGpsPoints;
}

/**
 * Initialize the global coordinate system based on the complete dataset
 * This should be called once when the file is first loaded with all data
 */
export function initializeCoordinateSystem(allPoints) {
    if (!allPoints || allPoints.length === 0) return;

    globalBounds = allPoints.reduce(
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

    globalCenter = {
        lat: (globalBounds.minLat + globalBounds.maxLat) / 2,
        lon: (globalBounds.minLon + globalBounds.maxLon) / 2,
        alt: (globalBounds.minAlt + globalBounds.maxAlt) / 2,
    };

    globalBaselineAltitude = allPoints[0].alt;
    isCoordinateSystemInitialized = true;

    console.log("Global coordinate system initialized:", { globalCenter, globalBounds });
}

/**
 * Reset the coordinate system (call when loading a new file)
 */
export function resetCoordinateSystem() {
    globalBounds = null;
    globalCenter = null;
    globalBaselineAltitude = null;
    isCoordinateSystemInitialized = false;
}

function clearPlotData() {
    if (!dataGroup) return;

    // Specifically remove the points and line objects if they exist
    if (pointsObject) {
        if (pointsObject.geometry) {
            pointsObject.geometry.dispose();
        }
        if (pointsObject.material) {
            // Check if material is an array before disposing
            if (Array.isArray(pointsObject.material)) {
                pointsObject.material.forEach(m => m.dispose());
            } else {
                pointsObject.material.dispose();
            }
        }
        dataGroup.remove(pointsObject);
    }
    
    if (lineObject) {
        // The line shares geometry with points, so no need to dispose it again
        if (lineObject.material) {
            if (Array.isArray(lineObject.material)) {
                lineObject.material.forEach(m => m.dispose());
            } else {
                lineObject.material.dispose();
            }
        }
        dataGroup.remove(lineObject);
    }

    // Reset plot-specific variables but keep global coordinate system
    pointsObject = null;
    lineObject = null;
    masterGpsPoints = [];
    
    // Only reset local bounds/center, keep global ones for coordinate system stability
    center = null;
    bounds = null;
    baselineAltitude = null;
    latestPoint = null;
}

function calculateBoundsAndCenter(points) {
    if (!points || points.length === 0) return;

    // Calculate bounds for the current subset of points
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

function createCoordinateConverter() {
    gpsToCartesian = (p1, p2, p3) => {
        let lat, lon, alt;

        // Check if the first argument is an object with lat/lon properties
        if (typeof p1 === 'object' && p1 !== null && 'lat' in p1 && 'lon' in p1) {
            lat = p1.lat;
            lon = p1.lon;
            // Use the object's altitude if it exists, otherwise default to the baseline
            alt = p1.alt !== undefined ? p1.alt : (globalBaselineAltitude || baselineAltitude);
        } else {
            // Otherwise, assume the original (lat, lon, alt) signature
            lat = p1;
            lon = p2;
            // Use the provided altitude if it exists, otherwise default to the baseline
            alt = p3 !== undefined ? p3 : (globalBaselineAltitude || baselineAltitude);
        }

        // Use global coordinate system if initialized, otherwise fall back to local
        const useCenter = isCoordinateSystemInitialized ? globalCenter : center;
        const useBaselineAlt = isCoordinateSystemInitialized ? globalBaselineAltitude : baselineAltitude;

        // Defensive check to prevent NaN if data is still bad
        if (lat === undefined || lon === undefined || alt === undefined || useCenter === null || useBaselineAlt === null) {
            console.error("Invalid arguments or context for gpsToCartesian", { lat, lon, alt, useCenter });
            return new THREE.Vector3(0, 0, 0); // Return a default vector to prevent crashes
        }

        const centerLatRad = (useCenter.lat * Math.PI) / 180;
        const scaleFactor = 10.0;
        const x = (lon - useCenter.lon) * Math.cos(centerLatRad) * 111320 * scaleFactor;
        const y = (alt - useBaselineAlt) * 5;
        const z = (lat - useCenter.lat) * 111320 * scaleFactor;
        return new THREE.Vector3(x, y, -z);
    };
}

function createGeometryFromPoints(points) {
    const positions = [];
    const indices = [];
    
    points.forEach((p, index) => {
        const pos = gpsToCartesian(p.lat, p.lon, p.alt);
        positions.push(pos.x, pos.y, pos.z);
        
        // Add a small random offset to prevent z-fighting
        const offset = (Math.random() - 0.5) * 0.01;
        positions[positions.length - 1] += offset; // Offset z-coordinate slightly
        
        indices.push(index);
    });

    return {
        positions,
        indices
    };
}

function createThreeJsObjects(geometryData) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(geometryData.positions, 3)
    );

    const colorArray = new Float32Array(geometryData.positions.length);
    geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colorArray, 3)
    );

    // Fixed points material to match line rendering behavior
    const pointsMaterial = new THREE.PointsMaterial({
        size: 5,
        vertexColors: true,
        sizeAttenuation: false,
        transparent: false,  // Changed from true to match lines
        opacity: 1,
        depthTest: true,
        depthWrite: true,    // Changed from false to match lines
        blending: THREE.NormalBlending,
    });

    const pointsObj = new THREE.Points(geometry, pointsMaterial);
    
    // Set same render order as lines for consistency
    pointsObj.renderOrder = 0;  // Changed from 1 to match lines

    const colors = getCurrentTrailColors();
    const lineMaterial = new THREE.LineBasicMaterial({
        color: colors.line,
        transparent: false,
        opacity: 1,
        depthTest: true,
        depthWrite: true,
        linewidth: 10000,
    });

    const lineObj = new THREE.Line(geometry, lineMaterial);
    lineObj.renderOrder = 0;

    // Check current line visibility setting before adding to scene
    const lineToggle = document.getElementById('show-lines-toggle');
    lineObj.visible = lineToggle ? lineToggle.checked : false; // Default to false

    dataGroup.add(lineObj, pointsObj);

    return {
        points: pointsObj,
        line: lineObj
    };
}

export function plotGpsData(points, append = false) {
    if (!points) {
        points = [];
    }

    const allMasterPoints = getMasterGpsPoints();
    if ((!allMasterPoints || allMasterPoints.length === 0) && points.length === 0) {
        clearPlotData();
        return null;
    }

    if (!points || points.length === 0) {
        if (!append) clearPlotData();
        return null;
    }

    if (append && pointsObject && gpsToCartesian) {
        // When appending, add new points to the master list
        masterGpsPoints.push(...points);

        const newPositions = [];
        points.forEach((p) => {
            const pos = gpsToCartesian(p.lat, p.lon, p.alt);
            // Add small random offset to prevent z-fighting
            const offset = (Math.random() - 0.5) * 0.01;
            newPositions.push(pos.x, pos.y, pos.z + offset);
        });

        const geometry = pointsObject.geometry;
        const oldPositions = geometry.attributes.position.array;

        const combinedPositions = new Float32Array(
            oldPositions.length + newPositions.length
        );
        combinedPositions.set(oldPositions);
        combinedPositions.set(newPositions, oldPositions.length);

        const combinedColors = new Float32Array(combinedPositions.length);

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(combinedPositions, 3)
        );
        geometry.setAttribute(
            "color",
            new THREE.Float32BufferAttribute(combinedColors, 3)
        );

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();

        if (lineObject) {
            lineObject.geometry.dispose();
            lineObject.geometry = pointsObject.geometry;
        }

        console.log(`Appended ${points.length} points.`);
    } else {
        // When not appending (full replot), use the global coordinate system
        clearPlotData();
        masterGpsPoints = [...points];
        
        // Calculate local bounds for the current subset
        calculateBoundsAndCenter(points);
        
        // Create coordinate converter (will use global system if initialized)
        createCoordinateConverter();

        const geometryData = createGeometryFromPoints(points);
        const objects = createThreeJsObjects(geometryData);
        pointsObject = objects.points;
        lineObject = objects.line;
        console.log(`Successfully plotted ${points.length} points using ${isCoordinateSystemInitialized ? 'global' : 'local'} coordinate system.`);

        // Use global bounds for trail controls if available, otherwise use local bounds
        const boundsForTrailControls = isCoordinateSystemInitialized ? globalBounds : bounds;
        initializeTrailControls(pointsObject, lineObject, masterGpsPoints, boundsForTrailControls);
    }

    if (pointsObject) {
        updatePointColors();
    }

    // Return metadata using global bounds if available
    const returnBounds = isCoordinateSystemInitialized ? globalBounds : bounds;
    const returnCenter = isCoordinateSystemInitialized ? globalCenter : center;
    
    return {
        dataSpan: Math.max(
            (returnBounds.maxLat - returnBounds.minLat) * 111320,
            (returnBounds.maxLon - returnBounds.minLon) * 111320
        ),
        firstPoint: points[0],
        firstPointVec: gpsToCartesian(points[0].lat, points[0].lon, points[0].alt),
        center: returnCenter,
        bounds: returnBounds,
    };
}
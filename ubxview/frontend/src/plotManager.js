// plotManager.js

import * as THREE from "three";
import {
    initializeTrailControls,
    getCurrentTrailColors,
    updatePointColors,
} from "./trailControls.js";

// Module state
let dataGroup = null;
let gpsToCartesian = null;
let center = null;
let bounds = null;
let baselineAltitude = null;
let masterGpsPoints = [];

// Store plot objects (points and line) for each talker ID
let plotObjects = new Map();

// Global coordinate system state
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
    const lastGpsPoint = masterGpsPoints[masterGpsPoints.length - 1];
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
 * Initialize the global coordinate system based on the complete dataset.
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
 * Reset the coordinate system.
 */
export function resetCoordinateSystem() {
    globalBounds = null;
    globalCenter = null;
    globalBaselineAltitude = null;
    isCoordinateSystemInitialized = false;
}

/**
 * Clears all plotted data from the scene.
 */
function clearPlotData() {
    if (!dataGroup) return;

    // Iterate over the map and remove all objects
    plotObjects.forEach(({ points, line }) => {
        if (points) {
            if (points.geometry) points.geometry.dispose();
            if (points.material) {
                if (Array.isArray(points.material)) {
                    points.material.forEach(m => m.dispose());
                } else {
                    points.material.dispose();
                }
            }
            dataGroup.remove(points);
        }
        if (line) {
            // Geometry is shared, so it's already disposed with points
            if (line.material) {
                if (Array.isArray(line.material)) {
                    line.material.forEach(m => m.dispose());
                } else {
                    line.material.dispose();
                }
            }
            dataGroup.remove(line);
        }
    });

    plotObjects.clear();
    masterGpsPoints = [];
    center = null;
    bounds = null;
    baselineAltitude = null;
}


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

function createCoordinateConverter() {
    gpsToCartesian = (p1, p2, p3) => {
        let lat, lon, alt;

        if (typeof p1 === 'object' && p1 !== null && 'lat' in p1 && 'lon' in p1) {
            lat = p1.lat;
            lon = p1.lon;
            alt = p1.alt !== undefined ? p1.alt : (globalBaselineAltitude || baselineAltitude);
        } else {
            lat = p1;
            lon = p2;
            alt = p3 !== undefined ? p3 : (globalBaselineAltitude || baselineAltitude);
        }

        const useCenter = isCoordinateSystemInitialized ? globalCenter : center;
        const useBaselineAlt = isCoordinateSystemInitialized ? globalBaselineAltitude : baselineAltitude;

        if (lat === undefined || lon === undefined || alt === undefined || useCenter === null || useBaselineAlt === null) {
            console.error("Invalid arguments or context for gpsToCartesian", { lat, lon, alt, useCenter });
            return new THREE.Vector3(0, 0, 0);
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
    points.forEach((p) => {
        const pos = gpsToCartesian(p.lat, p.lon, p.alt);
        const offset = (Math.random() - 0.5) * 0.01;
        positions.push(pos.x, pos.y, pos.z + offset);
    });
    return { positions };
}

function createThreeJsObjects(geometryData) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(geometryData.positions, 3));
    const colorArray = new Float32Array(geometryData.positions.length);
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colorArray, 3));

    const pointsMaterial = new THREE.PointsMaterial({
        size: 5,
        vertexColors: true,
        sizeAttenuation: false,
        transparent: false,
        opacity: 1,
        depthTest: true,
        depthWrite: true,
        blending: THREE.NormalBlending,
    });
    const pointsObj = new THREE.Points(geometry, pointsMaterial);
    pointsObj.renderOrder = 0;

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

    const lineToggle = document.getElementById('show-lines-toggle');
    lineObj.visible = lineToggle ? lineToggle.checked : false;

    dataGroup.add(lineObj, pointsObj);
    return { points: pointsObj, line: lineObj };
}

export function plotGpsData(points, append = false) {
    let effectivePoints;
    if (append) {
        masterGpsPoints.push(...points);
        effectivePoints = masterGpsPoints;
    } else {
        masterGpsPoints = [...points];
        effectivePoints = masterGpsPoints;
    }

    if (effectivePoints.length === 0) {
        clearPlotData();
        return null;
    }
    
    // Always clear previous objects for a full replot
    plotObjects.forEach(({ points, line }) => {
        if(points) dataGroup.remove(points);
        if(line) dataGroup.remove(line);
    });
    plotObjects.clear();
    
    // <<< FIX IS HERE >>>
    // Always calculate the local bounds for the current set of points.
    // This ensures getBoundingBox() has the correct data for tile loading.
    calculateBoundsAndCenter(effectivePoints);
    createCoordinateConverter();

    // Group points by talkerId
    const pointsByTalker = effectivePoints.reduce((acc, point) => {
        const talker = point.talkerId || 'default'; // Group points without a talkerId
        if (!acc[talker]) {
            acc[talker] = [];
        }
        acc[talker].push(point);
        return acc;
    }, {});

    // Create and plot objects for each talker
    for (const talkerId in pointsByTalker) {
        const talkerPoints = pointsByTalker[talkerId];
        if (talkerPoints.length > 1) { // Only draw lines for tracks with more than one point
            const geometryData = createGeometryFromPoints(talkerPoints);
            const objects = createThreeJsObjects(geometryData);
            
            // Store the new objects and the corresponding GPS data
            plotObjects.set(talkerId, {
                points: objects.points,
                line: objects.line,
                gpsPoints: talkerPoints
            });
        }
    }
    
    console.log(`Successfully plotted ${effectivePoints.length} points across ${plotObjects.size} tracks.`);

    const boundsForTrailControls = isCoordinateSystemInitialized ? globalBounds : bounds;
    initializeTrailControls(plotObjects, masterGpsPoints, boundsForTrailControls);
    
    updatePointColors();

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
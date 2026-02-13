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
 */
export function getLatestPoint(talkerId = null) {
    if (!masterGpsPoints || masterGpsPoints.length === 0 || !gpsToCartesian) return null;
    
    if (talkerId === null) {
        const last = masterGpsPoints[masterGpsPoints.length - 1];
        return gpsToCartesian(last.lat, last.lon, last.alt);
    } else {
        const talkerPts = masterGpsPoints.filter(p => p.talkerId === talkerId);
        if (talkerPts.length === 0) return null;
        const last = talkerPts[talkerPts.length - 1];
        return gpsToCartesian(last.lat, last.lon, last.alt);
    }
}

export function getBoundingBox() { return bounds; }

export function initializePlotManager(group) { dataGroup = group; }

export function getGpsToCartesian() { return gpsToCartesian; }

export function getMasterGpsPoints() { return masterGpsPoints; }

export function getPlotObjects() { return plotObjects; }

/**
 * Returns separate bounding boxes for rover and aircraft points.
 * Used by tileManager to load different zoom levels.
 */
export function getBoundingBoxByType() {
    const roverPts = masterGpsPoints.filter(p => !p.isAircraft);
    const aircraftPts = masterGpsPoints.filter(p => p.isAircraft);

    return {
        rover: roverPts.length > 0 ? computeBoundsForPoints(roverPts) : null,
        aircraft: aircraftPts.length > 0 ? computeBoundsForPoints(aircraftPts) : null,
    };
}

function computeBoundsForPoints(points) {
    return points.reduce(
        (acc, p) => ({
            minLat: Math.min(acc.minLat, p.lat),
            maxLat: Math.max(acc.maxLat, p.lat),
            minLon: Math.min(acc.minLon, p.lon),
            maxLon: Math.max(acc.maxLon, p.lon),
            minAlt: Math.min(acc.minAlt, p.alt),
            maxAlt: Math.max(acc.maxAlt, p.alt),
        }), {
            minLat: Infinity, maxLat: -Infinity,
            minLon: Infinity, maxLon: -Infinity,
            minAlt: Infinity, maxAlt: -Infinity,
        }
    );
}

/**
 * Set visibility for a list of talker IDs.
 * Used by eye-toggle buttons per capture.
 */
export function setTrackVisibility(talkerIds, visible) {
    if (!plotObjects) return;
    talkerIds.forEach(id => {
        const obj = plotObjects.get(id);
        if (obj) {
            if (obj.points) obj.points.visible = visible;
            if (obj.line) obj.line.visible = visible;
        }
    });
}

/**
 * Initialize the global coordinate system based on the complete dataset.
 */
export function initializeCoordinateSystem(allPoints) {
    if (!allPoints || allPoints.length === 0) return;

    globalBounds = computeBoundsForPoints(allPoints);

    globalCenter = {
        lat: (globalBounds.minLat + globalBounds.maxLat) / 2,
        lon: (globalBounds.minLon + globalBounds.maxLon) / 2,
        alt: (globalBounds.minAlt + globalBounds.maxAlt) / 2,
    };

    globalBaselineAltitude = allPoints[0].alt;
    isCoordinateSystemInitialized = true;
    console.log("Global coordinate system initialized:", { globalCenter, globalBounds });
}

export function resetCoordinateSystem() {
    globalBounds = null;
    globalCenter = null;
    globalBaselineAltitude = null;
    isCoordinateSystemInitialized = false;
}

function clearPlotData() {
    if (!dataGroup) return;
    plotObjects.forEach(({ points, line }) => {
        if (points) {
            if (points.geometry) points.geometry.dispose();
            if (points.material) {
                if (Array.isArray(points.material)) points.material.forEach(m => m.dispose());
                else points.material.dispose();
            }
            dataGroup.remove(points);
        }
        if (line) {
            if (line.material) {
                if (Array.isArray(line.material)) line.material.forEach(m => m.dispose());
                else line.material.dispose();
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
    bounds = computeBoundsForPoints(points);
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
        if (typeof p1 === 'object' && p1 !== null && 'lat' in p1) {
            lat = p1.lat; lon = p1.lon;
            alt = p1.alt !== undefined ? p1.alt : (globalBaselineAltitude || baselineAltitude);
        } else {
            lat = p1; lon = p2;
            alt = p3 !== undefined ? p3 : (globalBaselineAltitude || baselineAltitude);
        }

        const useCenter = isCoordinateSystemInitialized ? globalCenter : center;
        const useBaseAlt = isCoordinateSystemInitialized ? globalBaselineAltitude : baselineAltitude;

        if (lat === undefined || lon === undefined || alt === undefined || useCenter === null || useBaseAlt === null) {
            console.error("Invalid args for gpsToCartesian", { lat, lon, alt, useCenter });
            return new THREE.Vector3(0, 0, 0);
        }

        const centerLatRad = (useCenter.lat * Math.PI) / 180;
        const scaleFactor = 10.0;
        const x = (lon - useCenter.lon) * Math.cos(centerLatRad) * 111320 * scaleFactor;
        const y = (alt - useBaseAlt) * 5;
        const z = (lat - useCenter.lat) * 111320 * scaleFactor;
        return new THREE.Vector3(x, y, -z);
    };
}

function createGeometryFromPoints(points) {
    const positions = [];
    points.forEach(p => {
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
        size: 5, vertexColors: true, sizeAttenuation: false,
        transparent: false, opacity: 1, depthTest: true, depthWrite: true,
        blending: THREE.NormalBlending,
    });
    const pointsObj = new THREE.Points(geometry, pointsMaterial);
    pointsObj.renderOrder = 0;

    const colors = getCurrentTrailColors();
    const lineMaterial = new THREE.LineBasicMaterial({
        color: colors.line, transparent: false, opacity: 1,
        depthTest: true, depthWrite: true, linewidth: 10000,
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
    
    plotObjects.forEach(({ points, line }) => {
        if (points) dataGroup.remove(points);
        if (line) dataGroup.remove(line);
    });
    plotObjects.clear();
    
    calculateBoundsAndCenter(effectivePoints);
    createCoordinateConverter();

    const pointsByTalker = effectivePoints.reduce((acc, point) => {
        const talker = point.talkerId || 'default';
        if (!acc[talker]) acc[talker] = [];
        acc[talker].push(point);
        return acc;
    }, {});

    for (const talkerId in pointsByTalker) {
        const talkerPts = pointsByTalker[talkerId];
        if (talkerPts.length > 1) {
            const geomData = createGeometryFromPoints(talkerPts);
            const objects = createThreeJsObjects(geomData);
            plotObjects.set(talkerId, {
                points: objects.points,
                line: objects.line,
                gpsPoints: talkerPts
            });
        }
    }
    
    console.log(`Plotted ${effectivePoints.length} points across ${plotObjects.size} tracks.`);

    const boundsForTrail = isCoordinateSystemInitialized ? globalBounds : bounds;
    initializeTrailControls(plotObjects, masterGpsPoints, boundsForTrail);
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
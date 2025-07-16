import * as THREE from "three";
import {
    initializeTrailControls,
    getCurrentTrailColors,
    getLineVisibility,
    updatePointColors,
} from "./trailControls.js";

let dataGroup = null;
let gpsToCartesian = null;
let center = null;
let bounds = null;
let baselineAltitude = null;
let pointsObject = null;
let lineObject = null;
let masterGpsPoints = [];

export function initializePlotManager(group) {
    dataGroup = group;
}

export function getGpsToCartesian() {
    return gpsToCartesian;
}

export function getMasterGpsPoints() {
    return masterGpsPoints;
}

function clearPlotData() {
    if (!dataGroup) return;

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

    pointsObject = null;
    lineObject = null;
    masterGpsPoints = [];
    gpsToCartesian = null;
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
    gpsToCartesian = (lat, lon, alt) => {
        const centerLatRad = (center.lat * Math.PI) / 180;
        const scaleFactor = 10.0;
        const x =
            (lon - center.lon) * Math.cos(centerLatRad) * 111320 * scaleFactor;
        const y = (alt - baselineAltitude) * 5;
        const z = (lat - center.lat) * 111320 * scaleFactor;
        return new THREE.Vector3(x, y, -z);
    };
}

function createGeometryFromPoints(points) {
    const positions = [];
    points.forEach((p) => {
        const pos = gpsToCartesian(p.lat, p.lon, p.alt);
        positions.push(pos.x, pos.y, pos.z);
    });

    return {
        positions
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

    const pointsObj = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,
            sizeAttenuation: false,
        })
    );

    const colors = getCurrentTrailColors();
    const lineObj = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
            color: colors.line,
        })
    );

    lineObj.visible = getLineVisibility();

    dataGroup.add(pointsObj, lineObj);

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
            newPositions.push(pos.x, pos.y, pos.z);
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
        clearPlotData();
        masterGpsPoints = [...points];
        calculateBoundsAndCenter(points);
        createCoordinateConverter();

        const geometryData = createGeometryFromPoints(points);
        const objects = createThreeJsObjects(geometryData);
        pointsObject = objects.points;
        lineObject = objects.line;
        console.log(`Successfully plotted ${points.length} points.`);

        initializeTrailControls(pointsObject, lineObject, masterGpsPoints, bounds);
    }

    if (pointsObject) {
        updatePointColors();
    }

    return {
        dataSpan: Math.max(
            (bounds.maxLat - bounds.minLat) * 111320,
            (bounds.maxLon - bounds.minLon) * 111320
        ),
        firstPoint: points[0],
        firstPointVec: gpsToCartesian(points[0].lat, points[0].lon, points[0].alt),
        center,
        bounds,
    };
}
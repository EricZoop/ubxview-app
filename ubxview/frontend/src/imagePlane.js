//addImagePlane.js

import * as THREE from 'three';

/**
 * Adds an image plane to the scene and returns the mesh so opacity can be updated.
 */
export function addImagePlane(topLeft, bottomRight, imageUrl, gpsToCartesian, scene, stackIndex = 0, opacity = 1.0) {
    const topLeftVec = gpsToCartesian(topLeft.lat, topLeft.lon, 0);
    const bottomRightVec = gpsToCartesian(bottomRight.lat, bottomRight.lon, 0);

    const width = bottomRightVec.x - topLeftVec.x;
    const height = bottomRightVec.z - topLeftVec.z;

    const geometry = new THREE.PlaneGeometry(Math.abs(width), Math.abs(height));
    const loader = new THREE.TextureLoader();

    return new Promise((resolve) => {
        loader.load(imageUrl, (texture) => {
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: opacity,
                depthWrite: false,
                polygonOffset: true,
                alphaTest: 0.01,
                polygonOffsetFactor: -stackIndex * 2, // Increase offset multiplier
                polygonOffsetUnits: -stackIndex * 2, // Increase offset multiplier
                blending: THREE.NormalBlending,
            });

            const plane = new THREE.Mesh(geometry, material);
            const centerX = (topLeftVec.x + bottomRightVec.x) / 2;
            const centerZ = (topLeftVec.z + bottomRightVec.z) / 2;

            plane.position.set(centerX, 10.0 + stackIndex * 0.001, centerZ);
            plane.rotation.x = -Math.PI / 2;
            scene.add(plane);

            resolve(plane); // <-- Return mesh to control later
        });
    });
}

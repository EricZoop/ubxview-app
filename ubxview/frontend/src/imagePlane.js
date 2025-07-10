import * as THREE from 'three';

export function addImagePlane(topLeft, bottomRight, imageUrl, gpsToCartesian, scene) {
    const topLeftVec = gpsToCartesian(topLeft.lat, topLeft.lon, 0);
    const bottomRightVec = gpsToCartesian(bottomRight.lat, bottomRight.lon, 0);

    const width = bottomRightVec.x - topLeftVec.x;
    const height = bottomRightVec.z - topLeftVec.z;

    const geometry = new THREE.PlaneGeometry(Math.abs(width), Math.abs(height));
    const loader = new THREE.TextureLoader();

    loader.load(imageUrl, (texture) => {
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: .5,

            // --- Add these three lines ---

        });

        const plane = new THREE.Mesh(geometry, material);
        const centerX = (topLeftVec.x + bottomRightVec.x) / 2;
        const centerZ = (topLeftVec.z + bottomRightVec.z) / 2;

        plane.position.set(centerX, 10.0, centerZ);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);
    });
}

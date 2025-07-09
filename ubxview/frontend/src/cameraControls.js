import * as THREE from "three";

/**
 * Sets up mouse and wheel controls for the camera.
 * @param {THREE.PerspectiveCamera} camera - The Three.js camera object
 * @returns {Object} controls - The camera controls object
 */
export function setupCameraControls(camera) {
    let isMouseDown = false;
    let isPanning = false;
    let mouseX = 0,
        mouseY = 0;

    const controls = {
        distance: 2000, // Initial zoom
        angleX: Math.PI / 6,
        angleY: Math.PI / 4,
        panOffset: new THREE.Vector3(0, 0, 0),

        updateCameraPosition: function () {
            const x = Math.cos(this.angleY) * Math.cos(this.angleX) * this.distance;
            const y = Math.sin(this.angleX) * this.distance;
            const z = Math.sin(this.angleY) * Math.cos(this.angleX) * this.distance;
            camera.position.set(
                x + this.panOffset.x,
                y + this.panOffset.y,
                z + this.panOffset.z
            );
            camera.lookAt(this.panOffset);
        },

        // Modified to preserve camera angles and only adjust distance and pan offset
        adjustForNewData: function (dataSpan, centerVec) {
            // Calculate appropriate distance based on data span
            const newDistance = Math.max(dataSpan * 1.5, 200);
            
            // Only update distance if it's significantly different or if this is the first data load
            if (Math.abs(this.distance - newDistance) > this.distance * 0.5 || this.distance === 2000) {
                this.distance = newDistance;
            }
            
            // Smoothly transition pan offset to new center
            this.panOffset.lerp(centerVec, 0.3);
            
            this.updateCameraPosition();
        },

        // Keep the original reset function for manual resets if needed
        reset: function (dataSpan, centerVec) {
            this.distance = Math.max(dataSpan * 1.5, 200);
            this.panOffset.copy(centerVec);
            this.angleX = Math.PI / 6;
            this.angleY = Math.PI / 4;
            this.updateCameraPosition();
        },
    };

    document.addEventListener("mousedown", (e) => {
        if (e.target.closest("#info")) return;
        isMouseDown = true;
        isPanning = e.shiftKey || e.button === 1;
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (e.button === 1) e.preventDefault();
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false;
        isPanning = false;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isMouseDown) return;
        const deltaX = e.clientX - mouseX;
        const deltaY = e.clientY - mouseY;

        if (isPanning) {
            const panSpeed = controls.distance * 0.001;
            const cameraDir = new THREE.Vector3();
            camera.getWorldDirection(cameraDir);
            const cameraRight = new THREE.Vector3().crossVectors(cameraDir, camera.up).normalize();
            const cameraUp = new THREE.Vector3().crossVectors(cameraRight, cameraDir).normalize();
            controls.panOffset.add(cameraRight.multiplyScalar(-deltaX * panSpeed));
            controls.panOffset.add(cameraUp.multiplyScalar(deltaY * panSpeed));
        } else {
            controls.angleY += deltaX * 0.005;
            controls.angleX += deltaY * 0.005;
            controls.angleX = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, controls.angleX));
        }

        mouseX = e.clientX;
        mouseY = e.clientY;
        controls.updateCameraPosition();
    });

    document.addEventListener("wheel", (e) => {
        if (e.target.closest("#info")) return;
        controls.distance += e.deltaY * 0.5;
        controls.distance = Math.max(50, controls.distance);
        controls.updateCameraPosition();
    });

    document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
    const orbitSpeed = 0.05;
    const panSpeed = controls.distance * 0.01;

    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);
    const cameraRight = new THREE.Vector3().crossVectors(cameraDir, camera.up).normalize();
    const cameraUp = new THREE.Vector3().crossVectors(cameraRight, cameraDir).normalize();

    if (e.shiftKey) {
        // Panning with Shift + Arrows
        if (e.key === "ArrowLeft") {
            controls.panOffset.add(cameraRight.clone().multiplyScalar(-panSpeed));
        } else if (e.key === "ArrowRight") {
            controls.panOffset.add(cameraRight.clone().multiplyScalar(panSpeed));
        } else if (e.key === "ArrowUp") {
            controls.panOffset.add(cameraUp.clone().multiplyScalar(panSpeed));
        } else if (e.key === "ArrowDown") {
            controls.panOffset.add(cameraUp.clone().multiplyScalar(-panSpeed));
        }
    } else {
        // Orbiting with just Arrows
        if (e.key === "ArrowLeft") {
            controls.angleY -= orbitSpeed;
        } else if (e.key === "ArrowRight") {
            controls.angleY += orbitSpeed;
        } else if (e.key === "ArrowUp") {
            controls.angleX -= orbitSpeed;
            controls.angleX = Math.max(-Math.PI / 2 + 0.01, controls.angleX);
        } else if (e.key === "ArrowDown") {
            controls.angleX += orbitSpeed;
            controls.angleX = Math.min(Math.PI / 2 - 0.01, controls.angleX);
        }
    }

    // Optional: Zoom with W/S keys
    if (e.key === "w" || e.key === "W") {
        controls.distance = Math.max(50, controls.distance - 50);
    } else if (e.key === "s" || e.key === "S") {
        controls.distance += 50;
    }

    controls.updateCameraPosition();
});

    return controls;
}
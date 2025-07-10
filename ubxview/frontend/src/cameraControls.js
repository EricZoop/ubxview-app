import * as THREE from "three";

/**
 * Sets up mouse and keyboard controls for a "fly-through" camera.
 * @param {THREE.PerspectiveCamera} camera - The Three.js camera object.
 * @returns {Object} controls - The camera controls object with an update method.
 */
export function setupCameraControls(camera) {

    // --- State variables for mouse control ---
    let isMouseDown = false;
    let isPanning = false; // <<< RE-INTRODUCED: Tracks if the current action is panning.
    let mouseX = 0;
    let mouseY = 0;

    // --- State for keyboard controls ---
    const keyState = {};

    const controls = {
        // --- Camera positioning properties ---
        distance: 2000,
        angleX: Math.PI / 6,
        angleY: Math.PI / 4,
        panOffset: new THREE.Vector3(0, 0, 0),
        
        // --- Control sensitivity ---
        moveSpeed: 10,
        lookSpeed: 0.01,

        /**
         * Recalculates and sets the camera's position and orientation.
         */
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
        
        /**
         * This is the core update loop for keyboard controls.
         */
        update: function() {
            const dynamicMoveSpeed = this.distance * 0.01;

            const cameraDir = new THREE.Vector3();
            camera.getWorldDirection(cameraDir);
            
            const cameraRight = new THREE.Vector3().crossVectors(camera.up, cameraDir).normalize();
            const cameraUp = new THREE.Vector3().crossVectors(cameraDir, cameraRight).normalize();

            let moved = false;

            // --- Camera Movement (WASDQE) ---
            if (keyState['w'] || keyState['W']) {
                this.panOffset.add(cameraDir.clone().multiplyScalar(dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['s'] || keyState['S']) {
                this.panOffset.add(cameraDir.clone().multiplyScalar(-dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['d'] || keyState['D']) {
                this.panOffset.add(cameraRight.clone().multiplyScalar(-dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['a'] || keyState['A']) {
                this.panOffset.add(cameraRight.clone().multiplyScalar(dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['e'] || keyState['E']) { // Up
                this.panOffset.add(cameraUp.clone().multiplyScalar(dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['q'] || keyState['Q']) { // Down
                this.panOffset.add(cameraUp.clone().multiplyScalar(-dynamicMoveSpeed));
                moved = true;
            }

            // --- Camera Look (Arrow Keys) ---
            if (keyState['ArrowRight']) {
                this.angleY -= this.lookSpeed;
                moved = true;
            }
            if (keyState['ArrowLeft']) {
                this.angleY += this.lookSpeed;
                moved = true;
            }
            if (keyState['ArrowUp']) {
                this.angleX += this.lookSpeed;
                this.angleX = Math.min(Math.PI / 2 - 0.01, this.angleX);
                moved = true;
            }
            if (keyState['ArrowDown']) {
                this.angleX -= this.lookSpeed;
                this.angleX = Math.max(-Math.PI / 2 + 0.01, this.angleX);
                moved = true;
            }
            
            if(moved) {
                this.updateCameraPosition();
            }
        },

        // --- Utility functions ---
        adjustForNewData: function (dataSpan, centerVec) {
            const newDistance = Math.max(dataSpan * 1.5, 200);
            if (Math.abs(this.distance - newDistance) > this.distance * 0.5 || this.distance === 2000) {
                this.distance = newDistance;
            }
            this.panOffset.lerp(centerVec, 0.3);
            this.updateCameraPosition();
        },

        reset: function (dataSpan, centerVec) {
            this.distance = Math.max(dataSpan * 1.5, 200);
            this.panOffset.copy(centerVec);
            this.angleX = Math.PI / 6;
            this.angleY = Math.PI / 4;
            this.updateCameraPosition();
        },
    };

    // --- Event Listeners ---
    document.addEventListener("keydown", (e) => { keyState[e.key] = true; });
    document.addEventListener("keyup", (e) => { keyState[e.key] = false; });

    // --- Mouse Listeners (MODIFIED) ---
    document.addEventListener("mousedown", (e) => {
        if (e.target.closest("#info")) return;
        isMouseDown = true;
        
        // <<< MODIFIED: Check for Shift key OR middle mouse button (button === 1)
        isPanning = e.shiftKey || e.button === 1;

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Prevent default browser action (like autoscroll) for middle mouse
        if (e.button === 1) e.preventDefault();
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false;
        isPanning = false; // <<< MODIFIED: Reset panning state on mouse up
    });

    document.addEventListener("mousemove", (e) => {
        if (!isMouseDown) return;
        const deltaX = e.clientX - mouseX;
        const deltaY = e.clientY - mouseY;

        // <<< MODIFIED: Check the "isPanning" state variable instead of e.shiftKey
        if (isPanning) {
            const panSpeed = controls.distance * 0.001;
            const cameraDir = new THREE.Vector3();
            camera.getWorldDirection(cameraDir);
            const cameraRight = new THREE.Vector3().crossVectors(cameraDir, camera.up).normalize();
            const cameraUp = new THREE.Vector3().crossVectors(cameraRight, cameraDir).normalize();
            controls.panOffset.add(cameraRight.multiplyScalar(-deltaX * panSpeed));
            controls.panOffset.add(cameraUp.multiplyScalar(deltaY * panSpeed));
        } else { // Orbiting with Left Mouse
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

    return controls;
}
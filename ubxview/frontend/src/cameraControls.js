import * as THREE from "three";

/**
 * Sets up mouse and keyboard controls for a "fly-through" camera.
 * @param {THREE.PerspectiveCamera} camera - The Three.js camera object.
 * @returns {Object} controls - The camera controls object with an update method.
 */
export function setupCameraControls(camera) {

    // --- State variables for caching data context for reset ---
    let cachedDataSpan = null;
    let cachedCenterVec = null;

    // --- State variables for mouse control ---
    let isMouseDown = false;
    let isPanning = false; 
    let mouseX = 0;
    let mouseY = 0;

    // --- State for keyboard controls ---
    const keyState = {};

    // --- State for cinematic camera ---
    let isCinematicMode = false;
    let cinematicTarget = new THREE.Vector3();
    let cachedAngleX = null;
    let cachedAngleY = null;
    let cachedDistance = null; // To store distance before cinematic mode

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
            if (isCinematicMode) {
                this.updateCinematic();
                return;
            }

            const dynamicMoveSpeed = this.distance * 0.01;

            const cameraDir = new THREE.Vector3();
            camera.getWorldDirection(cameraDir);
            
            const cameraRight = new THREE.Vector3().crossVectors(camera.up, cameraDir).normalize();
            const cameraUp = new THREE.Vector3().crossVectors(cameraDir, cameraRight).normalize();

            let moved = false;

            // --- MODIFIED: Camera Movement checks now use event.code ---
            if (keyState['KeyW']) {
                this.panOffset.add(cameraDir.clone().multiplyScalar(dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['KeyS']) {
                this.panOffset.add(cameraDir.clone().multiplyScalar(-dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['KeyD']) {
                this.panOffset.add(cameraRight.clone().multiplyScalar(-dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['KeyA']) {
                this.panOffset.add(cameraRight.clone().multiplyScalar(dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['KeyE']) { // Up
                this.panOffset.add(cameraUp.clone().multiplyScalar(dynamicMoveSpeed));
                moved = true;
            }
            if (keyState['KeyQ']) { // Down
                this.panOffset.add(cameraUp.clone().multiplyScalar(-dynamicMoveSpeed));
                moved = true;
            }

            // --- MODIFIED: Camera Look checks now use event.code for consistency ---
            if (keyState['ArrowLeft']) {
                this.angleY -= this.lookSpeed;
                moved = true;
            }
            if (keyState['ArrowRight']) {
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

        updateCinematic: function() {
            // Smoothly interpolate the camera's look-at point (panOffset) towards the cinematic target.
            this.panOffset.lerp(cinematicTarget, 0.05);

            // Use the cached distance as the target. Fallback to 600 if not set.
            const desiredDistance = cachedDistance || 900;
            this.distance += (desiredDistance - this.distance) * 0.05;

            // Slowly orbit around the target for a more dynamic "cinematic" feel.
            this.angleY += 0.0000;

            this.updateCameraPosition();
        },

        toggleCinematicMode: function () {
            isCinematicMode = !isCinematicMode;
            console.log(`Cinematic mode ${isCinematicMode ? 'enabled' : 'disabled'}`);
            
            if (isCinematicMode) {
                // Cache the current angles and distance
                cachedAngleX = this.angleX;
                cachedAngleY = this.angleY;
                cachedDistance = this.distance;
            } else {
                // Restore previous angles when exiting
                if (cachedAngleX !== null && cachedAngleY !== null) {
                    this.angleX = cachedAngleX;
                    this.angleY = cachedAngleY;
                }
            }
        },


        setCinematicTarget: function(target) {
            if (target instanceof THREE.Vector3) {
                cinematicTarget.copy(target);
            }
        },
        
        isCinematicActive: function() {
            return isCinematicMode;
        },

        // --- Utility functions ---
        adjustForNewData: function (dataSpan, centerVec) {
            cachedDataSpan = dataSpan;
            cachedCenterVec = centerVec;
            const newDistance = Math.max(dataSpan * 1.5, 200);
            if (Math.abs(this.distance - newDistance) > this.distance * 0.5 || this.distance === 2000) {
                this.distance = newDistance;
            }
            this.panOffset.lerp(centerVec, 0.3);
            this.updateCameraPosition();
        },

        reset: function (dataSpan, centerVec) {
            isCinematicMode = false; // Ensure cinematic mode is off on reset
            cachedDataSpan = dataSpan;
            cachedCenterVec = centerVec;
            this.distance = Math.max(dataSpan * 1.5, 200);
            this.panOffset.copy(centerVec);
            this.angleX = Math.PI / 6;
            this.angleY = Math.PI / 4;
            this.updateCameraPosition();
        },
    };

    // --- MODIFIED: Event Listeners now use event.code ---
    document.addEventListener("keydown", (e) => {
        // Allow cinematic toggle even if other keys are pressed
        if (e.code === 'KeyC') {
            controls.toggleCinematicMode();
            return;
        }

        // Check for the physical 'R' key
        if (e.code === 'KeyR') {
            // Always break out of cinematic mode
            isCinematicMode = false;

            // Reset if cached values are available
            if (cachedDataSpan !== null && cachedCenterVec !== null) {
                controls.reset(cachedDataSpan, cachedCenterVec);
            }
            return; 
        }
        if (isCinematicMode) return; // Disable keyboard controls in cinematic mode
        keyState[e.code] = true;
    });
    
    document.addEventListener("keyup", (e) => { 
        keyState[e.code] = false; 
    });

    // --- Sticky key fix for window focus loss ---
    window.addEventListener("blur", () => {
        for (const key in keyState) {
            keyState[key] = false;
        }
    });

    // --- Mouse Listeners ---
    document.addEventListener("mousedown", (e) => {
        if (isCinematicMode) return; // Disable mouse controls in cinematic mode
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
        if (!isMouseDown || isCinematicMode) return; // Disable mouse controls in cinematic mode
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
        if (isCinematicMode) return; // Disable wheel zoom in cinematic mode
        if (e.target.closest("#info")) return;
        controls.distance += e.deltaY * 0.5;
        controls.distance = Math.max(50, controls.distance);
        controls.updateCameraPosition();
    });

    document.addEventListener("contextmenu", (e) => e.preventDefault());

    return controls;
}
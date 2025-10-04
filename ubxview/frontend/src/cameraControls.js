import * as THREE from "three";

/**
 * Sets up mouse and keyboard controls for a "fly-through" camera with birdseye orthographic view.
 * @param {THREE.PerspectiveCamera} camera - The Three.js camera object.
 * @param {THREE.Scene} scene - The Three.js scene object (needed for orthographic camera setup).
 * @returns {Object} controls - The camera controls object with an update method.
 */
export function setupCameraControls(camera, scene) {

    // --- DOM Elements for UI feedback ---
    const cinematicControlRow = document.getElementById('cinematic-control-row');
    const birdseyeControlRow = document.getElementById('birdseye-control-row');
    const reorientControlRow = document.getElementById('reorient-control-row');

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
    let cachedDistance = null; // To store distance before cinematic mode
    let targetTalkerId = null; // null means track latest point across all tracks
    let talkerIdList = []; // Ordered list of talker IDs discovered in the data

    // --- State for birdseye orthographic view ---
    let isBirdseyeMode = false;
    let originalCamera = camera; // Store reference to original perspective camera
    let orthographicCamera = null;
    let currentCamera = camera; // Track which camera is currently active
    
    // Cache original camera state for restoration
    let cachedPerspectivePosition = new THREE.Vector3();
    let cachedPerspectiveTarget = new THREE.Vector3();
    let cachedPerspectiveDistance = 1000;
    let cachedPerspectiveAngles = { x: Math.PI / 6, y: Math.PI / 4 };

    const controls = {
        // --- Camera positioning properties ---
        distance: 1000,
        angleX: Math.PI / 6,
        angleY: Math.PI / 4,
        panOffset: new THREE.Vector3(0, 0, 0),
        
        // --- Control sensitivity ---
        moveSpeed: 10,
        lookSpeed: 0.01,

        /**
         * Get the currently active camera (perspective or orthographic)
         */
        getCurrentCamera: function() {
            return currentCamera;
        },

        /**
         * Recalculates and sets the camera's position and orientation.
         */
        updateCameraPosition: function () {
            if (isBirdseyeMode && orthographicCamera) {
                // For orthographic birdseye view, position camera directly above the target
                // Use a much higher height for better overview
                const height = Math.max(this.distance * 2, 2000);
                orthographicCamera.position.set(
                    this.panOffset.x,
                    this.panOffset.y + height,
                    this.panOffset.z
                );
                orthographicCamera.lookAt(this.panOffset);
                
                // Update orthographic camera size based on distance and window aspect ratio
                const aspect = window.innerWidth / window.innerHeight;
                const size = this.distance * 0.8; // This 'size' represents the vertical view extent (half-height)
                
                orthographicCamera.left = -size * aspect;
                orthographicCamera.right = size * aspect;
                orthographicCamera.top = size;
                orthographicCamera.bottom = -size;
                
                // Adjust near and far planes for the height
                orthographicCamera.near = 0.1;
                orthographicCamera.far = height * 2;
                orthographicCamera.updateProjectionMatrix();
            } else {
                // Original perspective camera positioning
                const x = Math.cos(this.angleY) * Math.cos(this.angleX) * this.distance;
                const y = Math.sin(this.angleX) * this.distance;
                const z = Math.sin(this.angleY) * Math.cos(this.angleX) * this.distance;
                
                currentCamera.position.set(
                    x + this.panOffset.x,
                    y + this.panOffset.y,
                    z + this.panOffset.z
                );
                currentCamera.lookAt(this.panOffset);
            }
        },
        
        /**
         * This is the core update loop for keyboard controls.
         */
        update: function() {
            if (isCinematicMode && !isBirdseyeMode) {
                this.updateCinematic();
                // We still process keyboard movements in cinematic mode for panning
            }

            const dynamicMoveSpeed = this.distance * 0.02;

            const cameraDir = new THREE.Vector3();
            currentCamera.getWorldDirection(cameraDir);
            
            let cameraRight, cameraUp;
            
            if (isBirdseyeMode) {
                // In birdseye mode, movement is aligned with world axes
                cameraRight = new THREE.Vector3(1, 0, 0); // East-West
                cameraUp = new THREE.Vector3(0, 0, -1);   // North-South (negative Z is north)
            } else {
                cameraRight = new THREE.Vector3().crossVectors(currentCamera.up, cameraDir).normalize();
                cameraUp = new THREE.Vector3().crossVectors(cameraDir, cameraRight).normalize();
            }

            let moved = false;

            // --- Camera Movement checks ---
            if (keyState['KeyW']) {
                if (isBirdseyeMode) {
                    this.panOffset.add(new THREE.Vector3(0, 0, -dynamicMoveSpeed)); // North
                } else {
                    this.panOffset.add(cameraDir.clone().multiplyScalar(dynamicMoveSpeed));
                }
                moved = true;
            }
            if (keyState['KeyS']) {
                if (isBirdseyeMode) {
                    this.panOffset.add(new THREE.Vector3(0, 0, dynamicMoveSpeed)); // South
                } else {
                    this.panOffset.add(cameraDir.clone().multiplyScalar(-dynamicMoveSpeed));
                }
                moved = true;
            }
            if (keyState['KeyD']) {
                if (isBirdseyeMode) {
                    this.panOffset.add(new THREE.Vector3(dynamicMoveSpeed, 0, 0)); // East
                } else {
                    this.panOffset.add(cameraRight.clone().multiplyScalar(-dynamicMoveSpeed));
                }
                moved = true;
            }
            if (keyState['KeyA']) {
                if (isBirdseyeMode) {
                    this.panOffset.add(new THREE.Vector3(-dynamicMoveSpeed, 0, 0)); // West
                } else {
                    this.panOffset.add(cameraRight.clone().multiplyScalar(dynamicMoveSpeed));
                }
                moved = true;
            }

            // Handle vertical panning in perspective view and zooming in birdseye view
            if (isBirdseyeMode) {
                const zoomSpeed = this.distance * 0.03; // Define a speed for zooming
                if (keyState['KeyQ']) { // Zoom In
                    this.distance -= zoomSpeed;
                    this.distance = Math.max(50, this.distance); // Prevent zooming in too far
                    moved = true;
                }
                if (keyState['KeyE']) { // Zoom Out
                    this.distance += zoomSpeed;
                    moved = true;
                }
            } else {
                // Original vertical pan controls for perspective mode
                if (keyState['KeyE']) { // Up
                    this.panOffset.add(new THREE.Vector3(0, dynamicMoveSpeed, 0));
                    moved = true;
                }
                if (keyState['KeyQ']) { // Down
                    this.panOffset.add(new THREE.Vector3(0, -dynamicMoveSpeed, 0));
                    moved = true;
                }
            }

            // --- Camera Look checks (only for perspective mode) ---
            if (!isBirdseyeMode) {
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
            }
            
            if(moved) {
                this.updateCameraPosition();
            }
        },

        updateCinematic: function() {
            // Smoothly interpolate the camera's look-at point (panOffset) towards the cinematic target.
            this.panOffset.lerp(cinematicTarget, 0.05);

            // Use the cached distance as the target. Fallback to 1000 if not set.
            const desiredDistance = cachedDistance || 1000;
            this.distance += (desiredDistance - this.distance) * 0.05;

            this.updateCameraPosition();
        },

        toggleCinematicMode: function () {
            if (isBirdseyeMode) {
                this.toggleBirdseyeMode(); // This will also update the UI correctly
            }

            isCinematicMode = !isCinematicMode;
            
            // Reset target when toggling off
            if (!isCinematicMode) {
                targetTalkerId = null;
            }
            
            console.log(`Cinematic mode ${isCinematicMode ? 'enabled' : 'disabled'}`);
            
            if (cinematicControlRow) {
                cinematicControlRow.classList.toggle('active-mode', isCinematicMode);
            }

            if (isCinematicMode) {
                cachedDistance = this.distance;
            } 
        },

        toggleBirdseyeMode: function() {
            isBirdseyeMode = !isBirdseyeMode;
            console.log(`Birdseye mode ${isBirdseyeMode ? 'enabled' : 'disabled'}`);
            
            if (birdseyeControlRow) {
                birdseyeControlRow.classList.toggle('active-mode', isBirdseyeMode);
            }

            if (isBirdseyeMode) {
                // Disable cinematic mode and its UI when entering birdseye
                if (isCinematicMode) {
                    isCinematicMode = false;
                    if (cinematicControlRow) {
                        cinematicControlRow.classList.remove('active-mode');
                    }
                }
                
                cachedPerspectivePosition.copy(originalCamera.position);
                cachedPerspectiveTarget.copy(this.panOffset);
                cachedPerspectiveDistance = this.distance;
                cachedPerspectiveAngles.x = this.angleX;
                cachedPerspectiveAngles.y = this.angleY;
                
                if (!orthographicCamera) {
                    const size = this.distance * 0.5;
                    orthographicCamera = new THREE.OrthographicCamera(
                        -size, size, size, -size, 0.1, this.distance
                    );
                }
                
                this.angleX = Math.PI / 2; 
                this.angleY = 0; 
                
                currentCamera = orthographicCamera;
                this.updateCameraPosition();
            } else {
                currentCamera = originalCamera;
                
                this.distance = cachedPerspectiveDistance;
                this.angleX = cachedPerspectiveAngles.x;
                this.angleY = cachedPerspectiveAngles.y;
                this.panOffset.copy(cachedPerspectiveTarget);
                
                this.updateCameraPosition();
            }
        },

        isBirdseyeActive: function() {
            return isBirdseyeMode;
        },

        setCinematicTarget: function(target) {
            if (target instanceof THREE.Vector3) {
                cinematicTarget.copy(target);
            }
        },
        
        isCinematicActive: function() {
            return isCinematicMode;
        },

        getTargetTalkerId: function() {
            return targetTalkerId;
        },

        setTargetTalkerId: function(talkerId) {
            targetTalkerId = talkerId;
            console.log(`Tracking ${talkerId === null ? 'all tracks (latest point)' : 'talker: ' + talkerId}`);
        },

        adjustForNewData: function (dataSpan, centerVec) {
            cachedDataSpan = dataSpan;
            cachedCenterVec = centerVec;
            const newDistance = Math.max(dataSpan * 1.5, 200);
            if (Math.abs(this.distance - newDistance) > this.distance * 0.5 || this.distance === 6000) {
                this.distance = newDistance;
            }
            this.panOffset.lerp(centerVec, 0.3);
            this.updateCameraPosition();
        },

        reset: function (dataSpan, centerVec) {
            isCinematicMode = false;
            isBirdseyeMode = false;
            currentCamera = originalCamera;
            
            if (cinematicControlRow) cinematicControlRow.classList.remove('active-mode');
            if (birdseyeControlRow) birdseyeControlRow.classList.remove('active-mode');

            cachedDataSpan = dataSpan;
            cachedCenterVec = centerVec;
            this.distance = Math.max(dataSpan * 1.5, 200);
            this.panOffset.copy(centerVec);
            this.angleX = Math.PI / 6;
            this.angleY = Math.PI / 4;
            this.updateCameraPosition();
        },
    };

    // --- Event Listeners ---
    document.addEventListener("keydown", (e) => { // Handle number keys 0-9 for track selection in cinematic mode
        
        if (isCinematicMode && e.code.startsWith('Digit')) {
            const digit = e.code.replace('Digit', '');
            if (digit === '0') {
                controls.setTargetTalkerId(null);
            } else {
                // Map 1-9 to talker IDs 

                // BILL's EDIT HERE

                const talkerMap = {
                    '1': 'GP',
                    '2': 'GN',
                    '3': 'GA',
                    '4': 'GB',
                    '5': 'GL',
                    '6': 'BD',
                    '7': 'QZ',
                    '8': 'IR',
                    '9': 'GI'
                };
                controls.setTargetTalkerId(talkerMap[digit] || null);
            }
            return;
        }

        if (e.code === 'KeyB') {
            controls.toggleBirdseyeMode();
            return;
        }

        if (e.code === 'KeyC') {
            controls.toggleCinematicMode();
            return;
        }

        if (e.code === 'KeyR') {
            if (reorientControlRow) {
                reorientControlRow.classList.add('active-mode');
                setTimeout(() => {
                    reorientControlRow.classList.remove('active-mode');
                }, 150); 
            }
            isCinematicMode = false;
            isBirdseyeMode = false;
            currentCamera = originalCamera;

            if (cinematicControlRow) cinematicControlRow.classList.remove('active-mode');
            if (birdseyeControlRow) birdseyeControlRow.classList.remove('active-mode');
            
            // Reset camera position if cached values are available
            if (cachedDataSpan !== null && cachedCenterVec !== null) {
                controls.reset(cachedDataSpan, cachedCenterVec);
            }
            return; 
        }
        keyState[e.code] = true;
    });
    
    document.addEventListener("keyup", (e) => { 
        keyState[e.code] = false; 
    });

    window.addEventListener("blur", () => {
        for (const key in keyState) {
            keyState[key] = false;
        }
    });

    document.addEventListener("mousedown", (e) => {
        if (e.target.closest("#info") || e.target.closest('.talker-header')) return;

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
            
            if (isBirdseyeMode) {
                controls.panOffset.x -= deltaX * panSpeed;
                controls.panOffset.z += deltaY * panSpeed; 
            } else {
                const cameraDir = new THREE.Vector3();
                currentCamera.getWorldDirection(cameraDir);
                const cameraRight = new THREE.Vector3().crossVectors(cameraDir, currentCamera.up).normalize();
                const cameraUp = new THREE.Vector3().crossVectors(cameraRight, cameraDir).normalize();
                controls.panOffset.add(cameraRight.multiplyScalar(-deltaX * panSpeed));
                controls.panOffset.add(cameraUp.multiplyScalar(deltaY * panSpeed));
            }
        } else if (!isBirdseyeMode) { 
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

    // Listen for custom event from stats panel to activate cinematic mode for specific talker
    // ================= CHANGE #2: IMPROVED THIS LOGIC =================
    window.addEventListener('activateCinematicForTalker', (e) => {
        const { talkerId } = e.detail;
        
        // If cinematic mode is already on and we click the SAME talker, turn it off.
        if (isCinematicMode && targetTalkerId === talkerId) {
            controls.toggleCinematicMode();
        } else {
            // Otherwise, turn cinematic mode on (if it's off) and set the new target.
            if (!isCinematicMode) {
                controls.toggleCinematicMode();
            }
            controls.setTargetTalkerId(talkerId);
        }
    });

    return controls;
}
import * as THREE from "three";

/**
 * Sets up mouse and keyboard controls for a "fly-through" camera with birdseye orthographic view.
 * @param {THREE.PerspectiveCamera} camera - The Three.js camera object.
 * @param {THREE.Scene} scene - The Three.js scene object (needed for orthographic camera setup).
 * @returns {Object} controls - The camera controls object with an update method.
 */
export function setupCameraControls(camera, scene) {

    // --- FIX: Push far clipping plane out so distant geometry is never culled ---
    camera.far = 5000000;
    camera.updateProjectionMatrix();

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
    let cinematicFollowDistance = null; // The desired distance in cinematic mode
    let targetTalkerId = null;
    let talkerIdList = [];

    // --- State for birdseye orthographic view ---
    let isBirdseyeMode = false;
    let originalCamera = camera;
    let orthographicCamera = null;
    let currentCamera = camera;
    
    let cachedPerspectivePosition = new THREE.Vector3();
    let cachedPerspectiveTarget = new THREE.Vector3();
    let cachedPerspectiveDistance = 1000;
    let cachedPerspectiveAngles = { x: Math.PI / 6, y: Math.PI / 4 };

    const controls = {
        distance: 1000,
        angleX: Math.PI / 6,
        angleY: Math.PI / 4,
        panOffset: new THREE.Vector3(0, 0, 0),
        
        moveSpeed: 10,
        lookSpeed: 0.01,

        getCurrentCamera: function() {
            return currentCamera;
        },

        updateCameraPosition: function () {
            if (isBirdseyeMode && orthographicCamera) {
                const height = Math.max(this.distance * 2, 2000);
                orthographicCamera.position.set(
                    this.panOffset.x,
                    this.panOffset.y + height,
                    this.panOffset.z
                );
                orthographicCamera.lookAt(this.panOffset);
                
                const aspect = window.innerWidth / window.innerHeight;
                const size = this.distance * 0.8;
                
                orthographicCamera.left = -size * aspect;
                orthographicCamera.right = size * aspect;
                orthographicCamera.top = size;
                orthographicCamera.bottom = -size;
                
                orthographicCamera.near = 0.1;
                orthographicCamera.far = height * 2;
                orthographicCamera.updateProjectionMatrix();
            } else {
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
        
        update: function() {
            if (isCinematicMode && !isBirdseyeMode) {
                this.updateCinematic();
            }

            const dynamicMoveSpeed = this.distance * 0.02;

            const cameraDir = new THREE.Vector3();
            currentCamera.getWorldDirection(cameraDir);
            
            let cameraRight, cameraUp;
            
            if (isBirdseyeMode) {
                cameraRight = new THREE.Vector3(1, 0, 0);
                cameraUp = new THREE.Vector3(0, 0, -1);
            } else {
                cameraRight = new THREE.Vector3().crossVectors(currentCamera.up, cameraDir).normalize();
                cameraUp = new THREE.Vector3().crossVectors(cameraDir, cameraRight).normalize();
            }

            let moved = false;

            if (keyState['KeyW']) {
                if (isBirdseyeMode) {
                    this.panOffset.add(new THREE.Vector3(0, 0, -dynamicMoveSpeed));
                } else {
                    this.panOffset.add(cameraDir.clone().multiplyScalar(dynamicMoveSpeed));
                }
                moved = true;
            }
            if (keyState['KeyS']) {
                if (isBirdseyeMode) {
                    this.panOffset.add(new THREE.Vector3(0, 0, dynamicMoveSpeed));
                } else {
                    this.panOffset.add(cameraDir.clone().multiplyScalar(-dynamicMoveSpeed));
                }
                moved = true;
            }
            if (keyState['KeyD']) {
                if (isBirdseyeMode) {
                    this.panOffset.add(new THREE.Vector3(dynamicMoveSpeed, 0, 0));
                } else {
                    this.panOffset.add(cameraRight.clone().multiplyScalar(-dynamicMoveSpeed));
                }
                moved = true;
            }
            if (keyState['KeyA']) {
                if (isBirdseyeMode) {
                    this.panOffset.add(new THREE.Vector3(-dynamicMoveSpeed, 0, 0));
                } else {
                    this.panOffset.add(cameraRight.clone().multiplyScalar(dynamicMoveSpeed));
                }
                moved = true;
            }

            if (isBirdseyeMode) {
                const zoomSpeed = this.distance * 0.03;
                if (keyState['KeyQ']) {
                    this.distance -= zoomSpeed;
                    this.distance = Math.max(50, this.distance);
                    moved = true;
                }
                if (keyState['KeyE']) {
                    this.distance += zoomSpeed;
                    moved = true;
                }
            } else {
                if (keyState['KeyE']) {
                    this.panOffset.add(new THREE.Vector3(0, dynamicMoveSpeed, 0));
                    moved = true;
                }
                if (keyState['KeyQ']) {
                    this.panOffset.add(new THREE.Vector3(0, -dynamicMoveSpeed, 0));
                    moved = true;
                }
            }

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
            
            if (moved) {
                this.updateCameraPosition();
            }
        },

        updateCinematic: function() {
            // Smoothly move look-at point toward the tracked target
            this.panOffset.lerp(cinematicTarget, 0.05);

            // Lerp actual distance toward the desired cinematic follow distance
            const target = cinematicFollowDistance || 1000;
            this.distance += (target - this.distance) * 0.05;

            this.updateCameraPosition();
        },

        toggleCinematicMode: function () {
            if (isBirdseyeMode) {
                this.toggleBirdseyeMode();
            }

            isCinematicMode = !isCinematicMode;
            
            if (!isCinematicMode) {
                targetTalkerId = null;
                cinematicFollowDistance = null;
            }
            
            console.log(`Cinematic mode ${isCinematicMode ? 'enabled' : 'disabled'}`);
            
            if (cinematicControlRow) {
                cinematicControlRow.classList.toggle('active-mode', isCinematicMode);
            }

            if (isCinematicMode) {
                // Snapshot current distance as the starting follow distance
                cinematicFollowDistance = this.distance;
            } 
        },

        toggleBirdseyeMode: function() {
            isBirdseyeMode = !isBirdseyeMode;
            console.log(`Birdseye mode ${isBirdseyeMode ? 'enabled' : 'disabled'}`);
            
            if (birdseyeControlRow) {
                birdseyeControlRow.classList.toggle('active-mode', isBirdseyeMode);
            }

            if (isBirdseyeMode) {
                if (isCinematicMode) {
                    isCinematicMode = false;
                    cinematicFollowDistance = null;
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
            cinematicFollowDistance = null;
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
    document.addEventListener("keydown", (e) => {
        if (isCinematicMode && e.code.startsWith('Digit')) {
            const digit = e.code.replace('Digit', '');
            if (digit === '0') {
                controls.setTargetTalkerId(null);
            } else {
                const talkerMap = {
                    '1': 'AA', '2': 'BB', '3': 'CC', '4': 'DD',
                    '5': 'WW', '6': 'XX', '7': 'YY', '8': 'ZZ', '9': 'JJ'
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
            cinematicFollowDistance = null;
            currentCamera = originalCamera;

            if (cinematicControlRow) cinematicControlRow.classList.remove('active-mode');
            if (birdseyeControlRow) birdseyeControlRow.classList.remove('active-mode');
            
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

        const zoomDelta = e.deltaY * 0.5;

        if (isCinematicMode) {
            // In cinematic mode, scroll adjusts the follow distance persistently.
            // The updateCinematic loop will lerp toward this new value.
            cinematicFollowDistance = Math.max(50, (cinematicFollowDistance || controls.distance) + zoomDelta);
        } else {
            controls.distance += zoomDelta;
            controls.distance = Math.max(50, controls.distance);
        }

        controls.updateCameraPosition();
    });

    document.addEventListener("contextmenu", (e) => e.preventDefault());

    window.addEventListener('activateCinematicForTalker', (e) => {
        const { talkerId } = e.detail;
        
        if (isCinematicMode && targetTalkerId === talkerId) {
            controls.toggleCinematicMode();
        } else {
            if (!isCinematicMode) {
                controls.toggleCinematicMode();
            }
            controls.setTargetTalkerId(talkerId);
        }
    });

    return controls;
}
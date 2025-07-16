//addImagePlane.js
import * as THREE from 'three';

/**
 * Adds an image plane to the scene with cutout/dithering logic to handle overlapping images
 * @param {Object} topLeft - {lat, lon}
 * @param {Object} bottomRight - {lat, lon} 
 * @param {string} imageUrl - URL of the image
 * @param {Function} gpsToCartesian - Conversion function
 * @param {THREE.Scene} scene - Three.js scene
 * @param {number} stackIndex - Layer index for depth ordering
 * @param {number} opacity - Base opacity (0-1)
 * @param {string} blendMode - 'cutout', 'dither', 'adaptive', or 'normal'
 * @param {Array} existingPlanes - Array of existing plane meshes for overlap detection
 */
export function addImagePlane(topLeft, bottomRight, imageUrl, gpsToCartesian, scene, stackIndex = 0, opacity = 1.0, blendMode = 'normal', existingPlanes = []) {
    const topLeftVec = gpsToCartesian(topLeft.lat, topLeft.lon, 0);
    const bottomRightVec = gpsToCartesian(bottomRight.lat, bottomRight.lon, 0);
    const width = bottomRightVec.x - topLeftVec.x;
    const height = bottomRightVec.z - topLeftVec.z;
    const geometry = new THREE.PlaneGeometry(Math.abs(width), Math.abs(height));
    const loader = new THREE.TextureLoader();
    
    return new Promise((resolve) => {
        loader.load(imageUrl, (texture) => {
            let material;
            
            switch(blendMode) {
                case 'cutout':
                    material = createCutoutMaterial(texture, opacity, stackIndex, existingPlanes);
                    break;
                case 'dither':
                    material = createDitherMaterial(texture, opacity, stackIndex);
                    break;
                case 'adaptive':
                    material = createAdaptiveMaterial(texture, opacity, stackIndex, existingPlanes);
                    break;
                default:
                    material = createNormalMaterial(texture, opacity, stackIndex);
            }
            
            const plane = new THREE.Mesh(geometry, material);
            const centerX = (topLeftVec.x + bottomRightVec.x) / 2;
            const centerZ = (topLeftVec.z + bottomRightVec.z) / 2;
            plane.position.set(centerX, stackIndex * 0.4, centerZ); 
            plane.rotation.x = -Math.PI / 2;
            
            // Store bounds for overlap detection
            plane.userData.bounds = {
                minX: Math.min(topLeftVec.x, bottomRightVec.x),
                maxX: Math.max(topLeftVec.x, bottomRightVec.x),
                minZ: Math.min(topLeftVec.z, bottomRightVec.z),
                maxZ: Math.max(topLeftVec.z, bottomRightVec.z)
            };
            plane.userData.stackIndex = stackIndex;
            
            scene.add(plane);
            resolve(plane);
        });
    });
}

/**
 * Creates a material with cutout logic - removes pixels in overlap areas
 */
function createCutoutMaterial(texture, opacity, stackIndex) {
    const cutoutShader = {
        uniforms: {
            map: { value: texture },
            opacity: { value: opacity },
            cutoutPattern: { value: generateCutoutPattern(stackIndex) }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D map;
            uniform float opacity;
            uniform sampler2D cutoutPattern;
            varying vec2 vUv;
            
            void main() {
                vec4 texColor = texture2D(map, vUv);
                vec4 cutout = texture2D(cutoutPattern, vUv);
                
                // Use cutout pattern to create holes
                if (cutout.r < 0.5) {
                    discard;
                }
                
                gl_FragColor = vec4(texColor.rgb, texColor.a * opacity);
            }
        `
    };
    
    return new THREE.ShaderMaterial({
        uniforms: cutoutShader.uniforms,
        vertexShader: cutoutShader.vertexShader,
        fragmentShader: cutoutShader.fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
}

/**
 * Creates a material with dithering to reduce overlap brightness
 */
function createDitherMaterial(texture, opacity, stackIndex) {
    const ditherShader = {
        uniforms: {
            map: { value: texture },
            opacity: { value: opacity },
            ditherMatrix: { value: generateDitherMatrix() },
            stackIndex: { value: stackIndex },
            resolution: { value: new THREE.Vector2(512, 512) }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D map;
            uniform float opacity;
            uniform sampler2D ditherMatrix;
            uniform float stackIndex;
            uniform vec2 resolution;
            varying vec2 vUv;
            
            void main() {
                vec4 texColor = texture2D(map, vUv);
                
                // Calculate dither coordinates
                vec2 ditherCoord = mod(gl_FragCoord.xy, 4.0) / 4.0;
                float ditherValue = texture2D(ditherMatrix, ditherCoord).r;
                
                // Adjust opacity based on dither pattern and stack index
                float adjustedOpacity = opacity;
                if (stackIndex > 0.0) {
                    adjustedOpacity *= (ditherValue + 0.3) / (1.0 + stackIndex * 0.1);
                }
                
                gl_FragColor = vec4(texColor.rgb, texColor.a * adjustedOpacity);
            }
        `
    };
    
    return new THREE.ShaderMaterial({
        uniforms: ditherShader.uniforms,
        vertexShader: ditherShader.vertexShader,
        fragmentShader: ditherShader.fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.CustomBlending,
        blendEquation: THREE.AddEquation,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneMinusSrcAlphaFactor
    });
}

/**
 * Creates an adaptive material that adjusts based on overlap detection
 */
function createAdaptiveMaterial(texture, opacity, stackIndex, existingPlanes) {
    const overlapFactor = calculateOverlapFactor(stackIndex, existingPlanes);
    const adjustedOpacity = opacity / Math.max(1, overlapFactor);
    
    const adaptiveShader = {
        uniforms: {
            map: { value: texture },
            opacity: { value: adjustedOpacity },
            overlapFactor: { value: overlapFactor },
            fadePattern: { value: generateFadePattern(stackIndex) }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D map;
            uniform float opacity;
            uniform float overlapFactor;
            uniform sampler2D fadePattern;
            varying vec2 vUv;
            
            void main() {
                vec4 texColor = texture2D(map, vUv);
                vec4 fade = texture2D(fadePattern, vUv);
                
                // Gradually fade edges in overlap areas
                float edgeFade = smoothstep(0.0, 0.2, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
                float finalOpacity = opacity * edgeFade * fade.r;
                
                gl_FragColor = vec4(texColor.rgb, texColor.a * finalOpacity);
            }
        `
    };
    
    return new THREE.ShaderMaterial({
        uniforms: adaptiveShader.uniforms,
        vertexShader: adaptiveShader.vertexShader,
        fragmentShader: adaptiveShader.fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
}

/**
 * Creates the standard material (fallback)
 */
function createNormalMaterial(texture, opacity, stackIndex) {
    return new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: opacity,
        depthWrite: false,
        polygonOffset: true,
        alphaTest: 0.01,
        polygonOffsetFactor: -stackIndex * 2,
        polygonOffsetUnits: -stackIndex * 2,
        blending: THREE.NormalBlending
    });
}

/**
 * Generates a cutout pattern texture for creating holes
 */
function generateCutoutPattern(stackIndex) {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Create a pattern based on stack index
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % size;
        const y = Math.floor((i / 4) / size);
        
        // Create a checkerboard pattern with different densities per layer
        const checker = ((Math.floor(x / 4) + Math.floor(y / 4)) % 2) === (stackIndex % 2);
        const noise = Math.random() > (0.3 + stackIndex * 0.1);
        
        const value = checker && noise ? 255 : 0;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255;   // A
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

/**
 * Generates a 4x4 Bayer dithering matrix
 */
function generateDitherMatrix() {
    const size = 4;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // 4x4 Bayer matrix
    const matrix = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
    ];
    
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const index = (y * size + x) * 4;
            const value = (matrix[y][x] / 15) * 255;
            data[index] = value;     // R
            data[index + 1] = value; // G
            data[index + 2] = value; // B
            data[index + 3] = 255;   // A
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

/**
 * Generates a fade pattern for adaptive blending
 */
function generateFadePattern(stackIndex) {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Create radial gradient for smooth fading
    const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.7, 'white');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

/**
 * Calculates overlap factor based on existing planes
 */
function calculateOverlapFactor(stackIndex, existingPlanes) {
    // Simple implementation - count overlapping planes
    let overlapCount = 0;
    
    for (let plane of existingPlanes) {
        if (plane.userData.stackIndex < stackIndex) {
            overlapCount++;
        }
    }
    
    return Math.max(1, overlapCount);
}

/**
 * Helper function to detect if two planes overlap
 */
export function detectOverlap(plane1, plane2) {
    const bounds1 = plane1.userData.bounds;
    const bounds2 = plane2.userData.bounds;
    
    if (!bounds1 || !bounds2) return false;
    
    return !(bounds1.maxX < bounds2.minX || 
             bounds1.minX > bounds2.maxX || 
             bounds1.maxZ < bounds2.minZ || 
             bounds1.minZ > bounds2.maxZ);
}

/**
 * Updates existing planes to use adaptive blending when overlaps are detected
 */
export function updateOverlappingPlanes(planes) {
    for (let i = 0; i < planes.length; i++) {
        const plane = planes[i];
        let overlapCount = 0;
        
        for (let j = 0; j < planes.length; j++) {
            if (i !== j && detectOverlap(plane, planes[j])) {
                overlapCount++;
            }
        }
        
        if (overlapCount > 0 && plane.material.uniforms) {
            // Adjust opacity based on overlap count
            const newOpacity = plane.material.uniforms.opacity.value / Math.max(1, overlapCount * 0.5);
            plane.material.uniforms.opacity.value = Math.max(0.1, newOpacity);
        }
    }
}
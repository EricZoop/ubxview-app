import * as THREE from "three";
/**
 * Creates the visual grid on the XZ plane.
 * @param {THREE.Scene} scene - The Three.js scene to add the grid to
 * @param {Object} options - Configuration options for the grid
 * @param {number} options.size - Size of the grid plane (default: 100000)
 * @param {number} options.gridSize - Size of each grid cell (default: 100)
 * @param {number} options.lineWidth - Width of the grid lines (default: 0.5)
 * @param {number} options.color - Color of the grid lines (default: 0x444444)
 * @param {number} options.renderOrder - Optional renderOrder for sorting
 * @param {number} options.opacity - Grid opacity (default: 0.8)
 * @returns {THREE.Mesh} The created grid mesh
 */
export function createGrid(scene, options = {}) {
  const {
    size = 400000,
    gridSize = 100.0,
    lineWidth = 0.5,
    color = 0x777777,
    renderOrder = 0,
    opacity = 0.65, // Default opacity for grid
  } = options;

  const gridMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uGridColor: { value: new THREE.Color(color) },
      uGridSize: { value: gridSize },
      uLineWidth: { value: lineWidth },
      uOpacity: { value: opacity }, // Add opacity uniform
    },
    // Z-fighting prevention settings
    depthWrite: opacity >= 0.99,        // Only write depth for fully opaque grids
    depthTest: true,                     // Keep depth testing enabled
    polygonOffset: true,                 // Enable polygon offset
    polygonOffsetFactor: -10.0,          // Push grid further back than image planes
    polygonOffsetUnits: -10.0,           // Additional offset
    transparent: true,
    alphaTest: 0.01,                     // Discard pixels below this alpha threshold
    blending: opacity < 1.0 ? THREE.NormalBlending : THREE.NoBlending, // Conditional blending
    side: THREE.DoubleSide,              // Render both sides
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uGridColor;
      uniform float uGridSize;
      uniform float uLineWidth;
      uniform float uOpacity;
      varying vec3 vWorldPos;
      void main() {
        vec2 coord = vWorldPos.xz / uGridSize;
        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - smoothstep(0.0, uLineWidth, line);
        
        // Apply overall opacity
        alpha *= uOpacity;
        
        // Discard fully transparent pixels
        if (alpha < 0.01) discard;
        
        gl_FragColor = vec4(uGridColor, alpha);
      }
    `,
  });

  const gridPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    gridMaterial
  );

  gridPlane.rotation.x = -Math.PI / 2;
  gridPlane.position.y = -0.1; // Slightly below the image planes to prevent z-fighting
  gridPlane.renderOrder = renderOrder - 1; // Render before image planes
  scene.add(gridPlane);

  return gridPlane;
}

/**
 * Updates the grid opacity and material properties
 * @param {THREE.Mesh} gridMesh - The grid mesh to update
 * @param {number} opacity - New opacity value (0-1)
 */
export function updateGridOpacity(gridMesh, opacity) {
  if (gridMesh && gridMesh.material) {
    gridMesh.material.uniforms.uOpacity.value = opacity;
    gridMesh.material.depthWrite = opacity >= 0.99;
    gridMesh.material.blending = opacity < 1.0 ? THREE.NormalBlending : THREE.NoBlending;
    gridMesh.material.needsUpdate = true;
  }
}
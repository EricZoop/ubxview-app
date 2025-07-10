import * as THREE from "three";

/**
 * Creates the visual grid on the XZ plane.
 * @param {THREE.Scene} scene - The Three.js scene to add the grid to
 * @param {Object} options - Configuration options for the grid
 * @param {number} options.size - Size of the grid plane (default: 100000)
 * @param {number} options.gridSize - Size of each grid cell (default: 100)
 * @param {number} options.lineWidth - Width of the grid lines (default: 0.5)
 * @param {number} options.color - Color of the grid lines (default: 0x444444)
 * @returns {THREE.Mesh} The created grid mesh
 */
export function createGrid(scene, options = {}) {
  const {
    size = 100000,
    gridSize = 100.0,
    lineWidth = .5,
    color = 0x5555555,
  } = options;

  const gridMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uGridColor: { value: new THREE.Color(color) },
      uGridSize: { value: gridSize },
      uLineWidth: { value: lineWidth },
    },
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
            varying vec3 vWorldPos;
            void main() {
                vec2 coord = vWorldPos.xz / uGridSize;
                vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
                float line = min(grid.x, grid.y);
                float alpha = 1.0 - smoothstep(0.0, uLineWidth, line);

                if (alpha < 0.01) discard; // Discard fully transparent squares

                gl_FragColor = vec4(uGridColor, alpha);
            }
        `,
    transparent: true,
  });

  const gridPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    gridMaterial
  );
  gridPlane.rotation.x = -Math.PI / 2;

  // Add the grid to the scene
  gridPlane.position.y = 0;
  scene.add(gridPlane);

  return gridPlane;
}

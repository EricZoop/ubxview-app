import {
  updateMapOpacity,
  switchTileService,
  fetchAndDisplayTiles,
} from "./tileManager.js";
import { DEFAULTS } from "./config.js";
import {
  setTopographyEnabled,
  setElevationScale,
  setTerrainSegments,
} from "./tileManager.js";

// e.g. a checkbox
document.getElementById("topo-toggle").addEventListener("change", (e) => {
  setTopographyEnabled(e.target.checked);
});

// Scale Input
document.getElementById("topo-scale").addEventListener("change", (e) => {
  setElevationScale(e.target.value);
});

// Polygons (Segments) Input
document.getElementById("topo-segments").addEventListener("change", (e) => {
  setTerrainSegments(e.target.value);
});

/**
 * Sets up all UI component listeners.
 */
export function initializeUI() {
  setupOpacitySlider();
  setupRenderDistanceSelector();
  setupTileServiceToggle();
}



const input = document.getElementById("topo-segments");
const min = 1;
const max = 256;

let previousValue = parseInt(input.value, 10);

input.addEventListener("change", () => {
  let value = parseInt(input.value, 10);
  if (isNaN(value)) return;

  if (value > previousValue) {
    // User incremented → double
    value = previousValue * 2;
  } else if (value < previousValue) {
    // User decremented → halve
    value = Math.floor(previousValue / 2);
  }

  // Clamp
  if (value > max) value = max;
  if (value < min) value = min;

  input.value = value;
  previousValue = value;
});

/**
 * Sets up the opacity slider.
 */
function setupOpacitySlider() {
  const opacitySlider = document.getElementById("opacitySlider");
  if (opacitySlider) {
    opacitySlider.value = DEFAULTS.initialOpacity;
    updateMapOpacity(opacitySlider.value); // Set initial value
    opacitySlider.addEventListener("input", (event) => {
      updateMapOpacity(event.target.value);
    });
  }
}

/**
 * Sets up the tile service toggle buttons.
 */
function setupTileServiceToggle() {
  document.querySelectorAll(".view-option").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".view-option")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const selectedView = button.dataset.view;
      switchTileService(selectedView);
    });
  });
}

/**
 * Sets up the render distance plus-minus selector.
 */
function setupRenderDistanceSelector() {
  const minusButton = document.getElementById("renderMinus");
  const plusButton = document.getElementById("renderPlus");
  const valueDisplay = document.getElementById("renderValue");
  let currentRenderDistance = DEFAULTS.initialRenderDistance;
  const minValue = 1;
  const maxValue = 50;

  const updateDisplay = () => {
    if (valueDisplay) valueDisplay.textContent = currentRenderDistance;
    if (minusButton) minusButton.disabled = currentRenderDistance <= minValue;
    if (plusButton) plusButton.disabled = currentRenderDistance >= maxValue;
  };

  const updateRenderDistance = (newValue) => {
    currentRenderDistance = Math.max(minValue, Math.min(maxValue, newValue));
    updateDisplay();
    fetchAndDisplayTiles(); // Refresh tiles on change
  };

  if (minusButton)
    minusButton.addEventListener("click", () =>
      updateRenderDistance(currentRenderDistance - 1),
    );
  if (plusButton)
    plusButton.addEventListener("click", () =>
      updateRenderDistance(currentRenderDistance + 1),
    );

  // Expose the current value globally for other modules to access
  window.getCurrentRenderDistance = () => currentRenderDistance;
  updateDisplay(); // Initialize
}

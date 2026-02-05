import { updateMapOpacity, switchTileService, fetchAndDisplayTiles } from './tileManager.js';
import { DEFAULTS } from './config.js';
import { getSceneObjects } from './sceneManager.js';

let isMapLoaded = false;

/**
 * Sets up all UI component listeners.
 */
export function initializeUI() {
    setupOpacitySlider();
    setupRenderDistanceSelector();
    setupTileServiceToggle();
}

/**
 * Notifies the UI manager that a file has been loaded, enabling map-specific logic.
 */
export function setMapLoaded(loaded) {
    isMapLoaded = loaded;
    
    // Re-evaluate grid visibility immediately based on current slider value
    const opacitySlider = document.getElementById('opacitySlider');
    if (opacitySlider) {
        // Trigger the input event logic manually to refresh the grid state
        const event = new Event('input');
        opacitySlider.dispatchEvent(event);
    }
}

/**
 * Sets up the opacity slider.
 */
function setupOpacitySlider() {
    const opacitySlider = document.getElementById('opacitySlider');
    const { gridMesh } = getSceneObjects();

    if (opacitySlider) {
        opacitySlider.value = DEFAULTS.initialOpacity;
        updateMapOpacity(opacitySlider.value); // Set initial value

        // Helper to handle grid visibility logic
        const updateGridState = (sliderValue) => {
            if (gridMesh) {
                if (!isMapLoaded) {
                    // Before file load: Grid always visible
                    gridMesh.visible = true;
                } else {
                    // After file load: Grid visible only if opacity < 0.5
                    gridMesh.visible = parseFloat(sliderValue) < 0.5;
                }
            }
        };

        // Initial check
        updateGridState(opacitySlider.value);

        opacitySlider.addEventListener('input', (event) => {
            const val = event.target.value;
            updateMapOpacity(val);
            updateGridState(val);
        });
    }
}

/**
 * Sets up the tile service toggle buttons.
 */
function setupTileServiceToggle() {
    document.querySelectorAll('.view-option').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.view-option').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const selectedView = button.dataset.view;
            switchTileService(selectedView);
        });
    });
}

/**
 * Sets up the render distance plus-minus selector.
 */
function setupRenderDistanceSelector() {
    const minusButton = document.getElementById('renderMinus');
    const plusButton = document.getElementById('renderPlus');
    const valueDisplay = document.getElementById('renderValue');
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

    if (minusButton) minusButton.addEventListener('click', () => updateRenderDistance(currentRenderDistance - 1));
    if (plusButton) plusButton.addEventListener('click', () => updateRenderDistance(currentRenderDistance + 1));
    
    // Expose the current value globally for other modules to access
    window.getCurrentRenderDistance = () => currentRenderDistance;
    updateDisplay(); // Initialize
}
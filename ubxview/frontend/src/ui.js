document.addEventListener("DOMContentLoaded", () => {
    // Select all slider wrappers on the page
    const sliderWrappers = document.querySelectorAll(".slider-wrapper");

    /**
     * Initializes a slider and its tooltip for real-time updates.
     * @param {HTMLElement} slider The slider input element.
     * @param {HTMLElement} tooltip The tooltip div element.
     */
    const initializeSlider = (slider, tooltip) => {
        if (!slider || !tooltip) return;

        function updateTooltip() {
            // Check if the slider step is a float to format the number correctly
            const isFloat = slider.step && parseFloat(slider.step) < 1;
            const value = isFloat ? parseFloat(slider.value).toFixed(1) : slider.value;
            tooltip.textContent = value;

            // Calculate the percentage position of the slider's thumb
            const percent = (slider.value - slider.min) / (slider.max - slider.min);
            
            // Position the tooltip above the thumb.
            // The calculation centers the tooltip over the thumb's variable position.
            tooltip.style.left = `calc(${percent * 100}% - ${percent * 15}px)`;
        }

        // Update the tooltip whenever the slider value changes
        slider.addEventListener("input", updateTooltip);
        
        // Set the initial position of the tooltip
        updateTooltip();
    };

    // Automatically find and initialize all sliders within wrappers
    sliderWrappers.forEach(wrapper => {
        const slider = wrapper.querySelector('input[type="range"]');
        const tooltip = wrapper.querySelector('.slider-tooltip');
        initializeSlider(slider, tooltip);
    });
});
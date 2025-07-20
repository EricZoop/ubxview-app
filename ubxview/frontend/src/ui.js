document.addEventListener("DOMContentLoaded", () => {
    // Select all slider wrappers on the page
    const sliderWrappers = document.querySelectorAll(".slider-wrapper");

    const initializeSlider = (slider, tooltip) => {
        if (!slider || !tooltip) return;

        function updateTooltip() {
            const isFloat = slider.step && parseFloat(slider.step) < 1;
            const value = isFloat ? parseFloat(slider.value).toFixed(1) : slider.value;
            tooltip.textContent = value;
        }

        // Update the tooltip whenever the slider value changes
        slider.addEventListener("input", updateTooltip);

        // Set the initial position of the tooltip
        updateTooltip();
    };

    sliderWrappers.forEach(wrapper => {
        const slider = wrapper.querySelector('input[type="range"]');
        const tooltip = wrapper.querySelector('.slider-tooltip');
        initializeSlider(slider, tooltip);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sliderWrappers = document.querySelectorAll(".slider-wrapper");

    const initializeSlider = (wrapper) => {
        const slider = wrapper.querySelector('input[type="range"]');
        const tooltip = wrapper.querySelector('.slider-tooltip');

        if (!slider || !tooltip) return;

        // 1. Move the tooltip to the body to escape the #info container's clipping
        document.body.appendChild(tooltip);

        const updateTooltip = () => {
            // Get Values
            const val = parseFloat(slider.value);
            const min = parseFloat(slider.min || 0);
            const max = parseFloat(slider.max || 1); // Default to 1 for opacity
            const step = parseFloat(slider.step || 0.1);

            // Update Text
            const isFloat = step < 1 || val % 1 !== 0;
            tooltip.textContent = isFloat ? val.toFixed(1) : val;

            // Get Dimensions
            const rect = slider.getBoundingClientRect();
            const thumbWidth = 16; // Based on your CSS
            const tooltipGap = 10; // Space between thumb and tooltip

            // Calculate Percentage
            // Protect against divide by zero if max == min
            const range = max - min;
            const percent = range === 0 ? 0 : (val - min) / range;

            // Calculate Position
            // The thumb travels the width of the track minus the width of the thumb
            const thumbTravelWidth = rect.width - thumbWidth;
            const thumbOffset = percent * thumbTravelWidth;

            // Position: Right of the thumb
            // Left = Slider Left + Thumb Position + Thumb Width + Gap
            const left = rect.left + thumbOffset + thumbWidth + tooltipGap;
            
            // Position: Vertically Centered
            const top = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);

            // Apply Styles
            tooltip.style.position = 'fixed';
            tooltip.style.left = `${left-5}px`;
            tooltip.style.top = `${top}px`;
            tooltip.style.zIndex = '99999999';
        };

        // 2. Handle Visibility via JS (since it's no longer a child of wrapper)
        wrapper.addEventListener("mouseenter", () => {
            updateTooltip(); // Ensure position is correct before showing
            tooltip.style.opacity = '1';
        });

        wrapper.addEventListener("mouseleave", () => {
            tooltip.style.opacity = '0';
        });

        // 3. Update position while dragging
        slider.addEventListener("input", updateTooltip);

        // Initial setup
        updateTooltip();
    };

    sliderWrappers.forEach(wrapper => {
        initializeSlider(wrapper);
    });
});
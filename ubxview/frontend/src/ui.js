const slider = document.getElementById('opacitySlider');
const tooltip = document.getElementById('sliderTooltip');

function updateTooltip() {
    const value = parseFloat(slider.value).toFixed(1);
    tooltip.textContent = value;
    const thumbWidth = 15;
    const sliderWidth = slider.offsetWidth;
    const percent = (slider.value - slider.min) / (slider.max - slider.min);
    const travelDistance = sliderWidth - thumbWidth;
    const thumbCenter = (percent * travelDistance) + (thumbWidth / 2);
    tooltip.style.left = `${thumbCenter}px`;
}

// Update position/value on input and on hover for a responsive feel
slider.addEventListener('input', updateTooltip);
slider.addEventListener('mousemove', updateTooltip);

// Use a slight delay on load to ensure correct initial width calculation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateTooltip, 50);
});


/**
 * Converts longitude and latitude to tile coordinates.
 */
export function lonLatToTile(lon, lat, zoom) {
    const n = Math.pow(2, zoom);
    const x = Math.floor(n * ((lon + 180) / 360));
    const latRad = lat * Math.PI / 180;
    const y = Math.floor(n * (1 - (Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI)) / 2);
    return { x: Math.max(0, Math.min(n - 1, x)), y: Math.max(0, Math.min(n - 1, y)) };
}

/**
 * Converts tile coordinates to the longitude and latitude of its north-west corner.
 */
export function tileToLonLat(x, y, zoom) {
    const n = Math.pow(2, zoom);
    const lon = x / n * 360 - 180;
    const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n)));
    const lat = latRad * 180 / Math.PI;
    return { lon, lat };
}

/**
 * Loads a texture with a specified timeout to prevent hanging requests.
 * @param {THREE.TextureLoader} textureLoader - The Three.js texture loader instance.
 * @param {string} url - The URL of the texture to load.
 * @param {number} [timeout=5000] - The timeout in milliseconds.
 * @returns {Promise<THREE.Texture>} A promise that resolves with the texture or rejects on error/timeout.
 */
export function loadTextureWithTimeout(textureLoader, url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout loading texture: ${url}`));
        }, timeout);

        textureLoader.load(
            url,
            (texture) => {
                clearTimeout(timer);
                resolve(texture);
            },
            undefined, // onProgress callback not needed
            (error) => {
                clearTimeout(timer);
                reject(error);
            }
        );
    });
}
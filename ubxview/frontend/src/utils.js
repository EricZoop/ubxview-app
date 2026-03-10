/**
 * tauriFetch — for short JSON/text polling requests ONLY (e.g. ping station URL).
 *
 * DO NOT use for streaming binary data (NTRIP/RTCM).
 * The Tauri cors-fetch plugin patches window.fetch to bypass CORS natively
 * and supports streaming, so NTRIPClient uses fetch() directly.
 */
export async function tauriFetch(url, _options) {
    if (window.__TAURI__) {
        const text = await window.__TAURI__.core.invoke('fetch_url', { url });
        return {
            ok: true,
            json: async () => JSON.parse(text),
            text: async () => text,
        };
    }
    return fetch(url, { signal: AbortSignal.timeout(5000) });
}

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
 */
export function loadTextureWithTimeout(textureLoader, url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout loading texture: ${url}`));
        }, timeout);

        textureLoader.load(
            url,
            (texture) => { clearTimeout(timer); resolve(texture); },
            undefined,
            (error)   => { clearTimeout(timer); reject(error); }
        );
    });
}
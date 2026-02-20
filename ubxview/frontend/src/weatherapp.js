/**
 * WeatherRecorder
 *
 * Requests the user's geolocation, then polls the Open-Meteo API every 60 s
 * while a recording session is active.  Each raw API response is appended as a
 * newline-delimited JSON object to  weather_{timestamp}.json  in the parent
 * output directory (same level as pingStation_*.ndjson).
 *
 * If the user denies location access the instance stays inert and all other
 * recording functionality continues unaffected.
 */
export class WeatherRecorder {
    constructor() {
        /** @type {{ latitude: number, longitude: number } | null} */
        this.coords = null;

        this.pollingRateMs   = 60_000; // 1 minute
        this.pollingInterval = null;

        this.fileHandle     = null;
        this.writableStream = null;
        this.encoder        = new TextEncoder();

        this.sampleCount = 0;
        this.active      = false;
    }

    // ─── Geolocation ─────────────────────────────────────────────────

    /**
     * Prompts the browser for the user's location.
     * Resolves to `true` if coords were obtained, `false` if denied / unavailable.
     * Safe to call before start(); the result is cached on the instance.
     *
     * @returns {Promise<boolean>}
     */
    async requestLocation() {
        if (!('geolocation' in navigator)) {
            console.warn('[WeatherRecorder] Geolocation API not available.');
            return false;
        }

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    this.coords = {
                        latitude:  parseFloat(pos.coords.latitude.toFixed(6)),
                        longitude: parseFloat(pos.coords.longitude.toFixed(6)),
                    };
                    console.log(
                        `[WeatherRecorder] Location acquired: ` +
                        `${this.coords.latitude}, ${this.coords.longitude}`
                    );
                    resolve(true);
                },
                (err) => {
                    console.warn('[WeatherRecorder] Location denied or unavailable:', err.message);
                    resolve(false);
                },
                { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 }
            );
        });
    }

    // ─── Session Lifecycle ────────────────────────────────────────────

    /**
     * Creates the output file and begins polling.
     * Returns `false` (and does nothing) if no coords are available.
     *
     * @param {FileSystemDirectoryHandle} parentDirHandle  – the top-level output folder
     * @param {string}                   timestamp         – shared ISO-ish timestamp string
     * @returns {Promise<boolean>}
     */
    async start(parentDirHandle, timestamp) {
        if (!this.coords) {
            console.log('[WeatherRecorder] No location available — weather recording skipped.');
            return false;
        }

        const fileName = `weather_${timestamp}.ndjson`;
        try {
            this.fileHandle     = await parentDirHandle.getFileHandle(fileName, { create: true });
            this.writableStream = await this.fileHandle.createWritable();
            console.log(`[WeatherRecorder] File created: ${fileName}`);
        } catch (err) {
            console.error('[WeatherRecorder] Failed to create weather file:', err);
            return false;
        }

        this.sampleCount = 0;
        this.active      = true;

        // Poll immediately, then on the interval
        await this._poll();
        this.pollingInterval = setInterval(() => this._poll(), this.pollingRateMs);
        console.log(`[WeatherRecorder] Polling started (every ${this.pollingRateMs / 1000} s).`);
        return true;
    }

    /**
     * Stops polling and closes the file handle gracefully.
     * @returns {Promise<void>}
     */
    async stop() {
        this.active = false;

        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }

        if (this.writableStream) {
            await this.writableStream.close();
            this.writableStream = null;
            console.log(`[WeatherRecorder] Stopped. ${this.sampleCount} sample(s) written.`);
        }

        this.fileHandle = null;
    }

    /**
     * Emergency (synchronous-safe) teardown for use in `pagehide`.
     */
    stopEmergency() {
        this.active = false;

        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }

        if (this.writableStream) {
            this.writableStream
                .close()
                .catch(e => console.error('[WeatherRecorder] pagehide close error:', e.message));
            this.writableStream = null;
        }
    }

    // ─── Internal ─────────────────────────────────────────────────────

    /**
     * Fetches one weather observation and appends the raw response to the file.
     * @private
     */
    async _poll() {
        if (!this.active || !this.coords) return;

        const { latitude, longitude } = this.coords;
        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

            const json = await res.json();

            if (this.writableStream) {
                await this.writableStream.write(this.encoder.encode(JSON.stringify(json) + '\n'));
                this.sampleCount++;
            }

            const cur = json.current;
            console.log(
                `[WeatherRecorder] ${cur?.temperature_2m} °C  ` +
                `RH ${cur?.relative_humidity_2m}%  ` +
                `Wind ${cur?.wind_speed_10m} km/h`
            );
        } catch (err) {
            console.warn('[WeatherRecorder] Poll failed:', err.message);
        }
    }
}
// rtkSurvey.js
// No tauriFetch import needed — NTRIPClient uses fetch() directly.
// The Tauri cors-fetch plugin patches window.fetch to bypass CORS natively
// and supports streaming binary, which tauriFetch cannot do.

// ── UBX Helpers ───────────────────────────────────────────────────────────────

function ubxChecksum(body) {
    let ckA = 0, ckB = 0;
    for (const b of body) {
        ckA = (ckA + b) & 0xFF;
        ckB = (ckB + ckA) & 0xFF;
    }
    return [ckA, ckB];
}

function buildUbx(cls, msgId, payload) {
    const len  = payload.length;
    const body = new Uint8Array(4 + len);
    body[0] = cls;
    body[1] = msgId;
    body[2] =  len       & 0xFF;
    body[3] = (len >> 8) & 0xFF;
    body.set(payload, 4);

    const [ckA, ckB] = ubxChecksum(body);
    const frame = new Uint8Array(2 + body.length + 2);
    frame[0] = 0xB5;
    frame[1] = 0x62;
    frame.set(body, 2);
    frame[2 + body.length]     = ckA;
    frame[2 + body.length + 1] = ckB;
    return frame;
}

function cfgValset(layer, kvpairs) {
    const parts = [new Uint8Array([0x00, layer, 0x00, 0x00])];

    for (const [key, fmt, val] of kvpairs) {
        const kb = new Uint8Array(4);
        new DataView(kb.buffer).setUint32(0, key, true);
        parts.push(kb);

        if (fmt === 'B') {
            parts.push(new Uint8Array([val & 0xFF]));
        } else if (fmt === 'I' || fmt === 'U4') {
            const vb = new Uint8Array(4);
            new DataView(vb.buffer).setUint32(0, val >>> 0, true);
            parts.push(vb);
        } else if (fmt === 'U2') {
            const vb = new Uint8Array(2);
            new DataView(vb.buffer).setUint16(0, val & 0xFFFF, true);
            parts.push(vb);
        }
    }

    const totalLen = parts.reduce((s, p) => s + p.length, 0);
    const payload  = new Uint8Array(totalLen);
    let offset = 0;
    for (const p of parts) { payload.set(p, offset); offset += p.length; }

    return buildUbx(0x06, 0x8A, payload);
}

// ── CFG-VALSET Key IDs (ZED-F9P) ─────────────────────────────────────────────
const CFG_TMODE_MODE            = 0x20030001;
const CFG_TMODE_SVIN_MIN_DUR   = 0x40030010;
const CFG_TMODE_SVIN_ACC_LIMIT = 0x40030011;

// ── USB protocol config ───────────────────────────────────────────────────────
const CFG_USBINPROT_UBX    = 0x10770001;
const CFG_USBINPROT_NMEA   = 0x10770002;
const CFG_USBINPROT_RTCM3X = 0x10770004;  // <── critical for NTRIP corrections
const CFG_USBOUTPROT_UBX   = 0x10780001;
const CFG_USBOUTPROT_NMEA  = 0x10780002;
const CFG_USBOUTPROT_RTCM3X = 0x10780004; // base-mode RTCM output after survey

// ── Navigation rate ───────────────────────────────────────────────────────────
const CFG_RATE_MEAS = 0x30210001; // measurement period (ms), U2
const CFG_RATE_NAV  = 0x30210002; // nav solutions per measurement, U2

// ── NAV-SVIN output rate on USB (message class 0x01, id 0x3B) ────────────────
const CFG_MSGOUT_UBX_NAV_SVIN_USB = 0x20910099;

// With NTRIP corrections, 30 s and 0.5 m are comfortably achievable.
// Raise minDurS if you need a more conservative baseline.
export const TARGET_ACCURACY_M = 0.02;
export const SVIN_MIN_DUR_S    = 60;

const DISABLE_CMD = cfgValset(3, [[CFG_TMODE_MODE, 'B', 0]]);

function buildSurveyInCmd(targetAccuracyM, minDurS) {
    return cfgValset(3, [
        [CFG_TMODE_MODE,           'B',  1],
        [CFG_TMODE_SVIN_MIN_DUR,   'U4', minDurS],
        [CFG_TMODE_SVIN_ACC_LIMIT, 'U4', Math.round(targetAccuracyM * 10_000)],
    ]);
}

/**
 * Enable RTCM3 + UBX input on USB, UBX + NMEA + RTCM3 output on USB,
 * set 1 Hz nav rate, and auto-stream NAV-SVIN every epoch.
 */
function buildPortConfigCmd() {
    return cfgValset(3, [
        // Input protocols on USB
        [CFG_USBINPROT_UBX,     'B', 1],
        [CFG_USBINPROT_NMEA,    'B', 1],
        [CFG_USBINPROT_RTCM3X,  'B', 1],   // ← the missing piece

        // Output protocols on USB
        [CFG_USBOUTPROT_UBX,    'B', 1],
        [CFG_USBOUTPROT_NMEA,   'B', 1],
        [CFG_USBOUTPROT_RTCM3X, 'B', 1],   // enables RTCM base output post-survey

        // 1 Hz navigation rate (1000 ms measurement, 1 nav per meas)
        [CFG_RATE_MEAS, 'U2', 1000],
        [CFG_RATE_NAV,  'U2', 1],

        // Auto-stream NAV-SVIN on USB every epoch (no polling needed)
        [CFG_MSGOUT_UBX_NAV_SVIN_USB, 'B', 1],
    ]);
}

// ── NAV-SVIN Parser ───────────────────────────────────────────────────────────
function parseNavSvin(payload) {
    if (payload.length < 40) return null;
    const v = new DataView(payload.buffer, payload.byteOffset);
    return {
        dur:     v.getUint32(8,  true),
        meanAcc: v.getUint32(28, true) / 10_000.0,
        obs:     v.getUint32(32, true),
        valid:   payload[36] !== 0,
        active:  payload[37] !== 0,
    };
}

// ── NAV-SAT Parser ────────────────────────────────────────────────────────────
function parseNavSatCount(payload) {
    if (payload.length < 8) return null;
    return payload[5]; // numSvs at byte offset 5
}

// ── NAV-PVT Parser (fix type check) ──────────────────────────────────────────
const FIX_TYPES = ['No fix', 'Dead reckoning', '2D', '3D', 'GNSS+DR', 'Time only'];
const CARR_SOLN = ['None', 'Float', 'Fixed'];

function parseNavPvtFixInfo(payload) {
    if (payload.length < 24) return null;
    const fixType  = payload[20];       // byte 20: fixType
    const flags    = payload[21];       // byte 21: flags
    const carrSoln = (flags >> 6) & 0x03;
    return {
        fixType,
        fixLabel: FIX_TYPES[fixType] ?? `Unknown(${fixType})`,
        carrSoln,
        carrLabel: CARR_SOLN[carrSoln] ?? `Unknown(${carrSoln})`,
    };
}

// ── NMEA Helpers ──────────────────────────────────────────────────────────────

function nmeaChecksum(sentence) {
    let ck = 0;
    for (const c of sentence) ck ^= c.charCodeAt(0);
    return ck.toString(16).toUpperCase().padStart(2, '0');
}

function buildGGA(lat = 0.0, lon = 0.0) {
    const now    = new Date();
    const hh     = String(now.getUTCHours()).padStart(2, '0');
    const mm     = String(now.getUTCMinutes()).padStart(2, '0');
    const ss     = String(now.getUTCSeconds()).padStart(2, '0');
    const t      = `${hh}${mm}${ss}.00`;

    const absLat = Math.abs(lat);
    const latDeg = Math.floor(absLat);
    const latMin = ((absLat - latDeg) * 60).toFixed(4).padStart(7, '0');
    const latHem = lat >= 0 ? 'N' : 'S';

    const absLon = Math.abs(lon);
    const lonDeg = Math.floor(absLon);
    const lonMin = ((absLon - lonDeg) * 60).toFixed(4).padStart(7, '0');
    const lonHem = lon >= 0 ? 'E' : 'W';

    const body = `GPGGA,${t},${String(latDeg).padStart(2,'0')}${latMin},${latHem},` +
                 `${String(lonDeg).padStart(3,'0')}${lonMin},${lonHem},` +
                 `1,08,1.0,0.0,M,0.0,M,,`;
    return `$${body}*${nmeaChecksum(body)}\r\n`;
}

// ── NMEA GGA parser (for reading position back from receiver if needed) ───────
function parseGGA(sentence) {
    if (!sentence.match(/^\$(GP|GN|GL)GGA,/)) return null;
    const parts = sentence.split(',');
    if (parts.length < 6) return null;

    const latRaw = parseFloat(parts[2]);
    const latHem = parts[3];
    const lonRaw = parseFloat(parts[4]);
    const lonHem = parts[5];
    const fix    = parseInt(parts[6]);

    if (!fix || isNaN(latRaw) || isNaN(lonRaw)) return null;

    const latDeg = Math.floor(latRaw / 100);
    const lat    = (latDeg + (latRaw - latDeg * 100) / 60) * (latHem === 'S' ? -1 : 1);
    const lonDeg = Math.floor(lonRaw / 100);
    const lon    = (lonDeg + (lonRaw - lonDeg * 100) / 60) * (lonHem === 'W' ? -1 : 1);

    return { lat, lon };
}

// ── NTRIPClient ───────────────────────────────────────────────────────────────
class NTRIPClient {
    constructor(cfg) {
        this.host        = cfg.host;
        this.port        = cfg.port       || 2101;
        this.mountpoint  = cfg.mountpoint;
        this.user        = cfg.user       || '';
        this.pass        = cfg.pass       || '';
        this.lat         = cfg.lat        ?? 0.0;
        this.lon         = cfg.lon        ?? 0.0;
        this.ggaInterval = (cfg.ggaInterval ?? 30) * 1000;

        this._stopped    = false;
        this._controller = null;
        this._totalBytes = 0;
    }

    /**
     * @param {function} writeFn  async (Uint8Array) => void — shared port writer
     * @param {function} onLog
     */
    async start(writeFn, onLog = () => {}) {
        this._stopped    = false;
        this._totalBytes = 0;

        while (!this._stopped) {
            try {
                await this._streamOnce(writeFn, onLog);
            } catch (err) {
                if (this._stopped) break;
                onLog(`[NTRIP] Error: ${err.message} — reconnecting in 5 s…`);
                await this._delay(5000);
                continue;
            }
            if (!this._stopped) onLog('[NTRIP] GGA refresh — reconnecting…');
        }

        onLog(`[NTRIP] Stopped. Total RTCM forwarded: ${this._totalBytes} B`);
    }

    stop() {
        this._stopped = true;
        if (this._controller) {
            this._controller.abort();
            this._controller = null;
        }
    }

    async _streamOnce(writeFn, onLog) {
        this._controller  = new AbortController();
        const signal      = this._controller.signal;
        const credentials = btoa(`${this.user}:${this.pass}`);
        const gga         = buildGGA(this.lat, this.lon);
        const url         = `http://${this.host}:${this.port}/${this.mountpoint}`;

        onLog(`[NTRIP] Connecting → ${url}`);
        onLog(`[NTRIP] GGA position: lat=${this.lat.toFixed(6)}, lon=${this.lon.toFixed(6)}`);

        const res = await fetch(url, {
            method:  'GET',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Ntrip-Version': 'Ntrip/2.0',
                'User-Agent':    'NTRIP JSClient/1.0',
                'Ntrip-GGA':     gga.trim(),
                'Connection':    'keep-alive',
            },
            signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        onLog(`[NTRIP] Connected (${res.status}). GGA sent: ${gga.trim()}`);

        const reader     = res.body.getReader();
        let   chunkCount = 0;

        // Reconnect after ggaInterval to send a fresh GGA timestamp
        const ggaTimer = setTimeout(() => reader.cancel().catch(() => {}), this.ggaInterval);

        try {
            while (!this._stopped) {
                const { value, done } = await reader.read();
                if (done) { onLog('[NTRIP] Stream ended by caster.'); break; }
                if (value?.length) {
                    this._totalBytes += value.length;
                    chunkCount++;
                    try {
                        await writeFn(value);
                        // Verbose for first 5 chunks, then every 10th
                        if (chunkCount <= 5 || chunkCount % 10 === 0) {
                            onLog(`[NTRIP] RTCM chunk #${chunkCount}: ${value.length} B → serial (total ${this._totalBytes} B)`);
                        }
                    } catch (writeErr) {
                        onLog(`[NTRIP] Serial write failed: ${writeErr.message}`);
                    }
                }
            }
        } finally {
            clearTimeout(ggaTimer);
            reader.cancel().catch(() => {});
        }

        if (this._totalBytes === 0) {
            onLog('[NTRIP] WARNING: Connected but received 0 bytes. ' +
                  'Check credentials, mountpoint, and that GGA position is valid (not 0,0).');
        }
    }

    _delay(ms) { return new Promise(r => setTimeout(r, ms)); }
}

// ── NTRIP Configuration Dialog ────────────────────────────────────────────────
/**
 * @param {{ latitude: number, longitude: number } | null} knownCoords
 *   Pass WeatherRecorder.coords (or any {latitude, longitude}) to pre-seed the
 *   GGA position.  If null the dialog falls back to 0,0 with a visible warning.
 */
export function showNtripDialog(knownCoords = null) {
    return new Promise(resolve => {

        const seedLat = knownCoords?.latitude  ?? '';
        const seedLon = knownCoords?.longitude ?? '';
        const coordNote = knownCoords
            ? `<span class="coord-note"></span>`
            : `<span class="coord-note warn">{null}</span>`;

        const overlay = document.createElement('div');
        overlay.id = 'ntrip-overlay';
        overlay.innerHTML = `
            <form id="ntrip-form" autocomplete="on">
                <div id="ntrip-dialog">
                    <h2>Survey-In Configuration</h2>

                    <div class="section-title">Parameters</div>

                    <div class="row">
                        <div>
                            <label>Min Duration <span class="inline-label">seconds</span></label>
                            <input id="ni-dur" type="number" min="1" step="1"
                                   value="${SVIN_MIN_DUR_S}" placeholder="${SVIN_MIN_DUR_S}">
                        </div>
                        <div>
                            <label>Target Accuracy <span class="inline-label">metres</span></label>
                            <input id="ni-acc" type="number" min="0.01" step="0.01"
                                   value="${TARGET_ACCURACY_M}" placeholder="${TARGET_ACCURACY_M}">
                        </div>
                    </div>

                    <div class="section-title">NTRIP Corrections</div>

                    <label>Caster</label>
                    <input id="ni-host" type="text" placeholder="polaris.pointonenav.com"
                           value="polaris.pointonenav.com" autocomplete="url">

                    
                    <div class="row">
                        <div>
                        <label>Mountpoint</label>
                        <input id="ni-mount" type="text"   placeholder="POLARIS" value="POLARIS">
                        </div>
                        
                        <div>
                        <label>Port</label>
                        <input id="ni-port"  type="number" placeholder="2101"    value="2101">
                        </div>
                    </div>

                    <div class="row">
                        <div>
                            <label>Latitude</label>
                            <input id="ni-lat" type="number" step="0.000001"
                                   value="${seedLat}" placeholder="">
                        </div>
                        <div>
                            <label>Longitude</label>
                            <input id="ni-lon" type="number" step="0.000001"
                                   value="${seedLon}" placeholder="">
                        </div>
                    </div>

                    <label>Username</label>
                    <input id="ni-user" type="text" name="username" autocomplete="given-name">

                    <label>Password</label>
                    <input id="ni-pass" type="password" name="password" autocomplete="family-name">

                    <div class="actions">
                        <button type="button" id="ntrip-btn-cancel">Cancel</button>
                        <button type="button" id="ntrip-btn-skip">Skip NTRIP</button>
                        <button type="submit" id="ntrip-btn-connect">Connect</button>
                    </div>
                </div>
            </form>
        `;
        document.body.appendChild(overlay);

        const cleanup = () => overlay.remove();

        const readSurveyParams = () => {
            const acc = parseFloat(document.getElementById('ni-acc').value);
            const dur = parseInt(document.getElementById('ni-dur').value);
            if (!isFinite(acc) || acc <= 0) {
                alert('Target accuracy must be a positive number (metres).');
                return null;
            }
            if (!isFinite(dur) || dur < 1) {
                alert('Minimum duration must be a positive integer (seconds).');
                return null;
            }
            return { targetAccuracyM: acc, minDurS: dur };
        };

        document.getElementById('ntrip-btn-cancel').addEventListener('click', () => {
            cleanup();
            resolve(null);
        });

        document.getElementById('ntrip-btn-skip').addEventListener('click', () => {
            const params = readSurveyParams();
            if (!params) return;
            cleanup();
            resolve({ ntrip: null, ...params });
        });

        document.getElementById('ntrip-form').addEventListener('submit', e => {
            e.preventDefault();
            const params = readSurveyParams();
            if (!params) return;

            const host  = document.getElementById('ni-host').value.trim();
            const port  = parseInt(document.getElementById('ni-port').value) || 2101;
            const mount = document.getElementById('ni-mount').value.trim();
            const user  = document.getElementById('ni-user').value.trim();
            const pass  = document.getElementById('ni-pass').value;
            const lat   = parseFloat(document.getElementById('ni-lat').value)  || seedLat || 0.0;
            const lon   = parseFloat(document.getElementById('ni-lon').value) || seedLon || 0.0;

            cleanup();

            if (!user && !pass) {
                console.log('[NTRIP] No credentials entered — skipping NTRIP.');
                resolve({ ntrip: null, ...params });
                return;
            }
            if (!host || !mount) {
                console.warn('[NTRIP] Host or mountpoint missing — skipping NTRIP.');
                resolve({ ntrip: null, ...params });
                return;
            }

            if (lat === 0 && lon === 0) {
                console.warn('[NTRIP] GGA position is 0,0 — RTCM corrections may not be delivered by caster.');
            }

            resolve({ ntrip: { host, port, mountpoint: mount, user, pass, lat, lon }, ...params });
        });

        overlay.addEventListener('keydown', e => {
            if (e.key === 'Escape') document.getElementById('ntrip-btn-cancel').click();
        });
    });
}

// ── RTKSurvey ─────────────────────────────────────────────────────────────────
export class RTKSurvey {
    constructor() {
        this._aborted         = false;
        this._rxBuf           = [];
        this._reader          = null;
        this._readLoopPromise = null;
        this._ntrip           = null;
        this._writer          = null; // single shared WritableStreamDefaultWriter
    }

    async run(port, baudRate, onStatus, onComplete, onError,
              ntripConfig     = null,
              targetAccuracyM = TARGET_ACCURACY_M,
              minDurS         = SVIN_MIN_DUR_S) {

        this._aborted = false;
        this._rxBuf   = [];

        const surveyInCmd  = buildSurveyInCmd(targetAccuracyM, minDurS);
        const portCfgCmd   = buildPortConfigCmd();

        try {
            await port.open({ baudRate });

            // Acquire ONE writer for the entire session
            this._writer = port.writable.getWriter();
            this._startReadLoop(port);
            await this._delay(500);

            // ── Step 0: Configure USB port protocols + nav rate ────────
            // This is what u-center does on connect — enables RTCM3 input
            // so the receiver actually processes NTRIP corrections.
            console.log('[RTKSurvey] Step 0: Configuring USB protocols (RTCM3 in, 1 Hz nav)…');
            const portOk = await this._sendAndWaitAck(portCfgCmd, 'CFG-VALSET PortConfig');
            if (!portOk) {
                console.warn('[RTKSurvey] Port config NAK/timeout — receiver may already have correct settings.');
            }
            await this._delay(300);

            if (ntripConfig) {
                // If lat/lon weren't seeded by the dialog, try to read a NMEA fix
                if (!ntripConfig.lat && !ntripConfig.lon) {
                    console.log('[RTKSurvey] No position in ntripConfig — sniffing NMEA for 5 s…');
                    const pos = await this._waitForNmeaFix(5000);
                    if (pos) {
                        ntripConfig.lat = pos.lat;
                        ntripConfig.lon = pos.lon;
                        console.log(`[RTKSurvey] NMEA fix: ${pos.lat.toFixed(6)}, ${pos.lon.toFixed(6)}`);
                    } else {
                        console.warn('[RTKSurvey] No NMEA fix — NTRIP GGA will be 0,0. Corrections unlikely.');
                    }
                }

                console.log('[RTKSurvey] Starting NTRIP client…');
                this._ntrip = new NTRIPClient(ntripConfig);

                const writeFn = (data) => this._writer.write(data);

                this._ntrip.start(writeFn, msg => console.log(msg))
                    .catch(err => console.warn('[NTRIP] Background error:', err));

                // Give NTRIP time to deliver first RTCM corrections
                await this._delay(3000);

                // Verify the receiver is actually using corrections
                const pvtPayload = await this._pollUbx(0x01, 0x07, 2000); // NAV-PVT
                if (pvtPayload) {
                    const fix = parseNavPvtFixInfo(pvtPayload);
                    if (fix) {
                        console.log(`[RTKSurvey] Current fix: ${fix.fixLabel}, carrier: ${fix.carrLabel}`);
                        if (fix.carrSoln === 0) {
                            console.warn('[RTKSurvey] No carrier solution yet — RTCM may not be reaching the receiver.');
                        }
                    }
                }
            }

            console.log('[RTKSurvey] Step 1: Disabling TMODE…');
            const disableOk = await this._sendAndWaitAck(DISABLE_CMD, 'CFG-VALSET Disable');
            if (!disableOk) throw new Error('NAK or timeout on TMODE disable');
            await this._delay(500);

            if (this._aborted) { await this._cleanup(port); return; }

            console.log(`[RTKSurvey] Step 2: Starting Survey-In (acc ≤ ${targetAccuracyM}m, dur ≥ ${minDurS}s)…`);
            const surveyOk = await this._sendAndWaitAck(surveyInCmd, 'CFG-VALSET Survey-In');
            if (!surveyOk) throw new Error('NAK or timeout on Survey-In command');

            console.log('[RTKSurvey] Step 3: Monitoring NAV-SVIN…');
            await this._delay(2500);

            let numSvs       = 0;
            let lastCarrLog  = 0;  // throttle carrier-solution logging

            while (!this._aborted) {
                // Poll satellite count
                const satPayload = await this._pollUbx(0x01, 0x35, 500);
                if (satPayload !== null) {
                    const count = parseNavSatCount(satPayload);
                    if (count !== null) numSvs = count;
                }

                // Poll NAV-SVIN (also arrives automatically now via msgout config)
                const payload = await this._pollUbx(0x01, 0x3B, 2000);
                if (payload) {
                    const s = parseNavSvin(payload);
                    if (s) {
                        // Periodically check carrier solution to confirm RTCM is working
                        const now = Date.now();
                        if (ntripConfig && now - lastCarrLog > 15_000) {
                            const pvt = await this._pollUbx(0x01, 0x07, 500);
                            if (pvt) {
                                const f = parseNavPvtFixInfo(pvt);
                                if (f) console.log(`[RTKSurvey] Fix: ${f.fixLabel}, carrier: ${f.carrLabel}`);
                            }
                            lastCarrLog = now;
                        }

                        console.log(
                            `[RTKSurvey] Dur: ${s.dur}s | Obs: ${s.obs} | SVs: ${numSvs} | ` +
                            `Acc: ${s.meanAcc.toFixed(4)}m (Target: ${targetAccuracyM}m) | ` +
                            `Active: ${s.active} | Valid: ${s.valid}`
                        );
                        if (onStatus) onStatus({ ...s, numSvs });
                        if (s.valid) {
                            console.log(`[RTKSurvey] Survey-in complete! Final Accuracy: ${s.meanAcc.toFixed(4)}m`);
                            this._stopNtrip();
                            await this._cleanup(port);
                            if (onComplete) onComplete({ ...s, numSvs });
                            return;
                        }
                    }
                }
                await this._delay(1000);
            }

            this._stopNtrip();
            await this._cleanup(port);

        } catch (err) {
            console.error('[RTKSurvey] Fatal error:', err);
            this._stopNtrip();
            await this._cleanup(port).catch(() => {});
            if (onError) onError(err);
        }
    }

    abort() {
        console.log('[RTKSurvey] Abort requested.');
        this._aborted = true;
        this._stopNtrip();
    }

    // ── Private ───────────────────────────────────────────────────────────────

    _stopNtrip() {
        if (this._ntrip) {
            this._ntrip.stop();
            this._ntrip = null;
            console.log('[RTKSurvey] NTRIP client stopped.');
        }
    }

    // Drain rxBuf looking for a valid $G?GGA sentence with a real fix
    async _waitForNmeaFix(timeoutMs) {
        const deadline = Date.now() + timeoutMs;
        let textBuf = '';
        while (Date.now() < deadline) {
            if (this._rxBuf.length > 0) {
                const bytes = this._rxBuf.splice(0);
                textBuf += new TextDecoder().decode(new Uint8Array(bytes));
                const lines = textBuf.split('\n');
                textBuf = lines.pop(); // keep partial last line
                for (const line of lines) {
                    const pos = parseGGA(line.trim());
                    if (pos) return pos;
                }
            }
            await this._delay(100);
        }
        return null;
    }

    _startReadLoop(port) {
        this._rxBuf = [];
        const reader = port.readable.getReader();
        this._reader = reader;
        this._readLoopPromise = (async () => {
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    if (value) for (const b of value) this._rxBuf.push(b);
                }
            } catch (_) {}
            finally { reader.releaseLock(); }
        })();
    }

    async _stopReadLoop() {
        if (this._reader) {
            try { await this._reader.cancel(); } catch (_) {}
            this._reader = null;
        }
        if (this._readLoopPromise) {
            await this._readLoopPromise;
            this._readLoopPromise = null;
        }
    }

    async _cleanup(port) {
        await this._stopReadLoop();
        if (this._writer) {
            try { this._writer.releaseLock(); } catch (_) {}
            this._writer = null;
        }
        try { await port.close(); } catch (_) {}
    }

    async _writeFrame(frame) {
        await this._writer.write(frame);
    }

    async _sendAndWaitAck(frame, label) {
        const ACK_ACK = [0xB5, 0x62, 0x05, 0x01];
        const ACK_NAK = [0xB5, 0x62, 0x05, 0x00];

        const startIdx = this._rxBuf.length;
        await this._writeFrame(frame);
        console.log(`[RTKSurvey] Sent ${label}, waiting for ACK…`);

        const t0 = Date.now();
        while (Date.now() - t0 < 5000) {
            const slice = this._rxBuf.slice(startIdx);
            if (this._findSeq(slice, ACK_ACK) !== -1) {
                console.log(`[RTKSurvey] ACK ✓ ${label}`);
                return true;
            }
            if (this._findSeq(slice, ACK_NAK) !== -1) {
                console.warn(`[RTKSurvey] NAK ✗ ${label}`);
                return false;
            }
            await this._delay(50);
        }
        console.warn(`[RTKSurvey] Timeout waiting for ACK: ${label}`);
        return false;
    }

    async _pollUbx(cls, msgId, timeoutMs) {
        const header   = [0xB5, 0x62, cls, msgId];
        const startIdx = this._rxBuf.length;
        await this._writeFrame(buildUbx(cls, msgId, new Uint8Array(0)));

        const t0 = Date.now();
        while (Date.now() - t0 < timeoutMs) {
            const slice = this._rxBuf.slice(startIdx);
            const idx   = this._findSeq(slice, header);
            if (idx !== -1 && slice.length >= idx + 6) {
                const length = slice[idx + 4] | (slice[idx + 5] << 8);
                const end    = idx + 6 + length + 2;
                if (slice.length >= end)
                    return new Uint8Array(slice.slice(idx + 6, idx + 6 + length));
            }
            await this._delay(50);
        }
        return null;
    }

    _findSeq(buf, seq) {
        outer: for (let i = 0; i <= buf.length - seq.length; i++) {
            for (let j = 0; j < seq.length; j++) {
                if (buf[i + j] !== seq[j]) continue outer;
            }
            return i;
        }
        return -1;
    }

    _delay(ms) { return new Promise(r => setTimeout(r, ms)); }
}
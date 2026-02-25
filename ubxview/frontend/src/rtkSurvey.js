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
    const len = payload.length;
    const body = new Uint8Array(4 + len);
    body[0] = cls;
    body[1] = msgId;
    body[2] =  len        & 0xFF;
    body[3] = (len >> 8)  & 0xFF;
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
        }
    }

    const totalLen = parts.reduce((s, p) => s + p.length, 0);
    const payload  = new Uint8Array(totalLen);
    let offset = 0;
    for (const p of parts) { payload.set(p, offset); offset += p.length; }

    return buildUbx(0x06, 0x8A, payload);
}

// ── CFG-VALSET Key IDs (ZED-F9P) ─────────────────────────────────────────────
const CFG_TMODE_MODE           = 0x20030001;
const CFG_TMODE_SVIN_MIN_DUR   = 0x40030010;
const CFG_TMODE_SVIN_ACC_LIMIT = 0x40030011;

// Default survey-in parameters (overridable via dialog)
export const TARGET_ACCURACY_M = 1.0;
export const SVIN_MIN_DUR_S    = 60;

const DISABLE_CMD = cfgValset(3, [[CFG_TMODE_MODE, 'B', 0]]);

/** Build SURVEY_IN_CMD with runtime accuracy/duration values. */
function buildSurveyInCmd(targetAccuracyM, minDurS) {
    return cfgValset(3, [
        [CFG_TMODE_MODE,           'B',  1],
        [CFG_TMODE_SVIN_MIN_DUR,   'U4', minDurS],
        [CFG_TMODE_SVIN_ACC_LIMIT, 'U4', Math.round(targetAccuracyM * 10_000)],
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
    };
}

// ── NMEA Helpers (for NTRIP GGA) ─────────────────────────────────────────────

function nmeaChecksum(sentence) {
    let ck = 0;
    for (const c of sentence) ck ^= c.charCodeAt(0);
    return ck.toString(16).toUpperCase().padStart(2, '0');
}

function buildGGA(lat = 0.0, lon = 0.0) {
    const now     = new Date();
    const hh      = String(now.getUTCHours()).padStart(2, '0');
    const mm      = String(now.getUTCMinutes()).padStart(2, '0');
    const ss      = String(now.getUTCSeconds()).padStart(2, '00');
    const t       = `${hh}${mm}${ss}.00`;

    const absLat  = Math.abs(lat);
    const latDeg  = Math.floor(absLat);
    const latMin  = ((absLat - latDeg) * 60).toFixed(4).padStart(7, '0');
    const latHem  = lat >= 0 ? 'N' : 'S';

    const absLon  = Math.abs(lon);
    const lonDeg  = Math.floor(absLon);
    const lonMin  = ((absLon - lonDeg) * 60).toFixed(4).padStart(7, '0');
    const lonHem  = lon >= 0 ? 'E' : 'W';

    const body = `GPGGA,${t},${String(latDeg).padStart(2,'0')}${latMin},${latHem},` +
                 `${String(lonDeg).padStart(3,'0')}${lonMin},${lonHem},` +
                 `1,08,1.0,0.0,M,0.0,M,,`;
    return `$${body}*${nmeaChecksum(body)}\r\n`;
}

// ── NTRIPClient ───────────────────────────────────────────────────────────────
class NTRIPClient {
    constructor(cfg) {
        this.host         = cfg.host;
        this.port         = cfg.port        || 2101;
        this.mountpoint   = cfg.mountpoint;
        this.user         = cfg.user        || '';
        this.pass         = cfg.pass        || '';
        this.lat          = cfg.lat         ?? 0.0;
        this.lon          = cfg.lon         ?? 0.0;
        this.ggaInterval  = (cfg.ggaInterval ?? 30) * 1000;

        this._stopped     = false;
        this._controller  = null;
    }

    async start(writeBytes, onLog = () => {}) {
        this._stopped = false;

        while (!this._stopped) {
            const connectTime = Date.now();
            try {
                await this._streamOnce(writeBytes, onLog);
            } catch (err) {
                if (this._stopped) break;
                onLog(`[NTRIP] Error: ${err.message} — reconnecting in 5 s…`);
                await this._delay(5000);
                continue;
            }

            if (this._stopped) break;

            const elapsed = Date.now() - connectTime;
            const wait    = Math.max(0, this.ggaInterval - elapsed);
            if (wait > 0) await this._delay(wait);
        }

        onLog('[NTRIP] Client stopped.');
    }

    stop() {
        this._stopped = true;
        if (this._controller) {
            this._controller.abort();
            this._controller = null;
        }
    }

    async _streamOnce(writeBytes, onLog) {
        this._controller = new AbortController();
        const signal     = this._controller.signal;

        const credentials = btoa(`${this.user}:${this.pass}`);
        const gga         = buildGGA(this.lat, this.lon);

        const url = `http://${this.host}:${this.port}/${this.mountpoint}`;
        onLog(`[NTRIP] Connecting → ${url}`);

        const res = await fetch(url, {
            method:  'GET',
            headers: {
                'Authorization':  `Basic ${credentials}`,
                'Ntrip-Version':  'Ntrip/2.0',
                'User-Agent':     'NTRIP JSClient/1.0',
                'Ntrip-GGA':      gga.trim(),
                'Connection':     'keep-alive',
            },
            signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        onLog(`[NTRIP] Connected (${res.status}). Streaming RTCM…`);

        const reader = res.body.getReader();
        let totalBytes = 0;

        try {
            while (!this._stopped) {
                const { value, done } = await Promise.race([
                    reader.read(),
                    this._delayReject(this.ggaInterval, 'GGA refresh'),
                ]);
                if (done) break;
                if (value?.length) {
                    totalBytes += value.length;
                    await writeBytes(value);
                    onLog(`[NTRIP] RTCM → serial: ${value.length} B  (total ${totalBytes} B)`);
                }
            }
        } finally {
            reader.cancel().catch(() => {});
        }
    }

    _delay(ms) { return new Promise(r => setTimeout(r, ms)); }

    _delayReject(ms, reason) {
        return new Promise((_, rej) => setTimeout(() => rej(new Error(reason)), ms));
    }
}

// ── NTRIP Configuration Dialog ────────────────────────────────────────────────

/**
 * Show a modal dialog to collect NTRIP credentials and survey-in parameters.
 *
 * Resolves with one of three values:
 *   • `null`                      — user clicked Cancel → abort the survey entirely
 *   • `{ ntrip: null,  targetAccuracyM, minDurS }` — Skip NTRIP, survey-only
 *   • `{ ntrip: {...}, targetAccuracyM, minDurS }` — NTRIP enabled
 *
 * @returns {Promise<{ntrip:object|null, targetAccuracyM:number, minDurS:number}|null>}
 */
export function showNtripDialog() {
    return new Promise(resolve => {

        // ── Markup ────────────────────────────────────────────────────────────
        const overlay = document.createElement('div');
        overlay.id = 'ntrip-overlay';
        overlay.innerHTML = `
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
                        <input id="ni-acc" type="number" min="0.001" step="0.001"
                               value="${TARGET_ACCURACY_M}" placeholder="${TARGET_ACCURACY_M}">
                    </div>
                </div>

                <div class="section-title">NTRIP Corrections <span class="inline-label" style="text-transform:none;letter-spacing:normal">(optional)</span></div>

                <label>Caster</label>
                <input id="ni-host" type="text" placeholder="polaris.pointonenav.com"
                       value="polaris.pointonenav.com">

                <label>Mountpoint &amp; Port</label>
                <div class="row">
                    <input id="ni-mount" type="text"   placeholder="POLARIS" value="POLARIS">
                    <input id="ni-port"  type="number" placeholder="2101" value="2101">
                </div>

                <label>Username</label>
                <input id="ni-user" type="text" placeholder=""
                       autocomplete="username">

                <label>Password</label>
                <input id="ni-pass" type="password" placeholder=""
                       autocomplete="current-password">

                <label>Approx Lat / Lon</label>
                <div class="row">
                    <input id="ni-lat" type="number" step="any" placeholder="0.000000">
                    <input id="ni-lon" type="number" step="any" placeholder="0.000000">
                </div>

                <div class="actions">
                    <button id="ntrip-btn-cancel">Cancel</button>
                    <button id="ntrip-btn-skip">Skip NTRIP</button>
                    <button id="ntrip-btn-connect">Connect</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const cleanup = () => {
            overlay.remove();
        };

        /** Read and validate the survey-in fields. Returns { targetAccuracyM, minDurS } or null on bad input. */
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

        // Cancel → resolve null (abort survey entirely)
        document.getElementById('ntrip-btn-cancel').addEventListener('click', () => {
            cleanup();
            resolve(null);
        });

        // Skip → survey-only, no NTRIP
        document.getElementById('ntrip-btn-skip').addEventListener('click', () => {
            const params = readSurveyParams();
            if (!params) return; // validation failed — keep dialog open
            cleanup();
            resolve({ ntrip: null, ...params });
        });

        // Connect → validate and resolve with NTRIP config (or fall back to survey-only)
        document.getElementById('ntrip-btn-connect').addEventListener('click', () => {
            const params = readSurveyParams();
            if (!params) return;

            const host  = document.getElementById('ni-host').value.trim();
            const port  = parseInt(document.getElementById('ni-port').value) || 2101;
            const mount = document.getElementById('ni-mount').value.trim();
            const user  = document.getElementById('ni-user').value.trim();
            const pass  = document.getElementById('ni-pass').value;
            const lat   = parseFloat(document.getElementById('ni-lat').value) || 0.0;
            const lon   = parseFloat(document.getElementById('ni-lon').value) || 0.0;

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

            resolve({ ntrip: { host, port, mountpoint: mount, user, pass, lat, lon }, ...params });
        });

        // Keyboard shortcuts
        overlay.addEventListener('keydown', e => {
            if (e.key === 'Enter')  document.getElementById('ntrip-btn-connect').click();
            if (e.key === 'Escape') document.getElementById('ntrip-btn-cancel').click();
        });
    });
}

// ── RTKSurvey ─────────────────────────────────────────────────────────────────
export class RTKSurvey {
    constructor() {
        this._aborted = false;
        this._rxBuf   = [];
        this._reader  = null;
        this._readLoopPromise = null;
        this._ntrip   = null;
    }

    /**
     * Run the full survey-in sequence, optionally with NTRIP corrections.
     *
     * @param {SerialPort}  port           — already-selected (but closed) Web Serial port
     * @param {number}      baudRate
     * @param {Function}    onStatus       — called each poll tick with { dur, meanAcc, obs, valid }
     * @param {Function}    onComplete     — called once survey-in reports valid
     * @param {Function}    onError        — called on any unrecoverable error
     * @param {object|null} ntripConfig    — result of showNtripDialog().ntrip; null = no NTRIP
     * @param {number}      targetAccuracyM
     * @param {number}      minDurS
     */
    async run(port, baudRate, onStatus, onComplete, onError,
              ntripConfig = null,
              targetAccuracyM = TARGET_ACCURACY_M,
              minDurS = SVIN_MIN_DUR_S) {

        this._aborted = false;
        this._rxBuf   = [];

        const surveyInCmd = buildSurveyInCmd(targetAccuracyM, minDurS);

        try {
            await port.open({ baudRate });
            this._startReadLoop(port);
            await this._delay(500);

            // ── NTRIP: start streaming corrections before survey-in ───────────
            if (ntripConfig) {
                console.log('[RTKSurvey] Starting NTRIP client…');
                this._ntrip = new NTRIPClient(ntripConfig);

                const writeBytes = async (bytes) => {
                    if (!this._aborted) await this._writeFrame(port, bytes);
                };

                this._ntrip.start(writeBytes, msg => console.log(msg))
                    .catch(err => console.warn('[NTRIP] Background error:', err));

                await this._delay(1500);
            }

            // ── Step 1: Disable TMODE ─────────────────────────────────────────
            console.log('[RTKSurvey] Step 1: Disabling TMODE…');
            const disableOk = await this._sendAndWaitAck(port, DISABLE_CMD, 'CFG-VALSET Disable');
            if (!disableOk) throw new Error('NAK or timeout on TMODE disable');
            await this._delay(500);

            if (this._aborted) { await this._cleanup(port); return; }

            // ── Step 2: Start Survey-In ───────────────────────────────────────
            console.log(`[RTKSurvey] Step 2: Starting Survey-In (acc ≤ ${targetAccuracyM}m, dur ≥ ${minDurS}s)…`);
            const surveyOk = await this._sendAndWaitAck(port, surveyInCmd, 'CFG-VALSET Survey-In');
            if (!surveyOk) throw new Error('NAK or timeout on Survey-In command');

            // ── Step 3: Poll NAV-SVIN ─────────────────────────────────────────
            console.log('[RTKSurvey] Step 3: Polling NAV-SVIN…');
            await this._delay(2500);

            while (!this._aborted) {
                const payload = await this._pollUbx(port, 0x01, 0x3B, 2000);
                if (payload) {
                    const s = parseNavSvin(payload);
                    if (s) {
                        console.log(
                            `[RTKSurvey] Dur: ${s.dur}s | Obs: ${s.obs} | ` +
                            `Acc: ${s.meanAcc.toFixed(4)}m ` +
                            `(Target: ${targetAccuracyM}m) | Valid: ${s.valid}`
                        );
                        if (onStatus) onStatus(s);
                        if (s.valid) {
                            console.log(`[RTKSurvey] Survey-in complete! Final Accuracy: ${s.meanAcc.toFixed(4)}m`);
                            this._stopNtrip();
                            await this._cleanup(port);
                            if (onComplete) onComplete(s);
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
            } catch (_) { /* cancelled or port closed */ }
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
        try { await port.close(); } catch (_) {}
    }

    async _writeFrame(port, frame) {
        const writer = port.writable.getWriter();
        try { await writer.write(frame); }
        finally { writer.releaseLock(); }
    }

    async _sendAndWaitAck(port, frame, label) {
        const ACK_ACK = [0xB5, 0x62, 0x05, 0x01];
        const ACK_NAK = [0xB5, 0x62, 0x05, 0x00];

        const startIdx = this._rxBuf.length;
        await this._writeFrame(port, frame);
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

    async _pollUbx(port, cls, msgId, timeoutMs) {
        const header = [0xB5, 0x62, cls, msgId];
        const startIdx = this._rxBuf.length;
        await this._writeFrame(port, buildUbx(cls, msgId, new Uint8Array(0)));

        const t0 = Date.now();
        while (Date.now() - t0 < timeoutMs) {
            const slice = this._rxBuf.slice(startIdx);
            const idx = this._findSeq(slice, header);
            if (idx !== -1 && slice.length >= idx + 6) {
                const length = slice[idx + 4] | (slice[idx + 5] << 8);
                const end = idx + 6 + length + 2;
                if (slice.length >= end) {
                    return new Uint8Array(slice.slice(idx + 6, idx + 6 + length));
                }
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
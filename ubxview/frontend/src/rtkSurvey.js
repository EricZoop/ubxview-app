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
    // CFG-VALSET header: version=0, layer, reserved=0x0000
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
const CFG_TMODE_MODE           = 0x20030001; // U1: 0=disabled 1=survey-in 2=fixed
const CFG_TMODE_SVIN_MIN_DUR   = 0x40030010; // U4: min duration (seconds)
const CFG_TMODE_SVIN_ACC_LIMIT = 0x40030011; // U4: accuracy limit (0.1 mm units)

export const TARGET_ACCURACY_M = 1.0;
export const SVIN_MIN_DUR_S    = 60;

const DISABLE_CMD   = cfgValset(3, [[CFG_TMODE_MODE, 'B', 0]]);
const SURVEY_IN_CMD = cfgValset(3, [
    [CFG_TMODE_MODE,           'B', 1],
    [CFG_TMODE_SVIN_MIN_DUR,   'U4', SVIN_MIN_DUR_S],
    [CFG_TMODE_SVIN_ACC_LIMIT, 'U4', Math.round(TARGET_ACCURACY_M * 10_000)],
]);

// ── NAV-SVIN Parser ───────────────────────────────────────────────────────────
function parseNavSvin(payload) {
    if (payload.length < 40) return null;
    const v = new DataView(payload.buffer, payload.byteOffset);
    return {
        dur:     v.getUint32(8,  true),
        meanAcc: v.getUint32(28, true) / 10_000.0, // 0.1 mm → metres
        obs:     v.getUint32(32, true),
        valid:   payload[36] !== 0,
    };
}

// ── RTKSurvey ─────────────────────────────────────────────────────────────────
export class RTKSurvey {
    constructor() {
        this._aborted = false;
        this._rxBuf   = [];
        this._reader  = null;
        this._readLoopPromise = null;
    }

    /**
     * Run the full survey-in sequence.
     * @param {SerialPort} port        — already-selected (but closed) Web Serial port
     * @param {number}     baudRate
     * @param {Function}   onStatus    — called each poll tick with { dur, meanAcc, obs, valid }
     * @param {Function}   onComplete  — called once survey-in reports valid
     * @param {Function}   onError     — called on any unrecoverable error
     */
    async run(port, baudRate, onStatus, onComplete, onError) {
        this._aborted = false;
        this._rxBuf   = [];

        try {
            await port.open({ baudRate });
            this._startReadLoop(port);
            await this._delay(500); // Let the device settle

            // ── Step 1: Disable TMODE ────────────────────────────────────────
            console.log('[RTKSurvey] Step 1: Disabling TMODE...');
            const disableOk = await this._sendAndWaitAck(port, DISABLE_CMD, 'CFG-VALSET Disable');
            if (!disableOk) throw new Error('NAK or timeout on TMODE disable');
            await this._delay(500);

            if (this._aborted) { await this._cleanup(port); return; }

            // ── Step 2: Start Survey-In ───────────────────────────────────────
            console.log('[RTKSurvey] Step 2: Starting Survey-In...');
            const surveyOk = await this._sendAndWaitAck(port, SURVEY_IN_CMD, 'CFG-VALSET Survey-In');
            if (!surveyOk) throw new Error('NAK or timeout on Survey-In command');

            // ── Step 3: Poll NAV-SVIN ─────────────────────────────────────────
            console.log('[RTKSurvey] Step 3: Polling NAV-SVIN...');
            await this._delay(2500); // Device needs time to start accumulating

            while (!this._aborted) {
                const payload = await this._pollUbx(port, 0x01, 0x3B, 2000);
                if (payload) {
                    const s = parseNavSvin(payload);
                    if (s) {
                        console.log(
                            `[RTKSurvey] Dur: ${s.dur}s | Obs: ${s.obs} | ` +
                            `Acc: ${s.meanAcc.toFixed(4)}m ` +
                            `(Target: ${TARGET_ACCURACY_M}m) | Valid: ${s.valid}`
                        );
                        if (onStatus) onStatus(s);
                        if (s.valid) {
                            console.log(`[RTKSurvey] Survey-in complete! Final Accuracy: ${s.meanAcc.toFixed(4)}m`);
                            await this._cleanup(port);
                            if (onComplete) onComplete(s);
                            return;
                        }
                    }
                }
                await this._delay(1000);
            }

            // User aborted
            await this._cleanup(port);

        } catch (err) {
            console.error('[RTKSurvey] Fatal error:', err);
            await this._cleanup(port).catch(() => {});
            if (onError) onError(err);
        }
    }

    abort() {
        console.log('[RTKSurvey] Abort requested.');
        this._aborted = true;
    }

    // ── Private ───────────────────────────────────────────────────────────────

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

    // Waits until ACK_ACK (05 01) or ACK_NAK (05 00) appears in the rx buffer
    async _sendAndWaitAck(port, frame, label) {
        const ACK_ACK = [0xB5, 0x62, 0x05, 0x01];
        const ACK_NAK = [0xB5, 0x62, 0x05, 0x00];

        const startIdx = this._rxBuf.length; // Only scan bytes received after the write
        await this._writeFrame(port, frame);
        console.log(`[RTKSurvey] Sent ${label}, waiting for ACK...`);

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

    // Sends a poll frame and returns the response payload for (cls, msgId)
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
import NMEASorter from './nmea_sorter.js';
import { WeatherRecorder } from './weatherapp.js';
import { RTKSurvey, showNtripDialog } from './rtkSurvey.js';

class SerialRecorder {
    constructor() {
        // DOM Elements
        this.startButton      = document.getElementById('start-button');
        this.endButton        = document.getElementById('end-button');
        this.statusMessage    = document.getElementById('status-message');
        this.baudRateSelect   = document.getElementById('baud-rate');
        this.selectPortButton = document.getElementById('select-port-button');
        this.surveyButton     = document.getElementById('survey-button');
        this.urlInput         = document.getElementById('url-input');

        this.weatherRecorder = new WeatherRecorder();
        this.weatherRecorder.requestLocation();

        // Prevent keystrokes in the URL input from reaching the 3D environment
        this.urlInput.addEventListener('keydown',  e => e.stopPropagation());
        this.urlInput.addEventListener('keyup',    e => e.stopPropagation());
        this.urlInput.addEventListener('keypress', e => e.stopPropagation());

        // Serial Port State
        this.port   = null;
        this.reader = null;

        // URL Reader State
        this.urlPollingInterval = null;
        this.urlPollingRateMs   = 1000;
        this.trafficData        = [];
        this.trafficFileHandle  = null;
        this.trafficWritableStream = null;
        this.urlActive = false;

        // Shared Recording State
        this.isRecording        = false;
        this.outputDirHandle    = null;
        this.sessionDirHandle   = null;
        this.currentSubDirHandle = null;
        this.currentTimestamp   = null;

        // Serial File State
        this.fileHandle     = null;
        this.writableStream = null;

        // Rate and file size tracking
        this.bytesReceived    = 0;
        this.lastTime         = 0;
        this.rateInterval     = null;
        this.totalBytesWritten = 0;

        // Post-processing state
        this.capturedData = [];

        // RTK Survey state
        this._survey       = null;
        this._isSurveying  = false;

        if (!('serial' in navigator)) {
            this.handleUnsupportedBrowser();
        } else {
            navigator.serial.addEventListener('disconnect', event => {
                if (this.port && event.target === this.port) {
                    console.log('Active COM port physically disconnected.');
                    this.port = null;
                    this.selectPortButton.textContent = 'Select Port';
                    this.surveyButton.disabled = true;
                    if (this._isSurveying) this._abortSurvey();
                    if (this.isRecording)  this.endRecording();
                }
            });
        }

        this.initEventListeners();
    }

    initEventListeners() {
        this.startButton.addEventListener('click',  () => this.startRecording());
        this.endButton.addEventListener('click',    () => this.endRecording());
        this.selectPortButton.addEventListener('click', () => this.selectPort());
        this.surveyButton.addEventListener('click', () => this._onSurveyClick());
        window.addEventListener('beforeunload', e  => this.handleBeforeUnload(e));
        window.addEventListener('pagehide',     () => this.handlePageHide());
    }

    handleUnsupportedBrowser() {
        console.warn('Web Serial API not supported.');
        this.selectPortButton.disabled = true;
        this.selectPortButton.textContent = 'Not Supported';
        this.surveyButton.disabled = true;
    }

    // ─── URL Reader Methods ───────────────────────────────────────────

    async validateUrl() {
        const url = this.urlInput.value.trim();
        if (!url) return false;
        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            await res.json();
            return true;
        } catch (error) {
            console.error('URL validation failed:', error);
            alert(`URL endpoint unreachable:\n${error.message}`);
            return false;
        }
    }

    async pollUrl() {
        const url = this.urlInput.value.trim();
        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
            if (!res.ok) return;
            const json = await res.json();
            const packet = { receivedAt: new Date().toISOString(), data: json };
            this.trafficData.push(packet);
            if (this.trafficWritableStream) {
                const encoded = new TextEncoder().encode(JSON.stringify(packet) + '\n');
                this.totalBytesWritten += encoded.length;
                await this.trafficWritableStream.write(encoded);
            }
        } catch (error) {
            console.warn('URL poll error:', error.message);
        }
    }

    startUrlPolling() {
        if (!this.urlActive) return;
        this.pollUrl();
        this.urlPollingInterval = setInterval(() => this.pollUrl(), this.urlPollingRateMs);
        console.log(`URL polling started (every ${this.urlPollingRateMs}ms).`);
    }

    stopUrlPolling() {
        if (this.urlPollingInterval) {
            clearInterval(this.urlPollingInterval);
            this.urlPollingInterval = null;
            console.log('URL polling stopped.');
        }
    }

    // ─── Serial Port Methods ──────────────────────────────────────────

    async selectPort() {
        try {
            this.port = await navigator.serial.requestPort();
            const info = this.port.getInfo();
            const portName = info.usbProductId
                ? `COM ${info.usbVendorId || ''}:${info.usbProductId}`
                : 'Unknown COM Port';
            this.selectPortButton.textContent = portName;
            this.surveyButton.disabled = false; // ← Enable survey once a port is selected
            console.log('Port selected.');
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error selecting port:', error);
                alert(`Error selecting port: ${error.message}`);
            }
        }
    }

    // ─── RTK Survey-In ───────────────────────────────────────────────
    async _onSurveyClick() {
        if (this._isSurveying) {
            this._abortSurvey();
            return;
        }
        if (!this.port || this.isRecording) return;

        // Show dialog — returns:
        //   null                             → user clicked Cancel (abort, do nothing)
        //   { ntrip: null,  targetAccuracyM, minDurS } → survey-only
        //   { ntrip: {...}, targetAccuracyM, minDurS } → survey + NTRIP
        const dialogResult = await showNtripDialog();

        if (dialogResult === null) {
            // User cancelled — treat as if the survey button was never pressed
            console.log('[readcom] Survey cancelled by user.');
            return;
        }

        const { ntrip: ntripConfig, targetAccuracyM, minDurS } = dialogResult;

        if (ntripConfig) {
            console.log('[readcom] NTRIP enabled:', ntripConfig.host, ntripConfig.mountpoint);
        } else {
            console.log('[readcom] NTRIP skipped — survey-only mode.');
        }
        console.log(`[readcom] Survey params: acc ≤ ${targetAccuracyM}m, dur ≥ ${minDurS}s`);

        this._isSurveying = true;
        this._survey = new RTKSurvey();
        this._setSurveyUI(true);
        this.statusMessage.textContent = ntripConfig
            ? 'Survey-In + NTRIP running…'
            : 'Survey-In running…';

        const baudRate = parseInt(this.baudRateSelect.value);

        await this._survey.run(
            this.port,
            baudRate,
            ({ dur, obs, meanAcc, valid }) => {
                const ntripTag = ntripConfig ? '[NTRIP] ' : '';
                this.statusMessage.textContent =
                    `${ntripTag}3D StdDev: ${meanAcc.toFixed(3)}m | ${dur}s`;
            },
            s => {
                console.log(`[RTKSurvey] Done — Accuracy: ${s.meanAcc.toFixed(4)}m`);
                this.statusMessage.textContent =
                    `[RTKSurvey] Done - Acc: ${s.meanAcc.toFixed(4)}m`;
                this._finishSurvey();
            },
            err => {
                alert(`Survey-In failed: ${err.message}`);
                this.statusMessage.textContent = 'Survey failed';
                this._finishSurvey();
            },
            ntripConfig,    // 6th arg — null = no NTRIP
            targetAccuracyM,
            minDurS,
        );
    }

    _abortSurvey() {
        if (this._survey) this._survey.abort();
        this.statusMessage.textContent = 'Survey aborted';
        this._finishSurvey();
    }

    _finishSurvey() {
        this._isSurveying = false;
        this._survey = null;
        this._setSurveyUI(false);
    }

    // While surveying: lock everything else; re-enable when done
    _setSurveyUI(active) {
        this.surveyButton.classList.toggle('survey-active', active);
        this.surveyButton.title = active ? 'Abort Survey-In' : 'RTK BASE Survey-In';
        this.startButton.disabled      = active;
        this.baudRateSelect.disabled   = active;
        this.selectPortButton.disabled = active;
        this.urlInput.disabled         = active;
        this.urlInput.style.cursor     = active ? 'not-allowed' : '';
    }

    // ─── Recording Lifecycle ──────────────────────────────────────────

    async startRecording() {
        if (this.isRecording || this._isSurveying) return;

        const hasSerial = !!this.port;
        const hasUrl    = !!this.urlInput.value.trim();

        if (!hasSerial && !hasUrl) {
            alert('Please select a serial port and/or enter a URL endpoint before recording.');
            return;
        }

        let urlValid = false;
        if (hasUrl) {
            this.statusMessage.textContent = 'Validating URL...';
            urlValid = await this.validateUrl();
            if (!urlValid && !hasSerial) { this.statusMessage.textContent = 'Disconnected'; return; }
            if (!urlValid && hasSerial)  console.warn('URL validation failed — continuing with serial only.');
        }
        this.urlActive = urlValid;

        if (!hasSerial && 'serial' in navigator && !this.urlActive) {
            await this.selectPort();
            if (!this.port) { this.statusMessage.textContent = 'Disconnected'; return; }
        }

        if (!this.outputDirHandle) {
            try {
                this.outputDirHandle = await window.showDirectoryPicker({
                    id: 'rtk-nmea-recordings', mode: 'readwrite', startIn: 'documents',
                });
                console.log('Output directory selected.');
            } catch (error) {
                if (error.name === 'AbortError') {
                    this.statusMessage.textContent = 'Disconnected'; return;
                }
                console.error('Error selecting output directory:', error);
                alert(`Error selecting output directory: ${error.message}`);
                return;
            }
        }

        const timestamp = new Date().toISOString()
            .replace('T', '_').replace(/\..+Z$/, '').replace(/[:]/g, '-');
        this.currentTimestamp = timestamp;

        const sessionFolderName = `UBXView_${timestamp}`;
        try {
            this.sessionDirHandle = await this.outputDirHandle.getDirectoryHandle(sessionFolderName, { create: true });
            console.log(`Session directory created: ${sessionFolderName}`);
        } catch (error) {
            console.error('Error creating session directory:', error);
            alert(`Failed to create session folder "${sessionFolderName}": ${error.message}`);
            return;
        }

        if (this.port) {
            const folderName = `NMEAmsgs_${this.currentTimestamp}`;
            try {
                this.currentSubDirHandle = await this.sessionDirHandle.getDirectoryHandle(folderName, { create: true });
            } catch (error) {
                console.error('Error creating NMEA sub-directory:', error);
                alert(`Failed to create folder "${folderName}": ${error.message}`);
                return;
            }
            try {
                this.fileHandle = await this.currentSubDirHandle.getFileHandle(`RTKx_${timestamp}.txt`, { create: true });
                this.writableStream = await this.fileHandle.createWritable();
            } catch (error) {
                console.error('Error creating recording file:', error);
                alert(`File creation failed: ${error.message}`);
                this.currentSubDirHandle = null;
                return;
            }
        }

        if (this.urlActive) {
            try {
                this.trafficFileHandle = await this.sessionDirHandle.getFileHandle(`pingStation_${this.currentTimestamp}.ndjson`, { create: true });
                this.trafficWritableStream = await this.trafficFileHandle.createWritable();
            } catch (error) {
                console.error('Error creating traffic file:', error);
                alert(`Traffic file creation failed: ${error.message}`);
                if (!this.port) return;
                this.urlActive = false;
            }
        }

        await this.weatherRecorder.start(this.sessionDirHandle, this.currentTimestamp);

        this.totalBytesWritten = 0;
        this.bytesReceived     = 0;
        this.trafficData       = [];
        this.capturedData      = [];

        if (this.port) {
            try {
                await this.port.open({ baudRate: parseInt(this.baudRateSelect.value) });
            } catch (error) {
                console.error(`Serial open error: ${error.message}`);
                this.port = null;
                this.selectPortButton.textContent = 'Select Port';
                this.surveyButton.disabled = true;
                if (this.writableStream)      await this.writableStream.close();
                if (this.trafficWritableStream) await this.trafficWritableStream.close();
                this.resetFileState();
                this.resetUIToIdle();
                alert('Could not open the COM port. It may be disconnected or in use by another application.');
                return;
            }
        }

        this.isRecording = true;
        console.log('Recording started.');

        this.startButton.disabled      = true;
        this.endButton.disabled        = false;
        this.baudRateSelect.disabled   = true;
        this.selectPortButton.disabled = true;
        this.surveyButton.disabled     = true;
        this.urlInput.disabled         = true;
        this.urlInput.style.cursor     = 'not-allowed';

        this.lastTime     = performance.now();
        this.rateInterval = setInterval(() => this.updateRateDisplay(), 1000);

        if (this.port) this.readAndWriteLoop();
        this.startUrlPolling();
    }

    async endRecording() {
        if (!this.isRecording) return;

        clearInterval(this.rateInterval);
        this.rateInterval = null;

        this.stopUrlPolling();
        await this.weatherRecorder.stop();

        if (this.reader) {
            try { await this.reader.cancel(); } catch (e) { console.error('Error cancelling reader:', e); }
        }
        if (this.writableStream)      await this.writableStream.close();
        if (this.trafficWritableStream) await this.trafficWritableStream.close();

        if (this.port) {
            try { await this.port.close(); } catch (e) { console.error('Error closing port:', e); }
        }

        const subDir = this.currentSubDirHandle?.name ?? '(none)';
        console.log(`Recording stopped. NMEA dir: ${subDir}`);
        this.statusMessage.textContent = `Final size: ${this.formatFileSize(this.totalBytesWritten)}`;

        if (this.capturedData.length > 0 && this.currentSubDirHandle) {
            this.statusMessage.textContent = 'Post-processing...';
            try {
                await this.postProcessNMEA();
            } catch (error) {
                console.error('Post-processing error:', error);
                alert(`Post-processing failed: ${error.message}`);
            }
        }

        this.reader      = null;
        this.isRecording = false;
        this.urlActive   = false;
        this.resetFileState();
        this.capturedData      = [];
        this.trafficData       = [];
        this.totalBytesWritten = 0;

        this.statusMessage.textContent = 'Ready';
        this.resetUIToIdle();
    }

    resetFileState() {
        this.fileHandle            = null;
        this.writableStream        = null;
        this.sessionDirHandle      = null;
        this.currentSubDirHandle   = null;
        this.trafficFileHandle     = null;
        this.trafficWritableStream = null;
    }

    resetUIToIdle() {
        this.startButton.disabled    = false;
        this.endButton.disabled      = true;
        this.baudRateSelect.disabled = false;
        if ('serial' in navigator) {
            this.selectPortButton.disabled = false;
            this.surveyButton.disabled     = !this.port; // Re-enable only if port still selected
        }
        this.urlInput.disabled     = false;
        this.urlInput.style.cursor = '';
    }

    // ─── Serial Read Loop ─────────────────────────────────────────────

    async readAndWriteLoop() {
        if (!this.port?.readable || !this.writableStream) return;

        this.reader = this.port.readable.getReader();
        const decoder = new TextDecoder();

        try {
            while (true) {
                const { value, done } = await this.reader.read();
                if (done) break;
                if (value) {
                    this.bytesReceived     += value.length;
                    this.totalBytesWritten += value.length;
                    await this.writableStream.write(value);
                    this.capturedData.push(decoder.decode(value, { stream: true }));
                }
            }
        } catch (error) {
            if (error.name !== 'NetworkError' && error.name !== 'AbortError') {
                console.error(`Read Error: ${error.message}`);
            } else {
                console.log('Read loop cancelled.');
            }
        } finally {
            this.reader.releaseLock();
        }
    }

    // ─── Post-Processing ──────────────────────────────────────────────

    async postProcessNMEA() {
        const lines = this.capturedData.join('').split('\n').map(l => l.trim()).filter(l => l.length);
        console.log(`Processing ${lines.length} lines...`);
        const sorter = new NMEASorter();
        const result = sorter.sortNMEAData(lines, this.currentTimestamp);
        if (Object.keys(result.sortedData).length > 0) {
            await this.saveSortedFiles(result.sortedData);
            this.statusMessage.textContent = `Done! ${result.validCount} valid, ${result.invalidCount} invalid`;
        } else {
            this.statusMessage.textContent = 'No valid NMEA sentences found';
        }
    }

    async saveSortedFiles(sortedData) {
        try {
            let perm = await this.outputDirHandle.queryPermission({ mode: 'readwrite' });
            if (perm !== 'granted') perm = await this.outputDirHandle.requestPermission({ mode: 'readwrite' });
            if (perm !== 'granted') throw new Error('Permission denied to write post-processed files.');
            if (!this.currentSubDirHandle) throw new Error('Current sub-directory handle is missing.');

            for (const [talkerId, sentences] of Object.entries(sortedData)) {
                const fh = await this.currentSubDirHandle.getFileHandle(`${talkerId}_${this.currentTimestamp}.txt`, { create: true });
                const writable = await fh.createWritable();
                await writable.write(sentences.join('\n') + '\n');
                await writable.close();
            }
        } catch (error) {
            console.error('Error saving sorted files:', error);
            alert(`Error saving sorted files: ${error.message}`);
        }
    }

    // ─── Display Helpers ──────────────────────────────────────────────

    updateRateDisplay() {
        if (!this.rateInterval) return;
        const now = performance.now();
        const dur = (now - this.lastTime) / 1000;
        if (dur > 0) {
            const parts = [
                this.formatBytesPerSecond(this.bytesReceived / dur),
                this.formatFileSize(this.totalBytesWritten),
            ];
            if (this.urlActive) parts.push(`${this.trafficData.length} pkts`);
            this.statusMessage.textContent = parts.join(' | ');
        }
        this.lastTime      = now;
        this.bytesReceived = 0;
    }

    formatBytesPerSecond(b) {
        if (b < 1024) return `${b.toFixed(0)} B/s`;
        const kb = b / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB/s`;
        return `${(kb / 1024).toFixed(2)} MB/s`;
    }

    formatFileSize(b) {
        if (b < 1024) return `${b.toFixed(0)} B`;
        const kb = b / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB`;
        const mb = kb / 1024;
        if (mb < 1024) return `${mb.toFixed(2)} MB`;
        return `${(mb / 1024).toFixed(2)} GB`;
    }

    // ─── Page Lifecycle ───────────────────────────────────────────────

    handleBeforeUnload(event) {
        if (this.isRecording || this._isSurveying) {
            event.preventDefault();
            event.returnValue = 'Operation in progress. Are you sure you want to leave?';
            return event.returnValue;
        }
    }

    handlePageHide() {
        if (this._isSurveying) this._survey?.abort();
        if (this.isRecording) {
            this.weatherRecorder.stopEmergency();
            clearInterval(this.rateInterval);
            this.rateInterval = null;
            this.stopUrlPolling();
            this.reader?.cancel().catch(() => {});
            this.reader = null;
            this.writableStream?.close().catch(() => {});
            this.writableStream = null;
            this.trafficWritableStream?.close().catch(() => {});
            this.trafficWritableStream = null;
            this.port?.close().catch(() => {});
            this.port = null;
            this.isRecording = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new SerialRecorder());

export default SerialRecorder;
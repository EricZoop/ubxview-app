// Import the NMEASorter class
import NMEASorter from './nmea_sorter.js';

class SerialRecorder {
    constructor() {
        // DOM Elements
        this.startButton = document.getElementById('start-button');
        this.endButton = document.getElementById('end-button');
        this.statusMessage = document.getElementById('status-message');
        this.baudRateSelect = document.getElementById('baud-rate');
        this.selectPortButton = document.getElementById('select-port-button');
        this.urlInput = document.getElementById('url-input');
        this.pollRateInput = document.getElementById('pollRateInput');
        this.updatePollRateBtn = document.getElementById('updatePollRateBtn');

        // Serial Port State
        this.port = null;
        this.reader = null;

        // URL Reader State
        this.urlPollingInterval = null;
        this.urlPollingRateMs = parseInt(this.pollRateInput?.value) || 1000;
        this.trafficData = [];
        this.trafficFileHandle = null;
        this.trafficWritableStream = null;
        this.urlActive = false;

        // Shared Recording State
        this.isRecording = false;
        this.outputDirHandle = null;
        this.currentSubDirHandle = null;
        this.currentTimestamp = null;

        // Serial File State
        this.fileHandle = null;
        this.writableStream = null;

        // Rate and file size tracking
        this.bytesReceived = 0;
        this.lastTime = 0;
        this.rateInterval = null;
        this.totalBytesWritten = 0;

        // Post-processing state
        this.capturedData = [];

        if (!('serial' in navigator)) {
            this.handleUnsupportedBrowser();
        }

        this.initEventListeners();
    }

    initEventListeners() {
        this.startButton.addEventListener('click', () => this.startRecording());
        this.endButton.addEventListener('click', () => this.endRecording());
        this.selectPortButton.addEventListener('click', () => this.selectPort());

        // Poll rate: apply on button click or Enter key
        if (this.updatePollRateBtn) {
            this.updatePollRateBtn.addEventListener('click', () => this.applyPollRate());
        }
        if (this.pollRateInput) {
            this.pollRateInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.applyPollRate();
            });
        }

        window.addEventListener('beforeunload', (e) => this.handleBeforeUnload(e));
        window.addEventListener('pagehide', () => this.handlePageHide());
    }

    /**
     * Reads the poll rate input, clamps it, and restarts polling if active.
     */
    applyPollRate() {
        const raw = parseInt(this.pollRateInput.value);
        const clamped = Math.max(10, isNaN(raw) ? 1000 : raw);
        this.pollRateInput.value = clamped;
        this.urlPollingRateMs = clamped;
        console.log(`Poll rate set to ${clamped}ms`);

        // Hot-swap interval if currently polling
        if (this.urlActive && this.urlPollingInterval) {
            this.stopUrlPolling();
            this.startUrlPolling();
        }
    }

    handleUnsupportedBrowser() {
        console.warn('Web Serial API not supported — serial recording disabled. URL reader is still available.');
        this.selectPortButton.disabled = true;
        this.selectPortButton.textContent = 'Not Supported';
    }

    // ─── URL Reader Methods ───────────────────────────────────────────

    async validateUrl() {
        const url = this.urlInput.value.trim();
        if (!url) return false;

        try {
            const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            await response.json();
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
            const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
            if (!response.ok) return;

            const json = await response.json();
            const packet = {
                receivedAt: new Date().toISOString(),
                data: json
            };

            this.trafficData.push(packet);

            if (this.trafficWritableStream) {
                const line = JSON.stringify(packet) + '\n';
                const encoded = new TextEncoder().encode(line);
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

    // ─── Serial Port Methods ─────────────────────────────────────────

    async selectPort() {
        try {
            this.port = await navigator.serial.requestPort();
            const info = this.port.getInfo();
            const portName = info.usbProductId
                ? `COM (${info.usbVendorId || ''}:${info.usbProductId})`
                : 'Unknown COM Port';
            this.selectPortButton.textContent = portName;
            console.log('Port selected.');
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error selecting port:', error);
                alert(`Error selecting port: ${error.message}`);
            }
        }
    }

    // ─── Recording Lifecycle ─────────────────────────────────────────

    async startRecording() {
        if (this.isRecording) return;

        const hasSerial = !!this.port;
        const hasUrl = !!this.urlInput.value.trim();

        if (!hasSerial && !hasUrl) {
            alert('Please select a serial port and/or enter a URL endpoint before recording.');
            return;
        }

        // Snapshot current poll rate
        this.urlPollingRateMs = Math.max(10, parseInt(this.pollRateInput?.value) || 1000);

        // Validate URL if provided
        let urlValid = false;
        if (hasUrl) {
            this.statusMessage.textContent = 'Validating URL...';
            urlValid = await this.validateUrl();
            if (!urlValid && !hasSerial) {
                this.statusMessage.textContent = 'Disconnected';
                return;
            }
            if (!urlValid && hasSerial) {
                console.warn('URL validation failed — continuing with serial only.');
            }
        }
        this.urlActive = urlValid;

        // Prompt for serial port if needed
        if (!hasSerial && 'serial' in navigator && !this.urlActive) {
            await this.selectPort();
            if (!this.port) {
                this.statusMessage.textContent = 'Disconnected';
                return;
            }
        }

        // Output directory
        if (!this.outputDirHandle) {
            try {
                this.outputDirHandle = await window.showDirectoryPicker({
                    id: 'rtk-nmea-recordings',
                    mode: 'readwrite',
                    startIn: 'documents',
                });
                console.log('Output directory selected.');
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Folder selection cancelled.');
                    this.statusMessage.textContent = 'Disconnected';
                    return;
                }
                console.error('Error selecting output directory:', error);
                alert(`Error selecting output directory: ${error.message}`);
                return;
            }
        }

        // Timestamp
        const timestamp = new Date().toISOString()
            .replace('T', '_')
            .replace(/\..+Z$/, '')
            .replace(/[:]/g, '-');
        this.currentTimestamp = timestamp;

        // NMEA sub-directory (serial only)
        if (this.port) {
            const folderName = `NMEAmsgs_${this.currentTimestamp}`;
            try {
                this.currentSubDirHandle = await this.outputDirHandle.getDirectoryHandle(folderName, { create: true });
                console.log(`NMEA sub-directory created: ${folderName}`);
            } catch (error) {
                console.error('Error creating NMEA sub-directory:', error);
                alert(`Failed to create folder "${folderName}": ${error.message}`);
                return;
            }

            const defaultName = `RTKx_${timestamp}.txt`;
            try {
                this.fileHandle = await this.currentSubDirHandle.getFileHandle(defaultName, { create: true });
                this.writableStream = await this.fileHandle.createWritable();
            } catch (error) {
                console.error('Error creating recording file:', error);
                alert(`File creation failed: ${error.message}`);
                this.currentSubDirHandle = null;
                return;
            }
        }

        // Traffic file in parent directory (URL only)
        if (this.urlActive) {
            const trafficFileName = `pingStation_${this.currentTimestamp}.json`;
            try {
                this.trafficFileHandle = await this.outputDirHandle.getFileHandle(trafficFileName, { create: true });
                this.trafficWritableStream = await this.trafficFileHandle.createWritable();
                console.log(`Traffic file created: ${trafficFileName}`);
            } catch (error) {
                console.error('Error creating traffic file:', error);
                alert(`Traffic file creation failed: ${error.message}`);
                if (!this.port) return;
                this.urlActive = false;
            }
        }

        // Reset counters
        this.totalBytesWritten = 0;
        this.bytesReceived = 0;
        this.trafficData = [];
        this.capturedData = [];

        // Open serial port
        if (this.port) {
            try {
                const baudRate = parseInt(this.baudRateSelect.value);
                await this.port.open({ baudRate });
            } catch (error) {
                console.error(`Serial open error: ${error.message}`);
                if (this.writableStream) await this.writableStream.close();
                if (this.trafficWritableStream) await this.trafficWritableStream.close();
                this.resetFileState();
                this.resetUIToIdle();
                return;
            }
        }

        this.isRecording = true;
        console.log('Recording started.');

        // UI lockdown
        this.startButton.disabled = true;
        this.endButton.disabled = false;
        this.baudRateSelect.disabled = true;
        this.selectPortButton.disabled = true;
        this.urlInput.disabled = true;

        this.lastTime = performance.now();
        this.rateInterval = setInterval(() => this.updateRateDisplay(), 1000);

        // Start readers
        if (this.port) this.readAndWriteLoop();
        this.startUrlPolling();
    }

    async endRecording() {
        if (!this.isRecording) return;

        clearInterval(this.rateInterval);
        this.rateInterval = null;

        this.stopUrlPolling();

        if (this.reader) {
            try { await this.reader.cancel(); } catch (e) {
                console.error('Error cancelling reader:', e);
            }
        }

        if (this.writableStream) await this.writableStream.close();

        if (this.trafficWritableStream) {
            await this.trafficWritableStream.close();
            console.log(`Traffic data saved: ${this.trafficData.length} packets.`);
        }

        if (this.port) {
            try { await this.port.close(); } catch (e) {
                console.error('Error closing port:', e);
            }
        }

        const subDir = this.currentSubDirHandle ? this.currentSubDirHandle.name : '(none)';
        console.log(`Recording stopped. NMEA dir: ${subDir}`);
        this.statusMessage.textContent = `Final size: ${this.formatFileSize(this.totalBytesWritten)}`;

        // Post-processing (serial NMEA only)
        if (this.capturedData.length > 0 && this.currentSubDirHandle) {
            console.log('Starting NMEA post-processing...');
            this.statusMessage.textContent = 'Post-processing...';
            try {
                await this.postProcessNMEA();
            } catch (error) {
                console.error('Post-processing error:', error);
                alert(`Post-processing failed: ${error.message}`);
            }
        }

        // Reset state
        this.port = null;
        this.reader = null;
        this.isRecording = false;
        this.urlActive = false;
        this.resetFileState();
        this.capturedData = [];
        this.trafficData = [];
        this.totalBytesWritten = 0;

        this.statusMessage.textContent = 'Disconnected';
        this.resetUIToIdle();
    }

    resetFileState() {
        this.fileHandle = null;
        this.writableStream = null;
        this.currentSubDirHandle = null;
        this.trafficFileHandle = null;
        this.trafficWritableStream = null;
    }

    resetUIToIdle() {
        this.startButton.disabled = false;
        this.endButton.disabled = true;
        this.baudRateSelect.disabled = false;
        if ('serial' in navigator) this.selectPortButton.disabled = false;
        this.urlInput.disabled = false;
    }

    // ─── Serial Read Loop ────────────────────────────────────────────

    async readAndWriteLoop() {
        if (!this.port || !this.port.readable || !this.writableStream) return;

        this.reader = this.port.readable.getReader();
        const decoder = new TextDecoder();

        try {
            while (true) {
                const { value, done } = await this.reader.read();
                if (done) break;
                if (value) {
                    this.bytesReceived += value.length;
                    this.totalBytesWritten += value.length;
                    await this.writableStream.write(value);

                    const text = decoder.decode(value, { stream: true });
                    this.capturedData.push(text);
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

    // ─── Post-Processing (Serial NMEA) ──────────────────────────────

    async postProcessNMEA() {
        const fullData = this.capturedData.join('');
        const lines = fullData.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        console.log(`Processing ${lines.length} lines...`);

        const sorter = new NMEASorter();
        const result = sorter.sortNMEAData(lines, this.currentTimestamp);

        console.log(`Valid: ${result.validCount}, Invalid: ${result.invalidCount}`);
        console.log(`Talker IDs: ${Object.keys(result.sortedData).join(', ')}`);

        if (Object.keys(result.sortedData).length > 0) {
            await this.saveSortedFiles(result.sortedData);
            this.statusMessage.textContent = `Done! ${result.validCount} valid, ${result.invalidCount} invalid`;
        } else {
            this.statusMessage.textContent = 'No valid NMEA sentences found';
            console.log('No valid NMEA data to save.');
        }
    }

    async saveSortedFiles(sortedData) {
        try {
            let permission = await this.outputDirHandle.queryPermission({ mode: 'readwrite' });
            if (permission !== 'granted') {
                permission = await this.outputDirHandle.requestPermission({ mode: 'readwrite' });
            }
            if (permission !== 'granted') {
                throw new Error('Permission denied to write post-processed files.');
            }
            if (!this.currentSubDirHandle) {
                throw new Error('Current sub-directory handle is missing.');
            }

            const subDirHandle = this.currentSubDirHandle;

            for (const [talkerId, sentences] of Object.entries(sortedData)) {
                const filename = `${talkerId}_${this.currentTimestamp}.txt`;
                const fh = await subDirHandle.getFileHandle(filename, { create: true });
                const writable = await fh.createWritable();
                await writable.write(sentences.join('\n') + '\n');
                await writable.close();
                console.log(`Saved ${sentences.length} sentences to ${subDirHandle.name}/${filename}`);
            }

            console.log(`All post-processed files saved in: ${subDirHandle.name}`);
        } catch (error) {
            console.error('Error saving sorted files:', error);
            alert(`Error saving sorted files: ${error.message}`);
        }
    }

    // ─── Display Helpers ─────────────────────────────────────────────

    updateRateDisplay() {
        if (!this.rateInterval) return;
        const now = performance.now();
        const duration = (now - this.lastTime) / 1000;
        if (duration > 0) {
            const rate = this.bytesReceived / duration;
            const rateText = this.formatBytesPerSecond(rate);
            const sizeText = this.formatFileSize(this.totalBytesWritten);

            const parts = [rateText, sizeText];
            if (this.urlActive) parts.push(`${this.trafficData.length} pkts`);
            this.statusMessage.textContent = parts.join(' | ');
        }
        this.lastTime = now;
        this.bytesReceived = 0;
    }

    formatBytesPerSecond(bytes) {
        if (bytes < 1024) return `${bytes.toFixed(0)} B/s`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB/s`;
        return `${(kb / 1024).toFixed(2)} MB/s`;
    }

    formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes.toFixed(0)} B`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB`;
        const mb = kb / 1024;
        if (mb < 1024) return `${mb.toFixed(2)} MB`;
        return `${(mb / 1024).toFixed(2)} GB`;
    }

    // ─── Page Lifecycle Handlers ─────────────────────────────────────

    handleBeforeUnload(event) {
        if (this.isRecording) {
            event.preventDefault();
            event.returnValue = 'Recording is in progress. Are you sure you want to leave?';
            return event.returnValue;
        }
    }

    handlePageHide() {
        if (this.isRecording) {
            console.warn('pagehide: Attempting emergency close of resources.');

            clearInterval(this.rateInterval);
            this.rateInterval = null;
            this.stopUrlPolling();

            if (this.reader) {
                this.reader.cancel().catch(e => console.error('pagehide reader.cancel:', e.message));
                this.reader = null;
            }
            if (this.writableStream) {
                this.writableStream.close().catch(e => console.error('pagehide serial close:', e.message));
                this.writableStream = null;
            }
            if (this.trafficWritableStream) {
                this.trafficWritableStream.close().catch(e => console.error('pagehide traffic close:', e.message));
                this.trafficWritableStream = null;
            }
            if (this.port) {
                this.port.close().catch(e => console.error('pagehide port.close:', e.message));
                this.port = null;
            }

            this.isRecording = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new SerialRecorder());

export default SerialRecorder;
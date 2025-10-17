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

        // Serial Port & File State
        this.port = null;
        this.reader = null;
        this.isRecording = false;
        this.fileHandle = null;
        this.writableStream = null;
        this.outputDirHandle = null;

        // Rate and file size tracking
        this.bytesReceived = 0;
        this.lastTime = 0;
        this.rateInterval = null;
        this.totalBytesWritten = 0;

        // Post-processing state
        this.capturedData = [];
        this.currentTimestamp = null;

        // Check for Web Serial API support
        if (!('serial' in navigator)) {
            this.handleUnsupportedBrowser();
            return;
        }

        this.initEventListeners();
    }

    initEventListeners() {
        this.startButton.addEventListener('click', () => this.startRecording());
        this.endButton.addEventListener('click', () => this.endRecording());
        this.selectPortButton.addEventListener('click', () => this.selectPort());

        // --- ADDED ---
        // Warn user before they leave the page if recording is active
        window.addEventListener('beforeunload', (event) => this.handleBeforeUnload(event));

        // Attempt a best-effort cleanup if the page is hidden/unloaded
        window.addEventListener('pagehide', () => this.handlePageHide());
        // --- END ADDED ---
    }

    handleUnsupportedBrowser() {
        console.error('Web Serial API not supported');
        this.startButton.disabled = true;
        this.startButton.textContent = 'Not Supported';
        alert('Your browser does not support the Web Serial API. Please use a compatible browser like Chrome, Edge, or Opera.');
    }

    async selectPort() {
        try {
            this.port = await navigator.serial.requestPort();
            const info = this.port.getInfo();
            const portName = info.usbProductId ?
                `COM (${info.usbVendorId || ''}:${info.usbProductId})` :
                'Unknown COM Port';
            this.selectPortButton.textContent = portName;
            console.log('Port selected.');
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error selecting port:', error);
                alert(`Error selecting port: ${error.message}`);
            }
        }
    }

    async startRecording() {
        if (this.isRecording) return;

        // Ask user for output folder once per session
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
                    console.log('Folder selection cancelled by user.');
                    return;
                }
                console.error('Error selecting output directory:', error);
                alert(`Error selecting output directory: ${error.message}`);
                return;
            }
        }

        // Generate timestamp and file name
        const timestamp = new Date().toISOString()
            .replace('T', '_')
            .replace(/\..+Z$/, '')
            .replace(/[:]/g, '-');

        this.currentTimestamp = timestamp;
        const defaultName = `RTK_NMEA_${timestamp}.txt`;

        try {
            // Create recording file in the chosen directory
            this.fileHandle = await this.outputDirHandle.getFileHandle(defaultName, { create: true });
            this.writableStream = await this.fileHandle.createWritable();
        } catch (error) {
            console.error('Error creating recording file:', error);
            alert(`File creation failed: ${error.message}`);
            return;
        }

        // Reset file size and counters
        this.totalBytesWritten = 0;
        this.bytesReceived = 0;

        // Open serial port
        try {
            if (!this.port) {
                await this.selectPort();
                if (!this.port) {
                    await this.writableStream.close();
                    this.fileHandle = null;
                    this.writableStream = null;
                    return;
                }
            }

            const baudRate = parseInt(this.baudRateSelect.value);
            await this.port.open({ baudRate });

            this.isRecording = true;
            this.capturedData = [];
            console.log(`Recording to ${this.fileHandle.name}...`);

            // --- UI Updates ---
            this.startButton.disabled = true;
            this.endButton.disabled = false;
            this.baudRateSelect.disabled = true;
            this.selectPortButton.disabled = true;

            this.lastTime = performance.now();
            this.rateInterval = setInterval(() => this.updateRateDisplay(), 1000);

            this.readAndWriteLoop();

        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (this.writableStream) {
                await this.writableStream.close();
            }
            this.startButton.disabled = false;
            this.endButton.disabled = true;
            this.baudRateSelect.disabled = false;
            this.selectPortButton.disabled = false;
        }
    }

    async endRecording() {
        if (!this.isRecording || !this.port) return;

        // --- MODIFIED ---
        // Clear interval *before* await
        clearInterval(this.rateInterval);
        this.rateInterval = null;
        // --- END MODIFIED ---

        if (this.reader) {
            try {
                await this.reader.cancel();
            } catch (error) {
                console.error("Error cancelling reader:", error);
            }
        }

        if (this.writableStream) {
            await this.writableStream.close();
        }

        try {
            await this.port.close();
        } catch (error) {
            console.error("Error closing port:", error);
        }

        console.log(`Recording stopped. Data saved to ${this.fileHandle.name}.`);
        this.statusMessage.textContent = `Final size: ${this.formatFileSize(this.totalBytesWritten)}`;

        // Post-processing phase
        console.log('Starting NMEA post-processing...');
        this.statusMessage.textContent = 'Post-processing...';

        try {
            await this.postProcessNMEA();
        } catch (error) {
            console.error('Post-processing error:', error);
            alert(`Post-processing failed: ${error.message}`);
        }

        // Reset state
        this.port = null;
        this.reader = null;
        this.isRecording = false;
        this.fileHandle = null;
        this.writableStream = null;
        this.capturedData = [];
        this.totalBytesWritten = 0; // Reset after finishing

        // --- UI Updates ---
        this.statusMessage.textContent = 'Disconnected';
        this.startButton.disabled = false;
        this.endButton.disabled = true;
        this.baudRateSelect.disabled = false;
        this.selectPortButton.disabled = false;
    }

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
            // Check for AbortError or NetworkError which happens on cancel()
            if (error.name !== 'NetworkError' && error.name !== 'AbortError') {
                console.error(`Read Error: ${error.message}`);
            } else {
                console.log('Read loop cancelled.');
            }
        } finally {
            this.reader.releaseLock();
        }
    }

    async postProcessNMEA() {
        const fullData = this.capturedData.join('');
        const lines = fullData.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        console.log(`Processing ${lines.length} lines...`);

        const sorter = new NMEASorter();
        const result = sorter.sortNMEAData(lines, this.currentTimestamp);

        console.log(`Valid sentences: ${result.validCount}, Invalid sentences: ${result.invalidCount}`);
        console.log(`Talker IDs found: ${Object.keys(result.sortedData).join(', ')}`);

        if (Object.keys(result.sortedData).length > 0) {
            await this.saveSortedFiles(result.sortedData);
            this.statusMessage.textContent = `Post-processing complete! ${result.validCount} valid, ${result.invalidCount} invalid`;
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

            const folderName = `RTK_NMEAmsgs_${this.currentTimestamp}`;
            const subDirHandle = await this.outputDirHandle.getDirectoryHandle(folderName, { create: true });

            for (const [talkerId, sentences] of Object.entries(sortedData)) {
                const filename = `${talkerId}_${this.currentTimestamp}.txt`;
                const fileHandle = await subDirHandle.getFileHandle(filename, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(sentences.join('\n') + '\n');
                await writable.close();

                console.log(`Saved ${sentences.length} sentences to ${folderName}/${filename}`);
            }

            console.log(`All post-processed files saved in: ${folderName}`);

        } catch (error) {
            console.error('Error saving sorted files:', error);
            alert(`Error saving sorted files: ${error.message}`);
        }
    }

    updateRateDisplay() {
        // --- ADDED ---
        // Check if interval is still active
        if (!this.rateInterval) return;
        // --- END ADDED ---
        
        const now = performance.now();
        const duration = (now - this.lastTime) / 1000;
        if (duration > 0) {
            const rate = this.bytesReceived / duration;
            const rateText = this.formatBytesPerSecond(rate);
            const sizeText = this.formatFileSize(this.totalBytesWritten);
            this.statusMessage.textContent = `${rateText} | ${sizeText}`;
        }
        this.lastTime = now;
        this.bytesReceived = 0;
    }

    formatBytesPerSecond(bytes) {
        if (bytes < 1024) return `${bytes.toFixed(0)} B/s`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB/s`;
        const mb = kb / 1024;
        return `${mb.toFixed(2)} MB/s`;
    }

    formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes.toFixed(0)} B`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB`;
        const mb = kb / 1024;
        if (mb < 1024) return `${mb.toFixed(2)} MB`;
        const gb = mb / 1024;
        return `${gb.toFixed(2)} GB`;
    }

    // --- ADDED METHODS ---

    handleBeforeUnload(event) {
        if (this.isRecording) {
            console.log('beforeunload: Recording in progress, prompting user.');
            // Standard way to trigger the browser's "are you sure?" prompt
            event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = 'Recording is in progress. Closing the tab will stop it. Are you sure you want to leave?';
            return event.returnValue; // For older browsers
        }
    }

    /**
     * Best-effort cleanup when the page is being unloaded (e.g., tab close).
     * This runs *after* beforeunload if the user confirms they want to leave.
     * We CANNOT use 'await' here, so this is "fire-and-forget".
     * The primary goal is to close the file stream to prevent data corruption.
     * Post-processing is SKIPPED.
     */
    handlePageHide() {
        if (this.isRecording) {
            console.warn('pagehide: Page is unloading! Attempting emergency close of resources.');

            // Stop the UI updates
            clearInterval(this.rateInterval);
            this.rateInterval = null;

            // --- Fire-and-forget resource cleanup ---
            // We can't await these, so we just call them and hope the browser
            // gives them time to complete before tearing down the process.
            // We add .catch() to suppress "uncaught promise rejection" errors.

            if (this.reader) {
                this.reader.cancel().catch(e => {
                    console.error('Error during pagehide reader.cancel:', e.name, e.message);
                });
                this.reader = null;
            }

            if (this.writableStream) {
                // This is the most critical part for saving the data!
                this.writableStream.close().catch(e => {
                    console.error('Error during pagehide writableStream.close:', e.name, e.message);
                });
                this.writableStream = null;
            }

            if (this.port) {
                this.port.close().catch(e => {
                    console.error('Error during pagehide port.close:', e.name, e.message);
                });
                this.port = null;
            }
            
            // Set state
            this.isRecording = false;
            
            // We CANNOT run post-processing here.
            console.log('pagehide: Emergency cleanup initiated. Raw file *should* be saved.');
        }
    }
    // --- END ADDED METHODS ---
}

document.addEventListener('DOMContentLoaded', () => new SerialRecorder());

export default SerialRecorder;
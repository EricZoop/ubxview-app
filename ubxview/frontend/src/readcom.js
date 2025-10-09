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

        // Rate calculation
        this.bytesReceived = 0;
        this.lastTime = 0;
        this.rateInterval = null;

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

        // Prompt user to create/save a file at the beginning
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const defaultName = `CaptureRTK_${timestamp}.bin`; // Saving raw bytes is better as .bin

            this.fileHandle = await window.showSaveFilePicker({
                suggestedName: defaultName,
                types: [{
                    description: 'Binary Files',
                    accept: {
                        'application/octet-stream': ['.bin', '.dat']
                    },
                }, {
                    description: 'Text Files',
                    accept: {
                        'text/plain': ['.txt']
                    },
                }, ],
            });
            this.writableStream = await this.fileHandle.createWritable();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('File save cancelled by user.');
                return;
            }
            console.error(`File Error: ${error.message}`);
            return;
        }

        // Proceed with connecting to the serial port
        try {
            if (!this.port) {
                await this.selectPort();
                // If port selection was cancelled, abort
                if (!this.port) {
                    await this.writableStream.close();
                    this.fileHandle = null;
                    this.writableStream = null;
                    return;
                }
            }

            const baudRate = parseInt(this.baudRateSelect.value);
            await this.port.open({
                baudRate
            });

            this.isRecording = true;
            console.log(`Recording to ${this.fileHandle.name}...`);

            // --- UI & State Updates ---
            this.startButton.disabled = true;
            this.endButton.disabled = false;
            this.baudRateSelect.disabled = true;
            this.selectPortButton.disabled = true;

            this.bytesReceived = 0;
            this.lastTime = performance.now();
            this.rateInterval = setInterval(() => this.updateRateDisplay(), 1000);

            this.readAndWriteLoop();

        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (this.writableStream) {
                await this.writableStream.close();
            }
            // Reset UI
            this.startButton.disabled = false;
            this.endButton.disabled = true;
            this.baudRateSelect.disabled = false;
            this.selectPortButton.disabled = false;
        }
    }

    async endRecording() {
        if (!this.isRecording || !this.port) return;

        // Stop the rate calculator
        clearInterval(this.rateInterval);
        this.rateInterval = null;

        // Stop reading from the port
        if (this.reader) {
            try {
                await this.reader.cancel();
            } catch (error) {
                console.error("Error cancelling reader:", error);
            }
        }

        // Close the file stream to finalize the write
        if (this.writableStream) {
            await this.writableStream.close();
        }

        // Close the serial port
        try {
            await this.port.close();
        } catch (error) {
            console.error("Error closing port:", error);
        }

        console.log(`Recording stopped. Data saved to ${this.fileHandle.name}.`);

        // Reset state
        this.port = null;
        this.reader = null;
        this.isRecording = false;
        this.fileHandle = null;
        this.writableStream = null;

        // --- UI & State Updates ---
        this.statusMessage.textContent = 'Disconnected';
        this.startButton.disabled = false;
        this.endButton.disabled = true;
        this.baudRateSelect.disabled = false;
        this.selectPortButton.disabled = false;
    }

    async readAndWriteLoop() {
        if (!this.port || !this.port.readable || !this.writableStream) return;

        // Read raw bytes, not text, for accurate byte counting
        this.reader = this.port.readable.getReader();

        try {
            while (true) {
                const {
                    value,
                    done
                } = await this.reader.read(); // value is a Uint8Array
                if (done) break;
                if (value) {
                    this.bytesReceived += value.length;
                    await this.writableStream.write(value);
                }
            }
        } catch (error) {
            // This error is expected when the port is closed or the reader is cancelled.
            if (error.name !== 'NetworkError') {
                console.error(`Read Error: ${error.message}`);
            }
        } finally {
            this.reader.releaseLock();
        }
    }

    updateRateDisplay() {
        const now = performance.now();
        const duration = (now - this.lastTime) / 1000; // seconds
        if (duration > 0) {
            const rate = this.bytesReceived / duration; // bytes per second
            this.statusMessage.textContent = this.formatBytesPerSecond(rate);
        }
        // Reset for the next interval
        this.lastTime = now;
        this.bytesReceived = 0;
    }

    formatBytesPerSecond(bytes) {
        if (bytes < 1024) {
            return `${bytes.toFixed(0)} B/s`;
        }
        const kb = bytes / 1024;
        if (kb < 1024) {
            return `${kb.toFixed(2)} KB/s`;
        }
        const mb = kb / 1024;
        return `${mb.toFixed(2)} MB/s`;
    }
}

document.addEventListener('DOMContentLoaded', () => new SerialRecorder());

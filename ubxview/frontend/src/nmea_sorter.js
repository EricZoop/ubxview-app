/**
 * JavaScript port of the Python NMEA sorter functionality.
 * Validates NMEA sentence checksums and sorts sentences by talker ID.
 */
class NMEASorter {
    constructor() {
        this.validCount = 0;
        this.invalidCount = 0;
    }

    /**
     * Validates an NMEA sentence's checksum.
     * 
     * @param {string} sentence - The NMEA sentence string (e.g., "$GNGGA,...*74")
     * @returns {boolean} True if the sentence format is valid and checksum matches
     */
    validateNMEAChecksum(sentence) {
        sentence = sentence.trim();

        // A valid sentence starts with '$' and has a checksum separated by '*'
        if (!sentence.startsWith('$') || !sentence.includes('*')) {
            return false;
        }

        // Split the sentence from the checksum
        const parts = sentence.split('*');
        if (parts.length !== 2) {
            return false; // Malformed sentence, multiple '*' or missing checksum
        }

        const sentenceBody = parts[0].substring(1); // Get the part between '$' and '*'
        const checksumStr = parts[1];

        // Parse the checksum as hexadecimal
        const checksumFromSentence = parseInt(checksumStr, 16);
        if (isNaN(checksumFromSentence)) {
            return false; // Checksum is not a valid hex number
        }

        // Calculate the checksum by XORing the ASCII values of all characters in the body
        let calculatedChecksum = 0;
        for (let i = 0; i < sentenceBody.length; i++) {
            calculatedChecksum ^= sentenceBody.charCodeAt(i);
        }

        // Compare the calculated checksum with the one from the sentence
        return calculatedChecksum === checksumFromSentence;
    }

    /**
     * Extracts the talker ID from a valid NMEA sentence.
     * 
     * @param {string} sentence - The NMEA sentence string
     * @returns {string|null} The talker ID (e.g., "GNGGA") or null if invalid
     */
    extractTalkerID(sentence) {
        try {
            const trimmed = sentence.trim();
            if (!trimmed.startsWith('$')) {
                return null;
            }

            // Extract the part between '$' and the first comma
            const firstCommaIndex = trimmed.indexOf(',');
            if (firstCommaIndex === -1) {
                return null;
            }

            return trimmed.substring(1, firstCommaIndex);
        } catch (error) {
            return null;
        }
    }

    /**
     * Sorts NMEA data lines by talker ID after validating checksums.
     * 
     * @param {Array<string>} lines - Array of NMEA sentence strings
     * @param {string} timestamp - Timestamp string for logging purposes
     * @returns {Object} Object containing sortedData, validCount, and invalidCount
     */
    sortNMEAData(lines, timestamp = null) {
        const sortedData = {};
        this.validCount = 0;
        this.invalidCount = 0;

        for (const line of lines) {
            if (!line || line.trim().length === 0) {
                continue;
            }

            // Validate the checksum
            if (this.validateNMEAChecksum(line)) {
                this.validCount++;

                // Extract the talker ID
                const talkerId = this.extractTalkerID(line);
                
                if (talkerId) {
                    // Initialize array for this talker ID if not exists
                    if (!sortedData[talkerId]) {
                        sortedData[talkerId] = [];
                        console.log(`Creating entry for valid talker ID: ${talkerId}`);
                    }

                    // Add the sentence to the appropriate array
                    sortedData[talkerId].push(line.trim());
                } else {
                    // Valid checksum but couldn't extract talker ID
                    this.invalidCount++;
                }
            } else {
                // Invalid checksum
                this.invalidCount++;
            }
        }

        // Log summary
        console.log('\n--- Processing Summary ---');
        console.log(`Valid sentences processed: ${this.validCount}`);
        console.log(`Invalid/disregarded lines: ${this.invalidCount}`);
        console.log('--------------------------');

        return {
            sortedData: sortedData,
            validCount: this.validCount,
            invalidCount: this.invalidCount
        };
    }

    /**
     * Process a single file's content (text string).
     * 
     * @param {string} fileContent - The complete file content as a string
     * @param {string} timestamp - Timestamp for output file naming
     * @returns {Object} Object containing sortedData, validCount, and invalidCount
     */
    processFileContent(fileContent, timestamp = null) {
        // Split content into lines
        const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        return this.sortNMEAData(lines, timestamp);
    }

    /**
     * Creates downloadable text files from sorted data.
     * 
     * @param {Object} sortedData - Object with talker IDs as keys and sentence arrays as values
     * @param {string} timestamp - Timestamp for file naming
     */
    createDownloadableFiles(sortedData, timestamp) {
        for (const [talkerId, sentences] of Object.entries(sortedData)) {
            const filename = `RTK_${talkerId}_${timestamp}.txt`;
            const content = sentences.join('\n') + '\n';
            
            // Create a blob and download link
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            
            console.log(`Downloaded ${filename} with ${sentences.length} sentences`);
        }
    }

    /**
     * Static method to validate a single NMEA sentence (convenience method).
     * 
     * @param {string} sentence - The NMEA sentence to validate
     * @returns {boolean} True if valid
     */
    static validate(sentence) {
        const sorter = new NMEASorter();
        return sorter.validateNMEAChecksum(sentence);
    }

    /**
     * Static method to extract talker ID from a sentence (convenience method).
     * 
     * @param {string} sentence - The NMEA sentence
     * @returns {string|null} The talker ID or null
     */
    static getTalkerID(sentence) {
        const sorter = new NMEASorter();
        return sorter.extractTalkerID(sentence);
    }
}

// ES6 module export
export default NMEASorter;
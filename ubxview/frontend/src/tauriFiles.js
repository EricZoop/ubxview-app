// tauriFiles.js
import { readFile, readDir, stat } from '@tauri-apps/plugin-fs';

export const isTauri = () => Boolean(window.__TAURI_INTERNALS__);

/**
 * Returns true when the path points to a directory.
 */
export async function isDirectory(path) {
    try {
        const info = await stat(path);
        return info.isDirectory;
    } catch {
        return false;
    }
}

/**
 * Recursively collects all file paths under a directory.
 */
export async function collectFilePathsRecursive(dirPath) {
    const entries = await readDir(dirPath);
    const paths   = [];
    for (const entry of entries) {
        const full = dirPath.replace(/[/\\]$/, '') + '/' + entry.name;
        if (entry.isDirectory) {
            paths.push(...await collectFilePathsRecursive(full));
        } else {
            paths.push(full);
        }
    }
    return paths;
}

/**
 * Creates a minimal FileSystemFileHandle-compatible object from a native path.
 */
export async function createHandleFromPath(filePath) {
    const fileName = filePath.replace(/\\/g, '/').split('/').pop();
    const bytes    = await readFile(filePath);

    const buffer = bytes.buffer.slice(
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength
    );

    const mockFile = {
        name:        fileName,
        size:        bytes.byteLength,
        text:        async () => new TextDecoder().decode(bytes),
        arrayBuffer: async () => buffer,
    };

    return {
        kind:    'file',
        name:    fileName,
        getFile: async () => mockFile,
    };
}
// ubxview/src-tauri/src/main.rs

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use notify::{RecursiveMode, Watcher};
use std::fs::File;
use std::io::{Read, Seek, SeekFrom};
use std::sync::mpsc::channel;
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use tauri::Emitter;
// Create a state to hold the last read position (offset)
struct AppState {
    offset: Arc<Mutex<u64>>,
}

#[tauri::command]
fn watch_file(path: String, app_handle: tauri::AppHandle, state: tauri::State<AppState>) {
    let offset = state.offset.clone();
    
    // Reset the offset for the new file
    *offset.lock().unwrap() = 0;

    thread::spawn(move || {
        // Create a channel to receive the events.
        let (tx, rx) = channel();

        // Create a watcher object, delivering events to the channel.
        let mut watcher = notify::recommended_watcher(tx).unwrap();

        // Add the path to be watched.
        watcher
            .watch(path.as_ref(), RecursiveMode::NonRecursive)
            .unwrap();
        
        println!("Started watching file: {}", path);

        // The watch loop
        for res in rx {
            if let Ok(event) = res {
                // We only care about data changes
                if event.kind.is_modify() || event.kind.is_create() {
                    if let Ok(mut file) = File::open(&path) {
                        let mut current_offset = offset.lock().unwrap();
                        file.seek(SeekFrom::Start(*current_offset)).unwrap();
                        
                        let mut buffer = String::new();
                        if file.read_to_string(&mut buffer).is_ok() && !buffer.is_empty() {
                            // Update offset to the new position
                            *current_offset = file.seek(SeekFrom::Current(0)).unwrap();
                            // This now works because the Emitter trait is in scope
                            app_handle.emit("file-update", buffer).unwrap();
                        }
                    }
                }
            }
            // Add a small delay to debounce events
            thread::sleep(Duration::from_millis(50));
        }
    });
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_cors_fetch::init())
        .manage(AppState {
            offset: Arc::new(Mutex::new(0)),
        })
        .invoke_handler(tauri::generate_handler![watch_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
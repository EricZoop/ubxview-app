// src-tauri/src/lib.rs

use notify::{RecursiveMode, Watcher};
use std::fs::File;
use std::io::{Read, Seek, SeekFrom};
use std::sync::mpsc::channel;
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use tauri::Emitter;

pub struct AppState {
    pub offset: Arc<Mutex<u64>>,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn fetch_url(url: String) -> Result<String, String> {
    reqwest::get(&url)
        .await
        .map_err(|e| e.to_string())?
        .text()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn watch_file(path: String, app_handle: tauri::AppHandle, state: tauri::State<AppState>) {
    let offset = state.offset.clone();
    *offset.lock().unwrap() = 0;

    thread::spawn(move || {
        let (tx, rx) = channel();
        let mut watcher = notify::recommended_watcher(tx).unwrap();
        watcher.watch(path.as_ref(), RecursiveMode::NonRecursive).unwrap();
        println!("Started watching file: {}", path);

        for res in rx {
            if let Ok(event) = res {
                if event.kind.is_modify() || event.kind.is_create() {
                    if let Ok(mut file) = File::open(&path) {
                        let mut current_offset = offset.lock().unwrap();
                        file.seek(SeekFrom::Start(*current_offset)).unwrap();
                        let mut buffer = String::new();
                        if file.read_to_string(&mut buffer).is_ok() && !buffer.is_empty() {
                            *current_offset = file.seek(SeekFrom::Current(0)).unwrap();
                            app_handle.emit("file-update", buffer).unwrap();
                        }
                    }
                }
            }
            thread::sleep(Duration::from_millis(50));
        }
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_cors_fetch::init())
        .manage(AppState {
            offset: Arc::new(Mutex::new(0)),
        })
        .invoke_handler(tauri::generate_handler![greet, fetch_url, watch_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod device;
mod tray;

fn main() {
    tauri::Builder::default()
        .system_tray(tray::main_menu())
        .on_system_tray_event(tray::handler)
        .invoke_handler(tauri::generate_handler![
            device::start_bongo,
            device::stop_bongo
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

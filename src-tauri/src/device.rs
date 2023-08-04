extern crate device_query;

use std::thread;
use std::time::Duration;

use device_query::{DeviceEvents, DeviceState};
use tauri::Window;

static mut STOP: bool = false;

#[tauri::command]
pub fn start_bongo(window: Window) {
    stop_bongo();

    std::thread::spawn(move || {
        unsafe {
            STOP = false;
        }
        let device_state = DeviceState::new();

        let win1 = window.clone();
        let win2 = window.clone();
        let win3 = window.clone();
        let win4 = window.clone();
        let win5 = window.clone();

        let _guard = device_state.on_key_down(move |key| {
            // println!("Down: {:#?}", key);
            win1.emit("bongo-down", key.to_string()).unwrap();
        });
        let _guard = device_state.on_key_up(move |key| {
            // println!("Up: {:#?}", key);
            win2.emit("bongo-up", key.to_string()).unwrap();
        });
        let _guard = device_state.on_mouse_move(move |position| {
            // println!("Position: {:#?}", position);
            win3.emit("bongo-move", position).unwrap();
        });
        let _guard = device_state.on_mouse_down(move |button| {
            // println!("Down: {:#?}", button);
            win4.emit("bongo-down", button.to_string()).unwrap();
        });
        let _guard = device_state.on_mouse_up(move |button| {
            // println!("Up: {:#?}", button);
            win5.emit("bongo-up", button.to_string()).unwrap();
        });

        loop {
            unsafe {
                if STOP {
                    println!("停止监听事件");
                    break;
                }
            }
            thread::sleep(Duration::from_millis(20));
        }
    });
}

#[tauri::command]
pub fn stop_bongo() {
    unsafe {
        STOP = true;
    }
}

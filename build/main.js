"use strict";
// github copilot shenanigans
// Language: typescript
// Path: src\main.ts
function toggle_theme() {
    document.body.classList.toggle("dark");
    var darkMode = localStorage.getItem('darkMode');
    switch (darkMode) {
        case "true":
            localStorage.setItem('darkMode', 'false');
        case "false":
            localStorage.setItem('darkMode', 'true');
    }
}
function set_theme() {
    var darkMode = localStorage.getItem('darkMode');
    switch (darkMode) {
        case "true":
            document.body.classList.toggle("dark");
        case "false":
            console.log("User prefers light mode");
        case undefined:
            localStorage.setItem('darkMode', 'false');
    }
}

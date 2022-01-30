"use strict";
// github copilot shenanigans
// Language: typescript
// Path: src\main.ts
function toggle_theme() {
    document.body.classList.toggle("dark");
    var darkMode = localStorage.getItem('darkMode');
    if (darkMode == 'true') {
        localStorage.setItem('darkMode', 'false');
    }
    else {
        localStorage.setItem('darkMode', 'true');
    }
}
function set_theme() {
    var darkMode = localStorage.getItem('darkMode');
    localStorage.setItem('darkMode', 'false');
    switch (darkMode) {
        case "true":
            console.log("User prefers dark mode");
            document.body.classList.toggle("dark");
            break;
        case "false":
            console.log("User prefers light mode");
            break;
        default:
            localStorage.setItem('darkMode', 'false');
            console.log("New user");
            break;
    }
}
set_theme();
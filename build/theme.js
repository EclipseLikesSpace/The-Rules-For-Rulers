"use strict";
// github copilot shenanigans!!
// Language: typescript
// Path: src\main.ts
function toggle_theme() {
    const darkModeBtn = document.getElementById('dark-mode');
    const darkMode = localStorage.getItem('darkMode');
    const moon = document.getElementById("moon");
    const sun = document.getElementById("sun");
    document.body.classList.toggle("dark");
    darkModeBtn.classList.toggle("dark");
    if (darkMode == 'true') {
        moon.style.display = "block";
        sun.style.display = "none";
        localStorage.setItem('darkMode', 'false');
    }
    else {
        moon.style.display = "none";
        sun.style.display = "block";
        localStorage.setItem('darkMode', 'true');
    }
}
function set_theme() {
    const darkMode = localStorage.getItem('darkMode');
    const darkModeBtn = document.getElementById('dark-mode');
    switch (darkMode) {
        case "true":
            console.log("User prefers dark mode");
            document.body.classList.toggle("dark");
            darkModeBtn.classList.toggle("dark");
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

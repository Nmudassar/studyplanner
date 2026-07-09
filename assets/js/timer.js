// Get saved focus time from Pomodoro settings page
const savedFocusTime = localStorage.getItem("focusTime");

// If user saved a time, use it. Otherwise use 25 minutes
let totalSeconds = savedFocusTime ? Number(savedFocusTime) * 60 : 25 * 60;

let timer = totalSeconds;
let interval = null;

// Get HTML elements
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

/*=======2 – Create timer display function=======*/
// Display timer on screen
function updateDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Show saved time when dashboard loads
updateDisplay();
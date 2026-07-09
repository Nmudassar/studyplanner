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


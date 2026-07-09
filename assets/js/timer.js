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

/*=======3 – Add Start / Pause functionality=======*/
// Start / Pause timer
startBtn.addEventListener("click", function () {

    if (interval) {

        clearInterval(interval);
        interval = null;

        startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

        return;
    }

    startBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

    interval = setInterval(function () {

        timer--;

        updateDisplay();

        if (timer <= 0) {

            clearInterval(interval);
            interval = null;

            alert("Focus session completed!");

            timer = totalSeconds;

            updateDisplay();

            startBtn.innerHTML =
                '<i class="fa-solid fa-play"></i>';

        }

    }, 1000);

});
/*=======4 – Add Reset functionality=======*/
// Reset timer
resetBtn.addEventListener("click", function () {
    clearInterval(interval);
    interval = null;

    timer = totalSeconds;
    updateDisplay();

    startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
});
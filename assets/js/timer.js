// Timer duration (25 minutes)
let totalSeconds = 25 * 60;

let timer = totalSeconds;
let interval = null;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

// Display timer
function updateDisplay() {

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

updateDisplay();


// Start / Pause
startBtn.addEventListener("click", function(){

    if(interval){

        clearInterval(interval);
        interval = null;

        startBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

        return;
    }

    startBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    interval = setInterval(function(){

        timer--;

        updateDisplay();

        if(timer <= 0){

            clearInterval(interval);

            interval = null;

            alert("Focus session completed!");

            startBtn.innerHTML =
            '<i class="fa-solid fa-play"></i>';
        }

    },1000);

});


// Reset timer
resetBtn.addEventListener("click",function(){

    clearInterval(interval);

    interval = null;

    timer = totalSeconds;

    updateDisplay();

    startBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

});
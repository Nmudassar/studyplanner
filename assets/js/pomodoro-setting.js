const savePomodoro = document.getElementById("savePomodoro");

savePomodoro.addEventListener("click", function () {
    const focusTime = document.getElementById("focusTime").value;

    localStorage.setItem("focusTime", focusTime);

    window.location.href = "02-dashboard.html";
});
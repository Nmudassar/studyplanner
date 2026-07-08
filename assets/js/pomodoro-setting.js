const savePomodoro = document.getElementById("savePomodoro");
savepomodoro.addEventListener("click", function() {
    const focusTime = document.getElementById ("focusTime").value;
    localStorage.setItem("focusTime", focusTime);

    window.location.href = "02-dashboard.html";
});

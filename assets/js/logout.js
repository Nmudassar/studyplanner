const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    // Remove saved login information (if used)
    localStorage.removeItem("studySmartUser");

    // Or clear everything (optional)
    // localStorage.clear();

    // Redirect to home page
    window.location.href = "index.html";
  });
}

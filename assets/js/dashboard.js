// Function to show or hide the Activities submenu
function toggleActivities(event) {

    // Prevents the link (<a>) from opening its default page
    event.preventDefault();

    // Finds the HTML element with the id "activitiesMenu"
    const menu = document.getElementById("activitiesMenu");

    // Adds the "show" class if it doesn't exist,
    // or removes it if it already exists
    menu.classList.toggle("show");
}





const settingsBtn = document.getElementById("settingsBtn");

settingsBtn.addEventListener("click", function () {
    window.location.href = "11-pomodoro-settings.html";
});


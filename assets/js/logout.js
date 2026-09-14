"use strict";

/*
 * StudySmart logout functionality.
 * Clears the login state and returns the user to the homepage.
 */

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";
  });
}

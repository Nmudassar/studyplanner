"use strict";

/* ==========================================
   Authentication Guard
   Protects member-only pages
========================================== */

const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn !== "true") {
  window.location.href = "01-login.html?mode=login";
}

"use strict";

/* ==================================================
   Get HTML Elements
================================================== */

const signupBtn = document.getElementById("signupBtn");

const loginBtn = document.getElementById("loginBtn");

const resetPassword = document.getElementById("resetPassword");

const firstnameInput = document.getElementById("firstname-input");

const emailInput = document.getElementById("email-input");

const passwordInput = document.getElementById("password-input");

const repeatPasswordInput = document.getElementById("repeat-password-input");
/* ==================================================
   Register New User
================================================== */

signupBtn.addEventListener("click", function () {
  const firstname = firstnameInput.value.trim();

  const email = emailInput.value.trim();

  const password = passwordInput.value.trim();

  const repeatPassword = repeatPasswordInput.value.trim();

  // Check empty fields

  if (
    firstname === "" ||
    email === "" ||
    password === "" ||
    repeatPassword === ""
  ) {
    alert("Please complete all fields");

    return;
  }

  // Check password match

  if (password !== repeatPassword) {
    alert("Passwords do not match");

    return;
  }

  const user = {
    firstname: firstname,

    email: email,

    password: password,
  };

  localStorage.setItem("studySmartUser", JSON.stringify(user));

  alert("Account created successfully");
});

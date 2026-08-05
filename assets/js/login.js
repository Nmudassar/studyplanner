"use strict";

/* ==================================================
   Find Page Elements
================================================== */

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const title = document.getElementById("title");

const firstnameInput = document.getElementById("firstname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repeatPasswordInput = document.getElementById("repeat-password-input");

const signupFields = document.querySelectorAll(".signup-field");

/* ==================================================
   Reset Password Elements
================================================== */

const resetPassword = document.getElementById("resetPassword");
const resetDialog = document.getElementById("resetDialog");
const resetEmail = document.getElementById("resetEmail");
const sendResetBtn = document.getElementById("sendResetBtn");
const closeResetBtn = document.getElementById("closeResetBtn");

/* ==================================================
   Current Form Mode
================================================== */

let loginMode = false;

/* ==================================================
   Sign Up
================================================== */

signupBtn.addEventListener("click", function () {
  if (loginMode) {
    loginMode = false;

    signupFields.forEach(function (field) {
      field.style.display = "flex";
    });

    title.textContent = "Sign Up";

    signupBtn.classList.remove("disable");
    loginBtn.classList.add("disable");

    clearInputs();

    return;
  }

  const firstname = firstnameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const repeatPassword = repeatPasswordInput.value.trim();

  if (
    firstname === "" ||
    email === "" ||
    password === "" ||
    repeatPassword === ""
  ) {
    alert("Please complete all fields.");
    return;
  }

  if (password !== repeatPassword) {
    alert("Passwords do not match.");
    return;
  }

  const user = {
    firstname: firstname,
    email: email,
    password: password,
  };

  localStorage.setItem("studySmartUser", JSON.stringify(user));

  alert("Account created successfully.");

  clearInputs();
});

/* ==================================================
   Login
================================================== */

loginBtn.addEventListener("click", function () {
  if (!loginMode) {
    loginMode = true;

    signupFields.forEach(function (field) {
      field.style.display = "none";
    });

    title.textContent = "Login";

    loginBtn.classList.remove("disable");
    signupBtn.classList.add("disable");

    clearInputs();

    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === "" || password === "") {
    alert("Please enter your email and password.");

    return;
  }

  const savedUser = localStorage.getItem("studySmartUser");

  if (!savedUser) {
    alert("No account found. Please sign up first.");

    return;
  }

  const user = JSON.parse(savedUser);

  if (email === user.email && password === user.password) {
    alert("Welcome " + user.firstname + "!");

    localStorage.setItem("loggedIn", "true");

    window.location.href = "02-dashboard.html";
  } else {
    alert("Incorrect email or password.");
  }
});

/* ==================================================
   Open Reset Password Dialog
================================================== */

resetPassword.addEventListener("click", function (event) {
  event.preventDefault();

  resetEmail.value = "";

  resetDialog.showModal();
});

/* ==================================================
   Close Dialog
================================================== */

closeResetBtn.addEventListener("click", function () {
  resetDialog.close();
});

/* ==================================================
   Reset Password
================================================== */

sendResetBtn.addEventListener("click", function () {
  const email = resetEmail.value.trim();

  if (email === "") {
    alert("Please enter your email.");

    return;
  }

  const savedUser = localStorage.getItem("studySmartUser");

  if (!savedUser) {
    alert("No account found.");

    return;
  }

  const user = JSON.parse(savedUser);

  if (email === user.email) {
    alert("Password reset email would be sent to:\n\n" + email);

    resetDialog.close();
  } else {
    alert("Email address not registered.");
  }
});

/* ==================================================
   Clear Inputs
================================================== */

function clearInputs() {
  firstnameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  repeatPasswordInput.value = "";
}

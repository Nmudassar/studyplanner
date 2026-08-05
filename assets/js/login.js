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

let currentMode = "signup";

/* ==================================================
   Show Sign Up Form
================================================== */

function showSignupForm() {
  currentMode = "signup";

  signupFields.forEach(function (field) {
    field.style.display = "flex";
  });

  title.textContent = "Sign Up";

  signupBtn.classList.remove("disable");
  loginBtn.classList.add("disable");

  clearInputs();
}

/* ==================================================
   Show Login Form
================================================== */

function showLoginForm() {
  currentMode = "login";

  signupFields.forEach(function (field) {
    field.style.display = "none";
  });

  title.textContent = "Login";

  loginBtn.classList.remove("disable");
  signupBtn.classList.add("disable");

  clearInputs();
}

/* ==================================================
   Open Correct Form From Homepage
================================================== */

function loadSelectedForm() {
  const parameters = new URLSearchParams(window.location.search);
  const selectedMode = parameters.get("mode");

  if (selectedMode === "login") {
    showLoginForm();
  } else {
    showSignupForm();
  }
}

/* ==================================================
   Sign Up Button
================================================== */

signupBtn.addEventListener("click", function () {
  if (currentMode !== "signup") {
    showSignupForm();
    return;
  }

  createAccount();
});

/* ==================================================
   Create Account
================================================== */

function createAccount() {
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

  if (!emailInput.checkValidity()) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
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

  localStorage.setItem("loggedIn", "true");

  alert("Account created successfully.");

  window.location.href = "02-dashboard.html";
}

/* ==================================================
   Login Button
================================================== */

loginBtn.addEventListener("click", function () {
  if (currentMode !== "login") {
    showLoginForm();
    return;
  }

  loginUser();
});

/* ==================================================
   Login User
================================================== */

function loginUser() {
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

  try {
    const user = JSON.parse(savedUser);

    if (email === user.email && password === user.password) {
      localStorage.setItem("loggedIn", "true");

      alert("Welcome " + user.firstname + "!");

      window.location.href = "02-dashboard.html";
    } else {
      alert("Incorrect email or password.");
    }
  } catch (error) {
    console.error("Unable to read account:", error);

    alert("There was a problem reading your account.");
  }
}

/* ==================================================
   Open Reset Password Dialog
================================================== */

resetPassword.addEventListener("click", function (event) {
  event.preventDefault();

  resetEmail.value = "";

  resetDialog.showModal();
});

/* ==================================================
   Close Reset Password Dialog
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

  try {
    const user = JSON.parse(savedUser);

    if (email === user.email) {
      alert("Password reset email would be sent to:\n\n" + email);

      resetDialog.close();
    } else {
      alert("Email address not registered.");
    }
  } catch (error) {
    console.error("Unable to read account:", error);

    alert("There was a problem reading your account.");
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

/* ==================================================
   Start Page
================================================== */

loadSelectedForm();

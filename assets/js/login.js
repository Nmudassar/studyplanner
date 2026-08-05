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

/* ==================================================
   User Login
================================================== */

loginBtn.addEventListener("click", function () {
  const email = emailInput.value.trim();

  const password = passwordInput.value.trim();

  // Check empty fields

  if (email === "" || password === "") {
    alert("Please enter email and password");

    return;
  }

  // Get saved user

  const savedUser = localStorage.getItem("studySmartUser");

  if (!savedUser) {
    alert("No account found. Please sign up first.");

    return;
  }

  // Convert saved data

  const user = JSON.parse(savedUser);

  // Check login details

  if (email === user.email && password === user.password) {
    alert("Welcome back " + user.firstname);

    // Save login status

    localStorage.setItem("loggedIn", "true");

    // Redirect to dashboard

    window.location.href = "02-dashboard.html";
  } else {
    alert("Incorrect email or password");
  }
});
/* ==================================================
   Switch Between Sign Up and Login Forms
================================================== */

const signupFields = document.querySelectorAll(".signup-field");

const title = document.getElementById("title");

loginBtn.addEventListener("click", function () {
  // Hide signup-only fields

  signupFields.forEach(function (field) {
    field.style.display = "none";
  });

  // Change heading

  title.textContent = "Login";

  // Change button style

  loginBtn.classList.remove("disable");

  signupBtn.classList.add("disable");
});

signupBtn.addEventListener("click", function () {
  // Show signup fields

  signupFields.forEach(function (field) {
    field.style.display = "flex";
  });

  // Change heading

  title.textContent = "Sign Up";

  // Change button style

  signupBtn.classList.remove("disable");

  loginBtn.classList.add("disable");
});

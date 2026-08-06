"use strict";

/* ==================================================
   Find Dashboard Elements
================================================== */

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const activitiesBtn = document.getElementById("activitiesBtn");
const activitiesMenu = document.getElementById("activitiesMenu");

const sidebarSearch = document.getElementById("sidebarSearch");
const settingsBtn = document.getElementById("settingsBtn");

const navigationItems = document.querySelectorAll(
  ".nav-list > .nav-item, .nav-list > .nav-dropdown",
);

const navigationLinks = document.querySelectorAll(".nav-list a");

/* ==================================================
   Open Sidebar
================================================== */

function openSidebar() {
  if (!sidebar || !sidebarOverlay || !menuBtn) {
    return;
  }

  sidebar.classList.add("open");
  sidebarOverlay.classList.add("show");

  menuBtn.setAttribute("aria-expanded", "true");
  sidebarOverlay.setAttribute("aria-hidden", "false");

  document.body.classList.add("menu-open");
}

/* ==================================================
   Close Sidebar
================================================== */

function closeSidebar() {
  if (!sidebar || !sidebarOverlay || !menuBtn) {
    return;
  }

  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("show");

  menuBtn.setAttribute("aria-expanded", "false");
  sidebarOverlay.setAttribute("aria-hidden", "true");

  document.body.classList.remove("menu-open");
}

/* ==================================================
   Toggle Sidebar
================================================== */

function toggleSidebar() {
  if (!sidebar) {
    return;
  }

  const isOpen = sidebar.classList.contains("open");

  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

/* ==================================================
   Connect Mobile Sidebar Buttons
================================================== */

if (menuBtn) {
  menuBtn.addEventListener("click", toggleSidebar);
}

if (sidebarCloseBtn) {
  sidebarCloseBtn.addEventListener("click", closeSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeSidebar);
}

/* ==================================================
   Activities Dropdown
================================================== */

if (activitiesBtn && activitiesMenu) {
  activitiesBtn.addEventListener("click", function () {
    const isOpen = activitiesMenu.classList.toggle("open");

    activitiesBtn.classList.toggle("open", isOpen);

    activitiesBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ==================================================
   Sidebar Search
================================================== */

if (sidebarSearch) {
  sidebarSearch.addEventListener("input", function () {
    const searchText = sidebarSearch.value.trim().toLowerCase();

    navigationItems.forEach(function (item) {
      const itemText = item.textContent.trim().toLowerCase();

      const matchesSearch = itemText.includes(searchText);

      item.style.display = matchesSearch ? "" : "none";
    });

    /*
      Open the Activities submenu when the search matches
      Subjects, Tasks, Analytics or Activities.
    */

    if (activitiesBtn && activitiesMenu && searchText !== "") {
      const activitiesText = activitiesMenu.textContent.trim().toLowerCase();

      const dropdownText = activitiesBtn.textContent.trim().toLowerCase();

      const matchesActivities =
        activitiesText.includes(searchText) ||
        dropdownText.includes(searchText);

      activitiesMenu.classList.toggle("open", matchesActivities);

      activitiesBtn.classList.toggle("open", matchesActivities);

      activitiesBtn.setAttribute("aria-expanded", String(matchesActivities));
    }
  });
}

/* ==================================================
   Focus Timer Settings Button
================================================== */

if (settingsBtn) {
  settingsBtn.addEventListener("click", function () {
    window.location.href = "11-pomodoro-settings.html";
  });
}

/* ==================================================
   Close Sidebar After Navigation
================================================== */

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 900) {
      closeSidebar();
    }
  });
});

/* ==================================================
   Close Sidebar With Escape Key
================================================== */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSidebar();
  }
});

/* ==================================================
   Reset Sidebar on Large Screens
================================================== */

window.addEventListener("resize", function () {
  if (window.innerWidth > 900) {
    closeSidebar();
  }
});

"use strict";

/* ==================================================
   Find Dashboard Elements
================================================== */

const sidebar = document.getElementById("sidebar");

const menuBtn = document.getElementById("menuBtn");

const sidebarOverlay = document.getElementById("sidebarOverlay");

const activitiesBtn = document.getElementById("activitiesBtn");

const activitiesMenu = document.getElementById("activitiesMenu");

const sidebarSearch = document.getElementById("sidebarSearch");

const settingsBtn = document.getElementById("settingsBtn");

const navigationItems = document.querySelectorAll(
  ".nav-list > .nav-item, .nav-dropdown",
);

const navigationLinks = document.querySelectorAll(".nav-list a");

/* ==================================================
   Open and Close Sidebar
================================================== */

function toggleSidebar() {
  if (!sidebar || !sidebarOverlay || !menuBtn) {
    return;
  }

  const isOpen = sidebar.classList.toggle("open");

  sidebarOverlay.classList.toggle("show", isOpen);

  menuBtn.setAttribute("aria-expanded", String(isOpen));

  document.body.classList.toggle("menu-open", isOpen);
}

function closeSidebar() {
  if (!sidebar || !sidebarOverlay || !menuBtn) {
    return;
  }

  sidebar.classList.remove("open");

  sidebarOverlay.classList.remove("show");

  menuBtn.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}

/* ==================================================
   Connect Mobile Menu
================================================== */

if (menuBtn) {
  menuBtn.addEventListener("click", toggleSidebar);
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

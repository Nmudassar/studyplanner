"use strict";

/* ==================================================
   Dashboard Calendar State
================================================== */

// Store the Monday currently displayed
let dashboardWeekStart = getDashboardWeekStart(new Date());

/* ==================================================
   Start Dashboard Calendar
================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initialiseDashboardCalendar();
});

function initialiseDashboardCalendar() {
  // Open the week containing the next study session
  openNextStudySessionWeek();

  // Connect navigation buttons
  connectDashboardCalendarButtons();

  // Display the calendar
  displayDashboardCalendar();
}

/* ==================================================
   Read Saved Study Sessions
================================================== */

function getDashboardCalendarSessions() {
  const savedSessions = localStorage.getItem("studySessions");

  if (!savedSessions) {
    return [];
  }

  try {
    return JSON.parse(savedSessions);
  } catch (error) {
    console.error("Could not read study sessions:", error);

    return [];
  }
}

/* ==================================================
   Open Week of Next Session
================================================== */

function openNextStudySessionWeek() {
  const sessions = getDashboardCalendarSessions();

  if (sessions.length === 0) {
    return;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const sortedSessions = [...sessions].sort(
    function (firstSession, secondSession) {
      return (
        new Date(`${firstSession.date}T00:00:00`) -
        new Date(`${secondSession.date}T00:00:00`)
      );
    },
  );

  const nextSession = sortedSessions.find(function (session) {
    const sessionDate = new Date(`${session.date}T00:00:00`);

    return sessionDate >= today;
  });

  const sessionToShow = nextSession || sortedSessions[0];

  if (sessionToShow) {
    const sessionDate = new Date(`${sessionToShow.date}T00:00:00`);

    dashboardWeekStart = getDashboardWeekStart(sessionDate);
  }
}

/* ==================================================
   Display Dashboard Calendar
================================================== */

function displayDashboardCalendar() {
  const calendar = document.getElementById("dashboardWeekCalendar");

  const emptyMessage = document.getElementById("dashboardCalendarEmpty");

  if (!calendar || !emptyMessage) {
    return;
  }

  const allSessions = getDashboardCalendarSessions();

  calendar.innerHTML = "";

  updateDashboardCalendarHeading();

  let sessionsInDisplayedWeek = 0;

  // Create Monday to Sunday
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const date = addDashboardDays(dashboardWeekStart, dayIndex);

    const dateString = formatDashboardStorageDate(date);

    const daySessions = allSessions.filter(function (session) {
      return session.date === dateString;
    });

    sessionsInDisplayedWeek += daySessions.length;

    const dayColumn = createDashboardDay(date, daySessions);

    calendar.appendChild(dayColumn);
  }

  // Always display calendar days
  calendar.hidden = false;

  // Show message only when this week is empty
  emptyMessage.hidden = sessionsInDisplayedWeek !== 0;
}

/* ==================================================
   Create Dashboard Calendar Day
================================================== */

function createDashboardDay(date, sessions) {
  const day = document.createElement("section");

  day.classList.add("dashboard-calendar-day");

  if (isDashboardToday(date)) {
    day.classList.add("today");
  }

  const heading = document.createElement("header");

  heading.innerHTML = `
    <span>
      ${date.toLocaleDateString("en-GB", {
        weekday: "short",
      })}
    </span>

    <strong>
      ${date.getDate()}
    </strong>
  `;

  day.appendChild(heading);

  const sessionList = document.createElement("div");

  sessionList.classList.add("dashboard-day-sessions");

  if (sessions.length === 0) {
    sessionList.innerHTML = `
      <span class="dashboard-no-session">
        —
      </span>
    `;
  } else {
    sessions.slice(0, 2).forEach(function (session) {
      sessionList.appendChild(createDashboardSession(session));
    });

    // Show additional session count
    if (sessions.length > 2) {
      const moreSessions = document.createElement("a");

      moreSessions.href = "07-calendar.html";

      moreSessions.classList.add("dashboard-more-sessions");

      moreSessions.textContent = `+${sessions.length - 2} more`;

      sessionList.appendChild(moreSessions);
    }
  }

  day.appendChild(sessionList);

  return day;
}

/* ==================================================
   Create Small Session Card
================================================== */

function createDashboardSession(session) {
  const card = document.createElement("a");

  card.href = "07-calendar.html";

  card.classList.add("dashboard-study-session");

  if (session.completed) {
    card.classList.add("completed");
  }

  card.innerHTML = `
    <span class="dashboard-session-time">
      ${session.startTime}
    </span>

    <strong>
      ${session.subtopicTitle}
    </strong>

    <small>
      ${session.subjectName}
      ·
      ${session.durationMinutes} mins
    </small>
  `;

  return card;
}

/* ==================================================
   Calendar Navigation
================================================== */

function connectDashboardCalendarButtons() {
  const previousButton = document.getElementById("dashboardPreviousWeek");

  const nextButton = document.getElementById("dashboardNextWeek");

  previousButton?.addEventListener("click", function () {
    dashboardWeekStart = addDashboardDays(dashboardWeekStart, -7);

    displayDashboardCalendar();
  });

  nextButton?.addEventListener("click", function () {
    dashboardWeekStart = addDashboardDays(dashboardWeekStart, 7);

    displayDashboardCalendar();
  });
}

/* ==================================================
   Update Dashboard Calendar Heading
================================================== */

function updateDashboardCalendarHeading() {
  const monthTitle = document.getElementById("dashboardCalendarMonth");

  const range = document.getElementById("dashboardCalendarRange");

  const weekEnd = addDashboardDays(dashboardWeekStart, 6);

  if (monthTitle) {
    monthTitle.textContent = dashboardWeekStart.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }

  if (range) {
    const startText = dashboardWeekStart.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    const endText = weekEnd.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    range.textContent = `${startText} – ${endText}`;
  }
}

/* ==================================================
   Date Helper Functions
================================================== */

function getDashboardWeekStart(date) {
  const result = new Date(date);

  const currentDay = result.getDay();

  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  result.setDate(result.getDate() + daysToMonday);

  result.setHours(0, 0, 0, 0);

  return result;
}

function addDashboardDays(date, numberOfDays) {
  const result = new Date(date);

  result.setDate(result.getDate() + numberOfDays);

  return result;
}

function formatDashboardStorageDate(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isDashboardToday(date) {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

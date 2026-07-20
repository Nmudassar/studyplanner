"use strict";

/* ==================================================
   Current Calendar Week
================================================== */

// Store the Monday of the week currently displayed
let currentWeekStart = getStartOfWeek(new Date());

/* ==================================================
   Start Calendar When Page Loads
================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Display the current week
  displayCalendarWeek();

  // Connect previous and next buttons
  connectCalendarButtons();
});

/* ==================================================
   Read Study Sessions from Local Storage
================================================== */

function getStudySessions() {
  // Get saved sessions
  const savedSessions = localStorage.getItem("studySessions");

  // Return an empty array if nothing is saved
  if (!savedSessions) {
    return [];
  }

  try {
    // Convert saved JSON text back into an array
    return JSON.parse(savedSessions);
  } catch (error) {
    console.error("Could not read study sessions:", error);

    return [];
  }
}

/* ==================================================
   Display One Calendar Week
================================================== */

function displayCalendarWeek() {
  // Find calendar elements in HTML
  const weekCalendar = document.getElementById("weekCalendar");

  const emptyState = document.getElementById("calendarEmptyState");

  // Stop if the calendar container is missing
  if (!weekCalendar) {
    console.error("weekCalendar was not found.");
    return;
  }

  // Read saved sessions
  const sessions = getStudySessions();

  // Clear the old calendar
  weekCalendar.innerHTML = "";

  // Update month and week text
  updateCalendarHeading();

  // Create seven days
  for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
    // Create this day's date
    const date = addDays(currentWeekStart, dayNumber);

    // Convert date to YYYY-MM-DD
    const dateString = formatStorageDate(date);

    // Find sessions scheduled for this date
    const daySessions = sessions.filter(function (session) {
      return session.date === dateString;
    });

    // Create the calendar column
    const dayColumn = createDayColumn(date, daySessions);

    // Add the column to the calendar
    weekCalendar.appendChild(dayColumn);
  }

  // The seven-day calendar should always be visible
  weekCalendar.hidden = false;

  // Show empty-plan message only when no sessions exist at all
  if (emptyState) {
    emptyState.hidden = sessions.length !== 0;
  }

  // Update summary
  updateCalendarSummary(sessions);
}

/* ==================================================
   Create One Day Column
================================================== */

function createDayColumn(date, sessions) {
  // Create the day column
  const dayColumn = document.createElement("section");

  dayColumn.classList.add("calendar-day");

  // Highlight today
  if (isToday(date)) {
    dayColumn.classList.add("today");
  }

  // Create the heading
  const dayHeading = document.createElement("header");

  dayHeading.classList.add("calendar-day-heading");

  dayHeading.innerHTML = `
    <span class="calendar-weekday">
      ${date.toLocaleDateString("en-GB", {
        weekday: "short",
      })}
    </span>

    <strong>
      ${date.getDate()}
    </strong>
  `;

  dayColumn.appendChild(dayHeading);

  // Create the sessions area
  const sessionsContainer = document.createElement("div");

  sessionsContainer.classList.add("calendar-day-sessions");

  // Show a message when this day has no sessions
  if (sessions.length === 0) {
    sessionsContainer.innerHTML = `
      <p class="no-day-sessions">
        No sessions
      </p>
    `;
  } else {
    // Create a card for every session
    sessions.forEach(function (session) {
      const sessionCard = createSessionCard(session);

      sessionsContainer.appendChild(sessionCard);
    });
  }

  dayColumn.appendChild(sessionsContainer);

  return dayColumn;
}

/* ==================================================
   Create Study Session Card
================================================== */

function createSessionCard(session) {
  const card = document.createElement("article");

  card.classList.add("study-session-card");

  if (session.completed) {
    card.classList.add("completed");
  }

  card.innerHTML = `
    <span class="session-time">
      ${session.startTime}
      ·
      ${session.durationMinutes} mins
    </span>

    <h3>
      ${session.subtopicTitle}
    </h3>

    <p>
      ${session.topicTitle}
    </p>

    <span class="session-subject">
      ${session.subjectName}
      ·
      ${session.levelName}
    </span>

    <div class="session-actions">

      <button
        type="button"
        class="complete-session-button"
        data-session-id="${session.id}"
      >
        ${session.completed ? "Completed" : "Mark Complete"}
      </button>

      <button
        type="button"
        class="delete-session-button"
        data-session-id="${session.id}"
        aria-label="Delete study session"
      >
        <i class="fa-solid fa-trash"></i>
      </button>

    </div>
  `;

  // Find buttons inside this card
  const completeButton = card.querySelector(".complete-session-button");

  const deleteButton = card.querySelector(".delete-session-button");

  // Mark complete
  completeButton.addEventListener("click", function () {
    toggleSessionComplete(session.id);
  });

  // Delete session
  deleteButton.addEventListener("click", function () {
    deleteStudySession(session.id);
  });

  return card;
}

/* ==================================================
   Mark Session Complete
================================================== */

function toggleSessionComplete(sessionId) {
  const sessions = getStudySessions();

  const updatedSessions = sessions.map(function (session) {
    if (session.id === sessionId) {
      return {
        ...session,
        completed: !session.completed,
      };
    }

    return session;
  });

  saveStudySessions(updatedSessions);

  displayCalendarWeek();
}

/* ==================================================
   Delete Session
================================================== */

function deleteStudySession(sessionId) {
  const shouldDelete = window.confirm("Delete this study session?");

  if (!shouldDelete) {
    return;
  }

  const sessions = getStudySessions();

  const updatedSessions = sessions.filter(function (session) {
    return session.id !== sessionId;
  });

  saveStudySessions(updatedSessions);

  displayCalendarWeek();
}

/* ==================================================
   Save Updated Sessions
================================================== */

function saveStudySessions(sessions) {
  localStorage.setItem("studySessions", JSON.stringify(sessions));
}

/* ==================================================
   Previous and Next Week Buttons
================================================== */

function connectCalendarButtons() {
  const previousButton = document.getElementById("previousWeekButton");

  const nextButton = document.getElementById("nextWeekButton");

  if (previousButton) {
    previousButton.addEventListener("click", function () {
      // Move seven days backwards
      currentWeekStart = addDays(currentWeekStart, -7);

      displayCalendarWeek();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      // Move seven days forwards
      currentWeekStart = addDays(currentWeekStart, 7);

      displayCalendarWeek();
    });
  }
}

/* ==================================================
   Update Calendar Heading
================================================== */

function updateCalendarHeading() {
  const monthTitle = document.getElementById("calendarMonthTitle");

  const weekRange = document.getElementById("calendarWeekRange");

  const weekEnd = addDays(currentWeekStart, 6);

  if (monthTitle) {
    monthTitle.textContent = currentWeekStart.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }

  if (weekRange) {
    const startText = currentWeekStart.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    const endText = weekEnd.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    weekRange.textContent = `${startText} – ${endText}`;
  }
}

/* ==================================================
   Update Calendar Summary
================================================== */

function updateCalendarSummary(sessions) {
  const summary = document.getElementById("calendarSummary");

  if (!summary) {
    return;
  }

  const completedSessions = sessions.filter(function (session) {
    return session.completed;
  }).length;

  const remainingSessions = sessions.length - completedSessions;

  summary.innerHTML = `
    <span>
      <strong>${sessions.length}</strong>
      sessions scheduled
    </span>

    <span>
      <strong>${completedSessions}</strong>
      completed
    </span>

    <span>
      <strong>${remainingSessions}</strong>
      remaining
    </span>
  `;
}

/* ==================================================
   Find Monday of the Week
================================================== */

function getStartOfWeek(date) {
  const result = new Date(date);

  const currentDay = result.getDay();

  // Sunday is 0, so move back six days
  // Other days move back to Monday
  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  result.setDate(result.getDate() + daysToMonday);

  result.setHours(0, 0, 0, 0);

  return result;
}

/* ==================================================
   Add Days to a Date
================================================== */

function addDays(date, numberOfDays) {
  const result = new Date(date);

  result.setDate(result.getDate() + numberOfDays);

  return result;
}

/* ==================================================
   Format Date for Local Storage
================================================== */

function formatStorageDate(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* ==================================================
   Check Whether Date Is Today
================================================== */

function isToday(date) {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
const clearAllPlansButton = document.getElementById("clearAllPlansButton");

if (clearAllPlansButton) {
  clearAllPlansButton.addEventListener("click", function () {
    const shouldClear = window.confirm("Delete all saved study plans?");

    if (!shouldClear) {
      return;
    }

    localStorage.removeItem("studySessions");

    displayCalendarWeek();
  });
}

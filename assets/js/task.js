"use strict";

/* ==================================================
   Find Tasks Page Elements
================================================== */

const taskList = document.getElementById("taskList");

const emptyTaskState = document.getElementById("emptyTaskState");

const taskSearch = document.getElementById("taskSearch");

const filterButtons = document.querySelectorAll(".filter-button");

let selectedFilter = "all";

/* ==================================================
   Read Study Sessions
================================================== */

function getStudySessions() {
  const savedSessions = localStorage.getItem("studySessions");

  if (!savedSessions) {
    return [];
  }

  try {
    const sessions = JSON.parse(savedSessions);

    if (!Array.isArray(sessions)) {
      return [];
    }

    return sessions;
  } catch (error) {
    console.error("Could not read study sessions:", error);

    return [];
  }
}

/* ==================================================
   Save Study Sessions
================================================== */

function saveStudySessions(sessions) {
  localStorage.setItem("studySessions", JSON.stringify(sessions));
}

/* ==================================================
   Normalise Session Information
================================================== */

function normaliseSession(session, index) {
  return {
    id:
      session.id ||
      session.sessionId ||
      `session-${index}-${session.date || Date.now()}`,

    subjectName:
      session.subjectName ||
      session.subject ||
      session.selectedSubject ||
      "Subject",

    levelName:
      session.levelName || session.level || session.selectedLevel || "",

    topicTitle:
      session.topicTitle ||
      session.topic ||
      session.selectedTopic ||
      "General study",

    subtopicTitle:
      session.subtopicTitle ||
      session.subtopic ||
      session.title ||
      session.selectedSubtopic ||
      session.topicTitle ||
      session.topic ||
      "Study session",

    date:
      session.date ||
      session.sessionDate ||
      session.selectedDate ||
      session.startDate ||
      "",

    startTime:
      session.startTime ||
      session.time ||
      session.selectedTime ||
      session.preferredTime ||
      "",

    durationMinutes:
      session.durationMinutes ||
      session.duration ||
      session.weeklyMinutes ||
      session.minutes ||
      "",

    completed:
      session.completed === true ||
      session.isCompleted === true ||
      session.status === "completed",

    originalSession: session,
  };
}

/* ==================================================
   Create Local Date
================================================== */

function createLocalDate(dateValue) {
  if (!dateValue) {
    return null;
  }

  if (typeof dateValue === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    const [year, month, day] = dateValue.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

/* ==================================================
   Work Out Task Status
================================================== */

function getTaskStatus(session) {
  if (session.completed === true) {
    return "completed";
  }

  const sessionDate = createLocalDate(session.date);

  if (!sessionDate) {
    return "scheduled";
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  sessionDate.setHours(0, 0, 0, 0);

  if (sessionDate < today) {
    return "pending";
  }

  return "scheduled";
}

/* ==================================================
   Format Status
================================================== */

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/* ==================================================
   Format Date
================================================== */

function formatDate(dateValue) {
  const date = createLocalDate(dateValue);

  if (!date) {
    return "No date selected";
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ==================================================
   Sort Tasks by Date
================================================== */

function sortSessionsByDate(sessions) {
  return [...sessions].sort(function (firstSession, secondSession) {
    const firstDate = createLocalDate(firstSession.date);

    const secondDate = createLocalDate(secondSession.date);

    if (!firstDate && !secondDate) {
      return 0;
    }

    if (!firstDate) {
      return 1;
    }

    if (!secondDate) {
      return -1;
    }

    return firstDate - secondDate;
  });
}

/* ==================================================
   Create Task Cards
================================================== */

function renderTasks(sessionsToDisplay) {
  if (!taskList || !emptyTaskState) {
    return;
  }

  taskList.innerHTML = "";

  if (sessionsToDisplay.length === 0) {
    emptyTaskState.style.display = "flex";
    return;
  }

  emptyTaskState.style.display = "none";

  sessionsToDisplay.forEach(function (session) {
    const status = getTaskStatus(session);

    const taskCard = document.createElement("article");

    taskCard.classList.add("task-card");

    taskCard.innerHTML = `
      <div class="task-card-left">

        <span class="task-subject">
          ${session.subjectName}
          ${session.levelName ? ` · ${session.levelName}` : ""}
        </span>

        <h3>
          ${session.subtopicTitle}
        </h3>

        <p class="task-topic">
          Topic: ${session.topicTitle}
        </p>

        ${
          session.durationMinutes
            ? `
              <p class="task-duration">
                Duration:
                ${session.durationMinutes}
                minutes
              </p>
            `
            : ""
        }

      </div>

      <div class="task-card-right">

        <p class="task-date">
          ${formatDate(session.date)}
        </p>

        ${
          session.startTime
            ? `
              <p class="task-time">
                ${session.startTime}
              </p>
            `
            : ""
        }

        <span class="task-status ${status}">
          ${formatStatus(status)}
        </span>

        ${
          status !== "completed"
            ? `
              <button
                type="button"
                class="complete-task-button"
                data-session-id="${session.id}"
              >
                Mark Complete
              </button>
            `
            : ""
        }

      </div>
    `;

    taskList.appendChild(taskCard);
  });
}

/* ==================================================
   Search and Filter Tasks
================================================== */

function filterTasks() {
  const savedSessions = getStudySessions();

  const normalisedSessions = savedSessions.map(function (session, index) {
    return normaliseSession(session, index);
  });

  const searchText = taskSearch ? taskSearch.value.toLowerCase().trim() : "";

  const filteredSessions = normalisedSessions.filter(function (session) {
    const status = getTaskStatus(session);

    const matchesFilter = selectedFilter === "all" || status === selectedFilter;

    const searchableText = `
          ${session.subjectName}
          ${session.levelName}
          ${session.topicTitle}
          ${session.subtopicTitle}
        `.toLowerCase();

    const matchesSearch = searchableText.includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const sortedSessions = sortSessionsByDate(filteredSessions);

  renderTasks(sortedSessions);
}

/* ==================================================
   Mark Task Complete
================================================== */

function markTaskComplete(sessionId) {
  const sessions = getStudySessions();

  const updatedSessions = sessions.map(function (session, index) {
    const normalisedSession = normaliseSession(session, index);

    if (String(normalisedSession.id) === String(sessionId)) {
      return {
        ...session,
        completed: true,
        isCompleted: true,
        status: "completed",
      };
    }

    return session;
  });

  saveStudySessions(updatedSessions);

  filterTasks();
}

/* ==================================================
   Complete Button Click
================================================== */

if (taskList) {
  taskList.addEventListener("click", function (event) {
    const completeButton = event.target.closest(".complete-task-button");

    if (!completeButton) {
      return;
    }

    const sessionId = completeButton.dataset.sessionId;

    markTaskComplete(sessionId);
  });
}

/* ==================================================
   Filter Buttons
================================================== */

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");

    selectedFilter = button.dataset.filter;

    filterTasks();
  });
});

/* ==================================================
   Search Tasks
================================================== */

if (taskSearch) {
  taskSearch.addEventListener("input", filterTasks);
}

/* ==================================================
   Refresh Tasks When Returning to Page
================================================== */

window.addEventListener("pageshow", filterTasks);

/* ==================================================
   Display Tasks When Page Opens
================================================== */

filterTasks();

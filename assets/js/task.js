"use strict";

function initialiseTasksPage() {
  const taskFilter = document.getElementById("taskFilter");

  renderTasks("all");

  if (taskFilter) {
    taskFilter.addEventListener("change", () => {
      renderTasks(taskFilter.value);
    });
  }
}

function renderTasks(filter) {
  const taskList = document.getElementById("taskList");

  const emptyMessage = document.getElementById("taskEmptyMessage");

  if (!taskList || !emptyMessage) {
    return;
  }

  const sessions = getFilteredSessions(filter);

  taskList.innerHTML = "";

  if (sessions.length === 0) {
    emptyMessage.hidden = false;

    return;
  }

  emptyMessage.hidden = true;

  sessions
    .sort((firstSession, secondSession) => {
      return getSessionDate(firstSession) - getSessionDate(secondSession);
    })
    .forEach((session) => {
      taskList.appendChild(createTaskCard(session));
    });
}

function getFilteredSessions(filter) {
  const sessions = getStudySessions();

  const now = new Date();

  if (filter === "completed") {
    return sessions.filter((session) => session.completed === true);
  }

  if (filter === "upcoming") {
    return sessions.filter((session) => {
      return session.completed !== true && getSessionDate(session) >= now;
    });
  }

  if (filter === "overdue") {
    return sessions.filter((session) => {
      return session.completed !== true && getSessionDate(session) < now;
    });
  }

  return sessions;
}

function createTaskCard(session) {
  const taskCard = document.createElement("article");

  taskCard.className = "study-task";

  if (session.completed) {
    taskCard.classList.add("completed");
  }

  taskCard.innerHTML = `
    <div class="study-task-content">
      <span class="task-subject">
        ${escapeHtml(session.subject)}
        ·
        ${escapeHtml(session.level)}
      </span>

      <h2>${escapeHtml(session.topic)}</h2>

      <p>
        ${formatDisplayDate(session.date)}
        at
        ${escapeHtml(session.time || "Not selected")}
      </p>

      <span class="task-duration">
        ${Number(session.duration) || 0} minutes
      </span>
    </div>

    <div class="study-task-actions">
      <button
        type="button"
        class="complete-task-button"
        data-session-id="${session.id}"
      >
        ${session.completed ? "Mark Pending" : "Mark Complete"}
      </button>

      <button
        type="button"
        class="delete-task-button"
        data-session-id="${session.id}"
      >
        Delete
      </button>
    </div>
  `;

  const completeButton = taskCard.querySelector(".complete-task-button");

  const deleteButton = taskCard.querySelector(".delete-task-button");

  completeButton.addEventListener("click", () => {
    toggleTaskComplete(session);
  });

  deleteButton.addEventListener("click", () => {
    removeTask(session.id);
  });

  return taskCard;
}

function toggleTaskComplete(session) {
  const newCompletedStatus = !session.completed;

  updateStudySession(session.id, {
    completed: newCompletedStatus,

    completedAt: newCompletedStatus ? new Date().toISOString() : null,
  });

  const selectedFilter = document.getElementById("taskFilter")?.value || "all";

  renderTasks(selectedFilter);
}

function removeTask(sessionId) {
  deleteStudySession(sessionId);

  const selectedFilter = document.getElementById("taskFilter")?.value || "all";

  renderTasks(selectedFilter);
}

function getSessionDate(session) {
  const time = session.time || "23:59";

  const date = new Date(`${session.date}T${time}`);

  return Number.isNaN(date.getTime()) ? new Date(0) : date;
}

function formatDisplayDate(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function escapeHtml(value) {
  const element = document.createElement("div");

  element.textContent = String(value ?? "");

  return element.innerHTML;
}

document.addEventListener("DOMContentLoaded", initialiseTasksPage);

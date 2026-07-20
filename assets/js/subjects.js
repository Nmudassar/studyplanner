"use strict";

/* ==================================================
   Current Student Selection
================================================== */

let selectedSubject = "";
let selectedLevel = "";

/* ==================================================
   Page Setup
================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initialiseSubjectsPage();
});

function initialiseSubjectsPage() {
  hidePopup("levelPopup");
  hidePopup("topicPopup");

  setMinimumStartDate();
  connectStudyPlanForm();
  connectSubjectSearch();
  connectAddStudyPlanButton();
}

/*==========
Login Avatar
==========*/
const loginAvatar = document.getElementById("loginAvatar");

if (loginAvatar) {
  loginAvatar.addEventListener("click", function () {
    window.location.href = "01-login.html";
  });
}

/* ==================================================
   Add Study Plan Button
================================================== */

function connectAddStudyPlanButton() {
  const addStudyPlanButton = document.getElementById("openStudyPlanPopup");

  if (!addStudyPlanButton) {
    return;
  }

  addStudyPlanButton.addEventListener("click", function () {
    const subjectGrid = document.getElementById("subjectGrid");

    if (subjectGrid) {
      subjectGrid.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    alert("Choose a subject card first, then select GCSE or A-Level.");
  });
}

/* ==================================================
   Open Level Popup
================================================== */

function openLevelBox(subjectId) {
  const subject = subjectsData[subjectId];

  if (!subject) {
    alert(`Subject "${subjectId}" was not found.`);
    return;
  }

  // Save the subject selected by the student
  selectedSubject = subjectId;

  // Clear any previously selected level
  selectedLevel = "";

  const popupTitle = document.getElementById("popupSubjectTitle");

  if (popupTitle) {
    popupTitle.textContent = `${subject.icon} ${subject.name}`;
  }

  showPopup("levelPopup");
}
/* ==================================================
   Close Level Popup
================================================== */

function closeLevelBox() {
  hidePopup("levelPopup");
}

/* ==================================================
   Select GCSE or A-Level
================================================== */

function goToTopics(levelId) {
  // Stop if no subject has been selected
  if (!selectedSubject) {
    alert("Please choose a subject first.");
    return;
  }

  // Convert the level into the same format used in subjects-data.js
  const normalisedLevel = normaliseLevel(levelId);

  // Get the chosen subject data
  const subject = subjectsData[selectedSubject];

  // Get the GCSE or A-Level data
  const levelData = subject?.levels?.[normalisedLevel];

  // Stop if the selected level does not exist
  if (!levelData) {
    console.error(
      `The level "${normalisedLevel}" was not found for ${selectedSubject}.`,
    );

    alert("This study level is currently unavailable.");
    return;
  }

  // Save the selected level
  selectedLevel = normalisedLevel;

  // Clear old planner values first
  resetTopicPlanner();

  // Add the correct topics to the dropdown
  populateTopicDropdown(levelData.topics);

  // Show the selected subject and level
  updateTopicPopupSummary(subject, levelData);

  // Close the level popup
  closeLevelBox();

  // Open the topic popup
  showPopup("topicPopup");
}
/* ==================================================
   Normalise Level Values
================================================== */

function normaliseLevel(levelId) {
  const value = String(levelId).trim().toLowerCase().replace("-", "");

  if (value === "gcse") {
    return "gcse";
  }

  if (value === "alevel" || value === "a level") {
    return "alevel";
  }

  return value;
}

/* ==================================================
   Update Topic Popup Heading
================================================== */

function updateTopicPopupSummary(subject, levelData) {
  const subjectDisplay = document.getElementById("selectedSubjectDisplay");

  const levelDisplay = document.getElementById("selectedLevelDisplay");

  if (subjectDisplay) {
    subjectDisplay.textContent = subject.name;
  }

  if (levelDisplay) {
    levelDisplay.textContent = levelData.name;
  }
}

/* ==================================================
   Populate Topic Dropdown
================================================== */

function populateTopicDropdown(topics) {
  const topicSelect = document.getElementById("topicSelect");

  if (!topicSelect) {
    return;
  }

  topicSelect.innerHTML = `
    <option value="">
      Select a topic
    </option>
  `;

  if (!Array.isArray(topics)) {
    return;
  }

  topics.forEach(function (topic) {
    const option = document.createElement("option");

    option.value = topic.id;
    option.textContent = topic.title;

    topicSelect.appendChild(option);
  });
}

/* ==================================================
   Find Selected Topic
================================================== */

function getSelectedTopic() {
  const topicSelect = document.getElementById("topicSelect");

  if (!selectedSubject || !selectedLevel || !topicSelect?.value) {
    return null;
  }

  const topics = subjectsData[selectedSubject]?.levels?.[selectedLevel]?.topics;

  if (!Array.isArray(topics)) {
    return null;
  }

  return (
    topics.find(function (topic) {
      return topic.id === topicSelect.value;
    }) || null
  );
}

/* ==================================================
   Show Topic Details and Subtopics
================================================== */

function showSelectedTopicDetails() {
  const selectedTopic = getSelectedTopic();

  const studyPlanSettings = document.getElementById("studyPlanSettings");

  const subtopicsList = document.getElementById("subtopicsList");

  const subtopicCount = document.getElementById("subtopicCount");

  const generateButton = document.getElementById("generatePlanButton");

  if (subtopicsList) {
    subtopicsList.innerHTML = "";
  }

  if (!selectedTopic) {
    if (studyPlanSettings) {
      studyPlanSettings.hidden = true;
    }

    if (subtopicCount) {
      subtopicCount.textContent = "0 topics";
    }

    if (generateButton) {
      generateButton.disabled = true;
    }

    return;
  }

  const subtopics = selectedTopic.subtopics || [];

  subtopics.forEach(function (subtopic, index) {
    const listItem = document.createElement("li");

    const subtopicTitle = getSubtopicTitle(subtopic);

    listItem.innerHTML = `
      <span class="subtopic-week">
        Week ${index + 1}
      </span>

      <span class="subtopic-name">
        ${subtopicTitle}
      </span>
    `;

    subtopicsList?.appendChild(listItem);
  });

  if (subtopicCount) {
    const label = subtopics.length === 1 ? "topic" : "topics";

    subtopicCount.textContent = `${subtopics.length} ${label}`;
  }

  if (studyPlanSettings) {
    studyPlanSettings.hidden = false;
  }

  validateStudyPlan();
}

/* ==================================================
   Support String or Object Subtopics
================================================== */

function getSubtopicTitle(subtopic) {
  if (typeof subtopic === "string") {
    return subtopic;
  }

  return subtopic?.title || "Study topic";
}

function getSubtopicId(subtopic, index) {
  if (typeof subtopic === "object" && subtopic?.id) {
    return subtopic.id;
  }

  return `subtopic-${index + 1}`;
}

/* ==================================================
   Validate Planner Form
================================================== */

function validateStudyPlan() {
  const topicValue = document.getElementById("topicSelect")?.value;

  const weeklyMinutes = document.getElementById("weeklyMinutes")?.value;

  const preferredDay = document.getElementById("preferredDay")?.value;

  const startDate = document.getElementById("planStartDate")?.value;

  const generateButton = document.getElementById("generatePlanButton");

  const formIsComplete = Boolean(
    selectedSubject &&
    selectedLevel &&
    topicValue &&
    weeklyMinutes &&
    preferredDay !== "" &&
    startDate,
  );

  if (generateButton) {
    generateButton.disabled = !formIsComplete;
  }

  return formIsComplete;
}

/* ==================================================
   Close Topic Popup
================================================== */

function closeTopicBox() {
  hidePopup("topicPopup");
  resetTopicPlanner();
}

/* ==================================================
   Return to Level Popup
================================================== */

function backToLevelPopup() {
  hidePopup("topicPopup");

  const currentSubject = selectedSubject;

  selectedLevel = "";

  resetTopicPlanner();

  if (currentSubject) {
    openLevelBox(currentSubject);
  }
}

/* ==================================================
   Reset Topic Planner Fields
================================================== */

function resetTopicPlanner() {
  const topicSelect = document.getElementById("topicSelect");

  const weeklyMinutes = document.getElementById("weeklyMinutes");

  const preferredDay = document.getElementById("preferredDay");

  const startDate = document.getElementById("planStartDate");

  const settings = document.getElementById("studyPlanSettings");

  const subtopicsList = document.getElementById("subtopicsList");

  const subtopicCount = document.getElementById("subtopicCount");

  const plannerMessage = document.getElementById("plannerMessage");

  const generateButton = document.getElementById("generatePlanButton");

  if (topicSelect) {
    topicSelect.value = "";
  }

  if (weeklyMinutes) {
    weeklyMinutes.value = "";
  }

  if (preferredDay) {
    preferredDay.value = "";
  }

  if (startDate) {
    startDate.value = "";
  }

  if (settings) {
    settings.hidden = true;
  }

  if (subtopicsList) {
    subtopicsList.innerHTML = "";
  }

  if (subtopicCount) {
    subtopicCount.textContent = "0 topics";
  }

  if (plannerMessage) {
    plannerMessage.textContent = "";
  }

  if (generateButton) {
    generateButton.disabled = true;
  }
}

/* ==================================================
   Connect Form Submission
================================================== */

function connectStudyPlanForm() {
  const studyPlanForm = document.getElementById("studyPlanForm");

  if (!studyPlanForm) {
    return;
  }

  studyPlanForm.addEventListener("submit", generateStudyPlan);
}

/* =======================
   Generate Study Plan
========================== */

function generateStudyPlan(event) {
  event.preventDefault();

  if (!validateStudyPlan()) {
    showPlannerMessage("Please complete every field.", "error");

    return;
  }

  const selectedTopic = getSelectedTopic();

  if (!selectedTopic) {
    showPlannerMessage("Please select a valid topic.", "error");

    return;
  }

  const weeklyMinutes = Number(document.getElementById("weeklyMinutes").value);

  const preferredDay = Number(document.getElementById("preferredDay").value);

  const startDateValue = document.getElementById("planStartDate").value;

  const sessions = createRotatingSessions({
    topic: selectedTopic,
    weeklyMinutes,
    preferredDay,
    startDateValue,
  });

  if (sessions.length === 0) {
    showPlannerMessage("No study sessions could be created.", "error");
    return;
  }

  saveStudySessions(sessions);

  showPlannerMessage(
    `${sessions.length} study sessions were added to your calendar and tasks.`,
    "success",
  );

  setTimeout(function () {
    window.location.href = "07-calendar.html";
  }, 800);
}

/* ==================================================
   Create Weekly Rotating Sessions
================================================== */

function createRotatingSessions({
  topic,
  weeklyMinutes,
  preferredDay,
  startDateValue,
}) {
  const subject = subjectsData[selectedSubject];

  const levelData = subject.levels[selectedLevel];

  const selectedDate = new Date(`${startDateValue}T09:00:00`);

  const firstStudyDate = findNextStudyDay(selectedDate, preferredDay);

  return topic.subtopics.map(function (subtopic, index) {
    const sessionDate = new Date(firstStudyDate);

    sessionDate.setDate(firstStudyDate.getDate() + index * 7);

    return {
      id: createSessionId(topic.id, index),

      subjectId: selectedSubject,

      subjectName: subject.name,

      levelId: selectedLevel,

      levelName: levelData.name,

      topicId: topic.id,

      topicTitle: topic.title,

      subtopicId: getSubtopicId(subtopic, index),

      subtopicTitle: getSubtopicTitle(subtopic),

      date: formatDate(sessionDate),

      startTime: "09:00",

      durationMinutes: weeklyMinutes,

      completed: false,

      type: "study-session",
    };
  });
}

/* ==================================================
   Find First Preferred Study Day
================================================== */

function findNextStudyDay(startDate, preferredDay) {
  const date = new Date(startDate);

  const currentDay = date.getDay();

  let daysToAdd = preferredDay - currentDay;

  if (daysToAdd < 0) {
    daysToAdd += 7;
  }

  date.setDate(date.getDate() + daysToAdd);

  return date;
}

/* ==================================================
   Save Sessions to localStorage
================================================== */

function saveStudySessions(newSessions) {
  let existingSessions = [];

  try {
    const savedSessions = JSON.parse(localStorage.getItem("studySessions"));

    if (Array.isArray(savedSessions)) {
      existingSessions = savedSessions;
    }
  } catch (error) {
    console.error("Could not read saved study sessions:", error);
  }

  const sessionsToAdd = Array.isArray(newSessions) ? newSessions : [];

  const allSessions = [...existingSessions, ...sessionsToAdd];

  localStorage.setItem("studySessions", JSON.stringify(allSessions));
}
/* ==================================================
   Planner Status Message
================================================== */

function showPlannerMessage(message, type) {
  const plannerMessage = document.getElementById("plannerMessage");

  if (!plannerMessage) {
    return;
  }

  plannerMessage.textContent = message;

  plannerMessage.classList.remove("success", "error");

  plannerMessage.classList.add(type);
}

/* ==================================================
   Popup Helpers
================================================== */

function showPopup(popupId) {
  const popup = document.getElementById(popupId);

  if (!popup) {
    return;
  }

  popup.style.display = "flex";

  document.body.classList.add("popup-open");
}

function hidePopup(popupId) {
  const popup = document.getElementById(popupId);

  if (!popup) {
    return;
  }

  popup.style.display = "none";

  const levelPopup = document.getElementById("levelPopup");

  const topicPopup = document.getElementById("topicPopup");

  const levelIsOpen = levelPopup?.style.display === "flex";

  const topicIsOpen = topicPopup?.style.display === "flex";

  if (!levelIsOpen && !topicIsOpen) {
    document.body.classList.remove("popup-open");
  }
}

/* ==================================================
   Minimum Start Date
================================================== */

function setMinimumStartDate() {
  const dateInput = document.getElementById("planStartDate");

  if (!dateInput) {
    return;
  }

  dateInput.min = formatDate(new Date());
}

/* ==================================================
   Date Formatting
================================================== */

function formatDate(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* ==================================================
   Unique Session ID
================================================== */

function createSessionId(topicId, index) {
  const randomPart = Math.random().toString(36).slice(2, 8);

  return [topicId, Date.now(), index, randomPart].join("-");
}

/* ==================================================
   Subject Search
================================================== */

function connectSubjectSearch() {
  const searchInput = document.getElementById("subjectSearch");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", filterSubjectCards);
}

function filterSubjectCards(event) {
  const searchValue = event.target.value.trim().toLowerCase();

  const subjectCards = document.querySelectorAll(".subject-card");

  subjectCards.forEach(function (card) {
    const cardText = card.textContent.toLowerCase();

    const matchesSearch = cardText.includes(searchValue);

    card.style.display = matchesSearch ? "" : "none";
  });
}

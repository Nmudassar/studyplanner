"use strict"; //This tells JavaScript to use stricter error checking.//

/* ==================================================
   Current Student Selection
================================================== */

let selectedSubject = ""; //This variable stores the subject chosen by the student.//
let selectedLevel = ""; //This variable stores the level chosen by the student. It also starts empty because the student has not chosen a level yet.//

/* ==========================================
   Page Setup
========================================== */

// Wait until the whole HTML page has loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set up the page
  initialiseSubjectsPage();
});

// This function prepares the page
function initialiseSubjectsPage() {
  // Hide the level popup
  hidePopup("levelPopup");

  // Hide the topic popup
  hidePopup("topicPopup");

  // Set today's date as the minimum date
  setMinimumStartDate();

  // Connect the study plan form
  connectStudyPlanForm();

  // Enable the search box
  connectSubjectSearch();

  // Enable the Add Study Plan button
  connectAddStudyPlanButton();
}

/* ==========================================
3- Add Study Plan Button
========================================== */

function connectAddStudyPlanButton() {
  // find the study plan button
  const addStudyPlanButton = document.getElementById("openStudyPlanPopup");
  //if it dose not exist, stop the function
  if (!studyPlanButton) {
    return;
  }
  //wait for the user to click the button
  button.addEventListener("click", function () {
    //find the subject card
    const subjectGrid = document.getElementById("subjectGrid");

    //scroll down to the card
    if (subjectGrid) {
      subjectGrid.scrollIntoView({
        behavior: "smooth",
      });
    }
    // Tell the student what to do
    alert("Choose a subject first.");
  });
}

/* ==========================================
   4- Open Level Popup
========================================== */

function openLevelBox(subjectId) {
  // Get the selected subject
  const subject = subjectsData[subjectId];

  // If the subject doesn't exist
  if (!subject) {
    alert("Subject not found.");

    return;
  }

  // Save the selected subject
  selectedSubject = subjectId;

  // Reset the level
  selectedLevel = "";

  // Show the subject name
  document.getElementById("popupSubjectTitle").textContent = subject.name;

  // Open the popup
  showPopup("levelPopup");
}

/* ==========================================
   5-Close Level Popup
========================================== */

// This function closes the GCSE/A-Level popup
function closeLevelBox() {
  // Hide the level popup
  hidePopup("levelPopup");
}

/* ==========================================
   6- Choose GCSE or A-Level
========================================== */

// Runs when the student chooses GCSE or A-Level
function goToTopics(levelId) {
  // Make sure a subject has already been selected
  if (!selectedSubject) {
    alert("Please choose a subject first.");

    return;
  }

  // Save the selected level
  selectedLevel = levelId;

  // Get the selected subject data
  const subject = subjectsData[selectedSubject];

  // Get the selected level data
  const levelData = subject.levels[selectedLevel];

  // Check that the level exists
  if (!levelData) {
    alert("This study level is not available.");

    return;
  }

  // Show the selected subject and level
  updateTopicPopupSummary(subject, levelData);

  // Add the correct topics to the dropdown
  populateTopicDropdown(levelData.topics);

  // Reset any old planner values
  resetTopicPlanner();

  // Close the level popup
  closeLevelBox();

  // Open the topic popup
  showPopup("topicPopup");
}

/* ==========================================
   07- Update Topic Popup Summary
========================================== */

// Shows the selected subject and level
// at the top of the topic popup
function updateTopicPopupSummary(subject, levelData) {
  // Find where the subject name should appear
  const subjectDisplay = document.getElementById("selectedSubjectDisplay");

  // Find where the level name should appear
  const levelDisplay = document.getElementById("selectedLevelDisplay");

  // Show the selected subject
  if (subjectDisplay) {
    subjectDisplay.textContent = subject.name;
  }

  // Show the selected level
  if (levelDisplay) {
    levelDisplay.textContent = levelData.name;
  }
}

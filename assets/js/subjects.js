// Stores the subject selected by the student
let selectedSubject = "";

// Opens the GCSE/A-Level popup
function openLevelBox(subject) {
  selectedSubject = subject;

  const popup = document.getElementById("levelPopup");
  const popupTitle = document.getElementById("popupSubjectTitle");

  if (!popup || !popupTitle) {
    console.error("The popup or popup title could not be found.");
    return;
  }

  // Makes the first letter uppercase
  const formattedSubject =
    subject.charAt(0).toUpperCase() + subject.slice(1);

  popupTitle.textContent = `Choose level for ${formattedSubject}`;
  popup.style.display = "flex";
}

// Closes the popup
function closeLevelBox() {
  const popup = document.getElementById("levelPopup");

  if (popup) {
    popup.style.display = "none";
  }
}

// Opens the topics page with the selected subject and level
function goToTopics(level) {
  if (!selectedSubject) {
    alert("Please select a subject first.");
    return;
  }

  window.location.href =
    `04-subject-details.html?subject=${encodeURIComponent(selectedSubject)}&level=${encodeURIComponent(level)}`;
}
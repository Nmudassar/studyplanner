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
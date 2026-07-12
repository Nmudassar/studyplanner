/*----Local Storage----*/
const STUDY_SESSION_KEY = "studySessions";

/*----load study Sessions---*/

function getStudySessions() {
  const saveData = localStorage.getItem(STUDY_SESSION_KEY);

  if (!saveData) {
    return [];

    return JSON.parse(saveData);
  }
}

/*==============
save Study Session
===============*/
function saveStudySessions(sessions) {
  localStorage.setItem(STUDY_SESSION_KEY, JSON.stringify(sessions));
}

/*================
Add one Session
=================*/
function addstudySession(session) {
  const sessions = getStudySessions();
  session.push(sessions);
}
/* ==========================================
   Delete All Sessions 
========================================== */

function clearStudySessions() {
  localStorage.removeItem(STUDY_SESSIONS_KEY);
}

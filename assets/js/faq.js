"use strict";

/* ==================================================
   Find FAQ Elements
================================================== */

const faqItems = document.querySelectorAll(".faq-item");

const faqSearch = document.getElementById("faqSearch");

const faqEmptyState = document.getElementById("faqEmptyState");
/* ==================================================
   Open and Close FAQ Answers
================================================== */

faqItems.forEach(function (faqItem) {
  const questionButton = faqItem.querySelector(".faq-question");

  const answer = faqItem.querySelector(".faq-answer");

  if (!questionButton || !answer) {
    return;
  }

  questionButton.addEventListener("click", function () {
    const isOpen = questionButton.getAttribute("aria-expanded") === "true";

    closeAllFaqItems();

    if (!isOpen) {
      faqItem.classList.add("open");

      questionButton.setAttribute("aria-expanded", "true");

      answer.hidden = false;
    }
  });
});

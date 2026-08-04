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
/* ==================================================
   Close All FAQ Items
================================================== */

function closeAllFaqItems() {
  faqItems.forEach(function (faqItem) {
    const questionButton = faqItem.querySelector(".faq-question");

    const answer = faqItem.querySelector(".faq-answer");

    faqItem.classList.remove("open");

    if (questionButton) {
      questionButton.setAttribute("aria-expanded", "false");
    }

    if (answer) {
      answer.hidden = true;
    }
  });
}
/* ==================================================
   Search FAQ Questions and Answers
================================================== */

function filterFaqItems() {
  const searchText = faqSearch ? faqSearch.value.trim().toLowerCase() : "";

  let visibleItems = 0;

  faqItems.forEach(function (faqItem) {
    const itemText = faqItem.textContent.toLowerCase();

    const matchesSearch = itemText.includes(searchText);

    faqItem.style.display = matchesSearch ? "" : "none";

    if (matchesSearch) {
      visibleItems += 1;
    }
  });

  if (faqEmptyState) {
    faqEmptyState.hidden = visibleItems !== 0;
  }
}

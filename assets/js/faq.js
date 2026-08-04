"use strict";
console.log("FAQ JS loaded");
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

  const icon = questionButton.querySelector("i");

  if (!questionButton || !answer) {
    return;
  }

  questionButton.addEventListener("click", function () {
    const isOpen = questionButton.getAttribute("aria-expanded") === "true";

    // Close all FAQ items first
    closeAllFaqItems();

    // Open selected FAQ item
    if (!isOpen) {
      faqItem.classList.add("open");

      questionButton.setAttribute("aria-expanded", "true");

      answer.hidden = false;

      // Change arrow icon
      if (icon) {
        icon.classList.remove("fa-chevron-down");

        icon.classList.add("fa-chevron-up");
      }
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

    const icon = faqItem.querySelector(".faq-question i");

    faqItem.classList.remove("open");

    if (questionButton) {
      questionButton.setAttribute("aria-expanded", "false");
    }

    if (answer) {
      answer.hidden = true;
    }

    // Reset arrow icon
    if (icon) {
      icon.classList.remove("fa-chevron-up");

      icon.classList.add("fa-chevron-down");
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

/* ==================================================
   Connect FAQ Search
================================================== */

if (faqSearch) {
  faqSearch.addEventListener("input", filterFaqItems);
}

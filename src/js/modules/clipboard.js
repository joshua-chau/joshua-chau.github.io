/**
 * Initializes clipboard copying functionality for specific elements.
 * Currently configured to copy the predefined email address when .copy-email-btn is clicked.
 */
import { CONTACT_EMAIL } from "./constants.js";

export function initClipboard() {
  const copyEmailBtns = document.querySelectorAll(".copy-email-btn");
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = btn.dataset.email || CONTACT_EMAIL;

      navigator.clipboard
        .writeText(email)
        .then(() => {
          const textSpan = btn.querySelector(".email-text");
          if (!textSpan) return;
          const originalText = textSpan.textContent;
          textSpan.textContent = "Copied!";
          btn.style.color = "var(--sidebar-link-hover)";

          setTimeout(() => {
            textSpan.textContent = originalText;
            btn.style.color = "";
          }, 2000);
        })
        .catch((err) => {
          console.warn("[clipboard] Failed to copy to clipboard:", err);
        });
    });
  });
}

/**
 * Initializes theme toggling functionality (Light, Dark, Eye-protection).
 * Saves user preference to localStorage and updates DOM classes and ARIA labels.
 */
import { THEME_CYCLE, THEME_STORAGE_KEY } from "./constants.js";

/** Map each theme to its button label and icon. */
const THEME_UI = {
  light:          { nextLabel: "Dark mode",       icon: "🌙" },
  dark:           { nextLabel: "Eye protection",  icon: "🍃" },
  "eye-protection": { nextLabel: "Light mode",    icon: "☀️" },
};

export function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      const iconEl = themeToggle.querySelector(".nav-icon");
      const labelEl = themeToggle.querySelector(".nav-label");

      const ui = THEME_UI[theme] || THEME_UI.light;
      const switchText = `Switch to ${ui.nextLabel.toLowerCase()}`;
      themeToggle.title = switchText;
      themeToggle.setAttribute("aria-label", switchText);

      if (iconEl) iconEl.textContent = ui.icon;
      if (labelEl) labelEl.textContent = ui.nextLabel;
    }
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const idx = THEME_CYCLE.indexOf(current);
      const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
      localStorage.setItem(THEME_STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  // Listen for OS theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}

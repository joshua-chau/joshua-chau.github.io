export function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
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

      let nextLabel, iconText;
      if (theme === "light") {
        nextLabel = "Dark mode";
        iconText = "🌙";
      } else if (theme === "dark") {
        nextLabel = "Eye protection";
        iconText = "🍃";
      } else {
        nextLabel = "Light mode";
        iconText = "☀️";
      }

      const switchText = `Switch to ${nextLabel.toLowerCase()}`;
      themeToggle.title = switchText;
      themeToggle.setAttribute("aria-label", switchText);

      if (iconEl) iconEl.textContent = iconText;
      if (labelEl) labelEl.textContent = nextLabel;
    }
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      let next;
      if (current === "light") {
        next = "dark";
      } else if (current === "dark") {
        next = "eye-protection";
      } else {
        next = "light";
      }
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  // Listen for OS theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}

/**
 * Converts a string into a URL-friendly slug.
 * @param {string} text - The string to slugify.
 * @returns {string} The slugified string.
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-–—]/g, "")
    .replace(/\s+/g, "-")
    .replace(/\-+/g, "-")
    .trim();
}

/**
 * Updates the footer copyright year to the current calendar year.
 */
export function updateYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

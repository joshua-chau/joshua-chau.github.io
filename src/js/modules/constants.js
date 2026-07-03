/**
 * Shared application constants.
 *
 * Centralizes magic values, breakpoints, storage keys, and API configuration
 * so they can be maintained and tested from a single location.
 *
 * @module constants
 */

// ── Layout ───────────────────────────────────────────────────────────────

/** Breakpoint (px) at or below which the layout switches to mobile. Matches CSS media queries. */
export const MOBILE_BREAKPOINT = 768;

// ── Storage Keys ─────────────────────────────────────────────────────────

/** localStorage key for persisted theme preference. */
export const THEME_STORAGE_KEY = "theme";

/** localStorage key for sidebar expanded/collapsed state. */
export const SIDEBAR_STORAGE_KEY = "sidebar-expanded";

// ── Contact / API ────────────────────────────────────────────────────────

/** Web3Forms submission endpoint. */
export const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/** Default email address used by the clipboard copy button. */
export const CONTACT_EMAIL = "joshuatt.chau@mail.utoronto.ca";

// ── Theme ────────────────────────────────────────────────────────────────

/**
 * Ordered cycle of theme names. The toggle advances through this list and
 * wraps back to the first entry.
 */
export const THEME_CYCLE = ["light", "dark", "eye-protection"];

// ── Journey Map ──────────────────────────────────────────────────────────

/** OpenStreetMap tile layer URL template used by Leaflet. */
export const TILE_LAYER_URL =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

/** Attribution string required by OpenStreetMap. */
export const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

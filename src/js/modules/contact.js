/**
 * Contact form module.
 *
 * Initializes the mock-chat contact form and submits messages via the
 * Web3Forms API. The access key is read from a Vite environment variable
 * (`VITE_WEB3FORMS_KEY`) with a hardcoded fallback for development.
 *
 * @module contact
 */
import { WEB3FORMS_URL } from "./constants.js";

// ── Configuration ────────────────────────────────────────────────────────

/**
 * Resolve the Web3Forms access key.
 * Prefers the Vite env var so the key can be rotated without code changes.
 * Falls back to the original key for local development.
 *
 * NOTE: Web3Forms access keys are designed to be public-facing (they only
 * allow *sending* to your inbox, not reading), but keeping them out of
 * source makes rotation and per-environment overrides trivial.
 */
const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || "6429eb6f-f7d0-431a-9703-053d00247019";

const LOG_PREFIX = "[contact]";

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Initializes the mock chat contact form.
 * Connects to Web3Forms API to securely submit messages without exposing
 * email addresses on the client side.
 */
export function initContact() {
  const sendBtn = document.getElementById("mockChatSendBtn");
  const input = document.getElementById("mockChatInput");
  const contactInput = document.getElementById("mockChatContact");

  if (!sendBtn || !input) return;

  sendBtn.addEventListener("click", () => {
    const message = input.value.trim();
    if (!message) {
      // Small visual feedback if empty
      input.style.border = "1px solid #ef4444";
      setTimeout(() => {
        input.style.border = "none";
      }, 1000);
      return;
    }

    const contactInfo = contactInput ? contactInput.value.trim() : "";
    const finalMessage = contactInfo
      ? `Contact Info: ${contactInfo}\n\nMessage:\n${message}`
      : message;

    // Send via Web3Forms API
    sendBtn.disabled = true;
    const originalContent = sendBtn.innerHTML;
    sendBtn.innerHTML = `Sending...`;

    submitContactForm(finalMessage, WEB3FORMS_KEY)
      .then((success) => {
        if (success) {
          input.value = "";
          if (contactInput) contactInput.value = "";
          sendBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Sent Successfully!
          `;
        } else {
          sendBtn.innerHTML = "Error, please try again";
        }
      })
      .catch(() => {
        sendBtn.innerHTML = "Error, please try again";
      })
      .finally(() => {
        setTimeout(() => {
          sendBtn.innerHTML = originalContent;
          sendBtn.disabled = false;
        }, 3000);
      });
  });
}

// ── Core Logic ───────────────────────────────────────────────────────────

/**
 * Submits a contact form message via the Web3Forms API.
 *
 * This function is intentionally decoupled from the DOM so it can be
 * unit-tested independently.
 *
 * @param {string}  message  - The message body to send.
 * @param {string}  apiKey   - Web3Forms access key.
 * @param {string}  [url]    - Override the submission endpoint (useful for tests).
 * @returns {Promise<boolean>} Resolves to `true` on success, `false` otherwise.
 */
export async function submitContactForm(
  message,
  apiKey,
  url = WEB3FORMS_URL,
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: apiKey,
        subject: "New Message from Joshua Chau's Website",
        message,
      }),
    });

    if (!response.ok) {
      console.warn(
        `${LOG_PREFIX} Submission failed with status ${response.status}`,
      );
      return false;
    }

    console.info(`${LOG_PREFIX} Message sent successfully.`);
    return true;
  } catch (error) {
    console.error(`${LOG_PREFIX} Network error:`, error);
    throw error;
  }
}

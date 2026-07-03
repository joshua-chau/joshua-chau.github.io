import { initSidebar } from "./modules/sidebar.js";
import { initTheme } from "./modules/theme.js";
import { initJournal } from "./modules/journal.js";
import { initAnimations } from "./modules/animations.js";
import { initClipboard } from "./modules/clipboard.js";
import { updateYear } from "./modules/utils.js";
import { initContact } from "./modules/contact.js";
import { initNodeGraph } from "./modules/node-graph.js";

const LOG_PREFIX = "[main]";

/**
 * Registry of module initializers. Each entry is tried independently so a
 * single failure doesn't prevent the rest of the page from working.
 */
const modules = [
  { name: "sidebar",    init: initSidebar },
  { name: "theme",      init: initTheme },
  { name: "journal",    init: initJournal },
  { name: "animations", init: initAnimations },
  { name: "clipboard",  init: initClipboard },
  { name: "year",       init: updateYear },
  { name: "contact",    init: initContact },
  { name: "node-graph", init: initNodeGraph },
];

document.addEventListener("DOMContentLoaded", () => {
  modules.forEach(({ name, init }) => {
    try {
      init();
    } catch (err) {
      console.error(`${LOG_PREFIX} Failed to initialize "${name}":`, err);
    }
  });
});

/**
 * Journey Map module.
 *
 * Renders an interactive Leaflet map showing visited and future-goal
 * locations. Marker popups use safe DOM construction to prevent XSS.
 *
 * @module journey
 */
import { JOURNEY_LOCATIONS } from "./journey-data.js";
import {
  TILE_LAYER_URL,
  TILE_LAYER_ATTRIBUTION,
} from "./modules/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("journeyMap");

  if (!mapElement) return;

  // Initialize map centered roughly to show a global view
  // Focus slightly on East Asia / Pacific since many pins are there
  const map = L.map("journeyMap", {
    center: [30, 120],
    zoom: 3,
    minZoom: 2,
    worldCopyJump: true, // Seamless panning across the dateline
  });

  // Add OpenStreetMap tiles (URL injectable via constants for testability)
  L.tileLayer(TILE_LAYER_URL, {
    attribution: TILE_LAYER_ATTRIBUTION,
    maxZoom: 19,
  }).addTo(map);

  // Define custom icon styles using SVG
  const createIcon = (color) => {
    return L.divIcon({
      className: "custom-leaflet-icon",
      html: `
        <div style="
          background-color: ${color};
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.4);
          transform: translate(-50%, -50%);
        "></div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  };

  const visitedIcon = createIcon("#22c55e"); // Green
  const futureIcon = createIcon("#f97316"); // Orange

  // Add markers to map
  JOURNEY_LOCATIONS.forEach((loc) => {
    const icon = loc.type === "visited" ? visitedIcon : futureIcon;
    const marker = L.marker(loc.coords, { icon: icon }).addTo(map);

    // Build popup content safely using DOM API to prevent XSS
    const popupContainer = document.createElement("div");

    const popupTitle = document.createElement("h3");
    popupTitle.className = "popup-title";
    popupTitle.textContent = loc.name;
    popupContainer.appendChild(popupTitle);

    const popupStatus = document.createElement("p");
    popupStatus.className = "popup-status";
    popupStatus.textContent = loc.status;
    popupContainer.appendChild(popupStatus);

    marker.bindPopup(popupContainer);

    // Handle marker click to show photos section for visited locations
    marker.on("click", () => {
      const photosSection = document.getElementById("photos-section");
      const photosTitle = document.getElementById("photos-title");

      if (loc.type === "visited") {
        if (photosSection && photosTitle) {
          photosTitle.textContent = `Photos from ${loc.name}`;
          photosSection.classList.remove("hidden");
          // Smooth scroll to the photos section
          setTimeout(() => {
            photosSection.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }, 100);
        }
      } else {
        if (photosSection) {
          photosSection.classList.add("hidden");
        }
      }
    });
  });

  // Handle map resize when sidebar toggles
  const sidebarToggle = document.getElementById("sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      // Allow CSS transition to finish before invalidating map size
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    });
  }

  // Re-render map on window resize
  window.addEventListener("resize", () => {
    map.invalidateSize();
  });
});

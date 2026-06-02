// Journey Map Initialization
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

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

  // Location Data
  const locations = [
    // Visited
    {
      name: "Toronto",
      coords: [43.6532, -79.3832],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Hong Kong",
      coords: [22.3193, 114.1694],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Beijing",
      coords: [39.9042, 116.4074],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Xi'an",
      coords: [34.3416, 108.9398],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Shenzhen",
      coords: [22.5431, 114.0579],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Shenyang",
      coords: [41.8057, 123.4315],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Ottawa",
      coords: [45.4215, -75.6972],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Montreal",
      coords: [45.5017, -73.5673],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Halifax",
      coords: [44.6488, -63.5752],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Prince Edward Island",
      coords: [46.5107, -63.4168],
      status: "Visited",
      type: "visited",
    },
    {
      name: "Vancouver",
      coords: [49.2827, -123.1207],
      status: "Visited",
      type: "visited",
    },

    // Future
    {
      name: "South Korea",
      coords: [37.5665, 126.978],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Japan",
      coords: [35.6762, 139.6503],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Singapore",
      coords: [1.3521, 103.8198],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Taipei",
      coords: [25.033, 121.5654],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Iceland",
      coords: [64.1466, -21.9426],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Jordan",
      coords: [31.9522, 35.9334],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Boston",
      coords: [42.3601, -71.0589],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "New York City",
      coords: [40.7128, -74.006],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Los Angeles",
      coords: [34.0522, -118.2437],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Greenland",
      coords: [71.7069, -42.6043],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "Hungary",
      coords: [47.4979, 19.0402],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "拉萨",
      coords: [29.65, 91.1],
      status: "Future Goal",
      type: "future",
    },
    {
      name: "楼兰古城",
      coords: [40.5233, 89.9242],
      status: "Future Goal",
      type: "future",
    },
  ];

  // Add markers to map
  locations.forEach((loc) => {
    const icon = loc.type === "visited" ? visitedIcon : futureIcon;
    const marker = L.marker(loc.coords, { icon: icon }).addTo(map);

    // Popup content
    const popupContent = `
      <h3 class="popup-title">${loc.name}</h3>
      <p class="popup-status">${loc.status}</p>
    `;

    marker.bindPopup(popupContent);

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

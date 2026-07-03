/**
 * Location data for the Journey map.
 *
 * Each entry describes a place that has been visited or is a future travel
 * goal. Kept in a dedicated data module (parallel to `graph-data.js`) so
 * the rendering logic in `journey.js` stays focused on map setup.
 *
 * @module journey-data
 */

/**
 * @typedef {object} JourneyLocation
 * @property {string}          name   - Human-readable place name.
 * @property {[number,number]} coords - `[latitude, longitude]` pair.
 * @property {string}          status - Display label (e.g. "Visited", "Future Goal").
 * @property {"visited"|"future"} type - Category used for icon selection.
 */

/** @type {JourneyLocation[]} */
export const JOURNEY_LOCATIONS = [
  // Visited
  { name: "Toronto",               coords: [43.6532,  -79.3832], status: "Visited",     type: "visited" },
  { name: "Hong Kong",             coords: [22.3193,  114.1694], status: "Visited",     type: "visited" },
  { name: "Beijing",               coords: [39.9042,  116.4074], status: "Visited",     type: "visited" },
  { name: "Xi'an",                 coords: [34.3416,  108.9398], status: "Visited",     type: "visited" },
  { name: "Shenzhen",              coords: [22.5431,  114.0579], status: "Visited",     type: "visited" },
  { name: "Shenyang",              coords: [41.8057,  123.4315], status: "Visited",     type: "visited" },
  { name: "Ottawa",                coords: [45.4215,  -75.6972], status: "Visited",     type: "visited" },
  { name: "Montreal",              coords: [45.5017,  -73.5673], status: "Visited",     type: "visited" },
  { name: "Halifax",               coords: [44.6488,  -63.5752], status: "Visited",     type: "visited" },
  { name: "Prince Edward Island",  coords: [46.5107,  -63.4168], status: "Visited",     type: "visited" },
  { name: "Vancouver",             coords: [49.2827, -123.1207], status: "Visited",     type: "visited" },

  // Future
  { name: "South Korea",  coords: [37.5665,  126.978],  status: "Future Goal", type: "future" },
  { name: "Japan",         coords: [35.6762,  139.6503], status: "Future Goal", type: "future" },
  { name: "Singapore",     coords: [1.3521,   103.8198], status: "Future Goal", type: "future" },
  { name: "Taipei",        coords: [25.033,   121.5654], status: "Future Goal", type: "future" },
  { name: "Iceland",       coords: [64.1466,  -21.9426], status: "Future Goal", type: "future" },
  { name: "Jordan",        coords: [31.9522,   35.9334], status: "Future Goal", type: "future" },
  { name: "Boston",        coords: [42.3601,  -71.0589], status: "Future Goal", type: "future" },
  { name: "New York City", coords: [40.7128,  -74.006],  status: "Future Goal", type: "future" },
  { name: "Los Angeles",   coords: [34.0522, -118.2437], status: "Future Goal", type: "future" },
  { name: "Greenland",     coords: [71.7069,  -42.6043], status: "Future Goal", type: "future" },
  { name: "Hungary",       coords: [47.4979,   19.0402], status: "Future Goal", type: "future" },
  { name: "拉萨",           coords: [29.65,     91.1],    status: "Future Goal", type: "future" },
  { name: "楼兰古城",       coords: [40.5233,   89.9242], status: "Future Goal", type: "future" },
];

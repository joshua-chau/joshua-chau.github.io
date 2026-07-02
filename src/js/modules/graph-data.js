/**
 * Graph data for the interactive portfolio node graph.
 *
 * Nodes are organized in 3 levels:
 *   0 = root, 1 = core dimension, 2 = detail
 *
 * Links define hierarchy (parent→child) and cross-dimensional relationships.
 */

export const GRAPH_NODES = [
  // ── Root ──────────────────────────────────────────────────────────────
  {
    id: "root",
    label: "Joshua Chau",
    level: 0,
    group: "root",
    desc: "Computer Engineering student at the University of Toronto. Curious about how technology shapes our world — and how we shape technology.",
  },

  // ── Level 1 — Core Dimensions ─────────────────────────────────────────
  {
    id: "engineer",
    label: "工程师",
    labelEn: "The Engineer",
    level: 1,
    group: "engineer",
    desc: "Building robust, performant systems. From low-level optimization to full-stack applications, engineering is how I translate ideas into reality.",
  },
  {
    id: "thinker",
    label: "思想者",
    labelEn: "The Thinker",
    level: 1,
    group: "thinker",
    desc: "Seeking clarity through philosophy, strategy, and self-reflection. The unexamined life is not worth living.",
  },
  {
    id: "explorer",
    label: "探索者",
    labelEn: "The Explorer",
    level: 1,
    group: "explorer",
    desc: "Learning by doing — whether it's traveling to new places, getting hands dirty with a car engine, or navigating campus life.",
  },
  {
    id: "personal",
    label: "说明书",
    labelEn: "Personal Manual",
    level: 1,
    group: "personal",
    desc: "The quirks, habits, and operating guidelines that make me who I am. Consider this my user manual.",
  },

  // ── Level 2 — Engineer Details ────────────────────────────────────────
  {
    id: "perf_eng",
    label: "性能工程",
    level: 2,
    group: "engineer",
    desc: "Obsessed with making things faster. Profiling, benchmarking, and squeezing every last drop of performance from hardware and software alike.",
  },
  {
    id: "vivid_pdf",
    label: "VIVIDpdf",
    level: 2,
    group: "engineer",
    desc: "A passion project — a high-performance PDF processing tool. Built from scratch to solve real-world document workflow pain points.",
  },
  {
    id: "systems",
    label: "系统思维",
    level: 2,
    group: "engineer",
    desc: "Thinking in systems: understanding how components interact, identifying bottlenecks, and designing for resilience at scale.",
  },

  // ── Level 2 — Thinker Details ─────────────────────────────────────────
  {
    id: "xiushen",
    label: "修身",
    level: 2,
    group: "thinker",
    desc: "Self-cultivation from《大学》: 格物、致知、诚意、正心、修身。The ancient path of refining oneself before seeking to change the world.",
  },
  {
    id: "realism",
    label: "战略现实主义",
    level: 2,
    group: "thinker",
    desc: "A pragmatic worldview grounded in understanding incentives, constraints, and power dynamics. Idealism tempered by reality.",
  },
  {
    id: "philosophy",
    label: "哲学探索",
    level: 2,
    group: "thinker",
    desc: "Drawing wisdom from both Eastern and Western traditions. From Confucius to Stoicism, exploring what it means to live a good life.",
  },

  // ── Level 2 — Explorer Details ────────────────────────────────────────
  {
    id: "auto",
    label: "硬核修车",
    level: 2,
    group: "explorer",
    desc: "Getting under the hood — literally. Diagnosing, repairing, and understanding mechanical systems from first principles. There's zen in turning wrenches.",
  },
  {
    id: "uoft",
    label: "UofT 生活",
    level: 2,
    group: "explorer",
    desc: "Navigating the University of Toronto experience: the late nights, the breakthroughs, the community, and everything in between.",
  },
  {
    id: "travel",
    label: "行万里路",
    level: 2,
    group: "explorer",
    desc: "读万卷书，行万里路。Every journey broadens perspective. Collecting experiences, not just destinations.",
  },

  // ── Level 2 — Personal Details ────────────────────────────────────────
  {
    id: "finance",
    label: "财务战略",
    level: 2,
    group: "personal",
    desc: "Long-term financial thinking: budgeting, investing, and building sustainable wealth as a foundation for freedom and impact.",
  },
  {
    id: "feeding",
    label: "投喂禁忌",
    level: 2,
    group: "personal",
    desc: "A semi-serious guide to what (not) to feed me. Allergies, preferences, and the sacred rules of snack selection.",
  },
  {
    id: "growth",
    label: "成长记录",
    level: 2,
    group: "personal",
    desc: "Tracking personal growth over time — skills learned, habits built, milestones reached. The changelog of becoming.",
  },
];

export const GRAPH_LINKS = [
  // Root → Core
  { source: "root", target: "engineer", type: "hierarchy" },
  { source: "root", target: "thinker", type: "hierarchy" },
  { source: "root", target: "explorer", type: "hierarchy" },
  { source: "root", target: "personal", type: "hierarchy" },

  // Engineer → Details
  { source: "engineer", target: "perf_eng", type: "hierarchy" },
  { source: "engineer", target: "vivid_pdf", type: "hierarchy" },
  { source: "engineer", target: "systems", type: "hierarchy" },

  // Thinker → Details
  { source: "thinker", target: "xiushen", type: "hierarchy" },
  { source: "thinker", target: "realism", type: "hierarchy" },
  { source: "thinker", target: "philosophy", type: "hierarchy" },

  // Explorer → Details
  { source: "explorer", target: "auto", type: "hierarchy" },
  { source: "explorer", target: "uoft", type: "hierarchy" },
  { source: "explorer", target: "travel", type: "hierarchy" },

  // Personal → Details
  { source: "personal", target: "finance", type: "hierarchy" },
  { source: "personal", target: "feeding", type: "hierarchy" },
  { source: "personal", target: "growth", type: "hierarchy" },

  // Cross-dimensional (战略现实主义 underpins performance engineering & finance)
  { source: "realism", target: "perf_eng", type: "cross" },
  { source: "realism", target: "finance", type: "cross" },
];

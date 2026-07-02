/**
 * Interactive D3.js force-directed node graph.
 *
 * Opens a fullscreen overlay when the profile avatar is clicked.
 * Renders a galaxy-burst graph centered on "Joshua Chau" with
 * drag, click-to-inspect, and keyboard-dismiss interactions.
 */
import { GRAPH_NODES, GRAPH_LINKS } from "./graph-data.js";

// ── Constants ────────────────────────────────────────────────────────────
const NODE_RADIUS = { 0: 40, 1: 24, 2: 13 };
const FONT_SIZE = { 0: 14, 1: 12, 2: 10 };

const GROUP_COLORS = {
  root: { fill: "#334155", stroke: "#60a5fa" },
  engineer: { fill: "#6366f1", light: "#a5b4fc" },
  thinker: { fill: "#8b5cf6", light: "#c4b5fd" },
  explorer: { fill: "#06b6d4", light: "#67e8f9" },
  personal: { fill: "#f59e0b", light: "#fcd34d" },
};

const GROUP_LABELS = {
  root: "Core",
  engineer: "工程师 · Engineer",
  thinker: "思想者 · Thinker",
  explorer: "探索者 · Explorer",
  personal: "说明书 · Personal",
};

// ── Public API ───────────────────────────────────────────────────────────

/** Attach click listener to the profile avatar. */
export function initNodeGraph() {
  const avatar = document.getElementById("profileAvatar");
  if (!avatar) return;

  avatar.addEventListener("click", openGraph);
}

// ── Overlay Lifecycle ────────────────────────────────────────────────────

function openGraph() {
  // Guard: prevent duplicate overlays
  if (document.getElementById("graphOverlay")) return;

  const d3 = window.d3;
  if (!d3) {
    console.error("[node-graph] D3.js is not loaded.");
    return;
  }

  // ── Build overlay DOM ──────────────────────────────────────────────
  const overlay = document.createElement("div");
  overlay.id = "graphOverlay";
  overlay.className = "graph-overlay";
  document.body.appendChild(overlay);

  // Trigger CSS entrance transition on next frame
  requestAnimationFrame(() => overlay.classList.add("active"));

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "graph-close-btn";
  closeBtn.setAttribute("aria-label", "Close graph");
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", closeGraph);
  overlay.appendChild(closeBtn);

  // Info panel
  const panel = document.createElement("div");
  panel.className = "graph-info-panel";
  const placeholder = document.createElement("div");
  placeholder.className = "graph-info-placeholder";
  placeholder.textContent = "Click a node to explore";
  panel.appendChild(placeholder);
  overlay.appendChild(panel);

  // ── SVG setup ──────────────────────────────────────────────────────
  const width = overlay.clientWidth;
  const height = overlay.clientHeight;

  const svg = d3
    .select(overlay)
    .append("svg")
    .attr("class", "graph-svg")
    .attr("width", width)
    .attr("height", height);

  // Glow filter for root & selected nodes
  const defs = svg.append("defs");
  const filter = defs.append("filter").attr("id", "nodeGlow");
  filter
    .append("feGaussianBlur")
    .attr("stdDeviation", "3.5")
    .attr("result", "coloredBlur");
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  // ── Clone data (D3 mutates source/target) ──────────────────────────
  const nodes = GRAPH_NODES.map((d) => ({
    ...d,
    x: width / 2,
    y: height / 2,
  }));
  const links = GRAPH_LINKS.map((d) => ({ ...d }));

  // ── Force simulation ──────────────────────────────────────────────
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance((d) => {
          if (d.type === "cross") return 200;
          if (d.source.level === 0 || d.target.level === 0) return 140;
          return 90;
        }),
    )
    .force(
      "charge",
      d3.forceManyBody().strength((d) => {
        if (d.level === 0) return -500;
        if (d.level === 1) return -250;
        return -120;
      }),
    )
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force(
      "collide",
      d3
        .forceCollide()
        .radius((d) => NODE_RADIUS[d.level] + 20)
        .strength(0.8),
    )
    .alpha(1)
    .alphaDecay(0.015);

  // ── Render links ──────────────────────────────────────────────────
  const linkGroup = svg.append("g").attr("class", "graph-links");
  const linkEls = linkGroup
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", (d) => (d.type === "cross" ? "#f59e0b" : "#94a3b8"))
    .attr("stroke-opacity", 0)
    .attr("stroke-width", 1.5)
    .attr("stroke-dasharray", (d) => (d.type === "cross" ? "6,4" : null));

  // Fade links in after nodes begin expanding
  linkEls
    .transition()
    .duration(600)
    .delay(400)
    .attr("stroke-opacity", (d) => (d.type === "cross" ? 0.5 : 0.3));

  // ── Render nodes ──────────────────────────────────────────────────
  const nodeGroup = svg.append("g").attr("class", "graph-nodes");
  const nodeEls = nodeGroup
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", (d) => `graph-node level-${d.level}`)
    .style("cursor", "pointer")
    .call(buildDrag(d3, simulation));

  // Circles — start at r=0, elastic-expand to final radius
  nodeEls
    .append("circle")
    .attr("r", 0)
    .attr("fill", (d) => getNodeFill(d))
    .attr("stroke", (d) => getNodeStroke(d))
    .attr("stroke-width", (d) => (d.level === 0 ? 3 : d.level === 2 ? 1.5 : 0))
    .style("filter", (d) => (d.level === 0 ? "url(#nodeGlow)" : null))
    .transition()
    .duration(800)
    .delay((d) => d.level * 200 + Math.random() * 200)
    .ease(d3.easeElasticOut.amplitude(1).period(0.5))
    .attr("r", (d) => NODE_RADIUS[d.level]);

  // Primary labels
  nodeEls
    .append("text")
    .text((d) => d.label)
    .attr("text-anchor", "middle")
    .attr("dy", (d) => NODE_RADIUS[d.level] + 16)
    .attr("class", "graph-label")
    .attr("font-size", (d) => FONT_SIZE[d.level])
    .attr("opacity", 0)
    .transition()
    .duration(500)
    .delay((d) => d.level * 200 + 500)
    .attr("opacity", (d) => (d.level === 2 ? 0 : 1));

  // English sub-labels for Level 1 nodes
  nodeEls
    .filter((d) => d.labelEn)
    .append("text")
    .text((d) => d.labelEn)
    .attr("text-anchor", "middle")
    .attr("dy", (d) => NODE_RADIUS[d.level] + 30)
    .attr("class", "graph-label-en")
    .attr("font-size", 10)
    .attr("opacity", 0)
    .transition()
    .duration(500)
    .delay(900)
    .attr("opacity", 0.55);

  // ── Hover: enlarge + reveal detail labels ─────────────────────────
  nodeEls
    .on("mouseenter", function (_event, d) {
      const el = d3.select(this);
      if (!el.classed("selected")) {
        el.select("circle")
          .transition()
          .duration(200)
          .attr("r", NODE_RADIUS[d.level] + 4);
      }
      if (d.level === 2) {
        el.select(".graph-label").transition().duration(200).attr("opacity", 1);
      }
    })
    .on("mouseleave", function (_event, d) {
      const el = d3.select(this);
      if (!el.classed("selected")) {
        el.select("circle")
          .transition()
          .duration(200)
          .attr("r", NODE_RADIUS[d.level]);
        if (d.level === 2) {
          el.select(".graph-label")
            .transition()
            .duration(200)
            .attr("opacity", 0);
        }
      }
    });

  // ── Click: select node + show info panel ──────────────────────────
  let selectedG = null;

  nodeEls.on("click", function (event, d) {
    event.stopPropagation();
    deselectCurrent(d3, selectedG);

    const el = d3.select(this);
    el.classed("selected", true);
    el.select("circle")
      .transition()
      .duration(200)
      .attr("r", NODE_RADIUS[d.level] + 5)
      .style("filter", "url(#nodeGlow)");
    if (d.level === 2) {
      el.select(".graph-label").transition().duration(200).attr("opacity", 1);
    }
    selectedG = this;

    showPanel(panel, d);
  });

  // Click canvas background → deselect
  svg.on("click", () => {
    deselectCurrent(d3, selectedG);
    selectedG = null;
    hidePanel(panel);
  });

  // ── Simulation tick ───────────────────────────────────────────────
  simulation.on("tick", () => {
    linkEls
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    nodeEls.attr("transform", (d) => `translate(${d.x},${d.y})`);
  });

  // ── Keyboard dismiss ──────────────────────────────────────────────
  const onKeyDown = (e) => {
    if (e.key === "Escape") closeGraph();
  };
  document.addEventListener("keydown", onKeyDown);

  // ── Resize handler ────────────────────────────────────────────────
  const onResize = () => {
    const w = overlay.clientWidth;
    const h = overlay.clientHeight;
    svg.attr("width", w).attr("height", h);
    simulation.force("center", d3.forceCenter(w / 2, h / 2));
    simulation.alpha(0.3).restart();
  };
  window.addEventListener("resize", onResize);

  // Store cleanup references on the overlay element
  overlay._cleanup = () => {
    document.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("resize", onResize);
    simulation.stop();
  };
}

function closeGraph() {
  const overlay = document.getElementById("graphOverlay");
  if (!overlay) return;

  overlay.classList.remove("active");
  if (overlay._cleanup) overlay._cleanup();

  // Remove after fade-out transition ends
  overlay.addEventListener("transitionend", () => overlay.remove(), {
    once: true,
  });
  // Fallback in case transitionend doesn't fire
  setTimeout(() => {
    if (overlay.parentNode) overlay.remove();
  }, 500);
}

// ── Selection Helpers ────────────────────────────────────────────────────

function deselectCurrent(d3, gElement) {
  if (!gElement) return;
  const prev = d3.select(gElement);
  const data = prev.datum();
  prev.classed("selected", false);
  prev
    .select("circle")
    .transition()
    .duration(200)
    .attr("r", NODE_RADIUS[data.level])
    .style("filter", data.level === 0 ? "url(#nodeGlow)" : null);
  if (data.level === 2) {
    prev.select(".graph-label").transition().duration(200).attr("opacity", 0);
  }
}

// ── Info Panel ───────────────────────────────────────────────────────────

function showPanel(panel, node) {
  const colors = GROUP_COLORS[node.group] || GROUP_COLORS.root;
  const groupLabel = GROUP_LABELS[node.group] || node.group;

  panel.innerHTML = `
    <span class="graph-info-badge" style="background:${colors.fill};color:#fff">${groupLabel}</span>
    <h3 class="graph-info-title">${node.label}</h3>
    ${node.labelEn ? `<span class="graph-info-subtitle">${node.labelEn}</span>` : ""}
    <p class="graph-info-desc">${node.desc}</p>
  `;
  panel.classList.add("visible");
}

function hidePanel(panel) {
  panel.classList.remove("visible");
}

// ── D3 Drag Behavior ────────────────────────────────────────────────────

function buildDrag(d3, simulation) {
  return d3
    .drag()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}

// ── Node Styling ─────────────────────────────────────────────────────────

function getNodeFill(d) {
  if (d.level === 0) return GROUP_COLORS.root.fill;
  const gc = GROUP_COLORS[d.group];
  if (!gc) return "#64748b";
  return d.level === 1 ? gc.fill : gc.light;
}

function getNodeStroke(d) {
  if (d.level === 0) return GROUP_COLORS.root.stroke;
  if (d.level === 2) return (GROUP_COLORS[d.group] || {}).fill || "#64748b";
  return "none";
}

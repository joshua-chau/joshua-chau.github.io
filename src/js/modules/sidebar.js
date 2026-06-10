export function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarExpandBtn = document.getElementById("sidebarExpandBtn");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");

  if (!sidebar) return;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function updateMobileToggleLabel() {
    if (!sidebarToggle) return;
    const isOpen = document.body.classList.contains("sidebar-open");
    const label = isOpen ? "Close sidebar" : "Open sidebar";
    sidebarToggle.title = label;
    sidebarToggle.setAttribute("aria-label", label);
  }

  function updateDesktopToggleLabel() {
    if (!sidebarExpandBtn) return;
    const isExpanded = sidebar.classList.contains("expanded");
    const label = isExpanded ? "Close sidebar" : "Expand sidebar";
    sidebarExpandBtn.title = label;
    sidebarExpandBtn.setAttribute("aria-label", label);
  }

  // Set initial desktop label
  updateDesktopToggleLabel();

  // Desktop: toggle expanded state via the hamburger/expand button inside the rail
  function toggleDesktopExpand() {
    sidebar.classList.toggle("expanded");
    const isExpanded = sidebar.classList.contains("expanded");
    localStorage.setItem("sidebar-expanded", isExpanded ? "true" : "false");
    updateDesktopToggleLabel();
  }

  // Mobile: toggle sidebar open/close
  function toggleMobileSidebar() {
    document.body.classList.toggle("sidebar-open");
    if (sidebarToggle) {
      sidebarToggle.textContent = document.body.classList.contains(
        "sidebar-open",
      )
        ? "✕"
        : "☰";
    }
    updateMobileToggleLabel();
  }

  // Expand button inside the rail (works on both desktop and mobile)
  if (sidebarExpandBtn) {
    sidebarExpandBtn.addEventListener("click", () => {
      if (isMobile()) {
        toggleMobileSidebar();
      } else {
        toggleDesktopExpand();
      }
    });
  }

  // Mobile hamburger button
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleMobileSidebar);
  }

  // Backdrop click closes mobile sidebar
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
      if (sidebarToggle) sidebarToggle.textContent = "☰";
      updateMobileToggleLabel();
    });
  }

  // Ensure nav link clicks navigate correctly (delegate from nav)
  const sidebarNav = sidebar.querySelector("nav");
  if (sidebarNav) {
    sidebarNav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link && link.href) {
        window.location.href = link.href;
      }
    });
  }

  // Reset state on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      document.body.classList.remove("sidebar-open");
      if (sidebarToggle) sidebarToggle.textContent = "☰";
      updateMobileToggleLabel();
    }
  });
}

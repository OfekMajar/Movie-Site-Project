document.getElementById("openSidebarBtn").addEventListener("click", () => {
  openTheSidebar();
});
document.getElementById("closeSidebarBtn").addEventListener("click", () => {
  closeTheSidebar();
});
function openTheSidebar() {
  document.getElementById("siteContainer").style.gridTemplateAreas = `
      "sidebar header"
        "sidebar main"
        "sidebar main"
        "sidebar main"
        "sidebar main"
        "footer footer"
      `;
  document.getElementById("sidebar").style.visibility = "visible";
}
function closeTheSidebar() {
  document.getElementById("sidebar").style.visibility = "hidden";
  document.getElementById("siteContainer").style.gridTemplateAreas = `
      "sidebar header"
      "main main"
      "main main"
      "main main"
      "main main"
      "footer footer"
      `;
}

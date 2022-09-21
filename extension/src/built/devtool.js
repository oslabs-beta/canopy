//creates our Canopy tab in the devtools window and displays devtool.html
chrome.devtools.panels.create("Canopy", "get_started32.png", "panel.html", function (panel) { });
chrome.devtools.panels.elements.createSidebarPane("Svelte Components", function (sidebar) {
    // sidebar initialization code here
    sidebar.setPage("/sidebar.html");
});
//# sourceMappingURL=devtool.js.map

//creates our Canopy tab in the devtools window and displays devtool.html
chrome.devtools.panels.create("Canopy",
    "get_started32.png",
    "devtool.html",
    function(panel) {
      console.log('hello world')
    }
);


chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
    function(sidebar) {
        // sidebar initialization code here
        sidebar.setObject({ some_data: "Some data to show" });
});
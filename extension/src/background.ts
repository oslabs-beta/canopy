// Variable to store main port
let mainPort: any;

// Listens for messages from client and runs posts message to port if valid
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Passes messages to port if request target is valid
  if (request && request.target === 'canopy') {
    // If port exists posts message to port
    if (mainPort) mainPort.postMessage({ body: request.body });
  }
})

// Adds listener to port
chrome.runtime.onConnect.addListener((connectedPort) => {
  // Assigns connected port to mainPort
  mainPort = connectedPort;

  // Adds event listener for port messages
  mainPort.onMessage.addListener((message: any) => {
    // Injects content script into page, adding necessary page listeners
    if (message.body === 'runContentScript') chrome.tabs.executeScript({ file: './contentScript.js' });
  })
})

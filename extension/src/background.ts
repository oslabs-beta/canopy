// Variable to store main port
let mainPort: any;

// Listens for messages from client and runs posts message to port if valid
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Passes messages to port if request target is valid
  if (request && request.target === 'CANOPY') {
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
    if (message.target !== 'CANOPY') return;
    // Injects content script into page, adding necessary page listeners
    if (message.body === 'runContentScript') chrome.tabs.executeScript({ file: './contentScript.js' });
    // If chrome port recieves message to update script script is updated
    if (message.body === 'updateScript') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'CANOPY',
          body: 'INITIALIZE_PAGE',
          script: message.script,
        });
      });
    }
    // If chrome port recieves message to update index it send message to webpage
    if (message.body === 'updateExtensionIndex') {
      // Queries the current window and sends a corresponding message with the time travel index
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'CANOPY',
          body: 'TIME_TRAVEL',
          currentIndex: message.currentIndex,
        });
      });
    }
  })
})

// Variables to store main port and tab
let mainPort: any;

let currTab: any;

// Listens for messages from client and runs posts message to port if valid
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Passes messages to port if request target is valid
  if (request && request.target === 'CANOPY') {
    // If port exists posts message to port
    if (mainPort) mainPort.postMessage({ body: request.body });
  }
})

// Gets current tab
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// Adds listener to port
chrome.runtime.onConnect.addListener(async (connectedPort) => {
  // Assigns connected port to mainPort
  mainPort = connectedPort;
  // Saves tab to variable
  // let tab = await getCurrentTab();
  // Adds event listener for port messages
  mainPort.onMessage.addListener((message: any) => {
    if (message.target !== 'CANOPY') return;
    // Injects content script into page, adding necessary page listeners
    if (message.body === 'runContentScript') {
      (async () => {
        currTab = await getCurrentTab();
        chrome.scripting.executeScript({
          target: { tabId: currTab.id },
          files: ['contentScript.js'],
        });
      })();
    }
    // If chrome port recieves message to update script script is updated
    if (message.body === 'updateScript') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'CANOPY',
          body: 'INITIALIZE_PAGE',
          script: message.script
        });
      });
    }
    // If chrome port recieves message to update index it send message to webpage
    if (message.body === 'updateExtensionIndex') {
      // Queries the current window and sends a corresponding message with the time travel index
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'CANOPY',
          body: 'TIME_TRAVEL',
          currentIndex: message.currentIndex,
        });
      });
    }
  })
})

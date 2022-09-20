// Variables to store ports, tab, and whether script has been injected
let sidebarPort: any;
let panelPort: any;
let scriptInjected: boolean;
let currTab: any;

// Listens for messages from client and runs posts message to port if valid
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Passes messages to port if request target is valid
  if (request && request.target === 'CANOPY') {
    // If port exists posts messages to ports
    console.log('req:', request);
    console.log('panelPort:', panelPort);
    console.log('sidebarPort', sidebarPort);
    if (sidebarPort) sidebarPort.postMessage({ body: request.body });
    if (panelPort) panelPort.postMessage({ body: request.body });
  }
})

// Gets current tab
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// Executes content script and injects script to page
async function listenerCriteria(data: any) {
  console.log('listenerCriteriaActive', data)
  if (data.target !== 'CANOPY') return;
  // Runs and injects script if request body says to
  if (data.body === 'runAndInjectScript' && !scriptInjected) {
    scriptInjected = true;
    console.log('run&injectdata', data);
    currTab = await getCurrentTab();
    await chrome.scripting.executeScript({
      target: { tabId: currTab.id },
      files: ['contentScript.js'],
    });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        target: 'CANOPY',
        body: 'INJECT_SCRIPT',
        script: data.script
      });
    });
  }
  // If chrome port recieves message to update index it send message to webpage
  if (data.body === 'timeTravel') {
    // Queries the current window and sends a corresponding message with the time travel index
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        target: 'CANOPY',
        body: 'TIME_TRAVEL',
        currentIndex: data.currentIndex,
      });
    });
  }
  // If port receives message to get components it retrieves them from the webpage
  if (data.body === 'getComponents') {
    console.log('getComponents activated');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        target: 'CANOPY',
        body: 'COMPONENTS',
      });
    });
  }
}

// Adds listener to port
chrome.runtime.onConnect.addListener((connectedPort) => {
  console.log(connectedPort.name);
  console.log(connectedPort);
  // Adds listeners to panel-port and sidebar-port if they don't already exist and connects them to background
  if (connectedPort.name === "panel-port" && !panelPort) {
    console.log('panel connecting');
    panelPort = connectedPort;
    panelPort.onMessage.addListener(listenerCriteria);
    panelPort.onDisconnect.addListener(() => {
      console.log('panelDisconnected');
      scriptInjected = undefined;
      panelPort = undefined;
    });
  }
  if (connectedPort.name === "sidebar-port" && !sidebarPort) {
    console.log('side connecting');
    sidebarPort = connectedPort;
    sidebarPort.onMessage.addListener(listenerCriteria);
    sidebarPort.onDisconnect.addListener(() => {
      console.log('sideDisconnected');
      scriptInjected = undefined;
      sidebarPort = undefined;
    });
  }
})

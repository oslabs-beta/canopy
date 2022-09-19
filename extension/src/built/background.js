var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Variables to store ports, tab, and whether script has been injected
let sidebarPort;
let panelPort;
let scriptInjected;
let currTab;
// Listens for messages from client and runs posts message to port if valid
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Passes messages to port if request target is valid
    if (request && request.target === 'CANOPY') {
        // If port exists posts messages to ports
        console.log(request);
        if (sidebarPort)
            sidebarPort.postMessage({ body: request.body });
        if (panelPort)
            panelPort.postMessage({ body: request.body });
    }
});
// Gets current tab
function getCurrentTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = yield chrome.tabs.query(queryOptions);
        return tab;
    });
}
// Executes content script and injects script to page
function listenerCriteria(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('listenerCriteriaActive', data);
        if (data.target !== 'CANOPY')
            return;
        // Runs and injects script if request body says to
        if (data.body === 'runAndInjectScript' && !scriptInjected) {
            scriptInjected = true;
            console.log('run&injectdata', data);
            currTab = yield getCurrentTab();
            yield chrome.scripting.executeScript({
                target: { tabId: currTab.id },
                files: ['contentScript.js'],
            });
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    target: 'CANOPY',
                    body: 'COMPONENTS',
                });
            });
        }
    });
}
// Adds listener to port
chrome.runtime.onConnect.addListener((connectedPort) => {
    // Adds listeners to panel-port and sidebar-port if they don't already exist and connects them to background
    if (connectedPort.name === "panel-port" && !panelPort) {
        console.log('panel connecting');
        panelPort = connectedPort;
        panelPort.onMessage.addListener(listenerCriteria);
    }
    if (connectedPort.name === "sidebar-port" && !sidebarPort) {
        console.log('side connecting');
        sidebarPort = connectedPort;
        sidebarPort.onMessage.addListener(listenerCriteria);
    }
});
//# sourceMappingURL=background.js.map
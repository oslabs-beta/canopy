var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Variables to store main port and tab
let mainPort;
let currTab;
// Listens for messages from client and runs posts message to port if valid
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Passes messages to port if request target is valid
    if (request && request.target === 'CANOPY') {
        // If port exists posts message to port
        if (mainPort)
            mainPort.postMessage({ body: request.body });
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
// Adds listener to port
chrome.runtime.onConnect.addListener((connectedPort) => __awaiter(this, void 0, void 0, function* () {
    // Assigns connected port to mainPort
    mainPort = connectedPort;
    // Saves tab to variable
    // let tab = await getCurrentTab();
    // Adds event listener for port messages
    mainPort.onMessage.addListener((message) => {
        if (message.target !== 'CANOPY')
            return;
        // Injects content script into page, adding necessary page listeners
        if (message.body === 'runContentScript') {
            (() => __awaiter(this, void 0, void 0, function* () {
                currTab = yield getCurrentTab();
                chrome.scripting.executeScript({
                    target: { tabId: currTab.id },
                    files: ['contentScript.js'],
                });
            }))();
        }
        // If chrome port recieves message to update script script is updated
        if (message.body === 'updateScript') {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    target: 'CANOPY',
                    body: 'TIME_TRAVEL',
                    currentIndex: message.currentIndex,
                });
            });
        }
    });
}));
//# sourceMappingURL=background.js.map
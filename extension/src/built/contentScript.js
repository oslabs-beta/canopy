// Adds event listener to window that sends messages to chrome runtime if message sent to window
window.addEventListener('message', (e) => {
    chrome.runtime.sendMessage(e.data);
});
// Adding listender for messages on runtime with specific criteria
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    // Only checks for requests to target canopy
    if (req.target === 'CANOPY') {
        // If time travel initiated, posts message to window with target CANOPY, body TIME_TRAVEL, and state index value
        if (req.body === 'TIME_TRAVEL') {
            window.postMessage({ target: 'CANOPY', body: 'TIME_TRAVEL', currentIndex: req.currentIndex });
        }
        // If component request initiated, posts message to window with target CANOPY, body COMPONENTS
        if (req.body === 'COMPONENTS') {
            window.postMessage({ target: 'CANOPY', body: 'COMPONENTS' });
        }
        // If page update initiated, updates page shown to user.
        if (req.body === 'INJECT_SCRIPT') {
            // If onreset is already set don't run injection
            if (document.documentElement.getAttribute('onreset'))
                return;
            const newPage = document.createElement('script');
            const root = document.getElementById('root');
            while (root.children.length) {
                root.children[0].remove();
            }
            newPage.text = `(function () {
        'use strict';

        const deepCopy = (e) => JSON.parse(JSON.stringify(e));
        let cacheState = [];
        const components = [];
        const tagNames = [];
        let lastIndex = 0;
        // Send component state messages to window
        const sendMessages = (componentData) => {
          window.postMessage({
            target: 'CANOPY',
            body: {
              componentData: componentData,
              cacheLength: cacheState.length
            }
          });
        };
        // Adds event listener for 'SvelteRegisterComponent' (only in dev mode)
        window.document.addEventListener('SvelteRegisterComponent', (e) => {
          components.push(e.detail.component);
        });
        // Sets timeout to save and dispatch state after svelte register component event listener added
        setTimeout(saveAndDispatchState, 0);
        // Returns true if cache is empty OR
        // if the most recent cache state is different AND if that state differs from the previous index
        function checkIfChanged(componentState, i) {
          if (!cacheState.length ||
            (JSON.stringify(cacheState[cacheState.length - 1][i][1]) !== JSON.stringify(componentState[1])
              && JSON.stringify(cacheState[lastIndex][i][1]) !== JSON.stringify(componentState[1]))) {
            return true;
          }
          else
            return false;
        }
        // Saves each state and component name cache state and sends necessary messages to application.
        function saveAndDispatchState() {
          const currState = [];
          components.forEach((component) => {
            currState.push([component, component.$capture_state(), component.constructor.name]);
          });
          // only add to cache & send messages if any state has actually changed
          if (currState.some(checkIfChanged)) {
            // if cacheState is logner than the last index, we are back in time and should start a new branch
            if (cacheState.length > lastIndex) {
              cacheState = cacheState.slice(0, lastIndex + 1);
            }
            sendMessages(deepCopy(currState));
            cacheState.push([...currState]);
            lastIndex = cacheState.length - 1;
          }
        }
        // Sets up event listeners for state data changes
        function setupListeners(root) {
          root.addEventListener('SvelteRegisterBlock', (e) => saveAndDispatchState());
          root.addEventListener('SvelteDOMSetData', (e) => saveAndDispatchState());
          root.addEventListener('SvelteDOMInsert', (e) => saveAndDispatchState());
        }
        ;
        // Calls on listener setup
        setTimeout(() => setupListeners(window.document));
        window.addEventListener("message", (messageEvent) => {
          if (messageEvent.data.target !== 'CANOPY') return;
          if (messageEvent.data.body === 'TIME_TRAVEL') {
            const i = messageEvent.data.currentIndex;
            lastIndex = i;
            if (cacheState[i]) {
              cacheState[i].forEach((componentState) => {
                componentState[0].$inject_state(componentState[1]);
              });
            }
          }
          // Retrieves components at current state
          if (messageEvent.data.body === 'COMPONENTS') {
            saveAndDispatchState();
          }
        }, false);
      })();
      `;
            // Fixing mapping issues on injection
            if (req.script.includes("//# sourceMappingURL=bundle.js.map")) {
                newPage.text += req.script.substr(0, req.script.length - 34) + "//# sourceMappingURL=build/bundle.js.map";
            }
            document.documentElement.setAttribute('onreset', newPage.text);
            document.documentElement.dispatchEvent(new CustomEvent('reset'));
        }
    }
});
//# sourceMappingURL=contentScript.js.map
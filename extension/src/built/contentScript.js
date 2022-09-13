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
            window.postMessage({ target: 'CANOPY', body: 'TIME_TRAVEL', stateIndex: req.stateIndex });
        }
        // If page update initiated, updates page shown to user.
        if (req.body === 'INITIALIZE_PAGE') {
            // Variables to store finalized injected page and initial document body
            const injectedPage = document.createElement('script');
            const body = document.querySelector('body');
            // Loops through body and deletes initial content
            while (body.children.length) {
                body.children[0].remove();
            }
            // Sets text of injected page to necessary injection functions and original format
            injectedPage.text = `(function () {
          const deepCopy = (e) => JSON.parse(JSON.stringify(e));
          let cacheState = [];
          const components = [];
          let lastIndex = 0;

          // Send component state messages to window
          const sendMessages = (componentStates) => {
            window.postMessage({ 
              target: 'CANOPY',
              body: { 
                componentStates: componentStates, 
                cacheLength: cacheState.length 
              }
            });
          };

          // Adds event listener for 'SvelteRegisterComponent' (only in dev mode)
          window.document.addEventListener('SvelteRegisterComponent', (e) => {
            components.push(e.detail.component);
          })
          // Sets timeout to save and dispatch state after svelte register component event listener added
          setTimeout(saveAndDispatchState, 0);

          // Returns true if cache is empty OR
          // if the most recent cache state is different AND if that state differs from the previous index
          function checkIfChanged(componentState, i) {
            if (!cacheState.length ||
              (JSON.stringify(cacheState[cacheState.length - 1][i][1]) !== JSON.stringify(componentState[1])
              && JSON.stringify(cacheState[lastIndex][i][1]) !== JSON.stringify(componentState[1]))) {
              return true;
            } else return false;
          }

          // Saves each state and component name cache state and sends necessary messages to application.
          function saveAndDispatchState() {
            const currState = [];
            components.forEach((component) => {
              currState.push([component, component.$capture_state(), component.constructor.name]);
            })
            // only add to cache & send messages if any state has actually changed
            if (currState.some(checkIfChanged)) {
            // if cacheState is logner than the last index, we are back in time and should start a new branch
              if (cacheState.length > lastIndex){
                cacheState = cacheState.slice(0, lastIndex + 1)
              }
              sendMessages(parse(currState));
              cacheState.push([...currState]);
              lastIndex = cacheState.length - 1;
            }
          }

          // Sets up event listeners for state data changes
          function setupListeners(root) {
            root.addEventListener('SvelteRegisterBlock', (e) => saveAndDispatchState());
            root.addEventListener('SvelteDOMSetData', (e) => saveAndDispatchState());
            root.addEventListener('SvelteDOMInsert', (e) => saveAndDispatchState());
          };

          // Calls on listener setup
          setTimeout(() => setupListeners(window.document));

          ${req.script};

          window.addEventListener(
            "message",
            (messageEvent) => {
              if (messageEvent.data.target === 'CANOPY' && messageEvent.data.body === 'TIME_TRAVEL') {
                const i = messageEvent.data.ctxIndex;
                lastIndex = i;
                if (cacheState[i]) {
                  cacheState[i].forEach((componentState) => {
                    componentState[0].$inject_state(componentState[1])
                  })
                }
              }
            },
            false
          );
        })();`;
            // Appends new injected page to document
            document.children[0].append(injectedPage);
        }
    }
});
//# sourceMappingURL=contentScript.js.map
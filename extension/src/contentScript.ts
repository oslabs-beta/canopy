// Adds event listener to window that sends messages to chrome runtime if message sent to window
window.addEventListener('message', (e) => {
  chrome.runtime.sendMessage(e.data)
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
      injectedPage.text = `
      Front js

      ${req.script};

      Back js
      `

      // Appends new injected page to document
      document.children[0].append(injectedPage);
    }
  }
})
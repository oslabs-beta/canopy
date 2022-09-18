# canopy
Chrome devtool for Svelte

STEP 1:
RUN FOLLOWING IN ROOT DIRECTORY TERMINAL TO INITIALIZE

cd extension/src && npm i && npm run tsc && cd ../sidebar-bundle-generator && npm i && npm run build && cd ../panel-bundle-generator && npm i && npm run build && cd ../../demo-client && npm i && npm run dev

STEP 2:
Unpack ./extension/src/built to Chrome

ORDER OF OPERATIONS FOR USAGE (as of Sat at 12noon):
a. Be sure that all DevTools windows are closed.
b. Reload the extension in chrome://extensions/.
c. Refresh the page containing the Svelte app.
d. Now, Canopy should be available in the DevTools panel.
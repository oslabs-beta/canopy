# canopy
Chrome devtool for Svelte

STEP 1:
RUN FOLLOWING IN ROOT DIRECTORY TERMINAL TO INITIALIZE

cd extension/src && npm i && npm run tsc && cd ../sidebar-bundle-generator && npm i && npm run build && cd ../panel-bundle-generator && npm i && npm run build && cd ../../

STEP 2:
Unpack ./extension/src/built to Chrome

STEP 3:
RUN CLIENT IN DEV MODE
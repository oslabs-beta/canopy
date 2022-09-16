<script lang="ts">
	
	import { onMount } from 'svelte';
	import ComponentTree from './ComponentTree.svelte';

	export let snapshots = [];
	
	let currIndex = 0;
	let chromePort;
	$: currState = snapshots[currIndex];

	// Connects chrome port to extension
	const connectToPort = () => {
		// Saves port to variable
		chromePort = chrome.runtime.connect();
		// Adds listener to chrome port to update component if corresponding message recieved
		chromePort.onMessage.addListener((msg, sender, sendResponse) => {

			// if (msg.target !== 'CANOPY') return;
			if (!snapshots.includes(msg.body)) {
				const moment = [];
        msg.body.componentStates.forEach((state) => {
          const obj = {};
          obj[state[2]] = state[1];
          moment.push(obj);
        });
				
        snapshots = [...snapshots.slice(0, msg.body.cacheLength), moment];
			}
		});
	}

	// Injects script to page
	const injectScript = async () => {
		await chromePort.postMessage({
			target: 'CANOPY',
      body: 'runContentScript',
    });
		chrome.devtools.inspectedWindow.getResources((resources) => {
      // search for bundle file, make sure its named bundle.js
      for (let i = 0; i < resources.length; i++) {
        if (resources[i].url.endsWith('bundle.js')) {
          resources[i].getContent((content, encoding) => {
            chromePort.postMessage({
							target: 'CANOPY',
              body: 'updateScript',
              script: content,
            });
          });
        }
      }
    });
	}

	// On component mount, connects page to port and injects script to page with updateScript command
	onMount(async () => {
		connectToPort();
		await injectScript();
	});

</script>

<main>
	<h1>Component Tree</h1>
		<ComponentTree {currState} />
   
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	.tree-container {
	
		background-color: rgb(196, 191, 191);

		
	}
	ul{
		padding: 12px;
		/* padding-inline-start: 0; */
		list-style-type: none;
	}

    li{
            list-style: none;
        }
    li::before{
            content: "\00BB";
        }
	li :hover{
		font-weight: bold;
	}
</style>
<script lang="ts">

	import { onMount } from 'svelte';
	import State from './State.svelte';

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
			if (msg.target !== 'CANOPY') return;
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
		injectScript();
	});

	// Sends current index to port when request sent
	const sendCurrIndex = () => {
		chromePort.postMessage({ target: 'CANOPY', body: 'updateExtensionIndex', currIndex: currIndex })
	};
</script>

<main>
	<h1>State Tracker</h1>
	<div class="row">
		<div class="column" style="background-color:#aaa;">
			{#each snapshots as snapshot, index}
				<button
					class="stateButton {currIndex === index ? 'active' : ""}"
					on:click={() => {
						// Sends current index to port
						currIndex = index;
						sendCurrIndex();
					}}
				>
				<!-- Replace with useful data -->
				snapshot {index} 
				</button>
				/>
				<br />
			{/each}
		</div>
		<div class="column" style="background-color:#bbb;">
			<State {currState} />
	  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: rgb(195, 231, 139);
	}

	* {
  		box-sizing: border-box;
	}

	.row {
  	display: flex;
	}

	.column {
  		flex: 50%;
  		padding: 10px;
  		height: 300px; /* Should be removed. Only for demonstration */
	}
</style>
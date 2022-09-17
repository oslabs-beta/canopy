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

	// Sends current index to port when request sent
	const sendCurrIndex = () => {
		chromePort.postMessage({ target: 'CANOPY', body: 'updateExtensionIndex', currentIndex: currIndex })
	};

</script>

<main>
	<h1>State Tracker</h1>
	<div class="row">
		<div class="column left">
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
				<br />
			{/each}
		</div>
		<div class="column right">
			<State {currState} />
	  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		/* max-width: 240px; */
		margin: 0 auto;
		/* background-color: rgb(195, 231, 139); */
		background-image: linear-gradient(rgb(195, 231, 139), rgb(229, 234, 220))
	}

	h1 {
		color: rgb(73, 74, 74);
		text-shadow: 2px 2px 3px rgb(145, 147, 145);
	}

	.stateButton {
		background-color: white;
		color: black;
		border: 2px solid rgb(110, 135, 69);
		padding: 18px 20px;
		text-align: center;
		display: inline-block;
		font-size: 15px;
		border-radius: 12px;
	}

	.stateButton:hover {
		background-color: rgb(110, 135, 69);
	}

	* {
  		box-sizing: border-box;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}

	.row {
  		display: flex;
	}

	.column {
		float: left;
  		/* flex: 20%; */
  		padding: 10px;
/* Should be removed. Only for demonstration */
  		/* height: 300px; */
	}

	.left{
		width: 25%;
		text-align: center;
	}

	.right{
		width: 75%;
		text-align: left;
		background: rgba(255,255,255, 0.3);
    	border-radius: 8px;
	}
</style>
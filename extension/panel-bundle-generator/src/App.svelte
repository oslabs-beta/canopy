<script lang="ts">

	import { onDestroy, onMount } from 'svelte';

	import State from './State.svelte';

	export let snapshots = [];
	
	let currIndex = 0;
	let chromePort;
	$: currState = snapshots[currIndex];

	// Connects chrome port to extension
	const portMsgInit = () => {
		// Adds listener to chrome port to update component if corresponding message recieved
		chromePort.onMessage.addListener((msg, sender, sendResponse) => {
			// if (msg.target !== 'CANOPY') return;
			if (!snapshots.includes(msg.body)) {
				const moment = [];
				msg.body.componentData.forEach((state) => {
					const obj = {};
					obj[state[2]] = state[1];
					moment.push(obj);
				});
				
				snapshots = [...snapshots.slice(0, msg.body.cacheLength), moment];
				currIndex = snapshots.length - 1;
			}
		});
	}

	// Injects script to page
	const injectScript = async () => {
		chrome.devtools.inspectedWindow.getResources((resources) => {
      // search for bundle file, make sure its named bundle.js
      for (let i = 0; i < resources.length; i++) {
        if (resources[i].url.endsWith('bundle.js')) {
          resources[i].getContent((content, encoding) => {
            chromePort.postMessage({
							target: 'CANOPY',
              body: 'runAndInjectScript',
              script: content,
            });
          });
        }
      }
    });
	}

	// Sends current index to port when request sent
	const sendCurrIndex = () => {
		console.log('sending to PORT->', chromePort);
		chromePort.postMessage({ target: 'CANOPY', body: 'timeTravel', currentIndex: currIndex });
	};

	// On component mount, connects page to port and injects script to page with injectScript command
	onMount(async () => {
		// Saves port to variable
		chromePort = chrome.runtime.connect({ name: "panel-port" });
		portMsgInit();
		await injectScript();
		sendCurrIndex();
	});

	// Disconnects port and reassigns it to undefined when page left
	onDestroy(() => {
		console.log('panelDestroyed');
		chromePort.disconnect();
		chromePort = undefined;
		chrome.runtime.reload();
	})

	const stateName = (snapshots, index) => {
    let name = 'Reset'
    //[[{App: {}}]]    [[{App: {}}],[{App: {}}]]
    if (index === 0) return name;

    const prev = snapshots[index - 1]; //array
    const curr = snapshots[index]; //array

    for (let i = 0; i < curr.length; i++) {
        if (JSON.stringify(prev[i]) !== JSON.stringify(curr[i])) { //[{App: {}}]

            for (const key in curr[i]) {
                if (curr[i][key] !== prev[i][key]) { //{}
                    let currState = curr[i][key];
                    let prevState = prev[i][key];
                    console.log('currState: ', currState)

                    for (const stateName in currState) {
                        let currStateName = currState[stateName];
                        let prevStateName = prevState[stateName];

                        if (JSON.stringify(currStateName) != JSON.stringify(prevStateName)) {
                            console.log(stateName, currStateName, prevStateName)
                            name = stateName;
							//this all works if there's only one state change!
							//if you just want the first instance of state change, uncomment below
                            // return name; 
                        }
                    }

                }
            }

        }
    }

    return name;
}

</script>

<main>
	<h1>State Tracker</h1>
	{#if snapshots.length === 0}
		<div class="activation-reminder">Interact with Webpage State to activate Time Travel Debugger!</div>
	{:else}
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
					<div class="smaller">Snapshot {index}: </div>
					{stateName(snapshots, index)}
					</button>
					<br />
				{/each}
			</div>
			<div class="column right">
				
				<State {currState} />
				
			</div>
		</div>
	{/if}
</main>

<!-- rgb(227, 234, 216)  -->
<!-- rgb(118, 154, 69) -->

<style>
	main {
		text-align: center;
		width: 100vw;
		height: 100vh;
		margin: 0;
		background-image: linear-gradient(rgb(227, 234, 216), rgb(229, 234, 220))
	}

	.smaller {
		font-size: 80%;
		line-height: 1.8;
		width: fit-content;
	}

	.stateButton {
		background-color: white;
		color: black;
		border: 2px solid rgb(118, 154, 69);
		padding: 10px 15px;
		text-align: center;
		display: inline-block;
		font-size: 15px;
		border-radius: 12px;
		margin: 8px;
	}

	.stateButton:hover {
		background-color: rgb(118, 154, 69);
	}

	* {
		box-sizing: border-box;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
	
	h1 {
		height: calc(10% - 20px);
		margin: 10px;
	}

	.row {
  	display: flex;
		width: 100%;
		height: 90%;
	}

	.column {
		float: left;
		overflow-y: scroll;
	}

	button {
		margin: 10px;
		text-align: center;
	}

	.left{
		max-height: 100%;
		width: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		overflow-wrap: break-word;
	}

	.right{
		margin-left: 0;
		margin-right: 15px;
		margin-bottom: 15px;
		text-align: left;
		width: calc(100% - 150px - 15px);
		background: rgba(255,255,255, 0.3);
    border-radius: 8px;
	}

	.activation-reminder {
		background: rgba(255,255,255, 0.3);
		border-radius: 8px;
		width: fit-content;
		margin: auto;
		padding: 10px;
	}
</style>
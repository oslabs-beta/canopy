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
		console.log('panelMount');
		console.log('preconnectPort', chromePort);
		// Saves port to variable
		chromePort = chrome.runtime.connect({ name: "panel-port" });
		console.log('currPort', chromePort);
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
				<div class="smaller">snapshot {index}: </div>
				{stateName(snapshots, index)}
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

	.smaller {
		font-size: 80%;
		line-height: 1.8;
	}

	.stateButton {
		background-color: white;
		color: black;
		border: 2px solid rgb(110, 135, 69);
		padding: 10px 15px; 
		/* padding-top: 5px;
		padding-bottom: 5px; */
		text-align: center;
		display: inline-block;
		font-size: 15px;
		border-radius: 12px;
		margin: 8px;
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
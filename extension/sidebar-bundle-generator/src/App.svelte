<script lang="ts">
	
	import { onDestroy, onMount } from 'svelte';

	import ComponentTree from './ComponentTree.svelte';

	// Sample tree for component tree
  let currMoment = { componentKey: -1, componentName: 'Canopy', children: [] };
  $: tree = currMoment;
	
	let chromePort;

	// Connects chrome port to extension
	const portMsgInit = () => {
		// Adds listener to chrome port to update component if corresponding message recieved
		chromePort.onMessage.addListener((msg, sender, sendResponse) => {
			const moment = tree;
			// Resetting children to be empty to update to children in application
			moment.children = [];
			msg.body.componentData.forEach((component, index) => {
				// saving component names to moment
				moment.children = [...moment.children, {componentKey: index, componentName: component[2], children: []}];
			});
			// Resets components in currMoment
			currMoment = moment;
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

	// Activates on component mount
	onMount(async () => {
    console.log('sidebarMount');
    console.log('preconnectPort', chromePort);
		// Connects page to port and injects script to page with injectScript command
		chromePort = await chrome.runtime.connect({ name: "sidebar-port" });
		console.log('currPort', chromePort);
		portMsgInit();
		await injectScript();
		// Posts time travel message with first state to get component views of first state
		chromePort.postMessage({ target: 'CANOPY', body: 'getComponents' });
	});

  // Disconnects port and reassigns it to undefined when page left
  onDestroy(() => {
    console.log('sidebarDestroyed');
		chromePort.disconnect();
		chromePort = undefined;
    chrome.runtime.reload();
	})

</script>

<main>
	<h1>Component Visualizer</h1>
	{#if tree.children.length === 0}
		Interact with Webpage State to activate Svelte Component Visualizer!
	{:else}
		<ComponentTree bind:tree={tree} />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-image: linear-gradient(rgb(227, 234, 216), rgb(229, 234, 220))
	}
</style>
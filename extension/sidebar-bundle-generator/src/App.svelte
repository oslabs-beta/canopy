<script lang="ts">
	
	import { onDestroy, onMount } from 'svelte';

	import ComponentTree from './ComponentTree.svelte';

	// Sample tree for component tree
  const tree = {
    componentKey: "onlyApple",
    componentName: "App",
    children:
    [
      {
        componentKey: "onlyNavBar",
        componentName: "NavBar",
        children: []
      },
      {
        componentKey: "myListItem1",
        componentName: "ListItem",
        children: [
          {
            componentKey: "onlySubItem",
            componentName: "SubItem",
            children: [
              {
                componentKey: "onlySubSubItem",
                componentName: "SubSubItem",
                children: []
              }
            ]
          }
        ]
      },
      {
        componentKey: "myListItem2",
        componentName: "ListItem",
        children: []
      },
      {
        componentKey: "myListItem3",
        componentName: "ListItem",
        children: []
      },
      {
        componentKey: "myListItem4",
        componentName: "ListItem",
        children: []
      }
    ]
  }
	
	export let currMoment
	let chromePort;

	// Connects chrome port to extension
	const portMsgInit = () => {
		console.log('port MESS INITIATED');
		// Adds listener to chrome port to update component if corresponding message recieved
		chromePort.onMessage.addListener((msg, sender, sendResponse) => {
			console.log('sidebar-message', msg.body);
			// if (msg.target !== 'CANOPY') return;
			if (currMoment !== msg.body) {
				const moment = [];
        msg.body.componentData.forEach((component) => {
          // saving component names to currMoment
          moment.push(component[2]);
        });
        currMoment = moment;
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
	<h1>Component Tree</h1>
	{currMoment}
	<ComponentTree {tree} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
</style>
<script>

	import Collatz from './Collatz.svelte';

	import RPTree from './RPTree.svelte';
	
	const myRPTree = {
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


</script>

<h1>The Notorious RPT</h1>

<RPTree tree={myRPTree} />

<hr />

<Collatz />
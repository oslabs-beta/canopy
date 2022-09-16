<script lang="ts">
	export let clickCount = 0;
	export let textInput = 'Enter Text in \'Input Text\'';
	export let list = [];

	function handleCount () {
		clickCount++;
	};

	function handleText (e) {
		textInput = e.target.value;
	};

	function handleListAdd () {
		list.push(textInput);
		list = list;
	}
</script>

<main>
	<h3>{clickCount}</h3>
	<button on:click={handleCount}>Increment</button>
	<br><br><br>
	<h3>{textInput}</h3>
	<input type="text" id="inText" placeholder="Input Text"on:input={handleText}>
	<br><br>
	<button on:click={handleListAdd}>Add Text to List</button>
	<ul>
		{#each list as listItem, i (i)}
			<li>{listItem}</li>
		{/each}
	</ul>
</main>

<style>
	main {
		width: fit-content;
		height: fit-content;
		text-align: center;
		background-color: greenyellow;
		padding: 50px;
	}
</style>
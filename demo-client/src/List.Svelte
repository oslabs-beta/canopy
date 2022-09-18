
<script lang="ts">
    export let textInput = 'Enter Text in \'Input Text\'';
	export let list = [];



	function handleText (e) {
		textInput = e.target.value;
	};

	function handleListAdd () {
		list.push(textInput);
		list = list;
	}
</script>


<div id="list-container">
	<h3>{textInput}</h3>
	<input type="text" id="inText" placeholder="Input Text"on:input={handleText}>
	<br><br>
	<button on:click={handleListAdd}>Add Text to List</button>
	<ul>
		{#each list as listItem, i (i)}
			<li>{listItem}</li>
		{/each}
	</ul>
 </div>
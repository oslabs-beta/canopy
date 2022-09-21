<script lang="ts">

	import Slider from "./Slider.svelte";
	import Counter from "./Counter.svelte";
	// import List from "./List.svelte";
	import Collatz from "./Collatz.svelte";

	
</script>

<div>
	<img src="Canopy.png" alt="Canopy" width="150" height="150">
	<Counter/>
	<!-- <List/> -->
	<Slider/>
	<Collatz />
</div>

<style>
	img {
		display: block;
		margin: auto;
		box-shadow: 0px 0px 7px #ccc
	}
</style>
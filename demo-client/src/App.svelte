<script lang="ts">

	import Slider from "./Slider.svelte";
	import Counter from "./Counter.svelte";
	// import List from "./List.svelte";
	import Collatz from "./Collatz.svelte";

	
</script>

<div>
	<img src="Canopy.png" alt="Canopy" width="150" height="150">
	<div id="countSlide">
		<Counter/>
		<!-- <List/> -->
		<Slider/>
	</div>
	<Collatz />
</div>

<style>
	#countSlide {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20px;
	}

	@media (max-width: 750px) {
		#countSlide {
			flex-direction: column;
		}
	}

	img {
		display: block;
		margin: auto;
		box-shadow: 0px 0px 7px #ccc
	}
</style>
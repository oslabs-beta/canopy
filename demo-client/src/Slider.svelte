<script>
	let sliderOne = 1;
	let sliderTwo = 2;
</script>

<div id='slider-container'>
	<h3>Slider</h3>
	<label>
		<input type=number bind:value={sliderOne} min=0 max=10>
		<input type=range bind:value={sliderOne} min=0 max=10>
	</label>

	<label>
		<input type=number bind:value={sliderTwo} min=0 max=10>
		<input type=range bind:value={sliderTwo} min=0 max=10>
	</label>
	<p>{sliderOne} + {sliderTwo} = {sliderOne + sliderTwo}</p>
</div>


<style>
	label { display: flex }
	input, p { margin: 6px }

	#slider-container {
		margin: 30px;
		border: 1px solid black;
		padding: 1rem;
		display: flex;
		width: 40%;
		flex-direction: column;
		min-width: 260px;
		height: 200px;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 750px) {
		#slider-container {
			width: 80%;
		}
	}
</style>


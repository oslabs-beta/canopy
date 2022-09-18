<script>
	let a = 1;
	let b = 2;
</script>
<div id='slider-container'>
    <h3>Slider</h3>
<label>
	<input type=number bind:value={a} min=0 max=10>
	<input type=range bind:value={a} min=0 max=10>
</label>

<label>
	<input type=number bind:value={b} min=0 max=10>
	<input type=range bind:value={b} min=0 max=10>
</label>
<p>{a} + {b} = {a + b}</p>
</div>


<style>
	label { display: flex }
	input, p { margin: 6px }

    #slider-container {
        margin: 30px;
        border: 1px solid black;
        padding: 1rem;
        }
</style>


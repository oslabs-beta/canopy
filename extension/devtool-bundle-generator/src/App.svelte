<script lang="ts">

</script>

<main>
	<h1>State Tracker</h1>


	<div class="row">
		<div class="column" style="background-color:#aaa;">
			<li>State1</li>
			<li>State2</li>
			<li>State3</li>
		</div>
		<div class="column" style="background-color:#bbb;">
			<ul>
				<li>
					Stateval1
					<ul>
						<li>Stateval1-1</li>
						<li>Stateval1-2</li>
						<li>Stateval1-3</li>
					</ul>
				</li>
				<li>
					Stateval2
					<ul>
						<li>Stateval2-1</li>
						<li>Stateval2-2</li>
					</ul>
				</li>
			</ul>
		</div>
	  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: rgb(195, 231, 139);
	}

	* {
  		box-sizing: border-box;
	}

	.row {
  	display: flex;
	}

	.column {
  		flex: 50%;
  		padding: 10px;
  		height: 300px; /* Should be removed. Only for demonstration */
	}
</style>
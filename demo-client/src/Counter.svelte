<script>

  let clickCount = 0;

  function handleCount () {
      clickCount++;
	};

</script>

<div id="counter-container">
  <h4>Counter</h4>
  <h3>{clickCount}</h3>
  <button on:click={handleCount}>Increment</button>
</div>


<style>
  #counter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
    border: 1px solid black;
    min-width: 260px;
    padding: 1rem;
    height: 200px;
    width: 40%;
  }
  @media (max-width: 750px) {
		#counter-container {
			width: 80%;
		}
	}
  button {
    margin: 20px;
  }
</style>
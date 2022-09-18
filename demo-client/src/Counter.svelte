<script>

  export let clickCount = 0;

  function handleCount () {
      clickCount++;
	};

</script>

<div id="counter-container">
  <h3>{clickCount}</h3>
  <button on:click={handleCount}>Increment</button>
</div>


<style>
    #counter-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px;
        border: 1px solid black;
        }
</style>
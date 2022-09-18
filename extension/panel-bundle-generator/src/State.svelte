<script>

  export let currState;

</script>

<div>
  {#if currState === undefined}
  <!-- If there's no state close divTag -->
  <div />
  <!-- If the inputted state is parent component adds necessary formatting and recursively calls state -->
  <!-- example of currState: [{App: {clickCount: 4, textInput: 'hi', list: ['hi']}] -->
  {:else if Array.isArray(currState)} 
  <ul>
    {#each currState as childState}
    <li>
      <svelte:self currState={childState} />
    </li>
    {/each}
  </ul>
  <!-- If the inputted state is a child, adds necessary formatting for child -->
  {:else if typeof currState === 'object'}
    
    {#each Object.entries(currState) as [key, value]}
      <strong>{key}: <svelte:self currState={value}/></strong>
    {/each}
  {:else}
    <div class="value">{currState}</div>
  {/if}
</div>

<style>
  * {
    line-height: 1.8;
  }
  strong {
    font-size: 14px;
  }

  strong::after {
    content: "\a";
    white-space: pre;
  }

  .value {
    text-indent: 20px;
    font-weight: normal;
  }
</style>
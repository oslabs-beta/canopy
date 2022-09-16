<script lang="ts">

  export let currState;

</script>

<div>
  {#if currState === undefined}
  <!-- If there's no state close divTag -->
  <div />
  <!-- If the inputted state is parent component adds necessary formatting and recursively calls state -->
  {:else if Array.isArray(currState)}
  <ul>
    {#each currState as childState}
    <li>
      <svelte:self currState={childState} />
    </li>
    {/each}
  </ul>
  <!-- If the inputted state is a child adds necessary formatting for child -->
  {:else if typeof currState === 'object'}
    
    {#each Object.entries(currState) as [key, value]}
      <strong>{key}: <svelte:self currState={value}/></strong>
    {/each}
  {:else}
    {currState}
  {/if}
</div>

<style>

</style>
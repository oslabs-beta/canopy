<script lang="ts">

  export let tree;

  let hasChildren;
  if (tree.children.length) {
      hasChildren = true;
  } else {
      hasChildren = false;
  }

  // this is only ever used if hasChildren is true
  export let expanded = true;

  function toggle(){expanded = !expanded;};

</script>

<div>

  <div class="vspace"></div>

  <!--
  the following three svg images come from the Bootstrap icon library, which is available at:
      https://icons.getbootstrap.com/
  there, they are respectively called:
      plus-circle (for the "expansion" icon)
      dash-circle (for the "contraction" icon)
      circle (for the "no children" icon)
  for usage in the Chrome DevTools panel, their xmlns attributes have been removed. additionally, their classes have also been removed, for styling in the present context.
  -->

  {#if hasChildren}
  {#if expanded}
    <svg on:click={toggle} class="toggle-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
    </svg>
  {:else}
    <svg on:click={toggle} class="toggle-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  {/if}
  {:else}
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  </svg>
  {/if}

  <b>{tree.componentKey}</b>, an instance of the "{tree.componentName}" component

  {#if hasChildren && expanded}
  <div id="inner-children-div">
    {#each tree.children as child}
      <!-- <br/> -->
      <div class="child">
        <br/>
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span>
          <svelte:self tree={child} />
        </span>
      </div>
    {/each}
  </div>
  {/if}

</div>

<style>

#inner-children-div {
  border-left: solid 1px gray;
}
.vspace {
  padding-top: 15px;
}
.child {
  display: flex;
}
.toggle-icon:hover {
  cursor: pointer;
}
</style>
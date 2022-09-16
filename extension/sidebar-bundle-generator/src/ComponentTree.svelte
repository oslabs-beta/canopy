<script lang="ts">

  export let currState;

</script>

<div>
  <div class="tree-container">
    <ul>
      <li>Counter Component</li>
      <li>component</li>
    <li>[props: ] <br> [state: ]</li>
    <ul>
      <li>btn</li>
      <li>component</li>
      <li>[props:  ] <br> [data: ]</li>
    </ul>
    <ul>
      <li>input</li>
      <li>component</li>
      <li>[props:  ] <br> [data: ]</li>
    </ul>
      </ul>
  </div>
</div>

<style>
  .tree-container {
    background-color: rgb(196, 191, 191);
  }
  ul{
    padding: 12px;
    /* padding-inline-start: 0; */
    list-style-type: none;
  }

  li{
    list-style: none;
  }
  li::before{
    content: "\00BB";
  }
  li :hover{
    font-weight: bold;
  }
</style>
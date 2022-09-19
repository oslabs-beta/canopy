
<script>

    export let textInput = '';
	export let list = [];
    list = list;
   
	function handleText (e) {
        textInput = e.target.value;
	};

	function handleListAdd () {  
        
        let input = document.querySelector('#inText')
        
        if(input.value) list.push(textInput);
		
		list = list;
        document.querySelector('#inText').value = ''
        textInput = ''
	};

</script>

<div id="list-container">
	<h3>Add to</h3>
	<input type="text" id="inText" placeholder="input text"  on:input={handleText}>
	
	<button on:click={handleListAdd}>Add Text to List</button>
    <button on:click={e => {list = []} }>Clear</button>
	<ul>
		{#each list as listItem, i (i)}
			<li>{listItem}</li>
		{/each}
	</ul>
 </div>


 <style>
      #list-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px;
        border: 1px solid black;
        }
 </style>
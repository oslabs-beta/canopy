<script lang="ts">
	
</script>

<main>
	<h1>Component Data</h1>
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
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
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
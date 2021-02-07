<script lang='typescript'>
  import P2DTest from './P2DTest.svelte'
  import P3DTest from './P3DTest.svelte'
</script>

<style>
	:global(body) {
	  margin: 0;
	  font-family: Arial, Helvetica, sans-serif;
	}

	.App {
    text-align: center;
	}
</style>

<div class="App">
  <P3DTest />
  <P2DTest />
</div>


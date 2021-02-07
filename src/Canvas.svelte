<script lang='typescript'>
	export let sketch;
  let me;

	import { onMount } from "svelte";

  onMount(()  => {
	  let myp5 = new p5(sketch, me);
	});

</script>

<style>
</style>

<div bind:this={me}>
</div>

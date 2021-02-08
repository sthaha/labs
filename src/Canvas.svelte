<script lang='typescript'>
	export let sketch;
  let element;

	import { onMount } from "svelte";
  import p5 from "p5";

  onMount(()  => {
	  let myp5 = new p5(sketch, element);
	});

</script>

<style>
</style>

<div bind:this={element}>
</div>

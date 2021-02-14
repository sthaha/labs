<script lang='typescript'>
  import { onMount } from"svelte";
  import p5 from "p5";

	export let sketch;
  let element;


  onMount(()  => {
	  let myp5 = new p5(sketch, element);
	});

</script>

<style>
</style>

<div bind:this={element}></div>

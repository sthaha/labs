<script lang='typescript'>
	export let sketch;
  let me;

	import { onMount } from "svelte";
  import p5 from "p5";

  onMount(()  => {
	  let myp5 = new p5(sketch, me);
	});

</script>

<style>
</style>

<div bind:this={me}>
</div>

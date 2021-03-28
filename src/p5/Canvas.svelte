<script lang='typescript'>
  import { onMount } from"svelte";
  import p5 from "p5";

  export let sketch
  export let mode = "2D"
  export let height = 400
  export let width = 0

  let element;

  const run = (p: p5) => {
    let child = sketch(p, element);

    p.setup = () => {
      const renderer = mode == "2D" ? p.P2D : p.WEBGL

      p.createCanvas(width || element.offsetWidth, height, renderer);

      if (typeof child.setup == "function") {
        child.setup()
      }
    };

    p.draw = child.draw
  }


  onMount(()  => {
    new p5(run, element);
	});

</script>

<div class="m-0 p-0 object-contain" bind:this={element}></div>

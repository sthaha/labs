<script lang='typescript'>

import { onMount } from"svelte";
import p5 from "p5";


interface P5 {
  setup?: () => void
  onResize?: () => void
}

type Sketch = (p5, HtmlCanvasElement) => P5

export let sketch: Sketch

export let mode = "2D"
export let height = 0;
export let width = 0; // automatically fill the parent (element.offsetWidth)

let w;    // bound to clientWidth
let element;  // bound to this

let child: P5;


const debounce = (x, fn) => {
  let timeout;

  return () => {
    const later = (...x) => {
      timeout = null;
      fn(...x)
    }

    clearTimeout(timeout);
    timeout = setTimeout(later, x)
  }
}

const run = (p: p5) => {
  child = sketch(p, element);

  p.setup = () => {
    const renderer = mode == "2D" ? p.P2D : p.WEBGL
    p.createCanvas(width || w, height || p.windowHeight *0.75, renderer);
    child.setup &&  child.setup()
  };

  // handle resize only if the width isn't fixed
  if (width === 0 ) {
    p.windowResized = debounce(300, () => {
      p.resizeCanvas(width || w, height || p.windowHeight * 0.75)
      child.onResize && child.onResize()
    })
  }

}

const ignoreSpace =(e) => {
  if (e.keyCode == 32) {
    e.preventDefault()
  }
}

onMount(()  => { new p5(run, element) });

</script>

<svelte:window on:keydown={ignoreSpace} />

<div
  class="m-0 p-0 object-contain h-full"
  bind:clientWidth={w}
  bind:this={element}
></div>

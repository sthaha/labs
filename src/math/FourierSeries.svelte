
<script lang='typescript'>
export let location;

import p5 from "p5";
import Canvas from "../p5/Canvas.svelte";

let dt = 0.0;

const sketch = (p: p5, el) => {

  const setup = () => {
  }

  const onResize = ()=> {
  }

  const update = ()=> {
  }

  p.draw = () => {
    p.background(0);
    update()

  };

  return {setup, onResize}

};
</script>

<div class="flex flex-col">

  <div class="h-95 min-w-full">
    <Canvas sketch={sketch} />
  </div>

  <div class="table w-full">
    <div class="table-row-group">
      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">t: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> {dt} </p>
        <input class="table-cell align-left" type=range min="0" max=100 bind:value={dt} >
      </div>
    </div>
  </div>

</div>

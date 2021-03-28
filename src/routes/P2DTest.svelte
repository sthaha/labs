
<script lang='typescript'>
  export let location;

  import { onMount } from"svelte";
  import p5 from "p5";
  import Canvas from "../p5/Canvas.svelte";

  let width;
  let height;


  let x = 100;
  let y = 100;
  let vx = 1;
  let vy = 1;

  let dt = 0.0;

  const sketch = (p: p5, el) => {

    let w = p.random(50, 100)
    let h= p.random(50, 100)

    const setup = () => {
      width = p.width - w
      height = p.height -h

      x  = width/2 - w/2
      y  = height/2 - h/2
    }

    const update = ()=> {
      x += vx * dt
      y += vy * dt
    }

    const draw = () => {
      p.background(0);
      update()
      p.fill(255);
      p.rect(x, y, w, h);
    };

    return {setup, draw}

  };




</script>

<div class="flex flex-col">

  <Canvas height=400 sketch={sketch} />

  <div class="table w-full">
    <div class="table-row-group">
      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">x: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> { Math.round(x)} </p>
        <input class="table-cell align-left" type=range min="0" max={width} bind:value={x} >
      </div>

      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">y: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> { Math.round(y)} </p>
        <input class="table-cell align-left" type=range min="0" max={height} bind:value={y} >
      </div>
    </div>
  </div>

</div>

<script lang='typescript'>
export let location;

import Canvas from "../../p5/Canvas.svelte";

let speed = 0.01

const sketch = (p: p5, el) => {

  let x = 100;
  let y = 100;
  let w = p.random(50, 100)
  let h= p.random(50, 100)


  p.draw = () => {
    p.background(0);
    p.normalMaterial();
    p.translate(0, 0, 0);

    p.push();
    p.rotateZ(p.frameCount * speed);
    p.rotateX(p.frameCount * speed);
    p.rotateY(p.frameCount * speed);
    p.torus(70, 20);
    p.pop();
  };

  return {}

};
</script>

<div class="flex flex-col">

  <Canvas mode="3D" sketch={sketch} />

  <div class="table w-full">
    <div class="table-row-group">

      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">speed: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> { speed.toFixed(2)} </p>
        <input class="table-cell align-left" type=range step="0.01" min="0.0" max="0.1" bind:value={speed} >
      </div>

    </div>
  </div>

</div>


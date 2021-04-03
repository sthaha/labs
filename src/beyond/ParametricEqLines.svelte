<script lang='typescript'>
export let location;

import Canvas from "../p5/Canvas.svelte";
import p5 from "p5";


let dt = 0.215
let lines = 12

const sketch = (p: p5, el) => {

  const setup = () => {
    p.background(0)
    p.stroke(255)
    p.strokeWeight(4)

    p.colorMode(p.HSB)
  }

  const x1 = (t: number) => p.sin(t/10) * 180  + p.sin(t/5) * 30;
  const y1 = (t: number) => p.cos(t/10) * 120

  const x2 = (t: number) => p.sin(t/7) * 280 + p.sin(t) * 2;
  const y2 = (t: number) => p.cos(t/2) * 20 + p.sin(t/7) * 75;

  let hue = 0
  const h = (t: number) => hue++ % 256
  // const h = (t: number) =>  p.map(p.sin(t/8), -1, 1, 0, 255);

  let t = 0
  p.draw = () => {
    p.translate(p.width/2, p.height/2)

    p.background(0)
    p.stroke(h(t), 80, 80, 20)

    // p.point(x1(t), y1(t))
    // p.point(x2(t), y2(t))
    for (let i = 0; i < lines; i++){
      const ti = t + i;
      p.line(x1(ti), y1(ti), x2(ti), y2(ti))
    }
    t += dt
  }

  let looping : boolean = true
  const toggleLoop = () => {
    looping ? p.noLoop() : p.loop()
    looping = !looping
  }

  p.keyPressed = ()=> {
    switch (p.keyCode) {
      case 32: toggleLoop(); break;
      case 13: p.redraw(); break;
    }
  }

  return {setup}
};
</script>

<div class="flex flex-col">
  <Canvas sketch={sketch} />

  <div class="table w-full">
    <div class="table-row-group">
      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">speed: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> { dt.toFixed(3)} </p>
        <input class="table-cell align-left" type=range
          min="0.001" max="0.5" step="0.01" bind:value={dt} >
      </div>

      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">lines: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> {lines} </p>
        <input class="table-cell align-left" type=range
          min="1" max="24" bind:value={lines} >
      </div>
    </div>
  </div>
</div>


<script lang='typescript'>
export let location;

import p5 from "p5";
import Canvas from "../p5/Canvas.svelte";

let dt = 0.008;
let r = 80.0;

let t = 0.0;
let p5js: p5

const sketch = (p: p5, el) => {

  p5js = p

  let looping : boolean = true
  const toggleLoop = () => {
    looping ? p5js.noLoop() : p5js.loop()
    looping = !looping
  }

  const setup = () => {
    p.rectMode(p.CENTER)
    looping = false
    p.noLoop()
  }

  const onResize = ()=> {
  }

  const update = ()=> {
    t += dt
  }


  const points = []

  const circle = (cx, cy, r, t, i) => {

    const d = 2 * r
    p.noFill()
    p.stroke(22, 80 + i*15, 52 + i * 10)
    p.ellipse(cx, cy, d, d)

    // point based on the rotation


    const x = p.cos(t) * r +  cx
    const y = p.sin(t) * r +  cy

    p.line(cx, cy, x, y)

    p.stroke(22, 120 + i*15, 82 + i * 10)
    p.fill(22, 120 + i*15, 82 + i * 10)
    p.ellipse(x, y, 3, 3)

    return [x, y]
  }

  let graphX = r * 3

  p.draw = () => {
    p.background(0);
    update()

    p.noFill()
    p.strokeWeight(2)
    p.stroke(98, 92, 117)


    let cr = r
    let ct = t // 4 * p.sin(t)/p.PI
    let cx = 200
    let cy = p.height/2

    let px, py

    const n = 5
    for(let i = 1; i <= n; i++) {
      [cx, cy] = circle(cx, cy, cr, ct, i)
      cr /= 3
      ct *= 2 * p.PI/i //  4 * p.sin(i*2+1 * ct) / (i*2+1 * p.PI)
      /* cx = px // + p.cos(ct) * cr */
      /* cy = py // + p.sin(ct) * cr */

      graphX = p.max(cx, graphX)
    }

    const lastY = points[points.length - 1]

    if (lastY != p.round(cy)){
      points.push(p.round(cy))
    }


    p.stroke("orange")
    for (let i = points.length - 1; i >= 0; i--) {
      p.ellipse(graphX + 50 + points.length - i, points[i], 2, 2)
    }

    /* circle(cx, cy, cr, ct) */
    /* cx = cx + p.cos(t) * (cr+cr/2) */
    /* cy = cy + p.sin(t) * (cr+cr/2) */

    /* cr /=2 */
    /* ct *=2 */
    /* circle(cx, cy, cr, ct) */

    /* cx = cx + p.cos(t) * (cr+cr/2) */
    /* cy = cy + p.sin(t) * (cr+cr/2) */

    /* cr /=2 */
    /* ct *=2 */
    /* circle(cx, cy, cr, ct) */

  };

  p.keyPressed = ()=> {
    switch (p.keyCode) {
      case 32: toggleLoop(); break;
      case 13: p.redraw(); break;
    }
  }

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
        <input class="table-cell align-left" type=range min="0.0" max="0.2" step="0.001" bind:value={dt} >
      </div>
      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">radius: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> {r} </p>
        <input class="table-cell align-left" type=range min="0" max=200 bind:value={r} >
      </div>
    </div>
  </div>

</div>

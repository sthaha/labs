<script lang='typescript'>
export let location;

import Canvas from "../p5/Canvas.svelte";
import p5 from "p5";


let dt = 0.031415
let radius = 60

const sketch = (p: p5, el) => {

  const setup = () => {
    p.background(0)
  }

  const circleX = (t, i, d, offset) => {
    p.stroke(200)
    const x = i * (d + Margin) + offset
    const y =  d/2 + 10
    p.ellipse(x, y, d, d)

    const tx = d/2 * p.cos(t) + x
    const ty = d/2 * p.sin(t) + y

    p.stroke(120, 150, 230)
    p.ellipse(tx, ty, 4, 4)
    p.stroke(120, 150, 230, 190)
    p.strokeWeight(2)
    p.line(tx, 0, tx, p.height)

    return tx

  }

  const circleY = (t, i, d, offset) => {
    p.stroke(200)
    const x =  d/2 + 10
    const y = i * (d + Margin) + offset
    p.ellipse(x, y, d, d)

    const tx = d/2 * p.cos(t) + x
    const ty = d/2 * p.sin(t) + y

    p.stroke(20, 220, 180)
    p.ellipse(tx, ty, 3, 3)
    p.stroke(20, 220, 180, 120)
    p.strokeWeight(2)
    p.line(0, ty, p.width, ty)
    return ty

  }
  let t = 0
  const Margin = 30

  const xPaths = []
  const yPaths = []
  const xs = []
const ys = []

  p.draw = () => {
    p.background(5)

    // draw N circles veritical and horizontal

    radius = p.min(p.width, p.height)/12
    const d = radius * 2
    const Offset = d * 2

    const xCircles = p.ceil( (p.width - Offset - radius) / (d + Margin))

    p.stroke(200)
    p.strokeWeight(3)
    p.noFill()

    const storePoints  = t <= p.TWO_PI
    t += dt

    for (let i = 0; i < xCircles; i++) {
      const x = circleX(t * (i+1) , i, d, Offset)
      xs[i] = x
      if (!xPaths[i]){
        xPaths[i] = []
      }
      storePoints && xPaths[i].push(x)
    }

    const yCircles = p.ceil((p.height - Offset - radius) / (d + Margin))
    for (let i = 0; i < yCircles; i++) {
      const y = circleY(t * (i+1), i, d, Offset)
      ys[i] = y
      if (!yPaths[i]){
        yPaths[i] = []
      }
      storePoints && yPaths[i].push(y)
    }

    p.stroke(100, 200, 200, 220)
    for (let x = 0; x < xCircles; x++){
      const xPath = xPaths[x]
      for (let y = 0; y < yCircles; y++){
        const yPath = yPaths[y]

        p.beginShape()
        for (let i = 0; i < xPath.length; i++){
          p.vertex(xPath[i], yPath[i])
        }
        p.endShape()
        p.ellipse(xs[x], ys[y], 3,3)

      }
    }

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
    </div>
  </div>
</div>

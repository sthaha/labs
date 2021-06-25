<script lang='typescript'>
export let location;

import Canvas from "../p5/Canvas.svelte";
import p5 from "p5";


let dt = 0.031415
let radius = 60

const sketch = (p: p5, el) => {

  const setup = () => {
    p.background(0)
    p.background(5)
    p.translate(p.width/2, p.height/2)
    p.stroke(129, 120, 200)
    p.strokeWeight(2)
    p.noFill()

    const r = 200
    const d = 2 * r
    p.ellipse(0, 0, d, d)

    const dTheta = p.TWO_PI / 6

    const vertex = []

    p.stroke(209, 120, 200)
    p.beginShape()

    for (let i = 0; i <= p.TWO_PI; i+= dTheta) {
      const x = p.cos(i) * r
      const y = p.sin(i) * r
      vertex.push({x,y})
      p.vertex(x,y)
    }
    p.endShape()


    const points = []
    const parts = 6
    p.fill(209, 180, 210)
    for (let i = 0; i < 6; i++) {
      const p1 = vertex[i]
      const p2 = vertex[(i+1) % 6]
      const dx = (p2.x - p1.x) / parts
      const dy = (p2.y - p1.y) / parts

      p.ellipse(p1.x, p1.y, 8,8)

      for (let j = 1; j < parts; j++){
        p.ellipse(p1.x + j * dx, p1.y + j * dy, 4,4)
        points.push({x:p1.x + j * dx, y: p1.y + j * dy})
      }
    }

    const len = points.length
    for (let i = 0; i< len; i++){
      const r = i %2 == 0 ? 10 : -5
      const g = i %2 == 0 ? 5 : -5
      p.stroke(209 + i * r, 220 + i * g, 210)
      const p1 = points[i]
      const p2 = points[(i+5)%len]
      p.line(p1.x, p1.y, p2.x, p2.y)
    }

  }

  let t = 0

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

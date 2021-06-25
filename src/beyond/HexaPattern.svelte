<script lang='typescript'>
export let location;

import Canvas from "../p5/Canvas.svelte";
import p5 from "p5";


let maxRadius
let radius = 60
let spacing = 0.1
let depth = 30

const sketch = (p: p5, el) => {

  const onResize = ()=> {
    maxRadius = (p.min(p.width, p.height) - 20) / 2
    radius = maxRadius
  }

  const setup = () => {
    maxRadius = (p.min(p.width, p.height) - 20) / 2
    radius = maxRadius
  }

  // for hexagon
  const dTheta = p.TWO_PI / 6

  p.draw = () => {
    p.background(5)
    p.translate(p.width/2, p.height/2)
    p.stroke(129, 120, 200)
    p.strokeWeight(2)
    p.noFill()

    p.ellipse(0, 0, 2*radius, 2*radius)


    let vertex = []

    p.stroke(209, 120, 200)
    p.beginShape()
    for (let i = 0; i >= -p.TWO_PI; i-= dTheta) {
      const x = p.cos(i) * radius
      const y = p.sin(i) * radius
      vertex.push({x,y})
      p.vertex(x,y)
      p.ellipse(x,y, 4, 4)
    }
    p.endShape()

    for (let i =0 ; i < depth; i++){
      vertex = lines(vertex, spacing, i)
    }
  }


  const lines = (vertex, d, i) => {
    const len = vertex.length
    const hexagon = []

    p.stroke(200 - i * 0.6, 120 + i * 0.8, 200)
    for (let i = 0; i < len; i++) {
        const p1 = vertex[i]
        const p2 = vertex[ (i+1) % len]
        const x = p1.x + (p2.x  - p1.x) * d
        const y = p1.y + (p2.y  - p1.y) * d
        hexagon.push({x, y})
        p.ellipse(x, y, 3,3)
    }

    for (let i = 0; i < len; i++) {
      const p1 = hexagon[i]
      const p2 = hexagon[(i+1) % len]
      p.line(p1.x, p1.y, p2.x, p2.y)
    }
    return hexagon
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
        <p class="table-cell w-12 font-mono text-right">radius: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> { radius } </p>
        <input class="table-cell align-left" type=range
               min="10" max="{maxRadius}" step="1" bind:value={radius} >
      </div>
      <div class="table-row">
          <p class="table-cell w-12 font-mono text-right">spacing: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> { spacing } </p>
          <input class="table-cell align-left" type=range
                 min="0.01" max="0.5" step="0.01" bind:value={spacing} >
      </div>
      <div class="table-row">
          <p class="table-cell w-12 font-mono text-right">depth: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> { depth } </p>
          <input class="table-cell align-left" type=range
                 min="1" max="{radius}" step="1" bind:value={ depth } >
      </div>
    </div>
  </div>
</div>

<script lang='typescript'>
import p5 from "p5";
import Button from "../ui/Button.svelte";
import Toggle from "../ui/Toggle.svelte";
import Canvas from "../p5/Canvas.svelte";

export let location;


let dt = 0.025;
let r = 60.0;
let numCircles = 4
let t = 0.0;

let p5js: p5

let looping : boolean = true
const toggleLoop = () => {
  looping ? p5js.noLoop() : p5js.loop()
  looping = !looping
}

let graph = [];
let trace = []

const reset = () => {
  t = 0.0;
  graph = []
  trace = []
  p5js.redraw()
}


const sketch = (p: p5, el) => {

  p5js = p


  const setup = () => {
    p.rectMode(p.CENTER)
    looping = false
    p.noLoop()
  }

  const onResize = ()=> {
  }

  const epicycle = (x, y, r, t, series) => {

    p.noFill()
    p.strokeWeight(p.map(series, 1, numCircles*2+1, 4, 1))
    p.stroke(22, 80 + series*15, 52 + series * 10, 180)

    //  draw the circle
    const d = 2 * r
    p.ellipse(x, y, d, d)

    // point based on the rotation (function of time) and the epicycle
    const px = p.cos(t * series) * r +  x
    const py = p.sin(t * series) * r +  y


    p.stroke(22, 120 + series*15, 82 + series * 10, 230)
    p.fill(22, 120 + series*15, 82 + series * 10, 230)

    // a line from the center to the point tracking the rotation
    p.line(x, y, px, py)
    p.ellipse(px, py, 2, 2)

    return [px, py]
  }

  let graphX = r * numCircles/2

  p.draw = () => {
    p.background(0);
    t += dt

    // initial centre of the base circle
    let cx = r * 3
    let cy = p.height/2

    for(let i = 0; i < numCircles; i++) {
      const series = i * 2 + 1; // 1, 3, 5, 7 ..
      const cr = 4 * r / (series * p.PI);
      [cx, cy] = epicycle(cx, cy, cr, t, series)

      graphX = p.max(cx+50, graphX)
    }


    // trace the points around the circle

    if (t < p.TWO_PI * 1.05){
      trace.push({x: cx, y: cy})
    }

    p.noFill()
    p.strokeWeight(2)
    p.stroke(122, 180, 220,  120)

    p.beginShape()
    for (const pt of trace) {
      p.vertex(pt.x, pt.y)
    }
    p.endShape()

    // plot the graph
    const lastY = graphX[0]

    if (lastY != p.round(cy)){
      graph.unshift(p.round(cy))
      if (graph.length > p.width * 1.5) {
        graph = graph.slice(0, p.width - graphX)
      }
    }

    p.line(cx, cy, graphX, graph[0])
    p.stroke(22, 120 + numCircles*22, 82 + numCircles*12)
    p.fill(22, 120 + numCircles*22, 82 + numCircles*12)
    p.ellipse(graphX, graph[0], 4, 4)

    p.strokeWeight(2)
    p.stroke(22, 120 + numCircles*13, 82 + numCircles*8)
    p.noFill()
    p.beginShape()
    for (let i = 0; i <= graph.length; i++) {
      p.vertex(graphX + i, graph[i])
    }
    p.endShape()

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


  <div class="min-w-full">
    <Canvas height=500 sketch={sketch} />
  </div>

  <div class="flex flex-row m-4 gap-2">
    <Toggle class="w-24" on:toggle={toggleLoop}>
      <span slot="active"> Resume </span>
      <span slot="inactive"> Pause </span>
    </Toggle>

    <Button on:click={reset}>
      <span slot="contents"> Reset </span>
    </Button>
  </div>

  <div class="table w-full">
    <div class="table-row-group">
      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">radius: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> {r} </p>
        <input class="table-cell align-left" type=range min="10" max=80 bind:value={r} >
      </div>
      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">speed: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> {dt} </p>
        <input class="table-cell align-left" type=range min="0.01" max="0.1" step="0.001" bind:value={dt} >
      </div>
      <div class="table-row">
        <p class="table-cell w-12 font-mono text-right">circles: </p>
        <p class="table-cell w-24 truncate font-mono pl-2"> {numCircles} </p>
        <input class="table-cell align-left" type=range min="1" max="10" bind:value={numCircles} >
      </div>
    </div>
  </div>

  <p class="bg-gray-600 text-gray-300 rounded p-2 justify-left my-2">
    <em>Credits:</em> Used
    <a target="_blank"
      href="https://www.youtube.com/watch?v=Mm2eYfj0SgA"
      class="text-yellow-400" > Coding Train Fourier Series </a> Tutorial as a
    reference for the Fourier Series Equations  </p>

</div>

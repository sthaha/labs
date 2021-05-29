<script lang='typescript'>
import p5 from "p5";
import Button from "../ui/Button.svelte";
import Toggle from "../ui/Toggle.svelte";
import Canvas from "../p5/Canvas.svelte";

export let location;


let t = 0.0;
let p5js: p5

let looping : boolean = true
const toggleLoop = () => {
  looping ? p5js.noLoop() : p5js.loop()
  looping = !looping
}

const vec = (x, y) => new p5.Vector(x, y)

let plot = [
  vec( 100, 156 ), vec( 99, 155 ), vec( 98, 152 ), vec( 96, 150 ),
  vec( 95, 147 ), vec( 93, 143 ), vec( 87, 132 ), vec( 85, 129 ), vec( 81, 122 ),
  vec( 80, 119 ), vec( 79, 117 ), vec( 77, 115 ), vec( 76, 113 ), vec( 74, 111 ), vec( 72, 106 ),
  vec( 71, 105 ), vec( 70, 103 ), vec( 69, 101 ), vec( 68, 100 ), vec( 67, 98 ), vec( 66, 96 ),
  vec( 64, 91 ), vec( 63, 90 ), vec( 61, 86 ), vec( 61, 85 ), vec( 60, 84 ), vec( 60, 83 ),
  vec( 60, 82 ), vec( 59, 82 ), vec( 59, 81 ), vec( 59, 80 ), vec( 59, 81 ), vec( 60, 81 ),
  vec( 60, 82 ), vec( 61, 82 ), vec( 62, 82 ), vec( 62, 83 ), vec( 64, 84 ), vec( 65, 84 ),
  vec( 66, 85 ), vec( 67, 86 ), vec( 69, 87 ), vec( 70, 88 ), vec( 72, 89 ), vec( 74, 91 ),
  vec( 76, 92 ), vec( 77, 92 ), vec( 78, 93 ), vec( 79, 93 ), vec( 80, 94 ), vec( 81, 94 ),
  vec( 82, 95 ), vec( 85, 96 ), vec( 86, 96 ), vec( 87, 97 ), vec( 88, 97 ), vec( 89, 98 ),
  vec( 91, 99 ), vec( 93, 100 ), vec( 94, 101 ), vec( 98, 103 ), vec( 102, 105 ), vec( 104, 107 ),
  vec( 106, 108 ), vec( 107, 109 ), vec( 109, 111 ), vec( 111, 112 ), vec( 112, 114 ), vec( 115, 116 ),
  vec( 116, 117 ), vec( 117, 118 ), vec( 119, 120 ), vec( 120, 121 ), vec( 122, 122 ), vec( 123, 123 ),
  vec( 124, 125 ), vec( 126, 126 ), vec( 127, 127 ), vec( 128, 128 ), vec( 131, 130 ), vec( 132, 131 ),
  vec( 133, 131 ), vec( 133, 132 ), vec( 134, 132 ), vec( 134, 133 ), vec( 135, 133 ), vec( 134, 133 ),
  vec( 132, 133 ), vec( 131, 133 ), vec( 128, 133 ), vec( 125, 133 ), vec( 122, 133 ), vec( 119, 133 ),
  vec( 112, 132 ), vec( 109, 132 ), vec( 101, 131 ), vec( 99, 130 ), vec( 96, 130 ), vec( 93, 129 ),
  vec( 91, 129 ), vec( 86, 127 ), vec( 85, 126 ), vec( 82, 126 ), vec( 77, 123 ), vec( 74, 122 ),
  vec( 73, 122 ), vec( 71, 121 ), vec( 69, 120 ), vec( 68, 119 ), vec( 67, 119 ), vec( 65, 118 ),
  vec( 64, 118 ), vec( 63, 118 ), vec( 62, 118 ), vec( 61, 118 ), vec( 59, 118 ), vec( 58, 118 ),
  vec( 56, 118 ), vec( 55, 118 ), vec( 54, 118 ), vec( 52, 118 ), vec( 51, 118 ), vec( 50, 118 ),
  vec( 49, 118 ), vec( 48, 118 ), vec( 47, 118 ), vec( 46, 118 ), vec( 47, 118 ), vec( 48, 117 ),
  vec( 49, 117 ), vec( 50, 116 ), vec( 52, 115 ), vec( 54, 114 ), vec( 57, 113 ), vec( 60, 111 ),
  vec( 63, 109 ), vec( 66, 107 ), vec( 70, 105 ), vec( 74, 101 ), vec( 81, 97 ), vec( 85, 93 ),
  vec( 86, 92 ), vec( 88, 90 ), vec( 90, 88 ), vec( 93, 84 ), vec( 94, 83 ), vec( 96, 81 ),
  vec( 99, 78 ), vec( 100, 76 ), vec( 103, 71 ), vec( 104, 69 ), vec( 105, 68 ), vec( 105, 67 ),
  vec( 106, 66 ), vec( 107, 65 ), vec( 107, 64 ), vec( 108, 63 ), vec( 108, 62 ), vec( 109, 61 ),
  vec( 110, 61 ), vec( 111, 61 ), vec( 111, 62 ), vec( 111, 63 ), vec( 111, 64 ), vec( 111, 65 ),
  vec( 111, 67 ), vec( 111, 68 ), vec( 111, 70 ), vec( 111, 72 ), vec( 109, 77 ), vec( 108, 81 ),
  vec( 107, 83 ), vec( 106, 86 ), vec( 106, 87 ), vec( 105, 90 ), vec( 105, 92 ), vec( 104, 93 ),
  vec( 104, 95 ), vec( 104, 97 ), vec( 103, 103 ), vec( 103, 104 ), vec( 103, 105 ), vec( 103, 106 ),
  vec( 103, 107 ), vec( 102, 110 ), vec( 102, 111 ), vec( 102, 112 ), vec( 102, 115 ), vec( 102, 116 ),
  vec( 102, 117 ), vec( 101, 120 ), vec( 101, 121 ), vec( 101, 122 ), vec( 101, 124 ), vec( 100, 125 ),
  vec( 100, 126 ), vec( 100, 127 ), vec( 100, 128 ), vec( 100, 129 ), vec( 100, 130 ), vec( 99, 130 ),
  vec( 99, 131 ), vec( 99, 133 ), vec( 99, 134 ), vec( 99, 135 ), vec( 99, 136 ), vec( 98, 138 ),
  vec( 98, 139 ), vec( 98, 140 ), vec( 98, 141 ), vec( 98, 142 ), vec( 98, 144 ), vec( 98, 148 ),
  vec( 98, 149 ), vec( 98, 150 ), vec( 98, 151 ), vec( 98, 152 ), vec( 98, 153 ), vec( 98, 154 ),
  vec( 98, 155 ), vec( 97, 156 ), vec( 97, 158 ), vec( 97, 159 ), vec( 96, 160 ), vec( 96, 161 ),
  vec( 96, 162 ), vec( 96, 161 ), vec( 96, 160 )
]

let recompute = true


let graph = [];
let trace = []

const reset = () => {
  t = 0.0;

  graph = [];
  recompute = true
  trace = []

  p5js.redraw()
}



const sketch = (p: p5, el) => {
  let dftX = []
  let dftY = []

  p5js = p;

  const circle = (r: number) => {
    const path = []
    for (let angle = 0; angle <= p.TWO_PI; angle += p.TWO_PI/20) {
      path.push({x: p.cos(angle) * r, y: p.sin(angle) * r })
    }
    return path
  }

  const sqWaveY = () => {
    const r = [100, -100, 100, -100, 100, -100]
    return r
  }

  const dft = (signal: number[]) => {
    const N = signal.length

    const result = signal.map((x, k) => {

      const sigma = signal.reduce((acc, x, n) => {
        const theta = 2 * p.PI * k * n / N

        const r = x * p.cos(theta)
        const i = x * p.sin(theta)

        return {real: acc.real  + r, img: acc.img - i}
      }, {real:0, img: 0})


      const real  = sigma.real / N
      const img  = sigma.img / N

      const frequency = k
      const amplitude = p.sqrt(real * real + img * img)
      const phase = p.atan2(img, real)

      return {frequency, amplitude, phase }
    })

    return result
  }


  const setup = () => {
    p.rectMode(p.CENTER)
    looping = false
    p.noLoop()
  }

  const onResize = ()=> {
  }

  const epicycle = (x, y, t, freq, amp, phase) => {

    p.noFill()
    p.strokeWeight(2) // todo
    p.stroke(22, 80 + freq*15, 52 + freq * 10, 220)

    //  draw the circle
    const d = 2 * amp
    p.ellipse(x, y, d, d)

    // point based on the rotation (function of time) and the epicycle
    const px = p.cos(t * freq + phase) * amp +  x
    const py = p.sin(t * freq + phase) * amp +  y


    p.stroke(22, 120 + freq*15, 82 + freq * 10, 230)
    p.fill(22, 120 + freq*15, 82 + freq * 10, 230)

    // a line from the center to the point tracking the rotation
    p.line(x, y, px, py)
    p.ellipse(px, py, 2, 2)

    return [px, py]
  }

  const normalize =(points) => {
    // find the left, top, right, bottom points

    let left = points[0]
    let top = points[0]
    let bottom = points[0]
    let right = points[0]

    for (const pt of points) {
      if (pt.x < left.x){
        left = pt
      }
      if (pt.x > right.x){
        right = pt
      }
      if (pt.y < top.y){
        top = pt
      }
      if (pt.y > bottom.y){
        bottom = pt
      }
    }

    const shiftX = (right.x - left.x) /2
    const shiftY = (bottom.y - top.y) /2
    /* console.log({top, bottom, shiftY}) */
    /* console.log({left, right, shiftX}) */

    const tv = p.createVector(-shiftX, -shiftY)

    return points.map(v => {
      v = v.copy()
      v.add(tv)
      v.rotate(-p.PI/2)
      return v
    })
  }

  const computeDFT = () => {
    if (!recompute){
      return
    }

    /* plot = circle(50) */
    const norm = normalize(plot)
    /* console.log({norm}) */

    dftX = dft(norm.map(c => c.x))
    dftY = dft(norm.map(c => c.y))
    recompute = false
  }

  p.draw = () => {
    p.background(0);
    if (plot.length == 0){
      return
    }

    computeDFT()
    t += p.TWO_PI/dftX.length

    let leftX = p.width/2
    let leftY = 100

    for (const v of dftY) {
      const { frequency, amplitude, phase }  = v;
      [leftX, leftY] = epicycle(leftX, leftY, t, frequency, amplitude, phase - p.PI)
    }

    // initial centre of the base circle
    let topX = 100
    let topY = p.height/2
    for (const v of dftX) {
      const { frequency, amplitude, phase }  = v;
      [topX, topY] = epicycle(topX, topY, t, frequency, amplitude, phase + p.HALF_PI)
    }

    // todo trace the points around the circle

    // push to the graph
    if (t <= p.TWO_PI * 1.05){
      const last = graph[graph.lenth-1]
      const x = p.round(leftX)
      const y = p.round(topY)
      if (!last || last.x != x || last.y != y){
        graph.push({x, y})
      }
    }

    const numCircles = dftX.length

    p.line(leftX, leftY, leftX, topY)
    p.line(topX, topY, leftX, topY)

    p.stroke(200)
    p.fill(200)
    p.ellipse(leftX, topY, 4, 4)

    p.strokeWeight(2)
    p.stroke(200, 200, 200)
    p.noFill()

    p.beginShape()
    for (const g of  graph) {
      p.vertex(g.x, g.y)
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

let refreshScribble = true

const clearScribble = () => {
  plot = []
  refreshScribble = true
}


const scribble = (p: p5, el) => {

  const setup = () => {
    p.strokeWeight(2)
    p.stroke(200, 200, 200)
    p.noFill()

  }

  p.touchMoved = () => {
    const x = p.mouseX
    const y = p.mouseY

    if (x < 0 || x > p.width || y < 0 ||  y > p.height){
      return
    }

    const last = plot[plot.length -1]
    if (last && last.x == x && last.y == y){
      return
    }

    plot.push(p.createVector(x, y))
    refreshScribble = true
    return false

  }

  p.draw = () => {
    if (!refreshScribble){
      return
    }
    refreshScribble = false

    /* console.log({plot}) */
    p.background(40)
    p.beginShape()
    for (const pt of  plot) {
      p.vertex(pt.x, pt.y)
    }
    p.endShape()

  }
  return {setup}
}

</script>

<div class="flex flex-col">

  <div class="min-w-full">
    <Canvas height=200 sketch={scribble} />
  </div>
  <div class="flex flex-row m-4 gap-2">
    <Button on:click={clearScribble}>
      <span slot="contents"> Clear </span>
    </Button>
  </div>

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
    </div>
  </div>

  <p class="bg-gray-600 text-gray-300 rounded p-2 justify-left my-2">
    <em>Credits:</em> Used
    <a target="_blank"
      href="https://www.youtube.com/watch?v=Mm2eYfj0SgA"
      class="text-yellow-400" > Coding Train Fourier Series </a> Tutorial as a
    reference for the Fourier Series Equations  </p>

</div>

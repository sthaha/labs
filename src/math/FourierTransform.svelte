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

let plot = [
    { x: 62, y: 139 }, { x: 61, y: 120 }, { x: 56, y: 99 }, { x: 55, y: 93 },
    { x: 54, y: 83 }, { x: 54, y: 75 }, { x: 54, y: 74 }, { x: 54, y: 67 },
    { x: 54, y: 65 }, { x: 54, y: 64 }, { x: 54, y: 61 }, { x: 54, y: 60 },
    { x: 54, y: 58 }, { x: 54, y: 55 }, { x: 54, y: 54 }, { x: 54, y: 52 },
    { x: 54, y: 51 }, { x: 54, y: 50 }, { x: 55, y: 49 }, { x: 56, y: 49 },
    { x: 57, y: 49 }, { x: 58, y: 49 }, { x: 59, y: 49 }, { x: 60, y: 49 },
    { x: 65, y: 53 }, { x: 66, y: 53 }, { x: 66, y: 54 }, { x: 66, y: 55 },
    { x: 65, y: 60 }, { x: 61, y: 61 }, { x: 55, y: 58 }, { x: 53, y: 52 },
    { x: 54, y: 52 }, { x: 60, y: 53 }, { x: 83, y: 67 }, { x: 84, y: 67 },
    { x: 114, y: 74 }, { x: 117, y: 75 }, { x: 160, y: 80 }, { x: 161, y: 80 },
    { x: 162, y: 80 }, { x: 170, y: 82 }, { x: 171, y: 82 }, { x: 173, y: 83 },
    { x: 174, y: 83 }, { x: 173, y: 83 }, { x: 171, y: 83 }, { x: 156, y: 83 },
    { x: 125, y: 93 }, { x: 123, y: 94 }, { x: 122, y: 95 }, { x: 120, y: 96 },
    { x: 119, y: 97 }, { x: 117, y: 98 }, { x: 116, y: 99 }, { x: 114, y: 99 },
    { x: 113, y: 101 }, { x: 111, y: 101 }, { x: 110, y: 102 }, { x: 109, y: 103 },
    { x: 86, y: 116 }, { x: 84, y: 117 }, { x: 76, y: 123 }, { x: 75, y: 124 },
    { x: 74, y: 125 }, { x: 73, y: 125 }, { x: 73, y: 126 }, { x: 72, y: 126 },
    { x: 71, y: 126 }, { x: 71, y: 127 }, { x: 70, y: 127 }, { x: 70, y: 128 },
    { x: 67, y: 130 }, { x: 65, y: 133 }, { x: 63, y: 136 }, { x: 62, y: 138 },
    { x: 62, y: 139 }, { x: 62, y: 138 }

  //  { x: 100, y: 156 }, { x: 99, y: 155 }, { x: 98, y: 152 },
  //  { x: 96, y: 150 }, { x: 95, y: 147 }, { x: 93, y: 143 },
  //  { x: 87, y: 132 }, { x: 85, y: 129 }, { x: 81, y: 122 },
  //  { x: 80, y: 119 }, { x: 79, y: 117 }, { x: 77, y: 115 },
  //  { x: 76, y: 113 }, { x: 74, y: 111 }, { x: 72, y: 106 },
  //  { x: 71, y: 105 }, { x: 70, y: 103 }, { x: 69, y: 101 },
  //  { x: 68, y: 100 }, { x: 67, y: 98 }, { x: 66, y: 96 },
  //  { x: 64, y: 91 }, { x: 63, y: 90 }, { x: 61, y: 86 },
  //  { x: 61, y: 85 }, { x: 60, y: 84 }, { x: 60, y: 83 },
  //  { x: 60, y: 82 }, { x: 59, y: 82 }, { x: 59, y: 81 },
  //  { x: 59, y: 80 }, { x: 59, y: 81 }, { x: 60, y: 81 },
  //  { x: 60, y: 82 }, { x: 61, y: 82 }, { x: 62, y: 82 },
  //  { x: 62, y: 83 }, { x: 64, y: 84 }, { x: 65, y: 84 },
  //  { x: 66, y: 85 }, { x: 67, y: 86 }, { x: 69, y: 87 },
  //  { x: 70, y: 88 }, { x: 72, y: 89 }, { x: 74, y: 91 },
  //  { x: 76, y: 92 }, { x: 77, y: 92 }, { x: 78, y: 93 },
  //  { x: 79, y: 93 }, { x: 80, y: 94 }, { x: 81, y: 94 },
  //  { x: 82, y: 95 }, { x: 85, y: 96 }, { x: 86, y: 96 },
  //  { x: 87, y: 97 }, { x: 88, y: 97 }, { x: 89, y: 98 },
  //  { x: 91, y: 99 }, { x: 93, y: 100 }, { x: 94, y: 101 },
  //  { x: 98, y: 103 }, { x: 102, y: 105 }, { x: 104, y: 107 },
  //  { x: 106, y: 108 }, { x: 107, y: 109 }, { x: 109, y: 111 },
  //  { x: 111, y: 112 }, { x: 112, y: 114 }, { x: 115, y: 116 },
  //  { x: 116, y: 117 }, { x: 117, y: 118 }, { x: 119, y: 120 },
  //  { x: 120, y: 121 }, { x: 122, y: 122 }, { x: 123, y: 123 },
  //  { x: 124, y: 125 }, { x: 126, y: 126 }, { x: 127, y: 127 },
  //  { x: 128, y: 128 }, { x: 131, y: 130 }, { x: 132, y: 131 },
  //  { x: 133, y: 131 }, { x: 133, y: 132 }, { x: 134, y: 132 },
  //  { x: 134, y: 133 }, { x: 135, y: 133 }, { x: 134, y: 133 },
  //  { x: 132, y: 133 }, { x: 131, y: 133 }, { x: 128, y: 133 },
  //  { x: 125, y: 133 }, { x: 122, y: 133 }, { x: 119, y: 133 },
  //  { x: 112, y: 132 }, { x: 109, y: 132 }, { x: 101, y: 131 },
  //  { x: 99, y: 130 }, { x: 96, y: 130 }, { x: 93, y: 129 },
  //  { x: 91, y: 129 }, { x: 86, y: 127 }, { x: 85, y: 126 },
  //  { x: 82, y: 126 }, { x: 77, y: 123 }, { x: 74, y: 122 },
  //  { x: 73, y: 122 }, { x: 71, y: 121 }, { x: 69, y: 120 },
  //  { x: 68, y: 119 }, { x: 67, y: 119 }, { x: 65, y: 118 },
  //  { x: 64, y: 118 }, { x: 63, y: 118 }, { x: 62, y: 118 },
  //  { x: 61, y: 118 }, { x: 59, y: 118 }, { x: 58, y: 118 },
  //  { x: 56, y: 118 }, { x: 55, y: 118 }, { x: 54, y: 118 },
  //  { x: 52, y: 118 }, { x: 51, y: 118 }, { x: 50, y: 118 },
  //  { x: 49, y: 118 }, { x: 48, y: 118 }, { x: 47, y: 118 },
  //  { x: 46, y: 118 }, { x: 47, y: 118 }, { x: 48, y: 117 },
  //  { x: 49, y: 117 }, { x: 50, y: 116 }, { x: 52, y: 115 },
  //  { x: 54, y: 114 }, { x: 57, y: 113 }, { x: 60, y: 111 },
  //  { x: 63, y: 109 }, { x: 66, y: 107 }, { x: 70, y: 105 },
  //  { x: 74, y: 101 }, { x: 81, y: 97 }, { x: 85, y: 93 },
  //  { x: 86, y: 92 }, { x: 88, y: 90 }, { x: 90, y: 88 },
  //  { x: 93, y: 84 }, { x: 94, y: 83 }, { x: 96, y: 81 },
  //  { x: 99, y: 78 }, { x: 100, y: 76 }, { x: 103, y: 71 },
  //  { x: 104, y: 69 }, { x: 105, y: 68 }, { x: 105, y: 67 },
  //  { x: 106, y: 66 }, { x: 107, y: 65 }, { x: 107, y: 64 },
  //  { x: 108, y: 63 }, { x: 108, y: 62 }, { x: 109, y: 61 },
  //  { x: 110, y: 61 }, { x: 111, y: 61 }, { x: 111, y: 62 },
  //  { x: 111, y: 63 }, { x: 111, y: 64 }, { x: 111, y: 65 },
  //  { x: 111, y: 67 }, { x: 111, y: 68 }, { x: 111, y: 70 },
  //  { x: 111, y: 72 }, { x: 109, y: 77 }, { x: 108, y: 81 },
  //  { x: 107, y: 83 }, { x: 106, y: 86 }, { x: 106, y: 87 },
  //  { x: 105, y: 90 }, { x: 105, y: 92 }, { x: 104, y: 93 },
  //  { x: 104, y: 95 }, { x: 104, y: 97 }, { x: 103, y: 103 },
  //  { x: 103, y: 104 }, { x: 103, y: 105 }, { x: 103, y: 106 },
  //  { x: 103, y: 107 }, { x: 102, y: 110 }, { x: 102, y: 111 },
  //  { x: 102, y: 112 }, { x: 102, y: 115 }, { x: 102, y: 116 },
  //  { x: 102, y: 117 }, { x: 101, y: 120 }, { x: 101, y: 121 },
  //  { x: 101, y: 122 }, { x: 101, y: 124 }, { x: 100, y: 125 },
  //  { x: 100, y: 126 }, { x: 100, y: 127 }, { x: 100, y: 128 },
  //  { x: 100, y: 129 }, { x: 100, y: 130 }, { x: 99, y: 130 },
  //  { x: 99, y: 131 }, { x: 99, y: 133 }, { x: 99, y: 134 },
  //  { x: 99, y: 135 }, { x: 99, y: 136 }, { x: 98, y: 138 },
  //  { x: 98, y: 139 }, { x: 98, y: 140 }, { x: 98, y: 141 },
  //  { x: 98, y: 142 }, { x: 98, y: 144 }, { x: 98, y: 148 },
  //  { x: 98, y: 149 }, { x: 98, y: 150 }, { x: 98, y: 151 },
  //  { x: 98, y: 152 }, { x: 98, y: 153 }, { x: 98, y: 154 },
  //  { x: 98, y: 155 }, { x: 97, y: 156 }, { x: 97, y: 158 },
  //  { x: 97, y: 159 }, { x: 96, y: 160 }, { x: 96, y: 161 },
  //  { x: 96, y: 162 }, { x: 96, y: 161 }, { x: 96, y: 160 }
]

let recompute = true


let graph = [];
let trace = []

const reset = () => {
  t = 0.0;
  plot = []
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

      return {real, img, frequency, amplitude, phase }
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
    p.strokeWeight(1) // todo
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

  const computeDFT = () => {
    if (!recompute){
      return
    }

    dftX = dft(plot.map(c => c.x))
    dftY = dft(plot.map(c => c.y))
    recompute = false
  }

  p.draw = () => {
    p.background(0);
    if (plot.length == 0)
      return

    computeDFT()
    t += p.TWO_PI/dftX.length

    // initial centre of the base circle
    let leftX = 100
    let leftY = p.height/2


    // xs need to be phase shifted
    for (const v of dftX) {
      const { frequency, amplitude, phase }  = v;
      [leftX, leftY] = epicycle(leftX, leftY, t, frequency, amplitude, phase + p.HALF_PI)
    }

    // initial centre of the base circle
    let topX = p.width * 0.3
    let topY = 100
    for (const v of dftY) {
      const { frequency, amplitude, phase }  = v;
      [topX, topY] = epicycle(topX, topY, t, frequency, amplitude, phase)
    }

    // todo trace the points around the circle

    // push to the graph
    if (t <= p.TWO_PI * 1.1){
      const last = graph[0]
      const x = p.round(topX)
      const y = p.round(leftY)
      if (!last || last.x != x || last.y != y){
        graph.unshift({x: p.round(topX), y: p.round(leftY)})
      }
    }

    const numCircles = dftX.length

    p.line(leftX, leftY, topX, leftY)
    p.line(topX,  topY, topX, leftY)

    /* p.stroke(200) */
    /* p.fill(200) */
    /* p.ellipse(leftX, graph[0], 4, 4) */

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

    plot.push({x,y})
    refreshScribble = true
    return false

  }

  p.draw = () => {
    if (!refreshScribble){
      return
    }
    refreshScribble = false

    console.log({plot})
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

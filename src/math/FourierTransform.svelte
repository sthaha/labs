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

let graph = [];
let trace = []

const reset = () => {
  t = 0.0;
  graph = []
  trace = []
  p5js.redraw()
}



const sketch = (p: p5, el) => {

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

    console.log({signal, result})
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

  const circlePath = circle(100)
  const dftX = dft(circlePath.map(c => c.x))
  const dftY = dft(circlePath.map(c => c.y))

  p.draw = () => {
    p.background(0);

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
      console.log(g.x, g.y)
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
    </div>
  </div>

  <p class="bg-gray-600 text-gray-300 rounded p-2 justify-left my-2">
    <em>Credits:</em> Used
    <a target="_blank"
      href="https://www.youtube.com/watch?v=Mm2eYfj0SgA"
      class="text-yellow-400" > Coding Train Fourier Series </a> Tutorial as a
    reference for the Fourier Series Equations  </p>

</div>

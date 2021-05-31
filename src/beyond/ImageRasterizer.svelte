<script lang='typescript'>
export let location;

import Canvas from "../p5/Canvas.svelte";
import p5 from "p5";


let dt = 0.215
let lines = 12

const sketch = (p: p5, el) => {

  let img: p5.Image

  const setup = () => {
    p.background(0)
    p.noStroke()
    p.fill("black");

    const loc = 'http://192.168.2.10:5000/foobar.png'

    img = p.loadImage(loc);
    console.log(img.width, img.height)
  }


  let t = 0
  let tileSize  = 8
  let dotSize  = 4
  p.draw = () => {
    p.background(255)
    p.noStroke()
    p.fill("black")
    img.resize(p.width, p.height)
    /* console.log("draw: ", img.width, img.height) */


    /* p.translate(-p.width/2, -p.height/2) */

    const c = img.get(p.mouseX, p.mouseY)
    p.fill(c)
    const b = p.brightness(c)
    /* console.log({c, b: p.brightness(c)}) */
    p.ellipse(p.width/2, p.height/2, 18, 18)

    const xTiles = img.width/tileSize
    const yTiles = img.height/tileSize


    for (let y =0; y < yTiles; y++) {
      const iy = y * tileSize

      for (let x =0; x < xTiles; x++) {
        const ix = x * tileSize
        const clr = img.get(ix, iy)
        const b = p.brightness(clr)

        const sz = p.map(b, 5, 80, 1.0, 0.0) * dotSize
        p.fill(clr)
        p.ellipse(ix, iy, sz)
      }
    }
    p.fill("black")
    p.text(`${xTiles} x ${yTiles}: ${c}, ${b}`, 100, 100)
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
  <div class="flex bg-red-200 justify-center ">
    <Canvas sketch={sketch} width=574 height=574 />
  </div>

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

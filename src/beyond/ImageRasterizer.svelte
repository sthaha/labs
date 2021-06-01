<script lang='typescript'>
export let location;

import Canvas from "../p5/Canvas.svelte";
import p5 from "p5";


let dt = 0.215
let lines = 12

const sketch = (p: p5, el) => {

  let processed : () => {}

  let img: p5.Image
  let xTiles = 0
  let yTiles = 0

  const setup = () => {
    p.background(0)
    p.noStroke()
    p.fill("black");

    const loc = 'http://192.168.2.10:5000/foobar.png'
    processed = rasterizeImage(loc)

  }



  let loaded = false;
  const rasterized = []

  const rasterizeImage = (loc) => {
    const rasterizeRow = (r, x, size) => {
      const limit = p.min(x+size, xTiles)
      if (x == 0) {
        rasterized[y] = []
      }
      for ( ;x < limit; x++) {
        const ix = x * tileSize
        const iy = r * tileSize

        const clr = img.get(ix, iy)
        const b = p.brightness(clr)
        const sz = p.map(b, 15, 80, 1.0, 0.0) * dotSize

        rasterized[y][x] = {b, sz, clr}
      }
      return limit == xTiles ? [r+1, 0] : [r, limit]
    }

    let y = 0;
    let x = 0;
    let step = 0;
    let done = false;

    return () => {
      if (done) {
        return true
      }

      switch (step++) {
        case 0:
          img = p.loadImage(loc, () => loaded=true);
          return false

        case 1:
          if(!loaded){
            step = 1;
            return false
          }
          img.resize(500, 500)
          return false

        case 2:
          yTiles = img.height/tileSize
          xTiles = img.width/tileSize
          return false

        default:
          if (y < yTiles){
            [y, x] = rasterizeRow(y, x, 30)
            return false
          }
        done = true
        return true
      }

    }
  }

  let t = 0
  let tileSize  = 8
  let dotSize  = 5

  p.draw = () => {
    p.background(255)
    if (!processed()) {

      if (loaded) {
        p.image(img, 0, 0)
        const c = img.get(p.mouseX, p.mouseY)
        p.fill(c)
        const b = p.brightness(c)
        /* console.log({c, b: p.brightness(c)}) */
        p.ellipse(p.width/2, p.height/2, 18, 18)
      }
      /* p.text("Processing ...", p.width/2, p.height/2) */
      return
    }
    p.fill("black")
    if (t == 0){
      console.log(rasterized)
      t++
    }

    for (let y = 0; y < yTiles; y++){
      const iy = y * tileSize

      for (let x = 0; x < xTiles; x++){
        const ix = x * tileSize
        const {b, sz} = rasterized[y][x]
        p.ellipse(ix, iy, sz, sz)
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

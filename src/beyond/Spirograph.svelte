<script lang='typescript'>
export let location;

import Canvas from "../p5/Canvas.svelte";
import Button from "../ui/Button.svelte";
import Toggle from "../ui/Toggle.svelte";

import p5 from "p5";


type Point = {x: number, y: number}

let innerRadius     // computed in setup
let outerRadius     // computed in setup

let dotSpeed = 1    // angular velocity of the dot degrees

// number of rotations of inner circle for every complete rotation of the dot
let rotateSpeed = 1.618 * 2 // twice golden
let dot = 1


let width = 0
let height = 0

$: maxSize =  Math.round(Math.min(width, height)/2)

let p5js: p5


let showOuter = true
const toggleOuter = () => { showOuter = !showOuter; p5js.redraw() }

let showInner = true
const toggleInner = () => { showInner = !showInner; p5js.redraw() }

let looping : boolean = true
const toggleLoop = () => {
  looping ? p5js.noLoop() : p5js.loop()
  looping = !looping
}


// angle keeps incrementing at dotSpeed
let innerAngle = 0
let angle = 0
let points: Point[] = []
let cycleCompleted = false

const clear = () => {
  innerAngle = 0
  angle = 0
  points = []
  cycleCompleted = false
  p5js.redraw()
}

const sketch = (p: p5, el) => {

  p5js = p

  const setup = () => {
    width = p.width
    height = p.height

    const maxRadius =  Math.round(Math.min(width, height)/2)
    outerRadius = maxRadius * 0.75
    innerRadius = outerRadius / 2.5

    p.angleMode(p.DEGREES)
    /*toggleLoop()*/
  }



  // dot is the point that draws the dots; 1.0 means the dot is on the
  // inner-circle; < 1.0 inside and > outside the inner-circle
  // actualPoint = innerRadius * dot
  p.draw = () => {

    p.background(0)
    p.translate(p.width/2, p.height/2)
    p.scale(1, -1)

    drawAxis()
    drawOuterCirle()
    drawInnerCirlcePath()

    const radiusRatio = innerRadius/outerRadius

    angle =  -(rotateSpeed * innerAngle % 360)
    /*console.log("inner:",  innerAngle, " | outer: ", angle,  "ratio: ", radiusRatio,*/
                /*"completed: ",  cycleCompleted, "points:", points.length  )*/

    // center of the inner circle
    const rotateRadius = outerRadius - innerRadius
    const x = p.cos(angle) * rotateRadius
    const y = p.sin(angle) * rotateRadius
    drawInnerCirlce(x, y)


    // mark a point in the inner circle at innerAngle
    const dotX = p.round(x + p.cos(innerAngle) * innerRadius * dot, 2)
    const dotY = p.round(y + p.sin(innerAngle) * innerRadius * dot, 2)

    if (!cycleCompleted){
      const prev = points[points.length -1]

      if (!prev || prev.x !== dotX || prev.y !== dotY){
        points.push({x: dotX, y: dotY})
      }
    }

    //p.fill(200, 180)
    plotPoints()

    p.stroke(20, 225, 245, 215)
    p.strokeWeight(5)
    p.noFill()
    p.ellipse(dotX, dotY, 6, 6)



    if (angle == 0 && innerAngle != 0 && innerAngle % 360 == 0) {
      innerAngle = 0
      cycleCompleted = true
    }

    innerAngle += dotSpeed

  }

  const plotPoints = () => {
    p.noFill()
    p.stroke(0, 225, 145, 165)
    p.strokeWeight(2)
    p.beginShape()
    for (let pt of points) {
      p.vertex(pt.x, pt.y)
    }

    p.endShape()
    /*p.endShape(cycleCompleted ? p.CLOSE : undefined)*/
    // if (cycleCompleted) {
    //   p.endShape(p.CLOSE)

    // } else {
    //   p.endShape()
    // }
  }



  function drawAxis() {
    // Y
    p.strokeWeight(3)
    p.stroke(230,0,0, 180)
    p.line(0,0, 0,p.height)

    p.stroke(160,0,0, 120)
    p.line(0,0, 0, -p.height)

    // X
    p.stroke(0,230,0, 180)
    p.line(0,0, p.width, 0)

    p.stroke(0,160,0, 120)
    p.line(0,0, -p.width, 0)

    p.noStroke()
    p.fill(120,122, 128, 180)
    p.ellipse(0, 0, 8, 8)
  }

  function drawOuterCirle() {
    if (!showOuter){
      return
    }

    p.noFill()
    p.stroke(122, 155, 205, 200)
    p.strokeWeight(3)
    p.ellipse(0, 0, outerRadius*2, outerRadius*2)
  }

  function drawInnerCirlcePath() {
    if (!showInner){
      return
    }

    p.noFill()
    p.strokeWeight(2)
    p.stroke(122, 100, 55, 180)
    const d = (outerRadius - innerRadius) * 2
    p.ellipse(0, 0, d, d)
  }

  function drawInnerCirlce(x: number, y: number) {
    if (!showInner){
      return
    }
    p.noFill()
    p.stroke(222, 125, 105, 225)
    p.strokeWeight(2)
    p.ellipse(x, y, innerRadius*2, innerRadius*2)

    p.stroke(222, 125, 105, 225)
    p.strokeWeight(5)
    p.ellipse(x, y, 4, 4)
  }


  p.keyPressed = ()=> {
    switch (p.keyCode) {
      case 27: clear(); break;
      case 32: toggleLoop(); break;
      case 13: p.redraw(); break;
    }
  }

  return {setup}
};
</script>

<div class="flex flex-col">

  <Canvas height=400 sketch={sketch} />

  <div class="mt-2 table w-full">
    <div class="table-row-group">
      <div class="sm:hidden">

        <div class="table-row">
          <p class="table-cell w-12 font-mono text-right">sketch: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> </p>
          <div class="table-cell p-2">
            <Toggle invert="true" on:toggled={toggleLoop}>
              <span slot="active"> Pause </span>
              <span slot="inactive"> Animate </span>
            </Toggle>
          </div>
          <div class="table-cell p-2">
            <Button on:click={clear}><span slot="contents">Reset </span></Button>
          </div>
        </div>

        <div class="table-row">
          <p class="table-cell w-12 font-mono text-right">outer: </p>
          <p class="table-cell w-24 truncate text-xs font-mono pl-2"> { Math.round(outerRadius)} </p>

          <input class="table-cell align-left" type=range
            min="1" max={maxSize} bind:value={outerRadius} />
          <div class = "table-cell px-2">
            <Toggle on:toggled={toggleOuter} ></Toggle>
          </div>
        </div>

        <div class="table-row">
          <p class="table-cell w-24 font-mono text-right">inner: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> { Math.round(innerRadius)} </p>

          <input class="table-cell align-left" type=range
            min="1" max={maxSize} bind:value={innerRadius} />

          <div class = "table-cell px-2">
            <Toggle on:toggled={toggleInner} ></Toggle>
          </div>
        </div>

        <div class="table-row">
          <p class="flex-shirk-0 table-cell w-32 font-mono text-right">dot speed: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> {dotSpeed} </p>
          <input class="table-cell align-left" type=range
            min="0.0" max="10" step="0.1" bind:value={dotSpeed} />
        </div>

        <div class="table-row">
          <p class="table-cell w-12 font-mono text-right">rotation: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> {rotateSpeed} </p>
          <input class="table-cell align-left" type=range
            min="0.0" max="30.0" step="0.1" bind:value={rotateSpeed} />
        </div>

        <div class="table-row">
          <p class="table-cell w-12 font-mono text-right">dot: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> {dot} </p>
          <input class="table-cell align-left" type=range
            min="0" max="2.0" step="0.1" bind:value={dot} />
        </div>
      </div>

      <div class="hidden sm:block">
        <div class="table-row">
          <p class="table-cell w-12 font-mono text-right">outer: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> { Math.round(outerRadius)} </p>
          <input class="table-cell align-left" type=range
            min="1" max={maxSize} bind:value={outerRadius} />

          <p class="table-cell w-24 font-mono text-right">inner: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> { Math.round(innerRadius)} </p>
          <input class="table-cell align-left" type=range
            min="1" max={maxSize} bind:value={innerRadius} />

        </div>

        <div class="table-row">

          <p class="flex-shirk-0 table-cell w-32 font-mono text-right">dot speed: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> {dotSpeed} </p>
          <input class="table-cell align-left" type=range
            min="0.0" max="10" step="0.1" bind:value={dotSpeed} />

          <p class="table-cell w-12 font-mono text-right">rotation: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> {rotateSpeed} </p>
          <input class="table-cell align-left" type=range
            min="0.0" max="30.0" step="0.1" bind:value={rotateSpeed} />

        </div>

        <div class="table-row">
          <p class="table-cell w-12 font-mono text-right">dot: </p>
          <p class="table-cell w-24 truncate font-mono pl-2"> {dot} </p>
          <input class="table-cell align-left" type=range
            min="0" max="2.0" step="0.1" bind:value={dot} />
        </div>
      </div>
    </div>
  </div>
</div>

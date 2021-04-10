<script>
import { onDestroy } from "svelte"
import Toggle from "../ui/Toggle.svelte"
import Button from "../ui/Button.svelte"

export let location = ""

let running = false
let stopped = false

let startedAt
let beforePaused = 0
let elapsed = {
  H: 0,
  M: 0,
  S: 0,
  ms: 0,
};

$: elapsedPretty = {
  H: String(elapsed.H).padStart(2, '0'),
  M: String(elapsed.M).padStart(2, '0'),
  S: String(elapsed.S).padStart(2, '0'),
  ms: String(elapsed.ms).padStart(3, '0'),
}


const computeElapsed = () => {
  let  diff = new Date()  - startedAt + beforePaused;
  console.log({diff})

  const H = Math.floor(diff / (60 * 60 * 1000))
  diff -= H * 60 * 60 * 1000

  const M = Math.floor( diff / (60 * 1000))
  diff -= M * 60* 1000

  const S = Math.floor(diff / 1000)
  diff -= S * 1000

  const ms = diff
  console.log({H, M, S, ms, diff})

  elapsed = {H,M,S,ms}
}

const start = () => {
  running = true
  resume()
}

  let timer
const resume = () => {
  console.log("resuming ... ")
  startedAt = new Date()
  timer  = setInterval(computeElapsed, 100)
  paused = false
}

const pause = () => {
  console.log("pausing ")
  clearInterval(timer)
  beforePaused += new Date() - startedAt
  paused = true
}

const stop =() => {
  pause()
  stopped = true
}

const reset = () => {
  clearInterval(timer)
  beforePaused = 0
  startedAt = null
  stopped = false
  running = false
}

const toggleRun = () => {
  running ? reset() : start()
}


let paused = false
const togglePaused = () => {
  paused ? resume() : pause()
}


onDestroy(reset)

</script>

<div class="bg-red-300 object-contain flex flex-col">
 {#if running }
   <div class="h-32 font-mono">
     {elapsedPretty.H}:{elapsedPretty.M}:{elapsedPretty.S}.<span class="text-sm">{elapsedPretty.ms}</span>
   </div>
   <div class="flex flex-row">

    <div>
      <Button class="bg-gray-800" on:click={toggleRun}>
        <span slot="contents"> Reset </span>
      </Button >
    </div>

    {#if !stopped }
    <div>
     <Button class="bg-red-800" on:click={stop}>
       <span slot="contents">
         Stop </span>
     </Button >
   </div>
    <div>
        <Button class="bg-yellow-600" on:click={togglePaused}>
          <span slot="contents"> Pause </span>
        </Button >
    </div>
    {/if}
  </div>

 {:else}
  <div> show input time </div>
  <Button on:click={toggleRun}> <span slot="contents"> Start </span></Button >
 {/if}
</div>

<script>
import { onDestroy } from "svelte"
import Toggle from "../ui/Toggle.svelte"
import Button from "../ui/Button.svelte"

export let location = ""

let running = false

const toggleRun = () => { running ? reset() : start() }


let paused = false
const togglePaused = () => { paused ? resume() : pause() }

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


let startedAt
let beforePaused = 0

const toHMS = (t) => {

  const H = Math.floor(t / (60 * 60 * 1000))
  t -= H * 60 * 60 * 1000

  const M = Math.floor(t / (60 * 1000))
  t -= M * 60* 1000

  const S = Math.floor(t / 1000)
  t -= S * 1000

  const ms = t
  return {H, M, S, ms}
}

const computeElapsed = () => {
  let  diff = new Date()  - startedAt + beforePaused;
  elapsed = toHMS(diff)
}

const prettyTime = (t) => {
  const hms = toHMS(t)

  const H = String(hms.H).padStart(2, '0'),
  const M = String(hms.M).padStart(2, '0'),
  const S = String(hms.S).padStart(2, '0'),
  const ms = String(hms.ms).padStart(3, '0'),
  return `${H}:${M}:${S}.${ms}`

}

const start = () => {
  running = true
  next()
}

let timer
const resume = () => {
  console.log("resuming ... ")
  startedAt = new Date()
  timer  = setInterval(computeElapsed, 100)
  console.log("resumed ... ", timer)
  paused = false
}

const pause = () => {
  console.log("pausing ", timer)
  clearInterval(timer)
  beforePaused += new Date() - startedAt
  paused = true
}

let stopped = false
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
  elapsedList = []
  current = 0
}

let elapsedList=[]
let current = 0

const next = () => {
  console.log(" ... next")

  if (elapsedList.length == 0) {
    elapsedList.push({startedAt: new Date()} )
    resume()
    return
  }

  const record = elapsedList[current]

  elapsedList[current] = {
    ...record,
    paused: beforePaused,
    elapsed: {...elapsedPretty},
    endedAt: new Date()
  }
  pause()

  elapsedList.push( {startedAt: new Date()} )
  current++
  console.log({elapsedList})
  beforePaused = 0
  resume()

}


onDestroy(reset)

</script>

<div class="flex justify-center flex-col">
 {#if running }
   <p class="h-32 bg-gray-700 text-4xl text-gray-100 pt-8 text-center font-mono">
     <span class="text-bold rounded-xl px-6 p-4 bg-gray-800">{current+1}</span>:
    <span class="text-bold rounded-xl p-4 bg-gray-800">
     {elapsedPretty.H}:{elapsedPretty.M}:{elapsedPretty.S}.<span class="text-md">{elapsedPretty.ms}</span>
    </span>
   </p>
   <div class="flex flex-row py-4 justify-center space-x-4">

    {#if !stopped }
      <div>
        <Button class="w-48 font-bold" on:click={next}>
          <span slot="contents"> Next </span>
        </Button >
      </div>

      <div>
        <Button class="bg-yellow-600 w-32" on:click={togglePaused}>
          <span slot="contents"> Pause </span>
        </Button >
      </div>

      <div>
       <Button class="bg-red-800 w-24" on:click={stop}>
         <span slot="contents"> Stop </span>
       </Button >
     </div>
    {/if}

    <div>
      <Button class="bg-gray-600 w-24 " on:click={toggleRun}>
        <span slot="contents" class="text-sm"> Reset </span>
      </Button >
    </div>


  </div>

 {:else}
  <div> show input time </div>
  <Button on:click={toggleRun}> <span slot="contents"> Start </span></Button >
 {/if}


<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Elapsed
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Started At
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Paused
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ended At
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 ">
          {#each elapsedList.slice(0, current) as x, i}
            <tr class="hover:bg-blue-300 ease-in transition duration-300 bg-white">
              <td class="px-6 py-2 whitespace-nowrap"> {i+1} </td>
              <td class="px-6 py-2 font-mono whitespace-nowrap">
                {x.elapsed.H}:{x.elapsed.M}:{x.elapsed.S}.<span class="text-md">{x.elapsed.ms}</span>
              </td>
              <td class="px-6 py-2 whitespace-nowrap"> {x.startedAt.toLocaleTimeString()} </td>
              <td class="px-6 py-2 whitespace-nowrap"> {prettyTime(x.paused)} </td>
              <td class="px-6 py-2 whitespace-nowrap"> {x.endedAt.toLocaleTimeString()} </td>
            </tr>
          {/each}

        </tbody>
      </table>
    </div>
  </div>
</div>

</div>

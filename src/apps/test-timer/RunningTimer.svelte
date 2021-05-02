<script lang="ts">

import { createEventDispatcher, onMount, onDestroy } from "svelte"
import {formatTime, formatHMS, toHMS} from "./utils"
import {exportCSV} from "./export-csv"

import StopWatch from "./StopWatch.svelte"
import Counter from "./Counter.svelte"
import Toggle from "../../ui/Toggle.svelte"
import Button from "../../ui/Button.svelte"

let stopWatch
let elapsedList= []
let current= 0

const next = () => {
  stopWatch.restart()
}

const mergePrevious = () => {
  if (current == 0) {
    return
  }
  current--
  const {startedAt, elapsed } = elapsedList[current]
  stopWatch.restartAt(startedAt, elapsed)
}

const togglePaused = () => {
  stopWatch.toggleRun()
}

const stop = () => {
  stopWatch.stop()
  setState("stopped")
}



const download = () => {

  const headers = ["NO.", "Time Taken", "Started At", "Paused", "Ended At"].join(",")

  const data = headers + "\n" + elapsedList.slice(0, current).map(
      (x, i) => [
          i+1,
          formatHMS(x.elapsed),
          x.startedAt.toLocaleTimeString(),
          formatHMS(x.paused),
          x.endedAt.toLocaleTimeString(),
      ].join(",")
    ).join("\n")

  exportCSV("test-time.csv", data)
}


const dispatch = createEventDispatcher()

const cleanup = () => {
  stopWatch.reset()
  elapsedList = []
  current = 0
}

const reset = () => {
  cleanup()
  const store = window.localStorage
  store.clear()
}

const dispatchDone = () => {
  dispatch('done', {});
}

const recordTime = (e) => {
  const {startedAt, endedAt, elapsed, paused} = e.detail
  console.log(
    "time:", startedAt.toLocaleTimeString(),
    " -> ", endedAt.toLocaleTimeString(),
    " elapsed: ", formatTime(elapsed),
    " paused: ", formatHMS(paused), paused
  )

  elapsedList[current] = {
    startedAt,
    endedAt,
    elapsed,
    paused,
  }
  current++
  save()
}

let state = "stopped"
const setState = (x) => {
  console.log({from: state, to: x})
  state = x
  save()
}

const stateChanged = ({detail}) => {
  console.log("state changed: ", {detail})
  running = detail.state == State.Running
}

const save = () => {
  const store = window.localStorage
  store.setItem("state", state)
  store.setItem("elapsedList", JSON.stringify(elapsedList))
  store.setItem("current", current)

}

const restore = () =>{
  const store = window.localStorage
  const s = store.getItem("state")
  const list = JSON.parse(store.getItem("elapsedList"))
  const c = parseInt(store.getItem("current"))
  console.log({s, list, c})

  if (!s || !list || !c ) {
    console.log("no previous session found")
    return
  }
  state = s
  elapsedList = list.map(x => ({
    ...x,
    startedAt: new Date(x.startedAt),
    endedAt: new Date(x.endedAt),
  }))
  current = c
  console.log({state, elapsedList, current})
}

onMount(() => {
  restore()
  if (state == "running") {
    next()
  }
})
</script>


<div class="bg-gray-700 p-2 flex">
  <Counter value={current+1} />

  <StopWatch bind:this={stopWatch}
    on:change={recordTime}
    on:pause={ () => setState("paused")  }
    on:run={   () => setState("running") }
  />
</div>

<div class="flex flex-row py-4 justify-center space-x-4">


{#if state != "stopped" }
  <div>
    <Button enabled={state == "running"} class="w-32 font-bold" on:click={next}>
      <span slot="contents"> Next </span>
    </Button >
  </div>

  <div>
    <Button enabled={state == "running" && current >= 1}
      class="w-24" on:click={mergePrevious}
      enabledClass="bg-red-300 text-gray-100"
    >
      <span slot="contents"> Go Back </span>
    </Button >
  </div>

  <div>
    <Toggle class="bg-yellow-600 w-32"  isActive={() => state == "running"} invert={true} on:toggle={togglePaused}>
      <span slot="active" class="text-gray-200"> Pause </span>
      <span slot="inactive" class="text-gray-200" > Resume </span>
    </Toggle >
  </div>

  <div>
    <Button enabledClass = "bg-red-500 text-gray-100" class="w-24" on:click={stop}>
      <span slot="contents"> Stop </span>
    </Button >
  </div>
{:else}

  <div>
    <Button class="w-36 font-bold" on:click={togglePaused}>
      <span slot="contents" > Start </span>
    </Button >
  </div>

  <!--
  <div>
    <Button class="bg-red-400 w-32 " on:click={dispatchDone}>
      <span slot="contents" class="text-md"> Set Time </span>
    </Button >
  </div>
  -->

  {#if current >= 1 }
    <div>
      <Button enabledClass="bg-red-500 text-gray-100" class="w-24" on:click={reset}>
        <span slot="contents" class="px-2"> Reset </span>
      </Button >
    </div>

    <div>
      <Button class="bg-blue-500" on:click={download}>
        <span slot="contents"> Download </span>
      </Button >
    </div>
  {/if}
{/if}

</div>

<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-400">
        <thead class="bg-gray-700 text-gray-100">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              No
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Elapsed
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Started At
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Paused
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Ended At
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-300 ">
          {#each elapsedList.slice(0, current).reverse() as x, i}
            <tr
              class="hover:bg-blue-300 ease-in transition duration-300"
              class:bg-white={i!=0}
              class:bg-red-300={i==0 && current >= 2}
            >
              <td class="px-6 py-2 whitespace-nowrap"> {current - i} </td>
              <td class="px-6 py-2 whitespace-nowrap"> {formatHMS(x.elapsed)}</td>

              <!-- {formatHMS(x.elapsed)}<span class="text-sm text-gray-500">.{x.elapsed.ms}</span>  </td> -->
              <td class="px-6 py-2 whitespace-nowrap"> {x.startedAt.toLocaleTimeString()} </td>
              <td class="px-6 py-2 whitespace-nowrap"> {formatHMS(x.paused)}</td>
              <td class="px-6 py-2 whitespace-nowrap"> {x.endedAt.toLocaleTimeString()} </td>
            </tr>
          {/each}

        </tbody>
      </table>
    </div>
  </div>
</div>


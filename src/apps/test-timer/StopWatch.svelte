<script lang="ts">

import {onDestroy, createEventDispatcher} from "svelte"
import {formatTime, toHMS, prettyHMS} from "./utils"

export enum State {
  Running,
  Paused,
}

let state =  State.Paused

let startedAt // start of the stopwatch
let ranAt     // time at which the timer was restarted

let previousElapsed = 0
let elapsed = 0


$: elapsedPretty = prettyHMS(elapsed)

export const reset = () => {
  stopTimer()
  dispatchLap()

  state = State.Paused
  startedAt = null
  ranAt = null
  previousElapsed = 0
  elapsed = 0
}

const dispatch = createEventDispatcher()
export const pause = () => {
  previousElapsed = elapsed
  stopTimer()
  state = State.Paused
  dispatch('pause')
}

export const restart = () => {
  reset()
  run()
}

let timer
const run = () => {
  startedAt ||= new Date()
  state = State.Running
  ranAt = ranAt ? new  Date() : startedAt

  timer = setInterval(() => {
    elapsed = new Date() - ranAt + previousElapsed
  }, 15)

  console.log("run", {
    startedAt: startedAt.toLocaleTimeString(),
    ranAt: ranAt.toLocaleTimeString(),
    elapsed: formatTime(elapsed),
    prev: formatTime(previousElapsed)
  })
  dispatch('run', {state})
}

export const toggleRun = () => {
  state == State.Running ? pause() : run()
}



const dispatchLap = () : Date => {
  if (!startedAt || !ranAt) {
    console.warn("sending lap when there is no start or end")
    return
  }

  const now = new Date()

  const paused = Math.floor((now - startedAt - elapsed )/10) * 10

  console.log(" >>> change", {
    startedAt: startedAt.toLocaleTimeString(), endedAt: now.toLocaleTimeString(),
    elapsed: toHMS(elapsed),
    paused: toHMS(paused)},
    paused)

  dispatch("change", { startedAt, endedAt: now, elapsed, pause })
}



const stopTimer = () => {
  clearInterval(timer)
  timer = null
}

onDestroy(() => {
  stopTimer()
})
</script>

<div class="inline-block p-2 min-w-min bg-gray-800 text-gray-200 rounded-lg text-2xl font-mono">
  <div class="flex items-center">
    <div class="p-2 rounded-xl appearance-none outline-none"> {elapsedPretty.H} </div>
    <div class="text-gray-400">:</div>

    <div class="p-2 rounded-xl appearance-none outline-none"> {elapsedPretty.M} </div>
    <div class="text-gray-400">:</div>

    <div class="pl-2 rounded-xl appearance-none outline-none"> {elapsedPretty.S} </div>
    <div class="text-gray-400 text-sm">.</div>

    <div class="pr-2 rounded-xl appearance-none outline-none text-sm text-gray-300">
      {elapsedPretty.ms}
    </div>
  </div>
</div>

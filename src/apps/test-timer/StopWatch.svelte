<script lang="ts">

import {onDestroy, createEventDispatcher} from "svelte"
import {formatTime,, toHMS, prettyHMS} from "./utils"

export enum State {
  Running,
  Paused,
  Stopped,
}



let startedAt // start of the stopwatch
let ranAt     // time at which the timer was restarted

let previousElapsed = 0
let elapsed = 0
let state =  State.Stopped


$: elapsedPretty = prettyHMS(elapsed)

export const isRunning = () =>  state == State.Running

// after you stop you can only restart and can't pause and resume
export const stop = () => {
  if (state == State.Stopped) {
    return
  }

  stopTimer()
  dispatchLap()
  state = State.Stopped

  startedAt = null
  ranAt = null
  previousElapsed = 0
  elapsed = 0
  dispatch('stop', {state})
}

export const restart = () => {
  stop()
  run()
}

export const toggleRun = () => {
  if (state == State.Stopped) {
    return
  }
  state == State.Running ? pause() : run()
}

const dispatch = createEventDispatcher()


const computeElapsed = () => {
  elapsed = new Date() - ranAt + previousElapsed
}

const dispatchLap = () : Date => {
  // can't go to next lap when the timer itself isn't running
  if (state != State.Running) {
    return
  }

  const now = new Date()

  elapsed = toHMS(now - ranAt + previousElapsed)
  const paused =  toHMS(Math.floor((now - startedAt  - elapsed)/10) * 10)
  dispatch("lap", {startedAt, endedAt: now,  elapsed, paused})
}

let timer
const run = () => {
  startedAt ||= new Date()
  ranAt = ranAt ? new  Date() : startedAt
  timer = setInterval(computeElapsed, 20)
  state = State.Running
  dispatch('run', {state})
}


const pause = () => {
  previousElapsed += elapsed
  stopTimer()
  state = State.Paused
  dispatch('pause', {state})
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

    <div class="p-2 rounded-xl appearance-none outline-none"> {elapsedPretty.S} </div>
    <div class="text-gray-400">.</div>

    <div class="p-2 rounded-xl appearance-none outline-none"> {elapsedPretty.ms} </div>
  </div>
</div>

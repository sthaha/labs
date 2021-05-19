import { writable } from 'svelte/store'

export const time = writable(0)

const newTimer = () => {
  const {subscribe, set, update} = writable(0)

  let timer: ReturnType<typeof setTimeout>|null = null
  let startedAt: Date|undefined|number
  let lapStart: number
  let elapsed: number = 0
  let oldElapsed: number = 0

  const init = () => {
    timer = null
    startedAt = undefined
    lapStart = 0
    elapsed = 0
    oldElapsed = 0
    set(elapsed)
  }

  const setElapsed =(x: number) => {
    oldElapsed = x
    elapsed = x
    startedAt = Date.now() - x
    set(x)
  }

  const start = () => {
    if (timer) {
      console.warn("calling start on already started timer" )
      return
    }

    console.log("before start", {startedAt, lapStart, oldElapsed, elapsed})

    startedAt ||= new Date()
    lapStart = Date.now()
    oldElapsed = elapsed

    console.log("start", {startedAt, lapStart, oldElapsed, elapsed})

    timer = setInterval(() => {
      elapsed =  Date.now() - lapStart + oldElapsed
      console.log(" ... setting elapsed", timer, elapsed)
      set(elapsed)
    }, 40)
    console.log("started", {startedAt, lapStart, oldElapsed, elapsed, timer})
  }

  const stop = () => {
    if (!timer) {
      console.warn("trying to pause when timer isn't running")
      return
    }

    clearInterval(timer)
    timer = null
  }

  const reset = () => {
    stop()
    init()
    console.log("reset", {startedAt, lapStart, oldElapsed, elapsed, timer})
  }

  return {
    subscribe,
    start, stop, reset, setElapsed
  }
}

export const timer = newTimer()

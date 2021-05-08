import { writable } from 'svelte/store'

export const time = writable(0)

const newTimer = () => {
  const {subscribe, set, update} = writable(0)

  let timer: ReturnType<typeof setTimeout>|null = null
  let startedAt: Date|undefined
  let lapStart: Date|undefined
  let elapsed: number = 0
  let oldElapsed: number = 0

  const init = () => {
    timer = null
    startedAt = undefined
    lapStart = undefined
    elapsed = 0
    oldElapsed = 0
    set(elapsed)
  }

  const setElapsed =(x: number) => {
    oldElapsed = x
    elapsed = x
    const now = new Date()
    startedAt = now - x
    set(x)
  }

  const start = () => {
    if (timer) {
      console.warn("calling start on already started timer" )
      return
    }

    console.log("before start", {startedAt, lapStart, oldElapsed, elapsed})

    startedAt ||= new Date()
    lapStart = new Date()
    oldElapsed = elapsed

    console.log("start", {startedAt, lapStart, oldElapsed, elapsed})

    timer = setInterval(() => {
      const now : Date = new Date()
      elapsed =  now - lapStart + oldElapsed
      console.log(" ... setting elapsed", timer, elapsed)
      set(elapsed)
    }, 200)
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

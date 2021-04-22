import {writable, derived} from "svelte/store"
import {formatTime, toHMS} from "./utils"


const newTestDuration = ()=> {
	const duration  = writable(0);
  const { subscribe, set, update } = duration
	return {
		subscribe,
		setTime: (h: number, m: number, s: number, ms: number = 0) => set(((h*60 + m) * 60 + s) * 1000 + ms),
    reset: () => set(0),
	};
}

export const newCounter = ()=> {
  const duration  = writable(0);
  const { subscribe, set, update } = duration
  const hms = derived(duration, $d => toHMS($d))

  return {
    subscribe,
    pause: () => set(0),
    resume: () => set(0),
    elapsed: () => {}
  };
}


export const testDuration = newTestDuration()

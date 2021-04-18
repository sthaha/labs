import {writable, derived} from "svelte/store"
import {formatTime} from "./utils"


const newDuration = ()=> {
	const duration  = writable(0);
  const { subscribe, set, update } = duration
  const formatted = derived(duration, $d => formatTime($d))

	return {
		subscribe,
		setTime: (h: number, m: number, s: number, ms: number = 0) => set( (h*3600 + m*60 + s) * 1000 + ms),
    reset: () => set(0),
    formatted: () => formatted,
    tick: () => {},
	};
}

export const testTimer = newDuration()

<script>

import Button from "../ui/Button.svelte"

import {testTimer} from "./test-timer/store.ts"

import TimePicker from "./test-timer/TimePicker.svelte"
import RunningTimer from "./test-timer/RunningTimer.svelte"

export let location = ""

let running = false

const start = () => {running = true; testTimer.tick()}
const stop = () => running = false;

</script>

<div class="flex justify-center flex-col">
 {#if !running }
  <TimePicker />
  <Button on:click={start}> <span slot="contents"> Start </span></Button >
  <div> {$testTimer}:   {$testTimer.formatted()} </div>

 {:else}
   <RunningTimer on:reset={stop} />
 {/if}

</div>

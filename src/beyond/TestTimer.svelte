<script>
import { onDestroy } from "svelte"
import Toggle from "../ui/Toggle.svelte"
import Button from "../ui/Button.svelte"

import TimePicker from "./TimePicker.svelte"
import RunningTimer from "./RunningTimer.svelte"

export let location = ""

let running = false
const toggleRun = () => { running = !running }

</script>

<div class="flex justify-center flex-col">
 {#if !running }
  <TimePicker />
  <Button on:click={toggleRun}> <span slot="contents"> Start </span></Button >
 {:else}
   <RunningTimer on:reset={toggleRun} />
 {/if}

</div>

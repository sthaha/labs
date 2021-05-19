<script lang='typescript'>

import Button from '../../ui/Button.svelte'
import StatefulTimer from './StatefulTimer.svelte'

export let location;


let state
let elapsed
let newElapsed

const setState = (x) => {
  state = x
}
</script>

<div class="flex flex-col">
  <p class="bg-gray-600 text-gray-300 rounded p-2 justify-left">
    Storeless timer can be controlled by setting the state of the Timer
  </p>
  <div class="border-t border-gray-400 mt-4 py-2
    flex flex-row gap-4 justify-center font-mono ">
    <StatefulTimer bind:state={state} bind:elapsed={elapsed}/>
    <div> {elapsed} </div>
  </div>

  <div class="flex flex-row gap-4 mt-4 justify-center">
    <Button on:click={() => setState("start")} class="w-24">
      <span slot="contents"> Start </span>
    </Button>
    <Button on:click={() => setState("paused")} enabledClass="bg-yellow-400">
      <span slot="contents"> Pause </span>
    </Button>

    <Button on:click={() => setState("stopped")} enabledClass="bg-red-400">
      <span slot="contents"> Reset </span>
    </Button>
  </div>

  <div class="flex flex-row gap-4 mt-4 justify-center">
    <input type=number bind:value={newElapsed} class="w-24 px-2" />

    <Button on:click={() => elapsed = newElapsed } enabledClass="bg-yellow-800">
      <span slot="contents"> set </span>
    </Button>
  </div>
</div>

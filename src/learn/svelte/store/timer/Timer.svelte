<script>
import {timer} from './store'
import {formatTime} from '../../../../apps/test-timer/utils.ts'
import Button from '../../../../ui/Button.svelte'

export let location;

let elapsed = 1220
const setElapsed = () => {
  timer.setElapsed(elapsed)
  console.log("... format time: ", formatTime(elapsed))
}
</script>

<div class="flex flex-col">
  <p class="bg-gray-600 text-gray-300 rounded p-2 justify-left">
    A test for using store to set and reset a timer.
    store.ts contains all the logic and this ui is only a representation of
    the store
  </p>
  <div class="border-t border-gray-400 mt-4 py-2
    flex flex-row gap-4 justify-center font-mono ">
    {formatTime($timer)} | {$timer} |
  </div>
  <div class="flex flex-row gap-4 mt-4 justify-center">
    <Button on:click={timer.start} class="w-24">
      <span slot="contents"> Start </span>
    </Button>
    <Button on:click={timer.stop} enabledClass="bg-yellow-400">
      <span slot="contents"> Pause </span>
    </Button>

    <Button on:click={timer.reset} enabledClass="bg-red-400">
      <span slot="contents"> Reset </span>
    </Button>
  </div>

  <div class="flex flex-row gap-4 mt-4 justify-center">
    <input type=number bind:value={elapsed} class="w-24 px-2" />

    <Button on:click={setElapsed} enabledClass="bg-yellow-800">
      <span slot="contents"> set </span>
    </Button>
  </div>
</div>

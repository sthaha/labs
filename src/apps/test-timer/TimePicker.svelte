<script>
  import {testDuration} from "./store.ts"
  import {twoDigits} from "./utils.ts"

  export let hours = 0
  export let minutes = 0
  export let seconds = 0

$: testDuration.setTime(hours, minutes, seconds)

</script>

<div class="mt-2 p-5 min-w-min bg-gray-700 text-gray-100 rounded-lg shadow-xl text-2xl font-mono">

  <div class="flex items-center">
    <select name="hours" bind:value={hours}
      class="bg-gray-700 hover:bg-gray-900 p-4 rounded-xl appearance-none outline-none">
      {#each {length: 12} as _, x}
        <option value="{x}">{twoDigits(x)}</option>
      {/each}
    </select>
    <div class="mx-2">:</div>

    <select name="minutes" bind:value={minutes}
      class="bg-gray-700 hover:bg-gray-900 p-4 rounded-xl appearance-none outline-none">
      {#each {length: 59} as _, x}
        <option value="{x}">{twoDigits(x)}</option>
      {/each}
    </select>
    <div class="mx-2">:</div>

    <select name="seconds" bind:value={seconds}
      class="bg-gray-700 hover:bg-gray-900 p-4 rounded-xl appearance-none outline-none">
      {#each {length: 59} as _, x}
        <option value="{x}">{twoDigits(x)}</option>
      {/each}
    </select>
  </div>
</div>

<script>
  import {totalTime} from "./store.ts"
  import {twoDigits} from "./utils.ts"

  export let hours = 0
  export let minutes = 0
  export let seconds = 0

$: totalTime.setTime(hours, minutes, seconds)

</script>

<div class="mt-2 p-5 w-48 bg-gray-800 text-gray-100 rounded-lg shadow-xl text-2xl font-mono">
  <div class="flex">
    <select name="hours" bind:value={hours} class="bg-transparent appearance-none outline-none mr-3">
      {#each {length: 12} as _, x}
        <option value="{x}">{twoDigits(x)}</option>
      {/each}
    </select>
    <span>:</span>

    <select name="minutes" bind:value={minutes} class="bg-transparent appearance-none outline-none ml-2 mr-2">
      {#each {length: 59} as _, x}
        <option value="{x}">{twoDigits(x)}</option>
      {/each}
    </select>
    <span>:</span>

    <select name="seconds" bind:value={seconds} class="bg-transparent appearance-none outline-none mr-4">
      {#each {length: 59} as _, x}
        <option value="{x}">{twoDigits(x)}</option>
      {/each}
    </select>
  </div>
</div>

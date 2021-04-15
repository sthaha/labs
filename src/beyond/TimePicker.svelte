<script>
  export let hours = 0
  export let minutes = 0
  export let seconds = 0
</script>

<div class="mt-2 p-5 w-48 bg-gray-800 text-gray-100 rounded-lg shadow-xl text-2xl font-mono">
  <div class="flex">
    <select name="hours" bind:value={hours} class="bg-transparent  appearance-none outline-none">
      {#each {length: 12} as _, x}
        <option value="{x}">{String(x).padStart(2, '0')}</option>
      {/each}
    </select>
    <span class="mr-3">:</span>
    <select name="minutes" bind:value={minutes} class="bg-transparent appearance-none outline-none mr-4">
      {#each {length: 59} as _, x}
        <option value="{x}">{String(x).padStart(2, '0')}</option>
      {/each}
    </select>
    <span class="mr-3">:</span>
    <select name="seconds" bind:value={seconds} class="bg-transparent appearance-none outline-none mr-4">
      {#each {length: 59} as _, x}
        <option value="{x}">{String(x).padStart(2, '0')}</option>
      {/each}
    </select>
  </div>
</div>

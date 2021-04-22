<script>
import { createEventDispatcher, onMount, onDestroy } from "svelte"
import { testDuration } from "./store"

import Toggle from "../../ui/Toggle.svelte"
import Button from "../../ui/Button.svelte"


const cleanup = () => {

}

const dispatch = createEventDispatcher()
const reset = () => {
  cleanup()
  dispatch('reset', {});
}



</script>

<p class="h-32 bg-gray-700 text-2xl text-gray-100 pt-8 text-center font-mono">
  <span class="text-bold rounded-xl px-6 p-4 bg-gray-800">{current+1}</span>:
  <span class="text-bold rounded-xl p-4 bg-gray-800">
    {elapsedPretty.H}:{elapsedPretty.M}:{elapsedPretty.S}.<span class="text-md">{elapsedPretty.ms}</span>
  </span>
</p>
<div class="flex flex-row py-4 justify-center space-x-4">

{#if !stopped }
   <div>
     <Button class="w-48 font-bold" on:click={next}>
       <span slot="contents"> Next </span>
     </Button >
   </div>

   <div>
     <Button class="bg-yellow-600 w-32" on:click={togglePaused}>
       <span slot="contents"> Pause </span>
     </Button >
   </div>

   <div>
    <Button class="bg-red-800 w-24" on:click={stop}>
      <span slot="contents"> Stop </span>
    </Button >
  </div>
{/if}

 <div>
   <Button class="bg-gray-600 w-24 " on:click={reset}>
     <span slot="contents" class="text-sm"> Reset </span>
   </Button >
 </div>

</div>

<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Elapsed
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Started At
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Paused
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ended At
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 ">
          {#each elapsedList.slice(0, current) as x, i}
            <tr class="hover:bg-blue-300 ease-in transition duration-300 bg-white">
              <td class="px-6 py-2 whitespace-nowrap"> {i+1} </td>
              <td class="px-6 py-2 font-mono whitespace-nowrap">
                {x.elapsed.H}:{x.elapsed.M}:{x.elapsed.S}.<span class="text-md">{x.elapsed.ms}</span>
              </td>
              <td class="px-6 py-2 whitespace-nowrap"> {x.startedAt.toLocaleTimeString()} </td>
              <td class="px-6 py-2 whitespace-nowrap"> {prettyTime(x.paused)} </td>
              <td class="px-6 py-2 whitespace-nowrap"> {x.endedAt.toLocaleTimeString()} </td>
            </tr>
          {/each}

        </tbody>
      </table>
    </div>
  </div>
</div>


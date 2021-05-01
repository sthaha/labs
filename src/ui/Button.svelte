<script>
import { createEventDispatcher } from "svelte"

export let enabled = true
export let enabledClass = "text-gray-200 bg-green-600"
export let disabledClass = "text-gray-400 bg-gray-700"

const dispatch=createEventDispatcher()
const handleClick = (e) => {
  if (!enabled){
    return
  }
  dispatch('click', e)
}

</script>

{#if $$slots.contents }


  <button
    class={
      "inline-block px-4 py-2 rounded-2xl shadow" +
      " text-center " +
      " hover:shadow-lg transition " +
      ($$props.class || "") +
      " " + (enabled ? enabledClass : disabledClass)
    }
    on:click={handleClick}
  >
    <slot name="contents">
    </slot>
  </button>

{:else}

  <button
    class={
      "inline-block shadow h-4 w-4 md:h-8 md:w-8 rounded-full " +
      " hover:shadow-lg transition " + ($$props.class || "") +
      " " + (enabled ? enabledClass : disabledClass)
    }
    on:click={handleClick}
  >
  </button>

{/if}

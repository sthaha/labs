<script>
import { createEventDispatcher } from "svelte"

export let enabled = true

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
      "inline-block px-4 py-2 rounded-2xl shadow " +
      "text-center " +
      "hover:shadow-lg transition " +
      ($$props.class || "")
    }
    class:text-gray-200={ enabled }
    class:text-gray-500={ !enabled }
    class:bg-green-600={ ( !$$props.class || !$$props.class.includes("bg-") ) && enabled }
    class:bg-gray-700={ !enabled }
    on:click={handleClick}
  >
    <slot name="contents">
    </slot>
  </button>

{:else}

  <button
    class={
      "inline-block shadow h-4 w-4 md:h-8 md:w-8 rounded-full " +
      " hover:shadow-lg transition " + ($$props.class || "")
    }
    class:bg-green-600={ (!$$props.class || !$$props.class.includes("bg-")) && enabled }
    class:bg-gray-600={ !enabled }
    on:click={handleClick}
  >
  </button>

{/if}

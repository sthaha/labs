<script>
import {onMount} from "svelte"

export let enabled = true
export let invert = false

const toggleActive = () => !active
export let isActive = toggleActive

let active = true

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

const toggle = () => {
  if (!enabled) {
    return
  }

  dispatch('toggle', {active});
  active = isActive()
}

onMount(() => {
  // if user has explicitly set isActive, then invoke that on mount
  if (isActive != toggleActive) {
    active = isActive()
  }
})

</script>


{#if $$slots.active  || $$slots.inactive }
  <button
    class={
      "inline-block px-4 py-2 rounded-2xl shadow " +
      "text-center " +
      "hover:shadow-lg transition " +
      ($$props.class || "")
    }
    class:text-gray-500={ !enabled }
    class:bg-gray-700={ !enabled }
    class:bg-green-600={!invert && active || invert && !active}
    class:bg-gray-600={!invert && !active || invert && active}
    on:click={toggle}>

  {#if active}
    <slot name="active"></slot>
  {:else}
    <slot name="inactive"></slot>
  {/if}

  </button>
{:else}

  <button
    class={
      "inline-block shadow h-4 w-4 md:h-8 md:w-8 rounded-full " +
      " hover:shadow-lg transition " + ($$props.class || "")
    }
    class:bg-green-600={!invert && active || invert && !active}
    class:bg-gray-600={!invert && !active || invert && active}
    on:click={toggle}
  >
  </button>

{/if}

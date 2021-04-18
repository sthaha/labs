<script>
  export let active = true
  export let invert = false

  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  const toggle = () => {
    active  = !active
    dispatch('toggle', {active});
  }
</script>


{#if $$slots.active  || $$slots.inactive }
  <button
  class={
    "inline-block px-4 py-2 rounded-2xl shadow " +
    "text-center text-gray-200 " +
    "hover:shadow-lg transition " +
    ($$props.class || "")
  }
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

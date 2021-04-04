<script>
  export let active = true
  export let invert = false

  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  const toggle = () => {
    active  = !active
    dispatch('toggled', {active});
  }
</script>

<button
  class="rounded-xl shadow text-center text-gray-100"
  class:min-w-full={ $$slots.active || $$slots.inactive }
  class:h-10={ $$slots.active || $$slots.inactive }
  class:px-2={ $$slots.active || $$slots.inactive }
  class:bg-green-600={!invert && active || invert && !active}
  class:bg-gray-600={!invert && !active || invert && active}
  on:click={toggle}>

  {#if active}
    {#if $$slots.active}
      <slot name="active"></slot>
    {:else}
      <div class="w-4 h-4"> </div>
    {/if}
  {:else}

    {#if $$slots.inactive }
      <slot name="inactive"></slot>
    {:else}
      <div class="w-4 h-4"> </div>
    {/if}
  {/if}
</button>

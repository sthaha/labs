{#if $$slots.contents }

  <button
    class={
      "inline-block px-4 py-2 rounded-2xl shadow " +
      "text-center text-gray-200 " +
      "hover:shadow-lg transition " +
      ($$props.class || "")
    }

    class:bg-green-600={ !$$props.class || !$$props.class.includes("bg-") }
    on:click
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
    class:bg-green-600={ !$$props.class || !$$props.class.includes("bg-") }
    on:click
  >
  </button>

{/if}

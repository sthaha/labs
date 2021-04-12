<button
  class={ " rounded-xl shadow text-center text-gray-100 hover:shadow-lg transition " + $$props.class || "" }
  class:bg-green-600={ !$$props.class || !$$props.class.includes("bg-") }
  class:min-w-full={ $$slots.contents }
  class:h-10={ $$slots.contents }
  class:px-2={ $$slots.contents }

  on:click
>
  <slot name="contents">
    <div class="w-4 h-4"> </div>
  </slot>
</button>


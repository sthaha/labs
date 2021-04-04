<button
  class="rounded-xl shadow bg-green-600 text-center text-gray-100"
  class:min-w-full={ $$slots.contents }
  class:h-10={ $$slots.contents }
  class:px-2={ $$slots.contents }
  on:click
>
  <slot name="contents">
    <div class="w-4 h-4"> </div>
  </slot>
</button>


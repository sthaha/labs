<script>
  import { Link } from "svelte-routing";
</script>

<header class="fixed top-0 z-50 w-full h-16 opacity-95 bg-gray-800 flex items-center shadow-2xl">
  <nav class="mx-4 flex w-full items-center text-xl text-gray-300" >

    <!-- Home -->
    <div class="flex items-center px-3 h-12  bg-gray-900 hover:bg-gray-700 hover:text-gray-100 ">
      <Link class="block flex items-center" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" class="block pl-1 h-10 w-10" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        <div > Home </div>
      </Link>
    </div>


    <!-- Blog -->
    <div class="flex items-center ml-4 px-6 h-12  bg-gray-900 hover:bg-gray-700 hover:text-gray-100">
      <a href="https://sthaha.github.io" target="_blank"> Blog </a>
    </div>

    <!-- Link to source -->
    <div class="ml-auto w-12 h-12 flex justify-center items-center
      rounded-full bg-gray-900 hover:bg-gray-700 hover:text-gray-100
      hover:ring-4 hover:ring-green-500">
      <a href=https://github.com/sthaha/svelte-ts-p5-js target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </a>
    </div>

  </nav>
</header>


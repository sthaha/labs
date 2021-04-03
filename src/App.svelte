<script lang='typescript'>
  import './styles.svelte';

  import { Router, Link, Route } from "svelte-routing";
  import LinksTable from './LinksTable.svelte';

  import P2DTest from "./routes/P2DTest.svelte";
  import P3DTest from "./routes/P3DTest.svelte";
  import Spirograph from "./beyond/Spirograph.svelte";


  export let url = "";
</script>

<Router url="{url}">
  <div class="bg-gray-300 h-screen">
    <div class="flex flex-col">
      <!--Navigation -->
      <div class="h-14 bg-gray-100">  </div>
      <nav class="inset-x-0 fixed h-14 opacity-95 bg-gray-700 text-gray-100 ">
        <div class="flex flex-row p-2 items-end">
          <!-- Home -->
          <div class="flex flex-row space-x-1 items-end">
            <div class="text-gray-100 w-8 ">
              <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </Link>
            </div>
            <div class="text-gray-200 bold text-xl">
              <Link class="" to="/"> Home </Link>
            </div>
          </div>

          <!--title -->
          <div class="hidden md:block md:flex-grow" >
            <div class="text-center px-10 text-gray-100 bold text-3xl">
              <svg class="w-8 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
              </svg>
              Svelte, Typescript, Tailwind and P5.js
            </div>
          </div>
        <div>
      </nav>



      <!-- list of experiments -->
      <div class="flex mt-4 flex-col mx-4 ">
        <Route path="demo/2D" component="{P2DTest}" />
        <Route path="demo/3D" component="{P3DTest}" />
        <Route path="beyond/spirograph" component="{Spirograph}" />
        <Route path="/" component="{LinksTable}" />
      </div>
    </div>
  </div>
</Router >


<script lang='typescript'>
  import './styles.svelte';

  import { Router, Link, Route } from "svelte-routing";
  import Routes from './Routes.svelte';

  import P2DTest from "./routes/P2DTest.svelte";
  import P3DTest from "./routes/P3DTest.svelte";


  export let url = "";
</script>

<Router url="{url}">
  <div class="bg-gray-100 h-screen">
    <div class="flex flex-col">
      <!--Navigation -->
      <div class="h-14 bg-gray-100">  </div>
      <nav class="inset-x-0 fixed h-14 opacity-95 bg-gray-700 text-gray-100">
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
          <div class="px-10 text-gray-100 bold text-3xl">
            Experiments with Svelte, Tailwind and P5.js
          </div>
        <div>
      </nav>

      <!-- list of experiments -->
      <div class="flex mt-4 flex-col mx-4 ">
        <Route path="/" component="{Routes}" />
        <Route path="/demo/2d" component="{P2DTest}" />
        <Route path="/demo/3d" component="{P3DTest}" />
      </div>
    </div>
  </div>
</Router >


<script lang='typescript'>
  export let location;

  import { Router, Link, Route } from "svelte-routing";
  import P2DTest from "./routes/P2DTest.svelte";
  import P3DTest from "./routes/P3DTest.svelte";
</script>

<div class="grid grid-cols-6">
  <div class="bg-red-200 col-span-1">
    <Link to="/demo/2d">2D Demo</Link>
  </div>
  <p class="bg-blue-400 col-span-5 col-start-2 px-2 text-sm text-gray-800">
    A simple 2 Demo
  </p>

  <div class="bg-green-200 col-span-1">
    <Link to="/demo/3d">3D Demo</Link>
  </div>
  <p class="bg-green-400 col-span-5 px-2">
    what is this about
  </p>
</div>

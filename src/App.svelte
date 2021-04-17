<script lang='typescript'>
  import './styles.svelte';

  import { Router, Route } from "svelte-routing";

  import Nav from './Nav.svelte';
  import LinksTable from './LinksTable.svelte';

  import P2DTest from "./routes/P2DTest.svelte";
  import P3DTest from "./routes/P3DTest.svelte";
  import ParametricEqLines from "./beyond/ParametricEqLines.svelte";
  import Spirograph from "./beyond/Spirograph.svelte";
  import TestTimer from "./beyond/TestTimer.svelte";


  export let url = "";
</script>

<Router url="{url}">
  <Nav/>
  <div class="bg-gray-300 mt-14 w-screen h-screen flex flex-col">

    <!-- list of experiments -->
    <div class="flex mt-6 flex-col mx-4">
      <Route path="demo/2D" component="{P2DTest}" />
      <Route path="demo/3D" component="{P3DTest}" />
      <Route path="beyond/spirograph" component="{Spirograph}" />
      <Route path="beyond/parametric-eq" component="{ParametricEqLines}" />
      <Route path="beyond/test-timer" component="{TestTimer}" />
      <Route path="/" component="{LinksTable}" />
    </div>

  </div>
</Router >


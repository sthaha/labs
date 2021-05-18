<script lang='typescript'>
import './styles.svelte';

import { Router, Route } from "svelte-routing";

import Nav from './Nav.svelte';
import LinksTable from './LinksTable.svelte';

import P2DTest from "./routes/P2DTest.svelte";
import P3DTest from "./routes/P3DTest.svelte";
import ParametricEqLines from "./beyond/ParametricEqLines.svelte";
import Spirograph from "./beyond/Spirograph.svelte";
import TestTimer from "./apps/TestTimer.svelte";
import Buttons from "./ui-demo/Buttons.svelte";
import Toggles from "./ui-demo/Toggles.svelte";
import Timer from "./learn/svelte/store/timer/Timer.svelte";
import NoStoreTimer from "./learn/svelte/timer/NoStoreTimer.svelte";
import FS from "./math/FourierSeries.svelte";
import FFT from "./math/FourierTransform.svelte";

export let url = "";
</script>

<Router url="{url}">
  <Nav/>
  <div class="bg-gray-200 mt-14 w-screen h-screen flex flex-col">
    <!-- list of experiments -->
    <div class="flex mt-6 flex-col mx-4">
      <Route path="demo/2D" component="{P2DTest}" />
      <Route path="demo/3D" component="{P3DTest}" />
      <Route path="beyond/spirograph" component="{Spirograph}" />
      <Route path="beyond/parametric-eq" component="{ParametricEqLines}" />
      <Route path="apps/stopwatch" component="{TestTimer}" />
      <Route path="demo/ui/buttons" component="{Buttons}" />
      <Route path="demo/ui/toggles" component="{Toggles}" />
      <Route path="learn/svelte/store/timer" component="{Timer}" />
      <Route path="learn/svelte/timer" component="{NoStoreTimer}" />
      <Route path="math/fs" component="{FS}" />
      <Route path="math/fft" component="{FFT}" />
      <Route path="/" component="{LinksTable}" />
    </div>
  </div>
</Router >


<script lang='typescript'>
import { Router, Route } from "svelte-routing";

import LinksTable from "./LinksTable.svelte";

import StoreTimer from "./store/timer/Timer.svelte";
import NoStoreTimer from "./timer/NoStoreTimer.svelte";
import P2DTest from "./p5/P2DTest.svelte";
import P3DTest from "./p5/P3DTest.svelte";

export let location;

</script>

<Router>
  <Route path="/" component="{LinksTable}" />
  <Route path="store/timer" component="{StoreTimer}" />
  <Route path="timer" component="{NoStoreTimer}" />
  <Route path="p5/2D" component="{P2DTest}" />
  <Route path="p5/3D" component="{P3DTest}" />
</Router>



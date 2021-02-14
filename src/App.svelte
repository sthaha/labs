<script lang='typescript'>
  import { Router, Link, Route } from "svelte-routing";

  import P2DTest from "./routes/P2DTest.svelte";
  import P3DTest from "./routes/P3DTest.svelte";

  export let url = "";
</script>

<style>
	:global(body) {
	  margin: 0;
	  font-family: Arial, Helvetica, sans-serif;
	}

	.App {
    text-align: center;
	}
</style>

<Router url="{url}">
  <nav>
    <Link to="svelte-ts-p5-js/demo/2d">2D Demo</Link>
    <Link to="svelte-ts-p5-js/demo/3d">3D Demo</Link>
  </nav>
  <div>
    <Route path="/" component="{P2DTest}" />
    <Route path="svelte-ts-p5-js/demo/2d" component="{P2DTest}" />
    <Route path="svelte-ts-p5-js/demo/3d" component="{P3DTest}" />
  </div>
</Router>


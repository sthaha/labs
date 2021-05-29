<script lang='typescript'>
import './styles.svelte';

import { Router, Route } from "svelte-routing";

import Nav from './Nav.svelte';

import StopWatch from "./apps/TestTimer.svelte";

import ParametricEqLines from "./beyond/ParametricEqLines.svelte";
import Spirograph from "./beyond/Spirograph.svelte";

import FS from "./math/FourierSeries.svelte";
import FFT from "./math/FourierTransform.svelte";

import SvelteIndex from "./svelte/Index.svelte";
import UIDemo from "./ui-demo/Index.svelte";
import IndexTable from "./ui/IndexTable.svelte";


export let url = "";

let entries = [
  {link: "apps/stopwatch", summary: "Stop Watch", description: "Work in progress Stop watch for competetive test"},
  {link: "beyond/spirograph", summary: "Spirograph", description: "Spirograph creates beautiful patterns"},
  {link: "beyond/parametric-eq", summary: "Line Animation", description: "Line animations using parametric equations"},
  {link: "math/fs", summary: "Fourier Series ", description: "Fourier series using spinning discs"},
  {link: "math/fft", summary: "Discrete Fourier Transform ",
    description: "Plot your drawing into spinning discs "},
  {link: "svelte", summary: "Svelte experiments", description: "Tryout things ing svelte"},
  {link: "ui", summary: "UI components", description: "UI components used in the lab"},
]

</script>


<Router url="{url}">
  <Nav/>
  <div class="bg-gray-200 mt-14 w-screen h-screen flex flex-col">
    <!-- list of experiments -->
    <div class="flex mt-6 flex-col mx-4">
      <Route path="apps/stopwatch" component="{StopWatch}" />

      <Route path="beyond/spirograph" component="{Spirograph}" />
      <Route path="beyond/parametric-eq" component="{ParametricEqLines}" />

      <Route path="math/fs" component="{FS}" />
      <Route path="math/fft" component="{FFT}" />

      <Route path="ui/*" component="{UIDemo}" />
      <Route path="svelte/*" component="{SvelteIndex}" />

      <Route path="/">
        <IndexTable {entries} />
      </Route >

    </div>
  </div>
</Router >


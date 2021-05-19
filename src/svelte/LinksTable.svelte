<script lang='typescript'>
import IndexTable from "../ui/IndexTable.svelte"

export let location

let entries = [{
    link: "store/timer",
    summary: "Custom Svelte Store for Timer",
    description: "Tryout setInterval on store"
  }, {
    link: "p5/2D", summary: "p5js 2D Demo",
      description: "A simple 2D Demo to test svelte integration with p5.js"
  }, {
    link: "p5/3D", summary: "3D Demo", description: "Test 3D WebGL Rendering"
  }, {
    link: "timer",
    summary: "Timer without Store",
    description: "Tryout setInterval w/o store"
  }]
</script>

<IndexTable entries={entries} />

<script lang='typescript'>

import IndexTable from "./ui/IndexTable.svelte";

export let location;

let entries = [
  {link: "apps/stopwatch", summary: "Stop Watch", description: "Work in progress Stop watch for competetive test"},
  {link: "beyond/spirograph", summary: "Spirograph", description: "Spirograph creates beautiful patterns"},
  {link: "beyond/parametric-eq", summary: "Line Animation", description: "Line animations using parametric equations"},
  {link: "math/fs", summary: "Fourier Series ", description: "Fourier series using spinning discs"},
  /* {link: "math/fft", summary: "Discrete Fourier Transform ", description: ""}, */
  {link: "svelte", summary: "Svelte experiments", description: "Tryout things ing svelte"},
  {link: "ui/buttons", summary: "Buttons UI", description: "Test ui/button component"},
  {link: "ui/toggles", summary: "Toggle UI", description: "Test ui/toggle component"},
]
</script>

<IndexTable {entries} />

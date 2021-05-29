<script lang='typescript'>
import { Router, Route } from "svelte-routing";

import IndexTable from "../ui/IndexTable.svelte"
import Buttons from "./Buttons.svelte";
import Toggles from "./Toggles.svelte";

export let location;

let entries = [
  {link: "buttons", summary: "Buttons", description: "Test ui/button component"},
  {link: "toggles", summary: "Toggle", description: "Test ui/toggle component"},
]
</script>


<Router>
  <Route path="/" >
    <IndexTable entries={entries} />
  </Route>
  <Route path="buttons" component="{Buttons}" />
  <Route path="toggles" component="{Toggles}" />
</Router>


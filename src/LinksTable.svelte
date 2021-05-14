<script lang='typescript'>
  export let location;

import { Link } from "svelte-routing";

let experiments = [
  {link: "apps/stopwatch", summary: "Stop Watch", description: "Work in progress Stop watch for competetive test"},
  {link: "beyond/spirograph", summary: "Spirograph", description: "Spirograph creates beautiful patterns"},
  {link: "beyond/parametric-eq", summary: "Line Animation", description: "Line animations using parametric equations"},
  {link: "demo/2D", summary: "2D Demo", description: "A simple 2D Demo to test svelte integration"},
  {link: "demo/3D", summary: "3D Demo", description: "Test 3D WebGL Rendering"},
  {link: "demo/ui/buttons", summary: "Buttons UI", description: "Test ui/button component"},
  {link: "demo/ui/toggles", summary: "Toggle UI", description: "Test ui/toggle component"},
  {link: "learn/svelte/store/timer", summary: "Custom Svelte Store for Timer", description: "Tryout setInterval on store"},
  {link: "math/fs", summary: "Fourier Series using spinning disc", description: "fourier series"},
]
let search: string = ""
let filtered = experiments

const filter = () => {
  const txt = search.trim().toLowerCase()

  if (txt == "") {
    filtered = experiments
    return
  }

  filtered = experiments.filter(
    x => x.summary.toLowerCase().includes(txt) ||
      x.description.toLowerCase().includes(txt))
}
</script>

<div class="bg-white shadow py-2 px-4 flex items-center">
  <div>
    <span class="w-auto flex justify-end items-center text-gray-600 p-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </span>
  </div>
  <div class="flex-grow">
    <input bind:value={search} on:input={filter}
      class="min-w-full py-2 text-sm text-white bg-gray-600 rounded-md pl-10
        focus:outline-none focus:bg-gray-100 focus:text-gray-800" type=text />
  </div>
</div>

<div class="mx-1 overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-700 text-gray-200">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Demo
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-200 divide-y-2 divide-gray-300">
          {#each filtered as demo}

          <tr class="hover:bg-blue-300 ease-in transition duration-300 bg-white">
            <td class="px-2 py-2 sm:px-6 sm:py-2 sm:whitespace-nowrap">
              <Link to={demo.link}>
                <div class="flex items-center">
                  <div class="ml-2">
                    <div class="contents text-md font-medium text-blue-900">
                      {demo.summary}
                    </div>
                  </div>
                </div>
              </Link>
            </td>
            <td class="px-6 py-3 sm:whitespace-nowrap">
              <Link to={demo.link}>
                <div class="text-sm text-gray-900">{demo.description}</div>
              </Link>
            </td>
          </tr>
          {/each}

        </tbody>
      </table>
    </div>
  </div>
</div>


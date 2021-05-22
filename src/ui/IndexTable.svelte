<script lang='typescript'>
import { Link } from "svelte-routing";

export let entries = []

let search: string = ""
let filtered = entries

const filter = () => {
  const txt = search.trim().toLowerCase()

  if (txt == "") {
    filtered = entries
    return
  }

  filtered = entries.filter(
    x => x.summary.toLowerCase().includes(txt) ||
      x.description.toLowerCase().includes(txt))
}

</script>

<div class="pt-2 flex items-center relative">
  <div class="absolute m-2">
    <span class="w-auto items-center text-gray-500 ">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </span>
  </div>

  <div class="flex-grow">
    <input bind:value={search} on:input={filter}
      class="min-w-full py-2 text-sm
      bg-gray-200 border-b-2 border-gray-400
      text-white bg-gray-100 pl-12
      focus:outline-none focus:bg-gray-100 focus:text-gray-800
      focus:border-gray-500
      " type=text />
  </div>
</div>

<div class="mx-1 overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-700 text-gray-200">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              entry
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>

        <tbody class="bg-gray-200 divide-y-2 divide-gray-300">
          {#each filtered as entry}
            <tr class="hover:bg-blue-300 ease-in transition duration-300 bg-white">
              <td class="px-2 py-2 sm:px-6 sm:py-2 sm:whitespace-nowrap">
                <Link to={entry.link}>
                  <div class="flex items-center">
                    <div class="ml-2">
                      <div class="contents text-md font-medium text-blue-900">
                        {entry.summary}
                      </div>
                    </div>
                  </div>
                </Link>
              </td>
              <td class="px-6 py-3 sm:whitespace-nowrap">
                <Link to={entry.link}>
                  <div class="text-sm text-gray-900">{entry.description}</div>
                </Link>
              </td>
            </tr>
          {/each}
        </tbody>

      </table>
    </div>
  </div>
</div>

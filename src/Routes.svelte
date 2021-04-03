<script lang='typescript'>
  export let location;

  import { Link } from "svelte-routing";

  let experiments = [
    {link: "demo/2D", summary: "2D Demo", description: "A simple 2D Demo to test svelte integration"},
    {link: "demo/3D", summary: "3D Demo", description: "Test 3D WebGL Rendering"},
    {link: "beyond/spirograph", summary: "Spirograph", description: "Spirograph"},
  ]
</script>


<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Demo
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each experiments as demo}
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    <Link to="{demo.link}">{demo.summary}</Link>
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{demo.description}</div>
            </td>
          </tr>
          {/each}

          <!-- More items... -->
        </tbody>
      </table>
    </div>
  </div>
</div>


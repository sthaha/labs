<script lang='typescript'>
  export let location;

  import { Link } from "svelte-routing";

  let experiments = [
    {link: "beyond/test-timer", summary: "Test Timer", description: "A work in progress Test Timer for competetive test"},
    {link: "beyond/spirograph", summary: "Spirograph", description: "Spirograph creates beautiful patterns"},
    {link: "beyond/parametric-eq", summary: "Line Animation", description: "Line animations using parametric equations"},
    {link: "demo/2D", summary: "2D Demo", description: "A simple 2D Demo to test svelte integration"},
    {link: "demo/3D", summary: "3D Demo", description: "Test 3D WebGL Rendering"},
    {link: "demo/ui/buttons", summary: "Buttons UI", description: "Test ui/button component"},
    {link: "demo/ui/toggles", summary: "Toggle UI", description: "Test ui/toggle component"},
  ]
</script>


<div class="-my-3 -mx-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y-2 divide-gray-300">
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
        <tbody class="bg-white divide-y divide-gray-300">
          {#each experiments as demo}

          <tr class="hover:bg-blue-300 ease-in transition duration-300 bg-white">
            <td class="px-2 py-2 sm:px-6 sm:py-4 sm:whitespace-nowrap">
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
            <td class="px-6 py-4 sm:whitespace-nowrap">
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


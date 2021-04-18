<script>
  import Toggle from "../ui/Toggle.svelte"
</script>

<div class="flex flex-col">
  <div class="flex gap-4 bg-yellow-200 items-center">

    <Toggle>
      <span slot="active"> Active </span>
      <span slot="inactive"> Inactive </span>
    </Toggle>

    <Toggle />

    <Toggle class="w-32">
      <span slot="active"> Active </span>
      <span slot="inactive"> Inactive </span>
    </Toggle>


  </div>
  <div class="flex p-2  gap-4 bg-green-400 items-center">

    <Toggle invert="true" >
      <span slot="active"> Active </span>
      <span slot="inactive"> Inactive </span>
    </Toggle>

    <Toggle invert="true" />

    <Toggle class="w-32" invert="true">
      <span slot="active"> Active </span>
      <span slot="inactive"> Inactive </span>
    </Toggle>


  </div>
  <!--

  <div class="flex flex-row items-center gap-2 bg-red-200 p-2" >
    <Toggle />
    <Toggle >
      <span slot="contents" class="font-bold text-4xl"> Toggle with Text </span>
    </Toggle>

    <Toggle > <span slot="contents"> small </span> </Toggle>
  </div>

  <div class="flex flex-row gap-2 bg-blue-400 p-2" >
    <Toggle class="bg-red-700"/>
    <Toggle class="bg-yellow-600" >
      <span slot="contents" class="text-white font-bold"> Toggle with Text </span> </Toggle>
    <Toggle > <span slot="contents"> small </span> </Toggle>
  </div>
  -->
</div>

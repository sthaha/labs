<script>
  import Button from "../ui/Button.svelte"
</script>

<div class="flex flex-col">
  <div class="flex gap-4 bg-yellow-200 items-center">
    <Button > <span slot="contents"> Button </span> </Button>
    <Button />
    <Button > <span slot="contents"> Button expands to size of Text </span> </Button>
  </div>

  <div class="flex gap-4 bg-gray-200 items-center">
    <Button enabled={false} />
    <Button  />

    <Button enabled={false} > <span slot="contents"> Text </span> </Button>
    <Button > <span slot="contents"> Text </span> </Button>
  </div>

  <div class="flex flex-row items-center gap-2 bg-red-200 p-2" >
    <Button />
    <Button >
      <span slot="contents" class="font-bold text-4xl"> Button with Text </span>
    </Button>

    <Button > <span slot="contents"> small </span> </Button>
  </div>

  <div class="flex flex-row gap-2 bg-blue-400 p-2" >
    <Button class="bg-red-700"/>
    <Button class="bg-yellow-600" >
      <span slot="contents" class="text-white font-bold"> Button with Text </span> </Button>
    <Button > <span slot="contents"> small </span> </Button>
  </div>

</div>

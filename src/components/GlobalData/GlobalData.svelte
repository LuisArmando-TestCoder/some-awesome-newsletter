<script src="ts">
  import { onMount } from "svelte";
  import { startTicks } from "./ticks.js";

  onMount(() => {
    startTicks();
  })
</script>

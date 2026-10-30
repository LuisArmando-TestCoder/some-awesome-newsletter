<script lang="ts">
  import Steps from "../Steps.svelte";
  import type { ComponentSteps } from "../../../types";

  export let components: ComponentSteps;
</script>

<Steps {components} />

<script lang="ts">
  import { onMount } from "svelte";
  import store from "../../../store";

  export let components: [
    (store: any) => boolean,
    any
  ][];

  let activeComponent: any;

  store.subscribe((s) => {
    const currentStep = components[s.stepsIndex];
    if (currentStep) {
      activeComponent = currentStep[1];
    }
  });
</script>

{#if activeComponent}
  <svelte:component this={activeComponent} canReveal={true} />
{/if}

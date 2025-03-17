<script lang="ts">
  import { onMount } from "svelte";
  import store from "../../../store.ts";
  import Steps from "../Steps.svelte";

  export let components;

  const goNext = (currentIndex: number) => () => {
    if (
      !$store.hasInteracted &&
      $store.value < currentIndex &&
      $store.value + 1 === currentIndex
    ) {
      store.set({
        ...$store,
        value: Math.min($store.value + 1, components.length),
      });
    }
  };

  onMount(() => {
    const timings = [6.5e3, 8e3, 9e3];

    timings.forEach((_, index) => {
      const summation = timings.slice(0, index + 1).reduce((a, b) => a + b);
      setTimeout(goNext(index + 1), summation);
    });
  });
</script>

<Steps {components} />

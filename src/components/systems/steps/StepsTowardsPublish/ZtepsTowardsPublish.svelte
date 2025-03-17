<script lang="ts">
  import { onMount } from "svelte";
  import store from "../../../store.ts";
  import Steps from "../Steps.svelte";
  import A from "./A.svelte";
  import B from "./B.svelte";
  import C from "./C.svelte";
  import D from "./D.svelte";
  import E from "./E.svelte";
  import F from "./F.svelte";
  import G from "./G.svelte";
  import H from "./H.svelte";

  const components = [
    [() => true, A],
    [() => true, B],
    [() => true, C],
    [() => true, D],
    [() => true, E],
    [() => true, F],
    [() => true, G],
    [() => true, H],
  ];

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

<script lang="ts">
  import { onMount } from "svelte";
  import MultiSlotComponent from "../MultiSlotComponent/MultiSlotComponent.svelte";
  import A from "./A.svelte";
  import B from "./B.svelte";
  import C from "./C.svelte";
  import D from "./D.svelte";
  import TransitionSteps from "../../transitions/TransitionSteps/TransitionSteps.svelte";
  import store from "../../../store.ts";
  import type { Store } from "../../../types.ts";

  const slotCallbacks = new Map([
    [
      ({ value }: Store) => {
        return value === 0;
      },
      A,
    ],
    [({ value }: Store) => value === 1, B],
    [({ value }: Store) => value === 2, C],
    [({ value }: Store) => value === 3, D],
  ]);

  const goNext = (currentIndex: number) => () => {
    if (
      !$store.hasInteracted &&
      $store.value < currentIndex &&
      $store.value + 1 === currentIndex
    ) {
      store.set({
        ...$store,
        value: Math.min($store.value + 1, slotCallbacks.size),
      });
    }
  };

  onMount(() => {
    const timings = [6.5e3, 8e3, 12e3];

    timings.forEach((_, index) => {
      const summation = timings.slice(0, index + 1).reduce((a, b) => a + b);
      setTimeout(goNext(index + 1), summation);
    });
  });
</script>

<MultiSlotComponent {slotCallbacks} sharedStore={store} />
<TransitionSteps {slotCallbacks} />

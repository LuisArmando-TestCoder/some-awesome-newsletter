<script lang="ts">
  import { onMount } from "svelte";
  import type { SvelteComponent } from "svelte";
  import MultiSlotComponent from "./MultiSlotComponent/MultiSlotComponent.svelte";
  import TransitionSteps from "../transitions/TransitionSteps/TransitionSteps.svelte";
  import store from "../../store.ts";
  import type { ComponentSteps, Store } from "../../types.ts";

  export let components: ComponentSteps;

  const steps: [(store: Store) => boolean, SvelteComponent][] = components.map(
    ([callback, component], index) => {
      return [
        (store: Store) => {
          const canReveal = store.value === index;

          return callback(store) && canReveal;
        },
        component,
      ];
    }
  );

  const slotCallbacks = new Map(steps);

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

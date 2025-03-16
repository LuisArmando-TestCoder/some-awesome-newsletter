<script lang="ts">
  import { onMount } from "svelte";
  import MultiSlotComponent from "../MultiSlotComponent/MultiSlotComponent.svelte";
  import store from "../store.ts";
  import A from "./A/A.svelte";
  import B from "./B/B.svelte";
  import type { Store } from "../types.ts";
  import TransitionSteps from "../TransitionSteps/TransitionSteps.svelte";

  const slotCallbacks = new Map([
    [
      ({ value }: Store) => {
        return value === 0;
      },
      A,
    ],
    [({ value }: Store) => value === 1, B],
    [({ value }: Store) => value === 2, B],
    [({ value }: Store) => value === 3, B],
  ]);

  const goNext = () => {
    if ($store.value <= 1) {
      store.set({ value: Math.min($store.value + 1, slotCallbacks.size) });
    }
  };

  onMount(() => {
    setTimeout(goNext, 5e3);
    setTimeout(goNext, 5e3 + 13.5e3);
  });
</script>

<MultiSlotComponent {slotCallbacks} sharedStore={store} />
<TransitionSteps {slotCallbacks} />

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
</script>

<MultiSlotComponent {slotCallbacks} sharedStore={store} />
<TransitionSteps {slotCallbacks} />

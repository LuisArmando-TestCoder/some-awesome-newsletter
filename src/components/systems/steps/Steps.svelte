<script lang="ts">
  import { onMount, type SvelteComponent } from "svelte";
  import MultiSlotComponent from "./MultiSlotComponent/MultiSlotComponent.svelte";
  import TransitionSteps from "../transitions/TransitionSteps/TransitionSteps.svelte";
  import store from "../../store.ts";
  import type { ComponentSteps, Store } from "../../types.ts";
  import { writable } from "svelte/store";

  export let components: ComponentSteps;
  let steps = writable<[(store: Store) => boolean, SvelteComponent][]>([]);

  onMount(() => {
    steps.set(
      components.map(([callback, component], index) => {
        return [
          (store: Store) => {
            const canReveal = store.value === index;

            const areAllPreviousValid = components
              .slice(0, index + 1)
              .every(([callback]) => callback(store));

            return canReveal && areAllPreviousValid;
          },
          component,
        ];
      })
    );
  });
</script>

<MultiSlotComponent steps={$steps} sharedStore={store} />
<TransitionSteps {components} />

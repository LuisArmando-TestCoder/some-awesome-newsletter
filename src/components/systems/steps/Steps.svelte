<script lang="ts">
  import { onMount, type SvelteComponent } from "svelte";
  import MultiSlotComponent from "../wrappers/MultiSlotComponent/MultiSlotComponent.svelte";
  import TransitionSteps from "./TransitionSteps/TransitionSteps.svelte";
  import store from "../../store";
  import type { ComponentSteps, Store } from "../../types";
  import { writable } from "svelte/store";
  import { ONBOARDING_STEP_COUNT as ONBOARDING_SLOTS } from "$lib/tutorial/onboardingState";

  export let components: ComponentSteps;
  let steps = writable<[(store: Store) => boolean, SvelteComponent][]>([]);

  onMount(() => {
    steps.set(
      components.map(([_, component], index) => {
        return [
          (store: Store) => {
            const canReveal = store.stepsIndex === index;
            const getAreAllPreviousValid = () => components
              .slice(0, index + 1)
              .every(([callback]) => callback(store));

            return canReveal && getAreAllPreviousValid();
          },
          component,
        ];
      })
    );
  });
</script>

<MultiSlotComponent steps={$steps} sharedStore={store} />
<!-- Onboarding steps (0 to 8) render their own Back/Continue buttons, so the global arrows only exist after setup. -->
{#if $store.stepsIndex >= ONBOARDING_SLOTS}
  <TransitionSteps {components} />
{/if}

<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import MultiSlotComponent from "./MultiSlotComponent/MultiSlotComponent.svelte";
  import TransitionSteps from "../transitions/TransitionSteps/TransitionSteps.svelte";
  import store from "../../store.ts";
  import type { ComponentSteps, Store } from "../../types.ts";

  export let components: ComponentSteps;

  const steps: [(store: Store) => boolean, SvelteComponent][] = components.map(
    ([_, component], index) => {
      return [
        (store: Store) => {
          const canReveal = store.value === index;

          return canReveal;
        },
        component
      ];
    }
  );
</script>

<MultiSlotComponent {steps} sharedStore={store} />
<TransitionSteps {components} />

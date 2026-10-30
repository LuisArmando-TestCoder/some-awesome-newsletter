<script lang="ts">
  import store, { saveToStore } from "../../../store";
  import TransitionButton from "../../buttons/TransitionButton/TransitionButton.svelte";
  import type { ComponentSteps } from "../../../types";

  export let components: ComponentSteps;

  const canShow = (
    direction: -1 | 0 | 1,
    isComingFromValidStep?: boolean
  ) =>
    components[$store.stepsIndex + direction]?.[0]?.({
      ...$store,
      isComingFromValidStep,
    });
</script>

{#each [-1, 1] as direction (direction)}
  <TransitionButton
    active={!$store.directionsThatShouldDisappear?.includes(direction) && canShow(direction as -1 | 1)}
    direction={direction as -1 | 1}
    callback={() => {
      canShow(direction as -1 | 1, canShow(direction as -1 | 1));

      saveToStore({
        hasInteracted: true,
        stepsIndex: $store.stepsIndex + direction,
      });
    }}
  />
{/each}

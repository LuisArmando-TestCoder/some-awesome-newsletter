<script lang="ts">
  import store from "../../../store.ts";
  import TransitionButton from "../../buttons/TransitionButton/TransitionButton.svelte";

  export let components: any[];

  const canShow = (
    direction: -1 | 0 | 1,
    isComingFromValidStep?: (v: any) => boolean
  ) =>
    components[$store.value + direction]?.[0]?.({
      ...$store,
      isComingFromValidStep,
    });
</script>

{#each [-1, 1] as direction}
  <TransitionButton
    active={canShow(direction as -1 | 1)}
    direction={direction as -1 | 1}
    callback={() => {
      canShow(direction as -1 | 1, canShow(direction as -1 | 1));

      store.set({
        ...$store,
        hasInteracted: true,
        value: $store.value + direction,
      });
    }}
  />
{/each}

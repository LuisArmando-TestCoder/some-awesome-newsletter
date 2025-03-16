<script lang="ts">
  import store from "../store.ts";
  import type { RevealMap } from "../types.ts";
  import TransitionButton from "../TransitionButton/TransitionButton.svelte";

  export let slotCallbacks: RevealMap;

  const canProceed = () =>
    [...slotCallbacks.entries()][$store.value][0]($store);
</script>

{#each [-1, 1] as direction}
  <TransitionButton
    active={$store.value + direction >= 0 &&
      $store.value + direction < slotCallbacks.size}
    direction={direction as -1 | 1}
    callback={() => {
      store.set({
        ...$store,
        hasInteracted: true,
        value: canProceed()
          ? Math.min(
              Math.max(
                (slotCallbacks.size + ($store.value + direction)) %
                  slotCallbacks.size,
                0
              ),
              slotCallbacks.size
            )
          : $store.value,
      });
    }}
  />
{/each}

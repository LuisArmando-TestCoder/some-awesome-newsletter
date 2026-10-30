<script lang="ts">
  import { onDestroy } from "svelte";
  import { writable, type Writable } from "svelte/store";
    import store from "../../../store";
  import type { StepComponent, StepValidator, Store } from "../../../types";

  export let steps: [StepValidator, StepComponent][];
  export let sharedStore: Writable<Store>;

  // Filled synchronously by the subscription below.
  const storeValue = writable<Store>({});

  const unsubscribe = sharedStore.subscribe((value) => {
    storeValue.set(value);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="multi-slot-component">
  {#each steps as [callback, Component], itemIndex (itemIndex)}
    <div
      class:collapsed={$store.header}
      class="multi-slot-component--component-slot"
      class:active={!!callback($storeValue)}
      class:inactive={!callback($storeValue)}
    >
      <div>
        <!-- Always render the component, but toggle classes -->
        <svelte:component
          this={Component}
          canReveal={!!callback($storeValue)}
        />
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use "./MultiSlotComponent.scss";
</style>

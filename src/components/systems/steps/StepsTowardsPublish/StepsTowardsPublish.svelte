<script lang="ts">
  import { onMount } from "svelte";
  import store, {
    getFromStore,
    populateToStore,
    saveToStore,
  } from "../../../store.ts";
  import Steps from "../Steps.svelte";
  import type { Store } from "../../../types.ts";

  export let components;

  const goNext = (currentIndex: number) => () => {
    if (
      !$store.hasInteracted &&
      $store.stepsIndex < currentIndex &&
      $store.stepsIndex + 1 === currentIndex
    ) {
      saveToStore({
        stepsIndex: Math.min($store.stepsIndex + 1, components.length),
      });
    }
  };

  function setStorageFromKeysToSave() {
    for (const key of $store.keysToSave) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || "");

        if (!value) continue;

        populateToStore(key, value);
      } catch {
        continue;
      }
    }
  }

  function setInitialNonInteractiveSlidesAutomaticSlideTime() {
    const timings = [6.5e3, 8e3, 9e3];
    let timing = 0;

    timings.forEach((waitDuration, index) => {
      if (index < $store.stepsIndex) return;

      timing += waitDuration;

      const wait = timing;
      console.log("index", index, $store.stepsIndex, timing, waitDuration);

      setTimeout(goNext(index + 1), wait);
    });
  }

  function saveAllKeysToSaveInLocalStorage() {
    store.subscribe((currentStore: Store) => {
      for (const key of currentStore.keysToSave) {
        localStorage.setItem(key, JSON.stringify(getFromStore(key)));
      }
    });
  }

  onMount(() => {
    setStorageFromKeysToSave();
    setInitialNonInteractiveSlidesAutomaticSlideTime();
    saveAllKeysToSaveInLocalStorage();
  });
</script>

<Steps {components} />

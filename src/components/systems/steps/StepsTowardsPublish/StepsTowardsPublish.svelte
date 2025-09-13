<script lang="ts">
  import { onMount } from "svelte";
  import store, {
    getFromStore,
    populateToStore,
    saveAllKeysToSaveInLocalStorage,
    saveToStore,
    stepsMapping,
    setStorageFromKeysToSave,
  } from "../../../store";
  import Steps from "../Steps.svelte";
  import type { Store } from "../../../types";
  import { user as userStore } from "$lib/stores/user.js";
  export let data;
  import askIsAuthCodeValid from "../../requests/askIsAuthCodeValid.js";

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

  function setInitialNonInteractiveSlidesAutomaticSlideTime() {
    const timings = [2.5e3, 2e3, 2e3];
    let timing = 0;

    timings.forEach((waitDuration, index) => {
      if (index < $store.stepsIndex) return;

      timing += waitDuration;

      const wait = timing;
      console.log("index", index, $store.stepsIndex, timing, waitDuration);

      setTimeout(goNext(index + 1), wait);
    });
  }

  // Set the global user store when the prop changes
  onMount(() => {
    console.log("$userStore", $store)
    askIsAuthCodeValid(() => {
      console.log("askIsAuthCodeValid", $store.newsSource, $store.lead)
      if (!$store.newsSource || $store.lead) {
        const fisrtNS = $store.config.newsSources?.[0];
        console.log("$store.config", $store.config)

        if (fisrtNS) {
          const { url, lead } = fisrtNS;
  
          saveToStore({
            newsSource: url,
            lead,
            stepsIndex: stepsMapping["News Sources"]
          });

          return;
        }

        // HERE make el burumbum
        setInitialNonInteractiveSlidesAutomaticSlideTime();
      }
    }); 
  });
</script>

<Steps {components} />

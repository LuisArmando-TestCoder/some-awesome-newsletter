<script lang="ts">
  import { onMount } from "svelte";
  import { startTicks } from "./ticks.js";
  import { populateToStore, getFromStore } from "../store.ts"; // Import store helpers
  import getGeoIpLanguage from "../systems/requests/getGeoIpLanguage.ts"; // Corrected import path

  onMount(async () => {
    startTicks();

    // Fetch global language if not already set (e.g., from localStorage)
    const currentLang = getFromStore("appLanguage");
    if (!currentLang || currentLang === "en") { // Check if default or unset
      const detectedLanguage = await getGeoIpLanguage(); // Call the abstracted function
      console.log("detectedLanguage", detectedLanguage);
      if (detectedLanguage) {
        populateToStore("appLanguage", detectedLanguage);
        console.log(`Global language set to: ${detectedLanguage}`);
      }
      // Error logging is handled within getGeoIpLanguage
    } else {
      console.log(`Global language already set to: ${currentLang}`);
    }
  });
</script>

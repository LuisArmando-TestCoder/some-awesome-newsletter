<script lang="ts">
  /**
   * App-wide data that loads once per visit: the visitor's language guess.
   * Skips the lookup when the visitor already chose a language.
   */
  import { onMount } from "svelte";
  import { populateToStore, getFromStore } from "../store";
  import getGeoIpLanguage from "../systems/requests/getGeoIpLanguage";

  onMount(() => {
    let cancelled = false;
    let chosen: string | null = null;
    try {
      chosen = localStorage.getItem("lang");
    } catch {
      // Storage blocked (private mode): use the browser language below.
    }
    const currentLang = getFromStore("appLanguage");
    if (!chosen && (!currentLang || currentLang === "en")) {
      getGeoIpLanguage().then((detected) => {
        if (!cancelled && detected) populateToStore("appLanguage", detected);
      });
    }
    return () => {
      cancelled = true;
    };
  });
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state"; // Use $app/state instead
  import store, { saveToStore } from "../../../../store.ts"; // Import saveToStore function
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
    import { writable } from "svelte/store";

  export let canReveal = false;
  const configuratorId = writable("");

  onMount(() => {
    // Extract configuratorId, newsSourceId, and lead from url queries
    const urlParams = page.url.searchParams; // Remove $ prefix
    const newsSourceId = urlParams.get("newsSourceId");
    configuratorId.set(urlParams.get("configuratorId") as string);

    console.log($configuratorId, "configuratorId")
    // const lead = urlParams.get("lead"); // Lead will be read directly in D_Subscribed

    // Store them if they exist
    if (newsSourceId && $configuratorId) { // Only check for these two now
      saveToStore({
        subscriberNewsSourceId: newsSourceId,
        subscriberConfiguratorId: $configuratorId,
        // subscriberLead: lead // Don't save lead here
      });
      console.log('A_Welcome: Saved params to store', { newsSourceId, configuratorId: $configuratorId });
    } else {
      console.warn(
        "A_Welcome.svelte: Missing newsSourceId or configuratorId in URL query parameters." // Updated warning
      );
    }
  });
</script>

<Centered>
  <MarkdownText {canReveal}>
    ## Welcome to the Newsletter.
  </MarkdownText>

  {#key $configuratorId}
    <MarkdownText {canReveal}>
      ### You have been invited by {$configuratorId}.
    </MarkdownText>
  {/key}
</Centered>

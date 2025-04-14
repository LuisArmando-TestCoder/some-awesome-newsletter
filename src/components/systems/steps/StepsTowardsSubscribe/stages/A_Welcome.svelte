<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state"; // Use $app/state instead
  import store, { saveToStore } from "../../../../store.ts"; // Import saveToStore function
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;

  onMount(() => {
    // Extract configuratorId, newsSourceId, and lead from url queries
    const urlParams = page.url.searchParams; // Remove $ prefix
    const newsSourceId = urlParams.get("newsSourceId");
    const configuratorId = urlParams.get("configuratorId");
    // const lead = urlParams.get("lead"); // Lead will be read directly in D_Subscribed

    // Store them if they exist
    if (newsSourceId && configuratorId) { // Only check for these two now
      saveToStore({
        subscriberNewsSourceId: newsSourceId,
        subscriberConfiguratorId: configuratorId,
        // subscriberLead: lead // Don't save lead here
      });
      console.log('A_Welcome: Saved params to store', { newsSourceId, configuratorId });
    } else {
      console.warn(
        "A_Welcome.svelte: Missing newsSourceId or configuratorId in URL query parameters." // Updated warning
      );
    }
  });
</script>

<Centered>
  <MarkdownText {canReveal}>
    ## **AI-Powered Newsletter** every now and then.
  </MarkdownText>

  <MarkdownText {canReveal}>
    ### Get **Curated Content** in your own language.
  </MarkdownText>
</Centered>

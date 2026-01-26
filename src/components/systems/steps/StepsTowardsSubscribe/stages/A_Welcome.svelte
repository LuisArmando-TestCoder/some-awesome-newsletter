<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state"; // Use $app/state instead
  import store, { saveToStore } from "../../../../store"; // Import saveToStore function
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { writable } from "svelte/store";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from '$lib/i18n/translations';

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
    ## {$t['subscribe.welcome.title']}
  </MarkdownText>

  <div class="wrap-text">
    {#key $configuratorId}
      <MarkdownText {canReveal}>
        ### {$t['subscribe.welcome.invitedBy'].replace("{configuratorId}", $configuratorId)}
      </MarkdownText>
    {/key}
  </div>

  <div class="right-align">
    <SubmitButton
      callback={() => saveToStore({ stepsIndex: $store.stepsIndex + 1 })}
    />
  </div>
</Centered>

<style>
  .wrap-text .wrapper-letter {
    transition-delay: 0.89588s;
    width: 200px;
    display: block;
    overflow: hidden;
  }

  .right-align {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>

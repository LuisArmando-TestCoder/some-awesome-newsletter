<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state"; // Use $app/state instead
  import store, { saveToStore } from "../../../../store"; // Import saveToStore function
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { writable } from "svelte/store";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from '$lib/i18n/subscribe-translations';

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

  $: $t;
</script>

<Centered>
  <h2>{$t.welcome.title}</h2>

  <div class="wrap-text">
    {#key $configuratorId}
      <h3>{$t.welcome.invitedBy.replace("{configuratorId}", $configuratorId)}</h3>
    {/key}
  </div>

  <div class="right-align">
    <SubmitButton
      callback={() => saveToStore({ stepsIndex: $store.stepsIndex + 1 })}
    />
  </div>
</Centered>

<style>
  h2 {
    font-family: var(--font-title);
    font-size: 30px;
    color: var(--color-foreground);
    line-height: 1.5;
    margin: 1em 0;
  }

  h3 {
    font-family: var(--font-title);
    font-size: 22px;
    color: var(--color-background);
    line-height: 1.5;
    margin: 0.5em 0;
  }

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

<script lang="ts">
  // Removed onMount and related imports
  import store from "../../../../store";
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { page } from "$app/state"; // Use $app/state instead
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>## You're **In!** Welcome Aboard.</MarkdownText>

  <MarkdownText {canReveal}>
    ### Get Ready for **Exclusive Insights** Landing in Your Inbox Soon.
  </MarkdownText>

  <!-- Read lead directly from URL using page state -->
  {@const leadUrl = page.url.searchParams.get("lead")}
  {#if leadUrl}
    <div class="right">
      <SubmitButton
        callback={() =>
          (window.location.href = `${$store.apiURL()}/lead-counter?leadUrl=${leadUrl}&configuratorId=${
            $store.subscriberConfiguratorId
          }&newsSourceId=${
            $store.subscriberNewsSourceId
          }&newsletterUserId=${$store.subscriberEmail}`)}
        label="Continue to {new URL(leadUrl).host.replace("www.", "")}"
      />
    </div>
  {:else}
    <!-- Optionally show a message if lead URL is missing -->
    <p style="margin-top: 1rem; color: grey; font-size: 0.9em;">
      Finishing up...
    </p>
  {/if}
</Centered>

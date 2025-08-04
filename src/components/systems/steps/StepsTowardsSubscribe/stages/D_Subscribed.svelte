<script lang="ts">
  // Removed onMount and related imports
  import store from "../../../../store.ts";
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
          (window.location.href = `${$store.apiURL()}/lead-counter?leadUrl=${
            $store.subscriberLead
          }&configuratorId=${$store.subscriberConfiguratorId}&newsSourceId=${
            $store.subscriberNewsSourceId
          }&newsletterUserId=${$store.subscriberEmail}`)}
        label="Continue to {new URL($store.subscriberLead).host.replace("www.", "")}"
      />
    </div>
  {:else}
    <!-- Optionally show a message if lead URL is missing -->
    <p style="margin-top: 1rem; color: grey; font-size: 0.9em;">
      Finishing up...
    </p>
  {/if}
</Centered>

<style>
  .right {
    display: block;
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 2rem;
  }

  .cta-button {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    background-color: var(--color-foreground); /* Use theme color or fallback */
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s ease;
  }

  .cta-button:hover {
    background-color: var(
      --color-background-inversion
    ); /* Darker shade on hover */
  }
</style>

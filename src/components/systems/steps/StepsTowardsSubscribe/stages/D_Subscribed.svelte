<script lang="ts">
  // Removed onMount and related imports
  import store from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { page } from "$app/state"; // Use $app/state instead
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from '$lib/i18n/subscribe-translations';

  export let canReveal = false;

  $: $t;
</script>

<Centered>
  <h2>{$t.subscribed.title}</h2>

  <h3>{$t.subscribed.subtitle}</h3>

  <!-- Read lead directly from URL using page state -->
  {@const leadUrl = decodeURIComponent(page.url.searchParams.get("lead") || "")}
  {#if leadUrl}
    <div class="right">
      <SubmitButton
        callback={() =>
          (window.location.href = `${$store.apiURL()}/lead-counter?leadUrl=${leadUrl}&configuratorId=${
            $store.subscriberConfiguratorId
          }&newsSourceId=${
            $store.subscriberNewsSourceId
          }&newsletterUserId=${$store.subscriberEmail}`)}
        label="{$t.subscribed.continueTo} {new URL(leadUrl).host.replace("www.", "")}"
      />
    </div>
  {:else}
    <!-- Optionally show a message if lead URL is missing -->
    <p style="margin-top: 1rem; color: grey; font-size: 0.9em;">
      {$t.subscribed.finishingUp}
    </p>
  {/if}
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
</style>

<script lang="ts">
  import { writable } from "svelte/store";
  import type { NewsSource } from "../../../../../../types";
  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import regenerateSelectors from "../../../../../requests/regenerateSelectors";
  import store, { latestMessage } from "../../../../../../store";
  import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";
  import CopyUrlWithQR from "../../../../../../common/CopyUrlWithQR.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import PostExplanation from "../NewsSource/PostExplanation.svelte";

  export let newsSource: NewsSource;
  export let canReveal: boolean = true;

  let linkSelector = newsSource.linkSelector || "";
  const isRegenerating = writable(false);
  const errorRegeneratingSelectors = writable(false);

  latestMessage.subscribe((message) => {
    if (message.includes("Regenerating selectors")) {
      isRegenerating.set(true);
      errorRegeneratingSelectors.set(false);
    } else if (message.includes("Selectors regenerated successfully")) {
      isRegenerating.set(false);
      errorRegeneratingSelectors.set(false);
    } else if (message.includes("Error regenerating selectors")) {
      isRegenerating.set(false);
      errorRegeneratingSelectors.set(true);
    }
  });
</script>

<div class="selectors-group">
  <CopyUrlWithQR
  configuratorEmail={$store.configuratorEmail}
  newsSourceId={newsSource.id}
  lead={newsSource.lead}
  label={$t['labels.manualSubscriptionLink']}
  />
    <ToggleCard {canReveal} cardTitle={$t['labels.apiPlayground']} isOpen={false} onChange={() => {}}>
      <PostExplanation {newsSource} />
    </ToggleCard>

    <IconButton
      src="./icons/refresh.svg"
      disabled={$isRegenerating}
      loading={$isRegenerating}
      label={$t['labels.regenerateSelectors']}
      callback={async () => {
        isRegenerating.set(true);
        errorRegeneratingSelectors.set(false);
        const response = await regenerateSelectors(
          $store.configuratorEmail,
          newsSource.id,
          newsSource.url
        );
        errorRegeneratingSelectors.set(!response);
        isRegenerating.set(false);
        if (response) {
          linkSelector = response.linkSelector;
        }
      }}
    />
    <div class={$isRegenerating ? "loading" : "none"}>
      {$isRegenerating ? $latestMessage : ""}
    </div>
    <div class={$errorRegeneratingSelectors ? "error" : "none"}>
      {$errorRegeneratingSelectors
        ? `${$t['errors.regeneratingSelectors']}: ${$latestMessage}`
        : ""}
    </div>
    <PlainText
      label={$t['labels.linkSelector']}
      placeholder={$t['placeholders.linkSelector']}
      bind:value={linkSelector}
    />
  </div>

<style lang="scss">
  .selectors-group {
    margin: 1rem 0;
    display: grid;
    gap: 25px;
  }
</style>

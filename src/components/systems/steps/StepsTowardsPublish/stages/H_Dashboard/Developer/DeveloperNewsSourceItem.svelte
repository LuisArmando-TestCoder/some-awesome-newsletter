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
  export let disabled: boolean = false;

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

  const handleRegenerate = async () => {
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
  };
</script>

  <div class="developer-item-card" class:disabled>
    <section class="config-row">
      <div class="description">
      <h4>{$t['labels.connectionDetails'] || "Connection"}</h4>
      <p>{$t['descriptions.connection'] || "Use this link to sync your news source manually."}</p>
    </div>
    <div class="action-component">
      <CopyUrlWithQR
        configuratorEmail={$store.configuratorEmail}
        newsSourceId={newsSource.id}
        lead={newsSource.lead}
        label={$t['labels.manualSubscriptionLink'] || "Copy Link"}
      />
    </div>
  </section>

  <hr class="divider" />

  <section class="config-row">
    <div class="description">
      <h4>{$t['labels.linkDetection'] || "Detection Pattern"}</h4>
      <p>{$t['descriptions.detection'] || "The CSS selector used to find links on the source page."}</p>
    </div>
    <div class="action-component">
      <div class="input-with-inline-action">
        <PlainText
          label="" 
          placeholder={$t['placeholders.linkSelector'] || "Enter selector..."}
          bind:value={linkSelector}
          disabled={disabled}
        />
        <div class="inline-button">
          <IconButton
            src="./icons/refresh.svg"
            disabled={$isRegenerating || disabled}
            loading={$isRegenerating}
            label={$t['labels.autoDetect'] || "Auto-detect"}
            callback={handleRegenerate}
          />
        </div>
      </div>
      
      <div class="feedback-area">
        {#if $isRegenerating}
          <span class="status-msg loading">{$latestMessage}</span>
        {:else if $errorRegeneratingSelectors}
          <span class="status-msg error">{$t['errors.regeneratingSelectors']}: {$latestMessage}</span>
        {/if}
      </div>
    </div>
  </section>

  <div class="advanced-tools">
    <ToggleCard 
      {canReveal} 
      cardTitle={$t['labels.apiPlayground'] || "Developer API Playground"} 
      isOpen={false} 
      onChange={() => {}}
    >
      <PostExplanation {newsSource} />
    </ToggleCard>
  </div>
</div>

<style lang="scss">
  .developer-item-card {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #eaeaea;
    transition: opacity 0.3s;

    &.disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  }

  .config-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
    }
  }

  .description {
    flex: 1;
    h4 {
      margin: 0 0 4px 0;
      font-size: 1rem;
      font-weight: 600;
      color: #111;
    }
    p {
      margin: 0;
      font-size: 0.85rem;
      color: #666;
      line-height: 1.4;
    }
  }

  .action-component {
    flex: 1.5;
    width: 100%;
  }

  .input-with-inline-action {
    display: grid;
    justify-items: right;
    gap: 24px;

    :global(.plain-text-container) {
      margin: 0; /* Removing default margins to align with button */
    }
  }

  .feedback-area {
    height: 20px;
    margin-top: 4px;
    font-size: 0.75rem;

    .status-msg {
      &.loading { color: #4f46e5; }
      &.error { color: #d32f2f; }
    }
  }

  .divider {
    border: 0;
    border-top: 1px solid #f0f0f0;
    margin: 0;
  }

  .advanced-tools {
    margin-top: 8px;
    
    :global(.toggle-card) {
      border: 1px solid #f0f0f0;
      background: #fafafa;
    }
  }
</style>
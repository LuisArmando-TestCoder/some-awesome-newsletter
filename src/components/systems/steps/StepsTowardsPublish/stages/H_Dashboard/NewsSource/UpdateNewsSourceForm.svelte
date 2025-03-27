<script lang="ts">
  // 1) Remove createEventDispatcher import and use a writable store
  // import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import type { NewsSource } from "../../../../../../types.ts";

  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import Country from "../../../../../inputs/Country/Country.svelte";
  import ScheduleTime from "../../../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";

  import updateNewsSource from "../../../../../requests/updateNewsSource.ts";
  import { processNewsSourceAction } from "./newsSourceActions.ts";
  import Link from "../../../../../inputs/Link/Link.svelte";
  import regenerateSelectors from "../../../../../requests/regenerateSelectors.ts";
  import store, { latestMessage } from "../../../../../../store.ts";
  import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";

  // The news source to update
  export let newsSource: NewsSource;

  // The local update fields we track
  export let updateFields: {
    community: string;
    country: string;
    lead: string;
    personality: string;
    scheduleTime: string;
    linkSelector: string;
    url: string;
    id: string;
  };

  // For error messages
  export let errorMessage: string;
  // For toggling advanced fields
  export let canReveal: boolean = true;

  // 2) Create a local store for "updated news source"
  //    So consumers can subscribe to this rather than listening for a Svelte event.
  export const updatedNewsSource = writable<NewsSource | null>(null);

  // We previously had: const dispatch = createEventDispatcher();

  // Update the news source
  async function handleUpdate() {
    const payload = {
      community: updateFields.community,
      country: updateFields.country,
      lead: updateFields.lead,
      personality: updateFields.personality,
      scheduleTime: updateFields.scheduleTime,
      linkSelector: updateFields.linkSelector,
      url: updateFields.url,
      id: updateFields.id,
    };

    await processNewsSourceAction(
      payload,
      // Transform is trivial here, so just return the payload
      (f) => f,
      updateNewsSource,
      (msg) => (errorMessage = msg),
      "Failed to update news source. Please try again.",
      (updated) => {
        // 3) Instead of dispatching an event, set the store value
        updatedNewsSource.set(updated);
      }
    );
  }

  const isRegenerating = writable(false);
  const errorRegeneratingSelectors = writable(false);

  $: updateFields;
  $: $store;
</script>

<form class="news-source-update-form" on:submit|preventDefault={handleUpdate}>
  <!-- Non-selector fields -->
  <ToggleCard {canReveal} cardTitle="Basic Settings" isOpen={false}>
    <div class="selectors-group">
      <PlainText
        label="Community"
        placeholder="e.g. 'Expats from US'"
        value={updateFields.community}
        onChange={(val) => (updateFields.community = val)}
      />

      <Country
        defaultCountryCode={updateFields.country}
        onSelect={(code) => (updateFields.country = code)}
      />

      <Link
        label="Lead"
        placeholder="Destination URL or text"
        value={updateFields.lead}
        onChange={(val) => (updateFields.lead = val)}
      />

      <Link
        label="News Source URL"
        placeholder="Your news source URL"
        value={updateFields.url}
        onChange={(val) => (updateFields.url = val)}
      />

      <PlainText
        label="Personality"
        placeholder="Tone (e.g. 'Warm and professional')"
        value={updateFields.personality}
        onChange={(val) => (updateFields.personality = val)}
      />

      <ScheduleTime
        label="Schedule Time"
        placeholder="e.g., 'every Monday at 9 AM'"
        value={updateFields.scheduleTime}
        onChange={(_, cron) => (updateFields.scheduleTime = cron)}
      />
    </div>
  </ToggleCard>

  <!-- Advanced Scrape Selectors -->
  <ToggleCard {canReveal} cardTitle="Advanced Scrape Selectors" isOpen={false}>
    <div class="selectors-group">
      <IconButton
        src="./icons/refresh.svg"
        disabled={$isRegenerating}
        loading={$isRegenerating}
        label="Regenerate Selectors"
        callback={async () => {
          isRegenerating.set(true);
          errorRegeneratingSelectors.set(false);
          const response = await regenerateSelectors(
            $store.configuratorEmail,
            updateFields.id,
            updateFields.url
          );

          errorRegeneratingSelectors.set(!response);
          isRegenerating.set(false);

          if (response) {
            updateFields.linkSelector = response.linkSelector;
          }
        }}
      />
      <div class={$isRegenerating ? "loading" : "none"}>
        {$isRegenerating ? $latestMessage : ""}
      </div>
      <div class={$errorRegeneratingSelectors ? "error" : "none"}>
        {$errorRegeneratingSelectors
          ? `Error regenerating selectors at: ${$latestMessage}`
          : ""}
      </div>
      <PlainText
        label="Link Selector"
        placeholder="CSS selector for article link"
        value={updateFields.linkSelector}
        onChange={(val) => (updateFields.linkSelector = val)}
      />
    </div>
  </ToggleCard>

  <SubmitButton label="Update News Source" callback={handleUpdate} />

  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
  {/if}
</form>

<style lang="scss">
  .news-source-update-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .selectors-group {
    margin: 1rem 0;
    display: grid;
    gap: 25px;
  }

  .error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
</style>

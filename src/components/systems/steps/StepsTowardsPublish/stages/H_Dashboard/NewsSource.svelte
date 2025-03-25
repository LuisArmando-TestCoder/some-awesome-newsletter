<script lang="ts">
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import PlainText from "../../../../inputs/PlainText/PlainText.svelte";
  import CardComponent from "../../../../selectors/Card/Card.svelte";
  import store, { latestMessage, saveToStore } from "../../../../../store.ts";
  import ScheduleTime from "../../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import createNewsSource from "../../../../requests/createNewsSource.ts";
  import updateNewsSource from "../../../../requests/updateNewsSource.ts";
  import Link from "../../../../inputs/Link/Link.svelte";
  import ToggleCard from "../../../../buttons/ToggleCard/ToggleCard.svelte";
  import type { NewsSource } from "../../../../../types.ts";
  import TextTypes from "../../../../texts/TextTypes/TextTypes.svelte";

  export let canReveal = true;

  // --------------------------------------------------------------------------
  // ADD NEWS SOURCE: state + logic
  // --------------------------------------------------------------------------
  let addNewsSourceUrl = "";
  let addNewsSourceLead = "";
  let addNewsSourcePersonality = "";
  let addNewsSourceSchedule = "";
  let isAdding = false;
  let addErrorMessage = "";
  let isAddCardOpen = false;

  // Validate required fields for add/update
  function validateFields(fields: { url: string; lead: string }): string {
    if (!fields.url || !fields.lead) {
      return "Please fill in all the fields.";
    }
    return "";
  }

  function clearAddForm() {
    addNewsSourceUrl = "";
    addNewsSourceLead = "";
    addNewsSourcePersonality = "";
    addNewsSourceSchedule = "";
  }

  // Reusable function for add/update API calls
  async function processNewsSourceAction<T>(
    fields: T,
    transform: (fields: T) => any,
    apiCall: (payload: any, id?: string) => Promise<any>,
    setError: (msg: string) => void,
    errorMessage: string,
    onSuccess: (result: any) => void
  ): Promise<void> {
    const payload = transform(fields);
    const validationError = validateFields({
      url: payload.url,
      lead: payload.lead
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    let result;
    try {
      result = await apiCall(payload, payload.id);
    } catch (e) {
      console.error("[NEWS-SOURCE-ERROR]", e);
      setError(errorMessage);
      return;
    }
    if (!result) {
      setError(errorMessage);
      return;
    }
    onSuccess(result);
  }

  // Handle the "Add News Source" action
  async function handleAddNewsSource() {
    isAdding = true;
    const fields = {
      url: addNewsSourceUrl,
      lead: addNewsSourceLead,
      personality: addNewsSourcePersonality,
      schedule: addNewsSourceSchedule,
    };
    await processNewsSourceAction(
      fields,
      (f) => ({
        type: "website",
        url: f.url,
        country: "US",
        community: "Expats from US",
        lead: f.lead,
        scheduleTime: f.schedule,
        personality: f.personality,
      }),
      createNewsSource,
      (msg) => (addErrorMessage = msg),
      "Failed to add news source. Please try again.",
      (created) => {
        // If successful, push into local store config
        const currentConfig = $store.config;
        if (currentConfig?.newsSources) {
          currentConfig.newsSources.push(created);
          saveToStore({ config: currentConfig });
        }
        clearAddForm();
        isAddCardOpen = false;
      }
    );
    isAdding = false;
  }

  // --------------------------------------------------------------------------
  // UPDATE NEWS SOURCE: state + logic
  // --------------------------------------------------------------------------
  // We'll store only the fields you actually want to display (no id/url/type).
  let updateErrorMessages: Record<string, string> = {};
  let updateFields: Record<
    string,
    {
      community: string;
      country: string;
      lead: string;
      personality: string;
      scheduleTime: string;
      titleSelector: string;
      contentSelector: string;
      linkSelector: string;
    }
  > = {};

  // On each change to store.config.newsSources, populate updateFields
  $: if ($store.config?.newsSources) {
    $store.config.newsSources.forEach((ns: NewsSource) => {
      if (!ns || !ns.id) return;
      if (!updateFields[ns.id]) {
        updateFields[ns.id] = {
          community: ns.community || "",
          country: ns.country || "",
          lead: ns.lead || "",
          personality: ns.personality || "",
          scheduleTime: ns.scheduleTime || "",
          titleSelector: ns.titleSelector || "",
          contentSelector: ns.contentSelector || "",
          linkSelector: ns.linkSelector || "",
        };
      }
    });
  }

  async function handleUpdateNewsSource(nsId: string) {
    const fields = updateFields[nsId];
    // Construct payload with only the fields we want to update
    const payload = {
      community: fields.community,
      country: fields.country,
      lead: fields.lead,
      personality: fields.personality,
      scheduleTime: fields.scheduleTime,
      titleSelector: fields.titleSelector,
      contentSelector: fields.contentSelector,
      linkSelector: fields.linkSelector,
    };

    try {
      const updated = await updateNewsSource(payload, nsId);
      if (!updated) {
        updateErrorMessages[nsId] = "Update failed: server returned no data.";
      }
    } catch (err) {
      console.error("[LOG-UPDATE-ERROR]", err);
      updateErrorMessages[nsId] = "Failed to update news source. Please try again.";
    }
  }

  // For display, reverse the array so newest appears first
  $: newsSourcesReversed = $store.config?.newsSources
    ? [...$store.config.newsSources].reverse()
    : [];
</script>

<!-- Outer Card -->
<CardComponent collapsed={false} {canReveal} svg="idea" label="News Sources">

  <!-- Toggle card for adding a new news source -->
  <ToggleCard
    {canReveal}
    cardTitle="Add News Source"
    isOpen={isAddCardOpen}
    onChange={(isOpen) => {
      isAddCardOpen = isOpen;
    }}
  >
    <form class="news-source-form" on:submit|preventDefault={handleAddNewsSource}>
      <!-- The user can enter the 'lead' and 'URL' for the new source -->
      <Link
        placeholder="Lead (destination URL or identifier)"
        value={addNewsSourceLead}
        onChange={(val) => (addNewsSourceLead = val)}
      />
      <Link
        placeholder="News Source URL"
        value={addNewsSourceUrl}
        onChange={(val) => (addNewsSourceUrl = val)}
      />
      <!-- Personality & schedule are optional in the example, but you can add them similarly -->

      {#if isAdding}
        <TextTypes type="sub-highlight-italic">
          {$latestMessage}
        </TextTypes>
      {/if}
      <SubmitButton
        disabled={isAdding}
        loading={isAdding}
        label={isAdding ? "Adding" : "Upload News Source"}
        callback={handleAddNewsSource}
      />
      {#if addErrorMessage}
        <div class="error-message">{addErrorMessage}</div>
      {/if}
    </form>
  </ToggleCard>

  <!-- List of existing news sources -->
  <div class="news-sources-list">
    {#if newsSourcesReversed && newsSourcesReversed.length}
      {#each newsSourcesReversed as ns (ns.id)}
        <ToggleCard
          {canReveal}
          cardTitle={`${ns.url.split("//")[1]} ⟫ ${ns.lead.split("//")[1]}`}
          isOpen={!!$store.toggles[`newsSource_${ns.id}`]}
          onChange={(isOpen) => {
            console.log(
              "[LOG-TOGGLE-UPDATE-CARD] Toggled update card for news source id:",
              ns.id,
              "State:",
              isOpen
            );
          }}
        >
          <!-- UPDATE FORM -->
          <form
            class="news-source-update-form"
            on:submit|preventDefault={() => handleUpdateNewsSource(ns.id)}
          >
            <!-- Non-selector fields -->
            <PlainText
              label="Community"
              placeholder="e.g. 'Expats from US'"
              value={updateFields[ns.id].community}
              onChange={(val) => (updateFields[ns.id].community = val)}
            />
            <PlainText
              label="Country"
              placeholder="e.g. 'US'"
              value={updateFields[ns.id].country}
              onChange={(val) => (updateFields[ns.id].country = val)}
            />
            <PlainText
              label="Lead"
              placeholder="Destination URL or text"
              value={updateFields[ns.id].lead}
              onChange={(val) => (updateFields[ns.id].lead = val)}
            />
            <PlainText
              label="Personality"
              placeholder="Tone (e.g. 'Warm and professional')"
              value={updateFields[ns.id].personality}
              onChange={(val) => (updateFields[ns.id].personality = val)}
            />
            <ScheduleTime
              label="Schedule Time"
              placeholder="e.g., 'every Monday at 9 AM'"
              value={updateFields[ns.id].scheduleTime}
              onChange={(_, cron) => (updateFields[ns.id].scheduleTime = cron)}
            />

            <!-- Group the three selector fields -->
            <div class="selectors-group">
              <PlainText
                label="Title Selector"
                placeholder="CSS selector for article title"
                value={updateFields[ns.id].titleSelector}
                onChange={(val) => (updateFields[ns.id].titleSelector = val)}
              />
              <PlainText
                label="Content Selector"
                placeholder="CSS selector for article content"
                value={updateFields[ns.id].contentSelector}
                onChange={(val) => (updateFields[ns.id].contentSelector = val)}
              />
              <PlainText
                label="Link Selector"
                placeholder="CSS selector for article link"
                value={updateFields[ns.id].linkSelector}
                onChange={(val) => (updateFields[ns.id].linkSelector = val)}
              />
            </div>

            <SubmitButton
              label="Update News Source"
              callback={() => handleUpdateNewsSource(ns.id)}
            />
            {#if updateErrorMessages[ns.id]}
              <div class="error-message">{updateErrorMessages[ns.id]}</div>
            {/if}
          </form>
        </ToggleCard>
      {/each}
    {:else}
      <p class="loading">
        <TextTypes type="sub-highlight-italic">
          We are obtaining your news sources
        </TextTypes>
      </p>
      <TextTypes type="sub-highlight-italic">
        {$latestMessage}
      </TextTypes>
    {/if}
  </div>
</CardComponent>

<style lang="scss">
  @use "./Dashboard.scss";

  .news-source-form,
  .news-source-update-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .selectors-group {
    margin: 1rem 0;
    padding: 0 1rem;
    border: 1px solid #0002;
    border-width: 0 0 0 1px;
    display: grid;
    gap: 25px;
  }

  .error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }

  .news-sources-list {
    margin-top: 2rem;
  }
</style>

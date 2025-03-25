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

  // State for the "Add News Source" card
  let addNewsSourceUrl = "";
  let addNewsSourceLead = "";
  let addNewsSourcePersonality = "";
  let addNewsSourceSchedule = "";
  let isAdding = false;
  let addErrorMessage = "";
  let isAddCardOpen = false;

  // Holds error messages for update operations per news source
  let updateErrorMessages: Record<string, string> = {};

  // Log reactive changes for add form fields.
  $: console.log(
    "[LOG-REACTIVE-ADD-URL] addNewsSourceUrl changed:",
    addNewsSourceUrl
  );
  $: console.log(
    "[LOG-REACTIVE-ADD-LEAD] addNewsSourceLead changed:",
    addNewsSourceLead
  );
  $: console.log(
    "[LOG-REACTIVE-ADD-PERSONALITY] addNewsSourcePersonality changed:",
    addNewsSourcePersonality
  );
  $: console.log(
    "[LOG-REACTIVE-ADD-SCHEDULE] addNewsSourceSchedule changed:",
    addNewsSourceSchedule
  );

  // Helper function to validate required fields.
  function validateFields(fields: { url: string; lead: string }): string {
    console.log("[LOG-VALIDATE] Validating fields:", fields);
    if (!fields.url || !fields.lead) {
      console.log("[LOG-VALIDATE-FAIL] Missing required fields:", fields);
      return "Please fill in all the fields.";
    }
    console.log("[LOG-VALIDATE-SUCCESS] Fields validated.");
    return "";
  }

  // Helper to clear the add news source form.
  function clearAddForm() {
    console.log("[LOG-CLEAR-FORM] Clearing add form fields.");
    addNewsSourceUrl = "";
    addNewsSourceLead = "";
    addNewsSourcePersonality = "";
    addNewsSourceSchedule = "";
  }

  // Generic function to process add or update news source actions.
  async function processNewsSourceAction<T>(
    fields: T,
    transform: (fields: T) => any,
    apiCall: (payload: any, id?: string) => Promise<any>,
    setError: (msg: string) => void,
    errorMessage: string,
    onSuccess: (result: any) => void
  ): Promise<void> {
    console.log("[LOG-PROCESS-START] Processing action with fields:", fields);
    const payload = transform(fields);
    console.log("[LOG-PROCESS-PAYLOAD] Transformed payload:", payload);

    const validationError = validateFields({
      url: payload.url,
      lead: payload.lead,
    });
    if (validationError) {
      console.log(
        "[LOG-PROCESS-VALIDATION-FAIL] Validation failed:",
        validationError
      );
      setError(validationError);
      return;
    }
    setError("");

    console.log("[LOG-PROCESS-API-CALL] Calling API with payload:", payload);
    let result;
    try {
      result = await apiCall(payload, payload.id);
      console.log("[LOG-PROCESS-API-RESULT] API call result:", result);
    } catch (e) {
      console.log("[LOG-PROCESS-API-EXCEPTION] API call exception:", e);
      setError(errorMessage);
      return;
    }
    if (!result) {
      console.log(
        "[LOG-PROCESS-FAILURE] API call did not return a valid result."
      );
      setError(errorMessage);
      return;
    }
    console.log("[LOG-PROCESS-SUCCESS] API call successful.");
    onSuccess(result);
  }

  // Handle adding a new news source.
  async function handleAddNewsSource() {
    console.log("[LOG-ADD-START] Starting add news source process.");
    isAdding = true;
    const fields = {
      url: addNewsSourceUrl,
      lead: addNewsSourceLead,
      personality: addNewsSourcePersonality,
      schedule: addNewsSourceSchedule,
    };
    console.log("[LOG-ADD-PARAMS] Add form parameters:", fields);

    await processNewsSourceAction(
      fields,
      (fields) => ({
        type: "website",
        url: fields.url,
        country: "US",
        community: "Expats from US",
        lead: fields.lead,
        scheduleTime: fields.schedule,
        personality: fields.personality,
      }),
      createNewsSource,
      (msg: string) => {
        console.log("[LOG-ADD-ERROR] Error during add:", msg);
        addErrorMessage = msg;
      },
      "Failed to add news source. Please try again.",
      (created) => {
        console.log(
          "[LOG-ADD-SUCCESS] News source added successfully:",
          created
        );
        const currentConfig = $store.config;
        if (currentConfig && Array.isArray(currentConfig.newsSources)) {
          currentConfig.newsSources.push(created);
          saveToStore({ config: currentConfig });
          console.log("[LOG-ADD-SAVE] Saved updated config to store.");
        }
        clearAddForm();
        isAddCardOpen = false;
      }
    );
    isAdding = false;
    console.log("[LOG-ADD-END] Finished add news source process.");
  }

  // For each existing news source, we keep a local copy of its editable fields.
  let updateFields: Record<
    string,
    {
      url: string;
      lead: string;
      personality: string;
      schedule: string;
      id: string;
    }
  > = {};

  // Initialize updateFields when the config changes.
  $: if ($store.config && $store.config.newsSources) {
    console.log(
      "[LOG-UPDATEFIELDS-INIT] Initializing updateFields with config:",
      $store.config
    );
    $store.config.newsSources
      .filter((ns) => ns)
      .forEach((ns: NewsSource) => {
        if (!updateFields[ns.id]) {
          updateFields[ns.id] = {
            url: ns.url,
            lead: ns.lead,
            personality: ns.personality,
            schedule: ns.scheduleTime,
            id: ns.id,
          };
          console.log(
            "[LOG-UPDATEFIELDS-NEW] Added updateFields for news source id:",
            ns.id,
            updateFields[ns.id]
          );
        }
      });
  }

  // Handle updating an existing news source.
  async function handleUpdateNewsSource(nsId: string) {
    console.log(
      "[LOG-UPDATE-START] Starting update process for news source id:",
      nsId
    );
    const fields = updateFields[nsId];
    console.log(
      "[LOG-UPDATE-PARAMS] Update form parameters for news source id:",
      nsId,
      fields
    );

    await processNewsSourceAction(
      fields,
      (fields) => ({
        url: fields.url,
        lead: fields.lead,
        personality: fields.personality,
        scheduleTime: fields.schedule,
        id: fields.id,
      }),
      updateNewsSource,
      (msg: string) => {
        console.log(
          "[LOG-UPDATE-ERROR] Error updating news source id:",
          nsId,
          msg
        );
        updateErrorMessages[nsId] = msg;
      },
      "Failed to update news source. Please try again.",
      (_updated) => {
        console.log(
          "[LOG-UPDATE-SUCCESS] News source updated successfully for id:",
          nsId
        );
      }
    );
    console.log(
      "[LOG-UPDATE-END] Finished update process for news source id:",
      nsId
    );
  }

  // Reverse news sources so the newest appears first.
  $: newsSourcesReversed =
    $store.config && $store.config.newsSources
      ? [...$store.config.newsSources].reverse()
      : [];
  $: console.log(
    "[LOG-NEWS-SOURCES-REVERSED] News sources reversed:",
    newsSourcesReversed
  );

  $: if ($store.config && $store.config.newsSources) {
    console.log(
      "[LOG-UPDATEFIELDS-INIT] Initializing updateFields with config:",
      $store.config
    );
    $store.config.newsSources.forEach((ns: NewsSource) => {
      console.log("[LOG-NEWSOURCE] Received news source object:", ns);
      if (!ns || !ns.id) {
        console.warn(
          "[LOG-NEWSOURCE-WARNING] News source object is missing an id, skipping:",
          ns
        );
        return;
      }
      if (!updateFields[ns.id]) {
        updateFields[ns.id] = {
          url: ns.url || "",
          lead: ns.lead || "",
          personality: ns.personality || "",
          schedule: ns.scheduleTime || "",
          id: ns.id,
        };
        console.log(
          "[LOG-UPDATEFIELDS-NEW] Added updateFields for news source id:",
          ns.id,
          updateFields[ns.id]
        );
      }
    });
  }
</script>

<CardComponent collapsed={false} {canReveal} svg="idea" label="News Sources">
  <ToggleCard
    {canReveal}
    cardTitle="Add News Source"
    isOpen={isAddCardOpen}
    onChange={(isOpen) => {
      console.log("[LOG-TOGGLE-ADD-CARD] Toggle add card state:", isOpen);
      isAddCardOpen = isOpen;
    }}
  >
    <form
      class="news-source-form"
      on:submit|preventDefault={handleAddNewsSource}
    >
      <Link
        placeholder="Lead (destination URL or identifier)"
        value={addNewsSourceLead}
        onChange={(val) => {
          console.log("[LOG-INPUT-ADD-LEAD] Changed value:", val);
          addNewsSourceLead = val;
        }}
      />
      <Link
        placeholder="News Source URL"
        value={addNewsSourceUrl}
        onChange={(val) => {
          console.log("[LOG-INPUT-ADD-URL] Changed value:", val);
          addNewsSourceUrl = val;
        }}
      />
      {#if isAdding}
        <TextTypes type="sub-highlight-italic">{$latestMessage}</TextTypes>
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
          <form
            class="news-source-update-form"
            on:submit|preventDefault={() => handleUpdateNewsSource(ns.id)}
          >
            <Link
              placeholder="Lead (destination URL or identifier)"
              value={updateFields[ns.id].lead}
              onChange={(val) => {
                console.log(
                  "[LOG-INPUT-UPDATE-LEAD] Changed value for news source id:",
                  ns.id,
                  "Value:",
                  val
                );
                updateFields[ns.id].lead = val;
              }}
            />
            <Link
              placeholder="News Source URL"
              value={updateFields[ns.id].url}
              onChange={(val) => {
                console.log(
                  "[LOG-INPUT-UPDATE-URL] Changed value for news source id:",
                  ns.id,
                  "Value:",
                  val
                );
                updateFields[ns.id].url = val;
              }}
            />
            <PlainText
              placeholder="Personality (describe the news source tone)"
              value={updateFields[ns.id].personality}
              onChange={(val) => {
                console.log(
                  "[LOG-INPUT-UPDATE-PERSONALITY] Changed value for news source id:",
                  ns.id,
                  "Value:",
                  val
                );
                updateFields[ns.id].personality = val;
              }}
            />
            <ScheduleTime
              placeholder="e.g., 'every Monday at 9 AM'"
              value={updateFields[ns.id].schedule}
              onChange={(schedule, cron) => {
                console.log(
                  "[LOG-INPUT-UPDATE-SCHEDULE] Changed schedule for news source id:",
                  ns.id,
                  "Cron value:",
                  cron
                );
                updateFields[ns.id].schedule = cron;
              }}
            />
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
        <TextTypes type="sub-highlight-italic"
          >We are obtaining your news sources</TextTypes
        >
      </p>
      <TextTypes type="sub-highlight-italic">{$latestMessage}</TextTypes>
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

  .error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }

  .news-sources-list {
    margin-top: 2rem;
  }
</style>

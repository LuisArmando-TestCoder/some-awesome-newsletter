<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/Users.svelte -->
<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { writable, get } from "svelte/store";

  import store from "../../../../../../store.ts";
  import type {
    NewsletterUser,
    NewsSource,
    Config,
  } from "../../../../../../types.ts";
  import Page from "../../../../../wrappers/Page/Page.svelte";
  import SlotAutoCollapseToggle from "../SlotAutoCollapseToggle.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import Email from "../../../../../inputs/Email/Email.svelte";
  import Country from "../../../../../inputs/Country/Country.svelte";
  import Language from "../../../../../selectors/Language/Language.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import Stat from "../../../../../stats/Stat.svelte";

  import getLeadsForConfigurator from "../../../../../requests/getLeadsForConfigurator.ts";
  import { addNewsletterUser } from "../../../../../requests/addNewsletterUserEndpoint.ts";
  import subscribeNewsletterUser from "../../../../../requests/subscribeNewsletterUser.ts";
  import getUsersFromRawFileOrText from "../../../../../requests/getUsersFromRawFileOrText.ts";
  import getAllSubscribersFromConfigEndpoint from "../../../../../requests/getAllSubscribersFromConfigEndpoint.ts";
  import unsubscribeUserToConfigNewsSource from "../../../../../requests/unsubscribeUserToConfigNewsSource.ts";

  export let canReveal = true;

  let subscribersByNewsSource = writable<Record<string, NewsletterUser[]>>({});
  let allLeadData = writable<
    Record<string, Record<string, Record<string, string>>>
  >({});
  let loadingSubscribers = writable(true);
  let loadingLeads = writable(true);
  let loadingError = writable<string | null>(null);

  let manualAddForms: Record<
    string,
    {
      name: string;
      email: string;
      bio: string;
      language: string;
      countryOfResidence: string;
      isAdding: boolean;
      error: string | null;
    }
  > = {};
  let bulkAddStates: Record<
    string,
    {
      file: File | null;
      isAdding: boolean;
      error: string | null;
      successMessage: string | null;
    }
  > = {};

  function initializeFormStates(newsSources: NewsSource[] | undefined) {
    const initialManualForms: typeof manualAddForms = {};
    const initialBulkStates: typeof bulkAddStates = {};
    (newsSources || []).forEach((ns) => {
      if (ns && ns.id) {
        initialManualForms[ns.id] = {
          name: "",
          email: "",
          bio: "",
          language: "en",
          countryOfResidence: "US",
          isAdding: false,
          error: null,
        };
        initialBulkStates[ns.id] = {
          file: null,
          isAdding: false,
          error: null,
          successMessage: null,
        };
      }
    });
    manualAddForms = initialManualForms;
    bulkAddStates = initialBulkStates;
  }

  onMount(async () => {
    const configId = get(store).configuratorEmail;
    if (!configId) {
      loadingError.set("Configuration ID (Email) not found.");
      loadingSubscribers.set(false);
      loadingLeads.set(false);
      return;
    }

    loadingSubscribers.set(true);
    loadingLeads.set(true);
    loadingError.set(null);

    try {
      const subsResponse = await getAllSubscribersFromConfigEndpoint(configId);
      subscribersByNewsSource.set(subsResponse || {});

      const leadsResponse = await getLeadsForConfigurator();
      allLeadData.set(leadsResponse?.[configId] || {});

      initializeFormStates(get(store).config?.newsSources);
    } catch (err: any) {
      console.error("Error fetching user/lead data:", err);
      loadingError.set(err.message || "Failed to load data.");
    } finally {
      loadingSubscribers.set(false);
      loadingLeads.set(false);
    }
  });

  async function handleManualAddUser(newsSourceId: string) {
    const formState = manualAddForms[newsSourceId];
    if (!formState) return;
    formState.isAdding = true;
    formState.error = null;
    const configId = get(store).configuratorEmail;

    try {
      const newUser: Partial<NewsletterUser> = {
        name: formState.name,
        email: formState.email,
        bio: formState.bio,
        language: formState.language,
        countryOfResidence: formState.countryOfResidence,
        newsSourcesConfigTuples: [],
      };

      if (
        !newUser.email ||
        !newUser.name ||
        !newUser.language ||
        !newUser.countryOfResidence
      ) {
        throw new Error("Name, Email, Language, and Country are required.");
      }

      await addNewsletterUser(newUser as NewsletterUser, configId);
      await subscribeNewsletterUser(configId, newsSourceId, newUser.email);

      const subsResponse = await getAllSubscribersFromConfigEndpoint(configId);
      subscribersByNewsSource.set(subsResponse || {});

      manualAddForms[newsSourceId] = {
        ...manualAddForms[newsSourceId],
        name: "",
        email: "",
        bio: "",
      };
      manualAddForms = { ...manualAddForms };
    } catch (err: any) {
      console.error("Error adding user:", err);
      formState.error = err.message || "Failed to add user.";
    } finally {
      formState.isAdding = false;
      manualAddForms = { ...manualAddForms };
    }
  }

  function handleFileSelect(event: Event, newsSourceId: string) {
    const input = event.target as HTMLInputElement;
    const state = bulkAddStates[newsSourceId];
    if (!state) return;
    if (input.files && input.files.length > 0) {
      state.file = input.files[0];
      state.error = null;
      state.successMessage = null;
      bulkAddStates = { ...bulkAddStates };
    }
    input.value = "";
  }

  async function handleBulkAddUsers(newsSourceId: string) {
    const state = bulkAddStates[newsSourceId];
    if (!state) return;
    if (!state.file) {
      state.error = "Please select a file first.";
      bulkAddStates = { ...bulkAddStates };
      return;
    }

    state.isAdding = true;
    state.error = null;
    state.successMessage = null;
    const configId = get(store).configuratorEmail;
    let addedCount = 0;
    let subscribedCount = 0;
    const errors: string[] = [];

    try {
      const usersFromFile = await getUsersFromRawFileOrText({
        file: state.file,
      });

      if (!usersFromFile || !Array.isArray(usersFromFile)) {
        throw new Error(
          "Backend did not return a valid user list from the file."
        );
      }

      await Promise.all(
        usersFromFile.map(async (user) => {
          if (!user.email) {
            errors.push(
              `Skipped user with missing email: ${user.name || "Unknown Name"}`
            );
            return;
          }
          try {
            const userToAdd: NewsletterUser = {
              name: user.name || "Unknown Name",
              email: user.email,
              bio: user.bio || "",
              language: user.language || "en",
              countryOfResidence: user.countryOfResidence || "US",
              newsSourcesConfigTuples: user.newsSourcesConfigTuples || [],
              ...user,
            };

            await addNewsletterUser(userToAdd, configId);
            addedCount++;
            await subscribeNewsletterUser(configId, newsSourceId, user.email);
            subscribedCount++;
          } catch (userError: any) {
            if (userError?.message?.includes("already exists")) {
              try {
                await subscribeNewsletterUser(
                  configId,
                  newsSourceId,
                  user.email
                );
                subscribedCount++;
              } catch (subscribeError: any) {
                errors.push(
                  `Error subscribing existing user ${user.email}: ${subscribeError.message}`
                );
              }
            } else {
              errors.push(
                `Error processing ${user.email}: ${userError.message}`
              );
            }
          }
        })
      );

      const subsResponse = await getAllSubscribersFromConfigEndpoint(configId);
      subscribersByNewsSource.set(subsResponse || {});

      state.successMessage = `Processed ${usersFromFile.length} users. Added/Updated: ${addedCount}. Subscribed to this source: ${subscribedCount}.`;
      if (errors.length) {
        state.error = `Encountered ${errors.length} errors: ${errors.slice(0, 5).join("; ")}${errors.length > 5 ? "..." : ""}`;
      }
      state.file = null;
    } catch (err: any) {
      console.error("Error during bulk add:", err);
      state.error = err.message || "Failed to process bulk upload.";
      state.file = null;
    } finally {
      state.isAdding = false;
      bulkAddStates = { ...bulkAddStates };
    }
  }

  async function handleRemoveUser(newsSourceId: string, userEmail: string) {
    const configId = get(store).configuratorEmail;
    if (
      !confirm(
        `Are you sure you want to unsubscribe ${userEmail} from this news source (${newsSourceId})?`
      )
    ) {
      return;
    }

    try {
      const success = await unsubscribeUserToConfigNewsSource(
        userEmail,
        configId,
        newsSourceId
      );

      if (success) {
        subscribersByNewsSource.update((current) => {
          const updatedList = (current[newsSourceId] || []).filter(
            (u) => u.email !== userEmail
          );
          return { ...current, [newsSourceId]: updatedList };
        });
        console.log(`${userEmail} unsubscribed successfully.`);
      } else {
        alert(
          `Failed to unsubscribe ${userEmail}. The user might already be unsubscribed or an error occurred.`
        );
      }
    } catch (err: any) {
      console.error(
        `Error removing user ${userEmail} from ${newsSourceId}:`,
        err
      );
      alert(
        `An unexpected error occurred while trying to remove the user: ${err.message}`
      );
    }
  }

  function getLeadClickCounts() {
    const leadData = get(allLeadData) || {};
    const newsSources = get(store).config?.newsSources || [];

    return newsSources
      .map((ns) => {
        if (!ns || !ns.id)
          return { id: "unknown", name: "Unknown Source", total: 0 };

        const nsLeadData = leadData[ns.id];
        let clickCount = 0;

        if (nsLeadData && typeof nsLeadData === "object") {
          clickCount = Object.values(nsLeadData).reduce((sum, userLeads) => {
            return (
              sum +
              (userLeads && typeof userLeads === "object"
                ? Object.keys(userLeads).length
                : 0)
            );
          }, 0);
        }

        return {
          id: ns.id,
          name: ns.url?.split("//")[1]?.split("/")[0] ?? ns.id,
          total: clickCount,
        };
      })
      .filter(
        (item): item is { id: string; name: string; total: number } =>
          item.id !== "unknown"
      );
  }

  function getSubscriberCounts() {
    const subsData = get(subscribersByNewsSource);
    const newsSources = get(store).config?.newsSources || [];

    return newsSources
      .map((ns) => {
        if (!ns || !ns.id)
          return { id: "unknown", name: "Unknown Source", total: 0 };
        return {
          id: ns.id,
          name: ns.url?.split("//")[1]?.split("/")[0] ?? ns.id,
          total: subsData[ns.id]?.length || 0,
        };
      })
      .filter(
        (item): item is { id: string; name: string; total: number } =>
          item.id !== "unknown"
      );
  }

  let previousNewsSourceIds: string[] = [];
  $: {
    const currentNewsSources = get(store).config?.newsSources || [];
    const currentIds = Array.isArray(currentNewsSources)
      ? currentNewsSources
          .map((ns) => ns?.id)
          .filter((id): id is string => !!id)
          .sort()
      : [];

    if (JSON.stringify(currentIds) !== JSON.stringify(previousNewsSourceIds)) {
      console.log("News sources list changed, re-initializing forms.");
      previousNewsSourceIds = currentIds;
      tick().then(() => {
        initializeFormStates(currentNewsSources);
      });
    }
  }

  $: canReveal;
</script>

<Page>
  <div class="users-page-layout">
    <div class="column user-management-column">
      <TextTypes type="title">Manage Users by News Source</TextTypes>

      {#if $loadingSubscribers}
        <p><TextTypes type="sub-italic">Loading subscribers...</TextTypes></p>
      {:else if $loadingError}
        <p class="error-message">Error loading data: {$loadingError}</p>
      {:else}
        <SlotAutoCollapseToggle
          {canReveal}
          autoCollapse={false}
          let:getToggleProps
        >
          {#each $store.config?.newsSources || [] as newsSource (newsSource.id)}
            {@const nsId = newsSource.id}
            {@const manualForm = manualAddForms[nsId]}
            {@const bulkState = bulkAddStates[nsId]}
            {#if manualForm && bulkState}
              <ToggleCard
                {canReveal}
                cardTitle={`Subscribers for: ${newsSource.url?.split("//")[1]?.split("/")[0] ?? nsId}`}
                {...getToggleProps(nsId)}
              >
                <div class="subscriber-list">
                  <TextTypes type="subtitle"
                    >Current Subscribers ({(
                      $subscribersByNewsSource[nsId] || []
                    ).length})</TextTypes
                  >
                  {#if ($subscribersByNewsSource[nsId] || []).length > 0}
                    <ul>
                      {#each $subscribersByNewsSource[nsId] as user (user.email)}
                        <li>
                          <span
                            title={`Name: ${user.name}\nEmail: ${user.email}\nLang: ${user.language}\nCountry: ${user.countryOfResidence}\nBio: ${user.bio || "N/A"}`}
                            >{user.name} ({user.email}) - {user.language}/{user.countryOfResidence}</span
                          >
                          <IconButton
                            src="./icons/trash.svg"
                            label="Unsubscribe"
                            callback={() => handleRemoveUser(nsId, user.email)}
                            tooltip="Unsubscribe user from this source"
                          />
                        </li>
                      {/each}
                    </ul>
                  {:else}
                    <p>
                      <TextTypes type="sub-italic"
                        >No subscribers for this source yet.</TextTypes
                      >
                    </p>
                  {/if}
                </div>

                <hr class="section-separator" />

                <div class="manual-add-form">
                  <TextTypes type="subtitle">Add User Manually</TextTypes>
                  <form
                    class="form"
                    on:submit|preventDefault={() => handleManualAddUser(nsId)}
                  >
                    <PlainText
                      label="Name *"
                      placeholder="User's full name"
                      bind:value={manualForm.name}
                      required={true}
                    />
                    <Email
                      label="Email *"
                      placeholder="User's email address"
                      bind:value={manualForm.email}
                      required={true}
                    />
                    <PlainText
                      label="Bio (Optional)"
                      placeholder="Short description (optional)"
                      bind:value={manualForm.bio}
                    />
                    <Language
                      label="Language *"
                      selectedCode={manualForm.language}
                      onSelect={(lang) => (manualForm.language = lang.code)}
                    />
                    <Country
                      label="Country *"
                      defaultCountryCode={manualForm.countryOfResidence}
                      onSelect={(code) => {
                        if (code) manualForm.countryOfResidence = code;
                      }}
                    />
                    <SubmitButton
                      label={manualForm.isAdding
                        ? "Adding..."
                        : "Add & Subscribe User"}
                      disabled={manualForm.isAdding ||
                        !manualForm.name ||
                        !manualForm.email}
                      loading={manualForm.isAdding}
                      callback={() => handleManualAddUser(nsId)}
                      style="margin-top: 0.5rem;"
                    />
                    {#if manualForm.error}
                      <p class="error-message">{manualForm.error}</p>
                    {/if}
                  </form>
                </div>

                <hr class="section-separator" />

                <div class="bulk-add-section">
                  <TextTypes type="subtitle"
                    >Add Users from File (.csv, .txt, .xlsx)</TextTypes
                  >
                  <label class="file-input-label" for={`file-upload-${nsId}`}>
                    Choose File
                    <input
                      id={`file-upload-${nsId}`}
                      class="file-input-hidden"
                      type="file"
                      accept=".csv, .txt, .xlsx, .xls"
                      on:change={(e) => handleFileSelect(e, nsId)}
                    />
                  </label>
                  {#if bulkState.file}
                    <p class="selected-file-info">
                      Selected: {bulkState.file.name}
                    </p>
                  {/if}
                  <SubmitButton
                    label={bulkState.isAdding
                      ? "Uploading..."
                      : "Upload & Add/Subscribe"}
                    disabled={bulkState.isAdding || !bulkState.file}
                    loading={bulkState.isAdding}
                    callback={() => handleBulkAddUsers(nsId)}
                  />
                  {#if bulkState.successMessage}
                    <p class="success-message">{bulkState.successMessage}</p>
                  {/if}
                  {#if bulkState.error}
                    <p class="error-message">{bulkState.error}</p>
                  {/if}
                </div>
              </ToggleCard>
            {:else}
              <ToggleCard
                {canReveal}
                cardTitle={`Subscribers for: ${newsSource.url?.split("//")[1]?.split("/")[0] ?? nsId}`}
                {...getToggleProps(nsId)}
                disabled={true}
              >
                <p>
                  <TextTypes type="sub-italic"
                    >Initializing forms for this source...</TextTypes
                  >
                </p>
              </ToggleCard>
            {/if}
          {/each}

          {#if !$store.config?.newsSources?.length}
            <p>
              <TextTypes type="sub-italic"
                >No news sources configured yet. Add news sources in the
                previous steps to manage users.</TextTypes
              >
            </p>
          {/if}
        </SlotAutoCollapseToggle>
      {/if}
    </div>

    <div class="column charts-column">
      <TextTypes type="title">Analytics</TextTypes>
      {#if $loadingLeads || $loadingSubscribers}
        <p>
          <TextTypes type="sub-italic">Loading analytics data...</TextTypes>
        </p>
      {:else if $loadingError}
        <p class="error-message">
          Error loading analytics data: {$loadingError}
        </p>
      {:else}
        <div class="stats-container">
          {#if $store.config?.newsSources?.length}
            <div class="stat-wrapper">
              <TextTypes type="subtitle">Subscribers per Source</TextTypes>
              <Stat
                dataCallback={getSubscriberCounts}
                HEXColor={$store.config?.brandColor || "#2196f3"}
                xText="News Source"
                yText="Subscribers"
              />
            </div>

            <div class="stat-wrapper">
              <TextTypes type="subtitle">Lead Clicks per Source</TextTypes>
              <Stat
                dataCallback={getLeadClickCounts}
                HEXColor={$store.complementaryColor || "#ff9800"}
                xText="News Source"
                yText="Clicks"
              />
            </div>
          {:else}
            <p>
              <TextTypes type="sub-italic"
                >No news sources configured. Analytics require configured news
                sources.</TextTypes
              >
            </p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</Page>

<style lang="scss">
  @use "../Dashboard.scss"; // Ensure this path is correct and the file has no errors

  .form {
    display: grid;
    gap: 1rem;
  }

  .users-page-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(450px, 100%), 1fr));
    gap: 2rem;
    align-items: start;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user-management-column {
    // Specific styles if needed
  }

  .charts-column {
    position: sticky;
    top: 120px;
    max-height: calc(100vh - 140px);
    overflow-y: auto;
    padding-bottom: 2rem;
  }

  .stats-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-wrapper {
    background-color: var(--color-background-opaque);
    padding: 1rem;
    border-radius: var(--radius-base);
    box-shadow: var(--shadow-soft);
  }

  :global(.toggle-card-content) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .subscriber-list {
    margin-bottom: 0;
    max-height: 300px;
    overflow-y: auto;
    padding-right: 10px;
    border: 1px solid var(--color-background-input-border);
    border-radius: var(--radius-small);
    padding: 0.5rem;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0;
      border-bottom: 1px solid var(--color-background-input-border);
      gap: 0.5rem;

      &:last-child {
        border-bottom: none;
      }

      span {
        flex-grow: 1;
        margin-right: 0.5rem;
        font-size: 0.9rem;
        word-break: break-word;
        color: var(--color-foreground);
        cursor: default;
      }

      /* --- CORRECTED :global SELECTOR --- */
      /* Target the IconButton component globally */
      :global(.icon-button[label="Unsubscribe"]) {
        flex-shrink: 0;
        font-size: 0.8rem;
        padding: 0.1rem 0.3rem;
        min-width: auto;
        border-radius: 4px;
        /* Base styles for icon path */
        :global(.icon svg path) {
          fill: var(--color-error, #ff6b6b);
          transition: fill 0.2s ease;
        }
        /* Base styles for icon container (if needed) */
        :global(.icon) {
          width: 0.9rem;
          height: 0.9rem;
          margin-right: 0.2rem;
          padding: 0.2rem;
          vertical-align: middle;
        }

        /* Hover state for the button itself */
        &:not(:disabled):hover {
          background-color: var(
            --color-error-opaque,
            rgba(255, 107, 107, 0.1)
          ) !important;
          border-color: var(--color-error, #ff6b6b) !important;
          color: var(
            --color-error,
            #ff6b6b
          ) !important; // Style button text/label on hover

          /* Style icon path inside the button on hover */
          :global(.icon svg path) {
            fill: var(
              --color-error,
              #ff6b6b
            ) !important; // Or maybe white? Adjust as needed
          }
        }
      }
      /* --- END CORRECTION --- */
    }
  }

  hr.section-separator {
    border: none;
    border-top: 1px solid var(--color-background-input-border);
    margin: 0;
  }

  .manual-add-form,
  .bulk-add-section {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .file-input-hidden {
    display: none;
  }
  .file-input-label {
    display: inline-block;
    padding: 0.6rem 1rem;
    background-color: var(--color-background-button, #f0f0f0);
    color: var(--color-foreground-button, #333);
    border: 1px solid var(--color-background-input-border);
    border-radius: var(--radius-base);
    cursor: pointer;
    text-align: center;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
    font-size: 0.9rem;

    &:hover {
      background-color: var(--color-background-button-hover, #e0e0e0);
      border-color: var(--color-foreground);
    }
  }
  .selected-file-info {
    font-size: 0.85rem;
    color: var(--color-foreground-muted);
    margin-top: -0.25rem;
    margin-bottom: 0.25rem;
  }

  .error-message {
    color: var(--color-error, #ff6b6b);
    font-size: 0.9em;
  }
  .success-message {
    color: var(--color-success, #4caf50);
    font-size: 0.9em;
  }

  @media (max-width: 900px) {
    .users-page-layout {
      grid-template-columns: 1fr;
    }
    .charts-column {
      position: relative;
      top: auto;
      max-height: none;
      overflow-y: visible;
    }
  }
</style>

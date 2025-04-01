<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/Users.svelte -->
<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { writable, get } from "svelte/store";
  import type {
    Chart,
    ChartConfiguration,
    ChartData,
    ChartOptions,
  } from "chart.js/auto"; // Import Chart.js types
  import { Chart as ChartJS } from "chart.js/auto"; // Import Chart.js itself

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

  // --- API Request Imports ---
  import getLeadsForConfigurator from "../../../../../requests/getLeadsForConfigurator.ts";
  import { addNewsletterUser } from "../../../../../requests/addNewsletterUserEndpoint.ts"; // Use the specific function
  import subscribeNewsletterUser from "../../../../../requests/subscribeNewsletterUser.ts";
  import getUsersFromRawFileOrText from "../../../../../requests/getUsersFromRawFileOrText.ts";

  export let canReveal = true;

  // --- State ---
  let subscribersByNewsSource = writable<Record<string, NewsletterUser[]>>({});
  let allLeadData = writable<
    Record<string, Record<string, Record<string, string>>>
  >({}); // { configId: { newsSourceId: { userId: { timestamp: leadUrl } } } } -> Fetched structure seems different, adjust if needed
  let chartInstances: Record<string, Chart> = {}; // Store chart instances for updates/destruction
  let loadingSubscribers = writable(true);
  let loadingLeads = writable(true);
  let loadingError = writable<string | null>(null);

  // State for forms within each news source toggle
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

  // --- Helper Functions ---
  function initializeFormStates(newsSources: NewsSource[]) {
    const initialManualForms: typeof manualAddForms = {};
    const initialBulkStates: typeof bulkAddStates = {};
    (newsSources || []).forEach((ns) => {
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
    });
    manualAddForms = initialManualForms;
    bulkAddStates = initialBulkStates;
  }

  // --- Data Fetching ---
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
      // 1. Fetch Subscribers grouped by News Source
      // Assuming the backend endpoint /config-subscribers/:configId exists and returns { newsSourceId1: [user1, user2], newsSourceId2: [user3] }
      const subsResponse = await getAllSubscribersFromConfigEndpoint(configId); // You'll need to implement this frontend request function
      subscribersByNewsSource.set(subsResponse || {});

      // 2. Fetch Lead Data
      const leadsResponse = await getLeadsForConfigurator(); // Assuming this returns { configId: { nsId: { userId: { timestamp: url } } } }
      // The backend returns { cfgId: { nsId: { userId: {...} } } } but we only care about our cfgId
      allLeadData.set(leadsResponse?.[configId] || {});

      // 3. Initialize form states based on fetched news sources
      initializeFormStates(get(store).config?.newsSources || []);
    } catch (err: any) {
      console.error("Error fetching user/lead data:", err);
      loadingError.set(err.message || "Failed to load data.");
    } finally {
      loadingSubscribers.set(false);
      loadingLeads.set(false);
      // Trigger chart rendering after data is loaded and state is updated
      await tick();
      renderAllCharts();
    }
  });

  // Cleanup chart instances on component destroy
  onDestroy(() => {
    Object.values(chartInstances).forEach((chart) => chart.destroy());
  });

  // --- Event Handlers ---

  // Manual User Add
  async function handleManualAddUser(newsSourceId: string) {
    const formState = manualAddForms[newsSourceId];
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
        newsSourcesConfigTuples: [], // Backend handles initial subscription based on country if configId is passed
      };

      // Validate basic fields
      if (
        !newUser.email ||
        !newUser.name ||
        !newUser.language ||
        !newUser.countryOfResidence
      ) {
        throw new Error("Name, Email, Language, and Country are required.");
      }

      // 1. Add the user globally (backend checks existence)
      await addNewsletterUser(newUser as NewsletterUser, configId); // Pass configId to handle potential auto-subscription based on country by backend

      // 2. Explicitly subscribe this user to THIS specific news source
      await subscribeNewsletterUser(configId, newsSourceId, newUser.email);

      // 3. Optimistic UI Update or Refetch
      subscribersByNewsSource.update((current) => {
        const updatedList = [...(current[newsSourceId] || [])];
        // Avoid duplicates if backend already added due to country match
        if (!updatedList.some((u) => u.email === newUser.email)) {
          updatedList.push(newUser as NewsletterUser); // Add the user with potentially partial data
        }
        return { ...current, [newsSourceId]: updatedList };
      });

      // Clear form
      formState.name = "";
      formState.email = "";
      formState.bio = "";
      // Reset lang/country? Optional.
      // formState.language = 'en';
      // formState.countryOfResidence = 'US';
    } catch (err: any) {
      console.error("Error adding user:", err);
      formState.error = err.message || "Failed to add user.";
    } finally {
      formState.isAdding = false;
      manualAddForms = { ...manualAddForms }; // Trigger reactivity
    }
  }

  // Bulk User Add - File Selection
  function handleFileSelect(event: Event, newsSourceId: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      bulkAddStates[newsSourceId].file = input.files[0];
      bulkAddStates[newsSourceId].error = null;
      bulkAddStates[newsSourceId].successMessage = null;
      bulkAddStates = { ...bulkAddStates }; // Trigger reactivity
    }
  }

  // Bulk User Add - Upload & Process
  async function handleBulkAddUsers(newsSourceId: string) {
    const state = bulkAddStates[newsSourceId];
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
      // 1. Call backend to parse file/text
      const usersFromFile = await getUsersFromRawFileOrText({
        file: state.file,
      });

      if (!usersFromFile || !Array.isArray(usersFromFile)) {
        throw new Error(
          "Backend did not return a valid user list from the file."
        );
      }

      // 2. Process each user from the file
      for (const user of usersFromFile) {
        if (!user.email) {
          errors.push(
            `Skipped user with missing email: ${user.name || "Unknown Name"}`
          );
          continue;
        }
        try {
          // 2a. Add user globally (backend handles duplicates)
          await addNewsletterUser(user, configId); // Pass configId for potential country matching
          addedCount++; // Increment even if user already existed, as they are processed

          // 2b. Subscribe user specifically to this news source
          await subscribeNewsletterUser(configId, newsSourceId, user.email);
          subscribedCount++;
        } catch (userError: any) {
          errors.push(`Error processing ${user.email}: ${userError.message}`);
        }
      }

      // 3. Update UI - Refetch might be simplest for bulk
      const subsResponse = await getAllSubscribersFromConfigEndpoint(configId);
      subscribersByNewsSource.set(subsResponse || {});

      state.successMessage = `Processed ${usersFromFile.length} users. Added/Updated: ${addedCount}. Subscribed to this source: ${subscribedCount}.`;
      if (errors.length) {
        state.error = `Encountered ${errors.length} errors: ${errors.slice(0, 3).join(", ")}...`; // Show first few errors
      }
      state.file = null; // Clear file input
    } catch (err: any) {
      console.error("Error during bulk add:", err);
      state.error = err.message || "Failed to process bulk upload.";
    } finally {
      state.isAdding = false;
      bulkAddStates = { ...bulkAddStates }; // Trigger reactivity
    }
  }

  // Remove User
  async function handleRemoveUser(newsSourceId: string, userEmail: string) {
    const configId = get(store).configuratorEmail;
    // Add a confirmation dialog here for better UX
    if (
      !confirm(
        `Are you sure you want to unsubscribe ${userEmail} from this news source?`
      )
    ) {
      return;
    }

    try {
      // Call the backend function/request helper
      await unsubscribeUserToConfigNewsSource(
        userEmail,
        configId,
        newsSourceId
      );

      // Optimistic UI update
      subscribersByNewsSource.update((current) => {
        const updatedList = (current[newsSourceId] || []).filter(
          (u) => u.email !== userEmail
        );
        return { ...current, [newsSourceId]: updatedList };
      });
    } catch (err: any) {
      console.error(
        `Error removing user ${userEmail} from ${newsSourceId}:`,
        err
      );
      alert(`Failed to remove user: ${err.message}`); // Simple alert for error
    }
  }

  // --- Chart Logic ---
  function processLeadDataForChart(newsSourceId: string): {
    labels: string[];
    data: number[];
  } {
    const nsLeadData = $allLeadData?.[newsSourceId];
    if (!nsLeadData) return { labels: [], data: [] };

    const clicksByDay: Record<string, number> = {};

    // Iterate through users for this news source
    Object.values(nsLeadData).forEach((userLeads) => {
      // Iterate through timestamps for this user
      Object.keys(userLeads).forEach((timestampStr) => {
        try {
          const date = new Date(timestampStr);
          const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD
          clicksByDay[dayKey] = (clicksByDay[dayKey] || 0) + 1;
        } catch (e) {
          console.warn(`Invalid timestamp format encountered: ${timestampStr}`);
        }
      });
    });

    // Sort keys (days) chronologically
    const sortedDays = Object.keys(clicksByDay).sort();

    // Prepare labels and data for Chart.js
    const labels = sortedDays;
    const data = sortedDays.map((day) => clicksByDay[day]);

    return { labels, data };
  }

  function renderChart(canvasId: string, newsSourceId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { labels, data } = processLeadDataForChart(newsSourceId);

    // Destroy previous chart instance if it exists
    if (chartInstances[canvasId]) {
      chartInstances[canvasId].destroy();
    }

    const chartConfig: ChartConfiguration = {
      type: "line", // Or 'bar'
      data: {
        labels: labels,
        datasets: [
          {
            label: `Lead Clicks for ${newsSourceId}`,
            data: data,
            borderColor: get(store).config?.brandColor || "#03a9f4",
            backgroundColor:
              (get(store).config?.brandColor || "#03a9f4") + "33", // Semi-transparent fill
            tension: 0.1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: get(store).isDarkTheme ? "#eee" : "#333", // Adjust tick color based on theme
              stepSize: 1, // Ensure integer ticks for counts
            },
            grid: {
              color: get(store).isDarkTheme ? "#555" : "#ddd", // Adjust grid line color
            },
          },
          x: {
            ticks: {
              color: get(store).isDarkTheme ? "#eee" : "#333", // Adjust tick color based on theme
            },
            grid: {
              color: get(store).isDarkTheme ? "#555" : "#ddd", // Adjust grid line color
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend if only one dataset
          },
        },
      },
    };

    chartInstances[canvasId] = new ChartJS(ctx, chartConfig);
  }

  // Function to render charts for all news sources
  function renderAllCharts() {
    const newsSources = get(store).config?.newsSources || [];
    newsSources.forEach((ns) => {
      const canvasId = `chart-${ns.id}`;
      // Check if canvas element exists before rendering
      if (document.getElementById(canvasId)) {
        renderChart(canvasId, ns.id);
      } else {
        console.warn(`Canvas element ${canvasId} not found yet.`);
      }
    });
  }

  // Re-render charts when lead data changes
  $: if (!$loadingLeads) {
    renderAllCharts();
  }

  $: canReveal; // Make sure reactivity is triggered if canReveal changes


  function getAllSubscribersFromConfigEndpoint(configId: any) {
    throw new Error("Function not implemented.");
  }
</script>

<Page>
  <div class="users-page-layout">
    <!-- User Management Column -->
    <div class="column user-management-column">
      <TextTypes type="title">Manage Users by News Source</TextTypes>

      {#if $loadingSubscribers}
        <p>Loading subscribers...</p>
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
            {@const currentSubscribers = $subscribersByNewsSource[nsId] || []}
            {@const manualForm = manualAddForms[nsId]}
            {@const bulkState = bulkAddStates[nsId]}

            <ToggleCard
              {canReveal}
              cardTitle={`Subscribers for: ${newsSource.url?.split("//")[1]?.split("/")[0] ?? nsId}`}
              {...getToggleProps(nsId)}
            >
              <!-- Subscriber List -->
              <div class="subscriber-list">
                <TextTypes type="subtitle"
                  >Current Subscribers ({currentSubscribers.length})</TextTypes
                >
                {#if currentSubscribers.length > 0}
                  <ul>
                    {#each currentSubscribers as user (user.email)}
                      <li>
                        <span
                          >{user.name} ({user.email}) - {user.language}/{user.countryOfResidence}</span
                        >
                        <IconButton
                          src="./icons/trash.svg"
                          label="Remove"
                          callback={() => handleRemoveUser(nsId, user.email)}
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

              <hr />

              <!-- Manual Add Form -->
              <div class="manual-add-form">
                <TextTypes type="subtitle">Add User Manually</TextTypes>
                {#if manualForm}
                  <form
                    on:submit|preventDefault={() => handleManualAddUser(nsId)}
                  >
                    <PlainText
                      label="Name"
                      placeholder="User's full name"
                      bind:value={manualForm.name}
                    />
                    <Email
                      label="Email"
                      placeholder="User's email address"
                      bind:value={manualForm.email}
                    />
                    <PlainText
                      label="Bio (Optional)"
                      placeholder="Short description"
                      bind:value={manualForm.bio}
                    />
                    <Language
                      onSelect={(lang) => (manualForm.language = lang.code)}
                    />
                    <Country
                      defaultCountryCode={manualForm.countryOfResidence}
                      onSelect={(code) =>
                        (manualForm.countryOfResidence = code)}
                    />
                    <SubmitButton
                      label={manualForm.isAdding ? "Adding..." : "Add User"}
                      disabled={manualForm.isAdding}
                      loading={manualForm.isAdding}
                      callback={() => handleManualAddUser(nsId)}
                    />
                    {#if manualForm.error}
                      <p class="error-message">{manualForm.error}</p>
                    {/if}
                  </form>
                {:else}
                  <p>Loading form...</p>
                {/if}
              </div>

              <hr />

              <!-- Bulk Add Section -->
              <div class="bulk-add-section">
                <TextTypes type="subtitle">Add Users from File</TextTypes>
                {#if bulkState}
                  <input
                    type="file"
                    accept=".csv, .txt, .xlsx, .xls"
                    on:change={(e) => handleFileSelect(e, nsId)}
                  />
                  {#if bulkState.file}
                    <p>Selected: {bulkState.file.name}</p>
                  {/if}
                  <SubmitButton
                    label={bulkState.isAdding
                      ? "Uploading..."
                      : "Upload & Add Users"}
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
                {:else}
                  <p>Loading form state...</p>
                {/if}
              </div>
            </ToggleCard>
          {/each}
          {#if !$store.config?.newsSources?.length}
            <p>
              <TextTypes type="sub-italic"
                >No news sources configured yet. Add one in the "News Sources"
                section.</TextTypes
              >
            </p>
          {/if}
        </SlotAutoCollapseToggle>
      {/if}
    </div>

    <!-- Charts Column -->
    <div class="column charts-column">
      <TextTypes type="title">Lead Click Analytics</TextTypes>
      {#if $loadingLeads}
        <p>Loading lead data...</p>
      {:else if $loadingError}
        <p class="error-message">Error loading lead data: {$loadingError}</p>
      {:else}
        <div class="charts-container">
          {#each $store.config?.newsSources || [] as newsSource (newsSource.id)}
            <div class="chart-wrapper">
              <TextTypes type="subtitle"
                >{newsSource.url?.split("//")[1]?.split("/")[0] ??
                  newsSource.id}</TextTypes
              >
              <div class="chart-canvas-container">
                <canvas id={`chart-${newsSource.id}`}></canvas>
              </div>
            </div>
          {/each}
          {#if !$store.config?.newsSources?.length}
            <p>
              <TextTypes type="sub-italic"
                >No news sources available for charts.</TextTypes
              >
            </p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</Page>

<style lang="scss">
  @use "../Dashboard.scss"; // Import shared dashboard styles

  .users-page-layout {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(450px, 100%), 1fr)
    ); // Responsive columns
    gap: 2rem; // Space between columns
    align-items: start; // Align items to the top
  }

  .column {
    // Styles common to both columns, if any
  }

  .user-management-column {
    // Styles specific to the user management side
  }

  .charts-column {
    // Styles specific to the charts side
    position: sticky; // Make charts sticky on scroll
    top: 120px; // Adjust based on header height
    max-height: calc(100vh - 140px); // Limit height
    overflow-y: auto; // Allow scrolling within the charts column
  }

  .charts-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .chart-wrapper {
    background: var(--color-background-very-opaque);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-background-input-border);
  }

  .chart-canvas-container {
    position: relative; // Needed for Chart.js responsiveness
    height: 250px; // Fixed height for each chart canvas
    width: 100%;
  }

  .subscriber-list {
    margin-bottom: 1.5rem;
    max-height: 300px; // Limit height and make scrollable
    overflow-y: auto;
    padding-right: 10px; // Space for scrollbar

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

      &:last-child {
        border-bottom: none;
      }

      span {
        flex-grow: 1;
        margin-right: 1rem; // Space before the button
        font-size: 0.9rem;
        word-break: break-all; // Prevent long emails overflowing
      }

      // Target the IconButton specifically if needed
      :global(.icon-button) {
        flex-shrink: 0; // Prevent button from shrinking
        // Adjust button size/padding if needed
        font-size: 0.8rem; // Smaller label
        padding: 0.2rem 0.5rem; // Smaller padding
        min-width: 70px; // Ensure minimum width

        :global(.icon) {
          width: 1rem;
          height: 1rem;
          margin-right: 0.3rem; // Less space next to icon
          padding: 0.3rem;
        }
      }
    }
  }

  hr {
    border: none;
    border-top: 1px solid var(--color-background-input-border);
    margin: 1.5rem 0;
  }

  .manual-add-form,
  .bulk-add-section {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem; // Space between form elements
  }

  .error-message {
    color: var(--color-error, #ff6b6b);
    font-size: 0.9em;
    margin-top: 0.5rem;
  }
  .success-message {
    color: #4caf50; // Example success color
    font-size: 0.9em;
    margin-top: 0.5rem;
  }

  /* Responsive adjustments */
  @media (max-width: 900px) {
    .users-page-layout {
      grid-template-columns: 1fr; // Stack columns on smaller screens
    }
    .charts-column {
      position: relative; // Unstick charts column when stacked
      top: auto;
      max-height: none;
      overflow-y: visible;
    }
  }
</style>

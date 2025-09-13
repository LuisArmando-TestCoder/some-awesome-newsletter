<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/NewsSourceUserManagement.svelte -->
<script lang="ts">
  import { tick } from "svelte";
  import { get, writable } from "svelte/store";
  import type { Writable } from "svelte/store";
  import type { NewsSource, NewsletterUser } from "../../../../../../types"; // Using local types path
  import store, { latestMessage } from "../../../../../../store"; // Imported latestMessage
  import updateConfiguration from "../../../../../requests/updateConfiguration";
  import getConfiguratorSession from "../../../../../requests/getConfiguratorSession"; // Import config refresh function
  import * as UserDataService from "./UserDataService"; // Adjust path
  import { userRemovalRequestStore } from "./userActions"; // Import the shared store

  // Import Child Components (Assumed to be updated to accept function props)
  import ManualAddUserForm from "./ManualAddUserForm.svelte";
  import BulkAddUserSection from "./BulkAddUserSection.svelte";
  import UserCard from "./UserCard.svelte";

  // Import UI Components (Existing)
  import Switch from "../../../../../selectors/Switch/Switch.svelte"; // ADDED Switch component import
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte"; // Adjusted path - verify this is correct
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte"; // Adjust path
  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import TextArea from "../../../../../inputs/TextArea/TextArea.svelte"; // Import new TextArea
  import Svg from "../../../../../../SVG/SVG.svelte"; // Adjust path
  import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte"; // Import SubmitButton
  // Removed duplicate type import

  // Import Request Function
  import triggerNewsSourceSend from "../../../../../requests/triggerNewsSourceSend.js"; // CORRECTED Import (added .js extension as required by NodeNext resolution)
  import sendCustomContent from "../../../../../requests/sendCustomContent"; // Import new request function

  // --- Props ---
  /** The specific news source object this component manages */
  export let newsSource: NewsSource;
  /** The list of subscribers specifically for this news source */
  export let subscribers: NewsletterUser[] = [];
  /** Controls if the main card can be revealed (passed down to ToggleCard) */
  export let canReveal: boolean = true;
  // REMOVED isOpen prop
  /** Writable store from parent controlling which news source card is open */
  export let openNewsSourceIdStore: Writable<string | null>; // ADDED store prop

  // --- State ---
  let isAddingFormVisible: boolean = false;
  /** Feedback for actions performed within *this* specific news source card */
  let actionFeedback: { type: "success" | "error"; message: string } | null =
    null;
  /** Generic loading flag for actions originating from this component (add/bulk) */
  let isPerformingAction: boolean = false;
  /** Specific loading state for removing a user (could target specific email if needed) */
  let removingUserEmail: string | null = null;
  /** Loading state for toggling the active status */
  let isUpdatingActive: boolean = false; // ADDED loading state for switch
  /** Loading state for triggering manual send */
  let isTriggeringSend: boolean = false; // ADDED loading state for trigger button
  /** Content for custom email send */
  let customEmailContent: string = "";
  /** Loading state for sending custom content */
  let isSendingCustomContent: boolean = false;
  const search = writable("");

  // REMOVED event dispatcher

  // --- Computed Properties ---
  // Determine if *this* card should be open based on the store value
  $: isOpen = $openNewsSourceIdStore === newsSource.id;
  $: cardTitle = `Subscribers for: ${newsSource.url?.split("//")[1]?.split("/")[0] ?? newsSource.id}`;
  $: subscriberCount = subscribers.length;
  // Create a reversed copy for display (newest first) without mutating the prop
  $: reversedSubscribers = subscribers
    ? [...subscribers]
        .reverse()
        .filter((s) =>
          `${s.name} ${s.email}`.toLowerCase().includes($search.toLowerCase()),
        )
    : [];
  $: sourceName =
    newsSource.url?.split("//")[1]?.split("/")[0] ?? newsSource.id; // User-friendly name

  // --- Reactive Store Subscription ---
  // Handle removal requests triggered by child UserCard components via the shared store
  $: if (
    $userRemovalRequestStore &&
    $userRemovalRequestStore.newsSourceId === newsSource.id
  ) {
    // Check if the request is for *this* news source instance
    const { email } = $userRemovalRequestStore;
    // Clear the store immediately to prevent re-triggering and allow subsequent requests
    userRemovalRequestStore.set(null);
    // Call the handler function which contains the confirmation and API call
    handleRemoveUser(email);
  }

  // --- Functions ---

  async function handleSendCustomContent() {
    if (!customEmailContent.trim()) {
      setFeedback("error", "Custom content cannot be empty.");
      return;
    }
    if (isSendingCustomContent) return;

    isSendingCustomContent = true;
    clearFeedback();
    latestMessage.set("Initiating custom content send...");

    try {
      const success = await sendCustomContent(
        get(store).configuratorEmail, 
        newsSource.id, 
        customEmailContent
      );
      if (success) {
        setFeedback("success", `Custom content successfully initiated for ${sourceName}.`);
        customEmailContent = ""; // Clear textarea on success
      } else {
        // Error feedback is handled by sendCustomContent or if it returns false without specific message
        setFeedback("error", `Failed to send custom content for ${sourceName}. Check console for details.`);
      }
    } catch (error: any) {
      setFeedback("error", error.message || `An unexpected error occurred while sending custom content for ${sourceName}.`);
    } finally {
      isSendingCustomContent = false;
      latestMessage.set("");
    }
  }

  /** Handles manually triggering the newsletter send for this source */
  async function handleTriggerSend() {
    if (!newsSource || !newsSource.id) {
      setFeedback("error", "Cannot trigger send: News source ID is missing.");
      return;
    }
    if (isTriggeringSend) return; // Prevent double clicks

    isTriggeringSend = true;
    clearFeedback();

    try {
      const response = await triggerNewsSourceSend(newsSource.id);
      if (typeof response === "boolean" && response) {
        setFeedback("success", `Newsletter send initiated for ${sourceName}.`);
      } else {
        // Error message is likely logged within triggerNewsSourceSend
        setFeedback(
          "error",
          String(response),
        );
       }
     } catch (error: any) {
       console.error(`[SVELTE CATCH] Error caught in handleTriggerSend for ${newsSource.id}:`, error); // Enhanced log
       // Check for specific rate limit error (429)
       let errorMessage = `Failed to trigger send for ${sourceName}.`; // Default message
       if (error && error.response && typeof error.response.json === 'function' && error.response.status === 429) { // Added more checks
         // Attempt to get the specific message from the response body
          try {
            console.log("[SVELTE CATCH] Attempting to parse 429 response body..."); // Log step
            // Assuming the body is JSON and has a 'message' field
            const errorData = await error.response.json();
            console.log("[SVELTE CATCH] Parsed 429 error data:", errorData); // Log parsed data
            if (errorData && errorData.message) {
               errorMessage = errorData.message;
               console.log("[SVELTE CATCH] Extracted message:", errorMessage); // Log extracted message
            } else {
               errorMessage = `Rate limit hit (no specific message). Status 429`;
               console.log("[SVELTE CATCH] No message field found in 429 data."); // Log finding
            }
          } catch (parseError) {
            console.error("[SVELTE CATCH] Could not parse 429 error response body:", parseError);
            errorMessage = `Rate limit hit (parsing failed). Status 429`;
          }
       } else if (error && error.message) { // Added check for error existence
         // Use the error's message if available and not a 429
         errorMessage = error.message;
         console.log("[SVELTE CATCH] Using generic error.message:", errorMessage); // Log finding
       } else {
         console.log("[SVELTE CATCH] Using default error message."); // Log finding
       }
       console.log("[SVELTE CATCH] Final error message before setFeedback:", errorMessage); // Log final message
       setFeedback("error", error);
     } finally {
       isTriggeringSend = false;
    }
  }

  /** Handles toggling the active state of the news source */
  async function handleToggleActive(newState: boolean) {
    if (!$store.config || !$store.config.newsSources) {
      console.error(
        "Cannot toggle active state: config or newsSources missing from store.",
      );
      setFeedback("error", "Configuration data is missing, cannot update.");
      return; // Exit if essential data is missing
    }

    isUpdatingActive = true;
    clearFeedback(); // Corrected usage of clearFeedback

    // Deep copy the newsSources array to avoid direct mutation
    const currentNewsSources = JSON.parse(
      JSON.stringify($store.config.newsSources),
    );
    const sourceIndex = currentNewsSources.findIndex(
      (ns: NewsSource) => ns.id === newsSource.id,
    );

    if (sourceIndex === -1) {
      console.error(
        `Cannot toggle active state: news source with ID ${newsSource.id} not found in store config.`,
      );
      setFeedback("error", "News source not found in current configuration.");
      isUpdatingActive = false;
      return;
    }

    // Update the active state in the copied array
    currentNewsSources[sourceIndex].active = newState;

    try {
      console.log(
        `Attempting to update config with newsSources:`,
        currentNewsSources,
      );
      const success = await updateConfiguration({
        newsSources: currentNewsSources,
      });

      if (success) {
        setFeedback(
          "success",
          `News source ${newState ? "activated" : "deactivated"}.`,
        );
        // Refresh the main config store to reflect the change everywhere
        await getConfiguratorSession(); // Re-fetch the entire config
      } else {
        setFeedback("error", "Failed to update news source status.");
        // No need to manually revert switch state, getConfiguratorSession() should fetch the correct state
      }
    } catch (error: any) {
      console.error("Error updating news source active state:", error);
      setFeedback(
        "error",
        `Error: ${error.message || "Failed to update status."}`,
      );
      // Attempt to refresh config even on error to sync state
      try {
        await getConfiguratorSession();
      } catch (refreshError) {
        console.error(
          "Failed to refresh config after update error:",
          refreshError,
        );
      }
    } finally {
      isUpdatingActive = false;
    }
  }

  function toggleAddFormVisibility() {
    const wasVisible = isAddingFormVisible;
    isAddingFormVisible = !isAddingFormVisible;
    actionFeedback = null; // Clear feedback when toggling visibility

    // If opening, ensure children forms might clear their state if they implement a reset method
    // If closing, we might also want to trigger reset in children if needed
    // This is simplified here; complex state reset might need direct child component refs or context API.
    if (isAddingFormVisible && !wasVisible) {
      // Potentially reset children if needed when opening
    }
  }

  function clearFeedback() {
    actionFeedback = null;
  }

  function setFeedback(
    type: "success" | "error",
    message: string,
    duration: number = 5000,
  ) {
    actionFeedback = { type, message };
    // Use tick to ensure the feedback element is rendered before starting timeout
    tick().then(() => {
      if (actionFeedback) {
        // Check if feedback hasn't been cleared already
        setTimeout(clearFeedback, duration);
      }
    });
  }

  // UPDATED: Now accepts formData directly instead of an event object
  async function handleManualAdd(
    formData: Pick<
      NewsletterUser,
      "name" | "email" | "bio" | "language"
    >,
  ) {
    // const { formData } = event.detail; // No longer needed
    clearFeedback();
    isPerformingAction = true;

    try {
      await UserDataService.addUserAndSubscribe(formData, newsSource.id);
      setFeedback(
        "success",
        `Successfully added and subscribed ${formData.email}.`,
      );
      isAddingFormVisible = false; // Hide form on success
    } catch (error: any) {
      console.error(`Error in handleManualAdd for ${newsSource.id}:`, error);
      setFeedback("error", error.message || "Failed to add user.");
      // Keep form open on error
    } finally {
      isPerformingAction = false;
    }
  }

  // UPDATED: Now accepts file directly instead of an event object
  async function handleBulkAdd(file: File | null) {
    // const { file } = event.detail; // No longer needed
    if (!file) return;

    clearFeedback();
    isPerformingAction = true;

    try {
      const result = await UserDataService.processBulkUpload(
        file,
        newsSource.id,
      );
      let feedbackType: "success" | "error" = "success";
      let message = result.successMessage;

      if (result.errorMessage) {
        message += ` | Errors: ${result.errorMessage}`;
        feedbackType = "error"; // Treat as error if any errors occurred during bulk process
      }
      setFeedback(feedbackType, message, 7000); // Longer duration for bulk results
      isAddingFormVisible = false; // Hide form on completion (success or partial success)
    } catch (error: any) {
      console.error(`Error in handleBulkAdd for ${newsSource.id}:`, error);
      setFeedback("error", error.message || "Failed to process bulk upload.");
      // Keep form open on major processing error
    } finally {
      isPerformingAction = false;
    }
  }

  // UPDATED: Now accepts email directly instead of an event object
  async function handleRemoveUser(email: string) {
    // const { email } = event.detail; // No longer needed

    if (
      !confirm(
        `Are you sure you want to unsubscribe ${email} from ${sourceName}?`,
      )
    ) {
      return;
    }

    clearFeedback();
    removingUserEmail = email; // Set loading state for this specific user

    try {
      await UserDataService.unsubscribeUserFromSource(email, newsSource.id);
      // Store update is handled by the service, prop update triggers reactivity
      setFeedback(
        "success",
        `${email} unsubscribed successfully from ${sourceName}.`,
      );
    } catch (error: any) {
      console.error(
        `Error in handleRemoveUser for ${email} from ${newsSource.id}:`,
        error,
      );
      setFeedback("error", error.message || `Failed to unsubscribe ${email}.`);
    } finally {
      removingUserEmail = null; // Clear loading state for this user
    }
  }
</script>

<ToggleCard
  {canReveal}
  cardTitle="{cardTitle} {!isOpen ? `(${subscriberCount})` : ''}"
  {isOpen}
  onChange={(newIsOpenState: boolean) => {
    // Update the store when this card's toggle changes
    openNewsSourceIdStore.set(newIsOpenState ? newsSource.id : null);
  }}
>
  <!-- Default Slot Content for the ToggleCard body -->

  <!-- Activation Switch -->
  <div class="switch-container" class:disabled={isUpdatingActive}>
    <span
      style="font-size: 0.8em; color: var(--color-text-secondary); margin-right: 0.5rem;"
      >{newsSource.active ?? false ? "Active" : "Inactive"}:</span
    >
    <Switch
      toggled={newsSource.active ?? false}
      onChange={handleToggleActive}
    />
    <!-- No disabled prop, handled by CSS -->
  </div>

  <!-- Section for adding users (trigger + forms) -->
  <div class="add-user-section">
    <!-- Trigger to show/hide the add forms -->
    <IconButton
      src="/icons/plus.svg"
      label={isAddingFormVisible ? "Cancel Adding User" : "Add New Subscriber"}
      callback={toggleAddFormVisibility}
      disabled={isPerformingAction}
    />

    <!-- Display Action Feedback -->
    {#if actionFeedback}
      <div class="feedback-message {actionFeedback.type}">
        {actionFeedback.message}
        <button
          class="close-feedback"
          on:click={clearFeedback}
          aria-label="Dismiss notification">×</button
        >
      </div>
    {/if}

    <!-- Conditionally rendered container for add forms -->
    {#if isAddingFormVisible}
      <div class="add-forms-container" id={`add-forms-${newsSource.id}`}>
        <!-- Manual Add Form Component -->
        <!-- UPDATED: Pass handler as 'onSubmit' prop. Removed newsSourceId prop as it's not expected by the component. -->
        <ManualAddUserForm
          onSubmit={handleManualAdd}
          disabled={isPerformingAction}
        />

        <hr class="section-separator" />

        <!-- Bulk Add Section Component -->
        <!-- UPDATED: Pass handler as 'onUpload' prop instead of listening for 'bulkAdd' event -->
        <BulkAddUserSection
          newsSourceId={newsSource.id}
          onUpload={handleBulkAdd}
          disabled={isPerformingAction}
        />

        <!-- No final separator needed if it's the last item -->
        <!-- <hr class="section-separator" /> -->
      </div>
    {/if}
  </div>

  <!-- Subscriber List Section -->
  <div class="subscriber-list-section">
    <TextTypes type="subtitle">
      Current Subscribers ({subscriberCount})
    </TextTypes>

    <PlainText
      label="Search by name or email"
      bind:value={$search}
      placeholder="Search..."
    />

    {#if subscriberCount > 0}
      <div class="subscriber-cards-container">
        <!-- Loop through reversed list (newest first) -->
        {#each reversedSubscribers as user (user.email)}
          <!-- UPDATED: Removed 'onRemove' prop. Removal is now handled via the userRemovalRequestStore subscription. -->
          <UserCard
            {user}
            newsSourceId={newsSource.id}
            disabled={removingUserEmail === user.email}
          />
        {/each}
      </div>
    {:else}
      <!-- Message when no subscribers -->
      <p style="margin-top: 0.5rem;">
        <TextTypes type="sub-italic"
          >No subscribers for this source yet.</TextTypes
        >
      </p>
    {/if}
  </div>
  <!-- End subscriber-list-section -->

  <!-- Manual Trigger Button -->
  <div class="trigger-send-container">
    <SubmitButton
      label="Send Newsletter Now"
      callback={() => handleTriggerSend()}
      loading={isTriggeringSend}
      disabled={isUpdatingActive || isPerformingAction || isSendingCustomContent}
    />
  </div>

  <!-- Custom Content Send Section -->
  <div class="custom-content-send-section">
    <TextTypes type="subtitle"
      >Send Custom Message to Subscribers of {sourceName}</TextTypes
    >
    <TextArea
      bind:value={customEmailContent}
      label="Custom Message Content:"
      placeholder="Type your direct message to subscribers here..."
      rows={8}
      disabled={isSendingCustomContent || isTriggeringSend}
    />
    <div class="custom-send-button-container">
      <SubmitButton
        label="Send Custom Message"
        callback={handleSendCustomContent}
        loading={isSendingCustomContent}
        disabled={!customEmailContent.trim() || isTriggeringSend || isUpdatingActive || isPerformingAction}
      />
    </div>
  </div>
</ToggleCard>

<!-- End ToggleCard for this news source -->

<!-- Styles remain the same -->
<style lang="scss">
  @use "./Users.scss";
  @use "../Dashboard.scss";

  .trigger-send-container {
    display: flex;
    justify-content: flex-end; // Keep existing button to the right
    margin-top: 1rem; // Add some margin if it's not the last element anymore
  }

  .custom-content-send-section {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border-light, #eee);

    h4 { // Styling for the new subtitle using TextTypes props
        margin-bottom: 0.75rem;
    }
  }
  
  .custom-send-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.75rem;
  }

  // Added styles for switch container and disabled state
  .switch-container {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-left: 1rem; // Add some space from the title
    transition: opacity 0.3s ease;

    &.disabled {
      opacity: 0.5;
      pointer-events: none; // Prevent interaction when disabled
    }
  }

  .add-user-section {
    margin-bottom: 1rem; // Space between add section and list
  }

  .add-user-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    color: var(--color-foreground);
    padding: 0.4rem 0.8rem;
    border-radius: var(--radius-m);
    cursor: pointer;
    transition: background-color 0.2s ease;
    font-weight: 500;

    &:hover:not(:disabled) {
      background: var(--color-primary, #00bcd4);
      color: white;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
    & > span {
      padding-top: 0.1rem;
    }
  }

  .add-forms-container {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px dashed var(--color-border-light, #ccc);
    border-radius: var(--radius-m);
    background-color: var(--color-background-inversion);
  }

  .section-separator {
    border: none;
    border-top: 1px solid var(--color-border-light, #eee);
    margin: 1.5rem 0;
  }

  .subscriber-list-section {
    margin-top: 1rem;
  }

  .subscriber-cards-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem; // Space between user cards
    margin-top: 0.5rem;
  }

  .feedback-message {
    position: relative; // For absolute positioning of close button
    padding: 0.75rem 2rem 0.75rem 1rem; // Extra padding on right for close button
    margin: 1rem 0 0.5rem 0; // Display above subscriber list or near trigger
    border-radius: var(--radius-s);
    font-size: 0.9rem;
    border: 1px solid transparent;

    &.success {
      background-color: var(--color-success-light, #e8f5e9);
      border-color: var(--color-success, #4caf50);
      color: var(--color-success-dark, #1b5e20);
    }

    &.error {
      background-color: var(--color-error-light, #ffebee);
      border-color: var(--color-error, #f44336);
      color: var(--color-error-dark, #c62828);
    }

    .close-feedback {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.4em;
      line-height: 1;
      padding: 0.2rem;
      color: inherit; // Inherit color from parent type (success/error)
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>

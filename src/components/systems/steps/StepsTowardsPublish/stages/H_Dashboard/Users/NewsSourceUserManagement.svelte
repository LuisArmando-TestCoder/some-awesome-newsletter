<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/NewsSourceUserManagement.svelte -->
<script lang="ts">
  // REMOVED: createEventDispatcher (was unused here)
  // REMOVED: createEventDispatcher (was unused here)
  import { tick } from "svelte";
  import type { NewsSource, NewsletterUser } from "../../../../../../types.ts"; // Adjust path
  import * as UserDataService from "./UserDataService.ts"; // Adjust path
  import { userRemovalRequestStore } from "./userActions.ts"; // Import the shared store

  // Import Child Components (Assumed to be updated to accept function props)
  import ManualAddUserForm from "./ManualAddUserForm.svelte";
  import BulkAddUserSection from "./BulkAddUserSection.svelte";
  import UserCard from "./UserCard.svelte";

  // Import UI Components (Existing)
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte"; // Adjusted path - verify this is correct
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte"; // Adjust path
  import Svg from "../../../../../../SVG/SVG.svelte"; // Adjust path
    import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";

  // --- Props ---
  /** The specific news source object this component manages */
  export let newsSource: NewsSource;
  /** The list of subscribers specifically for this news source */
  export let subscribers: NewsletterUser[] = [];
  /** Controls if the main card can be revealed (passed down to ToggleCard) */
  export let canReveal: boolean = true;

  // --- State ---
  let isAddingFormVisible: boolean = false;
  /** Feedback for actions performed within *this* specific news source card */
  let actionFeedback: { type: "success" | "error"; message: string } | null =
    null;
  /** Generic loading flag for actions originating from this component (add/bulk) */
  let isPerformingAction: boolean = false;
  /** Specific loading state for removing a user (could target specific email if needed) */
  let removingUserEmail: string | null = null;

  // REMOVED: const dispatch = createEventDispatcher();

  // --- Computed Properties ---
  $: cardTitle = `Subscribers for: ${newsSource.url?.split("//")[1]?.split("/")[0] ?? newsSource.id}`;
  $: subscriberCount = subscribers.length;
  // Create a reversed copy for display (newest first) without mutating the prop
  $: reversedSubscribers = subscribers ? [...subscribers].reverse() : [];
  $: sourceName =
    newsSource.url?.split("//")[1]?.split("/")[0] ?? newsSource.id; // User-friendly name

  // --- Reactive Store Subscription ---
  // Handle removal requests triggered by child UserCard components via the shared store
  $: if ($userRemovalRequestStore && $userRemovalRequestStore.newsSourceId === newsSource.id) {
    // Check if the request is for *this* news source instance
    const { email } = $userRemovalRequestStore;
    // Clear the store immediately to prevent re-triggering and allow subsequent requests
    userRemovalRequestStore.set(null);
    // Call the handler function which contains the confirmation and API call
    handleRemoveUser(email);
  }


  // --- Functions ---
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
    duration: number = 5000
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
      "name" | "email" | "bio" | "language" | "countryOfResidence"
    >
  ) {
    // const { formData } = event.detail; // No longer needed
    clearFeedback();
    isPerformingAction = true;

    try {
      await UserDataService.addUserAndSubscribe(formData, newsSource.id);
      setFeedback(
        "success",
        `Successfully added and subscribed ${formData.email}.`
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
        newsSource.id
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
        `Are you sure you want to unsubscribe ${email} from ${sourceName}?`
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
        `${email} unsubscribed successfully from ${sourceName}.`
      );
    } catch (error: any) {
      console.error(
        `Error in handleRemoveUser for ${email} from ${newsSource.id}:`,
        error
      );
      setFeedback("error", error.message || `Failed to unsubscribe ${email}.`);
    } finally {
      removingUserEmail = null; // Clear loading state for this user
    }
  }
</script>

<ToggleCard
  {canReveal}
  {cardTitle}
  isOpen={false}
  onChange={(isOpen) => console.log("ToggleCard state changed:", isOpen)}
>
  <!-- Slot Content for the ToggleCard -->

  <!-- Section for adding users (trigger + forms) -->
  <div class="add-user-section">
    <!-- Trigger to show/hide the add forms -->
    <IconButton
      src="/icons/plus.svg"
      label={isAddingFormVisible
          ? "Cancel Adding User"
          : "Add New Subscriber"}
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
</ToggleCard>

<!-- End ToggleCard for this news source -->

<!-- Styles remain the same -->
<style lang="scss">
  @use "./Users.scss";
  @use "../Dashboard.scss";

  // Add component-specific styles here or reuse from Users.scss
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

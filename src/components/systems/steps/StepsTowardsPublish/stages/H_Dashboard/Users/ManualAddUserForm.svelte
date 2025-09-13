<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/ManualAddUserForm.svelte -->
<script lang="ts">
  // REMOVED: import { createEventDispatcher } from "svelte";
  // REMOVED: import { writable } from "svelte/store"; // Not needed for this pattern

  // Import Input & Button Components (Adjust paths as needed)
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import Email from "../../../../../inputs/Email/Email.svelte";
  import Language from "../../../../../inputs/Language/Language.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import type { NewsletterUser } from "../../../../../../types"; // Adjust path
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";

  // Type for the expected form data payload
  type FormDataPayload = Pick<
    NewsletterUser,
    "name" | "email" | "bio" | "language"
  >;

  // --- Props ---
  /** Disables the entire form, typically while a parent action is processing */
  export let disabled: boolean = false;
  /** Callback function invoked on successful validation and submission */
  export let onSubmit: (
    formData: FormDataPayload
  ) => void | Promise<void> = () => {};

  // --- Internal Form State ---
  // Using simple variables is often sufficient for form state within a component
  let name: string = "";
  let email: string = "";
  let bio: string = "";
  let language: string = "en"; // Default language
  let isSubmitting: boolean = false; // Loading state specifically for this form's submission attempt
  let validationError: string | null = null;

  // REMOVED: const dispatch = createEventDispatcher ...

  // --- Functions ---

  /** Resets the form fields to their default state and clears errors */
  function resetForm() {
    name = "";
    email = "";
    bio = "";
    language = "en";
    validationError = null;
    isSubmitting = false; // Ensure submitting state is also reset
  }

  /** Handles the form submission */
  function handleSubmit() {
    if (disabled || isSubmitting) {
      return; // Prevent submission if disabled or already submitting
    }

    validationError = null; // Clear previous validation errors

    // --- Basic Client-Side Validation ---
    if (!name.trim()) {
      validationError = "Name is required.";
      return;
    }
    if (!email.trim()) {
      validationError = "Email is required.";
      return;
    }
    // Basic email format check (consider a more robust regex if needed)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationError = "Please enter a valid email address.";
      return;
    }
    if (!language) {
      validationError = "Language selection is required.";
      return;
    }
    // --- End Validation ---

    // Set loading state for the submit button
    isSubmitting = true;

    // Prepare form data payload
    const formData: FormDataPayload = {
      name: name.trim(),
      email: email.trim(),
      bio: bio.trim(),
      language,
    };

    // Call the parent's handler function passed via the onSubmit prop
    try {
      // Call the provided onSubmit function. It might be async.
      const result = onSubmit(formData);
      // If the onSubmit function is async, we might want to wait for it,
      // but usually the parent handles its own loading state.
      // For this pattern, we typically just trigger the parent and let it manage flow.
    } catch (error) {
      // It's generally better for the parent component (which owns the async logic)
      // to handle errors and update feedback there. Catching here might be redundant
      // unless this component needs to react specifically to an error during the *call* itself.
      console.error("Error calling onSubmit:", error);
      // Optionally set a generic error here, though parent feedback is preferred.
      // validationError = "An unexpected error occurred during submission.";
    } finally {
      // Resetting isSubmitting state. The parent's 'disabled' prop should handle
      // the broader loading state during the async operation. Resetting here allows
      // the button to become active again *unless* the parent disables the whole form.
      isSubmitting = false;
    }

    // We *don't* reset the form here automatically.
    // The parent component (`NewsSourceUserManagement`) decides whether to hide this form
    // or could potentially call the exported reset() function if needed.
  }

  // Reactive statement to clear validation error when user starts typing again
  $: if (name || email || language) {
    if (validationError) validationError = null;
  }

  // Expose the reset function if the parent needs to call it explicitly
  export function reset() {
    resetForm();
  }
</script>

<div class="manual-add-form">
  <ToggleCard
    cardTitle="Add User Manually"
    isOpen={false}
    onChange={(isOpen) => {
      console.log("ToggleCard state changed:", isOpen);
    }}
  >
    <!-- Using form element's submit event is still good practice -->
    <form class="form" on:submit|preventDefault={handleSubmit}>
      <PlainText
        label="Name *"
        placeholder="User's full name"
        bind:value={name}
        required={true}
        disabled={disabled || isSubmitting}
      />
      <Email
        label="Email *"
        placeholder="User's email address"
        bind:value={email}
        required={true}
        disabled={disabled || isSubmitting}
      />
      <Language
        label="Language *"
        defaultLanguageCode={language}
        onSelect={(lang) => (language = lang as string)}
        disabled={disabled || isSubmitting}
      />
      <PlainText
        label="Bio (Optional)"
        placeholder="Short description (optional)"
        bind:value={bio}
        disabled={disabled || isSubmitting}
        isTextarea={true}
        rows={3}
      />

      <!-- Display Validation Error -->
      {#if validationError}
        <p class="error-message">{validationError}</p>
      {/if}

      <!-- SubmitButton should trigger the form submission -->
      <!-- Removing the callback prop as the form's on:submit handles it -->
      <SubmitButton
        label={isSubmitting ? "Submitting..." : "Add & Subscribe User"}
        disabled={disabled || isSubmitting || !!validationError}
        loading={isSubmitting}
        type="submit"
      />
      <!-- If SubmitButton doesn't inherently trigger form submit, keep the callback:
       <SubmitButton
           label={isSubmitting ? "Submitting..." : "Add & Subscribe User"}
           disabled={disabled || isSubmitting || !!validationError}
           loading={isSubmitting}
           callback={handleSubmit}  // Re-add if button doesn't bubble submit
       />
       -->
    </form>
  </ToggleCard>
</div>

<!-- Use scoped styles or rely on global styles/parent styles -->
<style lang="scss">
  @use "./Users.scss";
  @use "../Dashboard.scss";

  .manual-add-form {
    /* Add specific spacing or layout styles for the form if needed */
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem; // Spacing between form elements
    margin-top: 0.75rem; // Space below the subtitle
  }

  .error-message {
    color: var(--color-error-dark, #c62828);
    background-color: var(--color-error-light, #ffebee);
    border: 1px solid var(--color-error, #f44336);
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-s);
    font-size: 0.9rem;
    margin-top: -0.5rem; // Reduce gap above error message
    margin-bottom: 0.5rem;
  }

  /* Ensure inputs/buttons take appropriate width if needed */
  /* These might need adjustment based on the actual structure of child components */
  :global(.plain-text-input-wrapper),
  :global(.email-input-wrapper),
  :global(.language-select-wrapper),
  :global(.country-select-wrapper),
  :global(.submit-button-wrapper) {
    width: 100%; /* Example: Make inputs/buttons full width */
    box-sizing: border-box; /* Important for width calculation */
  }

  /* Adjust SubmitButton alignment if needed */
  :global(.submit-button-wrapper) {
    margin-top: 0.5rem; /* Add some space before the button */
    display: flex; /* Enable flex properties */
    justify-content: flex-end; /* Example: Align button to the right */
  }

  /* Ensure Textarea within PlainText works well */
  :global(.plain-text-input-wrapper textarea) {
    resize: vertical; /* Allow vertical resize */
  }
</style>

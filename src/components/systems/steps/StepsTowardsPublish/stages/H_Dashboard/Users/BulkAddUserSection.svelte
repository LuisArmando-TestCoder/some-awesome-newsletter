<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/BulkAddUserSection.svelte -->
<script lang="ts">
  // REMOVED: import { createEventDispatcher } from "svelte";

  // Import UI Components (Adjust paths as needed)
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";

  // --- Props ---
  /** Disables the entire section, typically while a parent action is processing */
  export let disabled: boolean = false;
  /** Passed for context, although not directly used in the data passed to the handler */
  export let newsSourceId: string;
  /** Callback function invoked when a valid file is selected and upload is triggered */
  export let onUpload: (file: File | null) => void | Promise<void> = () => {}; // Accept File | null

  // --- Internal State ---
  let fileInputRef: HTMLInputElement; // Reference to the file input element
  let selectedFile: File | null = null;
  let isSubmitting: boolean = false; // Loading state for the upload trigger in *this* component
  let fileError: string | null = null; // Error specifically related to file selection/validation

  // REMOVED: const dispatch = createEventDispatcher ...

  // --- Functions ---

  /** Handles the file input change event */
  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    fileError = null; // Clear previous file errors
    selectedFile = null; // Reset selection first

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Optional: Basic file type validation here if needed, supplementing the 'accept' attribute
      const allowedTypes = [".csv", ".txt", ".xlsx", ".xls"];
      // Use optional chaining for safety
      const fileExtension = file.name.includes(".")
        ? "." + file.name.split(".").pop()?.toLowerCase()
        : "";

      if (!allowedTypes.includes(fileExtension)) {
        fileError = `Invalid file type. Please select ${allowedTypes.join(", ")}.`;
        // Clear the input visually so user can re-select the same file if needed after correction
        if (fileInputRef) fileInputRef.value = "";
        return;
      }
      // Optional: File size validation
      const maxSizeMB = 10; // Example: 10MB limit
      if (file.size > maxSizeMB * 1024 * 1024) {
        fileError = `File is too large. Maximum size is ${maxSizeMB}MB.`;
        if (fileInputRef) fileInputRef.value = ""; // Clear input
        return;
      }

      selectedFile = file;
    }
    // If no file selected (e.g., user cancels dialog), selectedFile remains null
    // Do not clear fileInputRef.value here, allow browser default behaviour
  }

  /** Handles the submission trigger */
  function handleBulkSubmit() {
    if (disabled || isSubmitting || !selectedFile) {
      if (!selectedFile && !disabled && !fileError) {
        // Only show if no other error exists
        fileError = "Please select a file first.";
      }
      return;
    }

    fileError = null; // Clear error on successful trigger attempt
    isSubmitting = true;

    try {
      // Call the parent's handler function passed via the onUpload prop
      onUpload(selectedFile);
    } catch (error) {
      // Similar to ManualAddUserForm, parent should handle async errors.
      // Catching here is mainly for issues calling the prop itself.
      console.error("Error calling onUpload:", error);
      // Optionally set a component-level error, but parent feedback is preferred.
      // fileError = "An unexpected error occurred when trying to upload.";
    } finally {
      // Reset submitting state after triggering the parent action.
      // Parent's 'disabled' prop handles UI during the actual async processing.
      isSubmitting = false;
    }

    // We *don't* automatically clear the file selection here after triggering upload.
    // The parent component (`NewsSourceUserManagement`) now controls the flow.
    // If the parent succeeds, it might hide this whole section. If it fails,
    // keeping the file selected might be desired for a retry. The parent
    // could potentially call the exported reset() function if needed upon success.
    // For now, leave selectedFile and the input as they are.
    // If clearing is desired *always* after triggering, uncomment below:
    // selectedFile = null;
    // if (fileInputRef) fileInputRef.value = "";
  }

  // Reactive statement to clear file error if user selects a valid file
  // (handleFileSelect already does this, but this catches edge cases if state changes elsewhere)
  $: if (selectedFile && fileError) {
    fileError = null;
  }

  // Expose reset if parent needs it (e.g., on cancel/close or successful upload)
  export function reset() {
    selectedFile = null;
    isSubmitting = false;
    fileError = null;
    if (fileInputRef) fileInputRef.value = "";
  }
</script>

<div class="bulk-add-section">
  <ToggleCard
    cardTitle="Add Users from File (.csv, .txt, .xlsx)"
    isOpen={false}
    canReveal={true}
    onChange={console.log}
  >
    <!-- Styled File Input -->
    <!-- Needs unique ID if multiple instances exist on page -->
    <button
      class:file-input-label={true}
      class:disabled={disabled || isSubmitting}
      type="button"
      aria-disabled={disabled || isSubmitting}
      tabindex={disabled || isSubmitting ? -1 : 0}
      on:click={() => fileInputRef?.click()}
      on:keydown={(e) => {
        if (e.key === "Enter" || e.key === " ") fileInputRef?.click();
      }}
    >
      Choose File
      <input
        bind:this={fileInputRef}
        id={`file-upload-${newsSourceId}`}
        class="file-input-hidden"
        type="file"
        accept=".csv, .txt, .xlsx, .xls, text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        on:change={handleFileSelect}
        disabled={disabled || isSubmitting}
        aria-hidden="true"
      />
    </button>

    <!-- Display Selected File Name -->
    {#if selectedFile}
      <p class="selected-file-info">
        Selected: <span class="file-name">{selectedFile.name}</span>
        <!-- Optional: Add a button to clear selection -->
        <button
          class="clear-selection"
          on:click={() => reset()}
          disabled={disabled || isSubmitting}
          aria-label="Clear selected file">✕</button
        >
      </p>
    {/if}

    <!-- Display File Selection Error -->
    {#if fileError}
      <p class="error-message">{fileError}</p>
    {/if}

    <div class="send-end">
      <!-- Submit Button -->
      <SubmitButton
        label={isSubmitting ? "Processing..." : "Upload & Add/Subscribe"}
        disabled={disabled || isSubmitting || !selectedFile || !!fileError}
        loading={isSubmitting}
        callback={handleBulkSubmit}
      />
    </div>

    <!-- Note: API processing feedback (success/error messages from the actual upload)
           is now handled by the parent component (NewsSourceUserManagement) -->
  </ToggleCard>
</div>

<style lang="scss">
  @use "./Users.scss";
  @use "../Dashboard.scss";

  .bulk-add-section {
    margin-top: 1rem; // Add some space above this section if needed
    display: flex;
    flex-direction: column;
    gap: 0.75rem; // Space between elements
  }

  .file-input-label {
    display: inline-block; // Allows setting width/padding
    padding: 3rem 0;
    background-color: var(
      --color-background-inversion
    ); // Slightly different bg
    border: 1px dashed var(--color-border-light, #ccc);
    border-radius: var(--radius-m);
    border-width: 0.1rem;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      box-shadow 0.2s ease;
    text-align: center;
    font-weight: 500;
    color: var(--color-text-primary, #333);
    width: 100%; // Don't force full width
    margin-bottom: 1rem;

    &:hover:not(.disabled) {
      background-color: var(--color-background, #e0e0e0);
      color: var(--color-background-inversion, #bbb);
    }

    &:focus-visible:not(.disabled) {
      // Accessibility
      outline: 2px solid var(--color-primary-focus, navy);
      outline-offset: 2px;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.6;
      background-color: var(--color-background-opaque-inversion);
      border-color: var(--color-border-light, #ccc);
    }
  }

  .file-input-hidden {
    display: none; // Hide the actual file input visually
    // width: 0; // Ensure it takes no space
    // height: 0;
    // opacity: 0;
    // position: absolute; // Take out of flow
    // z-index: -1; // Ensure it's behind
  }

  .selected-file-info {
    font-size: 0.9rem;
    color: var(--color-text-secondary, #555);
    margin-top: -0.25rem; // Reduce gap after choose button
    margin-bottom: 0.25rem; // Reduce gap before submit button
    display: flex;
    align-items: center;
    gap: 0.5rem; // Space between text and clear button

    .file-name {
      font-style: italic;
      overflow: hidden; // Prevent long names breaking layout
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 300px; // Adjust as needed
    }
  }

  .clear-selection {
    background: none;
    border: none;
    color: var(--color-text-secondary, #777);
    cursor: pointer;
    font-size: 1.2em;
    line-height: 1;
    padding: 0.1rem 0.3rem;
    border-radius: 50%;
    &:hover:not(:disabled) {
      color: var(--color-error-dark, #c62828);
      background-color: var(--color-error-light, #ffebee);
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .error-message {
    color: var(--color-error-dark, #c62828);
    background-color: var(--color-error-light, #ffebee);
    border: 1px solid var(--color-error, #f44336);
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-s);
    font-size: 0.9rem;
    margin-top: 0; // Error replaces file info usually
    margin-bottom: 0.5rem; // Space below error before button
  }

  /* Style the Submit Button wrapper if needed */
  :global(.submit-button-wrapper) {
    margin-top: 0.25rem; // Adjust spacing
    width: 100%; // Make button potentially full width
    display: flex;
    align-items: end;
    justify-content: end; // Align button left by default
  }

  .send-end {
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
  }
</style>

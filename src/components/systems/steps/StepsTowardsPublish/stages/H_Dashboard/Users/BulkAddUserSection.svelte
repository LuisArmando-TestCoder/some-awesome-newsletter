<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/BulkAddUserSection.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store'; // Import writable
  import type { Writable } from 'svelte/store';

  // Import UI Components
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import FileInput from "../../../../../inputs/FileInput/FileInput.svelte";

  // --- Props ---
  export let disabled: boolean = false;
  export let newsSourceId: string;
  export let onUpload: (file: File | null) => void | Promise<void> = () => {};

  // --- Internal State ---
  let selectedFilesStore: Writable<FileList | null> = writable(null); // Create store
  // let selectedFile: File | null = null; // Replaced by store
  let isSubmitting: boolean = false;
  let fileError: string | null = null; // Keep local error state for validation/submit checks

  // --- Functions ---

  // REMOVED: handleFileChange function - FileInput updates the store directly.
  // Validation (if needed) should happen *before* calling onUpload.

  /** Handles the submission trigger */
  function handleBulkSubmit() {
    const currentFiles = $selectedFilesStore; // Get files from store
    const fileToUpload = currentFiles && currentFiles.length > 0 ? currentFiles[0] : null;

    // Basic check if a file exists in the store
    if (disabled || isSubmitting || !fileToUpload) {
      if (!fileToUpload && !disabled && !fileError) { // Check store value
        fileError = "Please select a file first.";
      }
      return;
    }

    // --- Optional: Add validation here before calling onUpload ---
    // Example:
    // const allowedTypes = [".csv", ".txt", ".xlsx", ".xls"];
    // const fileExtension = fileToUpload.name.includes(".") ? "." + fileToUpload.name.split(".").pop()?.toLowerCase() : "";
    // if (!allowedTypes.includes(fileExtension)) {
    //   fileError = `Invalid file type. Please select ${allowedTypes.join(", ")}.`;
    //   return;
    // }
    // const maxSizeMB = 10;
    // if (fileToUpload.size > maxSizeMB * 1024 * 1024) {
    //   fileError = `File is too large. Maximum size is ${maxSizeMB}MB.`;
    //   return;
    // }
    // --- End Optional Validation ---


    fileError = null; // Clear error before proceeding
    isSubmitting = true;

    try {
      onUpload(fileToUpload); // Pass the file from the store
    } catch (error) {
      console.error("Error calling onUpload:", error);
    } finally {
      isSubmitting = false;
    }
    // Keep file selected for potential retries, parent controls flow.
  }

  // Reactive statement to clear file error if user selects a file via the store
  $: if ($selectedFilesStore && $selectedFilesStore.length > 0 && fileError) {
    fileError = null;
  }

  // Expose reset function
  export function reset() {
    selectedFilesStore.set(null); // Reset the store
    isSubmitting = false;
    fileError = null;
  }
</script>

<div class="bulk-add-section">
  <!-- Note: Consider updating cardTitle and label if accepting *any* file -->
  <ToggleCard
    cardTitle="Add Users from File"
    isOpen={false}
    canReveal={true}
    onChange={console.log}
  >
    <!-- FileInput component -->
    <FileInput
      id={`file-upload-${newsSourceId}`}
      label="Choose File"
      selectedFilesStore={selectedFilesStore}
      {disabled}
    />
    <!-- Display Selected File Name (reading from store) -->
    {#if $selectedFilesStore && $selectedFilesStore.length > 0 && !fileError}
      {@const firstFile = $selectedFilesStore[0]}
      <p class="selected-file-info">
        Selected: <span class="file-name">{firstFile.name}</span>
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
      <!-- Submit Button (check store for file presence) -->
      <SubmitButton
        label={isSubmitting ? "Processing..." : "Upload & Add/Subscribe"}
        disabled={disabled || isSubmitting || !$selectedFilesStore || $selectedFilesStore.length === 0 || !!fileError}
        loading={isSubmitting}
        callback={handleBulkSubmit}
      />
    </div>
  </ToggleCard>
</div>

<style lang="scss">
  @use "./Users.scss";
  @use "../Dashboard.scss";

  .bulk-add-section {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .selected-file-info {
    font-size: 0.9rem;
    color: var(--color-text-secondary, #555);
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .file-name {
      font-style: italic;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 300px;
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
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  :global(.submit-button-wrapper) {
    margin-top: 0.25rem;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
  }

  .send-end {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
  }
</style>

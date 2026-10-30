<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import type { Writable } from 'svelte/store'; // Import Writable type
import { t } from '$lib/i18n/dashboard-translations';

// --- Props ---
/** A writable store provided by the parent to hold the selected FileList */
export let selectedFilesStore: Writable<FileList | null>;

/** Disables the input and drop zone */
export let disabled: boolean = false;
/** Visual indicator for parent submission state (often duplicates disabled logic) */
export let isSubmitting: boolean = false; // Kept for potential distinct styling/logic
/** Hint for the browser's file picker. Default is empty ("any file"). */
export let accept: string = ""; // Default to accept any file
/** Unique ID for the input element */
export let id: string = `file-upload-${Math.random().toString(36).substring(2, 9)}`;
/** Label for the trigger button */
export let label: string = $t['fileInput.chooseFile'];
/** Label text shown within the drop zone area */
export let dropZoneLabel: string = $t['fileInput.orDropFileHere'];

// --- Internal State & Refs ---
let fileInputRef: HTMLInputElement | null = null;
let dropZoneRef: HTMLElement | null = null;
let isDraggingOver = false;

// --- Event Handlers ---
const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
    console.log('[FileInput] handleFileSelect: Files selected via input:', target.files); // Log selected files
    selectedFilesStore.set(target.files); // Update the store
    // Do NOT reset target.value here immediately. Reset only if store becomes null.
    } else {
        // If user cancels selection after having one, update store
        if ($selectedFilesStore !== null) {
        selectedFilesStore.set(null);
        }
    }
};

const triggerFileInput = () => {
    if (!disabled && !isSubmitting) {
    fileInputRef?.click();
    }
};

const handleKeyDown = (e: KeyboardEvent) => {
    if (!disabled && !isSubmitting && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    triggerFileInput();
    }
};

// --- Drag and Drop Handlers ---
const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isSubmitting) {
    isDraggingOver = true;
    }
};

const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isSubmitting) {
    isDraggingOver = true;
    }
};

const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef && !dropZoneRef.contains(e.relatedTarget as Node)) {
        isDraggingOver = false;
    }
};

const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingOver = false;
    if (disabled || isSubmitting) return;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
    console.log('[FileInput] handleDrop: Files dropped:', files); // Log dropped files
    // Note: Browser might still filter based on 'accept' during drag/drop
    // We update the store regardless of the 'accept' prop here.
    selectedFilesStore.set(files); // Update the store
        // Clear the input value in case the dropped file matches the last selected one
    if (fileInputRef) fileInputRef.value = '';
    }
};

// --- Global Drag Listeners ---
const handleWindowDragLeave = (e: DragEvent) => {
    if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
    ) {
        isDraggingOver = false;
    }
};

onMount(() => {
    window.addEventListener('dragenter', handleDragEnter, true);
    window.addEventListener('dragover', handleDragOver, true);
    window.addEventListener('dragleave', handleWindowDragLeave);
});

onDestroy(() => {
    window.removeEventListener('dragenter', handleDragEnter, true);
    window.removeEventListener('dragover', handleDragOver, true);
    window.removeEventListener('dragleave', handleWindowDragLeave);
});

// --- Reactive Reset ---
// When the store is externally set to null, reset the input's value
// This allows selecting the same file again after a programmatic clear.
$: if ($selectedFilesStore === null && fileInputRef) {
    fileInputRef.value = '';
}

// Reactive check for disabled state to clear dragging visual
$: if ((disabled || isSubmitting) && isDraggingOver) {
    isDraggingOver = false;
}

</script>

<div
bind:this={dropZoneRef}
class="file-drop-zone"
class:drag-over={isDraggingOver && !disabled && !isSubmitting}
class:disabled={disabled || isSubmitting}
on:dragenter={handleDragEnter}
on:dragover={handleDragOver}
on:dragleave={handleDragLeave}
on:drop={handleDrop}
role="presentation"
>
<button
    class="file-input-label"
    class:disabled={disabled || isSubmitting}
    type="button"
    aria-disabled={disabled || isSubmitting}
    aria-busy={isSubmitting ? "true" : undefined}
    aria-describedby={isDraggingOver && !disabled && !isSubmitting ? `${id}-drop-instructions` : undefined}
    tabindex={disabled || isSubmitting ? -1 : 0}
    on:click={triggerFileInput}
    on:keydown={handleKeyDown}
    disabled={disabled || isSubmitting}
>
    <svg class="file-input-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    <span>{label}</span>
</button>
<span class="drop-zone-label" aria-hidden="true">{dropZoneLabel}</span>

{#if isDraggingOver && !disabled && !isSubmitting}
    <div id={`${id}-drop-instructions`} class="visually-hidden">
    {$t['fileInput.releaseMouseToDropFiles']}
    </div>
{/if}

<input
    bind:this={fileInputRef}
    {id}
    class="visually-hidden"
    type="file"
    {accept}
    on:change={handleFileSelect}
    disabled={disabled || isSubmitting}
    aria-hidden="true"
    tabindex="-1"
/>
</div>

<style>
/* Drop zone: dashed thin edge at rest, solid ink edge while a file is over it. */
.file-drop-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-5) var(--space-4);
    border: 1px dashed var(--border-2);
    border-radius: var(--radius-lg);
    background-color: var(--surface-1);
    font-family: var(--font-body);
    text-align: center;
    min-height: 100px;
    transition:
        background-color var(--t-out) var(--ease-out),
        border-color var(--t-out) var(--ease-out),
        box-shadow var(--t-out) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .file-drop-zone:not(.disabled):hover {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
    }
}

.file-drop-zone.drag-over {
    border-style: solid;
    border-color: var(--text-1);
    background-color: var(--surface-2);
    box-shadow: inset 0 0 0 1px var(--text-1);
}

.file-drop-zone.disabled {
    opacity: var(--disabled-opacity);
    cursor: not-allowed;
    border-color: var(--border-1);
    background-color: var(--surface-2);
}

/* Ensure drag-over style doesn't apply when disabled */
.file-drop-zone.disabled.drag-over {
    border-style: dashed;
    border-color: var(--border-1);
    background-color: var(--surface-2);
    box-shadow: none;
}

/* The trigger: an outlined pill (the page keeps its one solid primary CTA elsewhere). */
.file-input-label {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-5);
    background-color: var(--surface-0);
    color: var(--text-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
        background-color var(--t-out) var(--ease-out),
        border-color var(--t-out) var(--ease-out),
        box-shadow var(--t-out) var(--ease-out),
        transform var(--dur-base) var(--ease-out);
}

.file-input-icon {
    width: 1.125rem;
    height: 1.125rem;
    flex: none;
    transition: transform var(--dur-base) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .file-input-label:hover:not(:disabled) {
        background-color: var(--surface-2);
        border-color: var(--text-2);
        transition-duration: var(--t-in);
    }
    .file-input-label:hover:not(:disabled) .file-input-icon {
        transform: translateY(-2px);
    }
}

.file-input-label:active:not(:disabled) {
    background-color: var(--surface-3);
    transform: scale(0.97);
    transition-duration: 60ms;
}

.file-input-label:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.file-input-label:disabled {
    cursor: not-allowed;
    opacity: var(--disabled-opacity);
}

.file-input-label[aria-busy='true'] {
    cursor: progress;
}

.drop-zone-label {
    font-size: var(--fs-sm);
    color: var(--text-2);
}

.file-drop-zone.disabled .drop-zone-label {
    color: var(--text-3);
}

.visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
}

@media (forced-colors: active) {
    .file-drop-zone {
        border-color: CanvasText;
    }
    .file-drop-zone.drag-over {
        border-color: Highlight;
    }
    .file-input-label {
        border-color: ButtonText;
    }
    .file-input-label:focus-visible {
        outline: 2px solid CanvasText;
        outline-offset: 2px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .file-input-label:active,
    .file-input-label:hover .file-input-icon {
        transform: none;
    }
}
</style>

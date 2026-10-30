<script lang="ts">
  import { onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { t } from '$lib/i18n/dashboard-translations';

  // Define the ImageFile interface
  interface ImageFile {
    file: File;
    preview: string;
  }

  // Props
  export let selectedImage: string | null = null; // URL or base64 string from the store
  export let canReveal = true;
  export let onChange: (value: string | null) => void = () => {};

  // Local state
  let image: ImageFile | null = null;
  let isDragging = false;
  let fileInput: HTMLInputElement;

  // Create a writable store for the image data
  const imageData = writable<string | null>(null);

  // Subscribe to changes in the store and call the onChange handler
  const unsubscribe = imageData.subscribe(value => {
    if (onChange) onChange(value);
  });

  // Allowed image MIME types
  const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

  // Event handlers
  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      isDragging = true;
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
    const file = e.dataTransfer?.files[0];
    if (file) handleFile(file);
  }

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
      handleFile(target.files[0]);
    }
  }

  function handleFile(file: File) {
    if (allowedImageTypes.includes(file.type)) {
      // If there's an existing image, revoke its object URL
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }

      // Create preview
      const preview = URL.createObjectURL(file);
      image = { file, preview };

      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        imageData.set(base64);
      };
      reader.readAsDataURL(file);
    } else {
      alert(`${$t['image.unsupportedFileType']}: ${file.type}. Please select a PNG, JPEG, JPG, GIF, or WebP image.`);
      // Optionally reset the file input to allow re-selection
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  function removeImage() {
    if (image?.preview && !image.preview.startsWith('https')) {
      URL.revokeObjectURL(image.preview);
    }
    image = null;
    imageData.set(null);
  }

  function handleButtonClick() {
    if (fileInput) {
      fileInput.click();
    }
  }

  $: {
    if (selectedImage) {
      image = {
        file: new File([], "stored-image"),
        preview: selectedImage
      };
    }
  }

  // Cleanup
  onDestroy(() => {
    if (image?.preview && !image.preview.startsWith('data:') && !image.preview.startsWith('http')) {
      URL.revokeObjectURL(image.preview);
    }
    unsubscribe();
  });
</script>

<div class="image-uploader" class:hidden={!canReveal}>
  {#if !image}
    <div
      class="dropzone"
      class:dragging={isDragging}
      on:dragenter={handleDragEnter}
      on:dragleave={handleDragLeave}
      on:dragover={handleDragOver}
      on:drop={handleDrop}
      on:click={handleButtonClick}
      role="presentation"
    >
      <input
        type="file"
        bind:this={fileInput}
        on:change={handleFileChange}
        accept={allowedImageTypes.join(', ')}
        class="hidden"
      />
      <div class="content">
        <div class="icon">
          {#if isDragging}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="image-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          {/if}
        </div>
        <p class="title">
          {isDragging ? $t['image.dropImageHere'] : $t['image.dragAndDropImageHere']}
        </p>
        <p class="subtitle">{$t['image.orClickToBrowse']}</p>
        <button
          type="button"
          class="select-button"
          on:click|stopPropagation={handleButtonClick}
        >
          {$t['image.selectImage']}
        </button>
      </div>
    </div>
  {:else}
    <div class="preview">
      <div class="image-container">
        <img src={image.preview} alt="Preview" />
        <button
          type="button"
          class="remove-button"
          on:click={removeImage}
          aria-label={$t['image.removeImage']}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      {#if image.file.name !== "stored-image"}
        <p class="filename">{image.file.name}</p>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .image-uploader {
    width: 100%;
    max-width: 36rem;
    margin: 0 auto;
    padding: var(--space-5) 0;
    font-family: var(--font-body);

    &.hidden {
      display: none;
    }
  }

  /* Drop zone: dashed thin edge at rest, solid ink edge while a file is over it. */
  .dropzone {
    border: 1px dashed var(--border-2);
    border-radius: var(--radius-xl);
    padding: var(--space-6) var(--space-4);
    background-color: var(--surface-1);
    text-align: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: var(--text-2);
        background-color: var(--surface-2);
        transition-duration: var(--t-in);

        .icon {
          transform: translateY(-3px);
        }
      }
    }

    &:has(.select-button:focus-visible) {
      border-color: var(--text-1);
    }

    &.dragging {
      border-style: solid;
      border-color: var(--text-1);
      background-color: var(--surface-2);
      box-shadow: inset 0 0 0 1px var(--text-1);
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon {
        margin-bottom: var(--space-4);
        transition: transform var(--dur-base) var(--ease-out);

        .upload-icon {
          color: var(--text-1);
        }

        .image-icon {
          color: var(--text-3);
        }
      }

      .title {
        margin: 0 0 var(--space-2);
        font-size: var(--fs-lg);
        font-weight: var(--fw-medium);
        color: var(--text-1);
      }

      .subtitle {
        margin: 0 0 var(--space-4);
        font-size: var(--fs-sm);
        color: var(--text-2);
      }

      /* Outlined pill; the page keeps its one solid primary CTA elsewhere. */
      .select-button {
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
        transition:
          background-color var(--t-out) var(--ease-out),
          border-color var(--t-out) var(--ease-out),
          box-shadow var(--t-out) var(--ease-out),
          transform var(--dur-base) var(--ease-out);

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: var(--surface-0);
            border-color: var(--text-1);
            transition-duration: var(--t-in);
          }
        }

        &:active {
          background-color: var(--surface-3);
          transform: scale(0.97);
          transition-duration: 60ms;
        }

        &:focus-visible {
          outline: none;
          box-shadow: var(--focus-ring);
        }
      }
    }
  }

  .hidden {
    display: none;
  }

  .preview {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);

    .image-container {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border-1);

      img {
        display: block;
        width: 100%;
        height: 16rem;
        object-fit: contain;
        background-color: var(--surface-1);
      }

      .remove-button {
        position: absolute;
        top: var(--space-2);
        right: var(--space-2);
        display: inline-grid;
        place-items: center;
        width: var(--control-h);
        height: var(--control-h);
        padding: 0;
        background-color: var(--surface-glass);
        backdrop-filter: blur(12px) saturate(1.2);
        -webkit-backdrop-filter: blur(12px) saturate(1.2);
        color: var(--text-1);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-1);
        cursor: pointer;
        transition:
          background-color var(--t-out) var(--ease-out),
          color var(--t-out) var(--ease-out),
          box-shadow var(--t-out) var(--ease-out),
          transform var(--dur-base) var(--ease-out);

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: var(--danger-soft);
            color: var(--danger);
            transition-duration: var(--t-in);
          }
        }

        &:active {
          transform: scale(0.94);
          transition-duration: 60ms;
        }

        &:focus-visible {
          outline: none;
          box-shadow: var(--focus-ring);
        }
      }
    }

    .filename {
      margin: 0;
      font-size: var(--fs-sm);
      color: var(--text-2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (forced-colors: active) {
    .dropzone {
      border-color: CanvasText;
    }
    .dropzone.dragging {
      border-color: Highlight;
    }
    .select-button,
    .remove-button {
      border-color: ButtonText;
    }
    .select-button:focus-visible,
    .remove-button:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dropzone .content .icon,
    .select-button:active,
    .remove-button:active {
      transform: none;
    }
  }
</style>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

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
      alert(`Unsupported file type: ${file.type}. Please select a PNG, JPEG, JPG, GIF, or WebP image.`);
      // Optionally reset the file input to allow re-selection
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  function removeImage() {
    if (image?.preview) {
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

  // Initialize from prop if provided
  onMount(() => {
    if (selectedImage) {
      // If we have a URL or base64 string from the store, display it
      image = {
        file: new File([], "stored-image"), // Placeholder file object
        preview: selectedImage
      };
      imageData.set(selectedImage);
    }
  });

  // Cleanup
  onDestroy(() => {
    if (image?.preview && !image.preview.startsWith('data:')) {
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
          {isDragging ? 'Drop image here' : 'Drag & drop image here'}
        </p>
        <p class="subtitle">or click to browse</p>
        <button
          type="button"
          class="select-button"
          on:click|stopPropagation={handleButtonClick}
        >
          Select Image
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
          aria-label="Remove image"
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
    padding: 1.5rem;

    &.hidden {
      display: none;
    }
  }

  .dropzone {
    border: 2px dashed var(--color-border, #ccc);
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--color-primary, #4f46e5);
      background-color: rgba(79, 70, 229, 0.05);
    }

    &.dragging {
      border-color: var(--color-primary, #4f46e5);
      background-color: rgba(79, 70, 229, 0.1);
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon {
        margin-bottom: 1rem;

        .upload-icon {
          color: var(--color-primary, #4f46e5);
        }

        .image-icon {
          color: var(--color-text-muted, #6b7280);
        }
      }

      .title {
        margin-bottom: 0.5rem;
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--color-text, #111827);
      }

      .subtitle {
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: var(--color-text-muted, #6b7280);
      }

      .select-button {
        padding: 0.5rem 1rem;
        background-color: var(--color-primary, #4f46e5);
        color: white;
        border: none;
        border-radius: 0.375rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: var(--color-primary-dark, #4338ca);
        }

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);
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
    gap: 1rem;

    .image-container {
      position: relative;
      border-radius: 0.5rem;
      overflow: hidden;
      border: 1px solid var(--color-border, #e5e7eb);

      img {
        width: 100%;
        height: 16rem;
        object-fit: contain;
        background-color: var(--color-bg-subtle, #f9fafb);
      }

      .remove-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.5rem 0.5rem 0.3rem;
        background-color: white;
        border: none;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: var(--color-bg-subtle, #f9fafb);
        }
      }
    }

    .filename {
      font-size: 0.875rem;
      color: var(--color-text-muted, #6b7280);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
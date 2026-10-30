<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props
    extends Omit<HTMLInputAttributes, 'type' | 'accept' | 'multiple' | 'files' | 'id' | 'class' | 'value'> {
    label: string;
    /** Allowed types, as for the native accept attribute, e.g. 'image/png,image/jpeg,image/svg+xml'. */
    accept?: string;
    maxSizeMb?: number;
    /** Smallest image size in pixels. Checked for raster images only. */
    minWidth?: number;
    minHeight?: number;
    /** Format, size and shape rules, e.g. "PNG, JPG or SVG. Up to 2 MB. At least 400 x 400 px, square works best." */
    requirements?: string;
    /** Where the file shows up, e.g. "Appears at the top of every email and on your blog." */
    usage?: string;
    multiple?: boolean;
    files?: FileList | null;
    /** URL of the current image, shown until a new file is chosen. */
    previewUrl?: string | null;
    previewAlt?: string;
    /** Message from the parent, e.g. an upload that failed on the server. */
    error?: string;
    required?: boolean;
    optional?: boolean;
    optionalText?: string;
    disabled?: boolean;
    id?: string;
    class?: string;
    chooseText?: string;
    dropText?: string;
    replaceText?: string;
    removeText?: string;
    onfiles?: (files: File[]) => void;
    onremove?: () => void;
  }

  let {
    label,
    accept = '',
    maxSizeMb,
    minWidth,
    minHeight,
    requirements,
    usage,
    multiple = false,
    files = $bindable(null),
    previewUrl = null,
    previewAlt = '',
    error,
    required = false,
    optional = false,
    optionalText = 'Optional',
    disabled = false,
    id,
    class: className = '',
    chooseText = 'Choose a file',
    dropText = 'or drag it here',
    replaceText = 'Choose a different file',
    removeText = 'Remove',
    onfiles,
    onremove,
    'aria-describedby': extraDescribedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const controlId = $derived(id ?? `file-${uid}`);
  const labelId = $derived(`${controlId}-label`);
  const reqId = $derived(`${controlId}-requirements`);
  const usageId = $derived(`${controlId}-usage`);
  const errorId = $derived(`${controlId}-error`);

  let input: HTMLInputElement | undefined = $state();
  let dragging = $state(false);
  let localError = $state('');
  let localPreview = $state<string | null>(null);

  const shownError = $derived(localError || error || '');
  const chosen = $derived(files ? Array.from(files) : []);
  const preview = $derived(localPreview ?? (chosen.length ? null : previewUrl));
  const hasContent = $derived(chosen.length > 0 || !!previewUrl);
  const describedBy = $derived(
    [requirements ? reqId : '', usage ? usageId : '', shownError ? errorId : '', extraDescribedBy ?? '']
      .filter(Boolean)
      .join(' ') || undefined
  );

  const TYPE_NAMES: Record<string, string> = {
    'image/png': 'PNG',
    'image/jpeg': 'JPG',
    'image/jpg': 'JPG',
    'image/svg+xml': 'SVG',
    'image/webp': 'WebP',
    'image/gif': 'GIF',
    'application/pdf': 'PDF',
    'text/csv': 'CSV'
  };

  function acceptTokens(): string[] {
    return accept
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
  }

  function typeList(): string {
    const names = [
      ...new Set(
        acceptTokens().map((t) =>
          t.startsWith('.') ? t.slice(1).toUpperCase() : (TYPE_NAMES[t] ?? t.replace('/*', ' files'))
        )
      )
    ];
    if (names.length <= 1) return names[0] ?? '';
    return `${names.slice(0, -1).join(', ')} or ${names[names.length - 1]}`;
  }

  function typeAllowed(file: File): boolean {
    const tokens = acceptTokens();
    if (!tokens.length) return true;
    const name = file.name.toLowerCase();
    const mime = file.type.toLowerCase();
    return tokens.some((t) => {
      if (t.startsWith('.')) return name.endsWith(t);
      if (t.endsWith('/*')) return mime.startsWith(t.slice(0, -1));
      return mime === t;
    });
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    const mb = bytes / (1024 * 1024);
    return `${mb >= 10 ? Math.round(mb) : Number(mb.toFixed(1))} MB`;
  }

  function readDimensions(file: File): Promise<{ w: number; h: number } | null> {
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return Promise.resolve(null);
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        resolve({ w: img.naturalWidth, h: img.naturalHeight });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        resolve(null);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });
  }

  async function validate(list: File[]): Promise<string> {
    for (const file of list) {
      if (!typeAllowed(file)) {
        const types = typeList();
        return types
          ? `This file type is not supported. Choose a ${types} file.`
          : 'This file type is not supported.';
      }
      if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024) {
        return `This file is ${formatSize(file.size)}. The limit is ${maxSizeMb} MB.`;
      }
      if (minWidth || minHeight) {
        const dims = await readDimensions(file);
        if (dims && (dims.w < (minWidth ?? 0) || dims.h < (minHeight ?? 0))) {
          return `This image is ${dims.w} x ${dims.h} px. It needs to be at least ${minWidth ?? dims.w} x ${minHeight ?? dims.h} px.`;
        }
      }
    }
    return '';
  }

  function clearInput() {
    if (input) input.value = '';
    files = null;
  }

  async function takeFiles(list: FileList | null) {
    const arr = list ? Array.from(list) : [];
    if (!arr.length) return;
    const picked = multiple ? arr : arr.slice(0, 1);
    const problem = await validate(picked);
    if (problem) {
      localError = problem;
      clearInput();
      return;
    }
    localError = '';
    if (input && list !== input.files) {
      const dt = new DataTransfer();
      picked.forEach((f) => dt.items.add(f));
      input.files = dt.files;
    }
    files = input?.files ?? list;
    onfiles?.(picked);
  }

  function handleChange(e: Event & { currentTarget: HTMLInputElement }) {
    takeFiles(e.currentTarget.files);
  }

  function handleDragOver(e: DragEvent) {
    if (disabled) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    dragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    const next = e.relatedTarget as Node | null;
    if (!next || !(e.currentTarget as HTMLElement).contains(next)) dragging = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragging = false;
    if (disabled) return;
    takeFiles(e.dataTransfer?.files ?? null);
  }

  function remove() {
    clearInput();
    localError = '';
    onremove?.();
    input?.focus();
  }

  // Preview for a newly chosen image. The object URL is released when it changes.
  $effect(() => {
    const first = chosen[0];
    if (!first || !first.type.startsWith('image/')) {
      localPreview = null;
      return;
    }
    const url = URL.createObjectURL(first);
    localPreview = url;
    return () => URL.revokeObjectURL(url);
  });
</script>

<div class="upload {className}" class:upload--disabled={disabled} class:upload--invalid={!!shownError}>
  <div class="upload__header">
    <span id={labelId} class="upload__label">
      {label}
      {#if required}<span class="upload__required" aria-hidden="true">*</span>{/if}
      {#if optional && !required}<span class="upload__optional">{optionalText}</span>{/if}
    </span>
    {#if requirements}<p id={reqId} class="upload__hint">{requirements}</p>{/if}
    {#if usage}<p id={usageId} class="upload__hint">{usage}</p>{/if}
  </div>

  <input
    {...rest}
    bind:this={input}
    id={controlId}
    type="file"
    class="upload__input sr-only"
    {accept}
    {multiple}
    {disabled}
    {required}
    aria-labelledby={labelId}
    aria-describedby={describedBy}
    aria-invalid={shownError ? true : undefined}
    onchange={handleChange}
  />
  <label
    for={controlId}
    class="upload__zone"
    class:upload__zone--dragging={dragging}
    class:upload__zone--filled={hasContent}
    ondragenter={handleDragOver}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
  >
    {#if preview}
      <img class="upload__preview" src={preview} alt={previewAlt} />
    {:else}
      <svg class="upload__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {/if}
    <span class="upload__cta">
      <span class="upload__choose">{hasContent ? replaceText : chooseText}</span>
      <span class="upload__drop">{dropText}</span>
    </span>
  </label>

  {#if chosen.length}
    <ul class="upload__files">
      {#each chosen as file (file.name + file.size)}
        <li class="upload__file">
          <span class="upload__file-name">{file.name}</span>
          <span class="upload__file-size">{formatSize(file.size)}</span>
        </li>
      {/each}
    </ul>
  {/if}

  {#if hasContent && !disabled}
    <div class="upload__actions">
      <button type="button" class="upload__remove" onclick={remove}>{removeText}</button>
    </div>
  {/if}

  <div class="upload__error-region" aria-live="polite">
    {#if shownError}
      <p id={errorId} class="upload__error">{shownError}</p>
    {/if}
  </div>
</div>

<style lang="scss">
  .upload {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
    font-family: var(--font-body);
  }

  .upload__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .upload__label {
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-2);
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .upload__required {
    color: var(--danger);
    font-weight: var(--fw-semibold);
  }

  .upload__optional {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-regular);
  }

  .upload__hint {
    margin: 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
  }

  .upload__zone {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    min-height: calc(var(--control-h) * 2);
    padding: var(--space-4) var(--space-5);
    background: var(--surface-1);
    border: 1px dashed var(--border-2);
    border-radius: var(--radius-lg);
    color: var(--text-2);
    cursor: pointer;
    transition:
      background-color var(--dur-fast) var(--ease-out),
      border-color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);

    &:hover {
      border-color: var(--text-3);
      background: var(--surface-2);
    }

    &--dragging,
    &--dragging:hover {
      border-style: solid;
      border-color: var(--accent);
      background: var(--accent-soft);
    }
  }

  .upload__input:focus-visible + .upload__zone {
    border-style: solid;
    border-color: var(--accent);
    box-shadow: var(--focus-ring);
  }

  .upload--invalid .upload__zone {
    border-color: var(--danger);
  }

  .upload__icon {
    flex: none;
    width: var(--space-6);
    height: var(--space-6);
    color: var(--text-3);
  }

  .upload__preview {
    flex: none;
    width: var(--space-8);
    height: var(--space-8);
    object-fit: contain;
    background: var(--surface-2);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-md);
  }

  .upload__cta {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .upload__choose {
    color: var(--text-link);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  .upload__drop {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }

  .upload__files {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .upload__file {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    min-width: 0;
    font-size: var(--fs-sm);
  }

  .upload__file-name {
    overflow: hidden;
    color: var(--text-1);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .upload__file-size {
    flex: none;
    color: var(--text-3);
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
  }

  .upload__actions {
    display: flex;
  }

  .upload__remove {
    min-height: var(--space-5);
    padding: var(--space-1) var(--space-2);
    margin-left: calc(-1 * var(--space-2));
    background: transparent;
    border: 0;
    border-radius: var(--radius-sm);
    color: var(--danger);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition: background-color var(--dur-fast) var(--ease-out);

    &:hover {
      background: var(--danger-soft);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }

  .upload__error-region:not(:has(.upload__error)) {
    margin-top: calc(-1 * var(--space-2));
  }

  .upload__error {
    margin: 0;
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }

  .upload--disabled {
    .upload__zone {
      background: var(--surface-2);
      border-color: var(--border-1);
      cursor: not-allowed;
    }

    .upload__choose,
    .upload__icon {
      color: var(--text-3);
    }
  }
</style>

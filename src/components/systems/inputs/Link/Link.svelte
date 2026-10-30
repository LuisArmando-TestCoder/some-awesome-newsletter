<script context="module" lang="ts">
  let linkCount = 0;

  // Adds https:// when the scheme is missing. Empty stays empty.
  function normalizeUrl(raw: string | undefined | null): string {
    const trimmed = (raw ?? "").trim();
    if (trimmed === "") return "";
    if (trimmed === "https:/") return "https://";
    if (!/^https?:\/\//i.test(trimmed)) return "https://" + trimmed;
    return trimmed;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { isValidURL } from "./isValidLink";
  import { t } from "$lib/i18n/dashboard-translations";

  // Props for the URL input.
  export let value: string = "";
  export let placeholder: string = $t['link.enterYourUrl'];
  export let label: string = "";
  export let center: boolean = false;

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};
  export let onEnter: (isValid: boolean) => void = () => {};

  // Optional props
  export let hint: string | undefined = undefined;
  /** Error from the parent. Shown instead of the built-in format message. */
  export let error: string | undefined = undefined;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let autocomplete: HTMLInputAttributes["autocomplete"] = "url";
  export let id: string | undefined = undefined;

  // Create a writable store for the URL input value.
  export const urlStore = writable(value);

  const uid = `link-${++linkCount}`;
  $: inputId = id || uid;
  $: hintId = `${inputId}-hint`;
  $: errorId = `${inputId}-error`;

  // Track validation state.
  let valid = false;
  // Errors only show after blur or Enter, never while typing.
  let touched = false;
  let editing = false;

  $: formatError = !valid && !!text ? $t['link.pleaseEnterAValidUrl'] : "";
  $: visibleError = editing ? "" : error || (touched ? formatError : "");
  $: describedBy = [hint ? hintId : "", visibleError ? errorId : ""].filter(Boolean).join(" ") || undefined;
  $: accessibleName = label ? undefined : placeholder || undefined;

  // What the person sees and types. `value` always holds the normalized URL,
  // so parents that bind or feed `value` back get the same data as before.
  let text: string = value ?? "";
  let lastValue: string = value;
  $: if (value !== lastValue) {
    lastValue = value;
    if (normalizeUrl(text) !== (value ?? "")) text = value ?? "";
  }

  // Validate and report the normalized URL, without rewriting what the person types.
  function evaluate(raw: string) {
    const normalized = normalizeUrl(raw);
    // Consider an empty string as valid.
    valid = normalized === "" || isValidURL(normalized);
    value = normalized;
    lastValue = normalized;
    urlStore.set(normalized);
    onChange(normalized);
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    text = target.value;
    editing = true;
    evaluate(text);
  }

  // On blur or Enter the field shows the normalized URL.
  function commit() {
    const normalized = normalizeUrl(text);
    if (normalized !== text) text = normalized;
    if (normalized !== value) evaluate(text);
    editing = false;
    touched = true;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      commit();
      onEnter(valid);
    }
  }

  onMount(() => {
    // Initialize the store and the displayed value with the normalized initial value.
    text = normalizeUrl(value);
    evaluate(text);
  });
</script>

<div class="url-input-wrapper">
  {#if label}
    <label class="input-label" for={inputId}>
      {label}
      {#if required}<span class="required-mark" aria-hidden="true">*</span>{/if}
    </label>
  {:else if text && placeholder}
    <span class="input-label" aria-hidden="true">{placeholder}</span>
  {/if}
  {#if hint}
    <p class="input-hint" id={hintId}>{hint}</p>
  {/if}
  <input
    id={inputId}
    type="url"
    inputmode="url"
    value={text}
    {placeholder}
    on:input={handleInput}
    on:input
    on:focus
    on:blur={commit}
    on:blur
    on:keydown={handleKeyDown}
    on:keydown
    aria-label={accessibleName}
    aria-describedby={describedBy}
    aria-invalid={visibleError ? "true" : undefined}
    class:invalid={!!visibleError}
    class:center
    {autocomplete}
    {disabled}
    {required}
  />
  {#if visibleError}
    <p class="error-message" id={errorId}><svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span>{visibleError}</span></p>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/centralized-styles.scss";
  @include centralized-styles.label-extras;

  .url-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    &.center {
      text-align: center;
    }
  }

  /* Mono micro states on top of the shared field styles (tokens only). */
  input {
    caret-color: var(--text-1);
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
  }

  /* Empty sits on the quiet surface, filled and focused on paper. */
  input:not(:placeholder-shown),
  input:focus {
    background: var(--surface-0);
  }

  /* The shared hover applies on touch too; keep it to fine pointers. */
  @media (hover: none), (pointer: coarse) {
    input:hover:not(:disabled):not(:focus) {
      border-color: var(--border-2);
    }
  }

  input:focus {
    border-color: var(--text-1);
  }


  input:disabled {
    color: var(--text-2);
    opacity: var(--disabled-opacity);
  }

  input.invalid,
  input.invalid:focus,
  input:user-invalid {
    border-color: var(--danger);
  }

  /* Browser autofill: keep our ink and a calm tint instead of the default yellow or blue. */
  input:-webkit-autofill {
    -webkit-text-fill-color: var(--text-1);
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
    transition: background-color 600000s 0s;
  }
  input:-webkit-autofill:focus {
    box-shadow: var(--focus-ring), inset 0 0 0 100vmax var(--surface-2);
  }
  input:autofill {
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
  }

  .error-message {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .error-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }

  @media (forced-colors: active) {
    input {
      border-color: FieldText;
    }
    input:focus {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .error-message {
      color: CanvasText;
    }
  }
</style>

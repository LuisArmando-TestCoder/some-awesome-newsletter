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
    <p class="error-message" id={errorId}>{visibleError}</p>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/centralized-styles.scss";

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
</style>

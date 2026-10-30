<script lang="ts">
  import { writable } from "svelte/store";
  import { onMount, onDestroy } from "svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import { browser } from "$app/environment";

  // --- Props ---
  export let length: number = 6;
  export let onChange: (newCode: string) => void = () => {};

  // --- Store ---
  export const authCode = writable("");

  // --- State ---
  let isMobile = false;
  let inputRefs: HTMLInputElement[] = [];
  
  // We keep 'digits' reactive to the store so data persists when switching views
  let digits: string[] = Array(length).fill("");

  // Sync local digits array whenever the store changes (e.g. from mobile input)
  $: {
    const chars = $authCode.split("");
    digits = Array(length).fill("").map((_, i) => chars[i] || "");
  }

  // --- Lifecycle: Responsive Detection ---
  let mediaQuery: MediaQueryList;

  function handleResize(e: MediaQueryListEvent | MediaQueryList) {
    isMobile = e.matches;
  }

  onMount(() => {
    if (browser) {
      // Breakpoint: 600px is a standard boundary for "squished" mobile layouts
      mediaQuery = window.matchMedia("(max-width: 600px)");
      
      // Set initial state
      handleResize(mediaQuery);
      
      // Listen for changes
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleResize);
      } else {
        // Fallback for older Safari
        mediaQuery.addListener(handleResize);
      }
    }
  });

  onDestroy(() => {
    if (browser && mediaQuery) {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleResize);
      } else {
        mediaQuery.removeListener(handleResize);
      }
    }
  });

  // --- Desktop Logic (Multi-Input) ---
  function registerInput(node: HTMLInputElement, index: number) {
    inputRefs[index] = node;
    return { update(newIndex: number) { inputRefs[newIndex] = node; } };
  }

  function handleDesktopPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData("text") ?? "";
    if (pasteData.trim().length === length && /^\d+$/.test(pasteData.trim())) {
      authCode.set(pasteData);
      onChange(pasteData);
      inputRefs[length - 1]?.focus();
    }
  }

  function handleDesktopInput(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (!/^\d?$/.test(value)) {
      target.value = ""; 
      return;
    }

    // Update store directly via helper to keep logic centralized
    const newDigits = [...digits];
    newDigits[index] = value;
    const newCode = newDigits.join("");
    
    authCode.set(newCode);

    if (value && index < length - 1) {
      inputRefs[index + 1]?.focus();
    }

    if (newCode.length === length) onChange(newCode);
    else if (newCode.length === 0) onChange("");
  }

  function handleDesktopKeyDown(index: number, event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (event.key === "Backspace" && !target.value && index > 0) {
      inputRefs[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault(); inputRefs[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault(); inputRefs[index + 1]?.focus();
    }
  }

  // --- Mobile Logic (Single Input) ---
  function handleMobileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    // Allow numbers only
    const cleanVal = target.value.replace(/[^0-9]/g, "").slice(0, length);
    
    // Force the input value to be clean (visual update)
    target.value = cleanVal;
    
    authCode.set(cleanVal);
    
    if (cleanVal.length === length) onChange(cleanVal);
    else onChange(""); // Reset if incomplete
  }
</script>

<div class="auth-wrapper" class:is-mobile={isMobile}>
  {#if isMobile}
    <div class="mobile-container">
      <input
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        class="single-input"
        placeholder="------"
        maxlength={length}
        value={$authCode}
        on:input={handleMobileInput}
        aria-label="{$t?.['code.enterAuthCode'] || 'Enter verification code'}"
      />
      <div class="input-backdrop"></div>
    </div>
  {:else}
    <div class="desktop-container">
      {#each Array(length) as _, index (index)}
        <input
          class="digit-input"
          class:filled={digits[index] !== ""}
          type="text"
          inputmode="numeric"
          maxlength="1"
          use:registerInput={index}
          value={digits[index]}
          on:paste={handleDesktopPaste}
          on:input={(e) => handleDesktopInput(index, e)}
          on:keydown={(e) => handleDesktopKeyDown(index, e)}
          autocomplete="off" 
          aria-label="{$t?.['code.authCodeDigit'] || 'Digit'} {index + 1}"
        />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  /* --- Local sizes (colors come from tokens only) --- */
  .auth-wrapper {
    --otp-height: 3.5rem;
    --otp-radius: var(--radius-md);

    width: 100%;
    display: flex;
    justify-content: center;
    margin: var(--space-6) 0;
  }

  /* --- Desktop Layout --- */
  .desktop-container {
    display: flex;
    gap: var(--space-3);
  }

  .digit-input {
    width: 3rem;
    height: var(--otp-height);
    text-align: center;
    font-family: var(--font-mono);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    color: var(--text-1);
    caret-color: var(--text-1);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--otp-radius);
    outline: none;
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);

    /* Hide spinners */
    -moz-appearance: textfield;
    appearance: textfield;
    &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:focus) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus {
      border-color: var(--text-1);
      background: var(--surface-0);
      box-shadow: var(--focus-ring);
      transform: translateY(-2px);
      z-index: 2;
    }

    /* Filled: paper surface and an ink edge, so progress reads without color. */
    &.filled {
      background-color: var(--surface-0);
      border-color: var(--text-1);
    }

    &:user-invalid {
      border-color: var(--danger);
    }
  }

  /* --- Mobile Layout --- */
  .mobile-container {
    position: relative;
    width: 100%;
    max-width: 320px; /* Limit width on tablets */
  }

  .single-input {
    box-sizing: border-box;
    width: 100%;
    height: var(--otp-height);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--otp-radius);
    padding: 0 var(--space-4);

    /* Typography Tricks for Spacing */
    font-family: var(--font-mono);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.75em; /* Spreads out digits */
    text-align: center;
    /* Adjust text-indent to center visually because letter-spacing adds space at end */
    text-indent: 0.75em;

    color: var(--text-1);
    caret-color: var(--text-1);
    outline: none;
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    &::placeholder {
      color: var(--text-3);
      letter-spacing: 0.75em;
    }

    &:not(:placeholder-shown) {
      background: var(--surface-0);
    }

    &:focus {
      border-color: var(--text-1);
      background: var(--surface-0);
      box-shadow: var(--focus-ring);
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: var(--text-1);
      box-shadow: inset 0 0 0 100vmax var(--surface-2);
      transition: background-color 600000s 0s;
    }
  }

  @media (forced-colors: active) {
    .digit-input,
    .single-input {
      border-color: FieldText;
    }
    .digit-input:focus,
    .single-input:focus {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .digit-input:focus {
      transform: none;
    }
  }
</style>

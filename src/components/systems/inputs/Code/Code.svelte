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
      {#each Array(length) as _, index}
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
  /* --- Tokens --- */
  :root {
    --otp-height: 3.5rem;
    --otp-radius: 12px;
    --otp-border: #e2e8f0;
    --otp-border-focus: #0f172a;
    --otp-bg: #ffffff;
    --otp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --otp-shadow-glow: 0 0 0 4px rgba(15, 23, 42, 0.1);
    --otp-anim: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .auth-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }

  /* --- Desktop Layout --- */
  .desktop-container {
    display: flex;
    gap: 0.75rem;
  }

  .digit-input {
    width: 3rem;
    height: var(--otp-height);
    text-align: center;
    font-family: 'Inter', monospace;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    background: var(--otp-bg);
    border: 1px solid var(--otp-border);
    border-radius: var(--otp-radius);
    box-shadow: var(--otp-shadow-sm);
    outline: none;
    transition: all 0.2s var(--otp-anim);
    
    /* Hide spinners */
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

    &:hover { border-color: #cbd5e1; }
    
    &:focus {
      border-color: var(--otp-border-focus);
      box-shadow: var(--otp-shadow-glow);
      transform: translateY(-2px);
      z-index: 2;
    }

    &.filled {
      background-color: #f8fafc;
      border-color: #94a3b8;
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
    background: var(--otp-bg);
    border: 1px solid var(--otp-border);
    border-radius: var(--otp-radius);
    padding: 0 1rem;
    
    /* Typography Tricks for Spacing */
    font-family: 'Inter', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.75em; /* Spreads out digits */
    text-align: center;
    /* Adjust text-indent to center visually because letter-spacing adds space at end */
    text-indent: 0.75em; 
    
    color: #1e293b;
    outline: none;
    box-shadow: var(--otp-shadow-sm);
    transition: all 0.2s var(--otp-anim);

    &::placeholder {
      color: #e2e8f0;
      letter-spacing: 0.75em;
    }

    &:focus {
      border-color: var(--otp-border-focus);
      box-shadow: var(--otp-shadow-glow);
    }
  }
</style>
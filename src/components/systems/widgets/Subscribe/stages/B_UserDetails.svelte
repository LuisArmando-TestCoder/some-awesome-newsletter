<script lang="ts">
  import { onMount } from "svelte";
  import store, { saveToStore, getFromStore } from "../../../../store.ts";
  import EmailInput from "../../../inputs/Email/Email.svelte";
  import PlainText from "../../../inputs/PlainText/PlainText.svelte";

  export let canReveal = false; // For step progression
  export let isStepComplete: boolean = false;

  let localEmail: string = "";
  let localName: string = "";

  // For prefilling from URL params if they exist
  let prefilledEmail: string = "";
  let prefilledName: string = "";

  onMount(() => {
    // Attempt to get prefilled values from store (saved from URL params by parent or an earlier stage)
    // These keys should match what Subscribe.svelte (parent) might save from query params.
    prefilledEmail = getFromStore("widgetPrefilledEmail") || "";
    prefilledName = getFromStore("widgetPrefilledName") || "";

    localEmail = prefilledEmail;
    localName = prefilledName;
    
    // Initial check for completion based on prefilled values
    checkCompletion();
  });

  function handleEmailChange(value: string) {
    localEmail = value;
    saveToStore({ widgetEmail: localEmail });
    checkCompletion();
  }

  function handleNameChange(value: string) {
    localName = value;
    saveToStore({ widgetName: localName });
    checkCompletion();
  }
  
  function checkCompletion() {
    // Basic validation: email should look like an email, name should not be empty.
    // EmailInput component has its own internal validation display.
    const isEmailValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail);
    isStepComplete = isEmailValidFormat && localEmail.trim() !== "" && localName.trim() !== "";
  }

  // Reactive statement to check completion whenever localEmail or localName changes
  $: {
    // This reactive block will run after onMount and whenever localEmail or localName changes.
    // However, direct calls to checkCompletion in handlers are more immediate.
    // This can serve as a fallback or for initial state if onMount doesn't cover all prefill scenarios.
    if (typeof localEmail !== 'undefined' && typeof localName !== 'undefined') { // Ensure vars are initialized
        checkCompletion();
    }
  }

</script>

<div class="step-user-details">
  <h3>Step 2: Your Details</h3>
  <div class="form-group">
    <EmailInput 
      bind:value={localEmail} 
      label="Email:" 
      placeholder="your@email.com" 
      onChange={handleEmailChange} 
    />
  </div>
  <div class="form-group">
    <PlainText 
      bind:value={localName} 
      label="Name:" 
      placeholder="Your Name" 
      type="text" 
      onChange={handleNameChange} 
    />
  </div>
</div>

<style>
  .step-user-details {
    /* Styles for this step */
  }
  .form-group {
    margin-bottom: 1rem;
  }
</style>

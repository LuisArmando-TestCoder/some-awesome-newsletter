<script lang="ts">
  import { onMount, getContext } from "svelte";
  import store, { getFromStore } from "../../../../store";
  import type { Store } from "../../../../types"; // Import Store from types.ts
  import type { Writable } from 'svelte/store';

  // Props for endpoint, if provided directly by the main Subscribe widget
  export let endpoint: string = "/public-subscribe"; // Default endpoint, can be overridden by parent

  // For step progression
  export let canReveal = false; 
  // This step is "complete" upon successful submission or if there's nothing to submit.
  // Parent will likely handle overall flow completion.
  export let isStepComplete: boolean = false; 

  let configuratorId: string | null = null;
  let selectedNewsSourceId: string = "";
  let email: string = "";
  let name: string = "";
  let language: string | undefined = undefined;
  let countryOfResidence: string | undefined = undefined;
  let bio: string | undefined = undefined;

  let isLoading: boolean = false;
  let errorMessage: string = "";
  let successMessage: string = "";
  
  // Attempt to get the shared endpoint from the parent Subscribe.svelte context if available
  // This allows the main Subscribe component to pass down its `endpoint` prop.
  const getParentEndpoint = getContext<(() => Writable<string>) | undefined>('getParentEndpoint');
  let parentEndpointStore: Writable<string> | undefined;

  onMount(() => {
    if (getParentEndpoint) {
        parentEndpointStore = getParentEndpoint();
        // If parent provides an endpoint, use it.
        // Subscribe to changes if it's a store, or use directly if it's a static value.
        if (parentEndpointStore && typeof parentEndpointStore.subscribe === 'function') {
            parentEndpointStore.subscribe(value => {
                if (value) endpoint = value;
            });
        }
    }

    configuratorId = getFromStore("widgetConfiguratorId");
    selectedNewsSourceId = getFromStore("widgetSelectedNewsSourceId") || ""; // Fallback for safety
    email = getFromStore("widgetEmail") || "";
    name = getFromStore("widgetName") || "";
    
    // Get prefilled optional data from store (originally from URL params)
    language = getFromStore("widgetPrefilledLanguage") || undefined;
    countryOfResidence = getFromStore("widgetPrefilledCountry") || undefined;
    bio = getFromStore("widgetPrefilledBio") || undefined;

    // This step is considered ready if essential data is present.
    // Actual "completion" in a step flow might mean successful submission.
    isStepComplete = !!(configuratorId && selectedNewsSourceId && email && name); 
  });

  async function handleSubmit() {
    if (!configuratorId || !selectedNewsSourceId || !email || !name) {
      errorMessage = "Missing required information to subscribe.";
      isStepComplete = false; // Mark as not complete if submission can't proceed
      return;
    }

    isLoading = true;
    errorMessage = "";
    successMessage = "";

    const payload = {
      configuratorId: configuratorId,
      newsSourceId: selectedNewsSourceId,
      email: email,
      name: name,
      language: language,
      countryOfResidence: countryOfResidence,
      bio: bio,
    };

    console.log("Submitting subscription with payload:", payload);

    try {
      const apiUrlBase = (getFromStore("apiURL") as () => string)(); // apiURL is a function in the store
      const fullEndpoint = `${apiUrlBase}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
      
      const response = await fetch(fullEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `Subscription failed with status: ${response.status}`);
      }

      successMessage = "Successfully subscribed!";
      isStepComplete = true; // Mark step as complete on success
      // Optionally clear form fields from store or emit event for parent to handle
    } catch (err: any) {
      console.error("Subscription error:", err);
      errorMessage = err.message || "An unexpected error occurred during subscription.";
      isStepComplete = false; // Mark as not complete on error
    } finally {
      isLoading = false;
    }
  }
  
  $: { // Recalculate readiness for submission if data changes
      isStepComplete = !!(configuratorId && selectedNewsSourceId && email && name && !isLoading && !successMessage);
  }

</script>

<div class="step-confirm-subscribe">
  <h3>Step 3: Confirm & Subscribe</h3>

  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
  {#if successMessage}
    <p class="success-message">{successMessage}</p>
  {/if}

  <div class="summary">
    <p><strong>Newsletter:</strong> {selectedNewsSourceId || "Not selected"}</p>
    <p><strong>Email:</strong> {email || "Not provided"}</p>
    <p><strong>Name:</strong> {name || "Not provided"}</p>
    {#if language}<p><strong>Language:</strong> {language}</p>{/if}
    {#if countryOfResidence}<p><strong>Country:</strong> {countryOfResidence}</p>{/if}
    {#if bio}<p><strong>Bio:</strong> {bio}</p>{/if}
  </div>

  <button type="button" on:click={handleSubmit} disabled={isLoading || !configuratorId || !selectedNewsSourceId || !email || !name || !!successMessage}>
    {isLoading ? "Subscribing..." : (successMessage ? "Subscribed!" : "Subscribe Now")}
  </button>
</div>

<style>
  .step-confirm-subscribe {
    /* Styles for this step */
  }
  .summary p {
    margin: 0.5em 0;
  }
  button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
  .error-message {
    color: red;
    margin-bottom: 1rem;
  }
  .success-message {
    color: green;
    margin-bottom: 1rem;
  }
</style>

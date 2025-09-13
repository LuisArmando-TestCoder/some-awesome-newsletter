<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { page } from "$app/stores";
  import store, { saveToStore, getFromStore } from "../../../store";
  import type { Store } from "../../../types"; // Corrected Store import
  import type { SvelteComponent } from "svelte";
  import { writable, get, type Writable } from 'svelte/store'; // Imported get

  import A_InitialParams from "./stages/A_InitialParams.svelte";
  import B_UserDetails from "./stages/B_UserDetails.svelte";
  import C_ConfirmAndSubscribe from "./stages/C_ConfirmAndSubscribe.svelte";

  // Props for endpoint, if provided directly
  export let endpoint: string = "/public-subscribe"; // Default endpoint
  const endpointStore = writable(endpoint);
  setContext('getParentEndpoint', () => endpointStore); // Provide endpoint to child contexts

  // Store prefilled optional data from URL to be accessed by C_ConfirmAndSubscribe
  onMount(() => {
    const urlParams = $page.url.searchParams;
    const prefilledLanguage = urlParams.get("language") || undefined;
    const prefilledCountry = urlParams.get("countryOfResidence") || undefined;
    const prefilledBio = urlParams.get("bio") || undefined;

    // Save these to the store using distinct keys for the widget
    if (prefilledLanguage) saveToStore({ widgetPrefilledLanguage: prefilledLanguage });
    if (prefilledCountry) saveToStore({ widgetPrefilledCountry: prefilledCountry });
    if (prefilledBio) saveToStore({ widgetPrefilledBio: prefilledBio });

    // Save prefilled email and name for B_UserDetails
    const pfEmail = urlParams.get("email") || "";
    const pfName = urlParams.get("name") || "";
    if (pfEmail) saveToStore({ widgetPrefilledEmail: pfEmail });
    if (pfName) saveToStore({ widgetPrefilledName: pfName });

    // Update endpointStore if prop changes after mount
    endpointStore.set(endpoint);
  });

  // Update endpointStore when the prop changes
  $: endpointStore.set(endpoint);

  // Step management
  let currentStepIndex = writable(0);
  // let componentInstances: any[] = []; // Not directly needed if binding to stepStates

  // Define steps and their conditions
  const steps: {
    component: any; // Using any for broader compatibility with svelte:component
    condition: (s: Store) => boolean;
    props?: Record<string, any>;
  }[] = [
    {
      component: A_InitialParams,
      condition: () => true, // Always show first step
    },
    {
      component: B_UserDetails,
      condition: (s: Store) => !!(s.widgetConfiguratorId && s.widgetSelectedNewsSourceId),
    },
    {
      component: C_ConfirmAndSubscribe,
      condition: (s: Store) =>
        !!(
          s.widgetConfiguratorId &&
          s.widgetSelectedNewsSourceId &&
          s.widgetEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.widgetEmail) && // Basic email format check
          s.widgetName && s.widgetName.trim() !== ""
        ),
      props: { endpoint: endpoint } // Pass endpoint to the final step directly as well
    },
  ];

  let activeStepComponent: typeof SvelteComponent = steps[0].component;
  let activeStepProps = steps[0].props || {};
  let stepStates = steps.map(() => writable(false)); // isStepComplete for each step

  // Subscribe to store changes to re-evaluate step conditions and current step
  store.subscribe(s => {
    let newStepIndex = 0;
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].condition(s)) {
        if (i === $currentStepIndex) { // If current step is still valid
             // Check if this step instance has reported completion
            if (get(stepStates[i])) {
                 if (i + 1 < steps.length && steps[i+1].condition(s)) {
                    newStepIndex = i + 1; // Try to move to next if current is complete and next is valid
                 } else {
                    newStepIndex = i; // Stay if current is complete but next is not yet valid
                 }
            } else {
                newStepIndex = i; // Stay if current step is not yet complete
            }
            break; 
        } else if (i > $currentStepIndex && get(stepStates[i-1])) { 
            // If we are looking past current step, and previous was complete
            newStepIndex = i;
            break;
        } else if (i < $currentStepIndex) {
            // Allow moving back if a previous step becomes valid again (e.g. data cleared)
            newStepIndex = i; // This logic might need refinement for complex backward navigation
        }
      } else {
        // If a condition for a step before current one fails, move back to it.
        if (i <= $currentStepIndex) {
            newStepIndex = i;
        }
        break; // Stop at the first step whose condition is not met
      }
    }
    
    // More robust way to find the furthest valid step
    let furthestValidStep = 0;
    for (let i = 0; i < steps.length; i++) {
        if (steps[i].condition(s)) {
            if (i === 0 || get(stepStates[i-1])) { // Check if previous step was completed
                 furthestValidStep = i;
            } else {
                break; // Previous step not complete, so can't advance
            }
        } else {
            break; // Condition for this step not met
        }
    }
    newStepIndex = furthestValidStep;


    if ($currentStepIndex !== newStepIndex) {
      currentStepIndex.set(newStepIndex);
    }
    activeStepComponent = steps[$currentStepIndex].component;
    activeStepProps = { ...(steps[$currentStepIndex].props || {}), canReveal: true };
  });
  
  function handleStepComplete(index: number, complete: boolean) {
    stepStates[index].set(complete);
    // Trigger re-evaluation of current step by briefly updating the main store
    // This is a bit of a hack; a more direct event system or derived store might be cleaner.
    store.update(s => ({...s})); 
  }

</script>

<div class="subscribe-widget-stepped">
  <h2>Subscribe to our Newsletter</h2>
  
  <div class="steps-container">
    {#each steps as step, i}&nbsp;
        <div 
            class="step-indicator" 
            class:active={$currentStepIndex === i}
            class:completed={get(stepStates[i]) && $currentStepIndex > i}
            class:accessible={step.condition($store) && (i === 0 || get(stepStates[i-1]))}
            on:click={() => {
                if (step.condition($store) && (i === 0 || get(stepStates[i-1]) || i < $currentStepIndex)) {
                    currentStepIndex.set(i);
                }
            }}
        >
            Step {i + 1}
        </div>
    {/each}
  </div>

  <div class="step-content">
    {#key $currentStepIndex}
        <svelte:component 
            this={steps[$currentStepIndex].component} 
            canReveal={true}
            {...(steps[$currentStepIndex].props || {})}
            bind:isStepComplete={stepStates[$currentStepIndex]}
            on:stepStatusChange={(e: { detail: { isComplete: boolean } }) => handleStepComplete($currentStepIndex, e.detail.isComplete)} 
            endpoint={steps[$currentStepIndex].component === C_ConfirmAndSubscribe ? endpoint : undefined}
        />
    {/key}
  </div>
</div>

<style>
  .subscribe-widget-stepped {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-family: sans-serif;
    background-color: #f9f9f9;
  }
  .subscribe-widget-stepped h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }
  .steps-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  .step-indicator {
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: default;
    color: #aaa;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  .step-indicator.accessible {
      cursor: pointer;
      color: #555;
  }
  .step-indicator.accessible:hover {
      background-color: #f0f0f0;
      border-color: #ddd;
  }
  .step-indicator.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
    cursor: default;
  }
  .step-indicator.completed {
    background-color: #28a745;
    color: white;
    border-color: #28a745;
  }
  .step-content {
    padding: 1rem;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
</style>

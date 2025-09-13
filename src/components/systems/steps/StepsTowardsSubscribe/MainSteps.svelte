<script lang="ts">
    import { onMount } from "svelte";
  import type { Store } from "../../../types";
  import A_Welcome from "./stages/A_Welcome.svelte";
  import B_Name from "./stages/B_Name.svelte"; // Import new Name step
  import C_Email from "./stages/B_Email.svelte"; // Keep old name, but it's step C now
  import E_Language from "./stages/C_Language.svelte"; // Keep old name, but it's step E now
  import F_Subscribed from "./stages/D_Subscribed.svelte"; // Keep old name, but it's step F now
  import StepsTowardsSubscribe from "./StepsTowardsSubscribe.svelte";
    // Removed unused imports: page, saveToStore

  const t = () => {
    return true;
  };

  const components = [
    [t, A_Welcome], // Step A: Always enabled
    [t, B_Name], // Step B: Always enabled after A
    [(store: Store) => store.subscriberName?.trim(), C_Email], // Step C: Enabled if name is entered
    [(store: Store) => store.subscriberEmail, E_Language], // Step D: Enabled if email is valid (Email component handles validation)
    [(store: Store) => store.subscriberLanguage, F_Subscribed] // Step E: Enabled if language is selected (and API call succeeded)
  ];
</script>

<StepsTowardsSubscribe {components} />

<script lang="ts">
    import { onMount } from "svelte";
  import type { Store } from "../../../types.ts";
  import A_Welcome from "./stages/A_Welcome.svelte";
  import B_Email from "./stages/B_Email.svelte";
  import C_Language from "./stages/C_Language.svelte";
  import D_Subscribed from "./stages/D_Subscribed.svelte";
  import StepsTowardsSubscribe from "./StepsTowardsSubscribe.svelte";
    import { page } from "$app/state";
    import { saveToStore } from "../../../store.ts";

  const t = () => {
    return true;
  };

  const components = [
    [t, A_Welcome],
    [t, B_Email],
    [(store: Store) => store.subscriberEmail, C_Language],
    [(store: Store) => store.subscriberLanguage, D_Subscribed]
  ];
</script>

<StepsTowardsSubscribe {components} />

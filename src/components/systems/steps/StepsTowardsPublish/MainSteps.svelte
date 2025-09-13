<script lang="ts">
  import type { Store } from "../../../types";
  import { saveToStore } from "../../../store";
  import A_Welcome1 from "./stages/A_Welcome1.svelte";
  import B_Welcome2 from "./stages/B_Welcome2.svelte";
  import C_Welcome3 from "./stages/C_Welcome3.svelte";
  import D_Lead from "./stages/D_Lead.svelte";
  import E_NewsSource from "./stages/E_NewsSource.svelte";
  import StepsTowardsPublish from "./StepsTowardsPublish.svelte";
  import Config from "./stages/H_Dashboard/Config/Config.svelte";
  import NewsSource from "./stages/H_Dashboard/NewsSource/NewsSource.svelte"; // Explicit default import
  import Users from "./stages/H_Dashboard/Users/Users.svelte"; // Corrected import (already was correct, maybe TS server lag?)
  import Reports from "./stages/H_Dashboard/Reports/Reports.svelte"; // Corrected import (already was correct, maybe TS server lag?)
  import Billing from "./stages/H_Dashboard/Billing/Billing.svelte"; // Corrected import (already was correct, maybe TS server lag?)
  import store from "../../../store";

  const t = () => {
    if (
      $store.authCode &&
      $store.stepsIndex > 3 &&
      $store.directionsThatShouldDisappear.length === 0
    ) {
        saveToStore({
          directionsThatShouldDisappear: [-1, 1],
        });
      } else if (
        $store.authCode &&
        $store.stepsIndex <= 3 &&
        $store.directionsThatShouldDisappear.length === 3
      ) {
        saveToStore({
          directionsThatShouldDisappear: [],
        });
      }

    return true;
  };

  const components = [
    [t, A_Welcome1],
    [t, B_Welcome2],
    [t, C_Welcome3],
    [t, D_Lead],
    [(store: Store) => store.lead, E_NewsSource],
    [(store: Store) => {
      return store.newsSource;
    }, Config],
    [(store: Store) => {
      return store.newsSource;
    }, NewsSource],
    [(store: Store) => {
      return store.newsSource;
    }, Users],
    [(store: Store) => {
      return store.newsSource;
    }, Billing],
    [(store: Store) => {
      return store.newsSource;
    }, Reports],
  ];
</script>

<StepsTowardsPublish {components} />

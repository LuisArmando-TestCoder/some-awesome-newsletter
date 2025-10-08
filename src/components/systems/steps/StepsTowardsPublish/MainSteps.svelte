<script lang="ts">
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
    import { isValidURL } from "../../inputs/Link/isValidLink";
    import Exports from "./stages/H_Dashboard/Exports/Exports.svelte";
    import Newspaper from "./stages/H_Dashboard/Newspaper/Newspaper.svelte";
    import Developer from "./stages/H_Dashboard/Developer/Developer.svelte";

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
    A_Welcome1,
    B_Welcome2,
    C_Welcome3,
    D_Lead,
    E_NewsSource,
    Config,
    NewsSource,
    Users,
    Billing,
    Reports,
    Exports,
    Newspaper,
    Developer
  ].map(v => [t, v]);
</script>

<StepsTowardsPublish {components} />

<!-- USED TO BE:
  const components = [
    [t, A_Welcome1],
    [t, B_Welcome2],
    [t, C_Welcome3],
    [t, D_Lead],
    [t, E_NewsSource],
    [(store: Store) => {
      return isValidURL(store.newsSource); // NON FETCH VALIDATIONS
    }, Config],
    [(store: Store) => {
      return isValidURL(store.newsSource);
    }, NewsSource],
    [(store: Store) => {
      return isValidURL(store.newsSource);
    }, Users],
    [(store: Store) => {
      return isValidURL(store.newsSource);
    }, Billing],
    [(store: Store) => {
      return isValidURL(store.newsSource);
    }, Reports],
    [(store: Store) => {
      return isValidURL(store.newsSource);
    }, Exports],
    [(store: Store) => {
      return isValidURL(store.newsSource);
    }, Newspaper],
    [(store: Store) => {
      return isValidURL(store.newsSource);
    }, Developer],
  ];
-->

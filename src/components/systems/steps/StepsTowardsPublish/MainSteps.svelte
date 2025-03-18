<script lang="ts">
  import type { Store } from "../../../types.ts";
  import theStoreWritable, { saveToStore } from "../../../store.ts";
  import askForNewAuthCode from "../../requests/askForNewAuthCode.ts";
  import A_Welcome1 from "./stages/A_Welcome1.svelte";
  import B_Welcome2 from "./stages/B_Welcome2.svelte";
  import C_Welcome3 from "./stages/C_Welcome3.svelte";
  import D_Lead from "./stages/D_Lead.svelte";
  import E_NewsSource from "./stages/E_NewsSource.svelte";
  import F_Email from "./stages/F_Email.svelte";
  import G_AuthCode from "./stages/G_AuthCode.svelte";
  import H_Dashboard from "./stages/H_Dashboard.svelte";
  import StepsTowardsPublish from "./StepsTowardsPublish.svelte";

  const t = () => true;

  const components = [
    [t, A_Welcome1],
    [t, B_Welcome2],
    [t, C_Welcome3],
    [t, D_Lead],
    [(store: Store) => store.lead, E_NewsSource],
    [(store: Store) => store.newsSource, F_Email],
    [
      (store: Store) => {
        if (
          store.configuratorEmail &&
          store.isComingFromValidStep &&
          !store.hasNewEmailCodeBeenSent
        ) {
          saveToStore({ hasNewEmailCodeBeenSent: true });
          askForNewAuthCode();
        }
        return store.configuratorEmail;
      },
      G_AuthCode,
    ],
    [
      (store: Store) => {
        if (store.isAuthCodeValid && store.isComingFromValidStep) {
          // saveToStore({ directionsThatShouldDisappear: [-1] });
          // Todo: Request everything
          console.log("hey");
        }

        return store.isAuthCodeValid;
      },
      H_Dashboard,
    ],
  ];
</script>

<StepsTowardsPublish {components} />

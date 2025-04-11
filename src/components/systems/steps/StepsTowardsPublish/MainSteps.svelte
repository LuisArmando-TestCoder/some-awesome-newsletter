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
  import H_Dashboard from "./stages/H_Dashboard/H_Dashboard.svelte";
  import StepsTowardsPublish from "./StepsTowardsPublish.svelte";
  import askIsAuthCodeValid from "../../requests/askIsAuthCodeValid.ts";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import Config from "./stages/H_Dashboard/Config/Config.svelte";
  import NewsSource from "./stages/H_Dashboard/NewsSource/NewsSource.svelte"; // Explicit default import
  import Users from "./stages/H_Dashboard/Users/Users.svelte"; // Corrected import (already was correct, maybe TS server lag?)
  import store from "../../../store.ts";

  const t = () => {
    if (
      $store.authCode &&
      $store.stepsIndex > 6 &&
      $store.directionsThatShouldDisappear.length === 0
    ) {
        saveToStore({
          directionsThatShouldDisappear: [-1, 1],
        });
      } else if (
        $store.authCode &&
        $store.stepsIndex <= 6 &&
        $store.directionsThatShouldDisappear.length === 2
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
    [(store: Store) => store.newsSource, F_Email],
    [
      (store: Store) => {
        if (
          store.configuratorEmail &&
          store.isComingFromValidStep &&
          !store.isAuthCodeValid
        ) {
          console.log("hey");
          saveToStore({ hasNewEmailCodeBeenSent: true });
          askForNewAuthCode();
        }
        return store.configuratorEmail;
      },
      G_AuthCode,
    ],
    [(store: Store) => {
      return store.isAuthCodeValid;
    }, Config],
    [(store: Store) => {
      return store.isAuthCodeValid;
    }, NewsSource],
    [(store: Store) => {
      return store.isAuthCodeValid;
    }, Users],
  ];

  onMount(() => {
    if (
      get(theStoreWritable).authCode &&
      !get(theStoreWritable).hasNewEmailCodeBeenSent
    ) {
      askIsAuthCodeValid();
    }
  });
</script>

<StepsTowardsPublish {components} />

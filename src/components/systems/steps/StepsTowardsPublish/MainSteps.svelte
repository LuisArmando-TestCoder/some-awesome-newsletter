<script lang="ts">
  import { saveToStore, stepsMapping } from "../../../store";
  import Step01_Frequency from "./stages/NewFlow/Step01_Frequency.svelte";
  import Step02_Language from "./stages/NewFlow/Step02_Language.svelte";
  import Step03_Redirect from "./stages/NewFlow/Step03_Redirect.svelte";
  import Step04_Topic from "./stages/NewFlow/Step04_Topic.svelte";
  import Step06_NewsWebsite from "./stages/NewFlow/Step06_NewsWebsite.svelte";
  import Step07_Selector from "./stages/NewFlow/Step07_Selector.svelte";
  import Step08_Generate from "./stages/NewFlow/Step08_Generate.svelte";
  import Step12_Share from "./stages/NewFlow/Step12_Share.svelte";
  import Step13_Plan from "./stages/NewFlow/Step13_Plan.svelte";
  import StepsTowardsPublish from "./StepsTowardsPublish.svelte";
  import Config from "./stages/H_Dashboard/Config/Config.svelte";
  import NewsSource from "./stages/H_Dashboard/NewsSource/NewsSource.svelte";
  import Users from "./stages/H_Dashboard/Users/Users.svelte";
  import Reports from "./stages/H_Dashboard/Reports/Reports.svelte";
  import Billing from "./stages/H_Dashboard/Billing/Billing.svelte";
  import store from "../../../store";
  import type { Store } from "../../../types";
  import { isValidURL } from "../../inputs/Link/isValidLink";
  import Exports from "./stages/H_Dashboard/Exports/Exports.svelte";
  import Newspaper from "./stages/H_Dashboard/Newspaper/Newspaper.svelte";
  import Developer from "./stages/H_Dashboard/Developer/Developer.svelte";
  import { onMount } from "svelte";
  import { resetStepsStore } from "./stages/NewFlow/stepsStore";

  onMount(() => {
    resetStepsStore();
  });

  const t = () => {
    if (
      $store.authCode &&
      $store.stepsIndex > stepsMapping["Profile"] &&
      $store.directionsThatShouldDisappear.length === 0
    ) {
        // Prevent infinite loop by checking current state
        if (JSON.stringify($store.directionsThatShouldDisappear) !== JSON.stringify([-1, 1])) {
           saveToStore({
             directionsThatShouldDisappear: [-1, 1],
           });
        }
      } else if (
        $store.authCode &&
        $store.stepsIndex <= stepsMapping["Profile"] &&
        $store.directionsThatShouldDisappear.length !== 0
      ) {
        // Reset if we went back to steps <= stepsMapping["Profile"]
        saveToStore({
          directionsThatShouldDisappear: [],
        });
      }

    return true;
  };

  const components = [
    [(s: Store) => { t(); return true; }, Step01_Frequency],
    [(s: Store) => { t(); return !!s.config?.scheduleTime; }, Step02_Language],
    [(s: Store) => { t(); return !!s.config?.dashboardLanguage; }, Step03_Redirect],
    [(s: Store) => { t(); return !!s.config?.dashboardLanguage; }, Step06_NewsWebsite],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Step04_Topic], // Redirect is optional
    [(s: Store) => { t(); return !!s.config.community }, Step07_Selector],
    [(s: Store) => { t(); return !!s.linkSelector; }, Step08_Generate],
    
    [(s: Store) => { t(); return true; }, Step12_Share], // Send action
    [(s: Store) => { t(); return true; }, Step13_Plan], // Share display
    
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Config],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, NewsSource],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Users],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Billing],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Reports],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Exports],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Newspaper],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Developer],
  ];

  $: {
    if ($store) {
      for (let i = 0; i < components.length; i++) {
        const [validator] = components[i];
        // If validation fails for a step, it means the prerequisites (previous steps) are not met.
        // We should redirect to the previous step (i - 1) to fix the issue.
        if (!validator($store)) {
          // If we are currently at step 'i' or beyond, we must go back.
          if ($store.stepsIndex >= i) {
            const target = i > 0 ? i - 1 : 0;
            if ($store.stepsIndex !== target) {
               saveToStore({ stepsIndex: target });
            }
            break;
          }
        }
      }
    }
  }
</script>

<StepsTowardsPublish {components} />

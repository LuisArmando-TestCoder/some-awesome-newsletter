<script lang="ts">
  import { saveToStore, stepsMapping } from "../../../store";
  // Onboarding slots 0 to 8 (order matters: stepsMapping in store.ts starts the dashboard at 9).
  // Order follows STRATEGY.md section 5 (WS3): website, preview, readers, schedule, first send,
  // then the optional sender name and signature steps after the owner has reached value.
  // Onboarding never asks for email credentials (Gmail app password removed 2026-10-30, Luis).
  import Step06_NewsWebsite from "./stages/NewFlow/Step06_NewsWebsite.svelte"; // 0 website
  import Step08_Generate from "./stages/NewFlow/Step08_Generate.svelte"; // 1 live preview (aha)
  import Step02_Language from "./stages/NewFlow/Step02_Language.svelte"; // 2 readers + language
  import Step01_Frequency from "./stages/NewFlow/Step01_Frequency.svelte"; // 3 how often + automation, creates the source
  import Step11_Send from "./stages/NewFlow/Step11_Send.svelte"; // 4 first subscribers + first real send
  import Step12_Share from "./stages/NewFlow/Step12_Share.svelte"; // 5 signup link + widget
  import Step10_SenderName from "./stages/NewFlow/Step10_SenderName.svelte"; // 6 sender name (optional, no credentials)
  import Step05_EmailSignature from "./stages/NewFlow/Step05_EmailSignature.svelte"; // 7 signature (optional)
  import Step13_Plan from "./stages/NewFlow/Step13_Plan.svelte"; // 8 done
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
  import { onboarding, initOnboarding, getResumeIndex } from "$lib/tutorial/onboardingState";

  // Load saved onboarding progress once the owner's email is known (the layout sets it).
  let initedFor = "";
  let initAt = 0;
  let resumeHandled = false;
  $: if ($store.configuratorEmail && $store.configuratorEmail !== initedFor) {
    initedFor = $store.configuratorEmail;
    initOnboarding(initedFor);
    initAt = Date.now();
    resumeHandled = false;
    const resume = getResumeIndex(initedFor);
    if (resume !== null && !$store.config?.newsSources?.length && $store.stepsIndex !== resume) {
      saveToStore({ stepsIndex: resume });
    }
  }

  // The layout jumps to the Users tab as soon as one source exists. An owner who reloads
  // in the middle of setup (the source is created at slot 5) is sent back to their step.
  $: if (initedFor && !resumeHandled && $store.stepsIndex === stepsMapping["Users"] && Date.now() - initAt < 20000) {
    resumeHandled = true;
    const resume = getResumeIndex(initedFor);
    if (resume !== null && $onboarding.url) saveToStore({ stepsIndex: resume });
  }

  const t = () => {
    if ($store.authCode && $store.stepsIndex > stepsMapping["Profile"] && $store.directionsThatShouldDisappear.length === 0) {
      if (JSON.stringify($store.directionsThatShouldDisappear) !== JSON.stringify([-1, 1])) {
        saveToStore({ directionsThatShouldDisappear: [-1, 1] });
      }
    } else if ($store.authCode && $store.stepsIndex <= stepsMapping["Profile"] && $store.directionsThatShouldDisappear.length !== 0) {
      saveToStore({ directionsThatShouldDisappear: [] });
    }
    return true;
  };

  // Owners who set up before this flow existed already have sources; never block them.
  const hasSources = () => !!$store.config.newsSources?.length;

  // Each validator says whether the prerequisites for that slot are met.
  const components = [
    [(_s: Store) => { t(); return true; }, Step06_NewsWebsite],
    [(_s: Store) => { t(); return hasSources() || !!$onboarding.url; }, Step08_Generate],
    [(_s: Store) => { t(); return true; }, Step02_Language],
    [(_s: Store) => { t(); return hasSources() || !!$onboarding.reader; }, Step01_Frequency],
    [(_s: Store) => { t(); return hasSources() || !!$onboarding.newsSourceId; }, Step11_Send],
    [(_s: Store) => { t(); return true; }, Step12_Share],
    [(_s: Store) => { t(); return true; }, Step10_SenderName],
    [(_s: Store) => { t(); return true; }, Step05_EmailSignature],
    [(_s: Store) => { t(); return true; }, Step13_Plan],

    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Config],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, NewsSource],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Users],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Billing],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Reports],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Exports],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Newspaper],
    [(s: Store) => { t(); return isValidURL(s.newsSource); }, Developer],
  ] as const;

  // If a step's prerequisites are missing (for example after clearing storage), go back one step.
  $: {
    if ($store && $onboarding) {
      for (let i = 0; i < components.length; i++) {
        const [validator] = components[i];
        if (!validator($store)) {
          if ($store.stepsIndex >= i) {
            const target = i > 0 ? i - 1 : 0;
            if ($store.stepsIndex !== target) saveToStore({ stepsIndex: target });
            break;
          }
        }
      }
    }
  }
</script>

<StepsTowardsPublish {components} />

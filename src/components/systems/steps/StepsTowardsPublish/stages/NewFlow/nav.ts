import { get } from "svelte/store";
import store, { saveToStore } from "../../../../../store";
import { updateOnboarding, ONBOARDING_STEP_COUNT } from "$lib/tutorial/onboardingState";

/** Move to an onboarding slot (0 to 8) and remember it for resume. */
export function goToStep(index: number) {
  const target = Math.max(0, index);
  if (target < ONBOARDING_STEP_COUNT) updateOnboarding({ stepIndex: target });
  saveToStore({ stepsIndex: target, hasInteracted: true });
}

export function nextStep() {
  goToStep((get(store).stepsIndex ?? 0) + 1);
}

export function prevStep() {
  goToStep(Math.max(0, (get(store).stepsIndex ?? 0) - 1));
}

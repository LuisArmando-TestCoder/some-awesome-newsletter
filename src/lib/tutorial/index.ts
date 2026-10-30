/** Public API of the WS3 tutorial system. Documented in docs/aiban/TUTORIAL_API.md. */
export { default as GettingStartedChecklist } from "./GettingStartedChecklist.svelte";
export { default as GuidedTour } from "./GuidedTour.svelte";
export { default as HelpCard, isHelpDismissed, dismissHelp, restoreHelp } from "./HelpCard.svelte";
export { default as EmptyStateGuide } from "./EmptyStateGuide.svelte";
export * from "./tour";
export { checklist, checklistHidden, setChecklistHidden, computeChecklist } from "./checklist";
export type { ChecklistItem, ChecklistItemId, ChecklistState } from "./checklist";
export {
  onboarding,
  initOnboarding,
  updateOnboarding,
  markOnboardingComplete,
  isOnboardingComplete,
  getResumeIndex,
  trackOnboardingEvent,
  readSavedOnboarding,
  ONBOARDING_STEP_COUNT,
} from "./onboardingState";
export type { OnboardingState, OnboardingEvent } from "./onboardingState";
export { ob, tt, at, fmt } from "./copy";
export { activation, computeActivation, ACTIVATION_WINDOW_DAYS } from "./activation";
export type { ActivationState } from "./activation";

// WS4. Dashboard tour definition for WS3's GuidedTour ($lib/tutorial).
import { startTour, resetTour, offerTourOnce, isOnboardingComplete, setChecklistHidden } from "$lib/tutorial";
import type { Translate } from "./i18n";
import type { TourDefinition } from "$lib/tutorial/tour";
import { goTo, type SectionId } from "./nav";

export const DASH_TOUR_ID = "dashboard-v1";

export function dashTour(tr: Translate): TourDefinition {
  // On phones the sidebar is hidden; point at the bottom bar instead ("More" holds the rest).
  const mobile = typeof window !== "undefined" && window.matchMedia?.("(max-width: 767px)").matches;
  const MOBILE_PRIMARY = ["nav-home", "nav-automations", "nav-subscribers", "nav-reports"];
  const target = (id: string) => (!mobile || !id.startsWith("nav-") ? `[data-tour="${id}"]` : MOBILE_PRIMARY.includes(id) ? `[data-tour="m-${id}"]` : `[data-tour="m-nav-more"]`);
  const step = (id: string) => ({ target: target(id), title: tr(`dash.tour.${id}.title`), body: tr(`dash.tour.${id}.body`) });
  return {
    id: DASH_TOUR_ID,
    steps: [step("nav-home"), step("nav-automations"), step("nav-sources"), step("nav-subscribers"), step("nav-reports"), step("nav-settings"), step("write-about-this")],
  };
}

/** Offer the tour once, after onboarding is complete. */
export function maybeOfferTour(tr: Translate, email?: string) {
  try {
    if (isOnboardingComplete(email)) offerTourOnce(dashTour(tr));
  } catch {
    /* tour is optional */
  }
}

export function replayTour(tr: Translate) {
  goTo("home");
  resetTour(DASH_TOUR_ID);
  setTimeout(() => startTour(dashTour(tr)), 50);
}

export function showChecklist() {
  setChecklistHidden(false);
  goTo("home");
}

/** Where each WS3 checklist item is done in the dashboard. */
export const CHECKLIST_TARGETS: Record<string, { section: SectionId; tab?: string }> = {
  source: { section: "sources" },
  sender: { section: "settings", tab: "sending" },
  subscriber: { section: "subscribers", tab: "add" },
  send: { section: "subscribers", tab: "send" },
  automation: { section: "automations" },
  widget: { section: "subscribers", tab: "form" },
};

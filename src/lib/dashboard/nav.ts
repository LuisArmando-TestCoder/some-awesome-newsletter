// WS4. Dashboard sections, active section store and URL sync.
// The section is the source of truth for the dashboard shell. It stays in
// sync with the legacy `store.stepsIndex` so older menus (MenuHalf, Header)
// that still set stepsIndex keep working.
import { writable, get } from "svelte/store";
import store, { saveToStore, stepsMapping } from "../../components/store";

export type SectionId =
  | "home"
  | "automations"
  | "sources"
  | "subscribers"
  | "reports"
  | "blog"
  | "settings";

export type SettingsTab = "brand" | "sending" | "billing" | "integrations" | "developer";

export type Section = {
  id: SectionId;
  labelKey: string;
  descKey: string;
  icon: string;
  group: "main" | "audience" | "account";
  /** Legacy step that represents this section, for old menus. */
  step?: keyof typeof stepsMapping;
};

// Labels follow STRATEGY.md section 4.
export const SECTIONS: Section[] = [
  { id: "home", labelKey: "dash.nav.home", descKey: "dash.home.desc", icon: "home", group: "main" },
  { id: "automations", labelKey: "dash.nav.automations", descKey: "dash.automations.desc", icon: "bolt", group: "main" },
  { id: "sources", labelKey: "dash.nav.sources", descKey: "dash.sources.desc", icon: "source", group: "main", step: "News Sources" },
  { id: "subscribers", labelKey: "dash.nav.subscribers", descKey: "dash.subscribers.desc", icon: "people", group: "audience", step: "Users" },
  { id: "reports", labelKey: "dash.nav.reports", descKey: "dash.reports.desc", icon: "chart", group: "audience", step: "Reports" },
  { id: "blog", labelKey: "dash.nav.blog", descKey: "dash.blog.desc", icon: "blog", group: "audience", step: "Newspaper" },
  { id: "settings", labelKey: "dash.nav.settings", descKey: "dash.settings.desc", icon: "gear", group: "account", step: "Profile" },
];

const STEP_TO_TARGET: Record<number, { section: SectionId; tab?: SettingsTab }> = {
  [stepsMapping["Profile"]]: { section: "settings", tab: "brand" },
  [stepsMapping["News Sources"]]: { section: "sources" },
  [stepsMapping["Users"]]: { section: "subscribers" },
  [stepsMapping["Billing"]]: { section: "settings", tab: "billing" },
  [stepsMapping["Reports"]]: { section: "reports" },
  [stepsMapping["Exports"]]: { section: "settings", tab: "developer" },
  [stepsMapping["Newspaper"]]: { section: "blog" },
  [stepsMapping["Secrets/Developer"]]: { section: "settings", tab: "developer" },
};

const VALID = new Set<string>(SECTIONS.map((s) => s.id));
const VALID_TABS = new Set<string>(["brand", "sending", "billing", "integrations", "developer"]);

export const activeSection = writable<SectionId>("home");
/** true once the dashboard layout finished loading the owner's data. */
export const dashboardReady = writable(false);
/** true while the new dashboard shell (not onboarding) is on screen. Other workstreams may read it (e.g. to hide the marketing header). */
export const dashboardMode = writable(false);
export const settingsTab = writable<SettingsTab>("brand");
/** Optional sub-tab inside a section (e.g. subscribers "import"). */
export const sectionTab = writable<string | null>(null);

let lastStep: number | null = null;
let started = false;

function writeUrl(section: SectionId, tab?: string | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  if (tab) url.searchParams.set("tab", tab);
  else url.searchParams.delete("tab");
  window.history.replaceState(window.history.state, "", url.toString());
}

/** Navigate to a section (and optional tab). */
export function goTo(section: SectionId, tab?: string | null, opts: { focus?: boolean } = {}) {
  const prevSection = get(activeSection);
  activeSection.set(section);
  if (section === "settings" && tab && VALID_TABS.has(tab)) settingsTab.set(tab as SettingsTab);
  sectionTab.set(section === "settings" ? null : tab ?? null);
  const def = SECTIONS.find((s) => s.id === section);
  const legacy = def?.step ? stepsMapping[def.step] : null;
  // Keep stepsIndex >= Profile so the onboarding flow does not take over.
  const cur = get(store).stepsIndex ?? 0;
  const next = legacy ?? Math.max(cur, stepsMapping["Profile"]);
  lastStep = next;
  if (cur !== next) saveToStore({ stepsIndex: next });
  writeUrl(section, section === "settings" ? get(settingsTab) : tab ?? null);
  const sectionChanged = prevSection !== section || opts.focus === true;
  if (typeof document !== "undefined" && opts.focus !== false && sectionChanged) {
    const main = document.getElementById("dashboard-main");
    main?.scrollTo?.({ top: 0 });
    main?.focus({ preventScroll: true });
  }
}

/** Call once when the shell mounts. Reads ?section=&tab= and starts the legacy sync. */
export function startNav(): () => void {
  if (typeof window !== "undefined") {
    const params = new URL(window.location.href).searchParams;
    const s = params.get("section");
    const tab = params.get("tab");
    const fromStep = STEP_TO_TARGET[get(store).stepsIndex ?? -1];
    if (s && VALID.has(s)) goTo(s as SectionId, tab, { focus: false });
    // Arriving from a flow that already chose a place (e.g. "Upgrade" at the end of onboarding goes to billing).
    else if (fromStep && get(store).stepsIndex !== stepsMapping["Users"] && get(store).stepsIndex !== stepsMapping["Profile"]) goTo(fromStep.section, fromStep.tab ?? null, { focus: false });
    else goTo("home", null, { focus: false });
  }
  lastStep = get(store).stepsIndex ?? null;
  started = true;
  const unsub = store.subscribe(($s) => {
    if (!started) return;
    const step = $s.stepsIndex;
    if (step === lastStep) return;
    lastStep = step;
    const target = STEP_TO_TARGET[step];
    if (target && get(activeSection) !== target.section) {
      activeSection.set(target.section);
      if (target.tab) settingsTab.set(target.tab);
      writeUrl(target.section, target.tab ?? null);
    } else if (target?.tab && target.section === "settings") {
      settingsTab.set(target.tab);
      writeUrl("settings", target.tab);
    }
  });
  return () => {
    started = false;
    unsub();
  };
}

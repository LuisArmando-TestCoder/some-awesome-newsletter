import { writable } from "svelte/store";

export interface StepsStore {
  url: string;
  lead: string;
  personality: string;
  linkSelector: string;
  config: any; // Using any for now to be flexible with the config structure
  generatedHtml: string;
  createdNewsSourceId: string;
  isRegeneratingSelector: boolean;
  isGeneratingNewsletter: boolean;
  isSendingEmail: boolean;
  isCreatingNewsSource: boolean;
  topic: string;
  language: string;
}

const initialState: StepsStore = {
  url: "",
  lead: "",
  personality: "",
  linkSelector: "",
  config: {},
  generatedHtml: "",
  createdNewsSourceId: "",
  isRegeneratingSelector: false,
  isGeneratingNewsletter: false,
  isSendingEmail: false,
  isCreatingNewsSource: false,
  topic: "",
  language: "en"
};

const stepsStore = writable<StepsStore>(initialState);

export const resetStepsStore = () => {
  stepsStore.set(JSON.parse(JSON.stringify(initialState)));
};

export const updateStepStore = (data: Partial<StepsStore>) => {
  stepsStore.update(current => ({ ...current, ...data }));
};

export default stepsStore;

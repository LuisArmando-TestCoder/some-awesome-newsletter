<script lang="ts">
  import AutoCollapseToggle from "../AutoCollapseToggle.svelte";
  import EmailCredentialsToggle from "./toggles/EmailCredentialsToggle.svelte"; // New combined toggle
  import Page from "../../../../../wrappers/Page/Page.svelte";
  import { writable, get } from "svelte/store";
  import { setContext } from "svelte";
  import store, { saveToConfig } from "../../../../../../store";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from "$lib/i18n/dashboard-translations";

  export let canReveal = true;

  const draftConfig = writable({});

  // Initialize draft with current config
  $: if ($store.config) {
    // Only set if draft is empty or we might want to reset on store update?
    // For now, let's initialize it once to avoid overwriting user edits if store updates.
    // However, since it's a reactive statement, it runs on mount.
    // To strictly init once, we might want to check if it's populated.
    // But simplistic approach: use first valid config.
    const current = get(draftConfig);
    if (Object.keys(current).length === 0) {
      draftConfig.set({ ...$store.config });
    }
  }

  setContext('config-draft', {
    draftConfig,
    updateDraft: (updates) => {
      draftConfig.update(c => ({ ...c, ...updates }));
    }
  });

  async function handleUpdate() {
    await saveToConfig(get(draftConfig));
    // Ideally ping success here, but saveToConfig might do it or return result?
    // UpdateNewsSourceForm used ping(). Let's stick to saveToConfig for now.
  }

  $: canReveal;
</script>


<Page>
  <AutoCollapseToggle {canReveal}
    toggles={{
      emailCredentials: [EmailCredentialsToggle], // New combined toggle
    }}
  />
  <div class="submit-container">
    <SubmitButton label={$t['newsSource.updateButton'] || 'Update'} callback={handleUpdate} />
  </div>
</Page>

<style lang="scss">
  @use "../Dashboard.scss";
  .submit-container {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }
</style>

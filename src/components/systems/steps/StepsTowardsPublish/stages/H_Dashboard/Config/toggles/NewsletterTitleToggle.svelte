<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import { t } from "$lib/i18n/dashboard-translations";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  $: $store;
</script>

<div>
  <PlainText
    placeholder={$t['placeholders.newsletterTitle']}
    value={$store.newsletterTitle}
    onChange={(value) => {
      saveToConfig({ newsletterTitle: value });
    }}
  />
  <MarkdownText {canReveal}>
    {$t['markdown.newsletterTitle']}
  </MarkdownText>
</div>

<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  $: $store;
</script>

<div>
  <PlainText
    placeholder="Change your newsletter subject"
    value={$store.newsletterSubject}
    onChange={(value) => {
      saveToConfig({ newsletterSubject: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Keep it concise, clear, and curiosity-driven--
  </MarkdownText>
</div>

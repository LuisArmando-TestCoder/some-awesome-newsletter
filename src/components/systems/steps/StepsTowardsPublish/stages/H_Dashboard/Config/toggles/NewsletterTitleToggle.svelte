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
    placeholder="Change your newsletter title"
    value={$store.newsletterTitle}
    onChange={(value) => {
      saveToConfig({ newsletterTitle: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Make it feel personal, like a message from a friend--
  </MarkdownText>
</div>

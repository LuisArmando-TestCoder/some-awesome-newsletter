<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  const localValue = writable("");

  useConfigurator((value: Store) => {
    if (value.config.newsletterTitle) {
      localValue.set(value.config.newsletterTitle);
    }
  });
</script>

<div>
  <PlainText
    placeholder="Change your newsletter title"
    value={$localValue}
    onChange={(value) => {
      localValue.set(value);
      saveToConfig({ newsletterTitle: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Make it feel personal, like a message from a friend--
  </MarkdownText>
</div>

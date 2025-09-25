<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
    import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  const localValue = writable("");

  useConfigurator((value: Store) => {
    if (value.config.newsletterSubject) {
      localValue.set(value.config.newsletterSubject);
    }
  });
</script>

<div>
  <PlainText
    placeholder="Change your newsletter subject"
    value={$localValue}
    onChange={(value) => {
      localValue.set(value);
      saveToConfig({ newsletterSubject: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Keep it concise, clear, and curiosity-driven--
  </MarkdownText>
</div>

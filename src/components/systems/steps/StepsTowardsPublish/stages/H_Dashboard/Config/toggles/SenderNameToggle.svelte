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
    if (value.config.senderName) {
      localValue.set(value.config.senderName);
    }
  });
</script>

<div>
  <PlainText
    placeholder="Change your email sender name"
    value={$localValue}
    onChange={(value) => {
      localValue.set(value);
      saveToConfig({ senderName: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Indicating who the email is from helps establish trust--
  </MarkdownText>
</div>

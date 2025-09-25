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
    if (value.config.emailMaskSender) {
      localValue.set(value.config.emailMaskSender);
    }
  });
</script>

<div>
  <PlainText
    placeholder="Enter the email address to send from"
    value={$localValue}
    onChange={(value) => {
      localValue.set(value);
      saveToConfig({ emailMaskSender: value });
    }}
  />
  <MarkdownText {canReveal}>
    --The email address that will appear as the sender in your newsletters.--
  </MarkdownText>
</div>

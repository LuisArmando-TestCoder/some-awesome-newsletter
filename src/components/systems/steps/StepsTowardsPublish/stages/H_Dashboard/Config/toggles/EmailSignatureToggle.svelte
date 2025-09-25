<script lang="ts">
  import { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import TextArea from "../../../../../../inputs/TextArea/TextArea.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  const localValue = writable("");

  useConfigurator((value: Store) => {
    if (value.config.emailSignature) {
      localValue.set(value.config.emailSignature);
    }
  });
</script>

<div>
  <TextArea
    placeholder="Change your email signature HTML here"
    value={$localValue}
    onChange={(value) => {
      localValue.set(value);
      saveToConfig({ emailSignature: value });
    }}
  />
  <MarkdownText {canReveal}>--Email signatures instil brand trust--</MarkdownText>
  {@html $localValue ? $localValue : "No email signature set"}
</div>

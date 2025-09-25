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
    if (value.config.appPassword) {
      localValue.set(value.config.appPassword);
    }
  });
</script>

<div>
  <PlainText
    type="password"
    placeholder="Enter your email app password"
    value={$localValue}
    onChange={(value) => {
      localValue.set(value);
      saveToConfig({ appPassword: value });
    }}
  />
  <MarkdownText {canReveal}>
    --The app-specific password for your email account (e.g., Gmail App Password).--
  </MarkdownText>
</div>

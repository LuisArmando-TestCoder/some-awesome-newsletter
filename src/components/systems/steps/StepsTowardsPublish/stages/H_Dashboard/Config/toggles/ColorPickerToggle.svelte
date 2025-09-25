<script lang="ts">
  import ColorPicker from "../../../../../../inputs/ColorPicker/ColorPicker.svelte";
  import { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  const localValue = writable("");

  useConfigurator((value: Store) => {
    if (value.config.color) {
      localValue.set(value.config.color);
      saveToConfig({ color: value.config.color });
    }
  });

  let स्वरूप: { color?: string } = {};
  localValue.subscribe((value) => {
     स्वरूप = { color: value };
  });
</script>

<div style="color: {स्वरूप.color};">
  <MarkdownText {canReveal}>
    Your newsletter will be **highlighted** in **this color**
  </MarkdownText>
  <ColorPicker selectedColorStore={localValue} />
</div>

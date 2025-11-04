<script lang="ts">
  import Image from "../../../../../../inputs/Image/Image.svelte";
  import { saveToConfig, saveToStore } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import { t } from "$lib/i18n/dashboard-translations";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  const localValue = writable<string | null>(null);

  useConfigurator((value: Store) => {
    console.log("this is the value logo", value.config.logo)
    if (value.config.logo) {
      localValue.set(value.config.logo);
    }
  });

  async function handleImageChange(imageData: string | null) {
    localValue.set(imageData);
    const config = await saveToConfig({ logo: imageData as string });
    if (config) saveToStore({ logo: config.logo })
  }
</script>

<MarkdownText {canReveal}>
  {$t['markdown.imageToggle']}
</MarkdownText>
<Image {canReveal} selectedImage={$localValue} onChange={handleImageChange} />

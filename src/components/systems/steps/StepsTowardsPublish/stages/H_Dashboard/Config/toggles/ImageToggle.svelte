<script lang="ts">
  import Image from "../../../../../../inputs/Image/Image.svelte";
  import { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  const localValue = writable<string | null>(null);

  useConfigurator((value: Store) => {
    if (value.config.logo) {
      localValue.set(value.config.logo);
    }
  });

  async function handleImageChange(imageData: string | null) {
    localValue.set(imageData);
    saveToConfig({ logo: imageData as string });
  }
</script>

<MarkdownText {canReveal}>
  Upload a **logo** for your newsletter
</MarkdownText>
<Image {canReveal} selectedImage={$localValue} onChange={handleImageChange} />

<script lang="ts">
  import Image from "../../../../../../inputs/Image/Image.svelte";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import { getContext } from "svelte";

  export let canReveal = true;

  const { draftConfig, updateDraft } = getContext('config-draft') as any;

  function handleImageChange(imageData: string | null) {
    updateDraft({ logo: imageData as string });
  }
</script>

<MarkdownText {canReveal}>
  {$t['markdown.imageToggle']}
</MarkdownText>
<Image {canReveal} selectedImage={$draftConfig.logo} onChange={handleImageChange} />

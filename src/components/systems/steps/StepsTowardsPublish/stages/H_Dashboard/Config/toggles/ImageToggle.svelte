<script lang="ts">
  import Image from "../../../../../../inputs/Image/Image.svelte";
  import store, { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
    import updateConfiguration from "../../../../../../requests/updateConfiguration";

  export let canReveal = true;

  $: canReveal;
  $: logoImage = $store?.config?.logo || null;

  async function handleImageChange(imageData: string | null) {
    // Update the news source with the new logo
    console.log("IMAGE DATA", imageData);
    saveToConfig(
      { logo: imageData as string }
    );
  }
</script>

<MarkdownText {canReveal}>
  Upload a **logo** for your newsletter
</MarkdownText>
<Image
  {canReveal}
  selectedImage={logoImage}
  onChange={handleImageChange}
/>

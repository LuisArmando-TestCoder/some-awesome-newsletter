<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../../inputs/Link/Link.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>--In order to use your blog or news feed we need you to type its link--</MarkdownText>

  <MarkdownText {canReveal}>
    ### We will generate content from your feed, so you don't have to create a newsletter from scratch
  </MarkdownText>
  <Link
    placeholder="Your news' site or blog's link"
    value={$store.newsSource}
    onChange={(newsSource) =>
      saveToStore({
        newsSource,
      })}
    onEnter={(isValid) => {
      if (isValid)
        saveToStore({
          stepsIndex: $store.stepsIndex + 1,
        });
    }}
  />
</Centered>

<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../../inputs/Link/Link.svelte";
  import store, { saveToStore, stepsMapping } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
    import { processNewsSourceAction } from "./H_Dashboard/NewsSource/newsSourceActions";
    import createNewsSource from "../../../requests/createNewsSource";
    import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
    import { isValidURL } from "../../../inputs/Link/isValidLink";

  export let canReveal = false;

  async function handleAddNewsSource() {
    const fields = {
      url: $store.newsSource,
      lead: $store.lead,
      personality: $store.personality,
      schedule: $store.schedule,
    };

    await processNewsSourceAction(
      fields,
      (f) => ({
        type: "website",
        url: f.url,
        community: "Newsletter Users",
        lead: f.lead,
        personality: f.personality,
      }),
      createNewsSource,
      console.error,
      "Failed to add news source. Please try again.",
      (created) => {
        // If successful, push into local store config
        const currentConfig = $store.config;
        if (currentConfig?.newsSources) {
          currentConfig.newsSources.push(created);
          saveToStore({ config: currentConfig, stepsIndex: stepsMapping["News Sources"] });
        }
      }
    );
  }

  async function trigger(isValid: boolean) {
      if (isValid)
        saveToStore({
          stepsIndex: $store.stepsIndex + 1,
        });

        if (!$store.config.newsSources.length) {
          await handleAddNewsSource();
        }
    }
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
    onEnter={trigger}
  />
  <br>
  <div class="submit">
    <SubmitButton callback={() => trigger(isValidURL($store.newsSource))}/>
  </div>
</Centered>

<style>
  .submit {
    display: flex;
    justify-content: end;
  }
</style>
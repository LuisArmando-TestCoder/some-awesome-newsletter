<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../../inputs/Link/Link.svelte";
  import Country from "../../../inputs/Country/Country.svelte";
  import store, { saveToStore, stepsMapping } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
    import { processNewsSourceAction } from "./H_Dashboard/NewsSource/newsSourceActions";
    import createNewsSource from "../../../requests/createNewsSource";
    import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
    import { isValidURL } from "../../../inputs/Link/isValidLink";
  import LoadingScreen from "../../../loading/LoadingScreen.svelte";
  import { ping } from "../../../../Notification/notificationStore";
    import getConfiguratorSession from "../../../requests/getConfiguratorSession";

  export let canReveal = false;
  let isLoading = false;

  async function handleAddNewsSource() {
    isLoading = true;
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
      () => {
        saveToStore({ stepsIndex: stepsMapping["News Sources"] });
      }
    );
  }

  async function trigger(isValid: boolean) {
      if (isValid) {
        await handleAddNewsSource();
        ping("News Source Added", "we are about to send an article to your newsletter, review your email in a few minutes");
        saveToStore({
          stepsIndex: $store.stepsIndex + 1,
        });
        await getConfiguratorSession();
      }
    }
</script>

{#if isLoading}
  <LoadingScreen messages={["Generating selectors...", "Analyzing content...", "Finalizing setup..."]} />
{/if}

<Centered>
  <div style={isLoading ? 'opacity: 0.5; pointer-events: none;' : ''}>
    <MarkdownText {canReveal}>--In order to use your blog or news feed we need you to type its link--</MarkdownText>

    <MarkdownText {canReveal}>
    ### We will generate content from your feed, so you don't have to create a newsletter from scratch
  </MarkdownText>
  <div class="news-source-input">
    <Link
      placeholder="Your news' site or blog's link"
      value={$store.newsSource}
      onChange={(newsSource) =>
        saveToStore({
          newsSource,
        })}
      onEnter={() => trigger(isValidURL($store.newsSource))}
    />
    <Country onSelect={(selection) => {
      if (selection) {
        saveToStore({ newsSource: selection.ns });
      }
    }} />
  </div>
  <br>
    <div class="submit">
      <SubmitButton callback={() => trigger(isValidURL($store.newsSource))}/>
    </div>
  </div>
</Centered>

<style>
  .news-source-input {
    display: flex;
    align-items: end;
    gap: 1rem;
  }
  .submit {
    display: flex;
    justify-content: end;
  }
</style>

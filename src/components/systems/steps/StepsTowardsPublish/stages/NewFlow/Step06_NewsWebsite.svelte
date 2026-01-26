<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import Link from "../../../../inputs/Link/Link.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import store, { saveToStore, topic } from "../../../../../store";
  import { isValidURL } from "../../../../inputs/Link/isValidLink";
  import createNewsSource from "../../../../requests/createNewsSource";
  import { writable } from "svelte/store";
  import CollapsibleTags from "../../../../selectors/Tags/CollapsibleTags.svelte";
  import categoriesTree from "../../../../inputs/Country/newssourcesthemetree";

  export let canReveal = false;

  let url = $store.newsSource || "";
  const isLoading = writable(false);
  const selectedTags = writable<string[]>([]);
  let tagUrlMap = new Map<string, string[]>();
  let tagPathMap = new Map<string, string>();

  function buildTags(obj: any, parentPath: string = ""): any[] {
    return Object.keys(obj).map(key => {
      const currentPath = parentPath ? `${parentPath} / ${key}` : key;
      const value = obj[key];
      if (Array.isArray(value)) {
        tagUrlMap.set(key, value);
        tagPathMap.set(key, currentPath);
        return { name: key };
      } else {
        return { name: key, children: buildTags(value, currentPath) };
      }
    });
  }

  const tagsData = writable(buildTags(categoriesTree()));

  topic.subscribe(() => {
    tagsData.set(buildTags(categoriesTree()));
  });

  selectedTags.subscribe(tags => {
    if (tags.length > 0) {
      // Use the last selected tag that has URLs mapped to it
      for (let i = tags.length - 1; i >= 0; i--) {
        const tagName = tags[i];
        const urls = tagUrlMap.get(tagName);
        if (urls && urls.length > 0) {
          url = urls[0];
          const path = tagPathMap.get(tagName);
          if (path) {
            saveToStore({ lead: path });
            topic.set(path);
          }
          break;
        }
      }
    }
  });

  async function handleNext() {
    if ($isLoading) return;

    if (isValidURL(url)) {
      isLoading.set(true);
      try {
        const newsSourceData = {
          type: "website",
          url: url,
          community: "Newsletter Users",
          lead: $store.lead,
          personality: $store.personality,
          scheduleTime: $store.config?.scheduleTime
        };

        const result = await createNewsSource(newsSourceData);

        if (result) {
          saveToStore({
            newsSource: url,
            linkSelector: result.linkSelector || "",
            stepsIndex: $store.stepsIndex + 1
          });
        } else {
          alert("Failed to generate selector. Please try again or check the URL.");
        }
      } catch (e) {
        console.error(e);
        alert("An error occurred while generating selector.");
      } finally {
        isLoading.set(false);
      }
    } else {
      alert("Please enter a valid URL or pick a source.");
    }
  }
</script>

<Centered>
  <div class="step-container">
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="main-title">
          News Source
        </h1>
      </div>

      <div class="input-group" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        <h3 class="impact-statement">
          Which news website do you want to use?
        </h3>
        <p class="subtitle">
          Enter a URL or let us pick one for you based on your topic.
          <br>
          <span style="font-size: 0.8em; opacity: 0.8;">
            We will analyze the website to find the best content. This might take a few seconds.
          </span>
        </p>
        <div class="input-wrapper">
          <Link 
            value={url}
            placeholder="https://example.com"
            onChange={(val) => url = val}
          />
          
          <div class="categories-grid" in:fly={{ y: 10, duration: 400 }}>
            <CollapsibleTags tags={$tagsData} {selectedTags} />
          </div>
      </div>

      <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 300, easing: quadOut }}>
        <SubmitButton 
          callback={handleNext} 
          loading={$isLoading}
          label={$isLoading ? "Analyzing..." : "Next"}
        />
      </div>
  </div>
</Centered>

<style lang="scss">
  .step-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 1rem 0;
    gap: 2rem;
  }

  .header-group { text-align: center; }

  .main-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
    text-wrap: balance;
    background: linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .impact-statement {
    /* Responsive sizing: slightly larger/bolder than the previous subtitle */
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
    text-align: center; /* Default center */
    letter-spacing: -0.03em;
    text-wrap: balance;

    /* Infinite Shimmer Effect: 
       Creates a living, "forever" feel using a moving gradient background.
    */
    background: linear-gradient(
      120deg, 
      var(--c-primary, #2563eb) 0%, 
      var(--c-primary-light, #60a5fa) 50%, 
      var(--c-primary, #2563eb) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    animation: shine 4s linear infinite;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  .subtitle {
    font-size: 0.9rem;
    color: #666;
    margin: 0 0 0.5rem 0;
    font-style: italic;
  }

  .input-wrapper {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .pick-btn {
    align-self: flex-start;
    padding: 0.5rem 1rem;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    color: #333;
    
    &:hover { background: #e9e9e9; }
  }

  .categories-grid {
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
</style>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import LoadingScreen from "../../../../loading/LoadingScreen.svelte";
  import store, { latestMessage, saveToStore, topic } from "../../../../../store";
  import { processNewsSourceAction } from "../H_Dashboard/NewsSource/newsSourceActions";
  import createNewsSource from "../../../../requests/createNewsSource";
  import getConfiguratorSession from "../../../../requests/getConfiguratorSession";
  import sendEmail from "../../../../requests/sendEmail";
  import getAuthHeaders from "../../../../requests/getAuthHeaders";
  import { onDestroy } from 'svelte';
  import stepsStore, { updateStepStore } from "./stepsStore";

  export let canReveal = false;

  let isLoading = false;
  let isGenerated = false;
  let isSending = false;
  let isSent = false;
  let isCreating = false;
  let messages: string[] = ["Initializing..."];
  let previewHtml = "";

  const unsubscribe = latestMessage.subscribe(msg => {
    if (msg && isLoading) {
      messages = [...messages, msg];
    }
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function handleGenerate() {
    isLoading = true;
    updateStepStore({ isGeneratingNewsletter: true });
    messages = ["Starting generation...", "Scraping content...", "Translating article...", "Formatting email..."];

    try {
      const response = await fetch(`${$store.apiURL()}/news-source/generate-newsletter`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          // Send structured data
          newsSource: {
            url: $stepsStore.url || $store.newsSource,
            lead: $stepsStore.lead || $store.lead || $topic || "General News",
            personality: $stepsStore.personality || $store.personality || "Professional",
            linkSelector: $stepsStore.linkSelector || $store.linkSelector,
            includeImages: true // Default to true or add a toggle if needed
          },
          // Additional config context
          language: $stepsStore.language || $store.globalLanguage || "en",
          config: $stepsStore.config || $store.config
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate newsletter");
      }

      previewHtml = data.html;
      updateStepStore({ generatedHtml: previewHtml });
      isGenerated = true;
    } catch (err: any) {
      console.error(err);
      alert("Generation failed: " + (err.message || err));
    } finally {
      isLoading = false;
      updateStepStore({ isGeneratingNewsletter: false });
    }
  }

  async function handleSend() {
    isSending = true;
    updateStepStore({ isSendingEmail: true });
    
    try {
      await sendEmail({
        html: previewHtml,
        subject: $store.config?.newsletterSubject || "Your Generated Newsletter Preview",
        config: $store.config,
        emails: [$store.configuratorEmail]
      });

      isSent = true;
    } catch (err: any) {
      console.error(err);
      alert("Failed to send email: " + (err.message || err));
    } finally {
      isSending = false;
      updateStepStore({ isSendingEmail: false });
    }
  }

  async function handleNext() {
    if (isCreating) return;
    isCreating = true;
    updateStepStore({ isCreatingNewsSource: true });

    try {
      // Create the news source using the current store data
      const newSource = await createNewsSource({
        type: "website",
        url: $stepsStore.url || $store.newsSource,
        lead: $stepsStore.lead || $store.lead || $topic || "General News",
        personality: $stepsStore.personality || $store.personality,
        linkSelector: $stepsStore.linkSelector || $store.linkSelector,
        country: "US", // Default or from store if available
        community: "World Wide Expats", // Default or from store
        scheduleTime: $store.config?.scheduleTime // Use schedule time if set
      });

      if (newSource && newSource.id) {
        // Save the ID to the store
        saveToStore({ createdNewsSourceId: newSource.id });
        updateStepStore({ createdNewsSourceId: newSource.id });
        
        // Refresh session to sync everything
        await getConfiguratorSession();
        
        // Proceed to next step
        saveToStore({ stepsIndex: $store.stepsIndex + 1 });
      } else {
        alert("Failed to create news source. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Error creating news source: " + (err.message || err));
    } finally {
      isCreating = false;
      updateStepStore({ isCreatingNewsSource: false });
    }
  }
</script>

{#if isLoading}
  <LoadingScreen {messages} />
{/if}

{#if isSending}
  <LoadingScreen messages={["Connecting to email provider...", "Authenticating...", "Sending article..."]} />
{/if}

{#if isCreating}
  <LoadingScreen messages={["Creating news source...", "Saving configuration...", "Finalizing setup..."]} />
{/if}

<Centered>
  <div class="step-container" class:loading={isLoading}>
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="main-title">
          Preview
        </h1>
      </div>

      <div class="content-area" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        {#if !isGenerated}
          <div class="placeholder">
            <p>Ready to generate your first newsletter?</p>
            <button class="generate-btn" on:click={handleGenerate}>
              Generate Newsletter Email
            </button>
          </div>
        {:else}
          <div class="send-wrapper">
            <button class="send-btn" on:click={handleSend}>
              {isSent ? "Sent! Check your email" : "Send Test Email"}
            </button>
          </div>
          <div class="preview-box">
            {@html previewHtml}
          </div>
          <div class="actions">
            <button class="regenerate-btn" on:click={handleGenerate}>
              Regenerate
            </button>
          </div>
        {/if}
      </div>

      {#if isGenerated}
        <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 300, easing: quadOut }}>
          <SubmitButton callback={handleNext} />
        </div>
      {/if}
    {/if}
  </div>
</Centered>

<style lang="scss">
  .step-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem 0;
    gap: 2rem;
    
    &.loading {
      opacity: 0.5;
      pointer-events: none;
    }
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

  .content-area {
    /* Transparent */
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .placeholder {
    text-align: center;
    p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 1.5rem;
    }
  }

  .generate-btn, .regenerate-btn, .send-btn {
    padding: 0.8rem 2rem;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: #0062cc;
      transform: translateY(-2px);
    }
  }

  .regenerate-btn {
    background: #6c757d;
    &:hover { background: #5a6268; }
  }

  .send-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .send-btn {
    background: #28a745;
    &:hover { background: #218838; }
  }

  .preview-box {
    width: 100%;
    text-align: left;
    margin-bottom: 1.5rem;
    background: white; /* Preview box needs white bg */
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  .actions { display: flex; gap: 1rem; }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }

  :global(.impact-statement) {
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
</style>

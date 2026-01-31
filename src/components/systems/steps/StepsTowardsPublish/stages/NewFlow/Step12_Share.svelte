<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import store, { saveToStore } from "../../../../../store";
  import stepsStore from "./stepsStore";
  import { t } from "$lib/i18n/newflow-translations";
  import BulkAddUserSection from "../H_Dashboard/Users/BulkAddUserSection.svelte";
  import * as UserDataService from "../H_Dashboard/Users/UserDataService";

  export let canReveal = false;

  $: $t;

  $: shareLink = `https://aiban.news/subscribe?configuratorId=${$store.configuratorEmail}&newsSourceId=${$stepsStore.createdNewsSourceId || $store.createdNewsSourceId || ''}&lead=${encodeURIComponent($stepsStore.lead || $store.lead || '')}`;
  $: newsSourceId = $stepsStore.createdNewsSourceId || $store.createdNewsSourceId;

  function handleNext() {
    saveToStore({ stepsIndex: $store.stepsIndex + 1 });
  }

  function copyLink() {
    navigator.clipboard.writeText(shareLink);
    alert($t.step12.copied);
  }

  let isUploading = false;
  let feedbackMessage = "";
  let feedbackType = ""; // "success" | "error"

  async function handleBulkAdd(file: File | null) {
    if (!file) return;
    
    if (!newsSourceId) {
        feedbackMessage = "No News Source ID found.";
        feedbackType = "error";
        return;
    }

    feedbackMessage = "";
    isUploading = true;

    try {
      const result = await UserDataService.processBulkUpload(file, newsSourceId);
      if (result.errorMessage) {
          feedbackMessage = result.errorMessage;
          feedbackType = "error";
      } else {
          feedbackMessage = result.successMessage;
          feedbackType = "success";
      }
    } catch (error: any) {
      feedbackMessage = error.message || "Upload failed.";
      feedbackType = "error";
    } finally {
      isUploading = false;
      // Clear success message after some time
      if (feedbackType === "success") {
          setTimeout(() => {
              feedbackMessage = "";
          }, 5000);
      }
    }
  }
</script>

<Centered>
  <div class="step-container">
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="impact-statement">
          {$t.step12.title}
        </h1>
      </div>

      <div class="input-group" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        <p class="subtitle">
          {$t.step12.subtitle}
        </p>
        <div class="input-wrapper link-box">
          <code class="share-link">{shareLink}</code>
          <button class="copy-btn" on:click={copyLink}>{$t.step12.copy}</button>
        </div>

        {#if newsSourceId}
          <div class="bulk-add-wrapper">
             <BulkAddUserSection 
                {newsSourceId} 
                onUpload={handleBulkAdd} 
                disabled={isUploading} 
             />
             {#if feedbackMessage}
                <div class="feedback-message {feedbackType}">
                  {feedbackMessage}
                </div>
             {/if}
          </div>
        {/if}
      </div>

      <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 300, easing: quadOut }}>
        <SubmitButton callback={handleNext} />
      </div>
    {/if}
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

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
    color: #666;
    margin: 0 0 0.5rem 0;
    font-style: italic;
  }

  .input-wrapper {
    padding: 1rem 0;
  }

  .link-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .share-link {
    font-family: monospace;
    background: #f5f5f5;
    padding: 0.5rem;
    border-radius: 4px;
    overflow-x: auto;
    white-space: nowrap;
    max-width: 80%;
  }

  .copy-btn {
    padding: 0.5rem 1rem;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover { background: #0062cc; }
  }

  .bulk-add-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .feedback-message {
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-top: 0.5rem;

    &.success {
      background-color: #e8f5e9;
      color: #1b5e20;
      border: 1px solid #4caf50;
    }

    &.error {
      background-color: #ffebee;
      color: #c62828;
      border: 1px solid #f44336;
    }
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
</style>

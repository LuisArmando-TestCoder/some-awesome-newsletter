<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import store from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let isLoading = false;
  let errorMessage: string | null = null;
  let successMessage: string | null = null;

  async function subscribe() {
    isLoading = true;
    errorMessage = null;
    successMessage = null;

    const response = await fetch('/subscribe-widget/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: $store.widgetEmail,
        name: $store.widgetName,
        language: $store.widgetLanguage,
        configuratorId: $store.widgetConfiguratorId,
        newsSourceId: $store.widgetSelectedNewsSourceId,
      }),
    });

    isLoading = false;

    if (response.ok) {
      successMessage = "You have been subscribed successfully!";
      dispatch('subscriptionComplete');
    } else {
      const data = await response.json();
      errorMessage = data.error || "An unknown error occurred.";
    }
  }
</script>

<Centered>
  <MarkdownText>
    ### Please confirm your details:
  </MarkdownText>
  <div class="confirmation-details">
    <p><strong>Email:</strong> {$store.widgetEmail}</p>
    <p><strong>Name:</strong> {$store.widgetName}</p>
    <p><strong>Language:</strong> {$store.widgetLanguage}</p>
  </div>

  {#if successMessage}
    <p class="success">{successMessage}</p>
  {:else if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  <div class="right-align">
    <SubmitButton
      callback={subscribe}
      label="Subscribe"
      loading={isLoading}
      disabled={isLoading || !!successMessage}
    />
  </div>
</Centered>

<style>
  .confirmation-details {
    text-align: left;
    margin: 1rem 0;
    padding: 1rem;
    background-color: #f3f3f3;
    border-radius: 4px;
  }
  .right-align {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
</style>

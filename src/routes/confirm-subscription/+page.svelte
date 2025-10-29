<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import store from '../../components/store';

  let configId: string | null = null;
  let newsSourceId: string | null = null;
  let userEmail: string | null = null;
  let termsAccepted = false;
  let message = '';

  onMount(() => {
    const params = $page.url.searchParams;
    configId = params.get('configId');
    newsSourceId = params.get('newsSourceId');
    userEmail = params.get('userEmail');
  });

  async function confirmSubscription() {
    if (!termsAccepted) {
      message = 'You must accept the terms and conditions to subscribe.';
      return;
    }

    if (configId && newsSourceId && userEmail) {
      const apiURL = $store.apiURL();
      const response = await fetch(`${apiURL}/confirm-subscription?configId=${configId}&newsSourceId=${newsSourceId}&userEmail=${userEmail}`);
      const data = await response.json();

      if (response.ok) {
        message = data.message;
      } else {
        message = data.error;
      }
    } else {
      message = 'Invalid confirmation link.';
    }
  }
</script>

<div class="container">
  <div class="card">
    <h1>Confirm Your Subscription</h1>
    {#if message}
      <p>{message}</p>
      <a href="/" class="button">Go Back</a>
    {:else}
      <p>Please accept the terms and conditions to complete your subscription.</p>
      <div class="terms">
        <input type="checkbox" id="terms" bind:checked={termsAccepted} />
        <label for="terms">
          I accept the <a href="/legal/terms">Terms and Conditions</a> and
          <a href="/legal/privacy">Privacy Policy</a>.
        </label>
      </div>
      <button on:click={confirmSubscription}>Confirm Subscription</button>
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--c-bg-alt);
  }
  .card {
    max-width: 600px;
    padding: var(--space-xl);
    background: var(--c-bg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    text-align: center;
  }
  .terms {
    margin: var(--space-lg) 0;
  }
  .terms a {
    color: blue;
    text-decoration: none;
  }
  .terms a:hover {
    text-decoration: underline;
  }
  button, .button {
    display: inline-block;
    font-weight: 600;
    border-radius: var(--radius-md);
    padding: 0.75rem 1.5rem;
    text-align: center;
    transition: all var(--transition-fast);
    border: 2px solid transparent;
    cursor: pointer;
    background-color: var(--c-primary);
    color: var(--c-white);
  }
  button:hover, .button:hover {
    background-color: var(--c-primary-dark);
  }
</style>

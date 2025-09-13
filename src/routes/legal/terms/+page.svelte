<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { refreshAll } from '$lib/anim/gsap.client';

  onMount(() => {
    if (browser) {
      refreshAll();
    }
  });
</script>

<svelte:head>
  <title>Terms of Service • A I N L</title>
</svelte:head>

<div class="legal-page">
  <div class="container">
    <h1>Terms of Service</h1>
    <p>Last updated: August 10, 2025</p>

    <h2>1. Introduction</h2>
    <p>Welcome to A I N L! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.</p>

    <h2>2. Use of Our Services</h2>
    <p>You may use our services only in compliance with these Terms and all applicable laws. You agree not to misuse our services. For example, you may not interfere with our services or try to access them using a method other than the interface and the instructions that we provide.</p>

    <h2>3. Your Account</h2>
    <p>You may need to create an account to use some of our services. You are responsible for safeguarding your account, so use a strong password and limit its use to this account. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above.</p>

    <h2>4. Content</h2>
    <p>Our services may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the services, including its legality, reliability, and appropriateness.</p>

    <h2>5. Termination</h2>
    <p>We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

    <h2>6. Changes to These Terms</h2>
    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

    <h2>7. Contact Us</h2>
    <p>If you have any questions about these Terms, please contact us at support@A I N L.com.</p>
  </div>
</div>

<style lang="scss">
  @use '../../../styles/global.scss';
  @use '../../../styles/legal.scss';

  .legal-page {
    padding: var(--space-xl) 0;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: var(--space-md);
  }

  h2 {
    font-size: 1.75rem;
    margin-top: var(--space-lg);
    margin-bottom: var(--space-md);
  }

  p {
    margin-bottom: var(--space-md);
    line-height: 1.6;
  }
</style>

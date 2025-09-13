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
  <title>Privacy Policy • A I N L</title>
</svelte:head>

<div class="legal-page">
  <div class="container">
    <h1>Privacy Policy</h1>
    <p>Last updated: August 10, 2025</p>

    <h2>1. Introduction</h2>
    <p>Welcome to A I N L! This Privacy Policy explains how we collect, use, and disclose information about you. By using our services, you agree to the collection and use of information in accordance with this policy.</p>

    <h2>2. Information We Collect</h2>
    <p>We may collect personal information that you provide to us, such as your name, email address, and payment information. We may also collect information automatically as you navigate through the site.</p>

    <h2>3. How We Use Your Information</h2>
    <p>We use the information we collect to provide, maintain, and improve our services, to develop new services, and to protect A I N L and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.</p>

    <h2>4. Information Sharing</h2>
    <p>We do not share your personal information with companies, organizations, or individuals outside of A I N L except in the following cases: with your consent, for external processing, or for legal reasons.</p>

    <h2>5. Security</h2>
    <p>We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. In particular, we encrypt many of our services using SSL.</p>

    <h2>6. Changes to This Policy</h2>
    <p>We may revise this Privacy Policy from time to time. The most current version of the policy will govern our use of your information and will always be at this URL. If we make a change to this policy that, in our sole discretion, is material, we will notify you via an email to the email address associated with your account or by posting a notice on our website.</p>

    <h2>7. Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at support@A I N L.com.</p>
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

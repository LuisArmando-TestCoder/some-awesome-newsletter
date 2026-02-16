<script lang="ts">
  import { t } from '$lib/i18n/translations';
  const lastUpdated = "October 24, 2023";
  const contactEmail = "info@aiban.news";
</script>

<svelte:head>
  <title>Privacy Policy | AIBAN</title>
</svelte:head>

<main class="policy">
  <div class="policy__container">
    <header class="policy__header">
      <h1 class="policy__title">Privacy Policy</h1>
      <p class="policy__date">Last Updated: {lastUpdated}</p>
    </header>

    <section class="policy__content">
      <p class="policy__intro">
        At <strong>AIBAN</strong>, we take your privacy seriously. This policy outlines how we collect, use, and protect your data when you use our AI-driven news and dashboard services.
      </p>

      <div class="policy__section">
        <h2>1. Information We Collect</h2>
        <p>We collect information to provide better services to our users. This includes:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address (e.g., via {contactEmail}), and billing details.</li>
          <li><strong>Usage Data:</strong> How you interact with our AI news feeds and dashboard tools.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, and device information.</li>
        </ul>
      </div>

      <div class="policy__section">
        <h2>2. How We Use Your Data</h2>
        <p>Your data is used to:</p>
        <ul>
          <li>Personalize your AI news experience.</li>
          <li>Process payments for your subscription tier.</li>
          <li>Communicate system updates and security alerts.</li>
          <li>Improve our machine learning models (anonymized data only).</li>
        </ul>
      </div>

      <div class="policy__section">
        <h2>3. Data Security</h2>
        <p>
          We implement industry-standard encryption to protect your data. Your credentials and personal information are stored using secure hashing algorithms and are never shared with unauthorized third parties.
        </p>
      </div>

      <div class="policy__section">
        <h2>4. Your Rights (GDPR/CCPA)</h2>
        <p>Depending on your location, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request the deletion of your account and associated data.</li>
          <li>Opt-out of data processing for marketing purposes.</li>
        </ul>
      </div>

      <div class="policy__section">
        <h2>5. Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy or wish to exercise your data rights, please contact our legal department at:
        </p>
        <a href="mailto:{contactEmail}" class="policy__link">{contactEmail}</a>
      </div>
    </section>
  </div>
</main>

<style lang="scss">
  .policy {
    padding: 120px 24px;
    background: #ffffff;
    color: #1a1a1a;
    line-height: 1.6;
    font-family: 'Inter', sans-serif;

    &__container {
      max-width: 800px;
      margin: 0 auto;
    }

    &__header {
      margin-bottom: 64px;
      border-bottom: 1px solid #eee;
      padding-bottom: 24px;
    }

    &__title {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }

    &__date {
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &__section {
      margin-bottom: 48px;

      h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 16px;
        color: #000;
      }

      ul {
        padding-left: 20px;
        margin-top: 12px;
        
        li {
          margin-bottom: 8px;
          &::marker {
            color: var(--c-primary, #3b82f6);
          }
        }
      }
    }

    &__link {
      color: var(--c-primary, #3b82f6);
      font-weight: 600;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: border-color 0.2s;

      &:hover {
        border-color: var(--c-primary, #3b82f6);
      }
    }

    &__intro {
      font-size: 1.125rem;
      color: #444;
      margin-bottom: 40px;
    }
  }

  @media (max-width: 768px) {
    .policy__title { font-size: 2.25rem; }
  }
</style>
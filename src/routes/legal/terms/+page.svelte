<script lang="ts">
  const lastUpdated = "January 06, 2026";
  const contactEmail = "oriens@aiban.news";
</script>

<svelte:head>
  <title>Terms of Service | AIBAN</title>
</svelte:head>

<main class="terms">
  <div class="terms__container">
    <header class="terms__header">
      <h1 class="terms__title">Terms of Service</h1>
      <p class="terms__date">Last Updated: {lastUpdated}</p>
    </header>

    <section class="terms__content">
      <p class="terms__intro">
        By accessing or using <strong>AIBAN</strong>, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our dashboard or AI news services.
      </p>

      <div class="terms__section">
        <h2>1. Account Registration</h2>
        <p>To access certain features (Starter, Growth, Pro, or Master plans), you must register for an account. You are responsible for:</p>
        <ul>
          <li>Maintaining the confidentiality of your credentials.</li>
          <li>All activities that occur under your account.</li>
          <li>Providing accurate billing information for paid tiers.</li>
        </ul>
      </div>

      <div class="terms__section">
        <h2>2. Use of AI Services</h2>
        <p>Our AI-driven news engine provides automated summaries and analysis. You understand that:</p>
        <ul>
          <li>AI-generated content is for informational purposes only.</li>
          <li>AIBAN is not liable for inaccuracies in third-party news sources.</li>
          <li>You may not use our services to generate spam or malicious content.</li>
        </ul>
      </div>

      <div class="terms__section">
        <h2>3. Payments and Refunds</h2>
        <p>
          Subscription fees are billed in advance on a monthly or yearly basis (with a 35% discount applied to annual plans). 
          Refunds are handled on a case-by-case basis through our billing department.
        </p>
      </div>

      <div class="terms__section">
        <h2>4. Intellectual Property</h2>
        <p>
          All software, design, and AI models powering AIBAN are the exclusive property of AIBAN. 
          Users are granted a limited, non-transferable license to access the dashboard according to their subscription level.
        </p>
      </div>

      <div class="terms__section">
        <h2>5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate our usage policies or fail to maintain active payment methods for premium tiers.
        </p>
      </div>

      <div class="terms__section">
        <h2>6. Contact Legal</h2>
        <p>
          For questions regarding these terms, please reach out to our legal team:
        </p>
        <a href="mailto:{contactEmail}" class="terms__link">{contactEmail}</a>
      </div>
    </section>
  </div>
</main>

<style lang="scss">
  .terms {
    padding: 120px 24px;
    background: #ffffff;
    color: #1a1a1a;
    line-height: 1.6;
    font-family: 'Inter', system-ui, sans-serif;

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
          margin-bottom: 10px;
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
      transition: all 0.2s;

      &:hover {
        border-color: var(--c-primary, #3b82f6);
      }
    }

    &__intro {
      font-size: 1.125rem;
      color: #444;
      margin-bottom: 40px;
      font-style: italic;
    }
  }

  @media (max-width: 768px) {
    .terms__title { font-size: 2.25rem; }
  }
</style>
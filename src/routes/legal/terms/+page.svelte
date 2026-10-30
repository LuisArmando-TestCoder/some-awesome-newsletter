<script lang="ts">
  import { t } from '$lib/i18n/translations';
  const lastUpdated = 'January 6, 2026';
  const contactEmail = 'info@aiban.news';
  const CANONICAL = 'https://aibanewsletter.club/legal/terms';
  $: lg = $t?.legal ?? {};
  $: TITLE = lg.terms?.metaTitle ?? 'Terms of service | AIBAN';
  $: DESCRIPTION = lg.terms?.metaDescription ?? 'The terms that apply when you create an account and use AIBAN.';
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <link rel="canonical" href={CANONICAL} />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESCRIPTION} />
  <meta property="og:url" content={CANONICAL} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<main>
  <h1>{lg.terms?.title ?? 'Terms of service'}</h1>
  <p class="legal-date">{(lg.lastUpdated ?? 'Last updated: {date}').replace('{date}', lastUpdated)}</p>

  <p>
    By accessing or using AIBAN, you agree to be bound by these terms of service. If you do not agree to these
    terms, please do not use our dashboard or AI news services.
  </p>

  <h2>1. Account registration</h2>
  <p>
    To access certain features (Starter, Growth, Pro or Master plans), you must register for an account. You
    are responsible for:
  </p>
  <ul>
    <li>Keeping your credentials confidential.</li>
    <li>All activity that occurs under your account.</li>
    <li>Providing accurate billing information for paid plans.</li>
  </ul>

  <h2>2. Use of AI services</h2>
  <p>Our AI news engine produces automated summaries and analysis. You understand that:</p>
  <ul>
    <li>AI-generated content is for informational purposes only.</li>
    <li>AIBAN is not liable for inaccuracies in third-party news sources.</li>
    <li>You may not use our services to generate spam or malicious content.</li>
  </ul>

  <h2>3. Payments and refunds</h2>
  <p>
    Subscription fees are billed in advance on a monthly or yearly basis, with a 35% discount applied to
    yearly plans. Refunds are handled case by case through our billing department.
  </p>

  <h2>4. Intellectual property</h2>
  <p>
    All software, design and AI models powering AIBAN are the exclusive property of AIBAN. Users are granted a
    limited, non-transferable license to access the dashboard according to their subscription level.
  </p>

  <h2>5. Termination</h2>
  <p>
    We reserve the right to suspend or terminate accounts that violate our usage policies or fail to keep an
    active payment method for paid plans.
  </p>

  <h2>6. Contact</h2>
  <p>
    For questions about these terms, write to <a href="mailto:{contactEmail}">{contactEmail}</a>.
  </p>
</main>

<script lang="ts">
  import { t } from '$lib/i18n/translations';
  const lastUpdated = 'October 24, 2023';
  const contactEmail = 'info@aiban.news';
  const CANONICAL = 'https://aibanewsletter.club/legal/privacy';
  $: lg = $t?.legal ?? {};
  $: TITLE = lg.privacy?.metaTitle ?? 'Privacy policy | AIBAN';
  $: DESCRIPTION = lg.privacy?.metaDescription ?? 'How AIBAN collects, uses and protects your data, and how to exercise your data rights.';
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
  <h1>{lg.privacy?.title ?? 'Privacy policy'}</h1>
  <p class="legal-date">{(lg.lastUpdated ?? 'Last updated: {date}').replace('{date}', lastUpdated)}</p>

  <p>
    At AIBAN, we take your privacy seriously. This policy explains how we collect, use and protect your data
    when you use our AI news and dashboard services.
  </p>

  <h2 id="information-we-collect"><a class="legal-anchor" href="#information-we-collect">1. Information we collect</a></h2>
  <p>We collect information to provide our services to you. This includes:</p>
  <ul>
    <li>Account information: name, email address and billing details.</li>
    <li>Usage data: how you interact with our AI news feeds and dashboard tools.</li>
    <li>Technical data: IP address, browser type and device information.</li>
  </ul>

  <h2 id="how-we-use-your-data"><a class="legal-anchor" href="#how-we-use-your-data">2. How we use your data</a></h2>
  <p>We use your data to:</p>
  <ul>
    <li>Personalize your AI news experience.</li>
    <li>Process payments for your subscription plan.</li>
    <li>Send you system updates and security alerts.</li>
    <li>Improve our machine learning models (anonymized data only).</li>
  </ul>

  <h2 id="data-security"><a class="legal-anchor" href="#data-security">3. Data security</a></h2>
  <p>
    We use industry-standard encryption to protect your data. Your credentials and personal information are
    stored using secure hashing algorithms and are never shared with unauthorized third parties.
  </p>

  <h2 id="your-rights"><a class="legal-anchor" href="#your-rights">4. Your rights (GDPR and CCPA)</a></h2>
  <p>Depending on where you live, you have the right to:</p>
  <ul>
    <li>Access the personal data we hold about you.</li>
    <li>Request the deletion of your account and associated data.</li>
    <li>Opt out of data processing for marketing purposes.</li>
  </ul>

  <h2 id="contact-us"><a class="legal-anchor" href="#contact-us">5. Contact us</a></h2>
  <p>
    If you have questions about this privacy policy or want to exercise your data rights, contact us at
    <a href="mailto:{contactEmail}">{contactEmail}</a>.
  </p>
</main>

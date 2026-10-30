<script lang="ts">
  import { t } from '$lib/i18n/translations';

  const CANONICAL = 'https://aibanewsletter.club/about';
  const GITHUB = 'https://github.com/LuisArmando-TestCoder';

  $: a = $t?.about ?? {};
  $: metaTitle = a.metaTitle ?? 'About | AIBAN';
  $: metaDescription = a.metaDescription ?? '';
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href={CANONICAL} />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:url" content={CANONICAL} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<main class="page">
  <header class="page__hero">
    <p class="page__eyebrow">{a.eyebrow ?? 'About'}</p>
    <h1 class="page__title">{a.title ?? 'About AIBAN'}</h1>
    <p class="page__lead">{a.lead ?? ''}</p>
  </header>

  <section class="section" aria-labelledby="what-title">
    <h2 id="what-title" class="section__title">{a.whatTitle ?? 'What AIBAN does'}</h2>
    {#each a.whatBody ?? [] as paragraph, itemIndex (itemIndex)}
      <p>{paragraph}</p>
    {/each}
    <div class="actions">
      <a class="btn btn--primary" href="/start">{a.startCta ?? 'Start free'}</a>
      <a class="btn btn--tertiary" href="/help">{a.helpCta ?? 'Read the help center'}</a>
    </div>
  </section>

  <section class="section" aria-labelledby="who-title">
    <h2 id="who-title" class="section__title">{a.whoTitle ?? 'Who makes it'}</h2>
    {#each a.whoBody ?? [] as paragraph, itemIndex (itemIndex)}
      <p>{paragraph}</p>
    {/each}
    <a class="btn btn--tertiary" href={GITHUB} target="_blank" rel="noopener noreferrer">
      {a.githubLabel ?? 'Luis on GitHub'}<span class="visually-hidden"> {a.newTab ?? '(opens in a new tab)'}</span>
    </a>
  </section>

  {#if a.projects?.length}
    <section class="section" aria-labelledby="projects-title">
      <h2 id="projects-title" class="section__title">{a.projectsTitle ?? 'Open source work by the founder'}</h2>
      <ul class="projects">
        {#each a.projects as project, itemIndex (itemIndex)}
          <li class="project">
            <h3 class="project__name">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}<span class="visually-hidden"> {a.newTab ?? '(opens in a new tab)'}</span>
              </a>
            </h3>
            <p class="project__desc">{project.desc}</p>
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  <section class="section contact" aria-labelledby="contact-title">
    <h2 id="contact-title" class="section__title">{a.contactTitle ?? 'Get in touch'}</h2>
    <p>{a.contactBody ?? ''}</p>
    <a class="btn btn--secondary" href="mailto:info@aiban.news">{a.emailCta ?? 'Email info@aiban.news'}</a>
  </section>
</main>

<style lang="scss">
  .page {
    max-width: var(--container-md, 880px);
    margin: 0 auto;
    padding: var(--space-8, 64px) var(--space-4, 16px) var(--space-10, 128px);
    color: var(--text-1, #0f172a);
    font-family: var(--font-body, inherit);
  }

  .page__hero { margin-bottom: var(--space-8, 64px); }

  .page__eyebrow {
    margin: 0 0 var(--space-2, 8px);
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-2, #475569);
  }

  .page__title {
    margin: 0 0 var(--space-4, 16px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-3xl, 2.5rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.15);
  }

  .page__lead {
    margin: 0;
    max-width: 60ch;
    font-size: var(--fs-lg, 1.125rem);
    line-height: var(--lh-normal, 1.6);
    color: var(--text-2, #475569);
  }

  .section { margin-bottom: var(--space-8, 64px); }

  .section__title {
    margin: 0 0 var(--space-4, 16px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-2xl, 1.75rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.2);
  }

  .section p {
    margin: 0 0 var(--space-4, 16px);
    max-width: 68ch;
    font-size: var(--fs-md, 1rem);
    line-height: var(--lh-normal, 1.7);
    color: var(--text-2, #475569);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3, 12px);
    margin-top: var(--space-5, 24px);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: var(--space-2, 8px) var(--space-5, 24px);
    border-radius: var(--radius-full, 999px);
    border: 1px solid transparent;
    font-size: var(--fs-md, 1rem);
    font-weight: var(--fw-semibold, 600);
    text-decoration: none;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &--primary {
      background: var(--accent, #4f46e5);
      color: var(--accent-contrast, #fff);
      &:hover { background: var(--accent-hover, #4338ca); }
    }

    &--secondary {
      background: var(--surface-1, #fff);
      color: var(--text-1, #0f172a);
      border-color: var(--border-2, #cbd5e1);
      &:hover { background: var(--surface-2, #f1f5f9); }
    }

    &--tertiary {
      padding-inline: var(--space-2, 8px);
      color: var(--text-link, #4338ca);
      &:hover { text-decoration: underline; }
    }
  }

  a:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn { transition: none; }
  }
  .projects {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-4, 16px);
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .project {
    position: relative;
    padding: var(--space-5, 24px);
    border: 1px solid var(--border-1, #e5e7eb);
    border-radius: var(--radius-lg, 14px);
    background: var(--surface-1, #fff);
    transition: border-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &:hover { border-color: var(--border-2, #cbd5e1); }
  }

  .project__name {
    margin: 0 0 var(--space-2, 8px);
    font-size: var(--fs-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);

    a {
      color: var(--text-1, #0f172a);
      text-decoration: none;
      &::after { content: ''; position: absolute; inset: 0; border-radius: inherit; }
      &:hover { color: var(--text-link, #4338ca); }
    }
  }

  .section .project__desc { margin: 0; font-size: var(--fs-sm, 0.875rem); }

  .project:focus-within { outline: 2px solid var(--focus-color, #6366f1); outline-offset: 2px; }
  .project__name a:focus-visible { outline: none; }

  .contact {
    padding: var(--space-6, 32px);
    border-radius: var(--radius-lg, 14px);
    background: var(--surface-2, #f1f5f9);
    margin-bottom: 0;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>

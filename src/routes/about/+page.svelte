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

<main class="about">
  <header class="wrap page-hero">
    <p class="page-eyebrow rise">{a.eyebrow ?? 'About'}</p>
    <h1 class="page-title rise rise-2">{a.title ?? 'About AIBAN'}</h1>
    <p class="page-lede about__lede rise rise-3">{a.lead ?? ''}</p>
  </header>

  <!-- 01 What it does: title hangs left, reading column right (5/7). -->
  <section class="chapter" aria-labelledby="what-title">
    <div class="wrap split">
      <h2 id="what-title" class="chapter__title">{a.whatTitle ?? 'What AIBAN does'}</h2>
      <div class="split__body">
        {#each a.whatBody ?? [] as paragraph, itemIndex (itemIndex)}
          <p class="prose">{paragraph}</p>
        {/each}
        <div class="actions">
          <a class="cta" href="/start" data-cta="about">{a.startCta ?? 'Start free'}</a>
          <a class="more" href="/help">{a.helpCta ?? 'Read the help center'} <span class="more__arrow" aria-hidden="true">&#8250;</span></a>
        </div>
      </div>
    </div>
  </section>

  <!-- 02 Who makes it -->
  <section class="chapter" aria-labelledby="who-title">
    <div class="wrap split">
      <h2 id="who-title" class="chapter__title">{a.whoTitle ?? 'Who makes it'}</h2>
      <div class="split__body">
        {#each a.whoBody ?? [] as paragraph, itemIndex (itemIndex)}
          <p class="prose">{paragraph}</p>
        {/each}
        <a class="more" href={GITHUB} target="_blank" rel="noopener noreferrer">
          {a.githubLabel ?? 'Luis on GitHub'}<span class="sr-only"> {a.newTab ?? '(opens in a new tab)'}</span>
          <span class="more__arrow more__arrow--out" aria-hidden="true">&#8599;</span>
        </a>
      </div>
    </div>

    {#if a.projects?.length}
      <div class="wrap projects-wrap">
        <h3 id="projects-title" class="projects__title">{a.projectsTitle ?? 'Open source work by the founder'}</h3>
        <ul class="projects" aria-labelledby="projects-title">
          {#each a.projects as project, itemIndex (itemIndex)}
            <li class="project">
              <p class="project__num" aria-hidden="true">{String(itemIndex + 1).padStart(2, '0')}</p>
              <h4 class="project__name">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}<span class="sr-only"> {a.newTab ?? '(opens in a new tab)'}</span>
                </a>
              </h4>
              <p class="project__desc">{project.desc}</p>
              <span class="project__arrow" aria-hidden="true">&#8599;</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>

  <!-- 03 Contact: one large, quiet line. -->
  <section class="chapter chapter--last" aria-labelledby="contact-title">
    <div class="wrap split">
      <h2 id="contact-title" class="chapter__title">{a.contactTitle ?? 'Get in touch'}</h2>
      <div class="split__body">
        <p class="prose">{a.contactBody ?? ''}</p>
        <a class="mail" href="mailto:info@aiban.news">
          {a.emailCta ?? 'Email info@aiban.news'} <span class="more__arrow" aria-hidden="true">&#8250;</span>
        </a>
      </div>
    </div>
  </section>
</main>

<style lang="scss">
  .about {
    color: var(--text-1);
    font-family: var(--font-body);
    overflow-x: clip;
  }

  .wrap {
    width: 100%;
    max-width: var(--container-xl);
    margin-inline: auto;
    padding-inline: var(--gutter);
  }

  .about__lede {
    max-width: 34ch;
  }

  /* Chapters: one idea each, hairline between them. */
  .chapter {
    padding-block: calc(var(--section-pad) * 0.6);
    border-top: 1px solid var(--border-1);
  }
  .chapter--last {
    padding-bottom: var(--section-pad);
  }

  .split {
    display: grid;
    gap: var(--space-5) var(--space-8);
  }
  @media (min-width: 56rem) {
    .split {
      grid-template-columns: 5fr 7fr;
      align-items: start;
    }
  }

  .chapter__title {
    margin: 0;
    max-width: 14ch;
    font-family: var(--font-display);
    font-size: var(--fs-4xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
    color: var(--text-1);
  }

  .split__body {
    min-width: 0;
    max-width: var(--measure);
  }

  .prose {
    margin: 0 0 var(--space-5);
    font-size: var(--fs-lg);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4) var(--space-6);
    margin-top: var(--space-6);
  }

  /* Primary CTA: the solid ink pill, same label and target as the header. */
  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.5rem;
    padding: 0 var(--space-6);
    border-radius: var(--radius-full);
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    letter-spacing: -0.01em;
    text-decoration: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .cta:hover {
      background: var(--accent-hover);
      transition-duration: var(--t-in);
    }
  }
  .cta:active {
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  /* Secondary: a text link with a chevron that nudges on hover. */
  .more,
  .mail {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 2.75rem;
    color: var(--text-1);
    font-weight: var(--fw-medium);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.25em;
    border-radius: var(--radius-sm);
    transition:
      text-decoration-color var(--t-out) var(--ease-out),
      text-decoration-thickness var(--t-out) var(--ease-out);
  }
  .more {
    font-size: var(--fs-md);
  }
  .mail {
    margin-top: var(--space-2);
    font-family: var(--font-display);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    overflow-wrap: anywhere;
  }
  .more__arrow {
    display: inline-block;
    transition: transform var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .more:hover,
    .mail:hover {
      text-decoration-color: currentColor;
      text-decoration-thickness: 2px;
      transition-duration: var(--t-in);
    }
    .more:hover .more__arrow,
    .mail:hover .more__arrow {
      transform: translateX(3px);
      transition-duration: var(--t-in);
    }
    .more:hover .more__arrow--out {
      transform: translate(2px, -2px);
    }
  }
  .more:active,
  .mail:active {
    opacity: 0.7;
    transition-duration: 0ms;
  }

  .cta:focus-visible,
  .more:focus-visible,
  .mail:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  /* Open source work: clickable cards, one real link stretched over each. */
  .projects-wrap {
    margin-top: var(--space-9);
  }
  .projects__title {
    margin: 0 0 var(--space-5);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    letter-spacing: 0;
    color: var(--text-3);
  }
  .projects {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-4);
  }
  @media (min-width: 48rem) {
    .projects {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .project {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 15rem;
    padding: var(--space-5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    background: var(--surface-0);
    transition:
      transform var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out);
  }
  .project__num {
    margin: 0 0 auto;
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
    color: var(--text-3);
  }
  .project__name {
    margin: var(--space-7) 0 var(--space-2);
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .project__name a {
    color: var(--text-1);
    text-decoration: none;
    outline: none;
  }
  .project__name a::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  .project__name a:focus-visible::after {
    box-shadow: var(--focus-ring);
  }
  .project__desc {
    margin: 0;
    padding-right: var(--space-6);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }
  .project__arrow {
    position: absolute;
    top: var(--space-5);
    right: var(--space-5);
    font-size: var(--fs-lg);
    color: var(--text-3);
    transition:
      transform var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .project:hover {
      transform: translateY(-2px);
      border-color: var(--border-2);
      transition-duration: var(--t-in);
    }
    .project:hover .project__arrow {
      transform: translate(2px, -2px);
      color: var(--text-1);
    }
    .project:hover .project__name a {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }
  .project:active {
    transform: scale(0.99);
    transition-duration: 60ms;
  }

  /* Reduced motion: no scale or lift, the state colors stay. */
  @media (prefers-reduced-motion: reduce) {
    .cta:active,
    .project:active,
    .project:hover {
      transform: none;
    }
  }
  :global(:root[data-motion='reduced']) .cta:active,
  :global(:root[data-motion='reduced']) .project:active,
  :global(:root[data-motion='reduced']) .project:hover {
    transform: none;
  }

  @media (forced-colors: active) {
    .project {
      border-color: CanvasText;
    }
  }
</style>

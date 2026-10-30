<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { t } from '$lib/i18n/translations';
  import '../../styles/legal.scss';

  $: lg = $t?.legal ?? {};
  $: LINKS = [
    { href: '/legal/privacy', label: lg.privacy?.title ?? 'Privacy policy' },
    { href: '/legal/terms', label: lg.terms?.title ?? 'Terms of service' },
    { href: '/legal/cookies', label: lg.cookies?.title ?? 'Cookie policy' }
  ];

  /** Contents list, built from the page's own h2 headings (the legal text is not touched). */
  const TOC_MIN = 4;
  let doc: HTMLElement;
  let toc: { id: string; label: string }[] = [];
  let activeId = '';
  let io: IntersectionObserver | null = null;

  async function buildToc() {
    await tick();
    io?.disconnect();
    io = null;
    const headings = Array.from(doc?.querySelectorAll<HTMLElement>('h2[id]') ?? []);
    toc = headings.map((h) => ({ id: h.id, label: (h.textContent ?? '').trim() }));
    activeId = decodeURIComponent(location.hash.slice(1)) || toc[0]?.id || '';
    if (typeof IntersectionObserver === 'undefined' || toc.length < TOC_MIN) return;
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeId = entry.target.id;
        }
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    headings.forEach((h) => io?.observe(h));
  }

  // Runs after the first render and after every move between the three policies.
  afterNavigate(buildToc);
  onDestroy(() => io?.disconnect());
</script>

<div class="legal">
  <div class="legal__wrap">
    <nav class="legal__tabs" aria-label={lg.navLabel ?? 'Legal documents'}>
      <ul>
        {#each LINKS as link (link.href)}
          {@const active = $page.url.pathname === link.href}
          <li>
            <a href={link.href} class="legal__tab" aria-current={active ? 'page' : undefined}>
              {#if active}<span class="legal__tab-dot" aria-hidden="true"></span>{/if}
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="legal__grid">
      <aside class="legal__toc">
        {#if toc.length >= TOC_MIN}
          <nav aria-labelledby="legal-toc-title">
            <p id="legal-toc-title" class="legal__toc-title">{lg.onThisPage ?? 'On this page'}</p>
            <ol>
              {#each toc as item (item.id)}
                <li>
                  <a
                    href={`#${item.id}`}
                    aria-current={activeId === item.id ? 'location' : undefined}
                    on:click={() => (activeId = item.id)}
                  >{item.label}</a>
                </li>
              {/each}
            </ol>
          </nav>
        {/if}
      </aside>

      <div class="legal__doc" bind:this={doc}>
        <slot />
      </div>
    </div>
  </div>
</div>

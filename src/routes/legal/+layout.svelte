<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n/translations';

  $: lg = ($t as any)?.legal ?? {};
  $: LINKS = [
    { href: '/legal/privacy', label: lg.privacy?.title ?? 'Privacy policy' },
    { href: '/legal/terms', label: lg.terms?.title ?? 'Terms of service' },
    { href: '/legal/cookies', label: lg.cookies?.title ?? 'Cookie policy' }
  ];
</script>

<div class="legal">
  <nav class="legal__nav" aria-label={lg.navLabel ?? 'Legal documents'}>
    <ul>
      {#each LINKS as link}
        {@const active = $page.url.pathname === link.href}
        <li>
          <a href={link.href} class:active aria-current={active ? 'page' : undefined}>{link.label}</a>
        </li>
      {/each}
    </ul>
  </nav>
  <slot />
</div>

<style lang="scss">
  .legal {
    max-width: var(--container-sm, 760px);
    margin: 0 auto;
    padding: var(--space-7, 48px) var(--space-4, 16px) var(--space-10, 128px);
    color: var(--text-1, #0f172a);
    font-family: var(--font-body, inherit);
    line-height: var(--lh-normal, 1.7);
  }

  .legal__nav {
    margin-bottom: var(--space-7, 48px);

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2, 8px);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      display: inline-flex;
      min-height: 36px;
      align-items: center;
      padding: var(--space-1, 4px) var(--space-3, 12px);
      border: 1px solid var(--border-1, #e5e7eb);
      border-radius: var(--radius-full, 999px);
      color: var(--text-2, #475569);
      font-size: var(--fs-sm, 0.875rem);
      text-decoration: none;

      &:hover { background: var(--surface-2, #f1f5f9); color: var(--text-1, #0f172a); }

      &.active {
        background: var(--accent-soft, #eef2ff);
        border-color: var(--accent, #4f46e5);
        color: var(--text-1, #0f172a);
        font-weight: var(--fw-semibold, 600);
      }
    }
  }

  .legal :global(h1) {
    margin: 0 0 var(--space-2, 8px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-3xl, 2.5rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.15);
  }

  .legal :global(.legal-date) {
    margin: 0 0 var(--space-7, 48px);
    padding-bottom: var(--space-5, 24px);
    border-bottom: 1px solid var(--border-1, #e5e7eb);
    color: var(--text-3, #64748b);
    font-size: var(--fs-sm, 0.875rem);
  }

  .legal :global(h2) {
    margin: var(--space-7, 48px) 0 var(--space-3, 12px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-xl, 1.375rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.25);
  }

  .legal :global(h3) {
    margin: var(--space-5, 24px) 0 var(--space-2, 8px);
    font-size: var(--fs-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);
  }

  .legal :global(p),
  .legal :global(li) {
    color: var(--text-2, #475569);
    font-size: var(--fs-md, 1rem);
  }

  .legal :global(p) { margin: 0 0 var(--space-4, 16px); }

  .legal :global(ul) {
    margin: 0 0 var(--space-4, 16px);
    padding-left: var(--space-5, 24px);
  }

  .legal :global(li) { margin-bottom: var(--space-2, 8px); }

  .legal :global(main a) { color: var(--text-link, #4338ca); }

  .legal :global(a:focus-visible) {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  .legal :global(.legal-table-wrap) {
    overflow-x: auto;
    margin: 0 0 var(--space-5, 24px);
    border: 1px solid var(--border-1, #e5e7eb);
    border-radius: var(--radius-md, 10px);
  }

  .legal :global(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--fs-sm, 0.875rem);
  }

  .legal :global(th),
  .legal :global(td) {
    padding: var(--space-3, 12px);
    text-align: left;
    border-bottom: 1px solid var(--border-1, #e5e7eb);
    vertical-align: top;
  }

  .legal :global(th) {
    background: var(--surface-2, #f1f5f9);
    color: var(--text-1, #0f172a);
    font-weight: var(--fw-semibold, 600);
  }

  .legal :global(tr:last-child td) { border-bottom: none; }

  .legal :global(code) {
    font-family: var(--font-mono, monospace);
    font-size: var(--fs-xs, 0.8125rem);
  }
</style>

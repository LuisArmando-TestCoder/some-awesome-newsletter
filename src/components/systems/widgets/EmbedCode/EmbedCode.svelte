<!--
  Owner-facing card: share link, script embed, iframe embed and a live preview of the signup form.
  Owner: WS5. Mount it once per newsletter (news source), e.g. in the dashboard's subscribers or share area.
  <EmbedCode configuratorId={email} newsSourceId={id} brandColor={config.brandColor} lead={siteUrl} />
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ts } from '$lib/i18n/subscribe-translations';
  import { sanitizeColor } from '../Subscribe/subscribe';

  export let configuratorId: string | null = null;
  export let newsSourceId: string | null = null;
  export let lead: string | null = null;
  export let brandColor: string | null = null;

  type Theme = 'auto' | 'light' | 'dark';
  type Layout = 'full' | 'compact';

  let origin = 'https://www.aiban.news';
  let accent = sanitizeColor(brandColor) ?? '#1f5c4f';
  let theme: Theme = 'auto';
  let layout: Layout = 'full';
  let copied: string | null = null;
  let copyError: string | null = null;
  let previewSrc = '';
  let previewTimer: ReturnType<typeof setTimeout> | undefined;

  const uid = Math.random().toString(36).slice(2, 8);

  onMount(() => {
    origin = window.location.origin.startsWith('http://localhost') ? window.location.origin : window.location.origin || origin;
  });

  $: ready = !!configuratorId && !!newsSourceId;
  $: accentParam = (sanitizeColor(accent) ?? '#1f5c4f').slice(1);
  $: shareParams = ready
    ? new URLSearchParams({
        configuratorId: configuratorId as string,
        newsSourceId: newsSourceId as string,
        ...(lead ? { lead } : {}),
      })
    : null;
  $: shareLink = shareParams ? `${origin}/subscribe?${shareParams}` : '';
  $: widgetParams = ready
    ? new URLSearchParams({
        configuratorId: configuratorId as string,
        newsSourceId: newsSourceId as string,
        layout,
        theme,
        accent: accentParam,
      })
    : null;
  $: widgetUrl = widgetParams ? `${origin}/subscribe-widget?${widgetParams}` : '';
  $: scriptSnippet = ready
    ? [
        `<div data-aiban-subscribe`,
        `  data-configurator-id="${attr(configuratorId as string)}"`,
        `  data-news-source-id="${attr(newsSourceId as string)}"`,
        `  data-layout="${layout}" data-theme="${theme}" data-accent="${accentParam}"></div>`,
        `<script async src="${origin}/subscribe-widget/embed.js"></` + `script>`,
      ].join('\n')
    : '';
  $: iframeSnippet = ready
    ? `<iframe src="${attr(widgetUrl)}" title="Newsletter signup form" width="100%" height="${layout === 'compact' ? 240 : 480}" style="border:0;max-width:560px;" loading="lazy"></iframe>`
    : '';

  // Reload the preview only after the owner stops changing options.
  $: schedulePreview(widgetUrl);

  function schedulePreview(url: string) {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => (previewSrc = url), 400);
  }

  function attr(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  async function copy(text: string, key: string) {
    copyError = null;
    try {
      await navigator.clipboard.writeText(text);
      copied = key;
      setTimeout(() => {
        if (copied === key) copied = null;
      }, 2000);
    } catch {
      copyError = key;
    }
  }
</script>

<section class="embed-code" aria-labelledby={`embed-title-${uid}`}>
  <header class="embed-code__header">
    <h2 class="embed-code__title" id={`embed-title-${uid}`}>{$ts.embed.title}</h2>
    <p class="embed-code__text">{$ts.embed.intro}</p>
  </header>

  {#if !ready}
    <p class="embed-code__text">{$ts.embed.missing}</p>
  {:else}
    <div class="embed-code__grid">
      <div class="embed-code__col">
        <div class="embed-code__block">
          <div class="embed-code__label-row">
            <label class="embed-code__label" for={`embed-link-${uid}`}>{$ts.embed.linkLabel}</label>
            <button class="embed-code__copy" class:is-done={copied === 'link'} type="button" on:click={() => copy(shareLink, 'link')}>
              {#if copied === 'link'}
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" /></svg>
                {$ts.embed.copied}
              {:else}
                <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="8.5" height="8.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M10.5 2.5h-6a2 2 0 0 0-2 2v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
                {$ts.embed.copy}
              {/if}
            </button>
          </div>
          <input class="embed-code__input" id={`embed-link-${uid}`} type="text" readonly value={shareLink} on:focus={(e) => e.currentTarget.select()} />
          <p class="embed-code__hint" class:is-error={copyError === 'link'}>{copyError === 'link' ? $ts.embed.copyFailed : $ts.embed.linkHint}</p>
        </div>

        <fieldset class="embed-code__options">
          <legend class="embed-code__label">{$ts.embed.options}</legend>
          <div class="embed-code__option">
            <label for={`embed-accent-${uid}`}>{$ts.embed.accent}</label>
            <input id={`embed-accent-${uid}`} class="embed-code__color" type="color" bind:value={accent} />
          </div>
          <div class="embed-code__option">
            <label for={`embed-theme-${uid}`}>{$ts.embed.theme}</label>
            <select id={`embed-theme-${uid}`} class="embed-code__input" bind:value={theme}>
              <option value="auto">{$ts.embed.themeAuto}</option>
              <option value="light">{$ts.embed.themeLight}</option>
              <option value="dark">{$ts.embed.themeDark}</option>
            </select>
          </div>
          <div class="embed-code__option">
            <label for={`embed-layout-${uid}`}>{$ts.embed.layout}</label>
            <select id={`embed-layout-${uid}`} class="embed-code__input" bind:value={layout}>
              <option value="full">{$ts.embed.layoutFull}</option>
              <option value="compact">{$ts.embed.layoutCompact}</option>
            </select>
          </div>
          <p class="embed-code__hint">{$ts.embed.accentHint}</p>
        </fieldset>

        <div class="embed-code__block">
          <div class="embed-code__label-row">
            <span class="embed-code__label" id={`embed-script-${uid}`}>{$ts.embed.scriptLabel}</span>
            <button class="embed-code__copy" class:is-done={copied === 'script'} type="button" on:click={() => copy(scriptSnippet, 'script')}>
              {#if copied === 'script'}
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" /></svg>
                {$ts.embed.copied}
              {:else}
                <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="8.5" height="8.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M10.5 2.5h-6a2 2 0 0 0-2 2v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
                {$ts.embed.copy}
              {/if}
            </button>
          </div>
          <pre class="embed-code__pre" aria-labelledby={`embed-script-${uid}`}><code>{scriptSnippet}</code></pre>
          <p class="embed-code__hint" class:is-error={copyError === 'script'}>{copyError === 'script' ? $ts.embed.copyFailed : $ts.embed.scriptHint}</p>
        </div>

        <div class="embed-code__block">
          <div class="embed-code__label-row">
            <span class="embed-code__label" id={`embed-iframe-${uid}`}>{$ts.embed.iframeLabel}</span>
            <button class="embed-code__copy" class:is-done={copied === 'iframe'} type="button" on:click={() => copy(iframeSnippet, 'iframe')}>
              {#if copied === 'iframe'}
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" /></svg>
                {$ts.embed.copied}
              {:else}
                <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="8.5" height="8.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M10.5 2.5h-6a2 2 0 0 0-2 2v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
                {$ts.embed.copy}
              {/if}
            </button>
          </div>
          <pre class="embed-code__pre" aria-labelledby={`embed-iframe-${uid}`}><code>{iframeSnippet}</code></pre>
          <p class="embed-code__hint" class:is-error={copyError === 'iframe'}>{copyError === 'iframe' ? $ts.embed.copyFailed : $ts.embed.iframeHint}</p>
        </div>
      </div>

      <div class="embed-code__col">
        <p class="embed-code__label">{$ts.embed.preview}</p>
        <div class="embed-code__preview">
          {#if previewSrc}
            <iframe src={previewSrc} title={$ts.embed.preview} height={layout === 'compact' ? 260 : 520} loading="lazy"></iframe>
          {/if}
        </div>
        <p class="embed-code__hint">{$ts.embed.previewNote}</p>
      </div>
    </div>
  {/if}

  <span class="embed-code__sr" role="status" aria-live="polite">{copied ? $ts.embed.copied : ''}</span>
</section>

<style lang="scss">
  /* Owner-facing share panel: a flat bordered card, code in quiet wells, live preview on the right. */
  .embed-code {
    box-sizing: border-box;
    display: grid;
    gap: var(--space-6);
    padding: var(--space-6);
    color: var(--text-1);
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    font-family: var(--font-body);
  }

  .embed-code__title {
    margin: 0 0 var(--space-2);
    font-family: var(--font-display);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
  }

  .embed-code__text {
    margin: 0;
    max-width: var(--measure);
    color: var(--text-2);
  }

  .embed-code__grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: var(--space-7);
  }

  .embed-code__col {
    display: grid;
    align-content: start;
    gap: var(--space-6);
  }

  /* The preview follows the code while scrolling on wide screens. */
  .embed-code__col:last-child {
    position: sticky;
    top: calc(var(--header-h) + var(--space-4));
    align-self: start;
    gap: var(--space-3);
  }

  .embed-code__block {
    display: grid;
    gap: var(--space-2);
  }

  .embed-code__label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }

  .embed-code__label {
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
  }

  .embed-code__hint {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--text-3);

    &.is-error {
      color: var(--danger);
      font-weight: var(--fw-medium);
    }
  }

  .embed-code__input {
    box-sizing: border-box;
    width: 100%;
    min-height: var(--control-h);
    padding: var(--space-2) var(--space-3);
    font: inherit;
    font-size: var(--fs-sm);
    color: var(--text-1);
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    transition: border-color var(--t-out) var(--ease-out);

    &[readonly] {
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
      background: var(--surface-2);
      border-color: var(--border-1);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not([readonly]) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-visible {
      outline: none;
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }
  }

  select.embed-code__input {
    cursor: pointer;
  }

  .embed-code__copy {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h-sm);
    padding: 0 var(--space-3);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-1);
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    cursor: pointer;
    white-space: nowrap;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);

    svg {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--surface-2);
        transition-duration: var(--t-in);
      }
    }

    &:active {
      transform: scale(0.97);
      transition-duration: 60ms;
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &.is-done {
      color: var(--success);
      border-color: currentColor;
    }
  }

  .embed-code__pre {
    margin: 0;
    padding: var(--space-4);
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    line-height: var(--lh-normal);
    color: var(--text-1);
    background: var(--surface-2);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-md);
    white-space: pre-wrap;
    word-break: break-all;
  }

  .embed-code__options {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    padding: var(--space-4) var(--space-5) var(--space-5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);

    legend {
      padding: 0 var(--space-2);
    }
  }

  .embed-code__option {
    display: grid;
    grid-template-columns: minmax(7rem, auto) 1fr;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }

  .embed-code__color {
    width: 3.5rem;
    height: var(--control-h-sm);
    padding: 2px;
    border: 1px solid var(--border-2);
    border-radius: var(--radius-sm);
    background: none;
    cursor: pointer;

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }

  .embed-code__preview {
    padding: var(--space-4);
    background: var(--surface-2);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);

    iframe {
      display: block;
      width: 100%;
      border: 0;
    }
  }

  .embed-code__sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (max-width: 900px) {
    .embed-code__grid {
      grid-template-columns: 1fr;
    }

    .embed-code__col:last-child {
      position: static;
    }
  }

  @media (max-width: 30rem) {
    .embed-code {
      padding: var(--space-4);
    }

    .embed-code__option {
      grid-template-columns: 1fr;
      gap: var(--space-1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .embed-code__copy:active {
      transform: none;
    }
  }
</style>

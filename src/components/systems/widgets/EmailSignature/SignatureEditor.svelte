<!--
  Email signature editor (what you see is what you get). Owner: WS5.
  The preview is the real email HTML. Clicking a part of it jumps to its field; tags switch parts on and off.

  <SignatureEditor bind:value={data} bind:enabled={show} brandColor={config.brandColor}
                   onchange={(data, html) => draft = { fields: data, html }} />

  Save: config.emailSignatureFields = data, config.emailSignature = html, config.showEmailSignature = enabled.
-->
<script lang="ts">
  import { tick } from 'svelte';
  import TextField from '$lib/ui/components/TextField.svelte';
  import Textarea from '$lib/ui/components/Textarea.svelte';
  import Switch from '$lib/ui/components/Switch.svelte';
  import Button from '$lib/ui/components/Button.svelte';
  import { ts } from '$lib/i18n/subscribe-translations';
  import {
    DEFAULT_ACCENT,
    SOCIAL_KEYS,
    SOCIAL_LABELS,
    buildSignatureHtml,
    emptySignature,
    normalizeHex,
    toSignatureData,
    type SignatureData,
    type SignatureFieldKey,
    type SignatureLayout,
  } from './signature';

  interface Props {
    value?: SignatureData | Record<string, unknown> | null;
    enabled?: boolean;
    brandColor?: string | null;
    onchange?: (data: SignatureData, html: string) => void;
  }

  let { value = $bindable(null), enabled = $bindable(true), brandColor = null, onchange }: Props = $props();

  const uid = Math.random().toString(36).slice(2, 8);
  const startAccent = normalizeHex(brandColor) || DEFAULT_ACCENT;

  let data = $state<SignatureData>(toSignatureData(value, { accent: startAccent }));
  let tab = $state<'content' | 'style'>('content');
  let resetArmed = $state(false);

  const html = $derived(buildSignatureHtml(data));
  const previewHtml = $derived(buildSignatureHtml(data, { annotate: true }));

  // Push every change to the parent.
  $effect(() => {
    const snapshot = JSON.parse(JSON.stringify(data)) as SignatureData;
    const out = html;
    value = snapshot;
    onchange?.(snapshot, out);
  });

  const LAYOUTS: SignatureLayout[] = ['bar', 'photo', 'stacked', 'centered', 'minimal'];
  const TAGS: SignatureFieldKey[] = ['name', 'role', 'company', 'phone', 'email', 'website', 'address', 'photoUrl', 'logoUrl', 'socials', 'cta', 'disclaimer'];

  const fieldId = (key: string) => `sig-${uid}-${key}`;
  const firstInput: Record<SignatureFieldKey, string> = {
    name: 'name', role: 'role', company: 'company', phone: 'phone', email: 'email', website: 'website', address: 'address',
    photoUrl: 'photoUrl', logoUrl: 'logoUrl', socials: `social-${SOCIAL_KEYS[0]}`, cta: 'ctaLabel', disclaimer: 'disclaimer',
  };

  function isShown(key: SignatureFieldKey): boolean {
    return !data.hidden.includes(key);
  }

  function hasText(key: SignatureFieldKey): boolean {
    if (key === 'socials') return SOCIAL_KEYS.some((k) => data.socials[k].trim());
    if (key === 'cta') return !!(data.ctaLabel.trim() || data.ctaUrl.trim());
    return !!String(data[key] ?? '').trim();
  }

  async function focusField(key: SignatureFieldKey) {
    tab = 'content';
    await tick();
    const el = document.getElementById(fieldId(firstInput[key]));
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    (el as HTMLInputElement | null)?.focus({ preventScroll: true });
  }

  async function toggleTag(key: SignatureFieldKey) {
    if (isShown(key) && hasText(key)) {
      data.hidden = [...data.hidden, key];
      return;
    }
    data.hidden = data.hidden.filter((k) => k !== key);
    await focusField(key);
  }

  function onPreviewClick(event: MouseEvent) {
    event.preventDefault();
    const target = (event.target as HTMLElement | null)?.closest('[data-sig-field]');
    const key = target?.getAttribute('data-sig-field') as SignatureFieldKey | null;
    if (key) focusField(key);
  }

  function reset() {
    if (!resetArmed) {
      resetArmed = true;
      setTimeout(() => (resetArmed = false), 4000);
      return;
    }
    resetArmed = false;
    data = { ...emptySignature(), accent: startAccent };
  }
</script>

<section class="sig" aria-labelledby={fieldId('title')}>
  <header class="sig__header">
    <h2 class="sig__title" id={fieldId('title')}>{$ts.signature.title}</h2>
    <p class="sig__text">{$ts.signature.intro}</p>
  </header>

  <div class="sig__grid">
    <div class="sig__preview-col">
      <p class="sig__label">{$ts.signature.preview}</p>
      <div class="sig__mail" aria-label={$ts.signature.preview}>
        <div class="sig__mail-lines" aria-hidden="true">
          <span></span><span></span><span class="short"></span>
          <em>{$ts.signature.articleEnd}</em>
        </div>
        {#if html}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- built by buildSignatureHtml, which escapes every field -->
          <div class="sig__render" class:sig__render--off={!enabled} onclick={onPreviewClick}>{@html previewHtml}</div>
        {:else}
          <p class="sig__empty">{$ts.signature.previewEmpty}</p>
        {/if}
      </div>
      <div class="sig__switch">
        <Switch toggled={enabled} onChange={(v: boolean) => (enabled = v)} label={$ts.signature.show} description={$ts.signature.showHint} />
      </div>
    </div>

    <div class="sig__form-col">
      <div class="sig__tabs" role="tablist" aria-label={$ts.signature.title}>
        <button type="button" role="tab" id={fieldId('tab-content')} aria-selected={tab === 'content'} aria-controls={fieldId('panel-content')} class="sig__tab" onclick={() => (tab = 'content')}>{$ts.signature.tabContent}</button>
        <button type="button" role="tab" id={fieldId('tab-style')} aria-selected={tab === 'style'} aria-controls={fieldId('panel-style')} class="sig__tab" onclick={() => (tab = 'style')}>{$ts.signature.tabStyle}</button>
      </div>

      {#if tab === 'content'}
        <div class="sig__panel" role="tabpanel" id={fieldId('panel-content')} aria-labelledby={fieldId('tab-content')}>
          <div class="sig__block">
            <p class="sig__label">{$ts.signature.blocks}</p>
            <div class="sig__tags">
              {#each TAGS as key (key)}
                <button type="button" class="sig__tag" aria-pressed={isShown(key)} onclick={() => toggleTag(key)}>
                  {$ts.signature.fields[key]}{#if !isShown(key)}<span class="sig__tag-state"> ({$ts.signature.hidden})</span>{/if}
                </button>
              {/each}
            </div>
            <p class="sig__hint">{$ts.signature.blocksHint}</p>
          </div>

          <fieldset class="sig__group">
            <legend>{$ts.signature.groups.about}</legend>
            {#if isShown('name')}<TextField id={fieldId('name')} label={$ts.signature.fields.name} bind:value={data.name} placeholder={$ts.signature.placeholders.name} autocomplete="name" />{/if}
            {#if isShown('role')}<TextField id={fieldId('role')} label={$ts.signature.fields.role} bind:value={data.role} placeholder={$ts.signature.placeholders.role} optional />{/if}
            {#if isShown('company')}<TextField id={fieldId('company')} label={$ts.signature.fields.company} bind:value={data.company} placeholder={$ts.signature.placeholders.company} optional />{/if}
          </fieldset>

          {#if isShown('phone') || isShown('email') || isShown('website') || isShown('address')}
            <fieldset class="sig__group">
              <legend>{$ts.signature.groups.contact}</legend>
              {#if isShown('phone')}<TextField id={fieldId('phone')} type="tel" label={$ts.signature.fields.phone} bind:value={data.phone} placeholder={$ts.signature.placeholders.phone} optional />{/if}
              {#if isShown('email')}<TextField id={fieldId('email')} type="email" label={$ts.signature.fields.email} bind:value={data.email} placeholder={$ts.signature.placeholders.email} optional />{/if}
              {#if isShown('website')}<TextField id={fieldId('website')} label={$ts.signature.fields.website} bind:value={data.website} placeholder={$ts.signature.placeholders.website} hint={$ts.signature.hints.website} optional />{/if}
              {#if isShown('address')}<TextField id={fieldId('address')} label={$ts.signature.fields.address} bind:value={data.address} placeholder={$ts.signature.placeholders.address} optional />{/if}
            </fieldset>
          {/if}

          {#if isShown('photoUrl') || isShown('logoUrl')}
            <fieldset class="sig__group">
              <legend>{$ts.signature.groups.images}</legend>
              {#if isShown('photoUrl')}<TextField id={fieldId('photoUrl')} type="url" label={$ts.signature.fields.photoUrl} bind:value={data.photoUrl} placeholder={$ts.signature.placeholders.imageUrl} hint={$ts.signature.hints.photoUrl} optional />{/if}
              {#if isShown('logoUrl')}<TextField id={fieldId('logoUrl')} type="url" label={$ts.signature.fields.logoUrl} bind:value={data.logoUrl} placeholder={$ts.signature.placeholders.imageUrl} hint={$ts.signature.hints.logoUrl} optional />{/if}
            </fieldset>
          {/if}

          {#if isShown('socials')}
            <fieldset class="sig__group sig__group--grid">
              <legend>{$ts.signature.groups.socials}</legend>
              {#each SOCIAL_KEYS as key (key)}
                <TextField id={fieldId(`social-${key}`)} type="url" size="sm" label={SOCIAL_LABELS[key]} bind:value={data.socials[key]} placeholder={$ts.signature.placeholders.socialUrl} optional />
              {/each}
            </fieldset>
          {/if}

          {#if isShown('cta')}
            <fieldset class="sig__group">
              <legend>{$ts.signature.groups.cta}</legend>
              <TextField id={fieldId('ctaLabel')} label={$ts.signature.ctaText} bind:value={data.ctaLabel} placeholder={$ts.signature.placeholders.ctaLabel} optional />
              <TextField id={fieldId('ctaUrl')} type="url" label={$ts.signature.ctaLink} bind:value={data.ctaUrl} placeholder={$ts.signature.placeholders.ctaUrl} hint={$ts.signature.hints.cta} optional />
            </fieldset>
          {/if}

          {#if isShown('disclaimer')}
            <fieldset class="sig__group">
              <legend>{$ts.signature.groups.disclaimer}</legend>
              <Textarea id={fieldId('disclaimer')} label={$ts.signature.fields.disclaimer} bind:value={data.disclaimer} hint={$ts.signature.hints.disclaimer} rows={3} />
            </fieldset>
          {/if}
        </div>
      {:else}
        <div class="sig__panel" role="tabpanel" id={fieldId('panel-style')} aria-labelledby={fieldId('tab-style')}>
          <fieldset class="sig__group">
            <legend>{$ts.signature.layout}</legend>
            <div class="sig__layouts">
              {#each LAYOUTS as layout (layout)}
                <label class="sig__layout" class:is-active={data.layout === layout}>
                  <input type="radio" name={fieldId('layout')} value={layout} bind:group={data.layout} />
                  <span class={`sig__thumb sig__thumb--${layout}`} aria-hidden="true"><i></i><b></b><b class="short"></b></span>
                  <span>{$ts.signature.layouts[layout]}</span>
                </label>
              {/each}
            </div>
          </fieldset>

          <fieldset class="sig__group">
            <legend>{$ts.signature.style.accent}</legend>
            <div class="sig__color">
              <input id={fieldId('accent')} type="color" bind:value={data.accent} aria-label={$ts.signature.style.accent} />
              <code>{data.accent}</code>
            </div>
            <p class="sig__hint">{$ts.signature.style.accentHint}</p>
          </fieldset>

          <fieldset class="sig__group sig__group--row">
            <legend>{$ts.signature.style.font}</legend>
            <label class="sig__choice"><input type="radio" value="sans" bind:group={data.font} /> {$ts.signature.style.fontSans}</label>
            <label class="sig__choice"><input type="radio" value="serif" bind:group={data.font} /> {$ts.signature.style.fontSerif}</label>
          </fieldset>

          <fieldset class="sig__group sig__group--row">
            <legend>{$ts.signature.style.size}</legend>
            <label class="sig__choice"><input type="radio" value="md" bind:group={data.size} /> {$ts.signature.style.sizeMd}</label>
            <label class="sig__choice"><input type="radio" value="sm" bind:group={data.size} /> {$ts.signature.style.sizeSm}</label>
          </fieldset>

          <fieldset class="sig__group sig__group--row">
            <legend>{$ts.signature.style.shape}</legend>
            <label class="sig__choice"><input type="radio" value="round" bind:group={data.imageShape} /> {$ts.signature.style.shapeRound}</label>
            <label class="sig__choice"><input type="radio" value="square" bind:group={data.imageShape} /> {$ts.signature.style.shapeSquare}</label>
          </fieldset>
        </div>
      {/if}

      <div class="sig__footer">
        <Button variant="tertiary" onclick={reset}>{resetArmed ? $ts.signature.resetConfirm : $ts.signature.reset}</Button>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .sig {
    box-sizing: border-box;
    display: grid;
    gap: var(--space-5);
    color: var(--text-1);
    font-family: var(--font-body);
  }

  .sig__title {
    margin: 0 0 var(--space-2);
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    line-height: var(--lh-snug);
  }

  .sig__text {
    margin: 0;
    max-width: var(--measure);
  }

  .sig__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--space-6);
    align-items: start;
  }

  .sig__preview-col {
    position: sticky;
    top: calc(var(--header-h) + var(--space-4));
    display: grid;
    gap: var(--space-3);
  }

  .sig__label {
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }

  .sig__hint {
    margin: var(--space-1) 0 0;
    font-size: var(--fs-sm);
    color: var(--text-2);
  }

  /* The preview always shows a light email, like most inboxes do. */
  .sig__mail {
    padding: var(--space-6) var(--space-5);
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);
    overflow-x: auto;
  }

  :global([data-theme='dark']) .sig__mail {
    background: var(--text-1);
    color-scheme: light;
  }

  .sig__mail-lines {
    display: grid;
    gap: var(--space-2);
    margin-block-end: var(--space-5);

    span {
      display: block;
      height: 0.5rem;
      border-radius: var(--radius-full);
      background: var(--border-1);
    }

    .short {
      width: 60%;
    }

    em {
      font-style: normal;
      font-size: var(--fs-xs);
      color: var(--text-3);
    }
  }

  .sig__render {
    cursor: pointer;

    :global([data-sig-field]) {
      border-radius: var(--radius-sm);
      outline: 1px dashed transparent;
      outline-offset: 2px;
      transition: outline-color var(--dur-fast) var(--ease-out);
    }

    :global([data-sig-field]:hover) {
      outline-color: var(--focus-color);
    }
  }

  .sig__render--off {
    opacity: 0.45;
  }

  .sig__empty {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--text-2);
  }

  .sig__tabs {
    display: flex;
    gap: var(--space-1);
    margin-block-end: var(--space-4);
    border-bottom: 1px solid var(--border-1);
  }

  .sig__tab {
    padding: var(--space-2) var(--space-4);
    font: inherit;
    font-weight: var(--fw-semibold);
    color: var(--text-2);
    background: none;
    border: 0;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    cursor: pointer;

    &[aria-selected='true'] {
      color: var(--text-1);
      border-bottom-color: var(--accent);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
      border-radius: var(--radius-sm);
    }
  }

  .sig__panel {
    display: grid;
    gap: var(--space-5);
  }

  .sig__block {
    display: grid;
    gap: var(--space-2);
  }

  .sig__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .sig__tag {
    min-height: 36px;
    padding: var(--space-1) var(--space-3);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    background: var(--surface-1);
    border: 1px dashed var(--border-2);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: background-color var(--dur-fast) var(--ease-out);

    &[aria-pressed='true'] {
      color: var(--accent);
      background: var(--accent-soft);
      border-style: solid;
      border-color: var(--accent);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }

  .sig__tag-state {
    font-weight: var(--fw-regular);
  }

  .sig__group {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    border: 0;

    legend {
      margin-block-end: var(--space-2);
      padding: 0;
      font-size: var(--fs-md);
      font-weight: var(--fw-semibold);
    }
  }

  .sig__group--grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sig__group--row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  .sig__choice {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    cursor: pointer;

    input {
      accent-color: var(--accent);
    }
  }

  .sig__layouts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6.5rem, 1fr));
    gap: var(--space-3);
  }

  .sig__layout {
    position: relative;
    display: grid;
    gap: var(--space-2);
    justify-items: center;
    padding: var(--space-3);
    font-size: var(--fs-sm);
    text-align: center;
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      inset: 0;
      cursor: pointer;
    }

    &.is-active {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    &:focus-within {
      box-shadow: var(--focus-ring);
    }
  }

  .sig__thumb {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 3px 6px;
    width: 64px;
    height: 36px;
    align-content: center;

    i {
      grid-row: span 2;
      width: 3px;
      background: var(--accent);
      border-radius: 2px;
    }

    b {
      display: block;
      height: 5px;
      background: var(--border-2);
      border-radius: 3px;
    }

    .short {
      width: 60%;
    }
  }

  .sig__thumb--photo i {
    width: 16px;
    height: 16px;
    border-radius: var(--radius-full);
    background: var(--border-2);
    box-shadow: 3px 0 0 -1px var(--accent);
  }

  .sig__thumb--stacked,
  .sig__thumb--centered,
  .sig__thumb--minimal {
    grid-template-columns: 1fr;

    i {
      grid-row: auto;
      width: 14px;
      height: 3px;
    }
  }

  .sig__thumb--centered {
    justify-items: center;
  }

  .sig__thumb--minimal i {
    display: none;
  }

  .sig__color {
    display: flex;
    align-items: center;
    gap: var(--space-3);

    input {
      width: 56px;
      height: 36px;
      padding: 0;
      border: 1px solid var(--border-2);
      border-radius: var(--radius-sm);
      background: none;
      cursor: pointer;
    }

    code {
      font-family: var(--font-mono);
      font-size: var(--fs-sm);
      color: var(--text-2);
    }
  }

  .sig__footer {
    margin-block-start: var(--space-5);
  }

  @media (max-width: 900px) {
    .sig__grid {
      grid-template-columns: 1fr;
    }

    .sig__preview-col {
      position: static;
    }
  }

  @media (max-width: 480px) {
    .sig__group--grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sig__tag,
    .sig__render :global([data-sig-field]) {
      transition: none;
    }
  }
</style>

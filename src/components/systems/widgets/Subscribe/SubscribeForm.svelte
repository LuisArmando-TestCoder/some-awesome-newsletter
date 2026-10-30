<!--
  Public subscribe form. Owner: WS5.
  Used by /subscribe (hosted page) and /subscribe-widget (iframe and script embeds).
  Asks for the email first; name is optional; the issue language is preselected from
  the browser and can be changed. Posts to the backend's public-subscribe endpoint.
-->
<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';
  import { ts, fill, localeHasSection } from '$lib/i18n/subscribe-translations';
  import {
    EMAIL_RE,
    detectLanguage,
    fetchPublicInfo,
    isRtl,
    languageLabel,
    languageOptions,
    postToParent,
    readableOn,
    safeHttpUrl,
    sanitizeColor,
    subscribeToNewsletter,
    type LanguageOption,
    type SubscribeErrorCode,
  } from './subscribe';

  export let configuratorId: string | null = null;
  export let newsSourceId: string | null = null;
  /** Owner's site. After subscribing, the reader can continue there (tracked by lead-counter). */
  export let lead: string | null = null;
  export let layout: 'full' | 'compact' = 'full';
  /** True inside an iframe: transparent background, reports its height to the parent page. */
  export let embedded = false;
  /** Hex color from the embed code; overrides the brand color from the backend. */
  export let accent: string | null = null;
  export let logo: string | null = null;
  export let title: string | null = null;
  export let defaultLanguage: string | null = null;
  export let showLogo = true;
  export let headingLevel: 1 | 2 = 1;
  /** Interface language (labels, language names, text direction). Defaults to the visitor's choice or browser. */
  export let uiLanguage: string | null = null;
  /** Report height changes to the parent page. Defaults to `embedded`. */
  export let reportSize: boolean | null = null;

  type Status = 'idle' | 'submitting' | 'success';

  let status: Status = 'idle';
  let email = '';
  let name = '';
  let language = 'en';
  let honeypot = '';
  let errorKey: 'emailRequired' | 'emailInvalid' | 'missingLink' | 'notFound' | 'limit' | 'invalid' | 'server' | 'network' | null = null;
  let emailError = false;
  let showLanguagePicker = false;
  let infoLoaded = false;
  let options: LanguageOption[] = [];
  let uiLang = 'en';
  let mountedAt = 0;
  let submittedEmail = '';

  let root: HTMLElement;
  let emailInput: HTMLInputElement;
  let successHeading: HTMLElement;
  let languageSelect: HTMLSelectElement;
  let resizeObserver: ResizeObserver | null = null;

  let newsletterTitle: string | null = title;
  let senderName: string | null = null;
  let logoUrl: string | null = safeHttpUrl(logo);
  let brandColor: string | null = sanitizeColor(accent);
  let hidePoweredBy = false;

  const uid = Math.random().toString(36).slice(2, 8);
  const ids = {
    email: `sf-email-${uid}`,
    name: `sf-name-${uid}`,
    nameHint: `sf-name-hint-${uid}`,
    lang: `sf-lang-${uid}`,
    langHint: `sf-lang-hint-${uid}`,
    error: `sf-error-${uid}`,
    consent: `sf-consent-${uid}`,
  };

  $: missingIds = !configuratorId || !newsSourceId;
  $: rtl = isRtl(uiLang);
  $: accentStyle = brandColor ? `--sf-accent: ${brandColor}; --sf-on-accent: ${readableOn(brandColor)};` : '';
  $: displayTitle = newsletterTitle?.trim() || null;
  $: displaySender = senderName?.trim() || displayTitle || '';
  $: heading = displayTitle ? fill($ts.form.heading, { title: displayTitle }) : $ts.form.headingFallback;
  $: languageName = languageLabel(language, uiLang);
  $: leadUrl = safeHttpUrl(lead);
  $: leadHost = leadUrl ? new URL(leadUrl).host.replace(/^www\./, '') : '';
  $: leadHref =
    leadUrl && configuratorId && newsSourceId
      ? `${apiBaseSafe()}/lead-counter?${new URLSearchParams({
          leadUrl,
          configuratorId,
          newsSourceId,
          newsletterUserId: submittedEmail,
        })}`
      : null;

  function apiBaseSafe(): string {
    // Same rule as store.apiURL, kept local so this component never throws during SSR.
    if (typeof window === 'undefined') return 'https://ai-newsletter-translated.onrender.com';
    return window.location.origin.startsWith('http://localhost') ? 'http://localhost:8000' : 'https://ai-newsletter-translated.onrender.com';
  }

  onMount(() => {
    mountedAt = Date.now();
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('lang');
    } catch {
      saved = null;
    }
    const wantedUi = (uiLanguage || saved || navigator.language || 'en').toLowerCase().split('-')[0] || 'en';
    // Name languages in the same language as the visible strings. Until a locale has the
    // new form strings, the form shows English, so the language names stay English too.
    // Locale files load on demand, so the names start in English and switch once it arrives.
    uiLang = 'en';
    options = languageOptions(uiLang);
    if (wantedUi !== 'en') {
      localeHasSection(wantedUi, 'form').then((ok) => {
        if (!ok) return;
        uiLang = wantedUi;
        options = languageOptions(uiLang);
      });
    }
    language = detectLanguage(
      options.map((o) => o.code),
      defaultLanguage,
    );

    if ((reportSize ?? embedded) && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        postToParent({ type: 'resize', height: Math.ceil(root?.getBoundingClientRect().height ?? 0) });
      });
      resizeObserver.observe(root);
    }

    if (configuratorId && newsSourceId) {
      fetchPublicInfo(configuratorId, newsSourceId).then((info) => {
        if (info) {
          if (!title && info.newsletterTitle) newsletterTitle = info.newsletterTitle;
          if (info.senderName) senderName = info.senderName;
          if (!logoUrl) logoUrl = safeHttpUrl(info.logo);
          if (!brandColor) brandColor = sanitizeColor(info.brandColor);
          hidePoweredBy = info.hidePoweredBy === true;
        }
        infoLoaded = true;
      });
    } else {
      infoLoaded = true;
    }
  });

  onDestroy(() => resizeObserver?.disconnect());

  async function openLanguagePicker() {
    showLanguagePicker = true;
    await tick();
    languageSelect?.focus();
  }

  function onEmailInput() {
    // Clear the error once the person edits the field. Never validate while typing.
    if (emailError) {
      emailError = false;
      errorKey = null;
    }
  }

  async function submit() {
    if (status === 'submitting') return;
    errorKey = null;
    emailError = false;

    if (missingIds) {
      errorKey = 'missingLink';
      return;
    }
    const value = email.trim();
    if (!value) {
      errorKey = 'emailRequired';
      emailError = true;
      emailInput?.focus();
      return;
    }
    if (!EMAIL_RE.test(value)) {
      errorKey = 'emailInvalid';
      emailError = true;
      emailInput?.focus();
      return;
    }

    // Bots fill hidden fields or submit instantly. Show them the success state and send nothing.
    if (honeypot || Date.now() - mountedAt < 700) {
      submittedEmail = value;
      await showSuccess();
      return;
    }

    status = 'submitting';
    const result = await subscribeToNewsletter({
      configuratorId: configuratorId as string,
      newsSourceId: newsSourceId as string,
      email: value,
      name,
      language,
    });

    if (result.ok) {
      submittedEmail = value;
      await showSuccess();
      postToParent({ type: 'subscribed', language });
      return;
    }

    status = 'idle';
    errorKey = mapError(result.code);
    if (result.code === 'invalid') {
      emailError = true;
      emailInput?.focus();
    }
  }

  function mapError(code: SubscribeErrorCode): typeof errorKey {
    switch (code) {
      case 'invalid':
        return 'invalid';
      case 'not_found':
        return 'notFound';
      case 'limit':
        return 'limit';
      case 'network':
        return 'network';
      default:
        return 'server';
    }
  }

  async function showSuccess() {
    status = 'success';
    await tick();
    successHeading?.focus();
  }

  async function reset() {
    status = 'idle';
    email = '';
    submittedEmail = '';
    await tick();
    emailInput?.focus();
  }
</script>

<section
  class="sf"
  class:sf--embedded={embedded}
  class:sf--compact={layout === 'compact'}
  dir={rtl ? 'rtl' : 'ltr'}
  style={accentStyle}
  bind:this={root}
  aria-busy={!infoLoaded}
>
  {#if status === 'success'}
    <div class="sf__success" role="status" aria-live="polite">
      <div class="sf__check" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </div>
      {#if headingLevel === 1}
        <h1 class="sf__title" tabindex="-1" bind:this={successHeading}>{$ts.success.title}</h1>
      {:else}
        <h2 class="sf__title" tabindex="-1" bind:this={successHeading}>{$ts.success.title}</h2>
      {/if}
      <p class="sf__text">
        {#each fill($ts.success.body, { email: '\u0000' }).split('\u0000') as part, i (i)}{#if i > 0}<strong dir="ltr">{submittedEmail}</strong>{/if}{part}{/each}
      </p>
      <p class="sf__text">{fill($ts.success.next, { language: languageName })}</p>
      <p class="sf__hint">{$ts.success.spam}</p>
      <div class="sf__actions">
        {#if leadHref}
          <a class="sf__button" href={leadHref} target={embedded ? '_top' : undefined} rel="noopener">{fill($ts.success.continueTo, { host: leadHost })}</a>
        {/if}
        <button type="button" class="sf__link" on:click={reset}>{$ts.success.changeEmail}</button>
      </div>
    </div>
  {:else}
    {#if layout === 'full'}
      <header class="sf__header">
        {#if showLogo && logoUrl}
          <img class="sf__logo" src={logoUrl} alt={displayTitle ?? ''} height="48" />
        {/if}
        {#if headingLevel === 1}
          <h1 class="sf__title">{heading}</h1>
        {:else}
          <h2 class="sf__title">{heading}</h2>
        {/if}
        <p class="sf__text">{$ts.form.intro}</p>
        {#if senderName && senderName !== displayTitle}
          <p class="sf__hint">{fill($ts.form.from, { sender: senderName })}</p>
        {/if}
      </header>
    {/if}

    <form class="sf__form" novalidate on:submit|preventDefault={submit}>
      <div class="sf__field">
        <label class="sf__label" for={ids.email}>{$ts.form.emailLabel}</label>
        <div class="sf__row">
          <input
            bind:this={emailInput}
            bind:value={email}
            on:input={onEmailInput}
            class="sf__input"
            class:shake={emailError}
            id={ids.email}
            name="email"
            type="email"
            inputmode="email"
            autocomplete="email"
            autocapitalize="off"
            spellcheck="false"
            required
            placeholder={$ts.form.emailPlaceholder}
            aria-invalid={emailError}
            aria-describedby={errorKey ? ids.error : undefined}
            dir="ltr"
          />
          {#if layout === 'compact'}
            <button class="sf__button" type="submit" aria-disabled={status === 'submitting' ? 'true' : undefined} aria-busy={status === 'submitting'}>
              <span class="sf__button-label">{status === 'submitting' ? $ts.form.submitting : $ts.form.submit}</span>
              <span class="sf__spinner" aria-hidden="true"></span>
            </button>
          {/if}
        </div>
      </div>

      {#if layout === 'full'}
        <div class="sf__field">
          <label class="sf__label" for={ids.name}>
            {$ts.form.nameLabel} <span class="sf__optional">({$ts.form.optional})</span>
          </label>
          <input
            bind:value={name}
            class="sf__input"
            id={ids.name}
            name="name"
            type="text"
            autocomplete="given-name"
            maxlength="80"
            aria-describedby={ids.nameHint}
          />
          <p class="sf__hint" id={ids.nameHint}>{$ts.form.nameHint}</p>
        </div>
      {/if}

      <div class="sf__field">
        {#if showLanguagePicker}
          <label class="sf__label" for={ids.lang}>{$ts.form.languageLabel}</label>
          <select bind:this={languageSelect} bind:value={language} class="sf__input sf__select" id={ids.lang} name="language" aria-describedby={ids.langHint}>
            {#each options as option (option.code)}
              <option value={option.code}>{option.label}</option>
            {/each}
          </select>
          <p class="sf__hint" id={ids.langHint}>{$ts.form.languageHint}</p>
        {:else}
          <p class="sf__hint sf__language">
            {fill($ts.form.languageSummary, { language: languageName })}
            <button type="button" class="sf__link" on:click={openLanguagePicker} aria-label={`${$ts.form.languageChange}: ${$ts.form.languageLabel}`}>
              {$ts.form.languageChange}
            </button>
          </p>
        {/if}
      </div>

      <!-- Hidden from people and assistive tech. Bots tend to fill it. -->
      <div class="sf__hp" aria-hidden="true">
        <label>Website <input type="text" name="website" tabindex="-1" autocomplete="off" bind:value={honeypot} /></label>
      </div>

      {#if errorKey}
        <p class="sf__error" id={ids.error} role="alert">
          <svg class="sf__error-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.1v.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
          <span>{$ts.errors[errorKey]}</span>
        </p>
      {/if}

      {#if layout === 'full'}
        <button class="sf__button sf__button--block" type="submit" aria-disabled={status === 'submitting' ? 'true' : undefined} aria-busy={status === 'submitting'}>
          <span class="sf__button-label">{status === 'submitting' ? $ts.form.submitting : $ts.form.submit}</span>
          <span class="sf__spinner" aria-hidden="true"></span>
        </button>
      {/if}

      <p class="sf__consent" id={ids.consent}>
        {fill($ts.form.consent, { sender: displaySender || $ts.form.headingFallback })}
        <a href="/legal/privacy" target={embedded ? '_blank' : undefined} rel="noopener">{$ts.form.privacy}</a>
      </p>
    </form>
  {/if}

  {#if embedded && !hidePoweredBy}
    <p class="sf__brand"><a href="/" target="_blank" rel="noopener">{$ts.page.poweredBy}</a></p>
  {/if}
</section>

<style lang="scss">
  /* Neutral and light: this form is also embedded on other sites. The owner's brand color
     (--sf-accent, set inline from the embed code or the backend) is the only color it adds. */
  .sf {
    box-sizing: border-box;
    --sf-accent: var(--accent);
    --sf-on-accent: var(--accent-contrast);
    width: 100%;
    max-width: var(--container-sm);
    margin-inline: auto;
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    text-align: start;
  }

  .sf--embedded {
    max-width: none;
    padding: var(--space-1);
  }

  .sf__header {
    margin-block-end: var(--space-6);
  }

  .sf__logo {
    display: block;
    height: 48px;
    width: auto;
    max-width: 200px;
    object-fit: contain;
    margin-block-end: var(--space-5);
  }

  .sf__title {
    margin: 0 0 var(--space-3);
    font-family: var(--font-display);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-display);
    color: var(--text-1);
    text-wrap: balance;
    outline: none;
  }

  .sf__title:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }

  .sf--embedded .sf__title {
    font-size: var(--fs-xl);
    letter-spacing: var(--tracking-tight);
  }

  .sf__text {
    margin: 0 0 var(--space-3);
    color: var(--text-2);
    text-wrap: pretty;
  }

  .sf__header .sf__text {
    font-size: var(--fs-lg);
    line-height: var(--lh-snug);
  }

  .sf__text :global(strong) {
    color: var(--text-1);
    font-weight: var(--fw-semibold);
    overflow-wrap: anywhere;
  }

  .sf__hint {
    margin: var(--space-1) 0 0;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }

  .sf__form {
    display: grid;
    gap: var(--space-5);
  }

  .sf__field {
    display: grid;
    gap: var(--space-2);
  }

  .sf__label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-1);
  }

  .sf__optional {
    font-weight: var(--fw-regular);
    color: var(--text-3);
  }

  .sf__row {
    display: flex;
    gap: var(--space-2);
  }

  .sf__input {
    box-sizing: border-box;
    width: 100%;
    min-height: 3rem;
    padding: var(--space-2) var(--space-4);
    font: inherit;
    font-size: var(--fs-md);
    color: var(--text-1);
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    transition:
      border-color var(--t-out, 200ms) var(--ease-out),
      box-shadow var(--t-out, 200ms) var(--ease-out);

    &::placeholder {
      color: var(--text-3);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:focus) {
        border-color: var(--text-2);
        transition-duration: var(--t-in, 120ms);
      }
    }

    &:focus,
    &:focus-visible {
      outline: none;
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    &[aria-invalid='true'] {
      border-color: var(--danger);
    }
  }

  .sf__select {
    appearance: auto;
    cursor: pointer;
  }

  .sf__language {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-1) var(--space-2);
    margin: 0;
  }

  /* Pill in the owner's color with a currentColor state layer (works on any brand color). */
  .sf__button {
    position: relative;
    display: inline-grid;
    place-items: center;
    min-height: 3rem;
    padding: 0 var(--space-6);
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    letter-spacing: -0.01em;
    color: var(--sf-on-accent);
    background: var(--sf-accent);
    border: 0;
    border-radius: var(--radius-full);
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    isolation: isolate;
    transition: transform var(--dur-base) var(--ease-out);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--t-out, 200ms) var(--ease-out);
    }

    > * {
      grid-area: 1 / 1;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not([aria-disabled='true'])::before {
        opacity: 0.1;
        transition-duration: var(--t-in, 120ms);
      }
    }

    &:active:not([aria-disabled='true']) {
      transform: scale(0.97);
      transition-duration: 60ms;

      &::before {
        opacity: 0.16;
        transition-duration: 0ms;
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &[aria-busy='true'] {
      cursor: progress;
    }
  }

  /* Pending: the spinner fades in only after 350 ms, so fast replies never flash. */
  .sf__spinner {
    width: 1.125rem;
    height: 1.125rem;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    opacity: 0;
    visibility: hidden;
  }

  .sf__button[aria-busy='true'] {
    .sf__spinner {
      visibility: visible;
      animation:
        sf-show 1ms 350ms forwards,
        sf-spin 0.8s linear infinite;
    }
    .sf__button-label {
      animation: sf-hide 1ms 350ms forwards;
    }
  }

  @keyframes sf-show {
    to {
      opacity: 1;
    }
  }
  @keyframes sf-hide {
    to {
      opacity: 0;
    }
  }
  @keyframes sf-spin {
    to {
      rotate: 360deg;
    }
  }

  .sf__button--block {
    width: 100%;
  }

  .sf__link {
    display: inline-flex;
    align-items: center;
    min-height: 1.5rem;
    padding: 0;
    font: inherit;
    font-size: inherit;
    font-weight: var(--fw-medium);
    color: var(--text-link);
    background: none;
    border: 0;
    box-shadow: none;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        box-shadow: none;
        text-decoration-thickness: 2px;
      }
    }

    &:focus-visible {
      box-shadow: none;
      outline: 2px solid var(--focus-color);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
  }

  .sf__error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    color: var(--danger);
  }

  .sf__error-icon {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    margin-top: 0.1em;
  }

  .sf__consent {
    margin: 0;
    font-size: var(--fs-xs);
    line-height: var(--lh-normal);
    color: var(--text-3);

    a {
      color: var(--text-2);
    }
  }

  .sf__hp {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .sf__success {
    display: grid;
    gap: var(--space-1);
  }

  .sf__check {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    margin-block-end: var(--space-4);
    color: var(--success);
    border: 1.5px solid currentColor;
    border-radius: var(--radius-full);
  }

  .sf__check svg {
    stroke-dasharray: 24;
    stroke-dashoffset: 0;
    animation: sf-draw var(--dur-slow) var(--ease-out) both;
  }

  @keyframes sf-draw {
    from {
      stroke-dashoffset: 24;
    }
  }

  .sf__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-5);
    margin-block-start: var(--space-5);
  }

  .sf__brand {
    margin: var(--space-5) 0 0;
    font-size: var(--fs-xs);
    text-align: center;

    a {
      color: var(--text-3);
      text-decoration: none;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 420px) {
    .sf--compact .sf__row {
      flex-direction: column;
    }
  }

  @media (forced-colors: active) {
    .sf__button {
      border: 1px solid ButtonText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sf__input,
    .sf__button {
      transition: none;
    }
    .sf__button:active:not([aria-disabled='true']) {
      transform: none;
    }
    .sf__check svg {
      animation: none;
    }
    .sf__button[aria-busy='true'] .sf__spinner {
      animation: sf-show 1ms 350ms forwards;
      border-right-color: currentColor;
      opacity: 0.6;
    }
  }
</style>

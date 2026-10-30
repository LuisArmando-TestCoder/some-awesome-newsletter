<script lang="ts" module>
  type Strings = { [key: string]: string | undefined };
  /** Copy for the form ($t.help). Every field has an English fallback in the markup. */
  export type HelpFormContent = {
    form?: { [key: string]: string | Strings | undefined; errors?: Strings; spend?: Strings; urgency?: Strings; reply?: Strings };
    questions?: Strings;
    contact?: Strings;
  };
</script>

<script lang="ts">
  import { z } from 'zod';
  import Button from '$lib/ui/components/Button.svelte';

  /** Signed-in user, used to prefill name and email. May be null for visitors. */
  export let user: { name?: string; email?: string; company?: string } | null = null;
  /** `help` translation block (title, contact, questions). */
  export let content: HelpFormContent = {};
  /** Where the request is sent. */
  export let contactEmail = 'info@aiban.news';

  const upliftRequestSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    company: z.string().min(2).optional(),
    desiredLimits: z.string().min(10),
    useCase: z.string().min(20),
    expectedSpend: z.enum(['lt500', '500_2k', '2k_10k', 'gt10k', 'unknown']),
    urgency: z.enum(['low', 'normal', 'high']),
    contact: z.enum(['email', 'call']),
    payAsYouGo: z.boolean()
  });

  const isMock = user?.email === 'mock@example.com';

  let formData = {
    name: isMock ? '' : (user?.name ?? ''),
    email: isMock ? '' : (user?.email ?? ''),
    company: user?.company ?? '',
    desiredLimits: '',
    useCase: '',
    expectedSpend: 'unknown',
    urgency: 'normal',
    contact: 'email',
    payAsYouGo: false
  };

  $: f = content?.form ?? {};

  $: messages = {
    ...{
    name: 'Enter your name (at least 2 characters).',
    email: 'Enter an email address we can reply to, like name@example.com.',
    company: 'Enter at least 2 characters, or leave this empty.',
    desiredLimits: 'Describe the limits you need in at least 10 characters.',
    useCase: 'Describe your use in at least 20 characters.'
    },
    ...(f.errors ?? {})
  } as Record<string, string>;

  $: spendLabels = {
    ...{
    lt500: 'Less than $500',
    '500_2k': '$500 to $2,000',
    '2k_10k': '$2,000 to $10,000',
    gt10k: 'More than $10,000',
    unknown: 'I do not know yet'
    },
    ...(f.spend ?? {})
  } as Record<string, string>;

  let errors: Record<string, string[] | undefined> = {};
  let submitted = false;
  let mailtoHref = '';
  let sending = false;
  let sentToServer = false;

  function buildMailto(data: z.infer<typeof upliftRequestSchema>) {
    const subject = `Higher limits request from ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : '',
      '',
      `Limits needed: ${data.desiredLimits}`,
      '',
      `Use: ${data.useCase}`,
      '',
      `Expected monthly spend: ${spendLabels[data.expectedSpend]}`,
      `Urgency: ${data.urgency}`,
      `Preferred contact: ${data.contact}`,
      `Interested in pay as you go: ${data.payAsYouGo ? 'yes' : 'no'}`
    ]
      .filter((l, i, arr) => l !== '' || arr[i - 1] !== '')
      .join('\n');
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  /** Error nudge on the submit row after a failed attempt (one run, off under reduced motion). */
  let shake = false;

  async function handleSubmit() {
    if (sending) return; // no double submit while a request is in flight
    const payload = { ...formData, company: formData.company.trim() || undefined };
    const result = upliftRequestSchema.safeParse(payload);
    if (!result.success) {
      errors = result.error.flatten().fieldErrors;
      submitted = false;
      shake = false;
      requestAnimationFrame(() => (shake = true));
      const first = Object.keys(errors)[0];
      if (first) document.getElementById(`help-${first}`)?.focus();
      return;
    }
    errors = {};
    sending = true;
    sentToServer = false;
    // POST /api/support (WS6). It answers 501 until the backend route exists;
    // in that case, or on any failure, the request goes to the visitor's email app.
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data)
      });
      if (res.ok) {
        sentToServer = true;
        submitted = true;
        return;
      }
    } catch {
      /* network error: use the email fallback */
    } finally {
      sending = false;
    }
    mailtoHref = buildMailto(result.data);
    submitted = true;
    window.location.href = mailtoHref;
  }

  function err(field: string) {
    return errors[field] ? messages[field] ?? errors[field]?.[0] : '';
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="help-form" novalidate aria-busy={sending ? 'true' : undefined}>
  <div class="help-form__row help-form__row--2">
    <div class="help-form__group">
      <label for="help-name" class="help-form__label">{f.nameLabel ?? 'Name'}</label>
      <input id="help-name" type="text" autocomplete="name" bind:value={formData.name} class="help-form__input"
        aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'help-name-error' : undefined} />
      {#if errors.name}<p id="help-name-error" class="help-form__error"><svg class="help-form__error-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></svg><span>{err('name')}</span></p>{/if}
    </div>

    <div class="help-form__group">
      <label for="help-email" class="help-form__label">{f.emailLabel ?? 'Email'}</label>
      <input id="help-email" type="email" inputmode="email" autocomplete="email" spellcheck="false" bind:value={formData.email} class="help-form__input"
        aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'help-email-error' : undefined} />
      {#if errors.email}<p id="help-email-error" class="help-form__error"><svg class="help-form__error-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></svg><span>{err('email')}</span></p>{/if}
    </div>
  </div>

  <div class="help-form__group">
    <label for="help-company" class="help-form__label">{f.companyLabel ?? 'Company'} <span class="help-form__optional">{f.optional ?? '(optional)'}</span></label>
    <input id="help-company" type="text" autocomplete="organization" bind:value={formData.company} class="help-form__input"
      aria-invalid={errors.company ? 'true' : undefined} aria-describedby={errors.company ? 'help-company-error' : undefined} />
    {#if errors.company}<p id="help-company-error" class="help-form__error"><svg class="help-form__error-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></svg><span>{err('company')}</span></p>{/if}
  </div>

  <div class="help-form__group">
    <label for="help-desiredLimits" class="help-form__label">{f.limitsLabel ?? 'Limits you need'}</label>
    <p id="help-desiredLimits-hint" class="help-form__help">{content?.questions?.desiredLimitsHelp ?? ''}</p>
    <textarea id="help-desiredLimits" rows="3" bind:value={formData.desiredLimits} class="help-form__input help-form__input--area"
      aria-invalid={errors.desiredLimits ? 'true' : undefined} aria-describedby="help-desiredLimits-hint{errors.desiredLimits ? ' help-desiredLimits-error' : ''}"></textarea>
    {#if errors.desiredLimits}<p id="help-desiredLimits-error" class="help-form__error"><svg class="help-form__error-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></svg><span>{err('desiredLimits')}</span></p>{/if}
  </div>

  <div class="help-form__group">
    <label for="help-useCase" class="help-form__label">{f.useCaseLabel ?? 'How you use AIBAN'}</label>
    <p id="help-useCase-hint" class="help-form__help">{content?.questions?.useCaseHelp ?? ''}</p>
    <textarea id="help-useCase" rows="4" bind:value={formData.useCase} class="help-form__input help-form__input--area"
      aria-invalid={errors.useCase ? 'true' : undefined} aria-describedby="help-useCase-hint{errors.useCase ? ' help-useCase-error' : ''}"></textarea>
    {#if errors.useCase}<p id="help-useCase-error" class="help-form__error"><svg class="help-form__error-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></svg><span>{err('useCase')}</span></p>{/if}
  </div>

  <div class="help-form__row help-form__row--3">
    <div class="help-form__group">
      <label for="help-expectedSpend" class="help-form__label">{f.spendLabel ?? 'Expected monthly spend'}</label>
      <div class="help-form__select">
        <select id="help-expectedSpend" bind:value={formData.expectedSpend} class="help-form__input" aria-describedby="help-expectedSpend-hint">
          {#each Object.entries(spendLabels) as [value, label] (value)}
            <option {value}>{label}</option>
          {/each}
        </select>
        <svg class="help-form__chevron" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </div>
    </div>

    <div class="help-form__group">
      <label for="help-urgency" class="help-form__label">{f.urgencyLabel ?? 'Urgency'}</label>
      <div class="help-form__select">
        <select id="help-urgency" bind:value={formData.urgency} class="help-form__input">
          <option value="low">{f.urgency?.low ?? 'Low'}</option>
          <option value="normal">{f.urgency?.normal ?? 'Normal'}</option>
          <option value="high">{f.urgency?.high ?? 'High'}</option>
        </select>
        <svg class="help-form__chevron" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </div>
    </div>

    <div class="help-form__group">
      <label for="help-contact" class="help-form__label">{f.replyLabel ?? 'How should we reply?'}</label>
      <div class="help-form__select">
        <select id="help-contact" bind:value={formData.contact} class="help-form__input">
          <option value="email">{f.reply?.email ?? 'By email'}</option>
          <option value="call">{f.reply?.call ?? 'By phone call'}</option>
        </select>
        <svg class="help-form__chevron" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </div>
    </div>
  </div>
  <p id="help-expectedSpend-hint" class="help-form__help help-form__help--after">{content?.questions?.expectedSpendHelp ?? ''}</p>

  <label class="help-form__check">
    <input type="checkbox" bind:checked={formData.payAsYouGo} />
    <span>{f.payAsYouGo ?? 'I am interested in paying as I go'}</span>
  </label>

  <div class="help-form__actions" class:shake on:animationend={() => (shake = false)}>
    <Button type="submit" size="lg" loading={sending} loadingLabel={typeof f.sending === 'string' ? f.sending : 'Sending...'}>
      {content?.contact?.cta ?? 'Submit request'}
    </Button>
  </div>

  {#if submitted}
    <div class="help-form__success" role="status">
      <span class="help-form__success-icon" aria-hidden="true">
        {#if sentToServer}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
        {:else}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
        {/if}
      </span>
      <div class="help-form__success-text">
        {#if sentToServer}
          <p class="help-form__success-title">{f.sentTitle ?? 'Request sent'}</p>
          <p>{f.sentBody ?? 'We received your request and will answer at the email address you gave.'}</p>
        {:else}
          <p class="help-form__success-title">{content?.contact?.successTitle ?? 'Request ready to send'}</p>
          <p>{content?.contact?.successBody ?? ''}</p>
          <p>
            {f.retryBefore ?? 'If your email app did not open,'} <a href={mailtoHref}>{f.retryLink ?? 'open the request again'}</a> {f.retryAfter ?? 'or write to'}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        {/if}
      </div>
    </div>
  {/if}
</form>

<style lang="scss">
  .help-form {
    display: grid;
    gap: var(--space-6);
    color: var(--text-1);
  }

  .help-form__row {
    display: grid;
    gap: var(--space-6) var(--space-5);
  }
  @media (min-width: 36rem) {
    .help-form__row--2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .help-form__row--3 {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  }

  .help-form__group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .help-form__label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
  }

  .help-form__optional {
    font-weight: var(--fw-regular);
    color: var(--text-3);
  }

  .help-form__input {
    width: 100%;
    min-height: var(--control-h);
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    background: var(--surface-0);
    color: var(--text-1);
    font: inherit;
    font-size: var(--fs-md);
    transition:
      border-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out);

    &:focus-visible {
      outline: none;
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    /* Invalid: border here, icon and text under the field. Shown only after submit. */
    &[aria-invalid='true'] {
      border-color: var(--danger);
      box-shadow: inset 0 0 0 1px var(--danger);
    }
    &[aria-invalid='true']:focus-visible {
      box-shadow: var(--focus-ring), inset 0 0 0 1px var(--danger);
    }
  }
  @media (hover: hover) and (pointer: fine) {
    .help-form__input:hover:not(:focus-visible):not([aria-invalid='true']) {
      border-color: var(--text-2);
      transition-duration: var(--t-in);
    }
  }

  .help-form__input--area {
    min-height: 6.5rem;
    padding-block: var(--space-3);
    line-height: var(--lh-normal);
    resize: vertical;
  }

  /* Native select, custom chevron so it matches the other fields. */
  .help-form__select {
    position: relative;

    select {
      appearance: none;
      padding-right: var(--space-8);
      cursor: pointer;
      text-overflow: ellipsis;
    }
  }
  .help-form__chevron {
    position: absolute;
    top: 50%;
    right: var(--space-4);
    color: var(--text-2);
    transform: translateY(-50%);
    pointer-events: none;
  }

  .help-form__help {
    margin: 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-3);
  }
  .help-form__help--after {
    margin-top: calc(-1 * var(--space-4));
  }

  .help-form__error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    color: var(--danger);
  }
  .help-form__error-icon {
    flex: none;
    margin-top: 0.1em;
  }

  .help-form__check {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 2.75rem;
    justify-self: start;
    padding-right: var(--space-3);
    border-radius: var(--radius-sm);
    font-size: var(--fs-md);
    cursor: pointer;

    input {
      flex: none;
      width: 1.25rem;
      height: 1.25rem;
      margin: 0;
      accent-color: var(--accent);
      cursor: pointer;
    }
    input:focus-visible {
      outline: 2px solid var(--focus-color);
      outline-offset: 2px;
    }
  }
  @media (hover: hover) and (pointer: fine) {
    .help-form__check:hover span {
      text-decoration: underline;
      text-decoration-color: var(--border-2);
      text-underline-offset: 0.2em;
    }
  }

  .help-form__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
    padding-top: var(--space-2);
  }

  /* Success: check (or envelope for the email fallback), past-tense title, announced politely. */
  .help-form__success {
    display: flex;
    gap: var(--space-4);
    padding: var(--space-5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    color: var(--text-1);
    animation: help-form-in var(--dur-base) var(--ease-out);

    p {
      margin: 0 0 var(--space-2);
      color: var(--text-2);
      line-height: var(--lh-normal);
    }
    p:last-child {
      margin-bottom: 0;
    }
    a {
      color: var(--text-1);
      font-weight: var(--fw-medium);
      border-radius: var(--radius-sm);
    }
    a:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }
  .help-form__success-icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius-full);
    background: var(--success-soft);
    color: var(--success);
  }
  .help-form__success-text {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .help-form .help-form__success-title {
    color: var(--text-1);
    font-weight: var(--fw-semibold);
  }
  @keyframes help-form-in {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .help-form__success {
      animation: none;
    }
  }
  :global(:root[data-motion='reduced']) .help-form__success {
    animation: none;
  }
</style>

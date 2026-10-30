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

  async function handleSubmit() {
    const payload = { ...formData, company: formData.company.trim() || undefined };
    const result = upliftRequestSchema.safeParse(payload);
    if (!result.success) {
      errors = result.error.flatten().fieldErrors;
      submitted = false;
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

<form on:submit|preventDefault={handleSubmit} class="help-form" novalidate>
  <div class="help-form__row">
    <div class="help-form__group">
      <label for="help-name" class="help-form__label">{f.nameLabel ?? 'Name'}</label>
      <input id="help-name" type="text" autocomplete="name" bind:value={formData.name} class="help-form__input"
        aria-invalid={!!errors.name} aria-describedby={errors.name ? 'help-name-error' : undefined} />
      {#if errors.name}<p id="help-name-error" class="help-form__error">{err('name')}</p>{/if}
    </div>

    <div class="help-form__group">
      <label for="help-email" class="help-form__label">{f.emailLabel ?? 'Email'}</label>
      <input id="help-email" type="email" autocomplete="email" bind:value={formData.email} class="help-form__input"
        aria-invalid={!!errors.email} aria-describedby={errors.email ? 'help-email-error' : undefined} />
      {#if errors.email}<p id="help-email-error" class="help-form__error">{err('email')}</p>{/if}
    </div>
  </div>

  <div class="help-form__group">
    <label for="help-company" class="help-form__label">{f.companyLabel ?? 'Company'} <span class="help-form__optional">{f.optional ?? '(optional)'}</span></label>
    <input id="help-company" type="text" autocomplete="organization" bind:value={formData.company} class="help-form__input"
      aria-invalid={!!errors.company} aria-describedby={errors.company ? 'help-company-error' : undefined} />
    {#if errors.company}<p id="help-company-error" class="help-form__error">{err('company')}</p>{/if}
  </div>

  <div class="help-form__group">
    <label for="help-desiredLimits" class="help-form__label">{f.limitsLabel ?? 'Limits you need'}</label>
    <textarea id="help-desiredLimits" rows="3" bind:value={formData.desiredLimits} class="help-form__input"
      aria-invalid={!!errors.desiredLimits} aria-describedby="help-desiredLimits-hint{errors.desiredLimits ? ' help-desiredLimits-error' : ''}"></textarea>
    <p id="help-desiredLimits-hint" class="help-form__help">{content?.questions?.desiredLimitsHelp ?? ''}</p>
    {#if errors.desiredLimits}<p id="help-desiredLimits-error" class="help-form__error">{err('desiredLimits')}</p>{/if}
  </div>

  <div class="help-form__group">
    <label for="help-useCase" class="help-form__label">{f.useCaseLabel ?? 'How you use AIBAN'}</label>
    <textarea id="help-useCase" rows="4" bind:value={formData.useCase} class="help-form__input"
      aria-invalid={!!errors.useCase} aria-describedby="help-useCase-hint{errors.useCase ? ' help-useCase-error' : ''}"></textarea>
    <p id="help-useCase-hint" class="help-form__help">{content?.questions?.useCaseHelp ?? ''}</p>
    {#if errors.useCase}<p id="help-useCase-error" class="help-form__error">{err('useCase')}</p>{/if}
  </div>

  <div class="help-form__row">
    <div class="help-form__group">
      <label for="help-expectedSpend" class="help-form__label">{f.spendLabel ?? 'Expected monthly spend'}</label>
      <select id="help-expectedSpend" bind:value={formData.expectedSpend} class="help-form__input" aria-describedby="help-expectedSpend-hint">
        {#each Object.entries(spendLabels) as [value, label] (value)}
          <option {value}>{label}</option>
        {/each}
      </select>
      <p id="help-expectedSpend-hint" class="help-form__help">{content?.questions?.expectedSpendHelp ?? ''}</p>
    </div>

    <div class="help-form__group">
      <label for="help-urgency" class="help-form__label">{f.urgencyLabel ?? 'Urgency'}</label>
      <select id="help-urgency" bind:value={formData.urgency} class="help-form__input">
        <option value="low">{f.urgency?.low ?? 'Low'}</option>
        <option value="normal">{f.urgency?.normal ?? 'Normal'}</option>
        <option value="high">{f.urgency?.high ?? 'High'}</option>
      </select>
    </div>

    <div class="help-form__group">
      <label for="help-contact" class="help-form__label">{f.replyLabel ?? 'How should we reply?'}</label>
      <select id="help-contact" bind:value={formData.contact} class="help-form__input">
        <option value="email">{f.reply?.email ?? 'By email'}</option>
        <option value="call">{f.reply?.call ?? 'By phone call'}</option>
      </select>
    </div>
  </div>

  <label class="help-form__check">
    <input type="checkbox" bind:checked={formData.payAsYouGo} />
    <span>{f.payAsYouGo ?? 'I am interested in paying as I go'}</span>
  </label>

  <div class="help-form__actions">
    <button type="submit" class="help-form__button" disabled={sending} aria-busy={sending}>
      {sending ? (f.sending ?? 'Sending...') : (content?.contact?.cta ?? 'Submit request')}
    </button>
  </div>

  {#if submitted}
    <div class="help-form__success" role="status">
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
  {/if}
</form>

<style lang="scss">
  .help-form {
    display: grid;
    gap: var(--space-5, 24px);
    color: var(--text-1, #0f172a);
  }

  .help-form__row {
    display: grid;
    gap: var(--space-5, 24px);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .help-form__group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2, 8px);
  }

  .help-form__label {
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-1, #0f172a);
  }

  .help-form__optional {
    font-weight: var(--fw-regular, 400);
    color: var(--text-2, #475569);
  }

  .help-form__input {
    width: 100%;
    min-height: 44px;
    padding: var(--space-2, 8px) var(--space-3, 12px);
    border: 1px solid var(--border-2, #cbd5e1);
    border-radius: var(--radius-md, 10px);
    background: var(--surface-1, #fff);
    color: var(--text-1, #0f172a);
    font: inherit;
    font-size: var(--fs-md, 1rem);

    &:focus-visible {
      outline: 2px solid var(--focus-color, #6366f1);
      outline-offset: 1px;
    }

    &[aria-invalid='true'] { border-color: var(--danger, #b91c1c); }
  }

  textarea.help-form__input { resize: vertical; }

  .help-form__help {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-3, #64748b);
  }

  .help-form__error {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--danger, #b91c1c);
  }

  .help-form__check {
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
    font-size: var(--fs-md, 1rem);

    input {
      width: 18px;
      height: 18px;
      accent-color: var(--accent, #4f46e5);
    }
  }

  .help-form__button {
    min-height: 48px;
    padding: var(--space-3, 12px) var(--space-6, 32px);
    background: var(--accent, #4f46e5);
    color: var(--accent-contrast, #fff);
    border: none;
    border-radius: var(--radius-full, 999px);
    font-size: var(--fs-md, 1rem);
    font-weight: var(--fw-semibold, 600);
    cursor: pointer;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &:hover { background: var(--accent-hover, #4338ca); }

    &:focus-visible {
      outline: 2px solid var(--focus-color, #6366f1);
      outline-offset: 2px;
    }
  }

  .help-form__success {
    padding: var(--space-4, 16px);
    border-radius: var(--radius-md, 10px);
    background: var(--success-soft, #ecfdf5);
    color: var(--text-1, #0f172a);

    p { margin: 0 0 var(--space-2, 8px); }
    p:last-child { margin-bottom: 0; }
    a { color: var(--text-link, #4338ca); }
  }

  .help-form__success-title { font-weight: var(--fw-semibold, 600); }

  @media (prefers-reduced-motion: reduce) {
    .help-form__button { transition: none; }
  }
</style>

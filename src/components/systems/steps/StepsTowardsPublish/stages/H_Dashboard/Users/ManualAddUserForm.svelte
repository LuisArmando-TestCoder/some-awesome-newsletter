<!-- Add one subscriber by hand. Validates on submit only; a field's error clears as soon as that field changes.
     Public API kept for older callers: props `disabled`, `onSubmit(formData)`, method `reset()`. -->
<script lang="ts">
  import type { NewsletterUser } from "../../../../../../types";
  import Field from "$lib/dashboard/ui/Field.svelte";
  import Button from "$lib/dashboard/ui/Button.svelte";
  import Notice from "$lib/dashboard/ui/Notice.svelte";
  import { dt } from "$lib/dashboard/i18n";
  import { checkPlanLimit } from "$lib/utils/checkPlanLimits";
  import languagesData from "../../../../../inputs/Language/languages";

  type FormDataPayload = Pick<NewsletterUser, "name" | "email" | "bio" | "language">;

  export let disabled: boolean = false;
  export let onSubmit: (formData: FormDataPayload) => void | Promise<void> = () => {};
  /** Language preselected in the form. */
  export let defaultLanguage: string = "en";

  const uid = Math.random().toString(36).slice(2, 8);
  const languages = [...languagesData].sort((a, b) => a.name.localeCompare(b.name));

  let name = "";
  let email = "";
  let bio = "";
  let language = defaultLanguage;
  let isSubmitting = false;
  let errors: { name?: string; email?: string; language?: string } = {};
  let formError: string | null = null;

  function clear(field: keyof typeof errors) {
    if (errors[field]) errors = { ...errors, [field]: undefined };
    formError = null;
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!name.trim()) next.name = $dt("dash.subs.add.nameRequired");
    if (!email.trim()) next.email = $dt("dash.subs.add.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = $dt("dash.subs.add.emailInvalid");
    if (!language) next.language = $dt("dash.subs.add.languageRequired");
    errors = next;
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (disabled || isSubmitting) return;
    formError = null;
    if (!validate()) return;
    const limit = checkPlanLimit("users");
    if (!limit.allowed) {
      formError = $dt("dash.subs.add.limit", { limit: limit.limit });
      return;
    }
    isSubmitting = true;
    try {
      await onSubmit({ name: name.trim(), email: email.trim(), bio: bio.trim(), language });
    } catch (error) {
      formError = error instanceof Error && error.message ? error.message : $dt("dash.subs.add.failed");
    } finally {
      isSubmitting = false;
    }
  }

  export function reset() {
    name = "";
    email = "";
    bio = "";
    language = defaultLanguage;
    errors = {};
    formError = null;
    isSubmitting = false;
  }
</script>

<form class="manual-add" on:submit|preventDefault={handleSubmit} novalidate>
  <div class="grid">
    <Field id="add-email-{uid}" label={$dt("labels.emailAddress")} error={errors.email ?? null}>
      <input
        id="add-email-{uid}"
        type="email"
        autocomplete="off"
        inputmode="email"
        bind:value={email}
        on:input={() => clear("email")}
        disabled={disabled || isSubmitting}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? `add-email-${uid}-error` : undefined}
        placeholder="ana@example.com"
      />
    </Field>
    <Field id="add-name-{uid}" label={$dt("labels.name")} error={errors.name ?? null}>
      <input
        id="add-name-{uid}"
        type="text"
        autocomplete="off"
        bind:value={name}
        on:input={() => clear("name")}
        disabled={disabled || isSubmitting}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? `add-name-${uid}-error` : undefined}
      />
    </Field>
    <Field id="add-lang-{uid}" label={$dt("dash.subs.add.languageLabel")} hint={$dt("dash.subs.add.languageHint")} error={errors.language ?? null}>
      <select
        id="add-lang-{uid}"
        bind:value={language}
        on:change={() => clear("language")}
        disabled={disabled || isSubmitting}
        aria-describedby="add-lang-{uid}-hint"
      >
        {#each languages as l (l.code)}
          <option value={l.code}>{l.name}</option>
        {/each}
      </select>
    </Field>
    <Field id="add-bio-{uid}" label={$dt("dash.subs.add.bioLabel")} hint={$dt("dash.subs.add.bioHint")} optional optionalLabel={$dt("dash.common.optional")}>
      <textarea id="add-bio-{uid}" rows="2" bind:value={bio} disabled={disabled || isSubmitting} aria-describedby="add-bio-{uid}-hint"></textarea>
    </Field>
  </div>

  {#if formError}
    <Notice tone="danger">{formError}</Notice>
  {/if}

  <div class="row">
    <Button type="submit" variant="primary" icon="plus" loading={isSubmitting} disabled={disabled}>{$dt("dash.subs.add.submit")}</Button>
  </div>
</form>

<style lang="scss">
  .manual-add { display: flex; flex-direction: column; gap: var(--space-4); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: var(--space-4); }
  .grid :global(.field:last-child) { grid-column: 1 / -1; }
  .row { display: flex; justify-content: flex-end; }
  @media (max-width: 40rem) {
    .row :global(button) { width: 100%; min-height: 44px; }
  }
</style>

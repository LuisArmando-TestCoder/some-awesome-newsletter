<script lang="ts">
  import { z } from 'zod';
  import EmailInput from '$lib/ui/components/EmailInput.svelte';
  import Textarea from '$lib/ui/components/Textarea.svelte';

  export let user: any;
  export let content: any;

  const upliftRequestSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    company: z.string().min(2).optional(),
    desiredLimits: z.string().min(10),
    useCase: z.string().min(20),
    expectedSpend: z.enum(['lt500','500_2k','2k_10k','gt10k','unknown']),
    urgency: z.enum(['low','normal','high']),
    contact: z.enum(['email','call']),
    payAsYouGo: z.boolean(),
  });

  let formData = {
    name: user.name,
    email: user.email,
    company: user.company,
    desiredLimits: '',
    useCase: '',
    expectedSpend: 'unknown',
    urgency: 'normal',
    contact: 'email',
    payAsYouGo: false,
  };

  let errors: any = {};

  async function handleSubmit() {
    const result = upliftRequestSchema.safeParse(formData);
    if (!result.success) {
      errors = result.error.flatten().fieldErrors;
      return;
    }
    // Handle form submission
    console.log('Form submitted:', result.data);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="help-form">
  <div class="help-form__group">
    <label for="name" class="help-form__label">Name</label>
    <input type="text" id="name" bind:value={formData.name} class="help-form__input" />
    {#if errors.name}
      <p class="help-form__error">{errors.name[0]}</p>
    {/if}
  </div>

  <div class="help-form__group">
    <label for="email" class="help-form__label">Email</label>
    <EmailInput bind:value={formData.email} />
    {#if errors.email}
      <p class="help-form__error">{errors.email[0]}</p>
    {/if}
  </div>

  <div class="help-form__group">
    <label for="company" class="help-form__label">Company</label>
    <input type="text" id="company" bind:value={formData.company} class="help-form__input" />
  </div>

  <div class="help-form__group">
    <label for="desiredLimits" class="help-form__label">Desired Limits</label>
    <Textarea id="desiredLimits" bind:value={formData.desiredLimits} />
    <p class="help-form__help">{content.questions.desiredLimitsHelp}</p>
    {#if errors.desiredLimits}
      <p class="help-form__error">{errors.desiredLimits[0]}</p>
    {/if}
  </div>

  <div class="help-form__group">
    <label for="useCase" class="help-form__label">Use Case</label>
    <Textarea id="useCase" bind:value={formData.useCase} />
    <p class="help-form__help">{content.questions.useCaseHelp}</p>
    {#if errors.useCase}
      <p class="help-form__error">{errors.useCase[0]}</p>
    {/if}
  </div>

  <div class="help-form__group">
    <label for="expectedSpend" class="help-form__label">Expected Spend</label>
    <select id="expectedSpend" bind:value={formData.expectedSpend} class="help-form__select">
      <option value="lt500">less than $500</option>
      <option value="500_2k">$500 - $2k</option>
      <option value="2k_10k">$2k - $10k</option>
      <option value="gt10k">more than $10k</option>
      <option value="unknown">Unknown</option>
    </select>
    <p class="help-form__help">{content.questions.expectedSpendHelp}</p>
  </div>

  <div class="help-form__group">
    <label for="urgency" class="help-form__label">Urgency</label>
    <select id="urgency" bind:value={formData.urgency} class="help-form__select">
      <option value="low">Low</option>
      <option value="normal">Normal</option>
      <option value="high">High</option>
    </select>
  </div>

  <div class="help-form__group">
    <label for="contact" class="help-form__label">Preferred Contact Method</label>
    <select id="contact" bind:value={formData.contact} class="help-form__select">
      <option value="email">Email</option>
      <option value="call">Call</option>
    </select>
  </div>

  <div class="help-form__group">
    <label class="help-form__label">
      <input type="checkbox" bind:checked={formData.payAsYouGo} />
      Interested in Pay-As-You-Go
    </label>
  </div>

  <button type="submit" class="help-form__button">{content.contact.cta}</button>
</form>

<style lang="scss">
  @use '../../../styles/global.scss';

  .help-form {
    display: grid;
    gap: var(--space-lg);
  }

  .help-form__group {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .help-form__label {
    font-weight: 600;
  }

  .help-form__input,
  .help-form__textarea,
  .help-form__select {
    width: 100%;
    padding: var(--space-sm);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
  }

  .help-form__help {
    font-size: 0.9rem;
    color: var(--c-text-light);
  }

  .help-form__error {
    color: red;
  }

  .help-form__button {
    padding: var(--space-md) var(--space-lg);
    background-color: var(--c-primary);
    color: var(--c-white);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
  }
</style>

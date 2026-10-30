<!--
  Living style guide (WS1). Shows every design system primitive with real props.
  Not linked from the app and marked noindex. Docs: docs/aiban/DESIGN_SYSTEM.md
-->
<script lang="ts">
  import {
    Button, IconButton, Spinner, Badge, Card, Skeleton, EmptyState, StatTile, Progress, Stepper, Tooltip,
    TextField, Textarea, Select, Checkbox, RadioGroup, Switch, FileUpload, Dialog, Drawer, Tabs, SettingsMenu, toast,
  } from "$lib/ui/components";
  import SubmitButton from "../../components/systems/buttons/SubmitButton/SubmitButton.svelte";
  import MarkdownText from "../../components/systems/texts/MarkdownText/MarkdownText.svelte";

  let name = $state("");
  let website = $state("");
  let nameError = $state("");
  let frequency = $state("weekly");
  let language = $state("");
  let notes = $state("");
  let agree = $state(false);
  let autoSend = $state(true);
  let dialogOpen = $state(false);
  let drawerOpen = $state(false);
  let activeTab = $state("overview");
  let step = $state(1);
  let loading = $state(false);

  const swatches = [
    "surface-0", "surface-1", "surface-2", "surface-3", "surface-inverse",
    "text-1", "text-2", "text-3", "accent", "accent-soft",
    "success", "warning", "danger", "info", "border-1", "border-2",
  ];
  const sizes = ["fs-4xl", "fs-3xl", "fs-2xl", "fs-xl", "fs-lg", "fs-md", "fs-sm", "fs-xs"];

  function submitName() {
    nameError = name.trim() ? "" : "Enter your newsletter name. Readers see it in their inbox.";
    if (!nameError) toast.success("Saved. Your next issue uses this name.");
  }

  function fakeSave() {
    loading = true;
    setTimeout(() => (loading = false), 1500);
  }
</script>

<svelte:head>
  <title>Style guide</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="guide">
  <header class="guide-head">
    <div>
      <p class="eyebrow">AIBAN design system</p>
      <h1>Style guide</h1>
      <p class="lede">Every primitive, with the props it takes. Switch the theme and density with the Display menu to check both.</p>
    </div>
    <SettingsMenu />
  </header>

  <section>
    <h2>Color</h2>
    <ul class="swatches">
      {#each swatches as s, itemIndex (itemIndex)}
        <li><span class="chip" style={`background: var(--${s})`}></span><code>--{s}</code></li>
      {/each}
    </ul>
  </section>

  <section>
    <h2>Type</h2>
    {#each sizes as s, itemIndex (itemIndex)}
      <p class="type-row" style={`font-size: var(--${s})`}><code>--{s}</code> Your readers get every issue in their own language.</p>
    {/each}
    <p class="type-row display">Lora for headlines. Inter for everything you click, read in a form or scan in a table.</p>
  </section>

  <section>
    <h2>Buttons</h2>
    <p class="note">One primary action per view. Secondary for the alternative. Tertiary is a text link.</p>
    <div class="row">
      <Button>Send now</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="tertiary">Skip this one</Button>
      <Button variant="danger">Delete source</Button>
      <Button variant="ghost">Cancel</Button>
      <Button loading={loading} onclick={fakeSave}>Save changes</Button>
      <Button disabled>Disabled</Button>
      <Button size="sm" variant="secondary">Small</Button>
      <IconButton label="Settings">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
      </IconButton>
      <Spinner />
    </div>
    <h3>Legacy SubmitButton</h3>
    <div class="row">
      <SubmitButton label="Next" align="none" callback={() => {}} />
      <SubmitButton label="Back" variant="secondary" align="none" callback={() => {}} />
      <SubmitButton label="Saving" loading={true} align="none" callback={() => {}} />
    </div>
  </section>

  <section>
    <h2>Badges and tooltip</h2>
    <div class="row">
      <Badge>Draft</Badge>
      <Badge tone="accent">Scheduled</Badge>
      <Badge tone="success" dot>Sent</Badge>
      <Badge tone="warning">Waiting</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="info">New</Badge>
      <Tooltip text="We check your site every morning.">
        {#snippet children({ describedBy })}
          <Button variant="tertiary" aria-describedby={describedBy}>How often?</Button>
        {/snippet}
      </Tooltip>
    </div>
  </section>

  <section>
    <h2>Form controls</h2>
    <div class="form">
      <TextField label="Newsletter name" bind:value={name} error={nameError} hint="Readers see this as the sender name." required />
      <TextField label="Your website" type="url" bind:value={website} prefix="https://" placeholder="example.com" hint="We read new articles from here." />
      <Select
        label="How often should we send?"
        bind:value={frequency}
        options={[{ value: "daily", label: "Every day" }, { value: "weekly", label: "Every week" }, { value: "monthly", label: "Every month" }]}
        hint="If you skip this, we send every Monday at 9:00."
      />
      <Select label="Main reader language" bind:value={language} placeholder="Choose a language" optional options={[{ value: "en", label: "English" }, { value: "es", label: "Spanish" }, { value: "fr", label: "French" }]} />
      <Textarea label="Your ideal reader" bind:value={notes} placeholder="Small business owners in Madrid who want practical tax tips" hint="Optional. We guess it from your website if you leave it empty." />
      <RadioGroup legend="Writing voice" value="friendly" options={[{ value: "friendly", label: "Friendly", description: "Warm and plain" }, { value: "formal", label: "Formal", description: "Precise and polite" }]} />
      <Checkbox bind:checked={agree} label="Email me a weekly report" description="What was sent, who joined and what readers clicked." />
      <Switch toggled={autoSend} label="Send automatically" onChange={(v: boolean) => (autoSend = v)} />
      <FileUpload
        label="Logo"
        accept="image/png,image/jpeg,image/svg+xml"
        maxSizeMb={2}
        requirements="PNG, JPG or SVG. Up to 2 MB. At least 400 x 400 px, square works best."
        usage="Appears at the top of every email and on your blog."
        optional
      />
      <div class="row"><Button onclick={submitName}>Save</Button><Button variant="tertiary">Cancel</Button></div>
    </div>
  </section>

  <section>
    <h2>Cards, stats and empty states</h2>
    <div class="grid">
      <StatTile label="Readers reached" value="1,250" hint="Last 7 days" delta={{ value: "8%", direction: "up", good: true }} />
      <StatTile label="Clicks" value="312" hint="Last 7 days" delta={{ value: "3%", direction: "down", good: false }} />
      <StatTile label="Languages" value="4" hint="Across all subscribers" />
      <StatTile label="Loading" value="0" loading />
    </div>
    <div class="grid two">
      <Card title="Weekly issue" description="When it is Monday at 9:00, send your readers the best new article in their language.">
        {#snippet footer()}<Badge tone="success" dot>On</Badge>{/snippet}
      </Card>
      <Card><Skeleton lines={3} /></Card>
    </div>
    <EmptyState title="No subscribers yet" description="Share your signup link or import a contact list. New subscribers appear here.">
      {#snippet actions()}<Button>Import contacts</Button><Button variant="tertiary">Copy signup link</Button>{/snippet}
    </EmptyState>
  </section>

  <section>
    <h2>Progress and steps</h2>
    <Progress label="Getting started" value={3} max={5} showValue valueText="3 of 5 steps" />
    <Stepper
      steps={[{ label: "Your website" }, { label: "Preview" }, { label: "Test send" }, { label: "Turn on" }]}
      current={step}
      onselect={(i: number) => (step = i)}
    />
    <div class="row"><Button variant="secondary" onclick={() => (step = Math.min(step + 1, 3))}>Next step</Button></div>
  </section>

  <section>
    <h2>Tabs</h2>
    <Tabs tabs={[{ id: "overview", label: "Overview" }, { id: "issues", label: "Issues sent", badge: 12 }, { id: "clicks", label: "Clicks" }]} bind:active={activeTab} label="Reports">
      {#snippet panel(id: string)}<p class="note">Showing the {id} panel.</p>{/snippet}
    </Tabs>
  </section>

  <section>
    <h2>Overlays and feedback</h2>
    <div class="row">
      <Button variant="secondary" onclick={() => (dialogOpen = true)}>Open dialog</Button>
      <Button variant="secondary" onclick={() => (drawerOpen = true)}>Open drawer</Button>
      <Button variant="secondary" onclick={() => toast.success("Your test issue is on its way.")}>Success toast</Button>
      <Button variant="secondary" onclick={() => toast.error("We could not reach your site. Check the address and try again.")}>Error toast</Button>
    </div>
    <Dialog bind:open={dialogOpen} title="Send this issue now?" description="It goes to 1,250 subscribers in 4 languages.">
      <p class="note">You can still edit the next scheduled issue afterwards.</p>
      {#snippet footer()}<Button variant="secondary" onclick={() => (dialogOpen = false)}>Cancel</Button><Button onclick={() => (dialogOpen = false)}>Send now</Button>{/snippet}
    </Dialog>
    <Drawer bind:open={drawerOpen} title="Run details">
      <p class="note">Detected, rewritten, translated, emailed and published.</p>
    </Drawer>
  </section>

  <section>
    <h2>Markdown text</h2>
    <MarkdownText>## Where your content comes from
We read new articles from your website. **Bold** marks what matters. Double hyphens -- stay as typed.</MarkdownText>
  </section>
</main>

<style>
  .guide { max-width: var(--container-lg); margin: 0 auto; padding: var(--space-7) var(--space-5) var(--space-10); color: var(--text-1); }
  .guide-head { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-5); margin-bottom: var(--space-7); }
  .eyebrow { font-size: var(--fs-sm); font-weight: var(--fw-semibold); letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--text-3); margin: 0 0 var(--space-2); }
  h1 { font-family: var(--font-display); font-size: var(--fs-4xl); margin: 0 0 var(--space-3); }
  h2 { font-family: var(--font-display); font-size: var(--fs-2xl); margin: 0 0 var(--space-4); }
  h3 { font-size: var(--fs-lg); margin: var(--space-5) 0 var(--space-3); }
  .lede { font-size: var(--fs-lg); color: var(--text-2); max-width: var(--measure); margin: 0; }
  section { padding: var(--space-7) 0; border-top: 1px solid var(--border-1); }
  .note { color: var(--text-2); margin: 0 0 var(--space-4); }
  .row { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }
  .form { display: grid; gap: var(--space-5); max-width: var(--container-sm); }
  .grid { display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); margin-bottom: var(--space-5); }
  .grid.two { grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); }
  .swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: var(--space-3); list-style: none; padding: 0; margin: 0; }
  .swatches li { display: flex; align-items: center; gap: var(--space-2); font-size: var(--fs-sm); }
  .chip { width: 2rem; height: 2rem; border-radius: var(--radius-sm); border: 1px solid var(--border-1); flex: none; }
  .type-row { margin: 0 0 var(--space-3); line-height: var(--lh-snug); }
  .type-row code { font-size: var(--fs-xs); color: var(--text-3); margin-right: var(--space-3); }
  .display { font-family: var(--font-display); font-size: var(--fs-xl); }
  code { font-family: var(--font-mono); }
  @media (max-width: 40rem) { .guide-head { flex-direction: column; } }
</style>

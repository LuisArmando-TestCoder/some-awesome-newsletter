<!-- WS15. The owner's blog: its address (renamable, never the email) and, the part that grows
     their own website in search, the option to serve it from a domain they own. -->
<script lang="ts">
  import { onMount } from "svelte";
  import Card from "../ui/Card.svelte";
  import Button from "../ui/Button.svelte";
  import Field from "../ui/Field.svelte";
  import Notice from "../ui/Notice.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import ErrorState from "../ui/ErrorState.svelte";
  import { confirmAction } from "../ui/confirm";
  import { dt as tr } from "../i18n";
  import { toast } from "$lib/ui/components/toast";
  import { fieldError, getBlogSite, updateBlogSite, verifyBlogDomain, type BlogSiteSettings } from "$lib/api/blogSite";

  const uid = Math.random().toString(36).slice(2, 8);
  let site: BlogSiteSettings | null = null;
  let loadError = "";

  let editing = false;
  let handleDraft = "";
  let handleError = "";
  let savingHandle = false;

  let domainDraft = "";
  let domainError = "";
  let savingDomain = false;
  let checking = false;
  let removing = false;

  let copied: string | null = null;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  async function load() {
    loadError = "";
    try {
      site = await getBlogSite();
    } catch (e) {
      loadError = e instanceof Error ? e.message : String(e);
    }
  }
  onMount(load);

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      copied = key;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copied = null), 2500);
    } catch {
      /* the value is visible and selectable */
    }
  }

  function startEdit() {
    handleDraft = site?.handle ?? "";
    handleError = "";
    editing = true;
  }

  async function saveHandle() {
    if (savingHandle) return;
    savingHandle = true;
    handleError = "";
    try {
      site = await updateBlogSite({ handle: handleDraft });
      editing = false;
      toast.success($tr("dash.blog.site.saved"));
    } catch (e) {
      handleError = fieldError(e, "handle");
    } finally {
      savingHandle = false;
    }
  }

  async function connect() {
    if (savingDomain) return;
    domainError = "";
    if (!domainDraft.trim()) {
      domainError = $tr("dash.blog.domain.hint");
      return;
    }
    savingDomain = true;
    try {
      site = await updateBlogSite({ domain: domainDraft.trim() });
    } catch (e) {
      domainError = fieldError(e, "domain");
    } finally {
      savingDomain = false;
    }
  }

  async function check() {
    if (checking) return;
    checking = true;
    try {
      site = await verifyBlogDomain();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    } finally {
      checking = false;
    }
  }

  async function remove() {
    if (!site?.domain || removing) return;
    const domain = site.domain;
    const ok = await confirmAction({
      title: $tr("dash.blog.domain.remove"),
      body: $tr("dash.blog.domain.removeConfirm", { domain }),
      confirmLabel: $tr("dash.blog.domain.remove"),
      cancelLabel: $tr("dash.blog.site.cancel"),
      tone: "danger",
    });
    if (!ok) return;
    removing = true;
    try {
      site = await updateBlogSite({ domain: null });
      domainDraft = "";
      toast.success($tr("dash.blog.domain.removed"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    } finally {
      removing = false;
    }
  }

  const when = (iso: string | null) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return iso;
    }
  };
  $: status = site?.domainStatus ?? "none";
  $: live = status === "live";
</script>

<Card title={$tr("dash.blog.site.title")} subtitle={$tr("dash.blog.site.subtitle")} tone="accent">
  {#if loadError}
    <ErrorState message={loadError} onRetry={load} />
  {:else if !site}
    <Skeleton lines={3} label={$tr("dash.state.loading")} />
  {:else}
    <div class="addr">
      <label class="addr__label" for="blog-url-{uid}">{$tr("dash.blog.site.address")}</label>
      <input id="blog-url-{uid}" class="addr__input" type="text" readonly value={site.blogUrl} on:focus={(e) => e.currentTarget.select()} />
    </div>
    <div class="row">
      <Button variant="primary" iconAfter="external" href={site.blogUrl} target="_blank">{$tr("dash.blog.site.open")}</Button>
      <Button variant="secondary" icon={copied === "url" ? "check" : "code"} onclick={() => copy(site?.blogUrl ?? "", "url")}>
        {copied === "url" ? $tr("dash.blog.site.copied") : $tr("dash.blog.site.copy")}
      </Button>
      {#if !live && !editing}
        <Button variant="tertiary" onclick={startEdit}>{$tr("dash.blog.site.edit")}</Button>
      {/if}
    </div>

    {#if editing}
      <form class="edit" on:submit|preventDefault={saveHandle}>
        <Field id="blog-handle-{uid}" label={$tr("dash.blog.site.handleLabel")} hint={$tr("dash.blog.site.handleHint")} error={handleError || null}>
          <div class="prefix">
            <span class="prefix__text" aria-hidden="true">{site.defaultUrl.replace(/[^/]+$/, "")}</span>
            <input
              id="blog-handle-{uid}"
              class="input"
              bind:value={handleDraft}
              autocomplete="off"
              spellcheck="false"
              aria-invalid={handleError ? "true" : undefined}
              aria-describedby="blog-handle-{uid}-hint{handleError ? ` blog-handle-${uid}-error` : ''}"
            />
          </div>
        </Field>
        <div class="row">
          <Button variant="primary" type="submit" loading={savingHandle} loadingLabel={$tr("dash.blog.site.saving")}>{$tr("dash.blog.site.save")}</Button>
          <Button variant="ghost" onclick={() => (editing = false)}>{$tr("dash.blog.site.cancel")}</Button>
        </div>
      </form>
    {/if}

    <section class="domain" aria-labelledby="blog-domain-{uid}">
      <div class="domain__head">
        <h3 id="blog-domain-{uid}" class="domain__title">{$tr("dash.blog.domain.title")}</h3>
        {#if site.domain}
          <span class="status status--{status}"><span class="status__dot" aria-hidden="true"></span>{$tr(`dash.blog.domain.status.${status}`)}</span>
        {/if}
      </div>

      {#if !site.domain}
        <p class="domain__why">{$tr("dash.blog.domain.why")}</p>
        <form class="domain__form" on:submit|preventDefault={connect} novalidate>
          <Field id="blog-domain-input-{uid}" label={$tr("dash.blog.domain.label")} hint={$tr("dash.blog.domain.hint")} error={domainError || null}>
            <input
              id="blog-domain-input-{uid}"
              class="input"
              bind:value={domainDraft}
              placeholder={$tr("dash.blog.domain.placeholder")}
              inputmode="url"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              aria-invalid={domainError ? "true" : undefined}
              aria-describedby="blog-domain-input-{uid}-hint{domainError ? ` blog-domain-input-${uid}-error` : ''}"
            />
          </Field>
          <div class="row">
            <Button variant="primary" type="submit" loading={savingDomain} loadingLabel={$tr("dash.blog.domain.connecting")}>{$tr("dash.blog.domain.connect")}</Button>
          </div>
        </form>
      {:else if live}
        <Notice tone="success">{$tr("dash.blog.domain.liveBody", { url: `https://${site.domain}` })}</Notice>
        <div class="row">
          <Button variant="ghost" size="sm" loading={removing} onclick={remove}>{$tr("dash.blog.domain.remove")}</Button>
        </div>
      {:else}
        {#if site.dns}
          <p class="domain__step">{$tr("dash.blog.domain.stepTitle")}</p>
          <p class="domain__why">{$tr("dash.blog.domain.stepBody")}</p>
          <dl class="dns">
            {#each [["type", site.dns.type], ["name", site.dns.name], ["value", site.dns.value]] as [field, value] (field)}
              <div class="dns__row">
                <dt>{$tr(`dash.blog.domain.${field}`)}</dt>
                <dd>
                  <code>{value}</code>
                  {#if field !== "type"}
                    <button
                      type="button"
                      class="dns__copy"
                      on:click={() => copy(value, field)}
                      aria-label={$tr("dash.blog.domain.copyValue", { field: $tr(`dash.blog.domain.${field}`) })}
                    >{copied === field ? $tr("dash.blog.site.copied") : $tr("dash.blog.site.copy")}</button>
                  {/if}
                </dd>
              </div>
            {/each}
          </dl>
        {/if}
        {#if site.domainMessage}
          <Notice tone={status === "failed" ? "danger" : status === "dns_ok" ? "success" : "info"}>{site.domainMessage}</Notice>
        {/if}
        <div class="row">
          {#if status !== "dns_ok"}
            <Button variant="primary" loading={checking} loadingLabel={$tr("dash.blog.domain.checking")} onclick={check}>{$tr("dash.blog.domain.check")}</Button>
          {/if}
          <Button variant="ghost" loading={removing} onclick={remove}>{$tr("dash.blog.domain.remove")}</Button>
        </div>
        {#if site.domainCheckedAt}
          <p class="domain__when">{$tr("dash.blog.domain.lastChecked", { when: when(site.domainCheckedAt) })}</p>
        {/if}
      {/if}
    </section>
    <p class="sr" aria-live="polite">{copied ? $tr("dash.blog.site.copied") : ""}</p>
  {/if}
</Card>

<style lang="scss">
  .addr { display: flex; flex-direction: column; gap: var(--space-2); max-width: var(--container-sm); }
  .addr__label { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); }
  .addr__input,
  .input {
    width: 100%;
    min-height: var(--control-h);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-md);
    background: var(--surface-2);
    color: var(--text-1);
    font: inherit;
    font-size: var(--fs-sm);
    box-sizing: border-box;
    min-width: 0;
  }
  .addr__input { font-family: var(--font-mono); text-overflow: ellipsis; }
  .input { background: var(--surface-1); }
  .addr__input:focus-visible,
  .input:focus-visible { outline: none; box-shadow: var(--focus-ring); border-color: var(--text-1); }
  .input[aria-invalid="true"] { border-color: var(--danger); }
  .row { display: flex; gap: var(--space-2); flex-wrap: wrap; align-items: center; margin-top: var(--space-4); }
  .edit { margin-top: var(--space-5); max-width: var(--container-sm); }
  .prefix { display: flex; align-items: stretch; min-width: 0; }
  .prefix__text {
    display: flex; align-items: center; padding: 0 var(--space-3);
    border: 1px solid var(--border-1); border-right: 0; border-radius: var(--radius-md) 0 0 var(--radius-md);
    background: var(--surface-2); color: var(--text-3); font-family: var(--font-mono); font-size: var(--fs-xs);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 50%;
  }
  .prefix .input { border-radius: 0 var(--radius-md) var(--radius-md) 0; font-family: var(--font-mono); }

  .domain { margin-top: var(--space-6); padding-top: var(--space-5); border-top: 1px solid var(--border-1); max-width: 40rem; }
  .domain__head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); flex-wrap: wrap; }
  .domain__title { margin: 0; font-size: var(--fs-lg); font-weight: var(--fw-semibold); letter-spacing: -0.01em; color: var(--text-1); }
  .domain__why { margin: var(--space-2) 0 0; color: var(--text-2); line-height: var(--lh-normal); font-size: var(--fs-sm); }
  .domain__step { margin: var(--space-4) 0 0; font-weight: var(--fw-semibold); color: var(--text-1); }
  .domain__form { margin-top: var(--space-4); }
  .domain__when { margin: var(--space-3) 0 0; font-size: var(--fs-xs); color: var(--text-3); }

  .status {
    display: inline-flex; align-items: center; gap: var(--space-2); min-height: 1.5rem; padding: 0 var(--space-2);
    border-radius: var(--radius-full); background: var(--surface-2); color: var(--text-2);
    font-size: var(--fs-xs); font-weight: var(--fw-medium); white-space: nowrap;
  }
  .status__dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--text-3); }
  .status--live .status__dot { background: var(--success, #1a7f37); }
  .status--dns_ok .status__dot,
  .status--pending .status__dot { background: var(--warning, #b25e09); }
  .status--failed .status__dot { background: var(--danger, #b42318); }

  .dns { margin: var(--space-4) 0 0; border: 1px solid var(--border-1); border-radius: var(--radius-md); overflow: hidden; }
  .dns__row { display: grid; grid-template-columns: 6rem minmax(0, 1fr); align-items: center; border-top: 1px solid var(--border-1); }
  .dns__row:first-child { border-top: 0; }
  .dns dt { padding: var(--space-3); font-size: var(--fs-xs); color: var(--text-3); background: var(--surface-2); align-self: stretch; display: flex; align-items: center; }
  .dns dd { margin: 0; padding: var(--space-2) var(--space-3); display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); min-width: 0; }
  .dns code { font-family: var(--font-mono); font-size: var(--fs-sm); color: var(--text-1); overflow-wrap: anywhere; }
  .dns__copy {
    flex: none; min-height: 2rem; padding: 0 var(--space-3); border: 1px solid var(--border-1); border-radius: var(--radius-full);
    background: var(--surface-1); color: var(--text-1); font: inherit; font-size: var(--fs-xs); cursor: pointer;
  }
  @media (hover: hover) and (pointer: fine) { .dns__copy:hover { background: var(--surface-2); } }
  .dns__copy:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  .dns__copy:active { transform: scale(0.97); }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; margin: 0; }
</style>

<!-- WS4. Logo upload with the specs written next to the control (copy rules: format,
     max size, min size, aspect ratio and where it appears). Click or drop a file. -->
<script lang="ts">
  import Button from "../ui/Button.svelte";
  import Icon from "../ui/Icon.svelte";
  import { dt } from "../i18n";
  import { safeImageSrc } from "./emailHtml";

  export let value = "";
  export let id = "settings-logo";
  /** Called with the new value ("" when removed). */
  export let onchange: ((v: string) => void) | null = null;

  const TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
  const MAX_BYTES = 2 * 1024 * 1024;
  const MIN_WIDTH = 200;

  let input: HTMLInputElement;
  let error = "";
  let busy = false;
  let over = false;

  $: src = safeImageSrc(value);

  function readAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = () => reject(r.error);
      r.readAsDataURL(file);
    });
  }
  function widthOf(url: string): Promise<number> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img.naturalWidth);
      img.onerror = () => resolve(0);
      img.src = url;
    });
  }

  async function take(file: File | undefined | null) {
    error = "";
    if (!file) return;
    if (!TYPES.includes(file.type)) {
      error = $dt("dash.settings.logo.errorType");
      return;
    }
    if (file.size > MAX_BYTES) {
      error = $dt("dash.settings.logo.errorSize");
      return;
    }
    busy = true;
    try {
      const url = await readAsDataUrl(file);
      const w = await widthOf(url);
      if (!w) {
        error = $dt("dash.settings.logo.errorRead");
        return;
      }
      if (w < MIN_WIDTH) {
        error = $dt("dash.settings.logo.errorWidth", { width: w });
        return;
      }
      value = url;
      onchange?.(url);
    } catch {
      error = $dt("dash.settings.logo.errorRead");
    } finally {
      busy = false;
      if (input) input.value = "";
    }
  }

  function remove() {
    value = "";
    error = "";
    onchange?.("");
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    over = false;
    take(e.dataTransfer?.files?.[0]);
  }
</script>

<div class="logo">
  <span class="logo__label" id="{id}-label">{$dt("dash.settings.logo.label")} <span class="logo__opt">{$dt("dash.settings.optional")}</span></span>
  <div
    class="logo__drop"
    class:over
    class:has={!!src}
    class:invalid={!!error}
    role="group"
    aria-labelledby="{id}-label"
    aria-describedby="{id}-specs"
    on:dragover|preventDefault={() => (over = true)}
    on:dragleave={() => (over = false)}
    on:drop={onDrop}
  >
    <div class="logo__thumb" aria-hidden={!src}>
      {#if src}
        <img src={value} alt={$dt("dash.settings.logo.currentAlt")} />
      {:else}
        <Icon name="upload" size={24} />
      {/if}
    </div>
    <div class="logo__body">
      <p class="logo__lead">{src ? $dt("dash.settings.logo.replaceLead") : $dt("dash.settings.logo.emptyLead")}</p>
      <div class="logo__actions">
        <input
          bind:this={input}
          {id}
          class="logo__input"
          type="file"
          tabindex="-1"
          aria-hidden="true"
          accept="image/png,image/jpeg,image/webp,image/gif"
          on:change={(e) => take(e.currentTarget.files?.[0])}
        />
        <Button variant="secondary" size="sm" icon="upload" loading={busy} onclick={() => input?.click()}>
          {src ? $dt("dash.settings.logo.replace") : $dt("dash.settings.logo.choose")}
        </Button>
        {#if src}
          <Button variant="tertiary" size="sm" onclick={remove}>{$dt("dash.settings.logo.remove")}</Button>
        {/if}
      </div>
    </div>
  </div>
  <ul class="logo__specs" id="{id}-specs">
    <li>{$dt("dash.settings.logo.specFormat")}</li>
    <li>{$dt("dash.settings.logo.specSize")}</li>
    <li>{$dt("dash.settings.logo.specShape")}</li>
    <li>{$dt("dash.settings.logo.specWhere")}</li>
    <li>{$dt("dash.settings.logo.specSkip")}</li>
  </ul>
  {#if error}<p class="logo__error" role="alert">{error}</p>{/if}
</div>

<style lang="scss">
  .logo { display: flex; flex-direction: column; gap: var(--space-2); }
  .logo__label { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); }
  .logo__opt { font-weight: var(--fw-regular); color: var(--text-3); font-size: var(--fs-xs); margin-left: var(--space-2); }
  .logo__drop {
    display: flex;
    gap: var(--space-4);
    align-items: center;
    padding: var(--space-4);
    border: 1px dashed var(--border-2);
    border-radius: var(--radius-lg);
    background: var(--surface-0);
    transition: border-color var(--t-out) var(--ease-out), background-color var(--t-out) var(--ease-out);
    flex-wrap: wrap;
    &.over { border-color: var(--focus-color); border-style: dashed; background: var(--surface-2); }
    &.has { border-style: solid; }
    &.invalid { border-color: var(--danger); border-style: solid; }
  }
  .logo__thumb {
    flex: 0 0 auto;
    width: 9rem;
    height: 4.5rem;
    display: grid;
    place-items: center;
    border-radius: var(--radius-sm);
    background: var(--surface-2);
    color: var(--text-3);
    overflow: hidden;
    img { max-width: 100%; max-height: 100%; object-fit: contain; }
  }
  .logo__body { flex: 1 1 14rem; min-width: 0; display: flex; flex-direction: column; gap: var(--space-2); }
  .logo__lead { margin: 0; font-size: var(--fs-sm); color: var(--text-2); }
  .logo__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; align-items: center; }
  .logo__input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
  .logo__specs {
    margin: 0;
    padding-left: var(--space-5);
    font-size: var(--fs-xs);
    color: var(--text-3);
    line-height: var(--lh-normal);
    display: grid;
    gap: var(--space-1);
  }
  .logo__error { margin: 0; font-size: var(--fs-xs); color: var(--danger); font-weight: var(--fw-medium); }
</style>

<!-- WS4. The public blog link: open it or copy it. -->
<script lang="ts">
  import Card from "../ui/Card.svelte";
  import Button from "../ui/Button.svelte";
  import { dt } from "../i18n";
  import { toast } from "$lib/ui/components/toast";
  import { blogPath, SITE_ORIGIN } from "../../../components/articles/blog";

  export let holder: string;
  export let newsSourceId: string = "";

  const uid = Math.random().toString(36).slice(2, 8);
  let copied = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  $: origin = typeof window !== "undefined" ? window.location.origin : SITE_ORIGIN;
  $: path = holder ? blogPath(holder, { ns: newsSourceId || null }) : "";
  $: url = path ? `${origin}${path}` : "";

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.getElementById(`blog-url-${uid}`) as HTMLInputElement | null;
      el?.select();
      try { document.execCommand("copy"); } catch { /* the field is selected, the owner can copy it */ }
    }
    copied = true;
    toast.success($dt("dash.blog.link.copied"));
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 2500);
  }
</script>

<Card title={$dt("dash.blog.link.title")} subtitle={$dt("dash.blog.link.subtitle")} tone="accent">
  <div class="link">
    <label class="link__label" for="blog-url-{uid}">{$dt("dash.blog.link.label")}</label>
    <input id="blog-url-{uid}" class="link__input" type="text" readonly value={url} on:focus={(e) => e.currentTarget.select()} />
  </div>
  <div class="row">
    <Button variant="primary" iconAfter="external" href={url || null} target="_blank" disabled={!url}>{$dt("dash.blog.link.open")}</Button>
    <Button variant="secondary" icon={copied ? "check" : "code"} onclick={copy} disabled={!url}>{copied ? $dt("dash.common.copied") : $dt("dash.blog.link.copy")}</Button>
  </div>
  <p class="sr" aria-live="polite">{copied ? $dt("dash.blog.link.copied") : ""}</p>
</Card>

<style lang="scss">
  .link { display: flex; flex-direction: column; gap: var(--space-2); max-width: 640px; }
  .link__label { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); }
  .link__input { width: 100%; min-height: 44px; padding: var(--space-2) var(--space-3); border: 1px solid var(--border-2); border-radius: var(--radius-md); background: var(--surface-2); color: var(--text-1); font: inherit; font-size: var(--fs-sm); box-sizing: border-box; text-overflow: ellipsis; }
  .link__input:focus-visible { outline: none; box-shadow: var(--focus-ring); border-color: var(--accent); }
  .row { display: flex; gap: var(--space-2); flex-wrap: wrap; margin-top: var(--space-4); }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; margin: 0; }
</style>

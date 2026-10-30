<script lang="ts">
  import { t } from "../../lib/i18n/translations";
  import { fmt } from "./blog";

  interface Props {
    name: string;
    href: string;
  }

  let { name, href }: Props = $props();
</script>

<aside class="cta" aria-labelledby="blog-cta-title">
  <div class="cta__text">
    <h2 id="blog-cta-title">{$t.blog.cta.title}</h2>
    <p>{fmt($t.blog.cta.body, { name })}</p>
  </div>
  <a class="btn btn--primary" {href}>{$t.blog.cta.button}</a>
</aside>

<style lang="scss">
  .cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5, 24px);
    padding: var(--space-6, 32px);
    background: var(--accent-soft, #eef2ff);
    border: 1px solid var(--border-1, #e5e5e5);
    border-radius: var(--radius-xl, 24px);
  }

  .cta__text {
    flex: 1 1 18rem;
  }

  h2 {
    margin: 0 0 var(--space-2, 8px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-xl, 1.375rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.2);
    color: var(--text-1, #111);
  }

  p {
    margin: 0;
    color: var(--text-2, #444);
    line-height: var(--lh-normal, 1.55);
  }
</style>

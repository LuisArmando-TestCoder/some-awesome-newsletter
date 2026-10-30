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
  /* Closing chapter: a large invitation on the plain page, divided by a hairline. */
  .cta {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);
    padding-top: var(--space-7);
    border-top: 1px solid var(--text-1);
  }

  .cta__text {
    flex: 1 1 22rem;
  }

  h2 {
    margin: 0 0 var(--space-3);
    max-width: 18ch;
    font-family: var(--font-display);
    font-size: var(--step-chapter);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
    color: var(--text-1);
    text-wrap: balance;
  }

  p {
    margin: 0;
    max-width: 48ch;
    font-size: var(--fs-lg);
    color: var(--text-2);
    line-height: var(--lh-snug);
  }
</style>

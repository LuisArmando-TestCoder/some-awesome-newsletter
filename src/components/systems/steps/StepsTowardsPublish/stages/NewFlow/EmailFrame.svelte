<script lang="ts">
  // Realistic inbox view of an email: header lines plus the HTML in a sandboxed iframe,
  // so newsletter styles never leak into the app and scripts never run.
  export let from = "";
  export let to = "";
  export let subject = "";
  export let html = "";
  export let labels = { from: "From", to: "To", subject: "Subject" };
  export let title = "Email preview";
  export let minHeight = "28rem";

  let frame: HTMLIFrameElement;
  let height = 0;

  function fit() {
    try {
      const doc = frame?.contentDocument;
      if (doc?.body) height = Math.min(Math.max(doc.body.scrollHeight + 24, 200), 4000);
    } catch {
      /* cross-origin guard: keep min height */
    }
  }

  $: srcdoc = `<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>body{margin:0;padding:16px;font-family:Arial,Helvetica,sans-serif;background:#ffffff;color:#1a1a1a;word-wrap:break-word}img{max-width:100%;height:auto}</style></head><body>${html}</body></html>`;
</script>

<div class="email-frame">
  <dl class="email-frame__meta">
    {#if from}<div><dt>{labels.from}</dt><dd>{from}</dd></div>{/if}
    {#if to}<div><dt>{labels.to}</dt><dd>{to}</dd></div>{/if}
    {#if subject}<div><dt>{labels.subject}</dt><dd class="subject">{subject}</dd></div>{/if}
  </dl>
  <iframe
    bind:this={frame}
    {title}
    {srcdoc}
    sandbox="allow-same-origin allow-popups"
    on:load={fit}
    style="min-height: {minHeight}; height: {height ? height + 'px' : minHeight}"
  ></iframe>
</div>

<style lang="scss">
  /* An inbox-style frame around the email preview. The email itself stays on white
     (it is email content), whatever the page theme. */
  .email-frame {
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--surface-0);
  }
  .email-frame__meta {
    margin: 0;
    padding: var(--space-4) var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    border-bottom: 1px solid var(--border-1);
    background: var(--surface-1);
    font-size: var(--fs-sm);
    div {
      display: flex;
      gap: var(--space-2);
      min-width: 0;
    }
    dt {
      color: var(--text-3);
      min-width: 4.5rem;
    }
    dd {
      margin: 0;
      color: var(--text-1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .subject {
      font-weight: var(--fw-semibold);
    }
  }
  iframe {
    display: block;
    width: 100%;
    border: 0;
    color-scheme: light;
    background: Canvas;
  }
</style>

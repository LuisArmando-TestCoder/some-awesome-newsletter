<script lang="ts">
  // Core build plus the languages this app shows. The full build ships about 190 languages (about 1 MB).
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import typescript from 'highlight.js/lib/languages/typescript';
  import json from 'highlight.js/lib/languages/json';
  import xml from 'highlight.js/lib/languages/xml';
  import bash from 'highlight.js/lib/languages/bash';
  import 'highlight.js/styles/atom-one-dark.css';

  export let code: string;
  export let lang: string;

  if (!hljs.getLanguage('javascript')) {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('bash', bash);
  }

  let htmlFormattedCode: string;

  function escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  $: {
    const source = code ?? '';
    // A language that is not registered is shown as plain, escaped text.
    htmlFormattedCode = hljs.getLanguage(lang)
      ? hljs.highlight(source, { language: lang, ignoreIllegals: true }).value
      : escapeHtml(source);
  }
</script>

<div class="code-formatter-wrapper">
  <div class="header">
    <span class="control-btn red"></span>
    <span class="control-btn yellow"></span>
    <span class="control-btn green"></span>
  </div>
  <pre class="code-formatter">
    <code>
      {@html htmlFormattedCode}
    </code>
  </pre>
</div>

<style lang="scss">
  .code-formatter-wrapper {
    background: #2d2d2dee;
    backdrop-filter: blur(5px);
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    padding: 8px;
    background: #3a3a3a;
  }

  .control-btn {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;

    &.red {
      background-color: #ff5f56;
    }

    &.yellow {
      background-color: #ffbd2e;
    }

    &.green {
      background-color: #27c93f;
    }
  }

  .code-formatter {
    padding: 16px;
    overflow-x: auto;
    color: #fff;
    font-family: 'Fira Code', 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    background: transparent;

    code {
      white-space: pre;
    }
  }
</style>

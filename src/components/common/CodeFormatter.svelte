<script lang="ts">
  import hljs from 'highlight.js';
  import 'highlight.js/styles/atom-one-dark.css';

  export let code: string;
  export let lang: string;

  let htmlFormattedCode: string;

  $: {
    const highlightedCode = hljs.highlight(code, {
      language: lang,
      ignoreIllegals: true,
    });
    htmlFormattedCode = highlightedCode.value;
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

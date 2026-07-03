<script lang="ts">
  import hljs from 'highlight.js';
  
  let { code, language = 'typescript' } = $props();
  
  let highlighted = $derived(hljs.highlight(code, { language }).value);
  let hovered = $state(false);
  let copied = $state(false);
  
  function copy() {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }
</script>

<div class="code-block" role="region" aria-label="Code Snippet" onmouseenter={() => hovered = true} onmouseleave={() => hovered = false}>
  {#if hovered}
    <button class="copy-btn" onclick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  {/if}
  <pre><code class={`hljs language-${language}`}>{@html highlighted}</code></pre>
</div>

<style>
  .code-block {
    position: relative;
    background-color: #0a0a0a;
    border-radius: 0.5rem;
    overflow: hidden;
    margin: 1.5rem 0;
  }
  .copy-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: #262626;
    border: 1px solid #3f3f46;
    color: #a1a1aa;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    opacity: 0;
    animation: fadeIn 0.2s forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .copy-btn:hover {
    color: #fff;
    border-color: #52525b;
  }
  pre {
    margin: 0;
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
  }
  code {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.6;
    background: transparent;
    padding: 0;
    border-radius: 0;
  }
  /* Minimal override for highlight.js to look like the image */
  :global(.hljs) {
    background: transparent !important;
    padding: 0 !important;
  }
</style>

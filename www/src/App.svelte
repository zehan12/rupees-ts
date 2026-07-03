<script lang="ts">
  import CodeBlock from './lib/CodeBlock.svelte';
  
  let menuOpen = $state(false);
  let currentHash = $state('');

  $effect(() => {
    currentHash = window.location.hash || '#getting-started';
    const onHashChange = () => { currentHash = window.location.hash || '#getting-started'; menuOpen = false; };
    window.addEventListener('hashchange', onHashChange);
    
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            currentHash = '#' + entry.target.id;
          }
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );
    
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      observer.disconnect();
    };
  });

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  const installCode = `npm install rupees-ts
# or
pnpm add rupees-ts`;

  const quickStartCode = `import { convert } from 'rupees-ts';

// Numbers
convert(1234.56); // "One Thousand Two Hundred and Thirty Four Rupees and Fifty Six Paise"
convert(100);     // "One Hundred Rupees Only"

// Strings
convert("50.25"); // "Fifty Rupees and Twenty Five Paise"

// Negative amounts
convert(-450);    // "Minus Four Hundred and Fifty Rupees Only"`;

  const featuresCode = `// Fully Typed Support
import { convert } from 'rupees-ts';

const amount = convert('invalid');
if (!amount) {
  console.log('Invalid input provided');
}`;

</script>

<div class="layout-wrapper">
  <header class="header">
    <div class="header-left">
      <button class="menu-toggle" onclick={toggleMenu}>
        {menuOpen ? '✕' : '☰'}
      </button>
      <div class="logo"></div> RupeesTS
    </div>
    <div class="header-right">
      <div class="nav-links">
        <a href="https://github.com/zehan12/rupees-ts" target="_blank" rel="noopener">GitHub</a>
        <a href="#getting-started">Docs</a>
      </div>
    </div>
  </header>

  <div class="app-container">
    <aside class="sidebar" class:open={menuOpen}>
      <nav class="sidebar-nav">
        <div class="sidebar-group">
          <div class="sidebar-group-title">GETTING STARTED</div>
          <ul>
            <li><a href="#getting-started" class:active={currentHash === '#getting-started'}>Introduction</a></li>
          </ul>
        </div>

        <div class="sidebar-group">
          <div class="sidebar-group-title">CORE CONCEPTS</div>
          <ul>
            <li><a href="#installation" class:active={currentHash === '#installation'}>Installation</a></li>
            <li><a href="#quick-start" class:active={currentHash === '#quick-start'}>Quick Start</a></li>
            <li><a href="#api" class:active={currentHash === '#api'}>Runtime support</a></li>
            <li><a href="#features" class:active={currentHash === '#features'}>Features</a></li>
          </ul>
        </div>
      </nav>
    </aside>

    <main class="main-content">
      <section id="getting-started">
        <h1>Getting started</h1>
        <p>
          Rupees-TS is a lightweight, zero-dependency library for converting numeric amounts into Indian Rupees (INR) word format. 
          It supports large numbers (upto Crores), decimal precision (Paise), negative values, and is written entirely in TypeScript.
          It provides an extensible and fully-typed core with a focus on correctness and stability.
        </p>
      </section>

      <section id="installation">
        <h2>Installation</h2>
        <p>The package is published on npm. You can install it using your preferred package manager:</p>
        <CodeBlock code={installCode} language="bash" />
      </section>

      <section id="quick-start">
        <h2>Quick Start</h2>
        <p>Import the <code>convert</code> function and pass a number or string:</p>
        <CodeBlock code={quickStartCode} language="typescript" />
      </section>

      <section id="api">
        <h2>Runtime support</h2>
        <p>Converts a numeric value into an Indian Rupees word representation. Below is the API for the <code>convert</code> function.</p>
        <p>Parameters:</p>
        <ul>
          <li><code>input</code> <strong>(number | string)</strong>: The amount to be converted. Can be a number or a string parsable as a number.</li>
        </ul>
        <p>Returns:</p>
        <ul>
          <li><strong><code>string</code></strong>: The formatted string (e.g., <code>"One Hundred Rupees Only"</code>).</li>
          <li><strong><code>false</code></strong>: Returned if the input is an invalid string that cannot be parsed.</li>
        </ul>
      </section>

      <section id="features">
        <h2>Features</h2>
        <p>
          Zero Dependencies: Extremely lightweight and fast.<br/>
          TypeScript Native: Provides complete type definitions out of the box.<br/>
          String & Number Support: Safely handles both data types, including decimals.<br/>
          Edge Case Handling: Properly processes negative numbers, zero, and sub-rupee amounts.
        </p>
        <CodeBlock code={featuresCode} language="typescript" />
      </section>
    </main>
  </div>
</div>

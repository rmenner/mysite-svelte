<script>
  import { roles } from '$lib/resume.js';

  // The active channel ('fancy' | 'ats') and the currently rendered role id.
  export let channel;
  export let current;

  const options = Object.values(roles).map((r) => ({ id: r.id, label: r.label }));
  let selected = current;

  // Changing the role reloads the page with ?target=, which re-runs the loader.
  function switchRole() {
    window.location.search = `?target=${encodeURIComponent(selected)}`;
  }

  const qs = (t) => `?target=${encodeURIComponent(t)}`;
</script>

<!--
  Screen-only control bar. Hidden under print media, so it never appears in the
  generated PDF (Puppeteer's page.pdf() emulates print). These routes are
  localhost-only, so this only ever renders in local development.
-->
<div class="resume-controls" data-no-print>
  <div class="field">
    <label class="field-label" for="resume-role">Role</label>
    <select id="resume-role" bind:value={selected} on:change={switchRole}>
      {#each options as o}
        <option value={o.id}>{o.label}</option>
      {/each}
    </select>
  </div>

  <div class="group" role="group" aria-label="View">
    <a
      class="seg"
      class:active={channel === 'fancy'}
      aria-current={channel === 'fancy' ? 'page' : undefined}
      href="/resume/fancy{qs(current)}">Designed</a
    >
    <a
      class="seg"
      class:active={channel === 'ats'}
      aria-current={channel === 'ats' ? 'page' : undefined}
      href="/resume/ats{qs(current)}">ATS</a
    >
  </div>

  <a class="btn" href="/resume/generate?channel={channel}&target={encodeURIComponent(current)}">
    Save PDF
  </a>
</div>

<style>
  .resume-controls {
    --control-surface: #f3f4f6;
    --control-elevated: #ffffff;
    --control-border: #d1d5db;
    --control-copy: #374151;
    --control-muted: #6b7280;
    --control-accent: #0f766e;
    --control-accent-hover: #0d9488;

    position: sticky;
    top: 1rem;
    z-index: 20;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.625rem 1rem;
    width: calc(100% - 2rem);
    max-width: 7.9in;
    margin: 0 auto 1rem;
    padding: 0.625rem 1rem;
    border: 1px solid var(--control-border);
    border-radius: 0.5rem;
    background: var(--control-surface);
    box-shadow: 0 8px 24px rgb(17 24 39 / 0.12);
    color: var(--control-copy);
    font-family: system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 0.8125rem;
    line-height: 1.25;
  }

  :global(.dark) .resume-controls {
    --control-surface: #171717;
    --control-elevated: #262626;
    --control-border: #404040;
    --control-copy: #f3f4f6;
    --control-muted: #a3a3a3;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  .field-label {
    flex: none;
    color: var(--control-muted);
    font-size: 0.6875rem;
    font-weight: 650;
    line-height: 1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  select {
    min-height: 2rem;
    max-width: min(18rem, 55vw);
    padding: 0.3125rem 2rem 0.3125rem 0.625rem;
    border: 1px solid var(--control-border);
    border-radius: 0.375rem;
    background-color: var(--control-elevated);
    color: var(--control-copy);
    font: inherit;
  }

  .group {
    display: inline-flex;
    flex: none;
    overflow: hidden;
    border: 1px solid var(--control-border);
    border-radius: 0.375rem;
  }

  .seg,
  .btn {
    display: inline-flex;
    min-height: 2rem;
    align-items: center;
    justify-content: center;
    padding: 0.3125rem 0.75rem;
    color: var(--control-copy);
    font-weight: 550;
    line-height: 1;
    text-decoration: none;
    transition:
      background-color 120ms ease,
      border-color 120ms ease,
      color 120ms ease;
  }

  .seg + .seg {
    border-left: 1px solid var(--control-border);
  }

  .seg:hover,
  .btn:hover {
    background: var(--control-elevated);
  }

  .seg.active {
    background: var(--control-accent);
    color: #ffffff;
  }

  .btn {
    margin-left: auto;
    border: 1px solid var(--control-accent);
    border-radius: 0.375rem;
    background: var(--control-accent);
    color: #ffffff;
  }

  .btn:hover {
    background: var(--control-accent-hover);
    border-color: var(--control-accent-hover);
  }

  select:focus-visible,
  .seg:focus-visible,
  .btn:focus-visible {
    position: relative;
    z-index: 1;
    outline: 2px solid #5eead4;
    outline-offset: 2px;
  }

  @media (max-width: 34rem) {
    .resume-controls {
      top: 0.75rem;
      width: calc(100% - 1.5rem);
      padding-inline: 0.75rem;
    }

    .field {
      flex: 1 1 100%;
    }

    select {
      flex: 1 1 auto;
      max-width: none;
      min-width: 0;
    }
  }

  @media print {
    .resume-controls {
      display: none !important;
    }
  }
</style>

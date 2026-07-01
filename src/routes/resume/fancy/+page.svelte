<script>
  import skills from '$data/skills-ats.json';
  import resume from '$data/resume.yml';
  import ResumeControls from '$components/resume-controls.svelte';

  export let data;

  const contactInfo = data.contactInfo;

  // Compiled resume document (headline, summary, jobs) for the fancy channel.
  // Same `print` recipe as ats, so content matches. Dates are channel-formatted
  // ("Present") and bullets are plain strings.
  $: ({ headline, summary, jobs } = data.resume);
  $: contentJobs = jobs.filter(
    ({ summary: jobSummary, bullets }) => jobSummary.trim() || bullets.length
  );
  $: earlierJobs = jobs.filter(
    ({ summary: jobSummary, bullets }) => !jobSummary.trim() && !bullets.length
  );

  // Curated skills, shared across all channels (rendered here as the sidebar).
  const sidebarSkills = skills;

  $: contact = [
    { label: 'Email', value: contactInfo.email },
    { label: 'Phone', value: contactInfo.phone },
    { label: 'Location', value: contactInfo.location },
    { label: 'Web', value: contactInfo.website },
    { label: 'LinkedIn', value: contactInfo.linkedin },
    { label: 'GitHub', value: contactInfo.github }
  ].filter((c) => c.value);
</script>

<svelte:head>
  <title>Resume - {contactInfo.name}</title>
  <style>
    @page { margin: 0; size: letter; }
  </style>
</svelte:head>

<ResumeControls channel="fancy" current={data.resume.id} />

<div class="sheet">
  <main class="main">
    <header class="head">
      <h1 class="name">{contactInfo.name}</h1>
      {#if headline}<div class="eyebrow">{headline}</div>{/if}
    </header>

    <section class="block">
      <h2 class="h">Summary</h2>
      <p class="summary">{summary.trim()}</p>
    </section>

    <section class="block">
      <h2 class="h">Experience</h2>
      {#each contentJobs as { company, title, start, end, bullets }}
        <div class="job">
          <div class="job-top">
            <span class="company">{company}</span>
            <span class="dates">{start} to {end}</span>
          </div>
          <div class="role">{title}</div>
          {#if bullets.length}
            <ul class="bullets">
              {#each bullets as b}<li>{b}</li>{/each}
            </ul>
          {/if}
        </div>
      {/each}
      {#if earlierJobs.length}
        <div class="earlier">
          <h3 class="h earlier-label">Earlier Experience</h3>
          {#each earlierJobs as { company, title, start, end }}
            <div class="job earlier-job">
              <div class="job-top">
                <span class="company">{company}</span>
                <span class="dates">{start} to {end}</span>
              </div>
              <div class="role">{title}</div>
            </div>
          {/each}
        </div>
      {/if}
    </section>
  </main>

  <aside class="side">
    <section class="sblock">
      <h3 class="sh">Contact</h3>
      <div class="contact-list">
        {#each contact as c}
          <div class="citem">{c.value}</div>
        {/each}
      </div>
    </section>

    {#each sidebarSkills as { title, items }}
      <section class="sblock sblock--skill">
        <h3 class="sh">{title}</h3>
        <div class="sline">{items.join(', ')}</div>
      </section>
    {/each}

    {#if resume.education?.length}
      <section class="sblock">
        <h3 class="sh">Education</h3>
        {#each resume.education as ed}
          <div class="edu"><span class="edu-school">{ed.school}</span>{ed.detail}<span class="edu-years">{ed.years}</span></div>
        {/each}
      </section>
    {/if}
  </aside>
</div>

<style>
  @font-face {
    font-family: 'Resume Lato';
    font-style: normal;
    font-weight: 300;
    src: url('/fonts/lato-300.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Resume Lato';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/lato-400.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Resume Lato';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/lato-700.ttf') format('truetype');
  }

  @media print {
    :global(html),
    :global(body),
    :global(#svelte),
    :global(#svelte > div:first-child),
    :global(#svelte > div:first-child > main),
    :global(#svelte > div:first-child > main > div) {
      display: block !important;
      height: auto !important;
      min-height: 0 !important;
      background: #ffffff !important;
    }
  }

  .sheet {
    --teal: #0f766e;
    --copy: #374151;
    --dark-copy: #1f2937;
    --muted-copy: #4b5563;
    --rule: #0d9488;

    display: grid;
    grid-template-columns: minmax(0, 5.03in) 2.35in;
    gap: 0.52in;
    width: 7.9in;
    min-height: auto;
    margin: 0 auto;
    background: #ffffff;
    color: var(--copy);
    font-family: 'Resume Lato', 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 9.2pt;
    font-weight: 300;
    letter-spacing: 0.012em;
    line-height: 1.28;
    padding-top: 0.12in;
    box-sizing: border-box;
  }

  .main {
    min-width: 0;
  }

  .head {
    margin-bottom: 0.14in;
  }

  .name {
    margin: 0;
    font-size: 24pt;
    font-weight: 300;
    letter-spacing: 0;
    color: var(--teal);
    line-height: 1.05;
  }

  .eyebrow {
    margin-top: 4px;
    color: var(--dark-copy);
    font-size: 9.6pt;
    font-weight: 300;
    text-transform: uppercase;
  }

  .block {
    margin-bottom: 0.13in;
  }

  .h {
    margin: 0 0 7px;
    color: var(--teal);
    font-size: 10.5pt;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1;
    text-transform: uppercase;
  }

  .summary {
    margin: 0;
    font-size: 9.2pt;
    line-height: 1.3;
  }

  .job { margin-bottom: 6px; }
  .job + .job {
    margin-top: 0.12in;
  }

  .job-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    gap: 0.22in;
  }

  .company {
    color: var(--teal);
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 1.05;
  }

  .dates {
    color: var(--muted-copy);
    font-size: 8.8pt;
    white-space: nowrap;
  }

  .role {
    margin-top: 4px;
    color: var(--dark-copy);
    font-size: 9.6pt;
    font-weight: 400;
  }

  .job-summary {
    margin: 0.07in 0 0;
    font-size: 9.2pt;
    line-height: 1.28;
  }

  .bullets {
    margin: 0.09in 0 0;
    padding: 0 0 0 0.18in;
    border-left: 2px solid var(--rule);
    list-style: none;
  }

  .bullets li {
    margin: 0 0 4px;
    padding-left: 0;
    font-size: 9.2pt;
    line-height: 1.24;
  }

  .bullets li:last-child {
    margin-bottom: 0;
  }

  .earlier {
    margin-top: 0.13in;
  }

  .earlier-label {
    margin-bottom: 7px;
  }

  .earlier-job {
    margin-bottom: 0;
  }

  .earlier-job + .earlier-job {
    margin-top: 0.08in;
  }

  .side {
    align-self: stretch;
    margin-top: -0.12in;
    margin-bottom: -0.3in;
    padding: 0.14in 0 0.2in 0;
    text-align: right;
  }

  .sblock {
    margin-bottom: 0.28in;
  }

  .sblock--skill {
    margin-bottom: 0.24in;
  }

  .sh {
    margin: 0 0 8px;
    color: var(--teal);
    font-size: 11pt;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1;
    text-transform: uppercase;
  }

  .citem,
  .sline,
  .edu {
    font-size: 8.8pt;
    line-height: 1.3;
    color: var(--copy);
    text-wrap: balance;
  }

  .citem {
    margin-bottom: 5px;
    word-break: break-word;
  }

  .contact-list {
    padding-right: 0.16in;
    border-right: 2px solid var(--rule);
  }

  .sline {
    padding: 0 0.16in 0 0;
    border-right: 2px solid var(--rule);
    line-height: 1.32;
  }

  .edu {
    padding-right: 0.16in;
    border-right: 2px solid var(--rule);
  }

  .edu-school {
    display: block;
    color: var(--teal);
    font-weight: 700;
  }

  .edu-years {
    display: block;
  }
</style>

<script>
  import resume from '$data/resume.yml';
  import skills from '$data/skills-ats.json';
  import ResumeControls from '$components/resume-controls.svelte';

  export let data;

  const contactInfo = data.contactInfo;

  // Compiled resume document (headline, summary, jobs) for the ats channel.
  // Dates are already channel-formatted ("Present") and bullets are plain strings.
  $: ({ headline, summary, jobs } = data.resume);

  // Curated skills, shared across all channels (rendered inline for ATS parsing).
  const atsSkills = skills;

  // Uniform separators (Svelte trims whitespace around inline {#if} blocks)
  $: contactLine = [
    contactInfo.email,
    contactInfo.phone,
    contactInfo.location,
    contactInfo.website,
    contactInfo.linkedin,
    contactInfo.github
  ]
    .filter(Boolean)
    .join('  |  ');
</script>

<svelte:head>
  <title>ATS Resume - {contactInfo.name}</title>
  <style>
    @page { margin: 0; size: letter; }
  </style>
</svelte:head>

<!--
  ATS-safe by construction: single column, standard sans font, real selectable text,
  no tables/columns/text boxes/graphics/icons. Color is decorative only (parsers ignore it),
  and the flex date row keeps DOM/text order linear (company, title, then dates).
-->
<ResumeControls channel="ats" current={data.resume.id} />

<div class="ats">
  <header class="head">
    <h1 class="name">{contactInfo.name}</h1>
    {#if headline}<div class="role">{headline}</div>{/if}
    <div class="contact">{contactLine}</div>
  </header>

  <section>
    <h2 class="sec">Summary</h2>
    <p class="summary">{summary}</p>
  </section>

  <section>
    <h2 class="sec">Professional Experience</h2>
    {#each jobs as { company, title, start, end, bullets }}
      <div class="job">
        <div class="job-head">
          <span class="job-where"><strong>{company}</strong>, {title}</span>
          <span class="job-when">{start} - {end}</span>
        </div>
        {#if bullets.length}
          <ul>
            {#each bullets as bullet}<li>{bullet}</li>{/each}
          </ul>
        {/if}
      </div>
    {/each}
  </section>

  <section>
    <h2 class="sec">Technical Skills</h2>
    {#each atsSkills as { title, items }}
      <div class="skill"><strong>{title}:</strong> {items.join(', ')}</div>
    {/each}
  </section>

  {#if resume.education?.length}
    <section class="last">
      <h2 class="sec">Education</h2>
      {#each resume.education as ed}
        <div class="edu">{ed.school}, {ed.detail}</div>
      {/each}
    </section>
  {/if}
</div>

<style>
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

  .ats {
    width: 7.5in;
    margin: 0 auto;
    color: #1a1a1a;
    background: #ffffff;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 10.2pt;
    line-height: 1.2;
    padding-top: 0.08in;
    box-sizing: border-box;
  }

  .head { margin-bottom: 9px; }
  .name {
    margin: 0;
    font-size: 18pt;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #1a1a1a;
  }
  .role {
    margin: 1px 0 4px;
    font-size: 10.5pt;
    color: #444444;
  }
  .contact {
    font-size: 9pt;
    color: #555555;
  }

  section { margin-bottom: 6px; }
  section.last { margin-bottom: 0; }
  .sec {
    margin: 0 0 4px;
    padding-bottom: 2px;
    font-size: 10.2pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #1a1a1a;
    border-bottom: 1px solid #777777;
  }

  .summary { margin: 0; }

  .job { margin-bottom: 4px; }
  .job:last-child { margin-bottom: 0; }
  .job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 14px;
  }
  .job-when {
    flex: none;
    font-size: 10pt;
    color: #555555;
    white-space: nowrap;
  }

  ul { margin: 4px 0 0; padding-left: 18px; list-style: disc; }
  li { margin-bottom: 2px; padding-left: 2px; }

  .skill { margin-bottom: 1.5px; }
</style>

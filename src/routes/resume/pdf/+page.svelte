<script>
  import { marked } from 'marked';
  import jobs from '$data/jobs.json';
  import overview from '$data/skills.json';
  import resume from '$data/resume.yml';
  
  export let data;
  
  // Use contact info from server-side load
  const contactInfo = data.contactInfo;
  
  // Custom overview (if provided) or default
  const customOverview = data.customOverview;
  
  // Filter to show only published jobs
  $: publishedJobs = jobs.filter(job => job.published === true);

  // Only take the first 3 jobs for the PDF
  $: recentJobs = publishedJobs.slice(0, 3);
  
  // Professional summary - use custom if provided, otherwise default
  const defaultSummary = resume.overview;
  
  $: professionalSummary = (customOverview && customOverview.trim()) ? customOverview : defaultSummary;

</script>

<svelte:head>
  <title>Resume PDF - {contactInfo.name}</title>
  <style>    
    @page {
      margin: 0.2in;
      size: letter;
    }
  </style>
</svelte:head>

<div class="max-w-none mx-auto p-2 bg-white text-black font-display" style="width: 7.5in; min-height: 10in;">
  <!-- Contact Information Header -->
  <div class="text-center mb-2">
    <h1 class="text-xl font-bold text-teal-700 uppercase tracking-wide">{contactInfo.name}</h1>
    <div class="flex justify-center flex-wrap gap-3 text-xs text-gray-600 mb-1">
      <a href={'mailto:' + contactInfo.email}>{contactInfo.email}</a>
      <a href={'https://' + contactInfo.website}>{contactInfo.website}</a>
      <a href={'https://' + contactInfo.linkedin}>{contactInfo.linkedin}</a>
      <a href={'https://' + contactInfo.github}>{contactInfo.github}</a>
    </div>
  </div>

  <!-- Professional Summary -->
  <div class="text-gray-700 text-xs pt-2 mb-2 border-t border-teal-600">
    {@html marked.parse(professionalSummary)}
  </div>

  <!-- Professional Experience -->
  <div class="mb-3">
    <div class="border-t border-teal-600 pt-1 mb-2">
      <h2 class="text-xs font-bold text-teal-700 uppercase tracking-widest">Professional Experience</h2>
    </div>
    
    <div class="space-y-3">
      {#each recentJobs as { company, title, start, end, overview, bullets }, i}
        <div>
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="text-sm font-bold text-teal-700 uppercase leading-none">{company}</div>
              <div class="text-xs font-bold text-gray-700">{title}</div>
            </div>
            <div class="text-xs text-right ml-5">
              <span>{start} - {end}</span>
            </div>
          </div>
          
          {#if overview}
            <div class="mt-1 w-full leading-tight text-xs text-gray-700">
              {overview}
              {#if bullets}
                <ul class="list-disc list-outside ml-5 mt-3">
                  {#each bullets as bullet, j}
                    <li>{bullet}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Technical Skills -->
  <div>
    <div class="border-t border-teal-600 pt-1 mb-2">
      <h2 class="text-xs font-bold text-teal-700 uppercase tracking-widest">Technical Skills</h2>
    </div>

    <div class="space-y-1">
      {#each overview.slice(0, 4) as { title, list }}
        <div class="text-xs text-gray-700">
          <span class="font-bold text-teal-700 uppercase">{title}:</span> {list.join(', ')}
        </div>
      {/each}
    </div>
  </div>
</div>
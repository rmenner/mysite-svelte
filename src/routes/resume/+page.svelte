<script>

  import jobs from '$data/jobs.json'
  import overview from '$data/overview.json'
  import compliments from '$data/compliments.json'
  import Page from '$components/page.svelte'
  
    const metadata = {
      page: {
        title: 'Resume'
      },
      title: 'Resume',
      description: 'My employment and tech experience.'
    }
  
  </script>
  
  <Page {metadata}>
    <div class="space-y-6 font-light dark:font-normal text-gray-600 dark:text-gray-100 leading-relaxed tracking-wide">
      
      <div class="border-t-2 border-teal-600 pt-5 mt-5 pb-5">
        <h2 class="uppercase text-teal-700 dark:text-teal-300 tracking-widest">Overview</h2>
      </div>

      <div class="prose dark:prose-invert pb-5">
        <p>Crafting web experiences for over a decade, I prioritize mobile-first designs. It's all about speed and intuitive interfaces. I love sharing knowledge and learning continuously. Staying updated on web trends and technologies is crucial to me. I focus on design-driven development, mentorship, and mindful coding. My goal? Deliver top-notch web solutions that solve real problems and beautify the web.</p>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
        {#each overview as { title, list }, i}
          <li class="shadow-sm shadow-neutral-400 dark:shadow-black dark:bg-black p-5">
            <h3 class="uppercase text-teal-700 dark:text-teal-300 text-xl font-bold pl-4 mb-0">
              {title}
            </h3>
            <div class="prose dark:prose-invert pt-0 mt-0">
              <ul class="mt-0">
                {#each list as line, i}
                  <li> { line } </li>
                {/each}
              </ul>
            </div>
          </li>
        {/each}
      </ul>

      
    </div>
  
    <div class="space-y-6 font-light dark:font-normal text-gray-600 dark:text-gray-100 leading-relaxed tracking-wide pt-14">
      
      <div class="border-t-2 border-teal-600 pt-5 mt-5 pb-5">
        <h2 class="uppercase text-teal-700 dark:text-teal-300 tracking-widest">Experience</h2>
      </div>
      <ul>
        {#each jobs as { company, location, title, start, end, desc }, i}
          <li>
            <div class="items-center lg:flex justify-between ... { i !== 0 ? 'mt-20' : '' }">
              <div class="job-info">			
                <div class="company-name uppercase text-teal-700 dark:text-teal-300 text-xl font-bold"> { company } </div>
                <div class="job-title text-gray-700  dark:text-gray-100 text-lg"> { title } </div>
              </div>
              <div class="date gap-1 lg:text-right">
                <div class="flex gap-1">
                  <span class="start"> { start } </span>
                  <span>-></span>
                  <span class="end"> { end } </span>
                </div>
                <div class="location text-sm text-teal-700 dark:text-teal-300"> { location } </div>
              </div>
            </div>
            {#if desc}
              <div class="description prose dark:prose-invert mt-8"> {@html desc } </div>
            {/if}
          </li>
        {/each}
      </ul>
      
    </div>

    <div class="space-y-6 font-light dark:font-normal text-gray-600 dark:text-gray-100 leading-relaxed tracking-wide pt-14">
      
      <div class="border-t-2 border-teal-600 pt-5 mt-5 pb-5">
        <h2 class="uppercase text-teal-700 dark:text-teal-300 tracking-widest">Compliments</h2>
      </div>
      <div class="prose dark:prose-invert">
        {#each compliments as { name, title, company, content }, i}
          
            <h3 class="uppercase text-teal-800 dark:text-teal-300 text-xl font-bold ... { i !== 0 ? 'mt-20' : '' }">
              {name}
            </h3>
            <div class="text-teal-700 dark:text-teal-300 text-sm">{title} -> {company}</div>
            <div>
             {@html content}
            </div>
        {/each}
      </div>
      
    </div>
  
  
  </Page>

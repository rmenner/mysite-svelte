<script>

  import jobs from '../data/jobs.json'
  import overview from '../data/overview.json'
  import compliments from '../data/compliments.json'
  import Page from '../components/page.svelte'
  
    const metadata = {
      page: {
        title: 'Resume'
      },
      title: 'Resume',
      description: 'My employment and tech experience.'
    }
  
  </script>
  
  <Page {metadata}>
    <div class="space-y-6 font-light text-gray-500 leading-relaxed tracking-wide">
      
      <div class="border-t-2 border-teal-600 pt-5 mt-5 pb-5">
        <h3 class="uppercase text-teal-600 tracking-widest">Overview</h3>
      </div>

      <div class="prose">
        <p>I do not have what you would call a traditional education. I am one of those "Homeschooled" kids. Learning how to learn was the first skill I acquired in that kind of educational environment. Continue that mindset 20 years, I have been able to gain a wealth of experience.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
        {#each overview as { title, list }, i}
          <div class="shadow p-5">
            <h4 class="uppercase text-teal-700 text-xl font-bold pl-4 mb-0">
              {title}
            </h4>
            <div class="prose pt-0 mt-0">
              <ul class="mt-0">
                {#each list as line, i}
                  <li> { line } </li>
                {/each}
              </ul>
            </div>
          </div>
        {/each}
      </div>

      
    </div>
  
    <div class="space-y-6 font-light text-gray-500 leading-relaxed tracking-wide pt-14">
      
      <div class="border-t-2 border-teal-600 pt-5 mt-5 pb-5">
        <h3 class="uppercase text-teal-600 tracking-widest">Experience</h3>
      </div>
      <ul>
        {#each jobs as { company, location, title, start, end, desc }, i}
          <li>
            <div class="items-center lg:flex justify-between ... { i !== 0 ? 'mt-20' : '' }">
              <div class="job-info">			
                <div class="company-name uppercase text-teal-700 text-xl font-bold"> { company } </div>
                <div class="job-title text-gray-700 text-lg"> { title } </div>
              </div>
              <div class="date gap-1 lg:text-right">
                <div class="flex gap-1">
                  <span class="start"> { start } </span>
                  <span>-></span>
                  <span class="end"> { end } </span>
                </div>
                <div class="location text-sm text-gray-400"> { location } </div>
              </div>
            </div>
            {#if desc}
              <div class="description prose mt-8"> {@html desc } </div>
            {/if}
          </li>
        {/each}
      </ul>
      
    </div>

    <div class="space-y-6 font-light text-gray-500 leading-relaxed tracking-wide pt-14">
      
      <div class="border-t-2 border-teal-600 pt-5 mt-5 pb-5">
        <h3 class="uppercase text-teal-600 tracking-widest">Compliments</h3>
      </div>
      <div class="prose">
        {#each compliments as { name, title, company, content }, i}
          
            <h4 class="uppercase text-teal-700 text-xl font-bold ... { i !== 0 ? 'mt-20' : '' }">
              {name}
            </h4>
            <div class="text-teal-500 text-sm">{title} -> {company}</div>
            <div>
             {@html content}
            </div>
        {/each}
      </div>
      
    </div>
  
  
  </Page>
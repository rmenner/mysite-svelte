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
      description: 'This my site',
      image: 'https://svelte.dev/images/twitter-card.png',
    }
  
  </script>
  
  <Page {metadata}>
    <div class="space-y-6 font-light text-gray-500 leading-relaxed tracking-wide">
      
      <div class="border-t-2 border-teal-600 pt-5 mt-5 pb-5">
        <h3 class="uppercase text-teal-600 tracking-widest">Overview</h3>
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
        <h3 class="uppercase text-teal-600 tracking-widest">Education</h3>
      </div>
      <div class="prose">
        <p>I do not have what you would call a traditional education. My education started in the home. Simply put I am one of those "Home Schooled" kids. Learning how to learn was the first skill I acquired in that kind of educational environment.</p>
        <p>Fast forward that mindset 20 years coupled with job opportunities that allowed me to gain a wealth of experience. That being said I know enough to see just how much I don't know. I don't claim be an expert coder but I am willing to learn and am really hoping that one day I will find myself in a place where I can build anything I put my mind to.</p>
        <p>Here is a list of sources I have used to supplement my experience based learning.</p>
        <ul>
          <li>freecodecamp.com</li>
          <li>projecteuler.net</li>
          <li>lynda.com</li>
          <li>teamtreehouse.com</li>
          <li>codepen.io</li>
          <li>vtc.com</li>
        </ul>
        <p>Aside from my unconventional education I have also participated in some honest to goodness traditional education. Through my junior and senior high school days I had the opportunity to take some classes part-time for some of the subjects we didn't have the resources or know-how to learn at home. Those classes include art, computer art, algebra, and other electives like the school newspaper. Also I attended a few classes at the local community college focusing my attention on math, literature, art, and web technologies.</p>
      </div>
      
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
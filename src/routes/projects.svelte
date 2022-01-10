<script>

  import projects from '../data/projects.json'
  import Page from '../components/page.svelte'
  
    const metadata = {
      page: {
        title: 'Projects'
      },
      title: 'Projects',
      description: 'A collection of projects',
      image: 'https://svelte.dev/images/twitter-card.png',
    }
  
  </script>
  
  
  <Page {metadata}>
  
    <div class="space-y-6 font-light text-gray-500 leading-relaxed tracking-wide">

      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
        {#each projects as { title, url, image, tech, tag }, i}
        <a href="{url}" target="_blank" rel="nofollow" class="flex flex-col rounded-lg shadow-lg overflow-hidden border-2 border-b-0 group">
          <div class="flex-shrink-0 relative z-0">
            <span class="text-sm font-medium text-white bg-teal-500 rounded p-2 absolute right-5 top-5 shadow z-10">
              {tag}
            </span>
            <img class="w-full object-cover sm:group-hover:scale-110 transition duration-500 shadow relative z-0" src="{image}" alt="{title}">
          </div>
          <div class="flex-1 bg-white p-6 flex flex-col justify-between">
            <div class="flex-1">
              <div href="{url}" class="block mt-2">
                <p class="text-xl font-semibold text-teal-600 flex space-x-2 items-center justify-between">
                  <span>{title}</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </p>
                <p class="mt-3 text-sm text-gray-500">
                  {tech}
                </p>
              </div>
            </div>

          </div>
        </a>
        {/each}
      </div>
      
    </div>
  
  </Page>



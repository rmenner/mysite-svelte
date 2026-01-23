<script>
  /** @type {import('./$types').PageData} */
  export let data;
  
  import LetterFooter from '$components/letter-footer.svelte';
</script>

<svelte:head>
  <title>{data.letter.title} - Cover Letters</title>
  <meta name="description" content="Cover letter for {data.letter.company}" />
</svelte:head>

<div class="min-h-screen py-8">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <nav class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <a href="/letters" class="hover:text-teal-600 dark:hover:text-teal-400">Cover Letters</a>
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
        <span>{data.letter.title}</span>
      </nav>
      
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-teal-900 dark:text-white">{data.letter.title}</h1>
          {#if data.letter.jobTitle}
            <p class="mt-1 text-lg text-teal-600 dark:text-teal-300">{data.letter.jobTitle}</p>
          {/if}
          <time class="mt-2 text-sm text-teal-500 dark:text-teal-400" datetime={data.letter.date}>
            {new Date(data.letter.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>
        
        <div class="mt-4 sm:mt-0 flex space-x-3">
          <a 
            href="/letters/{data.letter.slug}/pdf" 
            target="_blank"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View PDF
          </a>
        </div>
      </div>
    </div>

    <!-- Letter Content -->
    <article class="bg-white dark:bg-teal-800 shadow-lg rounded-lg overflow-hidden pt-8">
      <div class="px-6 pb-8 sm:px-8 sm:pb-10">
        <div class="prose prose-gray dark:prose-invert max-w-none 
                    prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-strong:text-gray-900 dark:prose-strong:text-white
                    prose-a:text-teal-600 dark:prose-a:text-teal-400
                    prose-code:text-pink-600 dark:prose-code:text-pink-400
                    prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
                    prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300">
          {@html data.letter.html}
          
        </div>
         <LetterFooter contactInfo={data.contactInfo} isPdfMode={false} />
      </div>
    </article>

    <!-- Letter Footer -->
   

    <!-- Footer Navigation -->
    <div class="mt-8 flex justify-between">
      <a 
        href="/letters" 
        class="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
      >
        <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all letters
      </a>
      
      <div class="text-xs text-gray-400 dark:text-gray-500">
        {data.letter.slug}.md
      </div>
    </div>
  </div>
</div>
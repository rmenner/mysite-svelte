<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<svelte:head>
  <title>Cover Letters</title>
  <meta name="description" content="Private cover letter collection" />
</svelte:head>

<div class="min-h-screen  py-8">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Cover Letters</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-300">Private collection of cover letters and communications</p>
    </div>

    {#if data.message}
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700 dark:text-yellow-300">{data.message}</p>
            <div class="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
              <p>To get started:</p>
              <ol class="list-decimal list-inside mt-1 space-y-1">
                <li>Create a private GitHub gist with your cover letters</li>
                <li>Clone it locally: <code class="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">git clone &lt;gist-url&gt; letters</code></li>
                <li>Add your GitHub PAT to <code class="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">.env</code></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    {/if}

    {#if data.error}
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700 dark:text-red-300">{data.error}</p>
          </div>
        </div>
      </div>
    {/if}

    {#if data.letters && data.letters.length > 0}
      <div class="space-y-6">
        {#each data.letters as letter}
          <article class="bg-white dark:bg-teal-900 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
            <div class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <a href="/letters/{letter.slug}" class="block hover:bg-teal-50 dark:hover:bg-teal-800 -m-3 p-3 rounded-lg">
                    <div class="flex items-center justify-between">
                      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {letter.company || letter.title}
                      </h2>
                      <time class="text-sm text-gray-500 dark:text-gray-400" datetime={letter.date}>
                        {new Date(letter.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                    </div>
                    {#if letter.jobTitle}
                      <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{letter.jobTitle}</p>
                    {/if}
                    <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span class="flex items-center">
                        <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {letter.filename}
                      </span>
                      <a href="/letters/{letter.slug}/pdf" class="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
                        <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        PDF
                      </a>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {:else if !data.message && !data.error}
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No cover letters</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding markdown files to your letters directory.</p>
      </div>
    {/if}
  </div>
</div>
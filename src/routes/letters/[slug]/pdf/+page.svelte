<script>
  /** @type {import('./$types').PageData} */
  export let data;
  
  import LetterFooter from '$components/letter-footer.svelte';
</script>

<svelte:head>
  <title>{data.letter.title} - PDF</title>
  <style>
    @media print {
      body { margin: 0; }
      .no-print { display: none; }
    }
  </style>
</svelte:head>

{#if data.isPdfMode}
  <!-- PDF Version -->
  <div class="min-h-screen bg-white text-gray-900 p-8 max-w-4xl mx-auto">
    <!-- Date and Letter Details Header -->
    <header class="mb-8 text-right">
      <div class="text-sm text-gray-600">
        <div class="mb-1">{data.letter.date}</div>
        {#if data.letter.company}
          <div class="font-medium text-gray-900">{data.letter.company}</div>
        {/if}
        {#if data.letter.jobTitle}
          <div class="text-gray-700">{data.letter.jobTitle}</div>
        {/if}
      </div>
    </header>

    <!-- Letter Content -->
    <main class="prose prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:font-semibold
                prose-p:text-gray-800 prose-p:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-gray-800 prose-a:underline
                print:prose-a:text-gray-800 print:prose-a:no-underline">
      {@html data.letter.html}
    </main>

    <!-- Email Signature Footer -->
    <LetterFooter contactInfo={data.contactInfo} isPdfMode={true} />

  </div>
{:else}
  <!-- Regular view redirects to main letter page -->
  <script>
    if (typeof window !== 'undefined') {
      window.location.href = `/letters/${data.letter.slug}`;
    }
  </script>
{/if}
<script>
  export let metadata = {};
  import { fly } from 'svelte/transition';
</script>

<svelte:head>
  {#if metadata.title}
    <title>{metadata.title} | Ryan Menner</title>
    <meta name="title" content="{metadata.title} | Ryan Menner" />
    <meta property="og:title" content="{metadata.title} | | Ryan Menner" />
  {/if}
  
  {#if metadata.description}
    <meta name="description" content="{metadata.description}" />
    <meta property="og:description" content="{metadata.description}" />
  {/if} 
  

  <meta property="og:image" content="/images/og-image.jpg" />


</svelte:head>

<div class="max-w-4xl mx-auto px-8 md:px-24" in:fly="{{ y: 2000, duration: 2000, delay: 200 }}" out:fly="{{ y: -2000, duration: 250 }}">
    <h1 class="text-5xl font-light text-teal-600 tracking-wider leading-normal">{metadata.page.title}</h1>
  
    <div class="py-12">
      <slot />
    </div>

</div>
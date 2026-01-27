<script>
  export let contactInfo = {
    name: 'Your Name',
    website: 'https://yourwebsite.com'
  };
  export let isPdfMode = false;
  
  // Ensure contactInfo has required properties
  $: safeContactInfo = {
    name: contactInfo?.name || 'Your Name',
    website: contactInfo?.website || 'https://yourwebsite.com'
  };
</script>

<footer>
  <div class="text-sm leading-6 {isPdfMode ? 'text-gray-900' : 'text-gray-700 dark:text-gray-300'}">
    <div class="mb-8">
      <div class="font-medium">{safeContactInfo.name}</div>
    </div>
    <div>
      <div class="font-medium mb-1">P.S.</div>
      <div>
        My full work history and more information{#if isPdfMode}<br>{:else} {/if}about me can be found on my website 
        <a 
          href="{safeContactInfo.website}" 
          class="{isPdfMode ? 'text-blue-600 no-underline' : 'text-teal-600 dark:text-teal-400 hover:underline'} font-medium"
        >
          {safeContactInfo.website.replace('https://', '').replace('http://', '')}
        </a>
      </div>
    </div>
  </div>
</footer>
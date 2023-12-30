<script>
  export let segment;
  let nav = [
    {
      name: 'About',
      url: '/',
    },
    {
      name: 'Resume',
      url: '/resume',
    },
    {
      name: 'Projects',
      url: '/projects',
    }
  ];
</script>



{#each nav as { name, url}, i}

    <a href="{url}" class="{segment === url ? "border-teal-500 text-teal-700 dark:text-teal-300 hover:border-teal-500 hover:text-teal-500 dark:hover:text-teal-300" : "text-teal-800 dark:text-teal-300 border-gray-100 hover:border-white dark:border-black dark:hover:border-black"} ... group flex border-l-2 bg-gray-100 hover:bg-white dark:hover:bg-black dark:bg-neutral-800 items-center p-4 text-base transition font-light dark:font-normal">
      {name}
    </a>

{/each}



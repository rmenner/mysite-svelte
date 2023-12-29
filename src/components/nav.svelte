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

    <a href="{url}" class="{segment === url ? "border-teal-500 text-teal-700 hover:border-teal-500 hover:text-teal-500" : "text-teal-800 border-gray-100 hover:border-white"} ... group flex border-l-2 bg-gray-100 hover:bg-white items-center p-4 text-base transition font-light">
      {name}
    </a>

{/each}



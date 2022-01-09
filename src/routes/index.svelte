<script>

import Page from '../components/page.svelte'

  const metadata = {
    page: {
      title: 'Greetings'
    },
		title: 'About',
		description: 'This my site',
		image: 'https://svelte.dev/images/twitter-card.png',
	}

</script>


<Page {metadata}>

  <div class="space-y-6 text-xl font-light text-gray-500 leading-relaxed tracking-wide">
    <p>
      My name is Ryan and I live in famously hot Columbia, South Carolina. Creating great design, eating pepperoni pizza, flying rc aircraft, and living in faith makes up my recipe for a happy and fulfilled life.
    </p>
    <p>
      As a designer, developer, and individual I strive to do everything with diligence, integrity, and fervor. Always looking for a way to create work that is both useful and beautiful.
    </p>

    <div class="flex items-center justify-end pr-8 pt-12">
      <div class="mr-3 text-right leading-snug">
        <p class="font-light text-gray-500">
          Thanks for visiting,
        </p>
        <p class="font-light text-base text-teal-500">
          - Ryan
        </p>
      </div>
      <div>
        <img class="inline-block h-16 w-16 rounded-full" src="/images/profile.jpg" alt="Ryan">
      </div>
    </div>

  </div>

</Page>


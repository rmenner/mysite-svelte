<script>

import Page from '../components/page.svelte'

  const metadata = {
    page: {
      title: 'Design. Prototype. Build.'
    },
		title: 'Design. Prototype. Build.',
		description: 'My mission, to create work that is both useful and beautiful.',
		image: 'https://svelte.dev/images/twitter-card.png',
	}

</script>


<Page {metadata}>

  <div class="space-y-6 text-lg font-light text-gray-500 leading-relaxed tracking-wide">

    <p class="text-2xl">
      As a designer, developer, and individual I strive to do everything with diligence, integrity, and fervor. Always looking for a way to create work that is both useful and beautiful.
    </p>

    <div></div>

    <h2 class="text-3xl pt-20 font-light text-teal-700">Greetings</h2>
    <p>
      My name is Ryan and I live in famously hot Columbia, South Carolina with my wife, two dogs, chickens, and fish. Creating great design, eating pepperoni pizza, flying rc aircraft, and living in faith makes up my recipe for a happy and fulfilled life.
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


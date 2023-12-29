<script>

import Page from '../components/page.svelte'

  const metadata = {
    page: {
      title: 'Design. Prototype. Build.'
    },
		title: 'Design. Prototype. Build.',
		description: 'My mission, to create work that is both useful and beautiful.'
	}

</script>


<Page {metadata}>

  <div class="space-y-6 text-lg font-light text-gray-600 leading-relaxed tracking-wide">

    <p class="text-2xl">
      As a designer, developer, and individual I strive to do everything with diligence, integrity, and fervor. Always looking for a way to create work that is both useful and beautiful.
    </p>

    <div></div>

    <h2 class="text-3xl pt-20 font-light text-teal-700">Greetings</h2>
    <p>My name is Ryan and I live in famously hot Columbia, South Carolina with my wife, dogs, chickens, and fish. Outside of web development, I enjoy 3D printing and building/flying FPV quadcopters.</p>
    <p> I have been designing responsive web experiences for over 10 years. Specializing in simple mobile first user experiences with an emphasis on performance. I love to learn new things and enjoy teaching others. If you need my help for a project or would like some coaching/mentorship, please feel free to reach out.</p>

    <div class="flex items-center justify-end pr-8 pt-12">
      <div class="mr-3 text-right leading-snug">
        <p class="font-light text-gray-600">
          Thanks for visiting,
        </p>
        <p class="font-light text-base text-teal-700">
          - Ryan
        </p>
      </div>
      <div>
        <img class="inline-block h-16 w-16 rounded-full" src="/images/profile.jpg" alt="Ryan">
      </div>
    </div>

  </div>

</Page>


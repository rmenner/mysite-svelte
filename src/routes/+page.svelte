<script>

import Page from '../components/page.svelte'

  const metadata = {
    page: {
      title: 'Your team deserves to build something they\'re proud of.'
    },
		title: 'Design. Prototype. Build.',
		description: 'Frontend engineer specializing in design systems and component libraries that help teams ship faster and stay consistent.'
	}

</script>


<Page {metadata}>

  <div class="space-y-6 text-lg font-light dark:font-normal text-gray-600 dark:text-gray-100 leading-relaxed tracking-wide">

    <p>
      I keep design and engineering in sync by building the tooling that lets both teams ship.
    </p>

    <p>
      The best outcome isn't a working design system. It's a team that built something useful and beautiful together.
    </p>

    <h2 class="text-3xl pt-20 font-light dark:font-normal text-teal-700 dark:text-teal-300">Greetings</h2>
    <p>I live in famously hot Columbia, South Carolina, with my wife and two dogs. Off the clock, I'm still building things: home automation systems, home lab infrastructure, and FPV drones I fly myself.</p>
    <p>What I love most is the moment a team stops fighting their tools and starts building. It starts with components that are accessible, well-documented, and ready for the edge cases. From there, the PR that used to take a week goes out in an hour. Someone finds what they need without asking.</p>
    <p>I've spent the last few years at Alaska Airlines and E*TRADE making release day feel less like an event.</p>
    <p>If you're building or fixing a design system, reach out.</p>

    <div class="flex items-center justify-end pr-8 pt-12">
      <div class="mr-3 text-right leading-snug">
        <p class="font-light dark:font-normal text-gray-600 dark:text-gray-100">
          Thanks for visiting,
        </p>
        <p class="font-light dark:font-normal text-base text-teal-700 dark:text-teal-300">
          - Ryan
        </p>
      </div>
      <div>
        <img class="inline-block h-16 w-16 rounded-full" src="/images/profile.jpg" alt="Ryan">
      </div>
    </div>

  </div>

</Page>


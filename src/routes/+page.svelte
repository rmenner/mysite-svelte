<script>

import Page from '../components/page.svelte'

  const metadata = {
    page: {
      title: 'Calm code. Obvious interfaces. Quiet releases.'
    },
		title: 'About',
		description: 'Frontend engineer specializing in design systems and component libraries that help teams ship faster and stay consistent.'
	}

</script>


<Page {metadata}>

  <div class="space-y-6 text-lg font-light dark:font-normal text-gray-600 dark:text-gray-100 leading-relaxed tracking-wide">

    <p>
      Frontend engineer who builds interfaces that feel obvious to use. I specialize in component architecture, CSS that scales, and JavaScript that ages well.
    </p>

    <p>
      The best design systems disappear. When the infrastructure works, your team stops thinking about it and starts shipping.
    </p>

    <h2 class="text-3xl pt-20 font-light dark:font-normal text-teal-700 dark:text-teal-300">Greetings</h2>
    <p>I live in famously hot Columbia, South Carolina, with my wife and two dogs. Off the clock, I'm still building things: home automation systems, home lab infrastructure, and FPV drones I fly myself.</p>
    <p>The work I'm proudest of is the quiet kind: an interface that gets out of your way, a component someone finds without asking, or a release that doesn't feel like an event.</p>
    <p>Mentorship has been part of every team I've worked with. I work to be the engineer teammates bring their hard questions to.</p>
    <p>If you're scaling a design system, fixing one that isn't working, or hiring a frontend engineer who can stay with hard problems, reach out.</p>

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


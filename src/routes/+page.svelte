<script>

import Page from '../components/page.svelte'

  const metadata = {
    page: {
      title: 'Your team deserves a design system that actually works.'
    },
		title: 'Design. Prototype. Build.',
		description: 'Frontend engineer specializing in design systems and component libraries that help teams ship faster and stay consistent.'
	}

</script>


<Page {metadata}>

  <div class="space-y-6 text-lg font-light dark:font-normal text-gray-600 dark:text-gray-100 leading-relaxed tracking-wide">

    <p>
      I'm known for closing the gap between design and engineering: building the systems, tools, and workflows that let both sides move fast without stepping on each other.
    </p>

    <p>
      From Alaska Airlines to E*TRADE, I've helped teams reach millions of users with less friction, fewer bugs, and work they're proud of.
    </p>

    <h2 class="text-3xl pt-20 font-light dark:font-normal text-teal-700 dark:text-teal-300">Greetings</h2>
    <p>I live in famously hot Columbia, South Carolina, with my wife and two dogs. Off the clock, I'm still building things: home automation systems, home lab infrastructure, and FPV drones I fly myself.</p>
    <p>The best design systems disappear. When the infrastructure works, your team stops thinking about it and starts shipping. That's what I've spent 10 years building toward.</p>
    <p>I work across the full frontend lifecycle: from web components and build tooling to the developer experience and documentation that make adoption stick. At Alaska Airlines, I cut release cycle time by 80%. At E*TRADE, I helped move deploys from a full day to under 3 hours.</p>
    <p>If you're scaling a design system, fixing one that isn't working, or need a frontend engineer who can go deep, reach out.</p>

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


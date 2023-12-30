<script>
  let open = false;
  import "../app.pcss";
  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import Nav from '../components/nav.svelte';
  import Rocket from "../components/rocket.svelte";
  import MobileRocket from "../components/mobile-rocket.svelte";
  import { page } from '$app/stores';
  import Social from "../components/social.svelte";
  import Rights from "../components/rights.svelte";
	import Theme from "$components/theme.svelte";
  
  $: if ($page.url.pathname) {
      open = false;
    }
  
  </script>
  
  
    <div class="md:pr-64 flex flex-col flex-1 h-full">
      <div class="sticky top-0 flex justify-end z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 dark:bg-neutral-950 shadow">
        <MobileRocket refresh={$page.url.pathname}/>
        <button on:click={() => open = !open} tabindex="0" class="mr-1 -mt-0.5 h-12 w-12 inline-flex items-center justify-center text-teal-600 dark:text-teal-300 hover:text-teal-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 focus:ring-0 focus-visible:ring-black dark:focus-visible:ring-black">
          <span class="sr-only">Open sidebar</span>
          <!-- Heroicon name: outline/menu -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <main class="flex-1 flex items-center pt-28 lg:pt-12">
        <div class="py-12 w-full">
  
          <slot />
           
        </div>
      </main>
    </div>
  
  
    {#if open}
    <div class="fixed inset-0 right-0 flex justify-end z-40 md:hidden" role="dialog" aria-modal="true">
  
      <div transition:fade|global="{{delay: 250, duration: 300}}" on:click={() => open = !open} class="fixed inset-0 right-0 bg-gray-300 dark:bg-neutral-800 bg-opacity-75 dark:bg-opacity-75" aria-hidden="true"></div>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
  
      <div transition:fly|global="{{duration: 400, x: 300}}" class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-200 dark:bg-neutral-950">
   
        <div class="absolute top-0 right-0 mr-3 pt-2">
          <button on:click={() => open = !open} tabindex="0" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 focus:ring-0 focus-visible:ring-black dark:focus-visible:ring-black">
            <span class="sr-only">Close sidebar</span>
            <!-- Heroicon name: outline/x -->
            <svg class="h-6 w-6 text-teal-700 dark:text-teal-300 hover:text-teal-500 focus:outline-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          
          <nav class="mt-8 px-4 space-y-4">
  
            <Nav segment={$page.url.pathname}/>
            
          </nav>
        </div>
        <div class="flex-shrink-0 p-4">
  
          <Social />
  
          <Rights />

          <Theme />
          
        </div>
      </div>
  
      
    </div>
    {/if}
    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:right-0">
  
      <Rocket refresh={$page.url.pathname}/>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex flex-col min-h-0 bg-gray-200 dark:bg-neutral-950">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          
          <nav class="flex-1 px-4 space-y-4">
           
            <Nav segment={$page.url.pathname}/>
  
          </nav>
        </div>
        <div class="flex-shrink-0 p-4">
          
          <Social />
          
          <Rights />

          <Theme />
  
        </div>
      </div>
    </div>
   
  
  
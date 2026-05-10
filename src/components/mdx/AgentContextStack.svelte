<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '.stack-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.agent-context-container',
          start: 'top 80%',
        }
      }
    );
  });
</script>

<div class="agent-context-container relative my-8 md:my-12 p-4 sm:p-8 rounded-none bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden font-sans w-full">
  <!-- Decorative background elements -->
  <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
  <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

  <div class="text-center mb-8">
    <h3 class="text-xl font-bold text-white mb-2">The Agent Context Stack</h3>
    <p class="text-neutral-400 text-sm">6 layers of instructions compete before your prompt even reaches the model.</p>
  </div>

  <div class="relative flex flex-col items-center max-w-lg mx-auto">
    <!-- Center Line -->
    <div class="absolute left-1/2 top-4 bottom-12 w-0.5 bg-gradient-to-b from-neutral-700 via-purple-500/50 to-coral-500/50 -translate-x-1/2 z-0"></div>

    <!-- Stack Items -->
    {@render stackItem("System Prompt", "Base model instructions and core constraints", "bg-neutral-800/80 border-neutral-700", "text-neutral-300")}
    {@render stackItem("Harness & Tools", "Platform instructions (Claude Code, Cursor)", "bg-neutral-800/80 border-neutral-700", "text-neutral-300")}
    {@render stackItem("MCP Definitions", "Full schemas for connected external tools", "bg-purple-900/40 border-purple-700/50", "text-purple-300")}
    {@render stackItem("AGENTS.md", "Project-level context and automated rules", "bg-purple-900/40 border-purple-700/50", "text-purple-300")}
    {@render stackItem("Skill Instructions", "Task-specific guidelines and styling rules", "bg-purple-900/40 border-purple-700/50", "text-purple-300")}
    {@render stackItem("Your Prompt", "The actual thing you typed", "bg-teal-900/40 border-teal-700/50", "text-teal-300")}
    
    <!-- LLM Node -->
    <div class="stack-item relative z-10 w-full md:w-2/3 mt-6">
      <div class="flex flex-col items-center justify-center p-6 rounded-none bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-red-700/50 shadow-[0_0_30px_rgba(239,68,68,0.15)] backdrop-blur-sm">
        <svg class="w-8 h-8 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <span class="text-xl font-bold text-red-100 tracking-wider">The LLM</span>
        <span class="text-xs text-red-300/80 mt-1">Struggling with attention budget</span>
      </div>
    </div>
  </div>
</div>

{#snippet stackItem(title, desc, bgClass, textClass)}
  <div class="stack-item relative z-10 w-full md:w-[90%] lg:w-4/5 mb-4 md:mb-5 group">
    <div class="flex flex-row items-center justify-between p-3 sm:p-4 rounded-none {bgClass} border backdrop-blur-md transition-all duration-300 transform-gpu will-change-transform hover:-translate-y-1 hover:shadow-lg">
      <div class="flex flex-col flex-1 pr-2">
        <span class="font-semibold text-sm sm:text-base {textClass} leading-tight">{title}</span>
        <span class="text-[10px] sm:text-xs text-neutral-400 mt-1 sm:mt-1.5 leading-snug">{desc}</span>
      </div>
      <!-- Arrow down indicator -->
      <div class="hidden md:flex flex-col items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </div>
{/snippet}
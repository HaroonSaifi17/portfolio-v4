<script lang="ts">
import { Menu, X, Sun, Moon } from '@lucide/svelte';
import { gsap } from 'gsap';

let open = $state(false);
let dark = $state(false);
let nav: HTMLElement | undefined = $state();

$effect(() => {
  dark = document.documentElement.classList.contains('dark');
});

$effect(() => {
  if (!nav) return;

  const ctx = gsap.context(() => {
    gsap.set('.nav-logo', { x: -20, autoAlpha: 0 });
    gsap.set('.nav-link', { y: -15, autoAlpha: 0 });
    gsap.set('.nav-theme-btn', { scale: 0, autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.nav-logo', {
      x: 0,
      autoAlpha: 1,
      duration: 0.5,
    })
      .to(
        '.nav-link',
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.05,
        },
        '-=0.3',
      )
      .to(
        '.nav-theme-btn',
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.3,
          ease: 'back.out(2)',
        },
        '-=0.1',
      );
  }, nav);

  return () => ctx.revert();
});

function toggleTheme() {
  dark = !dark;
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
</script>

<nav
  bind:this={nav}
  class="border-b-4 border-foreground bg-background sticky top-0 z-50"
>
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <a
      href="/"
      class="nav-logo text-3xl font-black uppercase tracking-tighter"
    >
      Haroon<span class="text-primary">_</span>
    </a>

    <div
      class="hidden md:flex items-center gap-8 font-bold uppercase tracking-wider text-sm"
    >
      <a href="/#work" class="nav-link nav-link-hover" data-astro-prefetch>Work</a>
      <a href="/#experience" class="nav-link nav-link-hover" data-astro-prefetch>Experience</a>
      <a href="/blog" class="nav-link nav-link-hover" data-astro-prefetch>Blog</a>
      <a href="/case-studies" class="nav-link nav-link-hover" data-astro-prefetch>Case Studies</a>
      <a href="/#contact" class="nav-link nav-link-hover" data-astro-prefetch>Contact</a>
      <button
        onclick={toggleTheme}
        class="nav-theme-btn p-2 border-2 border-foreground bg-card"
        aria-label="Toggle theme"
      >
        {#if dark}
          <Sun size={18} strokeWidth={3} />
        {:else}
          <Moon size={18} strokeWidth={3} />
        {/if}
      </button>
    </div>

    <div class="flex md:hidden items-center gap-2">
      <button
        onclick={toggleTheme}
        class="p-2 border-2 border-foreground bg-card"
        aria-label="Toggle theme"
      >
        {#if dark}
          <Sun size={18} strokeWidth={3} />
        {:else}
          <Moon size={18} strokeWidth={3} />
        {/if}
      </button>
      <button
        class="p-2"
        onclick={() => (open = !open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {#if open}
          <X size={28} strokeWidth={3} />
        {:else}
          <Menu size={28} strokeWidth={3} />
        {/if}
      </button>
    </div>
  </div>

  {#if open}
    <div
      class="md:hidden border-t-4 border-foreground bg-background px-6 py-6 flex flex-col gap-4 font-bold uppercase tracking-wider text-lg"
    >
      <a href="/#work" onclick={() => (open = false)} data-astro-prefetch>Work</a>
      <a href="/#experience" onclick={() => (open = false)} data-astro-prefetch>Experience</a>
      <a href="/blog" onclick={() => (open = false)} data-astro-prefetch>Blog</a>
      <a href="/case-studies" onclick={() => (open = false)} data-astro-prefetch>Case Studies</a>
      <a href="/#contact" onclick={() => (open = false)} data-astro-prefetch>Contact</a>
    </div>
  {/if}
</nav>

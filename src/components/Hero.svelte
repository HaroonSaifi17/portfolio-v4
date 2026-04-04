<script lang="ts">
import { Button } from '$lib/components/ui/button';
import { Badge } from '$lib/components/ui/badge';
import HeroBento from './HeroBento.svelte';
import { gsap } from 'gsap';

let section: HTMLElement | undefined = $state();

$effect(() => {
  if (!section) return;

  const ctx = gsap.context(() => {
    gsap.set(
      [
        '.hero-badge',
        '.hero-title-line',
        '.hero-subtitle',
        '.hero-cta > *',
        '.hero-deco-bg',
        '.hero-deco-card',
        '.hero-watermark',
      ],
      { autoAlpha: 1 },
    );

    gsap.set('.hero-badge', { y: 20, autoAlpha: 0, scale: 0.8 });
    gsap.set('.hero-title-line', { y: '100%' });
    gsap.set('.hero-subtitle', { x: -40, autoAlpha: 0 });
    gsap.set('.hero-cta > *', { y: 30, autoAlpha: 0 });
    gsap.set('.hero-deco-bg', { xPercent: 10, yPercent: 10, autoAlpha: 0 });
    gsap.set('.hero-deco-card', { autoAlpha: 0, scale: 0.9 });
    gsap.set('.hero-watermark', { autoAlpha: 0, y: 40, scale: 0.85 });

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      delay: 0.3,
    });

    // Badge pops in with bounce
    tl.to('.hero-badge', {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })
      // Title lines reveal upward from behind mask
      .to(
        '.hero-title-line',
        {
          y: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        '-=0.2',
      )
      // Subtitle slides in from left
      .to(
        '.hero-subtitle',
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
        },
        '-=0.4',
      )
      // CTA buttons stagger in with overshoot
      .to(
        '.hero-cta > *',
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'back.out(1.4)',
        },
        '-=0.2',
      )
      // Orange background decorative box
      .to(
        '.hero-deco-bg',
        {
          xPercent: 0,
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
        },
        '-=0.7',
      )
      // Main hero card scales in
      .to(
        '.hero-deco-card',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
        },
        '-=0.5',
      )
      // MH watermark drifts up
      .to(
        '.hero-watermark',
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3',
      );
  }, section);

  return () => ctx.revert();
});
</script>

<section
  bind:this={section}
  class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
>
  <div class="space-y-8">
    <div class="hero-badge inline-block">
      <Badge
        class="rounded-none px-4 py-2 border-2 border-foreground shadow-[var(--shadow-sm)] font-bold uppercase tracking-widest text-xs"
      >
        Open for work
      </Badge>
    </div>

    <h1
      class="text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
    >
      <span class="block overflow-hidden pb-2">
        <span class="hero-title-line block">Digital</span>
      </span>
      <span class="block overflow-hidden">
        <span
          class="hero-title-line block text-transparent"
          style="-webkit-text-stroke: 2px var(--foreground);">Builder</span
        >
      </span>
    </h1>

    <p
      class="hero-subtitle text-xl md:text-2xl font-bold max-w-lg leading-relaxed border-l-4 border-primary pl-6"
    >
      Mohd Haroon — Full Stack Developer crafting production-grade web
      applications from the ground up.
    </p>

    <div class="hero-cta flex flex-wrap gap-3 pt-4">
      <Button
        href="mailto:haroondev2@gmail.com"
        class="px-8 py-4 h-auto border-4 border-foreground font-black uppercase tracking-widest text-base shadow-[var(--shadow-sm)]"
      >
        Hit me up
      </Button>
      <Button
        href="https://github.com/HaroonSaifi17"
        variant="outline"
        class="px-8 py-4 h-auto border-4 border-foreground bg-card text-foreground font-black uppercase tracking-widest text-base shadow-[var(--shadow-sm)]"
      >
        GitHub
      </Button>
    </div>
  </div>

  <div class="w-full max-w-xl mx-auto lg:max-w-none">
    <HeroBento />
  </div>
</section>

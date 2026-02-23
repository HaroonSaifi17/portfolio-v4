<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { gsap } from 'gsap';

  let section: HTMLElement | undefined = $state();

  $effect(() => {
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-badge', { y: 20, autoAlpha: 0, scale: 0.8 });
      gsap.set('.hero-title-line', { y: '100%' });
      gsap.set('.hero-subtitle', { x: -40, autoAlpha: 0 });
      gsap.set('.hero-cta > *', { y: 30, autoAlpha: 0 });
      gsap.set('.hero-deco-bg', { xPercent: 10, yPercent: 10, autoAlpha: 0 });
      gsap.set('.hero-deco-card', { autoAlpha: 0, scale: 0.9 });
      gsap.set('.hero-artifact', { autoAlpha: 0, y: 20 });
      gsap.set('.hero-artifact-chip', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-artifact-metric', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-artifact-log', { autoAlpha: 0, y: 12 });
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
        .to('.hero-title-line', {
          y: 0,
          duration: 0.8,
          stagger: 0.15,
        }, '-=0.2')
        // Subtitle slides in from left
        .to('.hero-subtitle', {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
        }, '-=0.4')
        // CTA buttons stagger in with overshoot
        .to('.hero-cta > *', {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'back.out(1.4)',
        }, '-=0.2')
        // Orange background decorative box
        .to('.hero-deco-bg', {
          xPercent: 0,
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
        }, '-=0.7')
        // Main hero card scales in
        .to('.hero-deco-card', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
        }, '-=0.5')
        // Artifact contents reveal
        .to('.hero-artifact', {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        }, '-=0.35')
        .to('.hero-artifact-chip', {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
        }, '-=0.3')
        .to('.hero-artifact-metric', {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
        }, '-=0.35')
        .to('.hero-artifact-log', {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
        }, '-=0.3')
        // MH watermark drifts up
        .to('.hero-watermark', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.3');
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

    <div class="hero-cta flex flex-wrap gap-6 pt-4">
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

  <div class="relative hidden lg:block">
    <div
      class="hero-deco-bg absolute inset-0 border-4 border-foreground bg-primary translate-x-4 translate-y-4"
    ></div>
    <div
      class="hero-deco-card w-full h-[600px] border-4 border-foreground bg-card relative z-10 overflow-hidden"
    >
      <div class="hero-artifact relative flex h-full flex-col gap-6 p-8">
        <div class="flex items-center justify-between">
          <span
            class="hero-artifact-chip inline-flex items-center gap-2 border-2 border-foreground bg-foreground text-background px-3 py-1 text-xs font-black uppercase tracking-widest"
          >
            Signature Artifact
          </span>
          <span class="text-xs font-black uppercase tracking-widest text-muted-foreground">
            2026
          </span>
        </div>

        <div
          class="hero-artifact-blueprint relative flex-1 min-h-[240px] border-4 border-foreground bg-accent/60 p-4 overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,26,26,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(26,26,26,0.08)_1px,transparent_1px)]"
            style="background-size: 24px 24px;"
          ></div>
          <div class="relative z-10 grid grid-cols-2 gap-3">
            <div class="border-2 border-foreground bg-card px-3 py-2 text-xs font-black uppercase tracking-widest">
              UI Systems
            </div>
            <div class="border-2 border-foreground bg-card px-3 py-2 text-xs font-black uppercase tracking-widest">
              API Core
            </div>
            <div class="border-2 border-foreground bg-card px-3 py-2 text-xs font-black uppercase tracking-widest">
              Data Flow
            </div>
            <div class="border-2 border-foreground bg-card px-3 py-2 text-xs font-black uppercase tracking-widest">
              Delivery
            </div>
          </div>
          <div class="absolute left-6 top-6 h-3 w-3 rounded-full bg-foreground"></div>
          <div class="absolute right-10 top-14 h-3 w-3 rounded-full bg-foreground"></div>
          <div class="absolute left-16 bottom-10 h-3 w-3 rounded-full bg-foreground"></div>
          <div class="absolute right-16 bottom-8 h-3 w-3 rounded-full bg-foreground"></div>
          <div class="absolute left-8 top-7 h-1 w-28 bg-foreground"></div>
          <div class="absolute right-12 top-16 h-24 w-1 bg-foreground"></div>
          <div class="absolute left-[72px] bottom-11 h-1 w-24 bg-foreground"></div>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            class="hero-artifact-chip border-2 border-foreground bg-card px-3 py-1 text-xs font-black uppercase tracking-widest"
          >
            TypeScript
          </span>
          <span
            class="hero-artifact-chip border-2 border-foreground bg-card px-3 py-1 text-xs font-black uppercase tracking-widest"
          >
            Astro
          </span>
          <span
            class="hero-artifact-chip border-2 border-foreground bg-card px-3 py-1 text-xs font-black uppercase tracking-widest"
          >
            Svelte
          </span>
          <span
            class="hero-artifact-chip border-2 border-foreground bg-card px-3 py-1 text-xs font-black uppercase tracking-widest"
          >
            Node.js
          </span>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="hero-artifact-metric border-2 border-foreground bg-card px-3 py-3">
            <div class="text-xs font-black uppercase tracking-widest">Strategy</div>
            <div class="mt-3 h-2 w-full bg-foreground"></div>
          </div>
          <div class="hero-artifact-metric border-2 border-foreground bg-card px-3 py-3">
            <div class="text-xs font-black uppercase tracking-widest">Design</div>
            <div class="mt-3 h-2 w-full bg-foreground"></div>
          </div>
          <div class="hero-artifact-metric border-2 border-foreground bg-card px-3 py-3">
            <div class="text-xs font-black uppercase tracking-widest">Build</div>
            <div class="mt-3 h-2 w-full bg-foreground"></div>
          </div>
        </div>

        <div
          class="hero-artifact-log flex items-center gap-3 border-2 border-foreground bg-background px-4 py-3 text-xs font-black uppercase tracking-widest"
        >
          <span class="bg-foreground text-background px-2 py-1">Build log</span>
          <span class="text-muted-foreground">Discover → Design → Deliver</span>
        </div>
      </div>
      <span
        class="hero-watermark pointer-events-none absolute bottom-0 right-0 text-[200px] font-black leading-none text-foreground/5 select-none -mb-12 -mr-2 tracking-tighter"
      >
        MH
      </span>
    </div>
  </div>
</section>

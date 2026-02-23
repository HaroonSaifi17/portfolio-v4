<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  let section: HTMLElement | undefined = $state();

  $effect(() => {
    if (!section) return;

    const root = section;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap.set(q(".exp-card"), { y: 80, autoAlpha: 0 });
      gsap.set(q(".exp-bullet"), { x: -20, autoAlpha: 0 });

      gsap.set(q(".exp-title"), { y: 60, autoAlpha: 0 });
      gsap.set(q(".exp-subtitle"), { y: 30, autoAlpha: 0 });

      // Title slides up
      gsap.to(q(".exp-title"), {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      // Subtitle follows
      gsap.to(q(".exp-subtitle"), {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      // Experience cards stagger in
      ScrollTrigger.batch(q(".exp-card"), {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.18,
            clearProps: "transform,opacity,visibility",
          }),
      });

      // Bullet points stagger with slight delay
      ScrollTrigger.batch(q(".exp-bullet"), {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            x: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          }),
      });
    }, section);

    return () => ctx.revert();
  });
</script>

<section
  bind:this={section}
  id="experience"
  class="grid grid-cols-1 lg:grid-cols-5 gap-y-12 lg:gap-y-0 lg:gap-x-16 xl:gap-x-20 border-t-4 border-foreground pt-20 pb-6 lg:pb-10"
>
  <div class="lg:col-span-2">
    <h2
      class="exp-title text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight md:tracking-tighter leading-none break-words mb-6"
    >
      Experience
    </h2>
    <p class="exp-subtitle text-xl font-bold max-w-sm">
      From startup chaos to crafting scalable, production-grade applications.
    </p>
  </div>

  <div class="exp-cards lg:col-span-3 space-y-6">
    <Card.Root
      class="exp-card p-6 lg:p-7 gap-0 border-4 border-foreground shadow-[var(--shadow-lg)] card-hover"
    >
      <div
        class="flex flex-col sm:flex-row justify-between sm:items-end border-b-4 border-foreground pb-4 mb-6 gap-4"
      >
        <div>
          <h3 class="text-2xl md:text-3xl font-black uppercase">MeowFi</h3>
          <p class="text-lg md:text-xl font-bold text-primary">
            Full Stack Developer Intern
          </p>
        </div>
        <span
          class="font-black uppercase tracking-widest bg-foreground text-background px-3 py-1 text-sm whitespace-nowrap w-fit"
        >
          Feb '25 – Oct '25
        </span>
      </div>
      <ul class="space-y-4 font-medium text-base md:text-lg list-none">
        <li
          class="exp-bullet pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-3 before:h-3 before:bg-primary before:border-2 before:border-foreground"
        >
          Architected scalable NPM Workspace Monorepo integrating React,
          Node.js, and tRPC with 100% end-to-end type safety.
        </li>
        <li
          class="exp-bullet pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-3 before:h-3 before:bg-primary before:border-2 before:border-foreground"
        >
          Engineered complex DeFi features including Liquidity Pools and Bribe
          Vaults via Balancer V3 protocols.
        </li>
        <li
          class="exp-bullet pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-3 before:h-3 before:bg-primary before:border-2 before:border-foreground"
        >
          Optimized blockchain interactions via Viem, Wagmi, and Multicall,
          reducing RPC requests by 40%.
        </li>
        <li
          class="exp-bullet pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-3 before:h-3 before:bg-primary before:border-2 before:border-foreground"
        >
          Deployed documentation hub with Astro Starlight, authoring 20+
          technical guides.
        </li>
        <li
          class="exp-bullet pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-3 before:h-3 before:bg-primary before:border-2 before:border-foreground"
        >
          Built entire frontend from scratch and managed AWS EC2 infrastructure.
        </li>
      </ul>
    </Card.Root>

    <Card.Root
      class="exp-card p-6 lg:p-7 gap-0 border-4 border-foreground shadow-[var(--shadow-lg)] card-hover"
    >
      <div
        class="flex flex-col sm:flex-row justify-between sm:items-end border-b-4 border-foreground pb-4 mb-6 gap-4"
      >
        <div>
          <h3 class="text-2xl md:text-3xl font-black uppercase">Freelance</h3>
          <p class="text-lg md:text-xl font-bold text-primary">
            Full Stack Developer
          </p>
        </div>
        <span
          class="font-black uppercase tracking-widest bg-foreground text-background px-3 py-1 text-sm whitespace-nowrap w-fit"
        >
          2023 – Present
        </span>
      </div>
      <ul class="space-y-4 font-medium text-base md:text-lg list-none">
        <li
          class="exp-bullet pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-3 before:h-3 before:bg-primary before:border-2 before:border-foreground"
        >
          Delivered 5+ projects including e-commerce platforms and dashboards.
        </li>
        <li
          class="exp-bullet pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-3 before:h-3 before:bg-primary before:border-2 before:border-foreground"
        >
          High client ratings for optimizing frontend performance and ensuring
          secure, scalable backend architecture.
        </li>
      </ul>
    </Card.Root>
  </div>
</section>

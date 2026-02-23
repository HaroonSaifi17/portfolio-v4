<script lang="ts">
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let footer: HTMLElement | undefined = $state();

  $effect(() => {
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.set('.footer-title', { y: 60, autoAlpha: 0 });
      gsap.set('.footer-email', { y: 40, autoAlpha: 0 });
      gsap.set('.footer-link', { y: 20, autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          once: true,
        },
      });

      // "Ready to Build?" heading scales and slides up
      tl.to('.footer-title', {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
      })
        // Email slides up
        .to('.footer-email', {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
        }, '-=0.3')
        // Social links stagger in
        .to('.footer-link', {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.08,
          clearProps: 'transform,opacity,visibility',
        }, '-=0.2');
    }, footer);

    return () => ctx.revert();
  });
</script>

<footer
  bind:this={footer}
  id="contact"
  class="border-t-4 border-foreground bg-card mt-32"
>
  <div class="max-w-7xl mx-auto px-6 py-20 text-center space-y-8">
    <h2
      class="footer-title text-5xl md:text-7xl font-black uppercase tracking-tighter"
    >
      Ready to Build?
    </h2>

    <a
      href="mailto:haroondev2@gmail.com"
      class="footer-email block text-xl sm:text-2xl md:text-4xl font-black uppercase hover:text-primary transition-colors duration-300 break-words"
    >
      haroondev2@gmail.com
    </a>

    <div
      class="flex flex-wrap justify-center gap-6 font-bold uppercase tracking-widest text-sm"
    >
      <a
        href="https://github.com/HaroonSaifi17"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link nav-link-hover">GitHub</a
      >
      <a
        href="https://linkedin.com/in/haroonsaifi17"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link nav-link-hover">LinkedIn</a
      >
      <a
        href="https://x.com/HaroonSaifi17_"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link nav-link-hover">Twitter</a
      >
      <a
        href="https://leetcode.com/u/HaroonSaifi17/"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link nav-link-hover">LeetCode</a
      >
    </div>
  </div>
</footer>

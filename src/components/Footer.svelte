<script lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let { animate = false } = $props();
let footer: HTMLElement | undefined = $state();

$effect(() => {
  if (!footer || !animate) return;

  gsap.registerPlugin(ScrollTrigger);

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
      .to(
        '.footer-email',
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
        },
        '-=0.3',
      )
      // Social links stagger in
      .to(
        '.footer-link',
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.08,
          clearProps: 'transform,opacity,visibility',
        },
        '-=0.2',
      );
  }, footer);

  return () => ctx.revert();
});
</script>

<footer
  bind:this={footer}
  id="contact"
  class="border-t-4 border-foreground bg-card mt-32 relative overflow-hidden"
  data-cursor-exclude
>
  <div class="footer-surface" aria-hidden="true"></div>
  <div class="footer-artifacts" aria-hidden="true">
    <span class="artifact artifact--stamp"></span>
    <span class="artifact artifact--ticket"></span>
    <span class="artifact artifact--barcode"></span>
  </div>

  <div class="footer-inner max-w-7xl mx-auto px-6 py-20 text-center space-y-8">
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

<style>
  .footer-inner {
    position: relative;
    z-index: 10;
  }

  .footer-surface {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      135deg,
      transparent 0 22px,
      rgba(26, 26, 26, 0.06) 22px 24px
    );
    opacity: 0.5;
    pointer-events: none;
  }

  :global(.dark) .footer-surface {
    background-image: repeating-linear-gradient(
      135deg,
      transparent 0 22px,
      rgba(244, 244, 240, 0.08) 22px 24px
    );
    opacity: 0.35;
  }

  .footer-artifacts {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .artifact {
    position: absolute;
    border: 3px solid var(--border);
    box-shadow: var(--shadow-sm);
    background: var(--card);
    opacity: 0.95;
  }

  .artifact--stamp {
    width: 150px;
    height: 100px;
    top: 14%;
    right: 8%;
    transform: rotate(6deg);
    background: var(--accent);
    background-image: repeating-linear-gradient(
      0deg,
      transparent 0 10px,
      rgba(26, 26, 26, 0.08) 10px 12px
    );
  }

  :global(.dark) .artifact--stamp {
    background-image: repeating-linear-gradient(
      0deg,
      transparent 0 10px,
      rgba(244, 244, 240, 0.1) 10px 12px
    );
  }

  .artifact--stamp::after {
    content: '';
    position: absolute;
    inset: 10px;
    border: 2px dashed var(--border);
  }

  .artifact--ticket {
    width: 170px;
    height: 70px;
    bottom: 16%;
    left: 6%;
    transform: rotate(-5deg);
    background: var(--secondary);
  }

  .artifact--ticket::before {
    content: '';
    position: absolute;
    left: 12px;
    right: 12px;
    top: 50%;
    border-top: 3px dashed var(--border);
  }

  .artifact--barcode {
    width: 150px;
    height: 38px;
    bottom: 18%;
    right: 10%;
    transform: rotate(2deg);
    background-image: repeating-linear-gradient(
      90deg,
      var(--foreground) 0 6px,
      transparent 6px 10px
    );
    background-size: 12px 100%;
  }

  @media (max-width: 768px) {
    .footer-artifacts {
      display: none;
    }
  }
</style>

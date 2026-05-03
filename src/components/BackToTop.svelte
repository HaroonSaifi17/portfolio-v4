<script lang="ts">
let visible = $state(false);
let scrollTimer: ReturnType<typeof setTimeout> | null = null;

$effect(() => {
  function onScroll() {
    visible = window.scrollY > window.innerHeight * 0.5;
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {}, 150);
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
    if (scrollTimer) clearTimeout(scrollTimer);
  };
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<button
  class="back-to-top"
  class:visible
  onclick={scrollToTop}
  aria-label="Back to top"
  title="Back to top"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
</button>

<style>
  .back-to-top {
    position: fixed;
    right: 20px;
    bottom: 24px;
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--border);
    background: var(--card);
    font-weight: 900;
    box-shadow: var(--shadow-sm);
    z-index: 40;
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
  }

  .back-to-top.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .back-to-top:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
    border-color: var(--primary);
  }

  @media (prefers-reduced-motion: reduce) {
    .back-to-top {
      transition: none;
    }
  }
</style>

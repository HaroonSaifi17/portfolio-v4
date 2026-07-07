<script lang="ts">
const { items }: { items: string[] } = $props();
</script>

<div
  class="marquee-wrapper border-y-4 border-foreground py-1 bg-card overflow-hidden relative"
>
  <div
    class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10"
  ></div>
  <div
    class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"
  ></div>

  <div
    class="marquee-track flex gap-12 font-black text-4xl uppercase tracking-widest text-foreground/15 whitespace-nowrap"
  >
    {#each items as item}
      <span class="marquee-item">{item}</span>
    {/each}
    {#each items as item}
      <span class="marquee-item">{item}</span>
    {/each}
  </div>
</div>

<style>
  .marquee-track {
    animation: marquee-slide 25s linear infinite;
    width: max-content;
  }

  .marquee-wrapper:hover .marquee-track,
  .marquee-wrapper:focus-within .marquee-track {
    animation-play-state: paused;
  }

  @keyframes marquee-slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track {
      animation: none;
      transform: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
      white-space: normal;
      color: var(--muted-foreground);
      opacity: 0.8;
    }
  }
</style>

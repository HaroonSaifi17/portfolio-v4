<script lang="ts">
import { gsap } from 'gsap';

// --- State ---
let wrapper: HTMLElement | undefined = $state();
let tiltEnabled = $state(false);

// Typewriter
let visibleLines = $state(0);
let cursorVisible = $state(true);

// Status cycling
const statuses = ['BUILDING', 'SHIPPING', 'LIVE'] as const;
let statusIdx = $state(2);

// Counter
let count = $state(0);

// Tech ticker index
const techs = [
  'Svelte',
  'Astro',
  'TypeScript',
  'Node.js',
  'Tailwind',
  'Go',
  'Docker',
  'PostgreSQL',
];
let techIdx = $state(0);

// Process step
let activeStep = $state(0);

// Code lines for the typewriter
const codeLines = [
  {
    tokens: [
      { text: 'const ', cls: 'kw' },
      { text: 'dev', cls: '' },
      { text: ' = {', cls: 'punc' },
    ],
  },
  {
    tokens: [
      { text: '  name', cls: '' },
      { text: ': ', cls: 'punc' },
      { text: '"Haroon"', cls: 'str' },
      { text: ',', cls: 'punc' },
    ],
  },
  {
    tokens: [
      { text: '  role', cls: '' },
      { text: ': ', cls: 'punc' },
      { text: '"Full Stack"', cls: 'str' },
      { text: ',', cls: 'punc' },
    ],
  },
  {
    tokens: [
      { text: '  stack', cls: '' },
      { text: ': ', cls: 'punc' },
      { text: '[', cls: 'punc' },
      { text: '"ts"', cls: 'str' },
      { text: ', ', cls: 'punc' },
      { text: '"svelte"', cls: 'str' },
      { text: ']', cls: 'punc' },
      { text: ',', cls: 'punc' },
    ],
  },
  {
    tokens: [
      { text: '  status', cls: '' },
      { text: ': ', cls: 'punc' },
      { text: '"building"', cls: 'str' },
    ],
  },
  { tokens: [{ text: '}', cls: 'punc' }] },
];

const processSteps = [
  { num: '01', label: 'DISCOVER' },
  { num: '02', label: 'DESIGN' },
  { num: '03', label: 'BUILD' },
  { num: '04', label: 'DELIVER' },
];

// --- Dot grid ---
const DOT_COLS = 7;
const DOT_ROWS = 5;
const dots = Array.from({ length: DOT_COLS * DOT_ROWS }, (_, i) => i);

// --- Effect: Animations ---
$effect(() => {
  if (!wrapper) return;

  let active = true;
  const intervals: ReturnType<typeof setInterval>[] = [];

  const ctx = gsap.context(() => {
    // Entry: stagger cells
    gsap.set('.bento-cell', { autoAlpha: 0, y: 24, scale: 0.92 });

    gsap.to('.bento-cell', {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(1.6)',
      delay: 2.0,
      clearProps: 'transform',
      onComplete() {
        tiltEnabled = true;
      },
    });

    // Dot wave animation
    gsap.to('.bento-dot', {
      scale: 2,
      opacity: 1,
      duration: 0.6,
      stagger: {
        each: 0.04,
        from: 'center',
        repeat: -1,
        yoyo: true,
      },
      ease: 'sine.inOut',
      delay: 2.8,
    });

    // Counter
    gsap.to(
      { val: 0 },
      {
        val: 42,
        duration: 2,
        delay: 2.4,
        ease: 'power2.out',
        onUpdate() {
          if (active) count = Math.round(this.targets()[0].val);
        },
      },
    );
  }, wrapper);

  // Typewriter interval — reveal one line at a time
  const typeDelay = setTimeout(() => {
    if (!active) return;
    let line = 0;
    const typeInterval = setInterval(() => {
      if (!active) {
        clearInterval(typeInterval);
        return;
      }
      line++;
      visibleLines = line;
      if (line >= codeLines.length) {
        clearInterval(typeInterval);
        // After finishing, wait then restart
        setTimeout(() => {
          if (!active) return;
          visibleLines = 0;
          // restart after reset pause
          setTimeout(() => {
            if (!active) return;
            let reLine = 0;
            const reType = setInterval(() => {
              if (!active) {
                clearInterval(reType);
                return;
              }
              reLine++;
              visibleLines = reLine;
              if (reLine >= codeLines.length) clearInterval(reType);
            }, 300);
            intervals.push(reType);
          }, 600);
        }, 4000);
      }
    }, 300);
    intervals.push(typeInterval);
  }, 2200);

  // Cursor blink
  const cursorInt = setInterval(() => {
    if (active) cursorVisible = !cursorVisible;
  }, 530);
  intervals.push(cursorInt);

  // Status cycle
  const statusInt = setInterval(() => {
    if (active) statusIdx = (statusIdx + 1) % statuses.length;
  }, 2400);
  intervals.push(statusInt);

  // Tech ticker
  const techInt = setInterval(() => {
    if (active) techIdx = (techIdx + 1) % techs.length;
  }, 1800);
  intervals.push(techInt);

  // Process step
  const stepInt = setInterval(() => {
    if (active) activeStep = (activeStep + 1) % processSteps.length;
  }, 2000);
  intervals.push(stepInt);

  return () => {
    active = false;
    clearTimeout(typeDelay);
    intervals.forEach(clearInterval);
    ctx.revert();
  };
});

// --- 3D Tilt ---
function handleMouseMove(e: MouseEvent) {
  if (!tiltEnabled || !wrapper) return;
  const rect = wrapper.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  gsap.to(wrapper.querySelector('.bento-tilt-target'), {
    rotateY: x * 8,
    rotateX: y * -8,
    duration: 0.6,
    ease: 'power2.out',
  });

  // Dynamic shadow shift
  gsap.to(wrapper.querySelector('.bento-tilt-target'), {
    '--shadow-x': `${4 - x * 8}px`,
    '--shadow-y': `${4 - y * 8}px`,
    duration: 0.6,
    ease: 'power2.out',
  });
}

function handleMouseLeave() {
  if (!wrapper) return;
  gsap.to(wrapper.querySelector('.bento-tilt-target'), {
    rotateY: 0,
    rotateX: 0,
    '--shadow-x': '4px',
    '--shadow-y': '4px',
    duration: 1,
    ease: 'elastic.out(1, 0.4)',
  });
}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={wrapper}
  class="relative"
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
  style="perspective: 800px;"
  aria-hidden="true"
>
  <!-- Orange offset bg -->
  <div
    class="hero-deco-bg absolute inset-0 border-4 border-foreground bg-primary translate-x-4 translate-y-4"
  ></div>

  <!-- Main card with tilt -->
  <div
    class="bento-tilt-target hero-deco-card relative z-10 w-full border-4 border-foreground bg-card overflow-hidden"
    style="transform-style: preserve-3d; --shadow-x: 4px; --shadow-y: 4px;"
  >
    <!-- Bento grid -->
    <div
      class="grid h-[420px] sm:h-[520px] lg:h-[600px] gap-[3px] bg-foreground/10 p-[3px]"
      style="grid-template-columns: 1.6fr 1fr; grid-template-rows: 1fr 1fr 0.6fr 42px;"
    >
       <!-- 1) TERMINAL — spans 2 rows -->
       <div
         class="bento-cell col-start-1 row-start-1 row-span-2 bg-foreground text-background p-4 flex flex-col gap-2 overflow-hidden"
       >
        <!-- Window chrome -->
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 bg-primary"></span>
          <span class="w-2.5 h-2.5 bg-background/20"></span>
          <span class="w-2.5 h-2.5 bg-background/20"></span>
          <span class="ml-auto text-[10px] font-bold uppercase tracking-widest text-background/40">
            dev.ts
          </span>
        </div>
         <!-- Code block -->
         <div class="font-mono text-sm leading-relaxed flex-1">
          {#each codeLines as line, i}
            <div
              class="transition-opacity duration-200"
              style="opacity: {i < visibleLines ? 1 : 0}; transform: translateY({i < visibleLines ? 0 : 4}px);"
            >
              {#each line.tokens as token}
                <span
                  class={token.cls === 'kw'
                    ? 'text-primary'
                    : token.cls === 'str'
                      ? 'text-primary/70'
                      : token.cls === 'punc'
                        ? 'text-background/50'
                        : 'text-background/90'}>{token.text}</span
                >
              {/each}
              {#if i === visibleLines - 1}
                <span
                  class="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
                  style="opacity: {cursorVisible ? 1 : 0};"
                ></span>
              {/if}
            </div>
          {/each}
         </div>

         <div class="bento-theme-row mt-auto pt-3">
           <button
             class="bento-theme-dot"
             style="--dot-color: #f4f4f0; --dot-border: rgba(244, 244, 240, 0.7);"
             data-palette="default"
             aria-label="Set default theme"
             title="Theme: Default"
             data-cursor="pointer"
           ></button>
           <button
             class="bento-theme-dot"
             style="--dot-color: #2b54ff; --dot-border: rgba(244, 244, 240, 0.7);"
             data-palette="cobalt"
             aria-label="Set cobalt theme"
             title="Theme: Cobalt"
             data-cursor="pointer"
           ></button>
           <button
             class="bento-theme-dot"
             style="--dot-color: #1e7a4e; --dot-border: rgba(244, 244, 240, 0.7);"
             data-palette="forest"
             aria-label="Set forest theme"
             title="Theme: Forest"
             data-cursor="pointer"
           ></button>
           <button
             class="bento-theme-dot"
             style="--dot-color: #f4a100; --dot-border: rgba(244, 244, 240, 0.7);"
             data-palette="amber"
             aria-label="Set amber theme"
             title="Theme: Amber"
             data-cursor="pointer"
           ></button>
         </div>
      </div>

      <!-- 2) STATUS -->
      <div
        class="bento-cell col-start-2 row-start-1 bg-primary text-primary-foreground p-4 flex flex-col justify-between"
      >
        <div class="flex items-center gap-2">
          <span
            class="w-2 h-2 bg-primary-foreground"
            style="animation: pulse-square 1.5s infinite;"
          ></span>
          <span class="text-[10px] font-black uppercase tracking-widest">Status</span>
        </div>
        <div class="text-2xl font-black uppercase tracking-tight leading-none">
          {statuses[statusIdx]}
        </div>
      </div>

      <!-- 3) COUNTER -->
      <div
        class="bento-cell col-start-2 row-start-2 bg-card p-4 flex flex-col justify-between"
      >
        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Projects
        </span>
        <div class="flex items-baseline gap-1">
          <span class="text-4xl sm:text-5xl font-black tabular-nums leading-none">{count}</span>
          <span class="text-2xl font-black text-primary">+</span>
        </div>
      </div>

      <!-- 4) DOT MATRIX -->
      <div
        class="bento-cell col-start-1 row-start-3 bg-card p-3 flex items-center justify-center"
      >
        <div
          class="grid gap-[6px]"
          style="grid-template-columns: repeat({DOT_COLS}, 6px);"
        >
          {#each dots as _, i}
            <span
              class="bento-dot w-[6px] h-[6px] bg-foreground opacity-20"
            ></span>
          {/each}
        </div>
      </div>

      <!-- 5) TECH TICKER -->
      <div
        class="bento-cell col-start-2 row-start-3 bg-card p-4 flex flex-col justify-center overflow-hidden"
      >
        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
          Current Stack
        </span>
        <div class="relative h-8 overflow-hidden">
          {#each techs as tech, i}
            <span
              class="absolute inset-0 flex items-center text-xl font-black uppercase tracking-tight transition-all duration-300"
              style="
                opacity: {i === techIdx ? 1 : 0};
                transform: translateY({i === techIdx ? '0' : '100%'});
              "
            >
              {tech}
            </span>
          {/each}
        </div>
      </div>

      <!-- 6) PROCESS FLOW -->
      <div
        class="bento-cell col-span-2 row-start-4 bg-card flex items-stretch"
      >
        {#each processSteps as step, i}
          <button
            class="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 border-r last:border-r-0 border-foreground/10
              {i === activeStep ? 'bg-foreground text-background' : 'text-muted-foreground'}"
          >
            <span
              class="text-[9px] {i === activeStep ? 'text-primary' : ''}"
            >
              {step.num}
            </span>
            {step.label}
          </button>
        {/each}
      </div>
    </div>

    <!-- MH watermark -->
        <span
          class="hero-watermark pointer-events-none absolute bottom-0 right-0 text-[140px] sm:text-[180px] lg:text-[200px] font-black leading-none text-foreground/5 select-none -mb-8 sm:-mb-10 lg:-mb-12 -mr-1 sm:-mr-2 tracking-tighter"
        >
          MH
        </span>
  </div>
</div>

<style>
  @keyframes pulse-square {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  .bento-theme-dot {
    width: 12px;
    height: 12px;
    border-radius: 999px;
    border: 2px solid var(--dot-border, currentColor);
    background: var(--dot-color, currentColor);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    cursor: pointer;
  }

  .bento-theme-dot:hover {
    transform: translateY(-1px);
  }

  .bento-theme-dot:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .bento-theme-dot {
      transition: none;
    }
  }
</style>

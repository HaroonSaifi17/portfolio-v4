<script lang="ts">
import * as Card from '$lib/components/ui/card';

const {
  title,
  tech,
  description,
  href,
  index,
}: {
  title: string;
  tech: string;
  description: string;
  href: string;
  index: number;
} = $props();

const isExternal = $derived(href.startsWith('http'));
const cta = $derived(
  href.startsWith('/case-studies/') ? 'Read Case Study' : 'View Project',
);
</script>

<Card.Root
  class="project-card group relative p-8 gap-0 border-4 border-foreground shadow-[var(--shadow-lg)] card-hover"
>
  <div
    class="card-index absolute -top-5 -right-5 w-12 h-12 bg-primary border-4 border-foreground rounded-full shadow-[var(--shadow-sm)] flex items-center justify-center z-10"
  >
    <span class="text-primary-foreground font-black">{index}</span>
  </div>

  <h3 class="text-3xl font-black uppercase mb-2 tracking-tight">{title}</h3>
  <p
    class="font-bold text-muted-foreground uppercase tracking-widest text-sm mb-6"
  >
    {tech}
  </p>
  <p class="text-lg font-medium leading-relaxed mb-8">{description}</p>
  <a
    {href}
    target={isExternal ? '_blank' : undefined}
    rel={isExternal ? 'noopener noreferrer' : undefined}
    class="inline-block border-b-4 border-foreground text-xl font-black uppercase hover:border-primary transition-colors duration-300"
  >
    {cta} &rarr;
  </a>
</Card.Root>

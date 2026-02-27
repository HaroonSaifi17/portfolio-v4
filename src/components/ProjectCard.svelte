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
  <h3 class="text-3xl font-black uppercase mb-2 tracking-tight flex items-start gap-3">
    <span
      class="card-index mt-1 w-6 h-6 bg-primary border-2 border-foreground text-primary-foreground font-black text-xs leading-none flex items-center justify-center shrink-0"
    >
      {index}
    </span>
    <span>{title}</span>
  </h3>
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

# Mohd Haroon Portfolio (v4)

Personal portfolio site built with Astro, Svelte, Tailwind CSS, and MDX. It showcases projects, experience, blog posts, and case studies with view transitions and GSAP-driven motion.

## Stack

- Astro for routing, layouts, and content collection
- Svelte for interactive UI
- Tailwind CSS for styling
- MDX for blog posts and case studies
- GSAP for animations
- Bun for package management and scripts

## Content

- Blog posts live in `src/content/blog`
- Case studies live in `src/content/case-studies`
- Content schemas are defined in `src/content.config.ts`

## View Transitions

Astro View Transitions are enabled globally in `src/layouts/Layout.astro` and linked between list cards and detail pages so titles, dates, and hero images animate smoothly across navigation.

## Commands

All commands run from the project root:

| Command | Action |
| --- | --- |
| `bun install` | Install dependencies |
| `bun dev` | Start local dev server at `localhost:4321` |
| `bun build` | Build production site to `./dist/` |
| `bun preview` | Preview the production build |
| `bun astro ...` | Run Astro CLI commands |

## Notes

- The layout and styles live in `src/layouts` and `src/styles/global.css`.
- Interactive sections are in `src/components`.

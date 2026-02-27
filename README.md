# Portfolio V4

Bold, editorial-style portfolio template built with Astro + Svelte. Designed to showcase projects, experience, blog posts, and case studies with crisp motion and high-contrast typography.

![Preview](public/images/preview.png)

![Astro](https://img.shields.io/badge/Astro-Framework-ff5d01?logo=astro&logoColor=fff)
![Svelte](https://img.shields.io/badge/Svelte-UI-ff3e00?logo=svelte&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss&logoColor=fff)
![MDX](https://img.shields.io/badge/MDX-Content-000000?logo=mdx&logoColor=fff)
![Bun](https://img.shields.io/badge/Bun-Tooling-000000?logo=bun&logoColor=fff)
![License](https://img.shields.io/badge/License-MIT-22c55e)

## Features

- Editorial typography and strong hierarchy
- Astro content collections with MDX for blog posts and case studies
- Svelte components for interactive sections
- Tailwind CSS theme tokens and global styling
- GSAP scroll-triggered reveals
- View Transitions between list and detail pages

## Tech Stack

- Astro
- Svelte
- Tailwind CSS
- MDX
- GSAP
- Bun

## Requirements

- Bun (recommended for scripts below)

## Quick Start

```bash
bun install
bun dev
```

Open `http://localhost:4321`.

## Build and Preview

```bash
bun build
bun preview
```

## Scripts

| Command | Description |
| --- | --- |
| `bun dev` | Start the dev server |
| `bun build` | Build the production site |
| `bun preview` | Preview the production build |
| `bun lint` | Run Biome lint |
| `bun format` | Format with Biome |

## Project Structure

```text
src/
  components/         Svelte components
  content/
    blog/             Blog posts (MDX)
    case-studies/     Case studies (MDX)
  layouts/            Page layouts
  pages/              Astro routes
  styles/             Global styles and tokens
```

## Customize

- Update the homepage sections in `src/pages/index.astro`
- Edit component copy in `src/components`
- Add or edit posts in `src/content/blog`
- Add or edit case studies in `src/content/case-studies`
- Adjust theme tokens in `src/styles/global.css`

## Deployment

This is a static Astro build. After `bun build`, deploy the `dist/` directory to your host of choice.

## License

MIT. See `LICENSE`.

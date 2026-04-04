import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/case-studies',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageCrop: z.boolean().optional(),
    heroImagePosition: z.enum(['top', 'center']).optional(),
    role: z.string().optional(),
    timeline: z.string().optional(),
    stack: z.array(z.string()).optional(),
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };

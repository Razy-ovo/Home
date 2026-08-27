import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({
    base: './src/content/articles',
    pattern: '**/*.md',
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pubDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { articles };

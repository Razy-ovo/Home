import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const titleFromEntry = (entry: string) => entry.split('/').at(-1)?.replace(/\.md$/i, '') ?? '未命名文章';

const idFromEntry = (entry: string) => entry
  .replace(/\.md$/i, '')
  .split('/')
  .map((segment) => segment
    .normalize('NFKD')
    .toLocaleLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, ''))
  .filter(Boolean)
  .join('/')
  .replace(/\/index$/, '');

const articles = defineCollection({
  loader: glob({
    base: './src/content/articles',
    pattern: '**/*.md',
    generateId: ({ entry, data }) => {
      if (typeof data.title !== 'string' || !data.title.trim()) {
        data.title = titleFromEntry(entry);
      }

      return typeof data.slug === 'string' && data.slug.trim() ? data.slug : idFromEntry(entry);
    },
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

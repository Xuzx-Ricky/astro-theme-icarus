import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional(),
    author: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    thumbnail: z.string().optional(),
    heroImage: z.string().optional(),
    toc: z.boolean().default(true),
    comment: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};

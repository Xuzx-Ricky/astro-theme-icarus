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
    // 文章级别配置
    toc: z.boolean().default(true),           // 是否显示目录
    comment: z.boolean().default(true),       // 是否显示评论
    draft: z.boolean().default(false),        // 是否为草稿
    sticky: z.boolean().default(false),       // 是否置顶
    hidden: z.boolean().default(false),       // 是否隐藏
    layout: z.enum(['two-column', 'three-column']).default('three-column'), // 布局类型
    showShare: z.boolean().default(true),     // 是否显示分享
    showDonation: z.boolean().default(false), // 是否显示打赏
    showSidebar: z.boolean().default(true),   // 是否显示侧边栏
  }),
});

export const collections = {
  blog: blogCollection,
};

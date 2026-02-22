import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../utils/helpers';
import { SITE } from '../config';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site?.toString() || SITE.url,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      pubDate: post.data.pubDatetime,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}

import type { APIContext } from 'astro';
import { getAllPosts } from '../utils/helpers';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  
  const searchData = posts.map(post => ({
    title: post.data.title,
    url: `/blog/${post.slug}/`,
    content: post.body.slice(0, 5000),
    excerpt: post.data.description,
    tags: post.data.tags,
    category: post.data.category,
    date: post.data.pubDatetime,
  }));
  
  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

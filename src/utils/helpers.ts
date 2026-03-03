import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// 获取所有文章
export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => {
    // 过滤掉草稿和隐藏的文章
    if (data.hidden) return false;
    return import.meta.env.DEV || !data.draft;
  });
  
  return posts.sort((a, b) => {
    // 置顶文章排在前面
    if (a.data.sticky && !b.data.sticky) return -1;
    if (!a.data.sticky && b.data.sticky) return 1;
    // 然后按日期排序
    return b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf();
  });
}

// 获取文章字数
export function getWordCount(content: string): number {
  // 移除 frontmatter
  const cleanContent = content.replace(/---[\s\S]*?---/, '');
  // 统计中文字符和英文单词
  const chineseChars = (cleanContent.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (cleanContent.match(/[a-zA-Z]+/g) || []).length;
  return chineseChars + englishWords;
}

// 计算阅读时间
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 300;
  const wordCount = getWordCount(content);
  return Math.ceil(wordCount / wordsPerMinute);
}

// 格式化日期
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else if (format === 'YYYY年MM月DD日') {
    return `${year}年${month}月${day}日`;
  } else if (format === 'MM-DD') {
    return `${month}-${day}`;
  }
  return `${year}-${month}-${day}`;
}

// 按年份分组文章
export function groupPostsByYear(posts: CollectionEntry<'blog'>[]): Record<number, CollectionEntry<'blog'>[]> {
  return posts.reduce((acc, post) => {
    const year = new Date(post.data.pubDatetime).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<number, CollectionEntry<'blog'>[]>);
}

// 统计分类
export function countCategories(posts: CollectionEntry<'blog'>[]): Record<string, number> {
  return posts.reduce((acc, post) => {
    const cat = post.data.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

// 统计标签
export function countTags(posts: CollectionEntry<'blog'>[]): Record<string, number> {
  return posts.reduce((acc, post) => {
    post.data.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
}

// 截断文本
export function truncate(text: string, length: number = 150): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

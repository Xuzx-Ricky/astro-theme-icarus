#!/usr/bin/env node
/**
 * 创建新文章脚本
 * 自动生成 markdown 文件并渲染
 */

import { writeFile, mkdir, access } from 'fs/promises';
import { resolve } from 'path';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function generateTemplate({ title, description, tags, category }) {
  const date = new Date().toISOString();
  const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
  
  return `---
title: "${title}"
description: "${description || title}"
pubDate: ${date}
updatedDate: ${date}
${category ? `category: "${category}"` : ''}
${tagList.length > 0 ? `tags:\n${tagList.map(t => `  - "${t}"`).join('\n')}` : ''}
heroImage: ""
draft: false
---

# ${title}

在这里开始撰写你的文章...

## 二级标题

正文内容

### 三级标题

- 列表项 1
- 列表项 2
- 列表项 3

> 引用内容

\`\`\`javascript
// 代码块
console.log('Hello, World!');
\`\`\`

---

**粗体文本** 和 *斜体文本*

[链接文本](https://example.com)

![图片描述](https://example.com/image.jpg)
`;
}

async function createPost() {
  console.log('📝 创建新文章\n');
  console.log('═══════════════════════════════════════\n');
  
  try {
    const title = await question('文章标题: ');
    if (!title.trim()) {
      console.log('❌ 标题不能为空');
      process.exit(1);
    }
    
    const description = await question('文章描述 (可选): ');
    const category = await question('分类 (可选): ');
    const tags = await question('标签 (用逗号分隔, 可选): ');
    
    const slug = generateSlug(title);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // 确保目录存在
    const postsDir = resolve(process.cwd(), 'src', 'content', 'blog');
    await mkdir(postsDir, { recursive: true });
    
    // 生成文件名
    const filename = `${year}-${month}-${String(date.getDate()).padStart(2, '0')}-${slug}.md`;
    const filepath = resolve(postsDir, filename);
    
    // 生成内容
    const content = generateTemplate({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      tags: tags.trim()
    });
    
    // 写入文件
    await writeFile(filepath, content, 'utf-8');
    
    console.log('\n═══════════════════════════════════════');
    console.log('✅ 文章创建成功!');
    console.log('═══════════════════════════════════════');
    console.log(`文件: src/content/blog/${filename}`);
    console.log(`标题: ${title}`);
    console.log('\n你可以现在编辑这个文件来撰写文章。');
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('❌ 创建失败:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createPost();

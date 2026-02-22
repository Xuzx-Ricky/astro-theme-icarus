#!/usr/bin/env node

/**
 * 便捷的页面创建脚本
 * 用法: node scripts/create-page.js <page-name> [options]
 * 
 * 示例:
 *   node scripts/create-page.js friends --title="友情链接" --icon="fa-link"
 *   node scripts/create-page.js projects --title="我的项目" --sidebar=false
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    name: '',
    title: '',
    description: '',
    icon: 'fa-file',
    sidebar: true,
    comments: true,
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (!arg.startsWith('--')) {
      options.name = arg;
    } else if (arg === '--title') {
      options.title = args[++i] || '';
    } else if (arg === '--description') {
      options.description = args[++i] || '';
    } else if (arg === '--icon') {
      options.icon = args[++i] || 'fa-file';
    } else if (arg === '--sidebar') {
      options.sidebar = args[++i] !== 'false';
    } else if (arg === '--comments') {
      options.comments = args[++i] !== 'false';
    }
  }
  
  // 如果没有提供标题，使用名称
  if (!options.title && options.name) {
    options.title = options.name.charAt(0).toUpperCase() + options.name.slice(1);
  }
  
  return options;
}

// 生成页面模板
function generatePageTemplate(options) {
  const { title, description, icon, sidebar, comments } = options;
  
  return `---
import PageLayout from '../layouts/PageLayout.astro';

const pageTitle = '${title}';
const pageDescription = '${description || title}';
---

<PageLayout 
  title={pageTitle} 
  description={pageDescription}
  showSidebar={${sidebar}}
  showComments={${comments}}
>
  <i slot="icon" class="fas ${icon}"></i>
  
  <p>这里是 ${title} 页面的内容。</p>
  
  <h2>标题 2</h2>
  <p>你可以在这里添加更多内容...</p>
  
  <h2>标题 3</h2>
  <p>继续添加内容...</p>
</PageLayout>
`;
}

// 生成导航配置更新提示
function generateNavConfig(options) {
  return `
// 添加到 src/config.ts 的 NAV_LINKS 中：
{ href: '/${options.name}', label: '${options.title}', icon: 'fa-${options.icon.replace('fa-', '')}' },
`;
}

// 主函数
function main() {
  const options = parseArgs();
  
  if (!options.name) {
    console.log(`
用法: node scripts/create-page.js <page-name> [options]

选项:
  --title       页面标题
  --description 页面描述
  --icon        Font Awesome 图标类名 (默认: fa-file)
  --sidebar     是否显示侧边栏 (默认: true)
  --comments    是否显示评论 (默认: true)

示例:
  node scripts/create-page.js friends --title="友情链接" --icon="fa-link"
  node scripts/create-page.js projects --title="我的项目" --sidebar=false
`);
    process.exit(1);
  }
  
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  const pageFile = path.join(pagesDir, `${options.name}.astro`);
  
  // 检查文件是否已存在
  if (fs.existsSync(pageFile)) {
    console.error(`❌ 页面 "${options.name}" 已存在！`);
    process.exit(1);
  }
  
  // 创建页面文件
  const template = generatePageTemplate(options);
  fs.writeFileSync(pageFile, template);
  
  console.log(`
✅ 页面 "${options.name}" 创建成功！

文件位置: src/pages/${options.name}.astro
访问地址: http://localhost:4321/${options.name}
`);
  
  console.log(generateNavConfig(options));
}

main();

# Astro Icarus 主题 v2.3

<p align="center">
  <img src="public/favicon.svg" width="80" height="80" alt="Astro Icarus Logo">
</p>

<p align="center">
  基于 Astro 5.x 构建的现代博客主题，完美还原 Hexo Icarus 经典设计
</p>

<p align="center">
  <a href="https://astro.build">
    <img src="https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro" alt="Astro">
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript" alt="TypeScript">
  </a>
  <a href="https://pnpm.io">
    <img src="https://img.shields.io/badge/pnpm-9.x-F69220?logo=pnpm" alt="pnpm">
  </a>
  <a href="https://pages.cloudflare.com">
    <img src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare" alt="Cloudflare Pages">
  </a>
</p>

---

## 特性

### 核心功能
- **Astro 5.x + TypeScript** - 最新技术栈
- **三栏响应式布局** - 经典 Icarus 设计
- **赛博朋克2077暗色模式** - 霓虹青色和洋红色
- **图片自动优化** - 构建时自动压缩并转 WebP
- **懒加载图片** - 未加载完成也可点击查看

### 交互功能
- **智能日历** - 显示农历、节气、节假日和倒计时
- **右键菜单** - 自定义右键菜单，支持复制、搜索、阅读模式
- **点击动效** - 鼠标点击波纹效果和双击爱心
- **毛玻璃效果** - 导航栏和卡片毛玻璃效果

### 评论与搜索
- **8种评论系统** - Giscus、Gitalk、Valine、Waline、Twikoo、Utterances、Disqus、畅言云评
- **多种搜索引擎** - Fuse.js、Algolia、百度、Insight
- **评论主题自适应** - 自动切换白天/黑夜主题

### 其他功能
- **文章目录 (TOC)** - 粘性定位，滚动高亮
- **一言小组件** - 每日随机名言，不重复
- **分享功能** - Twitter、Facebook、LinkedIn、微博、微信
- **打赏功能** - 支付宝、微信、PayPal
- **友情链接** - 圆角卡片设计
- **RSS 订阅** - 自动生成
- **备案信息** - 便捷的备案信息显示

---

## 快速开始

### 安装 pnpm

```bash
# 使用 npm 安装
npm install -g pnpm

# 或使用 Homebrew (macOS)
brew install pnpm

# 或使用 Scoop (Windows)
scoop install pnpm
```

### 创建项目

```bash
# 克隆仓库
git clone https://github.com/Xuzx-Ricky/astro-icarus.git my-blog
cd my-blog

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 常用命令

```bash
pnpm dev              # 启动开发服务器
pnpm build            # 构建生产版本
pnpm preview          # 预览生产构建
pnpm new:page <name>  # 创建新页面
pnpm new:post         # 创建新文章（交互式）
pnpm compress         # 压缩 HTML 文件
pnpm optimize         # 优化图片
```

---

## 创建内容

### 创建新文章

```bash
# 交互式创建文章
pnpm new:post

# 手动创建
# 在 src/content/blog/ 目录下创建 .md 文件
```

### 创建新页面

```bash
# 创建友情链接页面
pnpm new:page friends --title="友情链接" --icon="fa-link"

# 创建项目展示页面（无侧边栏）
pnpm new:page projects --title="我的项目" --sidebar=false

# 创建关于页面（无评论）
pnpm new:page about --title="关于我" --comments=false
```

---

## 部署到 Cloudflare Pages

### 方法一：通过 Git 集成

1. 将代码推送到 GitHub/GitLab 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 进入 Pages > 创建项目
4. 连接你的 Git 仓库
5. 构建设置：
   - Framework preset: `Astro`
   - Build command: `pnpm build`
   - Build output directory: `dist`
6. 点击保存并部署

### 方法二：直接上传

```bash
# 构建项目
pnpm build

# 压缩 HTML（可选）
pnpm compress

# 上传 dist 文件夹到 Cloudflare Pages
```

---

## 配置说明

### 站点配置 (`src/config.ts`)

```typescript
export const SITE = {
  title: 'Astro Icarus',
  subtitle: '',           // 导航栏显示的文字
  description: '',        // 网站描述
  url: 'https://astro-icarus.pages.dev',
  lang: 'zh-CN',
  favicon: '/favicon.svg',
  author: 'Your Name',
  startYear: 2024,
};
```

### 评论系统配置

```typescript
export const COMMENT_CONFIG = {
  provider: 'giscus',  // 可选: giscus, gitalk, valine, waline, twikoo, utterances, disqus, changyan
  giscus: {
    repo: 'your-username/your-repo',
    repoId: '...',
    category: 'Announcements',
    categoryId: '...',
    // 主题自动切换
    theme: 'preferred_color_scheme',
  },
};
```

### 搜索引擎配置

```typescript
export const SEARCH_CONFIG = {
  provider: 'insight',  // 可选: insight, fuse, algolia, baidu
  enabled: true,
};
```

### 智能日历配置

```typescript
export const SMART_CALENDAR_CONFIG = {
  enabled: true,
  showLunar: true,        // 显示农历
  showSolarTerms: true,   // 显示节气
  showHolidays: true,     // 显示节假日
  countdowns: [
    {
      id: 'newyear',
      title: '新年倒计时',
      targetDate: '2026-01-01T00:00:00',
      icon: 'fa-glass-cheers',
    },
  ],
};
```

### 右键菜单配置

```typescript
export const RIGHT_MENU_CONFIG = {
  enabled: true,
  items: {
    navigation: true,   // 导航按钮
    copyPaste: true,    // 复制粘贴
    search: true,       // 搜索功能
    themeToggle: true,  // 主题切换
    readMode: true,     // 阅读模式
  },
  searchEngines: [
    { name: '百度', url: 'https://www.baidu.com/s?wd=', icon: 'fa-search' },
    { name: '必应', url: 'https://cn.bing.com/search?q=', icon: 'fa-search' },
  ],
};
```

### 备案信息配置

```typescript
export const ICP_CONFIG = {
  enabled: true,
  number: '京ICP备XXXXXXXX号',
  url: 'https://beian.miit.gov.cn/',
  police: {
    enabled: true,
    number: '京公网安备XXXXXXXX号',
    url: 'https://www.beian.gov.cn/',
  },
};
```

### 图片优化配置

```typescript
export const IMAGE_CONFIG = {
  enabled: true,
  service: 'sharp',      // 图片处理服务
  format: 'webp',        // 输出格式
  quality: 80,           // 图片质量
  placeholder: 'blur',   // 占位符类型
};
```

---

## 图片优化

### 自动优化

构建时会自动优化图片：
- 转换为 WebP 格式
- 压缩图片大小
- 生成响应式图片

### 使用优化图片组件

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
---

<OptimizedImage
  src="/images/photo.jpg"
  alt="图片描述"
  width={800}
  height={600}
  loading="lazy"
/>
```

---

## 性能优化

### 灯塔评分优化

- ✅ HTTPS 安全连接
- ✅ 图片 WebP 格式
- ✅ 懒加载图片
- ✅ CSS/JS 压缩
- ✅ HTML 预压缩
- ✅ 预连接关键资源

### 构建优化

```bash
# 构建并压缩
pnpm build && pnpm compress

# 优化图片
pnpm optimize
```

---

## 自定义主题

### 修改颜色

在 `src/config.ts` 中修改主题配置：

```typescript
export const THEME_CONFIG = {
  colors: {
    primary: '#3273dc',
    primaryDark: '#00f0ff',
    neonPink: '#ff00a0',
    neonYellow: '#f7ff00',
  },
};
```

### 修改布局

```typescript
export const THEME_CONFIG = {
  layout: {
    sidebarLeft: true,    // 显示左侧边栏
    sidebarRight: true,   // 显示右侧边栏
    profileSticky: false, // 个人资料不粘性
    tocSticky: true,      // 目录粘性
  },
};
```

---

## 常见问题

### 移动端菜单文字不显示

已在 v2.3 中修复，确保 `.navbar-menu.is-active .navbar-item span` 显示正确。

### 图片加载慢

- 使用 `OptimizedImage` 组件
- 启用懒加载
- 使用 WebP 格式

### 评论不显示

- 检查仓库配置
- 确保 Discussions 已启用
- 检查主题切换配置

---

## 更新日志

### v2.3 (2025-02-26)
- ✨ 新增智能日历组件（农历、节气、倒计时）
- ✨ 新增右键菜单功能
- ✨ 新增鼠标点击动效
- ✨ 新增图片自动优化
- ✨ 新增备案信息显示
- 🐛 修复移动端菜单文字不显示
- ⚡ 优化灯塔评分

### v2.2 (2025-02-22)
- ✨ 新增评论主题自适应
- ✨ 新增 Insight 搜索引擎
- 🐛 修复页眉透明效果
- 🐛 修复 pnpm-lock 不匹配

### v2.1 (2025-02-20)
- ✨ 初始版本发布
- ✨ 支持 8 种评论系统
- ✨ 支持多种搜索引擎
- ✨ 赛博朋克暗色模式

---

## 许可证

MIT License © 2024-2025 Xuzx-Ricky

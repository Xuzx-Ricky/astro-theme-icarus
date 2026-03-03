---
title: "主题配置完全指南"
description: "深入了解 Astro Icarus 主题的所有配置选项，包括站点设置、外观定制、功能开关等"
pubDatetime: 2025-02-27T01:00:00
modDatetime: 2025-02-27T01:00:00
category: "教程"
tags: ["配置", "主题", "定制"]
toc: true
comment: true
---

# 主题配置完全指南

Astro Icarus 主题提供了丰富的配置选项，让你可以根据自己的需求定制博客的各个方面。本指南将详细介绍所有配置项的作用和使用方法。

## 配置文件概述

主题的主要配置文件是 `src/config.ts`，它采用 TypeScript 编写，提供了完整的类型支持。配置文件分为多个部分，每个部分负责不同的功能模块。

## 站点配置

### SITE 配置

```typescript
export const SITE = {
  title: 'Astro Icarus',
  subtitle: '',
  description: '',
  url: 'https://astro-icarus.pages.dev',
  lang: 'zh-CN',
  favicon: '/favicon.svg',
  author: 'Your Name',
  startYear: 2024,
};
```

**title** - 网站标题，显示在浏览器标签页和导航栏

**subtitle** - 副标题，如果设置了 logo 则不显示

**description** - 网站描述，用于 SEO 和社交媒体分享

**url** - 网站完整域名，用于生成 RSS、Sitemap 等

**lang** - 网站语言代码，如 zh-CN、en-US

**favicon** - 网站图标路径

**author** - 默认作者名称

**startYear** - 建站年份，显示在页脚版权信息中

## 作者配置

### AUTHOR 配置

```typescript
export const AUTHOR = {
  name: 'Your Name',
  avatar: '/images/avatar/avatar.jpg',
  bio: 'A passionate blogger',
  location: 'Earth',
  email: 'your@email.com',
  github: '',
  twitter: '',
  weibo: '',
};
```

这些配置会显示在个人资料卡片中，让读者了解博客作者。

## 导航配置

### NAV_LINKS 配置

```typescript
export const NAV_LINKS = [
  { href: '/', label: '首页', icon: 'fa-home' },
  { href: '/archives', label: '归档', icon: 'fa-archive' },
  { href: '/categories', label: '分类', icon: 'fa-folder' },
  { href: '/tags', label: '标签', icon: 'fa-tags' },
  { href: '/about', label: '关于', icon: 'fa-user' },
];
```

每个导航项包含：
- **href** - 链接地址
- **label** - 显示文字
- **icon** - Font Awesome 图标类名

## 主题外观配置

### 颜色配置

主题使用 CSS 变量管理颜色，可以在 `BaseLayout.astro` 中修改：

```css
:root {
  --primary: #2563eb;
  --text: #374151;
  --bg: #f9fafb;
  --card-bg: #ffffff;
  /* ... */
}
```

### 暗色模式颜色

```css
[data-theme="dark"] {
  --primary: #00f0ff;
  --text: #e0e0e0;
  --bg: #0d1117;
  --card-bg: #161b22;
  /* ... */
}
```

## 功能模块配置

### 评论系统配置

```typescript
export const COMMENT_CONFIG = {
  enabled: true,
  provider: 'giscus',  // giscus, gitalk, valine, waline, twikoo, utterances, disqus, changyan
  giscus: {
    repo: 'your-username/your-repo',
    repoId: '...',
    category: 'Announcements',
    categoryId: '...',
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'top',
    lang: 'zh-CN',
  },
};
```

### 搜索配置

```typescript
export const SEARCH_CONFIG = {
  enabled: true,
  provider: 'fuse',  // fuse, algolia, baidu, insight
};
```

### 分享配置

```typescript
export const SHARE_CONFIG = {
  enabled: true,
  platforms: ['twitter', 'facebook', 'weibo', 'telegram'],
};
```

### 打赏配置

```typescript
export const DONATION_CONFIG = {
  enabled: true,
  alipay: '/images/donate/alipay.png',
  wechat: '/images/donate/wechat.png',
  paypal: 'https://paypal.me/username',
};
```

## 侧边栏配置

### 智能日历配置

```typescript
export const SMART_CALENDAR_CONFIG = {
  enabled: true,
  showLunar: true,
  showSolarTerms: true,
  showHolidays: true,
  events: [
    { date: '01-01', name: '元旦', type: 'holiday' },
    { date: '02-14', name: '情人节', type: 'festival' },
  ],
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

### 侧边栏部件配置

```typescript
export const SIDEBAR_WIDGETS_CONFIG = {
  left: ['profile', 'hitokoto', 'smartCalendar'],
  right: ['recentPosts', 'categories', 'archives', 'tags', 'friendLinks'],
  widgets: {
    profile: { enabled: true, sticky: false },
    hitokoto: { enabled: true, sticky: false },
    smartCalendar: { enabled: true, sticky: false },
    recentPosts: { enabled: true, limit: 5 },
    categories: { enabled: true, limit: 10 },
    archives: { enabled: true, limit: 12 },
    tags: { enabled: true, limit: 20, cloud: true },
    friendLinks: { enabled: true, limit: 10 },
    toc: { enabled: true, sticky: true },
  },
};
```

## 高级配置

### 性能优化配置

```typescript
export const PERFORMANCE_CONFIG = {
  precompressHtml: true,
  precompressImages: true,
  inlineCriticalCSS: true,
  deferNonCritical: true,
  preloadCritical: true,
};
```

### 图片优化配置

```typescript
export const IMAGE_CONFIG = {
  enabled: true,
  service: 'sharp',
  format: 'webp',
  quality: 80,
  placeholder: 'blur',
};
```

### 懒加载配置

```typescript
export const LAZY_LOAD_CONFIG = {
  enabled: true,
  placeholder: '/images/placeholder.svg',
  threshold: 0.1,
  rootMargin: '50px',
  allowClickBeforeLoad: true,
};
```

## 配置最佳实践

### 开发环境 vs 生产环境

可以使用环境变量来区分不同环境的配置：

```typescript
const isDev = import.meta.env.DEV;

export const ANALYTICS_CONFIG = {
  google: isDev ? '' : 'G-XXXXXXXXXX',
};
```

### 配置验证

主题会在启动时自动验证配置的有效性，如果发现无效配置，会在控制台输出警告信息。

### 配置热更新

在开发模式下，修改配置文件后会自动重新加载，无需重启服务器。

## 常见问题

### 配置不生效

1. 检查配置文件语法是否正确
2. 确保配置项名称拼写正确
3. 重启开发服务器

### 如何覆盖默认配置

在 `src/config.ts` 中修改对应的配置项即可覆盖默认值。

## 下一步

- 了解如何[创建和管理文章](/blog/03-content-management)
- 学习[自定义主题样式](/blog/04-customization)
- 配置[评论系统](/blog/05-comments)

---
title: "Astro Icarus 使用指南"
description: "本主题基于 Astro 构建，完美还原 Hexo Icarus 主题的经典三栏布局设计"
pubDatetime: 2024-06-15T10:00:00Z
tags: ["astro", "icarus", "tutorial"]
category: "教程"
thumbnail: "/images/posts/astro-guide.jpg"
toc: true
comment: true
---

## 简介

Astro Icarus 是一个基于 [Astro](https://astro.build) 构建的现代博客主题，完美还原了 Hexo Icarus 主题的经典三栏布局设计。同时，我们添加了赛博朋克2077风格的暗色模式，为你的博客带来未来科技感。

## 特性介绍

- **三栏响应式布局** - 经典左侧边栏 + 主内容 + 右侧边栏设计
- **赛博朋克2077暗色模式** - 霓虹青色和洋红色搭配，一键切换
- **多种评论系统** - 支持 Giscus、Gitalk、Valine、Waline、Twikoo、Utterances、Disqus、畅言云评
- **Pagefind 搜索** - 快速全文搜索，零运行时成本
- **文章目录 (TOC)** - 自动生成文章目录，支持滚动高亮
- **文章封面图** - 支持为每篇文章设置封面图和缩略图
- **响应式设计** - 完美适配桌面、平板和移动设备
- **RSS 订阅** - 自动生成 RSS Feed
- **字数统计** - 自动计算文章字数和阅读时间
- **一言小组件** - 每日随机显示一句名言

## 安装使用

### 使用 pnpm 安装（推荐）

```bash
# 克隆仓库
git clone https://github.com/Xuzx-Ricky/astro-icarus.git
cd astro-icarus

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 构建

```bash
pnpm build
```

## 配置说明

主题配置文件位于 `src/config.ts`，你可以修改以下配置：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `site.title` | 网站标题 | Astro Icarus |
| `site.description` | 网站描述 | - |
| `site.subtitle` | 网站副标题（显示在导航栏） | - |
| `author.name` | 作者名称 | - |
| `author.avatar` | 作者头像 | - |

## 评论系统配置

本主题支持8种评论系统，在 `src/config.ts` 中配置：

### Giscus（推荐）

```typescript
comment: {
  provider: 'giscus',
  giscus: {
    repo: 'your-username/your-repo',
    repoId: 'your-repo-id',
    category: 'Announcements',
    categoryId: 'your-category-id'
  }
}
```

### 畅言云评

```typescript
comment: {
  provider: 'changyan',
  changyan: {
    appid: 'your-app-id',
    conf: 'your-conf'
  }
}
```

## 搜索功能

主题使用 [Pagefind](https://pagefind.app) 提供全文搜索功能。构建时会自动生成搜索索引：

```bash
pnpm build
```

## 字数统计

文章字数和阅读时间会自动计算并显示在文章头部和列表中。

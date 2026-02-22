---
title: "部署到 GitHub Pages 指南"
description: "详细讲解如何将 Astro Icarus 主题博客部署到 GitHub Pages"
pubDatetime: 2024-06-10T10:00:00Z
tags: ["github", "deploy", "ci-cd"]
category: "部署"
thumbnail: "/images/posts/deploy-guide.jpg"
toc: true
comment: true
---

## 简介

GitHub Pages 是一个免费的静态网站托管服务，非常适合托管个人博客。本指南将详细讲解如何将 Astro Icarus 主题博客部署到 GitHub Pages。

## 创建仓库

首先，在 GitHub 上创建一个新的仓库。仓库名称可以是 `username.github.io`（这样可以直接通过 username.github.io 访问），或者任意名称（需要通过 username.github.io/repo-name 访问）。

```bash
# 克隆仓库到本地
git clone https://github.com/username/username.github.io.git
cd username.github.io
```

## GitHub Actions 配置

在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 仓库设置

在 GitHub 仓库设置中启用 Pages：

1. 进入仓库的 **Settings** 页面
2. 点击左侧的 **Pages** 选项
3. 在 **Build and deployment** 部分，选择 **GitHub Actions**
4. 保存设置

## 自定义域名

如果你有自己的域名，可以绑定到 GitHub Pages：

1. 在仓库的 `public` 目录下创建 `CNAME` 文件，内容为你的域名
2. 在你的域名 DNS 设置中添加 CNAME 记录，指向 `username.github.io`
3. 在 GitHub Pages 设置中填写你的自定义域名

```
# public/CNAME
blog.example.com
```

## 常见问题

### 构建失败

检查 GitHub Actions 日志，常见问题包括：

- 依赖安装失败 - 检查 package.json 是否正确
- 构建命令错误 - 确保 build 脚本正确
- 权限问题 - 检查 workflow 文件中的 permissions 配置

### 样式丢失

确保 astro.config.mjs 中的 base 配置正确：

```javascript
export default defineConfig({
  base: '/repo-name/',  // 如果不是 username.github.io 仓库
  // base: '/',         // 如果是 username.github.io 仓库
})
```

# Astro Icarus 主题 v2.1

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

- **Astro 5.x + TypeScript** - 最新技术栈
- **三栏响应式布局** - 经典 Icarus 设计
- **赛博朋克2077暗色模式** - 霓虹青色和洋红色
- **8种评论系统** - Giscus、Gitalk、Valine、Waline、Twikoo、Utterances、Disqus、**畅言云评**
- **多种搜索引擎** - Pagefind、Fuse.js、Algolia、百度、Insight
- **文章目录 (TOC)** - 粘性定位，滚动高亮
- **一言小组件** - 每日随机名言
- **分享功能** - Twitter、Facebook、LinkedIn、微博、Telegram、微信
- **打赏功能** - 支付宝、微信、PayPal
- **字数统计** - 文章列表和详情都显示
- **友情链接** - 圆角卡片设计
- **RSS 订阅** - 自动生成
- **图像优化** - Astro Assets + Sharp

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
```

---

## 创建新页面

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
  // ...
};
```

### 评论系统配置

```typescript
export const COMMENT_CONFIG = {
  provider: 'giscus',  // 可选: giscus, gitalk, valine, waline, twikoo, utterances, disqus, changyan
  // ...
};
```

### 搜索引擎配置

```typescript
export const SEARCH_CONFIG = {
  provider: 'pagefind',  // 可选: pagefind, fuse, algolia, baidu, insight
  // ...
};
```

### 打赏配置

```typescript
export const DONATION_CONFIG = {
  enabled: true,
  alipay: '/images/donate/alipay.png',   // 支付宝收款码
  wechat: '/images/donate/wechat.png',   // 微信收款码
  paypal: 'https://paypal.me/username',  // PayPal 链接
};
```

---

## 许可证

MIT

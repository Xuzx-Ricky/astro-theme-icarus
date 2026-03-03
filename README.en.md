# Astro Icarus Theme v2.3

<p align="center">
  <img src="public/favicon.svg" width="80" height="80" alt="Astro Icarus Logo">
</p>

<p align="center">
  A modern blog theme built with Astro 5.x, faithfully recreating the classic Hexo Icarus design
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

## Features

### Core Features
- **Astro 5.x + TypeScript** - Latest tech stack
- **Three-column Responsive Layout** - Classic Icarus design
- **Cyberpunk 2077 Dark Mode** - Neon cyan and magenta accents
- **Automatic Image Optimization** - Auto-compress and convert to WebP during build
- **Lazy Loading Images** - Click to view before fully loaded

### Interactive Features
- **Smart Calendar** - Lunar calendar, solar terms, holidays, and countdown
- **Right-click Menu** - Custom context menu with copy, search, and reading mode
- **Click Effects** - Ripple effects and double-click hearts
- **Glassmorphism** - Frosted glass effects on navbar and cards

### Comments & Search
- **8 Comment Systems** - Giscus, Gitalk, Valine, Waline, Twikoo, Utterances, Disqus, Changyan
- **Multiple Search Engines** - Fuse.js, Algolia, Baidu, Insight
- **Adaptive Comment Theme** - Auto-switch between light/dark themes

### Other Features
- **Table of Contents (TOC)** - Sticky positioning with scroll highlight
- **Hitokoto Widget** - Daily random quotes without repetition
- **Share Functionality** - Twitter, Facebook, LinkedIn, Weibo, WeChat
- **Donation Support** - Alipay, WeChat Pay, PayPal
- **Friend Links** - Rounded card design
- **RSS Feed** - Auto-generated
- **ICP Filing** - Convenient ICP filing information display

---

## Quick Start

### Install pnpm

```bash
# Using npm
npm install -g pnpm

# Or using Homebrew (macOS)
brew install pnpm

# Or using Scoop (Windows)
scoop install pnpm
```

### Create Project

```bash
# Clone repository
git clone https://github.com/Xuzx-Ricky/astro-icarus.git my-blog
cd my-blog

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Common Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm new:page <name>  # Create new page
pnpm new:post         # Create new post (interactive)
pnpm compress         # Compress HTML files
pnpm optimize         # Optimize images
```

---

## Creating Content

### Create New Post

```bash
# Interactive post creation
pnpm new:post

# Manual creation
# Create .md files in src/content/blog/ directory
```

### Create New Page

```bash
# Create friends link page
pnpm new:page friends --title="Friend Links" --icon="fa-link"

# Create project showcase page (no sidebar)
pnpm new:page projects --title="My Projects" --sidebar=false

# Create about page (no comments)
pnpm new:page about --title="About Me" --comments=false
```

---

## Deploy to Cloudflare Pages

### Method 1: Git Integration

1. Push code to GitHub/GitLab repository
2. Login to [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Go to Pages > Create Project
4. Connect your Git repository
5. Build settings:
   - Framework preset: `Astro`
   - Build command: `pnpm build`
   - Build output directory: `dist`
6. Click Save and Deploy

### Method 2: Direct Upload

```bash
# Build project
pnpm build

# Compress HTML (optional)
pnpm compress

# Upload dist folder to Cloudflare Pages
```

---

## Configuration

### Site Configuration (`src/config.ts`)

```typescript
export const SITE = {
  title: 'Astro Icarus',
  subtitle: '',           // Text displayed in navbar
  description: '',        // Site description
  url: 'https://astro-icarus.pages.dev',
  lang: 'en',
  favicon: '/favicon.svg',
  author: 'Your Name',
  startYear: 2024,
};
```

### Comment System Configuration

```typescript
export const COMMENT_CONFIG = {
  provider: 'giscus',  // Options: giscus, gitalk, valine, waline, twikoo, utterances, disqus, changyan
  giscus: {
    repo: 'your-username/your-repo',
    repoId: '...',
    category: 'Announcements',
    categoryId: '...',
    // Auto theme switching
    theme: 'preferred_color_scheme',
  },
};
```

### Search Configuration

```typescript
export const SEARCH_CONFIG = {
  provider: 'insight',  // Options: insight, fuse, algolia, baidu
  enabled: true,
};
```

### Smart Calendar Configuration

```typescript
export const SMART_CALENDAR_CONFIG = {
  enabled: true,
  showLunar: true,        // Show lunar calendar
  showSolarTerms: true,   // Show solar terms
  showHolidays: true,     // Show holidays
  countdowns: [
    {
      id: 'newyear',
      title: 'New Year Countdown',
      targetDate: '2026-01-01T00:00:00',
      icon: 'fa-glass-cheers',
    },
  ],
};
```

### Right-click Menu Configuration

```typescript
export const RIGHT_MENU_CONFIG = {
  enabled: true,
  items: {
    navigation: true,   // Navigation buttons
    copyPaste: true,    // Copy and paste
    search: true,       // Search functionality
    themeToggle: true,  // Theme toggle
    readMode: true,     // Reading mode
  },
  searchEngines: [
    { name: 'Google', url: 'https://www.google.com/search?q=', icon: 'fa-google' },
    { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: 'fa-search' },
  ],
};
```

### ICP Filing Configuration

```typescript
export const ICP_CONFIG = {
  enabled: true,
  number: 'YOUR-ICP-NUMBER',
  url: 'https://beian.miit.gov.cn/',
};
```

### Image Optimization Configuration

```typescript
export const IMAGE_CONFIG = {
  enabled: true,
  service: 'sharp',      // Image processing service
  format: 'webp',        // Output format
  quality: 80,           // Image quality
  placeholder: 'blur',   // Placeholder type
};
```

---

## Image Optimization

### Automatic Optimization

Images are automatically optimized during build:
- Convert to WebP format
- Compress image size
- Generate responsive images

### Using Optimized Image Component

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
---

<OptimizedImage
  src="/images/photo.jpg"
  alt="Image description"
  width={800}
  height={600}
  loading="lazy"
/>
```

---

## Performance Optimization

### Lighthouse Score Optimization

- ✅ HTTPS secure connection
- ✅ WebP image format
- ✅ Lazy loading images
- ✅ CSS/JS minification
- ✅ HTML pre-compression
- ✅ Preconnect critical resources

### Build Optimization

```bash
# Build and compress
pnpm build && pnpm compress

# Optimize images
pnpm optimize
```

---

## Customization

### Modifying Colors

Modify theme configuration in `src/config.ts`:

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

### Modifying Layout

```typescript
export const THEME_CONFIG = {
  layout: {
    sidebarLeft: true,    // Show left sidebar
    sidebarRight: true,   // Show right sidebar
    profileSticky: false, // Profile not sticky
    tocSticky: true,      // TOC sticky
  },
};
```

---

## FAQ

### Mobile menu text not displaying

Fixed in v2.3, ensure `.navbar-menu.is-active .navbar-item span` displays correctly.

### Slow image loading

- Use `OptimizedImage` component
- Enable lazy loading
- Use WebP format

### Comments not displaying

- Check repository configuration
- Ensure Discussions is enabled
- Check theme switching configuration

---

## Changelog

### v2.3 (2025-02-26)
- ✨ Added Smart Calendar component (lunar, solar terms, countdown)
- ✨ Added right-click menu functionality
- ✨ Added mouse click effects
- ✨ Added automatic image optimization
- ✨ Added ICP filing display
- 🐛 Fixed mobile menu text not displaying
- ⚡ Optimized Lighthouse score

### v2.2 (2025-02-22)
- ✨ Added adaptive comment theme
- ✨ Added Insight search engine
- 🐛 Fixed header transparency effect
- 🐛 Fixed pnpm-lock mismatch

### v2.1 (2025-02-20)
- ✨ Initial release
- ✨ Support for 8 comment systems
- ✨ Support for multiple search engines
- ✨ Cyberpunk dark mode

---

## License

MIT License © 2024-2025 Xuzx-Ricky
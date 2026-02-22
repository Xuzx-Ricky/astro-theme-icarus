import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  // Cloudflare Pages 站点配置
  site: 'https://astro-icarus.pages.dev',
  base: '/',
  
  // 输出模式
  output: 'static',
  
  // 集成
  integrations: [
    mdx(),
    sitemap(),
    pagefind(),
  ],
  
  // Markdown 配置
  markdown: {
    shikiConfig: {
      // 支持多种主题，根据系统偏好自动切换
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  
  // 图像优化配置
  image: {
    // Cloudflare 不支持 sharp runtime，使用 compile 模式在构建时优化
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    // 允许优化的图像域名
    domains: [],
    // 远程图像模式
    remotePatterns: [
      { protocol: 'https' },
    ],
  },
  
  // Vite 配置
  vite: {
    build: {
      rollupOptions: {
        external: [],
      },
    },
    ssr: {
      noExternal: [],
    },
  },
  
  // 构建配置
  build: {
    format: 'directory',
    // 内联小型资源
    assetsInlineLimit: 4096,
  },
  
  // 开发服务器配置
  server: {
    port: 4321,
    host: true,
  },
  
  // 预获取配置（性能优化）
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});

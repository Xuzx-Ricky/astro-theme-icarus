import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-icarus.pages.dev',
  base: '/',
  output: 'static',
  
  integrations: [
    mdx(),
    sitemap(),
  ],
  
  markdown: {
    shikiConfig: {
      // 自适应主题：根据系统偏好自动切换
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  
  // 图片优化配置 - 自动压缩并转WebP
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
        // Sharp 优化选项
        avif: {
          quality: 80,
          effort: 4,
        },
        webp: {
          quality: 80,
          effort: 6,
        },
        jpeg: {
          quality: 80,
          progressive: true,
        },
        png: {
          quality: 80,
          compressionLevel: 9,
        },
      },
    },
    domains: [],
    remotePatterns: [{ protocol: 'https' }],
    // 默认输出格式为 WebP
    format: 'webp',
  },
  
  vite: {
    build: {
      rollupOptions: {
        external: [],
        output: {
          // 代码分割优化
          manualChunks: {
            'vendor': ['fuse.js'],
          },
        },
      },
      // CSS 优化
      cssMinify: true,
      // JS 优化
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    // 资源优化
    assetsInclude: ['**/*.webp', '**/*.avif'],
  },
  
  build: {
    format: 'directory',
    assetsInlineLimit: 4096,
    // 分块策略
    chunkSizeWarningLimit: 1000,
  },
  
  server: {
    port: 4321,
    host: true,
  },
  
  // 预获取优化
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});

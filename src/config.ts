// ============================================
// Astro Icarus 主题配置
// ============================================

// 站点配置
export const SITE = {
  title: 'Astro Icarus',
  subtitle: '', // 导航栏显示的文字，为空则显示 SITE.title
  description: '基于 Astro 构建的 Icarus 主题博客，支持赛博朋克2077暗色模式',
  url: 'https://astro-icarus.pages.dev',
  lang: 'zh-CN',
  favicon: '/favicon.svg',
  logo: '/favicon.svg', // 导航栏 Logo，为空则显示文字
  author: 'Xuzx-Ricky',
  ogImage: '/images/og-image.jpg',
  startYear: 2024,
};

// 作者配置
export const AUTHOR = {
  name: 'Xuzx-Ricky',
  avatar: '/images/avatar/avatar.jpg',
  bio: 'Web Developer & Blogger',
  location: 'China',
  email: 'xuzx@example.com',
  github: 'https://github.com/Xuzx-Ricky',
  twitter: '',
  weibo: '',
};

// 导航链接
export const NAV_LINKS = [
  { href: '/', label: '首页', icon: 'fa-home' },
  { href: '/archives', label: '归档', icon: 'fa-archive' },
  { href: '/categories', label: '分类', icon: 'fa-folder' },
  { href: '/tags', label: '标签', icon: 'fa-tags' },
  { href: '/about', label: '关于', icon: 'fa-user' },
];

// ============================================
// 评论系统配置 - 支持8种评论系统
// ============================================
export const COMMENT_CONFIG = {
  // 可选: 'giscus', 'gitalk', 'valine', 'waline', 'twikoo', 'utterances', 'disqus', 'changyan'
  provider: 'giscus' as 'giscus' | 'gitalk' | 'valine' | 'waline' | 'twikoo' | 'utterances' | 'disqus' | 'changyan',
  
  // Giscus 配置
  giscus: {
    repo: 'Xuzx-Ricky/Xuzx-Ricky.github.io',
    repoId: 'R_kgDOHhJ8jA',
    category: 'Announcements',
    categoryId: 'DIC_kwDOHhJ8jM4ChOJe',
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'bottom',
    lang: 'zh-CN',
  },
  
  // Gitalk 配置
  gitalk: {
    clientID: '',
    clientSecret: '',
    repo: '',
    owner: '',
    admin: [],
  },
  
  // Valine 配置
  valine: {
    appId: '',
    appKey: '',
    placeholder: '请输入评论...',
    avatar: 'mp',
    meta: ['nick', 'mail', 'link'],
    pageSize: 10,
    lang: 'zh-cn',
  },
  
  // Waline 配置
  waline: {
    serverURL: '',
    placeholder: '请输入评论...',
    avatar: 'mp',
    meta: ['nick', 'mail', 'link'],
    pageSize: 10,
    lang: 'zh-CN',
  },
  
  // Twikoo 配置
  twikoo: {
    envId: '',
    region: 'ap-shanghai',
    path: 'window.location.pathname',
    lang: 'zh-cn',
  },
  
  // Utterances 配置
  utterances: {
    repo: '',
    issueTerm: 'pathname',
    label: 'comment',
    theme: 'github-light',
  },
  
  // Disqus 配置
  disqus: {
    shortname: '',
  },
  
  // 畅言云评配置
  changyan: {
    appid: '',
    conf: '',
  },
};

// ============================================
// 搜索配置 - 支持多种搜索引擎
// ============================================
export const SEARCH_CONFIG = {
  enabled: false,
  // 可选: 'pagefind', 'fuse', 'algolia', 'baidu', 'insight'
  provider: 'pagefind' as 'pagefind' | 'fuse' | 'algolia' | 'baidu' | 'insight',
  
  // Algolia 配置
  algolia: {
    appId: '',
    apiKey: '',
    indexName: '',
  },
  
  // Fuse.js 配置
  fuse: {
    threshold: 0.3,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title', 'content'],
  },
  
  // 百度站内搜索
  baidu: {
    siteUrl: '',
  },
};

// ============================================
// 分享配置
// ============================================
export const SHARE_CONFIG = {
  enabled: true,
  // 可选分享平台
  platforms: ['twitter', 'facebook', 'linkedin', 'weibo', 'wechat', 'copy'] as string[],
};

// ============================================
// 打赏配置
// ============================================
export const DONATION_CONFIG = {
  enabled: false,
  // 支付宝收款码图片
  alipay: '',
  // 微信收款码图片
  wechat: '',
  // PayPal 链接
  paypal: '',
};

// ============================================
// CDN 配置
// ============================================
export const CDN_CONFIG = {
  provider: 'local' as 'local' | 'jsdelivr' | 'unpkg' | 'cdnjs',
  jsdelivr: 'https://cdn.jsdelivr.net/npm/',
  unpkg: 'https://unpkg.com/',
  cdnjs: 'https://cdnjs.cloudflare.com/ajax/libs/',
};

// ============================================
// 缓存配置
// ============================================
export const CACHE_CONFIG = {
  enabled: true,
  maxAge: 86400,
};

// ============================================
// 分析配置
// ============================================
export const ANALYTICS_CONFIG = {
  // 卜算子统计
  busuanzi: true,
  // Google Analytics
  google: '',
  // 百度统计
  baidu: '',
  // Cloudflare Analytics
  cloudflare: '',
};

// ============================================
// 页脚配置
// ============================================
export const FOOTER_CONFIG = {
  logo: {
    text: '', // 为空则使用 SITE.title
    image: '', // 图片路径
  },
  copyright: '',
  links: {
    'GitHub': { url: 'https://github.com/Xuzx-Ricky', icon: 'fab fa-github' },
    'RSS': { url: '/rss.xml', icon: 'fas fa-rss' },
  },
};

// ============================================
// 一言配置
// ============================================
export const HITOKOTO_CONFIG = {
  enabled: true,
  // 句子类型: a=动画, b=漫画, c=游戏, d=文学, e=原创, f=网络, g=其他, h=影视, i=诗词, j=网易云, k=哲学
  types: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
  // 最大长度限制
  maxLength: 50,
};

// ============================================
// 友情链接
// ============================================
export const FRIEND_LINKS = [
  { name: 'Astro', url: 'https://astro.build', avatar: '' },
  { name: 'Bulma', url: 'https://bulma.io', avatar: '' },
];

// ============================================
// 国际化配置
// ============================================
export const I18N = {
  // 默认语言
  defaultLocale: 'zh-CN',
  // 支持的语言
  locales: ['zh-CN', 'en'],
  // 语言名称
  labels: {
    'zh-CN': '简体中文',
    'en': 'English',
  },
};

// ============================================
// 图像优化配置
// ============================================
export const IMAGE_CONFIG = {
  // 是否启用图像优化
  enabled: true,
  // 图像服务: 'sharp', 'squoosh', 'passthrough'
  service: 'sharp' as 'sharp' | 'squoosh' | 'passthrough',
  // 默认图像格式
  format: 'webp' as 'webp' | 'avif' | 'jpeg' | 'png',
  // 默认质量
  quality: 80,
  // 占位符
  placeholder: 'blur' as 'blur' | 'dominantColor' | 'none',
};

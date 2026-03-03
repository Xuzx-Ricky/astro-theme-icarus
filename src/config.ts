// ============================================
// Astro Icarus 主题配置 - Flexible Theme Configuration
// ============================================

// 站点配置
export const SITE = {
  title: 'Astro Icarus',
  subtitle: '',
  description: '基于 Astro 构建的 Icarus 主题博客，支持赛博朋克2077暗色模式',
  url: 'https://astro-icarus.pages.dev',
  lang: 'zh-CN',
  favicon: '/favicon.svg',
  logo: '/favicon.svg',
  author: 'Xuzx-Ricky',
  ogImage: '/images/og-image.jpg',
  startYear: 2024,
};

// 作者配置 - 请修改为您的个人信息
export const AUTHOR = {
  name: 'Your Name',           // 您的名字
  avatar: '/images/avatar/avatar.jpg',  // 头像路径
  bio: 'A passionate blogger', // 个人简介
  location: 'Earth',           // 所在地
  email: 'your@email.com',     // 邮箱
  github: '',                  // GitHub 链接
  twitter: '',                 // Twitter 链接
  weibo: '',                   // 微博链接
};

// 导航链接
export const NAV_LINKS = [
  { href: '/', label: '首页', icon: 'fa-home' },
  { href: '/archives', label: '归档', icon: 'fa-archive' },
  { href: '/categories', label: '分类', icon: 'fa-folder' },
  { href: '/tags', label: '标签', icon: 'fa-tags' },
  { href: '/thinking', label: '思考', icon: 'fa-lightbulb' },
  { href: '/about', label: '关于', icon: 'fa-user' },
];

// ============================================
// 主题样式配置 - Flexible Theme Configuration
// ============================================
export const THEME_CONFIG = {
  // 颜色配置
  colors: {
    primary: '#3273dc',
    primaryDark: '#00f0ff',
    neonPink: '#ff00a0',
    neonYellow: '#f7ff00',
  },
  // 布局配置
  layout: {
    sidebarLeft: true,
    sidebarRight: true,
    profileSticky: false,
    tocSticky: true,
  },
  // 字体配置
  fonts: {
    body: 'Ubuntu, Roboto, -apple-system, sans-serif',
    code: 'SF Mono, Fira Code, Consolas, monospace',
  },
};

// ============================================
// 分页配置
// ============================================
export const PAGINATION_CONFIG = {
  enabled: true,
  perPage: 10,
  midSize: 2,
  endSize: 1,
  prevText: '上一页',
  nextText: '下一页',
};

// ============================================
// 评论系统配置
// ============================================
export const COMMENT_CONFIG = {
  provider: 'giscus' as const,
  giscus: {
    repo: 'Xuzx-Ricky/astro-theme-icarus',
    repoId: 'R_kgDORSzTAw',
    category: 'Announcements',
    categoryId: 'DIC_kwDORSzTA84C291X',
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'top',
    lang: 'zh-CN',
    // 主题将通过 JS 动态切换，支持自适应
    theme: 'preferred_color_scheme',
  },
  gitalk: { clientID: '', clientSecret: '', repo: '', owner: '', admin: [] },
  valine: { appId: '', appKey: '', placeholder: '请输入评论...', avatar: 'mp', meta: ['nick', 'mail', 'link'], pageSize: 10, lang: 'zh-cn' },
  waline: { serverURL: '', placeholder: '请输入评论...', avatar: 'mp', meta: ['nick', 'mail', 'link'], pageSize: 10, lang: 'zh-CN' },
  twikoo: { envId: '', region: 'ap-shanghai', path: 'window.location.pathname', lang: 'zh-cn' },
  utterances: { repo: '', issueTerm: 'pathname', label: 'comment', theme: 'preferred_color_scheme' },
  disqus: { shortname: '' },
  changyan: { appid: '', conf: '' },
};

// ============================================
// 搜索配置 - insight 为默认
// ============================================
export const SEARCH_CONFIG = {
  enabled: true,
  provider: 'insight' as 'insight' | 'fuse' | 'algolia' | 'baidu',
  insight: {
    // Insight 搜索本地索引
    indexUrl: '/search.json',
  },
  algolia: { appId: '', apiKey: '', indexName: '' },
  fuse: { threshold: 0.3, distance: 100, keys: ['title', 'content'] },
  baidu: { siteUrl: '' },
};

// ============================================
// 分享配置
// ============================================
export const SHARE_CONFIG = {
  enabled: true,
  platforms: ['twitter', 'facebook', 'linkedin', 'weibo', 'wechat', 'copy'] as string[],
};

// ============================================
// 打赏配置
// ============================================
export const DONATION_CONFIG = {
  enabled: false,
  alipay: '',
  wechat: '',
  paypal: '',
};

// ============================================
// 计时器配置
// ============================================
export const COUNTDOWN_CONFIG = {
  enabled: true,
  timers: [
    {
      id: 'newyear',
      title: '新年倒计时',
      targetDate: '2025-01-01T00:00:00',
      icon: 'fa-glass-cheers',
    },
    {
      id: 'birthday',
      title: '生日倒计时',
      targetDate: '2025-06-15T00:00:00',
      icon: 'fa-birthday-cake',
    },
  ],
};

// ============================================
// 订阅配置
// ============================================
export const SUBSCRIBE_CONFIG = {
  enabled: true,
  // follow.it 配置
  followit: {
    enabled: true,
    id: '', // follow.it 网站 ID
  },
  // RSS 配置
  rss: {
    enabled: true,
    fullText: true,
  },
};

// ============================================
// 一言配置
// ============================================
export const HITOKOTO_CONFIG = {
  enabled: true,
  types: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
  maxLength: 50,
  // 本地缓存，避免重复
  cacheKey: 'hitokoto_cache',
  cacheExpiry: 3600000, // 1小时
};

// ============================================
// CDN 配置
// ============================================
export const CDN_CONFIG = {
  provider: 'jsdelivr' as 'local' | 'jsdelivr' | 'unpkg' | 'cdnjs',
  jsdelivr: 'https://cdn.jsdelivr.net/npm/',
  unpkg: 'https://unpkg.com/',
  cdnjs: 'https://cdnjs.cloudflare.com/ajax/libs/',
};

// ============================================
// 分析配置
// ============================================
export const ANALYTICS_CONFIG = {
  busuanzi: true,
  google: '',
  baidu: '',
  cloudflare: '',
};

// ============================================
// 页脚配置
// ============================================
export const FOOTER_CONFIG = {
  logo: { text: '', image: '' },
  copyright: '',
  links: {
    'GitHub': { url: 'https://github.com/Xuzx-Ricky', icon: 'fab fa-github' },
    'RSS': { url: '/rss.xml', icon: 'fas fa-rss' },
  },
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
  defaultLocale: 'zh-CN',
  locales: ['zh-CN', 'en'],
  labels: {
    'zh-CN': '简体中文',
    'en': 'English',
  },
};

// ============================================
// 图像优化配置
// ============================================
export const IMAGE_CONFIG = {
  enabled: true,
  service: 'sharp' as 'sharp' | 'squoosh' | 'passthrough',
  format: 'webp' as 'webp' | 'avif' | 'jpeg' | 'png',
  quality: 80,
  placeholder: 'blur' as 'blur' | 'dominantColor' | 'none',
};

// ============================================
// 智能日历配置
// ============================================
// 自动获取下一个新年时间
const getNextNewYear = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  return `${nextYear}-01-01T00:00:00`;
};

export const SMART_CALENDAR_CONFIG = {
  enabled: true,
  // 显示农历
  showLunar: true,
  // 显示节气
  showSolarTerms: true,
  // 显示节假日
  showHolidays: true,
  // 自定义事件
  events: [
    { date: '01-01', name: '元旦', type: 'holiday' },
    { date: '02-14', name: '情人节', type: 'festival' },
    { date: '05-01', name: '劳动节', type: 'holiday' },
    { date: '06-01', name: '儿童节', type: 'festival' },
    { date: '10-01', name: '国庆节', type: 'holiday' },
    { date: '12-25', name: '圣诞节', type: 'festival' },
  ],
  // 倒计时事件 - 新年自动计算
  countdowns: [
    {
      id: 'newyear',
      title: '新年倒计时',
      targetDate: getNextNewYear(),
      icon: 'fa-glass-cheers',
    },
    // 可以添加更多自定义倒计时
    // {
    //   id: 'birthday',
    //   title: '生日倒计时',
    //   targetDate: '2025-06-15T00:00:00',
    //   icon: 'fa-birthday-cake',
    // },
  ],
};

// ============================================
// 右键菜单配置
// ============================================
export const RIGHT_MENU_CONFIG = {
  enabled: true,
  // 菜单项配置
  items: {
    // 导航
    navigation: true,
    // 复制粘贴
    copyPaste: true,
    // 搜索
    search: true,
    // 主题切换
    themeToggle: true,
    // 阅读模式
    readMode: true,
    // 图片操作
    imageActions: true,
    // 链接操作
    linkActions: true,
  },
  // 搜索引擎
  searchEngines: [
    { name: '百度', url: 'https://www.baidu.com/s?wd=', icon: 'fa-search' },
    { name: '必应', url: 'https://cn.bing.com/search?q=', icon: 'fa-search' },
    { name: 'Google', url: 'https://www.google.com/search?q=', icon: 'fa-google' },
  ],
};

// ============================================
// 自定义鼠标样式配置
// ============================================
export const CURSOR_CONFIG = {
  enabled: true,
  // 自定义光标图片 (空则使用默认)
  cursorUrl: '',
  // 点击动效
  clickEffect: true,
  // 点击动效颜色
  clickEffectColor: 'var(--primary)',
  // 跟随效果
  trailEffect: false,
  //  trail颜色
  trailColor: 'var(--primary)',
};

// ============================================
// AI 功能配置
// ============================================
export const AI_CONFIG = {
  enabled: false,
  // AI 提供商
  provider: 'openai' as 'openai' | 'anthropic' | 'custom',
  // API 配置
  apiKey: '',
  apiUrl: '',
  model: 'gpt-3.5-turbo',
  // 功能开关
  features: {
    // 文章摘要
    summary: true,
    // 文章翻译
    translation: true,
    // 智能推荐
    recommendation: true,
    // 聊天对话
    chat: false,
  },
  // 摘要配置
  summary: {
    maxLength: 200,
    autoGenerate: false,
  },
};

// ============================================
// 备案信息配置
// ============================================
export const ICP_CONFIG = {
  enabled: false,
  // 备案号
  number: '',
  // 备案链接
  url: 'https://beian.miit.gov.cn/',
  // 公安备案
  police: {
    enabled: false,
    number: '',
    url: 'https://www.beian.gov.cn/',
  },
};

// ============================================
// 侧边栏部件配置 - 易于自定义
// ============================================
export const SIDEBAR_WIDGETS_CONFIG = {
  // 左侧边栏部件顺序
  left: ['profile', 'hitokoto', 'smartCalendar'],
  // 右侧边栏部件顺序
  right: ['recentPosts', 'categories', 'archives', 'tags', 'friendLinks'],
  // 部件配置
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

// ============================================
// 懒加载配置
// ============================================
export const LAZY_LOAD_CONFIG = {
  enabled: true,
  // 占位符
  placeholder: '/images/placeholder.svg',
  // 阈值
  threshold: 0.1,
  // 根边距
  rootMargin: '50px',
  // 图片未加载时允许点击
  allowClickBeforeLoad: true,
};

// ============================================
// 性能优化配置
// ============================================
export const PERFORMANCE_CONFIG = {
  // 预压缩 HTML
  precompressHtml: true,
  // 预压缩图片
  precompressImages: true,
  // 内联关键 CSS
  inlineCriticalCSS: true,
  // 延迟加载非关键资源
  deferNonCritical: true,
  // 预加载关键资源
  preloadCritical: true,
};

// ============================================
// 文章配置
// ============================================
export const POST_CONFIG = {
  // 默认布局: 'two-column' | 'three-column'
  defaultLayout: 'three-column' as 'two-column' | 'three-column',
  // 默认显示评论
  defaultShowComments: true,
  // 默认显示目录
  defaultShowToc: true,
  // 默认显示分享
  defaultShowShare: true,
  // 默认显示打赏
  defaultShowDonation: false,
  // 置顶文章排序权重
  stickyWeight: 1000,
};

// ============================================
// 代码块配置
// ============================================
export const CODE_BLOCK_CONFIG = {
  // 显示复制按钮
  showCopyButton: true,
  // 显示折叠按钮
  showCollapseButton: true,
  // 默认折叠行数 (0表示不自动折叠)
  collapseThreshold: 20,
  // 显示行号
  showLineNumbers: true,
  // 主题跟随系统
  themeFollowSystem: true,
  // 亮色主题
  lightTheme: 'github-light',
  // 暗色主题
  darkTheme: 'github-dark',
};

// ============================================
// 数学公式配置
// ============================================
export const MATH_CONFIG = {
  // 启用数学公式渲染
  enabled: true,
  // 渲染引擎: 'katex' | 'mathjax'
  engine: 'katex' as 'katex' | 'mathjax',
  // 行内公式分隔符
  inlineDelimiters: ['$', '$'],
  // 块级公式分隔符
  blockDelimiters: ['$$', '$$'],
  // 抛出错误
  throwOnError: false,
  // 严格模式
  strict: false,
};

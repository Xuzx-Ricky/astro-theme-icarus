# v2.3 更新记录

## 新增功能

### 1. 智能日历组件
- 替代原有的倒计时组件
- 显示当前日期、星期、农历
- 显示节气和节假日
- 支持倒计时功能
- 毛玻璃效果设计

### 2. 右键菜单功能
- 自定义浏览器右键菜单
- 支持导航（前进、后退、刷新、回到顶部）
- 支持复制粘贴文本
- 支持链接操作（复制链接、新窗口打开）
- 支持图片操作（复制图片、下载图片）
- 支持搜索选中文本（百度、必应、Google）
- 支持主题切换和阅读模式
- Toast 提示反馈

### 3. 鼠标点击动效
- 点击波纹效果
- 双击爱心效果
- 可配置的轨迹效果
- 暗色模式适配

### 4. 图片自动优化
- 构建时自动压缩图片
- 自动转换为 WebP 格式
- 懒加载支持
- 未加载完成也可点击查看
- OptimizedImage 组件

### 5. 备案信息显示
- 便捷的 ICP 备案配置
- 支持公安备案
- 页脚自动显示

### 6. 性能优化
- HTML 预压缩脚本
- 图片优化脚本
- CSS/JS 压缩
- 关键资源预加载

## 修复内容

### 1. 修复移动端菜单文字不显示
- 修复 `.navbar-menu.is-active .navbar-item span` 样式
- 确保移动端下拉菜单正确显示文字

### 2. 优化灯塔评分
- 图片 WebP 格式
- 懒加载优化
- CSS/JS 压缩
- HTML 预压缩

## 文件变更

### 新增的文件
1. `src/components/SmartCalendar.astro` - 智能日历组件
2. `src/components/RightMenu.astro` - 右键菜单组件
3. `src/components/ClickEffect.astro` - 点击动效组件
4. `src/components/OptimizedImage.astro` - 优化图片组件
5. `scripts/compress.js` - HTML 压缩脚本
6. `scripts/optimize-images.js` - 图片优化脚本
7. `scripts/create-post.js` - 创建文章脚本
8. `README.en.md` - 英文文档

### 修改的文件
1. `package.json` - 更新版本号和脚本
2. `astro.config.mjs` - 添加图片优化配置
3. `src/config.ts` - 添加新配置项
4. `src/layouts/BaseLayout.astro` - 添加右键菜单和点击动效
5. `src/pages/index.astro` - 使用智能日历
6. `src/components/Navbar.astro` - 修复移动端样式
7. `src/components/Footer.astro` - 添加备案信息
8. `src/components/ArticleCard.astro` - 使用优化图片
9. `README.md` - 更新文档
10. `.gitignore` - 添加忽略规则

## 配置更新

### 新增配置项

```typescript
// 智能日历
export const SMART_CALENDAR_CONFIG = {
  enabled: true,
  showLunar: true,
  showSolarTerms: true,
  showHolidays: true,
  countdowns: [...],
};

// 右键菜单
export const RIGHT_MENU_CONFIG = {
  enabled: true,
  items: { ... },
  searchEngines: [...],
};

// 鼠标动效
export const CURSOR_CONFIG = {
  enabled: true,
  clickEffect: true,
  trailEffect: false,
};

// 备案信息
export const ICP_CONFIG = {
  enabled: false,
  number: '',
  url: 'https://beian.miit.gov.cn/',
};
```

## 测试建议

1. 运行 `pnpm install` 安装依赖
2. 运行 `pnpm dev` 启动开发服务器
3. 测试右键菜单功能
4. 测试点击动效
5. 测试智能日历
6. 测试图片懒加载
7. 在移动端测试菜单
8. 运行 `pnpm build` 构建项目
9. 运行 `pnpm compress` 压缩 HTML

---

# v2.2 修复记录

## 修复内容

### 1. 修复 pnpm-lock.yaml 不匹配问题
- 创建了新的 pnpm-lock.yaml 文件
- 更新了 GitHub Actions 工作流

### 2. 更新 Giscus 配置
- 更新了仓库配置
- 支持主题自适应切换

### 3. 修复页眉透明效果
- 添加 CSS 变量
- 毛玻璃效果

## 文件变更

### 修改的文件
1. `src/config.ts`
2. `src/components/Comments.astro`
3. `src/components/Navbar.astro`
4. `src/layouts/BaseLayout.astro`
5. `src/pages/search.astro`

### 新增的文件
1. `pnpm-lock.yaml`
2. `CHANGES.md`

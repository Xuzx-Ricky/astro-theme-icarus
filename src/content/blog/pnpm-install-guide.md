---
title: "pnpm 安装使用指南"
description: "详细介绍如何安装和使用 pnpm 包管理器，以及 pnpm 相比 npm/yarn 的优势"
pubDatetime: 2024-06-20T10:00:00Z
tags: ["pnpm", "nodejs", "tutorial"]
category: "教程"
thumbnail: "/images/posts/pnpm-guide.jpg"
toc: true
comment: true
---

## 什么是 pnpm

pnpm 是一个快速、节省磁盘空间的 Node.js 包管理器。它与 npm 和 yarn 类似，但具有独特的优势：

- **节省磁盘空间**：使用硬链接和符号链接，避免重复存储相同的包
- **安装速度快**：并行下载和安装，比 npm 快 2-3 倍
- **严格的依赖管理**：防止访问未声明的依赖
- **支持 monorepo**：内置 workspace 支持

## 安装 pnpm

### 使用 npm 安装（推荐）

```bash
npm install -g pnpm
```

### 使用 Homebrew（macOS）

```bash
brew install pnpm
```

### 使用 Scoop（Windows）

```powershell
scoop install pnpm
```

### 使用 curl（Linux/macOS）

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 验证安装

```bash
pnpm --version
```

## 基本使用

### 安装依赖

```bash
# 安装 package.json 中的所有依赖
pnpm install

# 简写
pnpm i
```

### 添加依赖

```bash
# 添加生产依赖
pnpm add <package-name>

# 添加开发依赖
pnpm add -D <package-name>

# 添加全局依赖
pnpm add -g <package-name>

# 添加指定版本
pnpm add <package-name>@^1.0.0
```

### 移除依赖

```bash
pnpm remove <package-name>
# 或
pnpm rm <package-name>
```

### 更新依赖

```bash
# 更新所有依赖
pnpm update

# 更新指定依赖
pnpm update <package-name>
```

### 运行脚本

```bash
# 运行 package.json 中的脚本
pnpm run <script-name>

# 简写（适用于大部分脚本）
pnpm <script-name>

# 例如
pnpm dev
pnpm build
pnpm test
```

## 常用命令对比

| 操作 | npm | yarn | pnpm |
|------|-----|------|------|
| 安装依赖 | `npm install` | `yarn` | `pnpm install` |
| 添加依赖 | `npm i <pkg>` | `yarn add <pkg>` | `pnpm add <pkg>` |
| 添加开发依赖 | `npm i -D <pkg>` | `yarn add -D <pkg>` | `pnpm add -D <pkg>` |
| 移除依赖 | `npm rm <pkg>` | `yarn remove <pkg>` | `pnpm rm <pkg>` |
| 运行脚本 | `npm run dev` | `yarn dev` | `pnpm dev` |
| 全局安装 | `npm i -g <pkg>` | `yarn global add <pkg>` | `pnpm add -g <pkg>` |

## 配置镜像源

### 查看当前源

```bash
pnpm config get registry
```

### 设置为淘宝镜像

```bash
pnpm config set registry https://registry.npmmirror.com
```

### 恢复官方源

```bash
pnpm config set registry https://registry.npmjs.org
```

### 临时使用指定源

```bash
pnpm install --registry https://registry.npmmirror.com
```

## 高级特性

### Store 管理

pnpm 使用全局 store 来存储所有包：

```bash
# 查看 store 位置
pnpm store path

# 清理未引用的包
pnpm store prune
```

### Workspace（Monorepo）

```bash
# 初始化 workspace
pnpm init

# 在 workspace 中添加依赖
pnpm add <package-name> --filter <workspace-name>

# 运行 workspace 脚本
pnpm --filter <workspace-name> dev
```

### 钩子脚本

在 `.pnpmfile.cjs` 中配置：

```javascript
module.exports = {
  hooks: {
    readPackage(pkg) {
      // 修改包的依赖
      return pkg;
    }
  }
};
```

## 迁移项目到 pnpm

### 从 npm 迁移

```bash
# 1. 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 2. 使用 pnpm 安装
pnpm install

# 3. 生成 pnpm-lock.yaml
# 完成！
```

### 从 yarn 迁移

```bash
# 1. 删除 node_modules 和 yarn.lock
rm -rf node_modules yarn.lock

# 2. 使用 pnpm 安装
pnpm install

# 3. 生成 pnpm-lock.yaml
# 完成！
```

## 常见问题

### 权限问题

如果在全局安装时遇到权限问题：

```bash
# 使用 npx 临时运行
npx pnpm <command>

# 或使用 corepack（Node.js 16.13+）
corepack enable
corepack prepare pnpm@latest --activate
```

### 与 npm/yarn 混用

建议不要混用，但如果必须：

```bash
# 使用 pnpm 的 shamefully-hoist 模式
pnpm install --shamefully-hoist
```

### 内存不足

```bash
# 增加 Node.js 内存限制
NODE_OPTIONS="--max-old-space-size=4096" pnpm install
```

## 最佳实践

1. **统一版本**：团队使用相同版本的 pnpm
2. **锁定文件**：提交 `pnpm-lock.yaml` 到版本控制
3. **CI/CD**：使用 `pnpm install --frozen-lockfile`
4. **缓存**：在 CI 中缓存 `~/.local/share/pnpm/store`

## 总结

pnpm 是一个现代化的包管理器，它解决了 npm 和 yarn 的一些固有问题。如果你关心磁盘空间和安装速度，强烈推荐切换到 pnpm！

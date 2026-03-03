<template>
  <el-container class="layout">
    <el-aside width="240px" class="sidebar">
      <div class="logo">
        <el-icon :size="32" color="#2563eb"><Management /></el-icon>
        <span class="logo-text">Astro Icarus</span>
      </div>
      
      <el-menu
        :default-active="$route.path"
        router
        class="menu"
        background-color="transparent"
        text-color="#666"
        active-text-color="#2563eb"
      >
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <span>控制台</span>
        </el-menu-item>
        
        <el-menu-item index="/posts">
          <el-icon><Document /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        
        <el-menu-item index="/config">
          <el-icon><Setting /></el-icon>
          <span>主题配置</span>
        </el-menu-item>
        
        <el-menu-item index="/settings">
          <el-icon><Tools /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
        
        <el-menu-item index="/deploy">
          <el-icon><Promotion /></el-icon>
          <span>部署发布</span>
        </el-menu-item>
      </el-menu>
      
      <div class="project-info">
        <el-divider />
        <div class="project-name">{{ projectStore.projectName }}</div>
        <el-button type="danger" text size="small" @click="switchProject">
          切换项目
        </el-button>
      </div>
    </el-aside>
    
    <el-main class="main">
      <slot />
    </el-main>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useProjectStore } from '../stores/project';

const router = useRouter();
const projectStore = useProjectStore();

function switchProject() {
  projectStore.clearProject();
  router.push('/');
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.sidebar {
  background: #fff;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.menu {
  flex: 1;
  border-right: none;
  padding: 16px 0;
}

.menu .el-menu-item {
  height: 48px;
  line-height: 48px;
  margin: 4px 12px;
  border-radius: 8px;
}

.menu .el-menu-item.is-active {
  background: #e0e7ff;
}

.project-info {
  padding: 16px 24px;
}

.project-name {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  word-break: break-all;
}

.main {
  background: #f5f7fa;
  padding: 0;
  overflow-y: auto;
}
</style>

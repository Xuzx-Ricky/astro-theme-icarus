<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="logo">
        <el-icon :size="64" color="#2563eb"><Management /></el-icon>
      </div>
      <h1 class="title">Astro Icarus Admin</h1>
      <p class="subtitle">图形化管理你的 Astro Icarus 博客</p>
      
      <div class="actions">
        <el-button 
          type="primary" 
          size="large" 
          @click="selectProject"
          :loading="loading"
        >
          <el-icon><FolderOpened /></el-icon>
          选择项目目录
        </el-button>
        
        <el-button 
          v-if="projectStore.hasProject"
          type="success" 
          size="large" 
          @click="goToDashboard"
        >
          <el-icon><HomeFilled /></el-icon>
          进入控制台
        </el-button>
      </div>
      
      <div v-if="projectStore.hasProject" class="recent-project">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最近打开的项目</span>
              <el-button type="danger" text @click="clearProject">
                清除
              </el-button>
            </div>
          </template>
          <div class="project-info">
            <el-icon><Folder /></el-icon>
            <span class="project-name">{{ projectStore.projectName }}</span>
            <span class="project-path">{{ projectStore.projectPath }}</span>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="features-section">
      <h2 class="section-title">功能特性</h2>
      <div class="features-grid">
        <div class="feature-card">
          <el-icon :size="32" color="#2563eb"><Document /></el-icon>
          <h3>文章管理</h3>
          <p>创建、编辑、删除文章，支持 Markdown 实时预览</p>
        </div>
        <div class="feature-card">
          <el-icon :size="32" color="#10b981"><Setting /></el-icon>
          <h3>配置编辑</h3>
          <p>可视化编辑主题配置，无需手动修改代码</p>
        </div>
        <div class="feature-card">
          <el-icon :size="32" color="#f59e0b"><Monitor /></el-icon>
          <h3>开发服务器</h3>
          <p>一键启动开发服务器，实时预览修改效果</p>
        </div>
        <div class="feature-card">
          <el-icon :size="32" color="#8b5cf6"><Promotion /></el-icon>
          <h3>一键部署</h3>
          <p>构建项目并部署到 Cloudflare Pages</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useProjectStore } from '../stores/project';

const router = useRouter();
const projectStore = useProjectStore();
const loading = ref(false);

async function selectProject() {
  loading.value = true;
  try {
    const path = await window.electronAPI.selectProject();
    if (path) {
      const name = path.split(/[\\/]/).pop();
      projectStore.setProject(path, name);
      ElMessage.success('项目已选择');
      router.push('/dashboard');
    }
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loading.value = false;
  }
}

function goToDashboard() {
  router.push('/dashboard');
}

function clearProject() {
  projectStore.clearProject();
  ElMessage.success('已清除');
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.hero-section {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

.logo {
  margin-bottom: 24px;
}

.title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
}

.actions .el-button {
  padding: 16px 32px;
  font-size: 16px;
}

.recent-project {
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.project-name {
  font-weight: 600;
  color: #333;
}

.project-path {
  color: #999;
  font-size: 14px;
}

.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  color: white;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  font-size: 20px;
  margin: 16px 0 12px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}
</style>

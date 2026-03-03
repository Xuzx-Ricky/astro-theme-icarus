<template>
  <Layout>
    <div class="settings-page">
      <div class="page-header">
        <h1 class="page-title">系统设置</h1>
      </div>
      
      <el-card>
        <template #header>
          <span>项目信息</span>
        </template>
        <div class="info-item">
          <span class="label">项目名称：</span>
          <span>{{ projectStore.projectName }}</span>
        </div>
        <div class="info-item">
          <span class="label">项目路径：</span>
          <span>{{ projectStore.projectPath }}</span>
        </div>
      </el-card>
      
      <el-card class="mt-4">
        <template #header>
          <span>快捷操作</span>
        </template>
        <div class="actions">
          <el-button type="primary" @click="openInEditor">
            <el-icon><FolderOpened /></el-icon>
            在编辑器中打开
          </el-button>
          <el-button type="danger" @click="clearProject">
            <el-icon><Switch /></el-icon>
            切换项目
          </el-button>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useProjectStore } from '../stores/project';
import Layout from '../components/Layout.vue';

const router = useRouter();
const projectStore = useProjectStore();

function openInEditor() {
  window.electronAPI.openExternal(`file://${projectStore.projectPath}`);
}

function clearProject() {
  projectStore.clearProject();
  ElMessage.success('已清除项目');
  router.push('/');
}
</script>

<style scoped>
.settings-page {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.info-item {
  margin-bottom: 12px;
}

.label {
  font-weight: 600;
  color: #666;
}

.mt-4 {
  margin-top: 16px;
}

.actions {
  display: flex;
  gap: 12px;
}
</style>

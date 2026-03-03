<template>
  <Layout>
    <div class="config-page">
      <div class="page-header">
        <h1 class="page-title">主题配置</h1>
        <el-button type="primary" :loading="saving" @click="save">
          <el-icon><Check /></el-icon>
          保存配置
        </el-button>
      </div>
      
      <el-card v-loading="loading">
        <el-alert
          title="直接编辑配置文件"
          description="请在下方编辑器中修改配置，保存后将立即生效。"
          type="info"
          show-icon
          :closable="false"
          class="mb-4"
        />
        
        <textarea
          v-model="configContent"
          class="config-editor"
          placeholder="配置文件内容..."
        />
      </el-card>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useProjectStore } from '../stores/project';
import Layout from '../components/Layout.vue';

const projectStore = useProjectStore();

const configContent = ref('');
const loading = ref(false);
const saving = ref(false);

onMounted(async () => {
  await loadConfig();
});

async function loadConfig() {
  loading.value = true;
  try {
    configContent.value = await window.electronAPI.readConfig(projectStore.projectPath);
  } catch (error) {
    ElMessage.error('加载配置失败: ' + error.message);
  } finally {
    loading.value = false;
  }
}

async function save() {
  saving.value = true;
  try {
    await window.electronAPI.saveConfig(projectStore.projectPath, configContent.value);
    ElMessage.success('配置已保存');
  } catch (error) {
    ElMessage.error('保存失败: ' + error.message);
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.config-page {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.mb-4 {
  margin-bottom: 16px;
}

.config-editor {
  width: 100%;
  height: 600px;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  outline: none;
}

.config-editor:focus {
  border-color: #2563eb;
}
</style>

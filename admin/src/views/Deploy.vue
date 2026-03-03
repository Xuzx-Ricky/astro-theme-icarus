<template>
  <Layout>
    <div class="deploy-page">
      <div class="page-header">
        <h1 class="page-title">部署发布</h1>
      </div>
      
      <el-card>
        <template #header>
          <span>构建项目</span>
        </template>
        
        <div class="deploy-actions">
          <el-button 
            type="primary" 
            size="large" 
            :loading="building" 
            @click="build"
          >
            <el-icon><Box /></el-icon>
            开始构建
          </el-button>
        </div>
        
        <div v-if="buildOutput" class="build-output">
          <h4>构建日志：</h4>
          <pre>{{ buildOutput }}</pre>
        </div>
      </el-card>
      
      <el-card class="mt-4">
        <template #header>
          <span>部署指南</span>
        </template>
        
        <div class="deploy-guide">
          <h4>部署到 Cloudflare Pages</h4>
          <ol>
            <li>构建完成后，<code>dist</code> 目录将包含所有静态文件</li>
            <li>登录 <a href="https://dash.cloudflare.com" target="_blank">Cloudflare Dashboard</a></li>
            <li>进入 Pages → 创建项目</li>
            <li>连接你的 GitHub 仓库或上传 dist 文件夹</li>
            <li>等待部署完成</li>
          </ol>
          
          <h4>部署到 Vercel</h4>
          <ol>
            <li>安装 Vercel CLI: <code>npm i -g vercel</code></li>
            <li>在项目目录运行: <code>vercel --prod</code></li>
          </ol>
          
          <h4>部署到 Netlify</h4>
          <ol>
            <li>将 dist 文件夹拖拽到 <a href="https://app.netlify.com/drop" target="_blank">Netlify Drop</a></li>
            <li>或安装 Netlify CLI: <code>npm i -g netlify-cli</code></li>
            <li>运行: <code>netlify deploy --prod --dir=dist</code></li>
          </ol>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useProjectStore } from '../stores/project';
import Layout from '../components/Layout.vue';

const projectStore = useProjectStore();

const building = ref(false);
const buildOutput = ref('');

async function build() {
  building.value = true;
  buildOutput.value = '';
  
  try {
    const result = await window.electronAPI.buildProject(projectStore.projectPath);
    buildOutput.value = result.output;
    ElMessage.success('构建成功');
  } catch (error) {
    ElMessage.error('构建失败: ' + error.message);
  } finally {
    building.value = false;
  }
}
</script>

<style scoped>
.deploy-page {
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

.deploy-actions {
  margin-bottom: 24px;
}

.build-output {
  background: #1a1a2e;
  color: #00ff00;
  padding: 16px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  max-height: 400px;
  overflow-y: auto;
}

.build-output pre {
  margin: 0;
  white-space: pre-wrap;
}

.mt-4 {
  margin-top: 16px;
}

.deploy-guide {
  line-height: 1.8;
}

.deploy-guide h4 {
  margin-top: 24px;
  margin-bottom: 12px;
  color: #333;
}

.deploy-guide ol {
  padding-left: 24px;
}

.deploy-guide li {
  margin-bottom: 8px;
}

.deploy-guide code {
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

.deploy-guide a {
  color: #2563eb;
}
</style>

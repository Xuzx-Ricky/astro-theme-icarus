<template>
  <Layout>
    <div class="dashboard">
      <h1 class="page-title">控制台</h1>
      
      <div class="stats-grid">
        <el-card class="stat-card">
          <div class="stat-icon" style="background: #e0e7ff;">
            <el-icon :size="32" color="#4f46e5"><Document /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.posts }}</div>
            <div class="stat-label">文章总数</div>
          </div>
        </el-card>
        
        <el-card class="stat-card">
          <div class="stat-icon" style="background: #d1fae5;">
            <el-icon :size="32" color="#10b981"><Folder /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.categories }}</div>
            <div class="stat-label">分类数量</div>
          </div>
        </el-card>
        
        <el-card class="stat-card">
          <div class="stat-icon" style="background: #fef3c7;">
            <el-icon :size="32" color="#f59e0b"><CollectionTag /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.tags }}</div>
            <div class="stat-label">标签数量</div>
          </div>
        </el-card>
        
        <el-card class="stat-card">
          <div class="stat-icon" style="background: #fce7f3;">
            <el-icon :size="32" color="#ec4899"><Star /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.sticky }}</div>
            <div class="stat-label">置顶文章</div>
          </div>
        </el-card>
      </div>
      
      <div class="quick-actions">
        <h2 class="section-title">快速操作</h2>
        <div class="actions-grid">
          <el-button type="primary" size="large" @click="goTo('/posts/edit')">
            <el-icon><Plus /></el-icon>
            新建文章
          </el-button>
          <el-button type="success" size="large" @click="goTo('/posts')">
            <el-icon><Document /></el-icon>
            管理文章
          </el-button>
          <el-button type="warning" size="large" @click="goTo('/config')">
            <el-icon><Setting /></el-icon>
            编辑配置
          </el-button>
          <el-button type="info" size="large" @click="startDevServer">
            <el-icon><VideoPlay /></el-icon>
            启动服务
          </el-button>
        </div>
      </div>
      
      <div class="recent-posts">
        <h2 class="section-title">最近文章</h2>
        <el-table :data="recentPosts" v-loading="loading">
          <el-table-column prop="title" label="标题" min-width="200">
            <template #default="{ row }">
              <div class="post-title">
                <el-tag v-if="row.sticky" type="danger" size="small" effect="dark">置顶</el-tag>
                <span>{{ row.title }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="category" label="分类" width="120" />
          <el-table-column prop="pubDatetime" label="发布时间" width="180">
            <template #default="{ row }">
              {{ formatDate(row.pubDatetime) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" text @click="editPost(row.slug)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useProjectStore } from '../stores/project';
import Layout from '../components/Layout.vue';

const router = useRouter();
const projectStore = useProjectStore();

const stats = ref({
  posts: 0,
  categories: 0,
  tags: 0,
  sticky: 0,
});

const recentPosts = ref([]);
const loading = ref(false);

onMounted(async () => {
  await loadPosts();
});

async function loadPosts() {
  loading.value = true;
  try {
    const posts = await window.electronAPI.getPosts(projectStore.projectPath);
    
    // 统计数据
    const categories = new Set(posts.map(p => p.category));
    const allTags = posts.flatMap(p => p.tags || []);
    const uniqueTags = new Set(allTags);
    const stickyPosts = posts.filter(p => p.sticky);
    
    stats.value = {
      posts: posts.length,
      categories: categories.size,
      tags: uniqueTags.size,
      sticky: stickyPosts.length,
    };
    
    // 最近5篇文章
    recentPosts.value = posts.slice(0, 5);
  } catch (error) {
    ElMessage.error('加载文章失败: ' + error.message);
  } finally {
    loading.value = false;
  }
}

function goTo(path) {
  router.push(path);
}

function editPost(slug) {
  router.push(`/posts/edit/${slug}`);
}

async function startDevServer() {
  try {
    ElMessage.info('正在启动开发服务器...');
    await window.electronAPI.startDevServer(projectStore.projectPath);
    ElMessage.success('开发服务器已启动');
  } catch (error) {
    ElMessage.error('启动失败: ' + error.message);
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
</script>

<style scoped>
.dashboard {
  padding: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.quick-actions {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.actions-grid .el-button {
  padding: 16px 24px;
  font-size: 16px;
}

.post-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

<template>
  <Layout>
    <div class="posts-page">
      <div class="page-header">
        <h1 class="page-title">文章管理</h1>
        <el-button type="primary" @click="createPost">
          <el-icon><Plus /></el-icon>
          新建文章
        </el-button>
      </div>
      
      <el-card>
        <el-table :data="posts" v-loading="loading" stripe>
          <el-table-column type="selection" width="55" />
          
          <el-table-column label="标题" min-width="250">
            <template #default="{ row }">
              <div class="post-title-cell">
                <el-tag v-if="row.sticky" type="danger" size="small" effect="dark" class="mr-2">置顶</el-tag>
                <el-tag v-if="row.hidden" type="info" size="small" class="mr-2">隐藏</el-tag>
                <span class="title-text">{{ row.title }}</span>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="category" label="分类" width="120">
            <template #default="{ row }">
              <el-tag type="success" effect="plain">{{ row.category }}</el-tag>
            </template>
          </el-table-column>
          
          <el-table-column label="标签" min-width="150">
            <template #default="{ row }">
              <el-tag 
                v-for="tag in (row.tags || []).slice(0, 3)" 
                :key="tag"
                size="small"
                class="mr-1"
              >
                {{ tag }}
              </el-tag>
              <span v-if="(row.tags || []).length > 3" class="text-gray-400">+{{ row.tags.length - 3 }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="发布时间" width="160">
            <template #default="{ row }">
              {{ formatDate(row.pubDatetime) }}
            </template>
          </el-table-column>
          
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" text @click="editPost(row.slug)">编辑</el-button>
              <el-button type="danger" text @click="deletePost(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="total"
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useProjectStore } from '../stores/project';
import Layout from '../components/Layout.vue';

const router = useRouter();
const projectStore = useProjectStore();

const allPosts = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);

const total = computed(() => allPosts.value.length);

const posts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return allPosts.value.slice(start, end);
});

onMounted(async () => {
  await loadPosts();
});

async function loadPosts() {
  loading.value = true;
  try {
    allPosts.value = await window.electronAPI.getPosts(projectStore.projectPath);
  } catch (error) {
    ElMessage.error('加载文章失败: ' + error.message);
  } finally {
    loading.value = false;
  }
}

function createPost() {
  router.push('/posts/edit');
}

function editPost(slug) {
  router.push(`/posts/edit/${slug}`);
}

async function deletePost(post) {
  try {
    await ElMessageBox.confirm(
      `确定要删除文章 "${post.title}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    
    await window.electronAPI.deletePost(projectStore.projectPath, post.slug);
    ElMessage.success('删除成功');
    await loadPosts();
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败: ' + error.message);
    }
  }
}

function handleSizeChange(val) {
  pageSize.value = val;
}

function handleCurrentChange(val) {
  currentPage.value = val;
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
.posts-page {
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

.post-title-cell {
  display: flex;
  align-items: center;
}

.title-text {
  font-weight: 500;
}

.mr-1 {
  margin-right: 4px;
}

.mr-2 {
  margin-right: 8px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}
</style>

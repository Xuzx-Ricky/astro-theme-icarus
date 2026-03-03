<template>
  <Layout>
    <div class="editor-page">
      <div class="page-header">
        <div class="header-left">
          <el-button text @click="goBack">
            <el-icon><ArrowLeft /></el-icon>
            返回
          </el-button>
          <h1 class="page-title">{{ isEdit ? '编辑文章' : '新建文章' }}</h1>
        </div>
        <div class="header-right">
          <el-button @click="preview">预览</el-button>
          <el-button type="primary" :loading="saving" @click="save">
            <el-icon><Check /></el-icon>
            保存
          </el-button>
        </div>
      </div>
      
      <div class="editor-container">
        <div class="form-section">
          <el-card>
            <el-form :model="form" label-position="top">
              <el-form-item label="标题">
                <el-input v-model="form.title" placeholder="输入文章标题" />
              </el-form-item>
              
              <el-form-item label="描述">
                <el-input 
                  v-model="form.description" 
                  type="textarea" 
                  :rows="2"
                  placeholder="输入文章描述"
                />
              </el-form-item>
              
              <div class="form-row">
                <el-form-item label="分类" class="flex-1">
                  <el-input v-model="form.category" placeholder="输入分类" />
                </el-form-item>
                
                <el-form-item label="标签" class="flex-1">
                  <el-select
                    v-model="form.tags"
                    multiple
                    filterable
                    allow-create
                    placeholder="输入标签"
                    style="width: 100%"
                  />
                </el-form-item>
              </div>
              
              <div class="form-row">
                <el-form-item label="发布时间" class="flex-1">
                  <el-date-picker
                    v-model="form.pubDatetime"
                    type="datetime"
                    placeholder="选择发布时间"
                    style="width: 100%"
                  />
                </el-form-item>
                
                <el-form-item label="封面图" class="flex-1">
                  <el-input v-model="form.thumbnail" placeholder="输入封面图路径" />
                </el-form-item>
              </div>
              
              <el-form-item label="选项">
                <el-checkbox v-model="form.toc">显示目录</el-checkbox>
                <el-checkbox v-model="form.comment">开启评论</el-checkbox>
                <el-checkbox v-model="form.sticky">置顶文章</el-checkbox>
                <el-checkbox v-model="form.hidden">隐藏文章</el-checkbox>
                <el-checkbox v-model="form.showShare">显示分享</el-checkbox>
                <el-checkbox v-model="form.showDonation">显示打赏</el-checkbox>
              </el-form-item>
              
              <el-form-item label="布局">
                <el-radio-group v-model="form.layout">
                  <el-radio-button label="three-column">三栏</el-radio-button>
                  <el-radio-button label="two-column">两栏</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        
        <div class="editor-section">
          <el-card>
            <div class="editor-tabs">
              <div 
                class="tab" 
                :class="{ active: activeTab === 'edit' }"
                @click="activeTab = 'edit'"
              >
                编辑
              </div>
              <div 
                class="tab" 
                :class="{ active: activeTab === 'preview' }"
                @click="activeTab = 'preview'"
              >
                预览
              </div>
            </div>
            
            <div class="editor-content">
              <textarea
                v-show="activeTab === 'edit'"
                v-model="form.content"
                class="markdown-editor"
                placeholder="在此输入 Markdown 内容..."
              />
              <div
                v-show="activeTab === 'preview'"
                class="markdown-preview"
                v-html="renderedContent"
              />
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useProjectStore } from '../stores/project';
import MarkdownIt from 'markdown-it';
import Layout from '../components/Layout.vue';

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const isEdit = computed(() => !!route.params.slug);
const activeTab = ref('edit');
const saving = ref(false);

const form = ref({
  title: '',
  description: '',
  category: '',
  tags: [],
  pubDatetime: new Date(),
  thumbnail: '',
  toc: true,
  comment: true,
  sticky: false,
  hidden: false,
  layout: 'three-column',
  showShare: true,
  showDonation: false,
  content: '',
});

const renderedContent = computed(() => {
  return md.render(form.value.content);
});

onMounted(async () => {
  if (isEdit.value) {
    await loadPost();
  } else {
    // 新建文章，设置默认内容
    form.value.content = `# 新文章标题\n\n开始撰写你的文章...\n`;
  }
});

async function loadPost() {
  try {
    const content = await window.electronAPI.readPost(
      projectStore.projectPath,
      route.params.slug
    );
    
    // 解析 frontmatter 和内容
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (frontmatterMatch) {
      const yaml = await import('js-yaml');
      const data = yaml.load(frontmatterMatch[1]);
      form.value = {
        ...form.value,
        ...data,
        content: frontmatterMatch[2].trim(),
      };
    }
  } catch (error) {
    ElMessage.error('加载文章失败: ' + error.message);
  }
}

async function save() {
  if (!form.value.title) {
    ElMessage.warning('请输入文章标题');
    return;
  }
  
  if (!form.value.category) {
    ElMessage.warning('请输入分类');
    return;
  }
  
  saving.value = true;
  try {
    const yaml = await import('js-yaml');
    
    const frontmatter = {
      title: form.value.title,
      description: form.value.description,
      pubDatetime: form.value.pubDatetime,
      modDatetime: new Date().toISOString(),
      category: form.value.category,
      tags: form.value.tags,
      thumbnail: form.value.thumbnail,
      toc: form.value.toc,
      comment: form.value.comment,
      sticky: form.value.sticky,
      hidden: form.value.hidden,
      layout: form.value.layout,
      showShare: form.value.showShare,
      showDonation: form.value.showDonation,
    };
    
    const content = `---\n${yaml.dump(frontmatter)}---\n\n${form.value.content}`;
    
    if (isEdit.value) {
      await window.electronAPI.savePost(
        projectStore.projectPath,
        route.params.slug,
        content
      );
    } else {
      const result = await window.electronAPI.createPost(
        projectStore.projectPath,
        {
          title: form.value.title,
          description: form.value.description,
          category: form.value.category,
          tags: form.value.tags,
        }
      );
      // 保存内容到新创建的文件
      await window.electronAPI.savePost(
        projectStore.projectPath,
        result.slug,
        content
      );
    }
    
    ElMessage.success('保存成功');
    router.push('/posts');
  } catch (error) {
    ElMessage.error('保存失败: ' + error.message);
  } finally {
    saving.value = false;
  }
}

function goBack() {
  router.push('/posts');
}

function preview() {
  // 在新窗口打开预览
  const blob = new Blob([renderedContent.value], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
</script>

<style scoped>
.editor-page {
  padding: 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.header-right {
  display: flex;
  gap: 12px;
}

.editor-container {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
  flex: 1;
  min-height: 0;
}

.form-section {
  overflow-y: auto;
}

.form-row {
  display: flex;
  gap: 16px;
}

.flex-1 {
  flex: 1;
}

.editor-section {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.editor-section .el-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor-tabs {
  display: flex;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 16px;
}

.tab {
  padding: 12px 24px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab:hover {
  color: #2563eb;
}

.tab.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
}

.editor-content {
  flex: 1;
  min-height: 0;
}

.markdown-editor {
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  outline: none;
}

.markdown-editor:focus {
  border-color: #2563eb;
}

.markdown-preview {
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
}

.markdown-preview :deep(h1),
.markdown-preview :deep(h2),
.markdown-preview :deep(h3) {
  margin-top: 24px;
  margin-bottom: 16px;
}

.markdown-preview :deep(p) {
  margin-bottom: 16px;
  line-height: 1.8;
}

.markdown-preview :deep(code) {
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

.markdown-preview :deep(pre) {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}
</style>

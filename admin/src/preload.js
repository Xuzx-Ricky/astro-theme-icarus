const { contextBridge, ipcRenderer } = require('electron');

// 暴露 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 项目操作
  selectProject: () => ipcRenderer.invoke('select-project'),
  
  // 配置操作
  readConfig: (projectPath) => ipcRenderer.invoke('read-config', projectPath),
  saveConfig: (projectPath, content) => ipcRenderer.invoke('save-config', projectPath, content),
  
  // 文章操作
  getPosts: (projectPath) => ipcRenderer.invoke('get-posts', projectPath),
  readPost: (projectPath, slug) => ipcRenderer.invoke('read-post', projectPath, slug),
  savePost: (projectPath, slug, content) => ipcRenderer.invoke('save-post', projectPath, slug, content),
  createPost: (projectPath, data) => ipcRenderer.invoke('create-post', projectPath, data),
  deletePost: (projectPath, slug) => ipcRenderer.invoke('delete-post', projectPath, slug),
  
  // 服务器操作
  startDevServer: (projectPath) => ipcRenderer.invoke('start-dev-server', projectPath),
  buildProject: (projectPath) => ipcRenderer.invoke('build-project', projectPath),
  
  // 其他
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  watchFiles: (projectPath) => ipcRenderer.invoke('watch-files', projectPath),
  
  // 监听文件变化
  onFileChanged: (callback) => ipcRenderer.on('file-changed', (event, filename) => callback(filename)),
});

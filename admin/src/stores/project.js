import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProjectStore = defineStore('project', () => {
  // State
  const projectPath = ref(localStorage.getItem('projectPath') || '');
  const projectName = ref(localStorage.getItem('projectName') || '');
  const isLoading = ref(false);
  const error = ref(null);
  
  // Getters
  const hasProject = computed(() => !!projectPath.value);
  
  // Actions
  function setProject(path, name) {
    projectPath.value = path;
    projectName.value = name;
    localStorage.setItem('projectPath', path);
    localStorage.setItem('projectName', name);
  }
  
  function clearProject() {
    projectPath.value = '';
    projectName.value = '';
    localStorage.removeItem('projectPath');
    localStorage.removeItem('projectName');
  }
  
  function setLoading(value) {
    isLoading.value = value;
  }
  
  function setError(msg) {
    error.value = msg;
  }
  
  function clearError() {
    error.value = null;
  }
  
  return {
    projectPath,
    projectName,
    isLoading,
    error,
    hasProject,
    setProject,
    clearProject,
    setLoading,
    setError,
    clearError,
  };
});

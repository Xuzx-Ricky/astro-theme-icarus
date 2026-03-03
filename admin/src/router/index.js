import { createRouter, createWebHistory } from 'vue-router';
import { useProjectStore } from '../stores/project';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresProject: true },
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/Posts.vue'),
    meta: { requiresProject: true },
  },
  {
    path: '/posts/edit/:slug?',
    name: 'PostEditor',
    component: () => import('../views/PostEditor.vue'),
    meta: { requiresProject: true },
  },
  {
    path: '/config',
    name: 'Config',
    component: () => import('../views/Config.vue'),
    meta: { requiresProject: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { requiresProject: true },
  },
  {
    path: '/deploy',
    name: 'Deploy',
    component: () => import('../views/Deploy.vue'),
    meta: { requiresProject: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const projectStore = useProjectStore();
  
  if (to.meta.requiresProject && !projectStore.projectPath) {
    next('/');
  } else {
    next();
  }
});

export default router;

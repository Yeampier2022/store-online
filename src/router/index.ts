import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/authStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/modules/auth/components/LoginForm.vue'),
      meta: { requiresAuth: false }
    },
    // {
    //   path: '/dashboard',
    //   component: () => import('@/views/Dashboard.vue'),
    //   meta: { requiresAuth: true }
    // }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
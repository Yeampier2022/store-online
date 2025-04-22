import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/modules/auth/store/authStore";
import MainLayout from "@/layouts/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/pages/Home.vue"),
          
        },
        {
          path: "/login",
          name: "Login",
          component: () => import("@/pages/LoginForm.vue"),
          meta: { hideLayout: true },
        },
        {
          path: "/register",
          name: "Registrar",
          component: () => import("@/pages/RegisterForm.vue"),
          meta: { hideLayout: true },
        },
        {
          path: "/products",
          name: "Productos",
          component: () => import("@/pages/Product.vue"),
          meta: { hideLayout: true },
        },
        // Otras rutas...
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && authStore.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;

import { useGlobalStore } from '@/stores/globalStore'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { navbar: false },
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { navbar: false },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { requiresAuth: true, navbar: true },
    component: () => import('@/views/AdminView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const globalStore = useGlobalStore()

  if (to.meta.requiresAuth && !globalStore.isAuthenticated) {
    return next({ path: '/login' })
  }

  if (to.name === 'login' && globalStore.isAuthenticated) {
    return next({ path: '/admin' })
  }

  next()
})

export default router

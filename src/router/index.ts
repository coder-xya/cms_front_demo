import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { firstMenu } from '@/utils/map-meuns';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  //影射关系：path=>component
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue'),
    },
  ],
});

//路由守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN);
  if (!token && to.path.startsWith('/main')) {
    return '/login';
  }
  if (token && to.path === '/main') {
    return firstMenu?.path;
  }
});

export default router;

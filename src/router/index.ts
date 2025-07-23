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
      component: () => import('../views/login/login.vue'),
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue'),
    },
  ],
});

//路由守卫

export default router;

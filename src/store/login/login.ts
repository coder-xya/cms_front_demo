import { defineStore } from 'pinia';

import type { IAccount } from '@/types';
import { localCache } from '@/utils/cache';
import router from '@/router';
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants';
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId,
} from '@/service/login/login';
import { mapMenusToRouts } from '@/utils/map-meuns';

interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account);
      const id = loginResult.data.id;
      const token = loginResult.data.token;
      this.token = token;
      localCache.setCache(LOGIN_TOKEN, token);

      // 获取用户信息
      const userInfoResult = await getUserInfoById(id);
      const userInfo = userInfoResult.data;
      this.userInfo = userInfo;
      localCache.setCache(USER_INFO, userInfo);

      //根据用户角色信息请求用户权限
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id);
      const userMenus = userMenusResult.data;
      this.userMenus = userMenus;
      localCache.setCache(USER_MENUS, userMenus);

      //动态添加路由
      const routes = mapMenusToRouts(userMenus);
      routes.forEach((item) => router.addRoute('main', item)); //给name为main的路由 添加子路由

      //去首页
      router.push('/main');
    },

    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN);
      const userInfo = localCache.getCache(USER_INFO);
      const userMenus = localCache.getCache(USER_MENUS);
      if (token && userInfo && userMenus) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenus = userMenus;

        // 动态添加路由
        const routes = mapMenusToRouts(userMenus);
        routes.forEach((item) => router.addRoute('main', item)); //给name为main的路由 添加子路由
      }
    },
  },
});

export default useLoginStore;

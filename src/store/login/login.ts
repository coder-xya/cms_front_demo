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
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-meuns';
import useMainStore from '../main/main';

interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
  permissions: string[];
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: [],
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account);
      console.log(loginResult);

      const id = loginResult.data.id;
      this.token = loginResult.data.token;
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 获取用户信息
      const userInfoResult = await getUserInfoById(id);
      this.userInfo = userInfoResult.data;
      localCache.setCache(USER_INFO, this.userInfo);

      //根据用户角色信息请求用户权限
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id);
      this.userMenus = userMenusResult.data;
      localCache.setCache(USER_MENUS, this.userMenus);
      // console.log(userMenus);

      // 请求所有roles/departments数据
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
      // 重要: 获取登录用户的所有按钮的权限
      const permissions = mapMenusToPermissions(this.userMenus);
      this.permissions = permissions;

      // //动态添加路由
      const routes = mapMenusToRoutes(this.userMenus);
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
        const routes = mapMenusToRoutes(userMenus);
        routes.forEach((item) => router.addRoute('main', item)); //给name为main的路由 添加子路由
      }
    },
  },
});

export default useLoginStore;

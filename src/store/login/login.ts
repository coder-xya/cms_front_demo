import accountLoginRequest from '@/service/login/login';
import { defineStore } from 'pinia';

import type { IAccount } from '@/types';
import { localCache } from '@/utils/cache';
import router from '@/router';
import { LOGIN_TOKEN } from '@/config/constants';

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN),
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account);
      this.id = loginResult.data.id;
      this.name = loginResult.data.name;
      this.token = loginResult.data.token;

      //存token
      localCache.setCache(LOGIN_TOKEN, this.token);
      //去首页
      router.push('/main');
    },
  },
});

export default useLoginStore;

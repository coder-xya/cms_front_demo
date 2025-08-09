<template>
  <div class="main">main</div>
  <el-button @click="handleLogOut">退出登录</el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { LOGIN_TOKEN } from '@/config/constants';
import { localCache } from '@/utils/cache';

// 退出登录
const router = useRouter();
function handleLogOut() {
  localCache.removeCache(LOGIN_TOKEN);
  router.push('/login');
}
</script>

<style lang="less" scoped>
.main {
}
</style>

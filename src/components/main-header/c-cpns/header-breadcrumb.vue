<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login';
import { mapPathToBreadcrumb } from '@/utils/map-meuns';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const loginStore = useLoginStore();
const breadcrumb = computed(() => {
  return mapPathToBreadcrumb(route.path, loginStore.userMenus);
});
</script>

<style lang="less" scoped>
.crumb {
}
</style>

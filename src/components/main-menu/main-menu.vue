<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="../../../public/favicon.ico" alt="" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
              <el-icon>
                <!-- <component :is="item.icon.split('-icon-')[1]" /> -->
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login';
import { mapPathToMenus } from '@/utils/map-meuns';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
});

// 1.获取动态的菜单
const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;
console.log(userMenus);

// 2.监听item的点击
const router = useRouter();
function handleItemClick(item: any) {
  const url = item.url;
  router.push(url);
}

// 菜单匹配当前路由
const route = useRoute();
// TODO:localhonst:5173正常刷新跳转，localhonst:5173/#/页面没有刷新
//解决：使用computed

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenus(route.path, userMenus);
  return pathMenu?.id + '';
});
console.log(defaultActive);
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 20px;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>

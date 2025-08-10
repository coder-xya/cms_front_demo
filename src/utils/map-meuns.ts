import type { RouteRecordRaw } from 'vue-router';

export function loadLocalRouts() {
  const localRoutes: RouteRecordRaw[] = [];

  //读取main文件夹下所有vue页面
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }, //立即加载
  );
  console.log(files);

  //
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }

  return localRoutes;
}

export function mapMenusToRouts(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRouts();

  // 根据菜单匹配二级路由
  const routes: RouteRecordRaw[] = [];

  for (const menu of userMenus) {
    for (const sunMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === sunMenu.url);
      if (route) {
        routes.push(route);
      }
    }
  }
  return routes;
}

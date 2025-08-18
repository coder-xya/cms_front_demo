import type { RouteRecordRaw } from 'vue-router';

export function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = [];

  //读取main文件夹下所有vue页面
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }, //立即加载
  );
  // console.log(files);

  //
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }

  return localRoutes;
}

export let firstMenu: any = null;

export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes();
  console.log(userMenus);

  // 根据菜单匹配二级路由
  const routes: RouteRecordRaw[] = [];

  for (const menu of userMenus) {
    for (const sunMenu of menu.children) {
      const route = localRoutes.find((item) => item?.path === sunMenu.url);

      if (route) {
        //TODO：逻辑待梳理
        //添加一级菜单（重定向到第一个子菜单）
        // console.log(routes, menu);

        if (!routes.find((item) => item?.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path });
        }
        // 添加二级菜单
        routes.push(route);
      }
      //
      if (!firstMenu && routes) firstMenu = route;
    }
  }
  return routes;
}

/**
 * 根据路径匹配惨菜单
 * @param path 需要匹配路由的路径
 * @param userMenus 所有路由
 */
export function mapPathToMenus(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) return subMenu;
    }
  }
}

/**
 * 根据当前路由匹配面包屑
 * @param path
 * @param userMenus
 */
interface IBreadcrumb {
  name: string;
  path?: string;
}
export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  const breadcrumb: IBreadcrumb[] = [];
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumb.push({ name: menu.name, path: menu.url });
        breadcrumb.push({ name: subMenu.name, path: subMenu.url });
      }
    }
  }
  return breadcrumb;
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = [];

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children);
      } else {
        ids.push(item.id);
      }
    }
  }
  recurseGetId(menuList);

  return ids;
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = [];

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission);
      } else {
        recurseGetPermission(item.children ?? []);
      }
    }
  }
  recurseGetPermission(menuList);

  return permissions;
}

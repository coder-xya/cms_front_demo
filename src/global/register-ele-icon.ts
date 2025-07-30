import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import type { App } from 'vue';
//TODO：确定app的类型
function registerEleIcons(app: App<Element>) {
  // element icon全局注册
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}

export default registerEleIcons;

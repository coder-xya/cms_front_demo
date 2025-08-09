import { createApp } from 'vue';
import App from './App.vue';
import 'modern-normalize';
import router from './router';
import registerEleIcons from './global/register-ele-icon'; //自动引入el图标
import pinia from './store';
//引入elementplus的message、loading等反馈组件的样式
//1.引入所有样式
// import 'element-plus/dist/index.css'
//2.单个引入
// import 'element-plus/theme-chalk/el-message.css'
//3.插件引入
/**
 * pnpm install vite-plugin-style-import consola -D
 * 在vite.config.ts里配置
 */

const app = createApp(App);

app.use(registerEleIcons);
app.use(router);
app.use(pinia);
app.mount('#app');

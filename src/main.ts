import { createApp } from 'vue';
import App from './App.vue';
import 'modern-normalize';
import router from './router';
import registerEleIcons from './global/register-ele-icon';

const app = createApp(App);

app.use(registerEleIcons);
app.use(router);
app.mount('#app');

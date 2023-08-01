import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './style.css';
import App from './App.vue';

const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router).use(ElementPlus);
app.mount('#app');

import { createApp } from 'vue'

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { initializeRouter } from './router';
const app = createApp(App)
async function loadVue() {
    app
      .use(ElementPlus)
      .use(initializeRouter())
      .mount('#app');
}
loadVue();
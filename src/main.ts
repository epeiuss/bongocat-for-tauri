import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import 'uno.css';
import './assets/css/global.scss';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).mount('#app');

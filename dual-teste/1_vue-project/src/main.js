import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router'
import {createPinia} from 'pinia';
const app = createApp(App);

// Configura axios como uma propriedade global
app.config.globalProperties.$axios = axios;

app.use(router);
app.use(createPinia());
app.mount('#app');

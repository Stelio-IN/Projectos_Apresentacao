import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

// Configura axios como uma propriedade global
app.config.globalProperties.$axios = axios;

app.mount('#app');

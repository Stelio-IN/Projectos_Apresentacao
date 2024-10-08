import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios';
// Configura axios como uma propriedade global
app.config.globalProperties.$axios = axios;

createApp(App).mount('#app')

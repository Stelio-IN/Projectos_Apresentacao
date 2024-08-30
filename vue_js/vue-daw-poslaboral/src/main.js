import './assets/main.css'

import { createApp } from 'vue'


import { createPinia } from 'pinia'

import App from './App.vue'

const app  =createApp(APP)
const pinia = createPinia()

App.mounted('#app')
app.use(pinia)
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/home.vue'
import AboutView from '../views/about.vue'
import ListarView from '../views/listar.vue'
const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/listar', component: ListarView}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


export default router;
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/home.vue'
import AboutView from '../views/about.vue'
import ListarView from '../views/listar.vue'
import Clientes from '../views/clientes.vue'
const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/listar', component: ListarView},
  { path: '/clientes', component: Clientes}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


export default router;
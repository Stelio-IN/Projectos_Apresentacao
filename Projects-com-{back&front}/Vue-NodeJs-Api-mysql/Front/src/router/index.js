import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/home.vue'
import AboutView from '../views/about.vue'
import ListarView from '../views/listar.vue'
import Clientes from '../views/clientes.vue'
import Login from '../views/login.vue'
import ClienteCrud from '../views/ClienteCrud.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/listar', component: ListarView},
  { path: '/clientes', component: Clientes},
  { path: '/Login', component: Login},
  { path: '/ClienteCrud', component: ClienteCrud, name:'ClienteCrud',  props: true}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


export default router;
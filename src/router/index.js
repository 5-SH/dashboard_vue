import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/Dashboard.vue'
import Map from '@/Map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    layout: '/admin'
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
    layout: '/admin'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

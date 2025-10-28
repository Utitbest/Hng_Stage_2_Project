import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './index.css'
import App from './App.vue'
import LandingPage from './pages/LandingPage.vue'
import LoginPage from './pages/auth/Login.vue'
import SignupPage from './pages/auth/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import Tickets from './pages/tickets/Tickets.vue'
import TicketCreate from './pages/tickets/TicketCreate.vue'
import TicketDetails from './pages/tickets/TicketDetails.vue'
import TicketEdit from './pages/tickets/TicketEdit.vue'
import { isAuthenticated } from './utils/auth'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/auth/login', component: LoginPage },
  { path: '/auth/signup', component: SignupPage },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    component: Tickets,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets/new',
    component: TicketCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets/:id',
    component: TicketDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets/edit/:id',
    component: TicketEdit,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/auth/login')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')

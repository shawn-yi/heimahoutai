import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('@/views/welcome') },
      { path: '/article', name: 'article', component: () => import('@/views/article') },
      { path: '/articleadd', name: 'articleadd', component: () => import('@/views/articleadd/articleadd.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token')
  if (!token && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./views/Main.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./views/Home.vue'),
          children: [
            { path: 'community', name: 'community', component: () => import('./views/Community.vue') },
            { path: 'friends', name: 'friends', component: () => import('./views/Friends.vue') },
            { path: 'profile', name: 'profile', component: () => import('./views/Profile.vue') }
          ]
        },
        {
          path: 'groups',
          name: 'groups',
          component: () => import('./views/Groups.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})

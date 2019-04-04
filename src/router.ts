import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
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
            {
              path: 'community',
              name: 'community',
              component: () => import('./views/Community.vue')
            },
            {
              path: 'friends',
              name: 'friends',
              component: () => import('./views/Friends.vue')
            },
            {
              path: 'profile',
              name: 'profile',
              component: () => import('./views/Profile.vue')
            }
          ]
        },
        {
          path: 'group/:id',
          name: 'group',
          component: () => import('./views/Groups.vue'),
          props: route => ({ id: parseInt(route.params.id, 10) })
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

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'login') {
    if (!store.state.user) {
      await store.dispatch('fetchUserInfo')
    }
    await store.dispatch('fetchGroups')
  }

  if (to.name === 'group') {
    await store.dispatch('fetchGroupInfo', to.params.id)
    router.app.$socket.emit('GROUP_CONNECT', to.params.id)
  }

  store.commit('setCurrentView', to)

  next()
})

export default router

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
      redirect: { name: 'home' },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/Home.vue'),
          redirect: { name: 'community' },
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
            },
            {
              path: '@me/:uuid',
              name: '@me',
              component: () => import('./views/@me.vue')
            }
          ]
        },
        {
          path: 'groups/:uuid',
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

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'login') {
    if (!store.state.user) {
      const { code, data } = await store.dispatch('fetchUserInfo')

      if (code === 100) router.app.$socket.emit('COME_ONLINE', data.id)
    }

    if (store.state.joinedGroups.length === 0) {
      await store.dispatch('fetchJoinedGroups')
    }
  }

  if (to.name === 'community') {
    await store.dispatch('fetchPublicGroups')
  }

  if (to.name === 'friends') {
    await store.dispatch('fetchFriends')
    await store.dispatch('fetchFriendRequest')
  }

  if (to.name === 'groups') {
    const currentGroup = await store.dispatch('fetchGroupInfo', to.params.uuid)
    const { channels } = currentGroup

    if (channels.length > 0) {
      await store.dispatch('fetchChannelInfo', channels[0].uuid)

      router.app.$socket.emit('CHAT_CONNECT', { chatType: 'group', chatUuid: channels[0].uuid })
    }
  }

  if (to.matched[1] && to.matched[1].path === '/home') {
    await store.dispatch('fetchPrivateChats')
  }

  if (to.name === '@me') {
    await store.dispatch('fetchPrivateChatInfo', to.params.uuid)
    router.app.$socket.emit('CHAT_CONNECT', { chatType: 'private_chat', chatUuid: to.params.uuid })
  }

  store.commit('setCurrentView', to)

  next()
})

export default router

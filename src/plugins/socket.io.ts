import Vue from 'vue'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'
import store from '@/store'

Vue.use(VueSocketio, io(), { store })

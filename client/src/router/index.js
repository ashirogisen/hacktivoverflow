import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      name: 'defaulthome',
      path: '',
      component: () => import(/* webpackChunkName: "defaulthome" */ '../views/DefaultHome.vue'),
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    },
    {
      name: 'tags',
      path: '/tags',
      component: () => import(/* webpackChunkName: "tags" */ '../views/Tags.vue'),
    },
    {
      name: 'watchedtags',
      path: '/watchedtags',
      component: () => import(/* webpackChunkName: "watchedtags" */ '../views/WatchedTags.vue'),
    },
    {
      name: 'forums',
      path: '/forums',
      component: () => import(/* webpackChunkName: "forums" */ '../views/Forums.vue'),
    },
    {
      name: 'livechat',
      path: '/livechat',
      component: () => import(/* webpackChunkName: "livechat" */ '../views/LiveChat.vue'),
    },
    {
      name: 'forumdetails',
      path: '/forums/:id',
      component: () => import(/* webpackChunkName: "forumdetails" */ '../views/ForumDetails.vue'),
    },
    {
      name: 'questiondetails',
      path: '/:id',
      component: () => import(/* webpackChunkName: "questiondetails" */ '../views/QuestionDetails.vue'),
    }
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

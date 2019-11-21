import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import { config } from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    questions: [],
    questionDetails: null,
    forumDetails: null,
    tags: []
  },
  mutations: {
    CHANGEISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SETUSERDATA (state, payload) {
      state.user = payload
    },
    SETQUESTIONS (state, payload) {
      state.questions = payload
    },
    SETQUESTIONDETAILS (state, payload) {
      state.questionDetails = payload
    },
    SETTAGS (state, payload) {
      state.tags = payload
    },
    SETFORUMDETAILS (state, payload) {
      state.forumDetails = payload
    }
  },
  actions: {
    checktoken (context) {
      const token = localStorage.getItem('token')
      if (token) {
        context.commit('CHANGEISLOGIN', true)
      } else {
        context.commit('CHANGEISLOGIN', false)
        router.push('/')  
      }
    },
    getUser ({ commit }) {
      const token = localStorage.getItem('token')
      axios({
        method: 'get',
        url: `${config.host}/`,
        headers: {token}
      })
        .then(({data}) => {
          commit('SETUSERDATA', data)
        })
        .catch(console.log)
    },
    getQuestions ({ commit }) {
      axios({
        method: 'get',
        url: `${config.host}/questions/top`
      })
        .then(({data}) => {
          commit('SETQUESTIONS', data.reverse())
        })
        .catch(console.log)
    },
    getQuestionDetails ({ commit }, payload) {
      const token = localStorage.getItem('token')
      
      axios({
        method: 'get',
        url: `${config.host}/questions/${payload}`,
        headers: {token}
      })
        .then(({data}) => {
          commit('SETQUESTIONDETAILS', data)
          router.push(`/${payload}`)
        })
        .catch(console.log)
    },
    getForumDetails ({ commit }, payload) {
      const token = localStorage.getItem('token')

      axios({
        method: 'get',
        url: `${config.host}/forums/${payload}`,
        headers: {token}
      })
        .then(({data}) => {
          commit('SETFORUMDETAILS', data)
          router.push(`/forums/${payload}`)
        })
        .catch(console.log)
    },
    getTags ({ commit }) {
      axios({
        method: 'get',
        url: `${config.host}/tags`
      })
        .then(({data}) => {
          commit('SETTAGS', data.sort((a, b) => (a.name > b.name) ? 1 : -1))
        })
        .catch(console.log)
    }
  },
  modules: {
  }
})

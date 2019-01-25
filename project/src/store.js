import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/backend/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    error: null
  },
  mutations: {
    setAccessToken(state, accessToken) {
      Vue.set(state, 'accessToken', accessToken)
    },
    setLoginError(state, error) {
      Vue.set(state, 'error', error)
    }
  },
  actions: {
    login({ commit, dispatch }, data) {
      axios.post('/api/auth/signin', data).then(response => dispatch('loginSuccessful', response)).catch(response => dispatch('loginFailed'))
    },
    loginSuccessful({ commit, dispatch }, response) {
      if (response.data.accessToken) {
        commit('setLoginError', null)
        commit('setAccessToken', response.data.accessToken)
      } else {
        dispatch('loginFailed')
      }
    },
    loginFailed({ commit }) {
      commit('setAccessToken', null)
      commit('setLoginError', 'Login Failed! :c')
    }
  }
})

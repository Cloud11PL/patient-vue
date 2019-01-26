import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/backend/axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    error: null,
    auth: false,
    signupStatus: '',
    patients: {}
  },
  mutations: {
    setAccessToken(state, accessToken) {
      Vue.set(state, 'accessToken', accessToken)
      Vue.set(state, 'auth', true)
      router.push('/')
    },
    setLoginError(state, error) {
      Vue.set(state, 'error', error)
    },
    setSignupStatus(state, status) {
      Vue.set(state, 'signupStatus', status)
    },
    setPatients(state, patients) {
      Vue.set(state, 'patients', patients.data.patients)
    },
    removeAccessToken(state) {
      Vue.set(state, 'accessToken', null)
      Vue.set(state, 'auth', false)
      Vue.set(state, 'patients', {})
      router.push('/login')
    }
  },
  actions: {
    login({ commit, dispatch }, data) {
      return axios.post('/api/auth/signin', data).then(response => {
        dispatch('loginSuccessful', response)
        console.log(`xD`)
      }).catch(response => {
        dispatch('loginFailed')
      })
    },
    signup({ commit, dispatch }, data) {
      axios.post('/api/auth/signup', data).then(res => {
        commit('setSignupStatus', 'success')
        router.push('/login')
      }).catch(err => {
        dispatch('signupFail', err)
      })
    },
    getAllPatients({ commit, dispatch }, data) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.accessToken}`
      axios.get('/api/getAll').then(res => {
        console.log(res.data.patients)
        commit('setPatients', res)
        return res.data.patients
      }).catch(err => {
        console.log(err)
      })
    },
    logout({ commit, dispatch }) {
      commit('removeAccessToken', null)
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
      router.push('/login')
    },
    signupSuccessful({ commit, dispatch }, response) {

    },
    signupFail({ commit, dispatch }, response) {
      commit('setSignupStatus', 'fails')
      router.push('/register')
    }
    /*
    get response,
    if true show completion alert, push to login,
    if error show error alert
    */
  },
  getters: {
    auth: (state) => {
      return state.auth
    },
    getPatients: (state) => {
      return state.patients
    }
  }
})

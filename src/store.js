import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/backend/axios'
import router from './router'

Vue.use(Vuex)
/**
 * Vuex is used to store data such as accessToken or patients. This data can be used in all Vue components and views. 
 * Implemented methods allow for eg. API calls.
 */
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
      localStorage.setItem('user-token', accessToken) // store the token in localstorage
      router.push('/')
    },
    setLocalToken(state, token) {
      Vue.set(state, 'accessToken', token)
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
      localStorage.removeItem('user-token')
      Vue.set(state, 'patients', {})
      router.push('/login')
    }
  },
  actions: {
    login({ commit, dispatch }, data) {
      return axios.post('/api/auth/signin', data).then(response => {
        dispatch('loginSuccessful', response)
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
    useLocalStoragetoken({ commit, dispatch }, data) {
      const token = localStorage.getItem('user-token')
      console.log(token)
      if (token) {
        commit('setLocalToken', token)
      } else {
        dispatch('loginFailed')
      }
    },
    getAllPatients({ commit, dispatch }, data) {
      if (!this.state.accessToken) {
        dispatch('useLocalStoragetoken')
      }
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
    },
    addPatient({ commit, dispatch }, patient) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.accessToken}`
      axios.post('/api/auth/patient', patient).then(response => {
        console.log(response)
        dispatch('getAllPatients')
      }).catch(err => {
        console.log(err)
      })
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

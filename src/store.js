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
  getters: {
    auth: state => {
      return state.auth
    },
    getPatients: state => {
      return state.patients
    }
  },
  mutations: {
    setAccessToken(state, accessToken) {
      Vue.set(state, 'accessToken', accessToken)
      Vue.set(state, 'auth', true)
      localStorage.setItem('user-token', accessToken)
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
    },
    authFail(state, err) {
      Vue.set(state, 'accessToken', null)
      localStorage.removeItem('user-token')
      Vue.set(state, 'auth', false)
      err.response.status === 401 ? router.push('/login') : router.push('/')
    }
  },
  actions: {
    login({ commit, dispatch }, data) {
      commit('removeAccessToken')
      axios
        .post('/api/auth/signin', data)
        .then(response => {
          dispatch('loginSuccessful', response)
        })
        .catch(response => {
          dispatch('loginFailed')
        })
    },
    signup({ commit, dispatch }, data) {
      axios
        .post('/api/auth/signup', data)
        .then(res => {
          commit('setSignupStatus', 'success')
          router.push('/login')
        })
        .catch(err => {
          dispatch('signupFail', err)
        })
    },
    useLocalStoragetoken({ commit, dispatch }, data) {
      const token = localStorage.getItem('user-token')
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        this.state.accessToken
      }`
      axios
        .get('/api/getAll')
        .then(res => {
          commit('setPatients', res)
        })
        .catch(err => {
          commit('authFail', err)
        })
    },
    logout({ commit, dispatch }) {
      commit('removeAccessToken', null)
    },
    loginSuccessful({ commit, dispatch }, response) {
      console.log(response.data.accessToken)
      if (response.data.accessToken) {
        commit('setLoginError', null)
        commit('setAccessToken', response.data.accessToken)
      } else {
        dispatch('loginFailed')
      }
    },
    loginFailed({ commit }) {
      commit('setLoginError', 'Login Failed! :c')
      router.push('/login')
    },
    signupFail({ commit, dispatch }, response) {
      commit('setSignupStatus', 'fails')
      router.push('/register')
    },
    async addPatient({ commit, dispatch }, patient) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        this.state.accessToken
      }`
      await axios
        .post('/api/auth/patient', patient)
        .then(() => {
          dispatch('getAllPatients')
        })
        .catch(err => {
          commit('authFail', err)
        })
    }
  }
})

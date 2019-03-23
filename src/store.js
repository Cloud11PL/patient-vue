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
    SET_ACCESS_TOKEN(state, accessToken) {
      Vue.set(state, 'accessToken', accessToken)
      Vue.set(state, 'auth', true)
      router.push('/')
    },
    SET_LOGIN_ERROR(state, error) {
      Vue.set(state, 'error', error)
    },
    SET_SIGNUP_STATUS(state, status) {
      Vue.set(state, 'signupStatus', status)
    },
    SET_PATIENTS(state, patients) {
      Vue.set(state, 'patients', patients.data.patients)
    },
    REMOVE_ACCESS_TOKEN(state) {
      Vue.set(state, 'accessToken', null)
      Vue.set(state, 'auth', false)
      Vue.set(state, 'patients', {})
      router.push('/login')
    },
    AUTH_FAIL(state, err) {
      Vue.set(state, 'accessToken', null)
      Vue.set(state, 'auth', false)
      err.response.status === 401 ? router.push('/login') : router.push('/')
    }
  },
  actions: {
    login({ commit, dispatch }, data) {
      commit('REMOVE_ACCESS_TOKEN')
      localStorage.removeItem('user-token')
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
        .then(() => {
          commit('SET_SIGNUP_STATUS', 'success')
          router.push('/login')
        })
        .catch(err => {
          dispatch('signupFail', err)
        })
    },
    useLocalStoragetoken({ commit, dispatch }) {
      const token = localStorage.getItem('user-token')
      if (token) {
        commit('SET_ACCESS_TOKEN', token)
      } else {
        dispatch('loginFailed')
      }
    },
    getAllPatients({ commit, dispatch }) {
      if (!this.state.accessToken) {
        dispatch('useLocalStoragetoken')
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        this.state.accessToken
      }`
      axios
        .get('/api/getAll')
        .then(res => {
          commit('SET_PATIENTS', res)
        })
        .catch(err => {
          commit('AUTH_FAIL', err)
          localStorage.removeItem('user-token')
        })
    },
    logout({ commit }) {
      commit('REMOVE_ACCESS_TOKEN', null)
      localStorage.removeItem('user-token')
    },
    loginSuccessful({ commit, dispatch }, response) {
      console.log(response.data.accessToken)
      if (response.data.accessToken) {
        commit('SET_LOGIN_ERROR', null)
        localStorage.setItem('user-token', response.data.accessToken)
        commit('SET_ACCESS_TOKEN', response.data.accessToken)
      } else {
        dispatch('loginFailed')
      }
    },
    loginFailed({ commit }) {
      commit('SET_LOGIN_ERROR', 'Login Failed! :c')
      router.push('/login')
    },
    signupFail({ commit }) {
      commit('SET_SIGNUP_STATUS', 'fails')
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
          commit('AUTH_FAIL', err)
        })
    },
    removePatient({ commit, dispatch }, id) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        this.state.accessToken
      }`
      console.log(id)
      axios
        .delete(`/api/destroyByID/${id}`)
        .then(() => {
          dispatch('getAllPatients')
        })
        .catch(err => {
          commit('AUTH_FAIL', err)
        })
    }
  }
})

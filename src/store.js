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
    patients: state => {
      return state.patients
    }
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      Vue.set(state, 'accessToken', accessToken)
      Vue.set(state, 'auth', true)
    },
    SET_PATIENTS(state, patients) {
      Vue.set(state, 'patients', patients.data.patients)
    },
    REMOVE_ACCESS_TOKEN(state) {
      Vue.set(state, 'accessToken', null)
      Vue.set(state, 'auth', false)
      Vue.set(state, 'patients', {})
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
      return axios
        .post('/api/auth/signin', data)
        .then(response => {
          dispatch('loginSuccessful', response)
          return response
        })
        .catch(err => {
          return err.response
        })
    },
    loginSuccessful({ commit }, response) {
      localStorage.setItem('user-token', response.data.accessToken)
      commit('SET_ACCESS_TOKEN', response.data.accessToken)
    },
    signup(data) {
      return axios
        .post('/api/auth/signup', data)
        .then(res => {
          return res
        })
        .catch(err => {
          return err.response
        })
    },
    useLocalStoragetoken({ commit }) {
      const token = localStorage.getItem('user-token')
      if (token) {
        commit('SET_ACCESS_TOKEN', token)
      } else {
        commit('AUTH_FAIL')
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
      router.push('/login')
      localStorage.removeItem('user-token')
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
    isAuth() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        this.state.accessToken
      }`
      return axios
        .post('/api/isAuth')
        .then(res => {
          return res
        })
        .catch(err => {
          return err
        })
    },
    removePatient({ dispatch }, id) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        this.state.accessToken
      }`
      return axios
        .delete(`/api/destroyByID/${id}`)
        .then(() => {
          dispatch('getAllPatients')
        })
        .catch(err => {
          return err
        })
    }
  }
})

import axios from 'axios'
const API_URL = process.env.NODE_ENV == 'production' ? 'http://104.248.101.239:8080/' : 'http://localhost:8080/'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

import axios from 'axios'
const API_URL = process.env.NODE_ENV == 'production' ? 'https://eea1d239.ngrok.io/' : 'http://localhost:8080/'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

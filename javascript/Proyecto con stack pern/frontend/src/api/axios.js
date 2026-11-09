import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND || 'http://localhost:3000/api',
  withCredentials: true,
})

export default client

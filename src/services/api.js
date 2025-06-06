import axios from 'axios'
import { store } from './store'
import { logout } from './context/auth/authSlice'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token = store.getState().auth.token
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // store.dispatch(logout())
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
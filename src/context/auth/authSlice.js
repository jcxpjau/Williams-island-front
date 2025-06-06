import { createSlice } from '@reduxjs/toolkit'

/* const initialState = {
  isAuthenticated: false,
  token: null,
  user: null
} */

const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const storeToken = localStorage.getItem('camaly.token')
    if (storeToken) {
      return { isAuthenticated: true, token: storeToken, user: null }
    }
  }
  return { isAuthenticated: false, token: null, user: null }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialUser(),
  reducers: {
    login: (state, action) => {
      const { token, remember } = action.payload
      state.isAuthenticated = true
      state.token = token
      if (remember) {
        localStorage.setItem('camaly.token', token)
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('camaly.token')
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { login, logout, setUser } = authSlice.actions
export default authSlice.reducer
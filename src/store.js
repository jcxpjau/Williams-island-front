import { configureStore } from '@reduxjs/toolkit'
import authReducer from './context/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
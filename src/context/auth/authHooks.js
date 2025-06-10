import { useDispatch, useSelector } from 'react-redux'
import { login, logout, setUser } from './authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  return {
    ...auth,
    login: (token, remember) => dispatch(login({ token, remember })),
    logout: () => dispatch(logout()),
    setUser: (user) => dispatch(setUser(user))
  }
}

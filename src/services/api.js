import axios from "axios";
import { store } from "store";
import { logout, login } from "../context/auth/authSlice";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}auth/refresh`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;
        let remember = false;
        if (localStorage.getItem('wi.token')){
          remember = true;
        }
        store.dispatch(login({ token: accessToken, remember: remember }));

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError);
        store.dispatch(logout());
        //window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

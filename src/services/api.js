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
  const currentPath = window.location.pathname;
  if (currentPath === "/booking") {
    return config;
  }
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const currentPath = window.location.pathname;
    console.log(process.env.REACT_APP_API_URL);
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !currentPath.startsWith("/booking")
    ) {
      originalRequest._retry = true;
      console.log(process.env.REACT_APP_API_URL);
      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.access_token;
        store.dispatch(login({ token: newAccessToken, remember: true }));
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default api;
import axios from "axios";
import { endpoints } from "api";
import { local } from "common";
import { showToast } from "utils";
import { updateAccessToken, store } from "reduxStore";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    showToast(error, "error");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = local.getRefreshToken();

    if (error.response.status === 401 && refreshToken) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(endpoints.TOKEN_REFRESH, {
          refresh: refreshToken,
        });
        store.dispatch(updateAccessToken(response.data));
        local.storeRefreshToken(response.data.refresh);
        originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
        return axios(originalRequest);
        
      } catch (refreshError) {
        showToast("Refresh token expired or invalid", "error");
        local.removeRefreshToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


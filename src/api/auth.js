import { endpoints } from "api";
import { local } from "common";
import { apiUtils } from "./utils";
import { store } from "reduxStore";

export const authApi = {
  signup: async (data) => {
    const signupUrl = data.qualification
      ? endpoints.NUTRITIONIST_SIGNUP
      : endpoints.USER_SIGNUP;
    return await apiUtils.post(signupUrl, data, false);
  },
  
  loginUser: async (data) => {
    return await apiUtils.post(endpoints.USER_LOGIN, data, false, true);
  },
  
  logoutUser: async () => {
    const state = store.getState();
    return await apiUtils.post(endpoints.USER_LOGOUT, { refresh_token: state.auth.refreshToken }, true, true);
  },
  
  refreshAccessToken: async () => {
    const refreshToken = local.getRefreshToken();
    return await apiUtils.post(endpoints.TOKEN_REFRESH, { refresh: refreshToken }, false, true);
  },
  
  verifyUser: async (params) => {
    return await apiUtils.get(`${endpoints.ACCOUNT_VERIFICATION}/${params.token1}/${params.token2}`, params, false, true);
  },
  
  deleteUser: async (username) => {
    return await apiUtils.delete(`${endpoints.DELETE_USER}/${username}`, {}, true, true);
  },
};


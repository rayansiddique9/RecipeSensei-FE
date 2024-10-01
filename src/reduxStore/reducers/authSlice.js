import { createSlice } from "@reduxjs/toolkit";
import authActions from "../actions/auth";
import { local } from "common";

const INITIAL_STATE = {
  accessToken: null,
  refreshToken: null,
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    updateAccessToken: (state, action) => {
      const { access, refresh } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
    },
    logout: () => {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authActions.verifyUser.fulfilled, (state, action) => {
        state.isVerified = true;
      })
      .addCase(authActions.loginUser.fulfilled, (state, action) => {
        local.storeRefreshToken(action.payload.refresh);
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(authActions.refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        local.storeRefreshToken(action.payload.refresh);
      })
      .addCase(authActions.logoutUser.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        local.clearLocalStorage();
      })
      .addCase(authActions.deleteUser.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        local.clearLocalStorage();
      });
  },
});

export const { logOut, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
export const selectUserIsVerified = (state) => state.auth.isVerified;
export const selectAccesstoken = (state) => state.auth.accessToken;


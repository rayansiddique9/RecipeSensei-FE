import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "api";

const authActions = {
    signupUser: createAsyncThunk("auth/signupUser", authApi.signup),
    signupNutritionist: createAsyncThunk("auth/signupNutritionist", authApi.signup),
    verifyUser: createAsyncThunk("auth/verifyUser", authApi.verifyUser),
    loginUser: createAsyncThunk("auth/loginUser", authApi.loginUser),
    refreshAccessToken: createAsyncThunk("auth/refreshAccessToken", authApi.refreshAccessToken),
    logoutUser: createAsyncThunk("auth/logoutUser", authApi.logoutUser),
    deleteUser: createAsyncThunk("auth/deleteUser", authApi.deleteUser),
}

export default authActions;


import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import profileReducer from "./reducers/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;


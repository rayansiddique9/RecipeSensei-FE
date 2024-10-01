import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileApi } from "api/profile";

const profileActions = {
    getNutritionistProfile: createAsyncThunk("profile/getNutritionistProfile", profileApi.getNutritionistProfile),
    getUserProfile: createAsyncThunk("profile/getUserProfile", profileApi.getUserProfile),
    updateUser: createAsyncThunk("profile/updateUser", profileApi.updateUser),
    updateNutritionist: createAsyncThunk("profile/updateNutritionist", profileApi.updateNutritionist),
}

export default profileActions;


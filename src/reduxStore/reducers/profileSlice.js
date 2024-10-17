import { createSlice } from "@reduxjs/toolkit";
import profileActions from "../actions/profile";
import authActions from "../actions/auth";

const INITIAL_STATE = {
  user: null,
  savedRecipes: null,
  isNutritionist: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: INITIAL_STATE,
  reducers: {
    updateSavedRecipes: (state, action) => {
      state.savedRecipes = state.savedRecipes.filter(recipe => recipe.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        profileActions.getNutritionistProfile.fulfilled,
        (state, action) => {
          state.user = {
            ...action.payload.user,
            qualification: action.payload.qualification,
            yearsOfExperience: action.payload.years_of_experience
          };
          state.isNutritionist = true;
        }
      )
      .addCase(profileActions.getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.savedRecipes = action.payload.saved_recipes;
        state.isNutritionist = action.payload.is_nutritionist;
      })
      .addCase(profileActions.updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(profileActions.updateNutritionist.fulfilled, (state, action) => {
        state.user = {
            ...action.payload.nutritionist.user,
            qualification: action.payload.nutritionist.qualification,
            yearsOfExperience: action.payload.nutritionist.years_of_experience
          };
      });
  },
});

export const { updateSavedRecipes } = profileSlice.actions;

export default profileSlice.reducer;
export const selectCurrentProfile = (state) => state.profile.user;
export const selectSavedRecipes = (state) => state.profile.savedRecipes;
export const selectIsNutritionist = (state) => state.profile.isNutritionist;


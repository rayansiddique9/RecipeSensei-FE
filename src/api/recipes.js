import { endpoints } from "api";
import { apiUtils } from "./utils";

export const recipeApi = {
  getPublicRecipes: async ({ pageParam=1, searchQuery="" }) => {
    const params = new URLSearchParams({ page: pageParam, search: searchQuery });
    return await apiUtils.get(`${endpoints.GET_PUBLIC_RECIPES}/?${params}`, {}, true);
  },

  getNonPostedPublicRecipes: async ({ pageParam=1, searchQuery="" }) => {
    const params = new URLSearchParams({ page: pageParam, search: searchQuery });
    return await apiUtils.get(`${endpoints.GET_NON_POSTED_PUBLIC_RECIPES}/?${params}`, {}, true);
  },

  getPostedRecipes: async (pageParam=1) => {
    return await apiUtils.get(`${endpoints.POSTED_RECIPES}/?page=${pageParam}`, {}, true, true);
  },

  saveRecipe: async (recipeId) => {
    return await apiUtils.post(`${endpoints.SAVE_RECIPE}/${recipeId}`, {}, true, true);
  },

  unsaveRecipe: async (recipeId) => {
    return await apiUtils.delete(`${endpoints.SAVE_RECIPE}/${recipeId}`, {}, true, true);
  },

  getAiRecipe: async (data) => {
    return await apiUtils.post(endpoints.GENERATE_RECIPE, data, true, true);
  },

  addRecipe: async (data) => {
    return await apiUtils.post(endpoints.ADD_RECIPE, data, true, true);
  },

  editRecipe: async (data, recipeId) => {
    return await apiUtils.put(`${endpoints.EDIT_RECIPE}/${recipeId}`, data, true, true);
  },

  deleteRecipe: async (recipeId) => {
    return await apiUtils.delete(`${endpoints.DELETE_RECIPE}/${recipeId}`, {}, true, true);
  },
};

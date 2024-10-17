import { endpoints } from "api";
import { apiUtils } from "./utils";

export const profileApi = {
  getNutritionistProfile: async () => {
    return await apiUtils.get(endpoints.GET_NUTRITIONIST, {}, true);
  },
  
  getUserProfile: async () => {
    return await apiUtils.get(endpoints.GET_USER, {}, true);
  },
  
  updateUser: async (data) => {
    return await apiUtils.put(endpoints.EDIT_USER, data, true);
  },

  updateNutritionist: async (data) => {
    return await apiUtils.put(endpoints.NUTRITONIST_UPDATE, data, true);
  },

  getUserList: async ({ pageParam=1, searchQuery="" }) => {
    const params = { page: pageParam, search: searchQuery };
    return await apiUtils.get(endpoints.USER_LIST, params, true, true);
  },

  getNutritionistList: async ({ pageParam=1, searchQuery="" }) => {
    const params = { page: pageParam, search: searchQuery };
    return await apiUtils.get(endpoints.NUTRITIONIST_LIST, params, true, true);
  },
};


import { endpoints } from "api";
import { STATUS } from "common";
import { apiUtils } from "./utils";

export const blogApi = {
  getApprovedBlogs: async ({ pageParam=1, searchQuery="" }) => {
    const params = { page: pageParam, search: searchQuery };
    return await apiUtils.get(endpoints.APPROVED_BLOGS, params, true);
  },

  getRejectedBlogs: async ({ pageParam=1, searchQuery="" }) => {
    const params = { page: pageParam, search: searchQuery, status: STATUS.REJECTED };
    return await apiUtils.get(endpoints.BLOG_LIST, params, true, true);
  },

  getPendingBlogs: async ({ pageParam=1, searchQuery="" }) => {
    const params = { page: pageParam, search: searchQuery, status: STATUS.PENDING };
    return await apiUtils.get(endpoints.BLOG_LIST, params, true, true);
  },

  getNutritionistApprovedBlogs: async ({ pageParam=1, searchQuery="" }) => {
    const params = { page: pageParam, search: searchQuery, status: STATUS.APPROVED };
    return await apiUtils.get(endpoints.BLOG_LIST, params, true, true);
  },

  createBlog: async (data) => {
    return await apiUtils.post(endpoints.CREATE_BLOG, data, true, true);
  },

  updateBlog: async (data, blogId) => {
    return await apiUtils.put(`${endpoints.UPDATE_BLOG}${blogId}`, data, true, true);
  },

  deleteBlog: async (blogId) => {
    return await apiUtils.delete(`${endpoints.DELETE_BLOG}${blogId}`, {}, true, true);
  },

  updateStatus: async (data, blogId) => {
    return await apiUtils.put(`${endpoints.UPDATE_BLOG_STATUS}${blogId}`, data, true, true);
  },
};


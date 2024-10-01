const BASE = "http://127.0.0.1:8000";
const USERS = `${BASE}/users`;
const RECIPES = `${BASE}/recipes`;
const NUTRITIONIST = `${BASE}/nutritionist`;
const BLOGS = `${BASE}/blogs`;

export const endpoints = {
  USER_LOGIN: `${USERS}/login/`,
  TOKEN_REFRESH: `${USERS}/token-refresh/`,
  ACCOUNT_VERIFICATION: `${USERS}/verify-email`,
  USER_LOGOUT: `${USERS}/logout/`,
  DELETE_USER: `${USERS}/delete`,

  USER_SIGNUP: `${USERS}/create/`,
  GET_USER: `${USERS}/detail/`,
  EDIT_USER: `${USERS}/update/`,
  USER_LIST: `${USERS}`,

  NUTRITIONIST_SIGNUP: `${NUTRITIONIST}/create/`,
  GET_NUTRITIONIST: `${NUTRITIONIST}/detail/`,
  NUTRITONIST_UPDATE: `${NUTRITIONIST}/update/`,
  NUTRITIONIST_LIST: `${NUTRITIONIST}`,

  GET_NON_POSTED_PUBLIC_RECIPES: `${RECIPES}/public-non-posted`,
  GET_PUBLIC_RECIPES: `${RECIPES}/public`,
  POSTED_RECIPES: `${RECIPES}/posted`,
  SAVE_RECIPE: `${RECIPES}/save`,
  GENERATE_RECIPE: `${RECIPES}/generate/`,
  ADD_RECIPE: `${RECIPES}/create/`,
  EDIT_RECIPE: `${RECIPES}/update`,
  DELETE_RECIPE: `${RECIPES}/delete`,

  APPROVED_BLOGS: `${BLOGS}/approved`,
  NUTRITIONIST_APPROVED_BLOGS: `${BLOGS}/posted-approved`,
  REJECTED_BLOGS: `${BLOGS}/rejected`,
  PENDING_BLOGS: `${BLOGS}/pending`,
  CREATE_BLOG: `${BLOGS}/create/`,
  UPDATE_BLOG: `${BLOGS}/update`,
  DELETE_BLOG: `${BLOGS}/delete`,
  UPDATE_BLOG_STATUS: `${BLOGS}/update-status`,
};


import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "common";
import { ToastContainer } from "react-toastify";
import {
  UserSignup,
  UserLogin,
  UserVerification,
  UserHome,
  NutritionistSignup,
  NutritionistHome,
  BlogsUser,
  RecipeGenerator,
  UserProfile,
  NutritionistProfile,
  RecipesPageAdmin,
  BlogsPageAdmin,
  UsersPageAdmin,
  LandingPage,
} from "pages";
import { ProtectedRoute, UnProtectedRoute, BlogDetail, RecipeDetail } from "components";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={routes.LANDING} element={<UnProtectedRoute element={<LandingPage />} />} />
        <Route path={routes.USER_SIGNUP} element={<UnProtectedRoute element={<UserSignup />} />} />
        <Route path={routes.VERIFY} element={<UnProtectedRoute element={<UserVerification />} />} />
        <Route path={routes.NUTRITIONIST_SIGNUP} element={<UnProtectedRoute element={<NutritionistSignup />} />} />
        <Route path={routes.LOGIN} element={<UnProtectedRoute element={<UserLogin />} />} />
        <Route path={routes.HOME_USER} element={<ProtectedRoute element={<UserHome />} />} />
        <Route path={routes.BLOGS_USER} element={<ProtectedRoute element={<BlogsUser />} />} />
        <Route path={routes.USER_PROFILE} element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path={routes.RECIPE_GENERATOR} element={<ProtectedRoute element={<RecipeGenerator />} />} />
        <Route path={routes.HOME_NUTRITIONIST} element={<ProtectedRoute element={<NutritionistHome />} />} />
        <Route path={routes.NUTRITIONIST_PROFILE} element={<ProtectedRoute element={<NutritionistProfile />} />} />
        <Route path={routes.RECIPES_ADMIN} element={<ProtectedRoute element={<RecipesPageAdmin />} />} />
        <Route path={routes.BLOGS_ADMIN} element={<ProtectedRoute element={<BlogsPageAdmin />} />} />
        <Route path={routes.USER_LIST_ADMIN} element={<ProtectedRoute element={<UsersPageAdmin />} />} />
        <Route path={`${routes.BLOG_DETAIL}/:id`} element={<ProtectedRoute element={<BlogDetail />} />} />
        <Route path={`${routes.RECIPE_DETAIL}/:id`} element={<ProtectedRoute element={<RecipeDetail />} />} />
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

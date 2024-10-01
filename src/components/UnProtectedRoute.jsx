import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes, local } from "common";
import { selectAccesstoken } from "reduxStore";

const UnProtectedRoute = ({ element }) => {
  const accessToken = useSelector(selectAccesstoken);

  const navigate = useNavigate();

  useEffect(() => {
    if (local.getRefreshToken()) {
      if (local.getIsNutritionist() === "false") navigate(routes.HOME_USER);
      else if (local.getIsNutritionist() === "true") navigate(routes.HOME_NUTRITIONIST);
      else if (local.getIsNutritionist() === "null") navigate(routes.RECIPES_ADMIN);
    }
  }, [accessToken, navigate]);

  return <div>{element}</div>;
};

export default UnProtectedRoute;

